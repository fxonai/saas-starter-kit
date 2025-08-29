import { PrismaClient, StageStatus, TaskStatus, ProgramStatus, ProgramRole, ParticipantStatus } from '@prisma/client';
import { hash } from 'bcryptjs';

const client = new PrismaClient();

// Type definitions for better TypeScript support
type UserWithName = {
  name: string;
  email: string;
  role: string;
};

type UserWithoutName = {
  email: string;
  role: string;
};

type TeamData = {
  name: string;
  slug: string;
  isMainTeam: boolean;
  users: (UserWithName | UserWithoutName)[];
};

type TenantData = {
  name: string;
  domain: string | null;
  teams: TeamData[];
};

// Super Life Group data only - other tenants will be added as needed
const TENANT_DATA: TenantData[] = [
  {
    name: 'Super Life Group',
    domain: null, // Independent agency
    teams: [
      {
        name: 'Super Life Group',
        slug: 'super-life-group',
        isMainTeam: true,
        users: [
          { name: 'Jin Kim', email: '1jin-soo.kim@mailinator.com', role: 'OWNER' },
          { name: 'Madison Henry', email: '1madison.henry@mailinator.com', role: 'ADMIN' },
          { name: 'Avery Lee', email: '1avery.lee@mailinator.com', role: 'MEMBER' },
          { name: 'Youseff Marrak', email: '1youseff.marrak@mailinator.com', role: 'MEMBER' },
          { name: 'Zeb Rowen', email: '1zeb.rowen@mailinator.com', role: 'MEMBER' },
          { name: 'Jordan Ortiz', email: '1jordan.ortiz@mailinator.com', role: 'MEMBER' },
          { name: 'Gary Gunnison', email: '1gary.gunnison@mailinator.com', role: 'ADMIN' },
          { name: 'Alexis Torres', email: '1alexis.torres@mailinator.com', role: 'MEMBER' },
          { name: 'Xiu Ying', email: '1xiu.ying@mailinator.com', role: 'MEMBER' },
          { name: 'Rajesh Kumar', email: '1rajesh.kumar@mailinator.com', role: 'MEMBER' }
        ]
      },
      {
        name: 'Managers Group',
        slug: 'super-life-group-managers',
        isMainTeam: false,
        users: [
          { email: '1jin-soo.kim@mailinator.com', role: 'OWNER' },
          { email: '1madison.henry@mailinator.com', role: 'ADMIN' },
          { email: '1gary.gunnison@mailinator.com', role: 'ADMIN' }
        ]
      },
      {
        name: 'Pinnacle',
        slug: 'super-life-group-pinnacle',
        isMainTeam: false,
        users: [
          { email: '1avery.lee@mailinator.com', role: 'MEMBER' },
          { email: '1zeb.rowen@mailinator.com', role: 'MEMBER' },
          { email: '1xiu.ying@mailinator.com', role: 'MEMBER' }
        ]
      },
      {
        name: 'Synergy',
        slug: 'super-life-group-synergy',
        isMainTeam: false,
        users: [
          { email: '1youseff.marrak@mailinator.com', role: 'MEMBER' },
          { email: '1jordan.ortiz@mailinator.com', role: 'MEMBER' },
          { email: '1alexis.torres@mailinator.com', role: 'MEMBER' },
          { email: '1rajesh.kumar@mailinator.com', role: 'MEMBER' }
        ]
      }
    ]
  }
];

// Helper function to create slug from team name
const createSlug = (name: string) => {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

async function main() {
  console.log('🌱 Starting seed...');

  // Clear existing data
  await client.teamMember.deleteMany();
  await client.invitation.deleteMany();
  await client.team.deleteMany();
  await client.user.deleteMany();

  console.log('🗑️  Cleared existing data');
  
  // Check that database is empty
  const users = await client.user.count();
  const teamCount = await client.team.count();
  const teamMembers = await client.teamMember.count();
  const invitations = await client.invitation.count();
  
  console.log('🔍 Database state after clearing:');
  console.log(`- Users: ${users}`);
  console.log(`- Teams: ${teamCount}`);
  console.log(`- Team Members: ${teamMembers}`);
  console.log(`- Invitations: ${invitations}`);
  
  if (users === 0 && teamCount === 0 && teamMembers === 0 && invitations === 0) {
    console.log('✅ Database is EMPTY - ready to restore data\n');
  } else {
    console.log('❌ Database still has data - clearing failed\n');
  }

  // Track created users by email for multi-team assignment
  const userMap = new Map<string, any>();

  // Create teams and users
  for (const tenant of TENANT_DATA) {
    console.log(`🏢 Creating tenant: ${tenant.name}`);
    
    // Create all teams for this tenant first
    const teamMap = new Map<string, any>();
    
    for (const teamData of tenant.teams) {
      console.log(`  📋 Creating team: ${teamData.name}`);
      
      // For independent agencies, only the main team gets null domain
      // For enterprises, only the main team gets the domain
      const domain = teamData.isMainTeam ? tenant.domain : null;
      
      const team = await client.team.create({
        data: {
          name: teamData.name,
          slug: teamData.slug,
          domain: domain,
        },
      });
      
      teamMap.set(teamData.name, team);
    }

    // First, create all users from main teams (which have names)
    for (const teamData of tenant.teams) {
      if (teamData.isMainTeam) {
        for (const userData of teamData.users) {
          // Type guard to ensure userData has a name
          if ('name' in userData) {
            console.log(`👤 Creating user: ${userData.name}`);
            
            const user = await client.user.create({
              data: {
                name: userData.name,
                email: userData.email,
                password: await hash('password123', 12),
                emailVerified: new Date(),
              },
            });
            
            userMap.set(userData.email, user);
          }
        }
      }
    }

    // Then assign all users to their teams
    for (const teamData of tenant.teams) {
      for (const userData of teamData.users) {
        const user = userMap.get(userData.email);
        
        if (!user) {
          console.error(`❌ User not found: ${userData.email}`);
          continue;
        }

        // Create team membership
        await client.teamMember.create({
          data: {
            userId: user.id,
            teamId: teamMap.get(teamData.name).id,
            role: userData.role as any,
          },
        });
      }
    }
  }

  console.log('\n📋 Creating programs and program users...');
  
  // Create comprehensive programs with stages and tasks
  const programs = [
    {
      name: 'New Agent School',
      teamName: 'Super Life Group',
      enrollmentType: 'MANAGER_ASSIGNED' as any,
      outcomeType: 'REVENUE_TARGET' as any,
      measurementFrequency: 'DAILY' as any,
      status: 'PUBLISHED' as any,
      stages: [
        {
          name: 'Week 1 Onboarding',
          description: 'Complete profile, course enrollment, and pre-licensing education',
          order: 1,
          status: 'PUBLISHED' as any,
          timeExpectations: 30,
          dependencies: null,
          startDate: new Date('2024-01-15'),
          endDate: new Date('2024-01-21'),
          desiredOutcomes: [
            'Complete profile and course enrollment',
            'Schedule and pass state exam',
            'Read foundational materials',
            'Attend orientation',
            'Prepare for Week 2'
          ],
          outcomeTargets: {
            'profile_completed': 1,
            'course_enrolled': 1,
            'exam_scheduled': 1,
            'orientation_attended': 1,
            'materials_read': 1
          },
          outcomeActuals: {
            'profile_completed': 0,
            'course_enrolled': 0,
            'exam_scheduled': 0,
            'orientation_attended': 0,
            'materials_read': 0
          },
          tasks: [
            {
              name: 'Complete Your Profile',
              description: 'Fill out your complete profile with all required information.',
              order: 1,
              type: 'ASSIGNMENT',
              estimatedDuration: 15,
              instructions: 'Complete your profile with personal information, contact details, and preferences.',
              taskTarget: {
                'profile_completed': 1,
                'course_enrolled': 0,
                'exam_scheduled': 0,
                'orientation_attended': 0,
                'materials_read': 0
              }
            },
            {
              name: 'Enroll in Course',
              description: 'Enroll in the required licensing course for your state.',
              order: 2,
              type: 'ASSIGNMENT',
              
              estimatedDuration: 10,
              instructions: 'Enroll in the state licensing course and begin coursework.',
              taskTarget: {
                'profile_completed': 0,
                'course_enrolled': 1,
                'exam_scheduled': 0,
                'orientation_attended': 0,
                'materials_read': 0
              }
            },
            {
              name: 'Schedule Your State Exam',
              description: 'Schedule your state licensing exam within 24 hours of course completion.',
              order: 3,
              type: 'ASSIGNMENT',
              
              estimatedDuration: 5,
              instructions: 'Schedule your state licensing exam as soon as possible.',
              taskTarget: {
                'profile_completed': 0,
                'course_enrolled': 0,
                'exam_scheduled': 1,
                'orientation_attended': 0,
                'materials_read': 0
              }
            },
            {
              name: 'Money. Wealth. Life Insurance.',
              description: 'Read the first three chapters of Money, Wealth, and Life Insurance.',
              order: 4,
              type: 'READING',
              
              estimatedDuration: 45,
              instructions: 'Read the foundational book to understand the life insurance industry.',
              taskTarget: {
                'profile_completed': 0,
                'course_enrolled': 0,
                'exam_scheduled': 0,
                'orientation_attended': 0,
                'materials_read': 1
              }
            },
            {
              name: 'Attend Orientation',
              description: 'Save your spot for orientation and get it on the calendar now.',
              order: 5,
              type: 'MEETING',
              
              estimatedDuration: 90,
              instructions: 'Attend the mandatory orientation session to meet your team and understand expectations.',
              taskTarget: {
                'profile_completed': 0,
                'course_enrolled': 0,
                'exam_scheduled': 0,
                'orientation_attended': 1,
                'materials_read': 0
              }
            },
            {
              name: 'Schedule Week 2 Coaching',
              description: 'Book an hour with your trainer to launch Week 2.',
              order: 6,
              type: 'ASSIGNMENT',
              
              estimatedDuration: 5,
              instructions: 'Schedule your Week 2 coaching session with your assigned trainer.',
              taskTarget: {
                'profile_completed': 0,
                'course_enrolled': 0,
                'exam_scheduled': 0,
                'orientation_attended': 0,
                'materials_read': 0
              }
            }
          ]
        },
        {
          name: 'Week 2 Onboarding',
          description: 'Complete pre-licensing education and learn the 3-3-60 Game Plan',
          order: 2,
          status: 'PUBLISHED' as any,
          timeExpectations: 20,
          dependencies: null,
          startDate: new Date('2024-01-22'),
          endDate: new Date('2024-01-28'),
          desiredOutcomes: [
            'Understand the 3-3-60 Game Plan',
            'Build your fantasy team',
            'Expand your contact list',
            'Pass your state exam',
            'Prepare for Week 3'
          ],
          outcomeTargets: {
            'license_status': 1,
            'prospect_names': 200
          },
          outcomeActuals: {
            'license_status': 0,
            'prospect_names': 0
          },
          tasks: [
            {
              name: 'Start Week 2: Learn the 3-3-60 Game Plan',
              description: 'Understand how to grow your agency fast with business partners.',
              order: 1,
              type: 'VIDEO',
              
              estimatedDuration: 10,
              instructions: 'Watch the video explaining the 3-3-60 Game Plan for agency growth.',
              taskTarget: {
                'game_plan_understood': 1,
                'fantasy_team_built': 0,
                'contacts_expanded': 0,
                'exam_passed': 0,
                'week3_prepared': 0
              }
            },
            {
              name: 'Build your Fantasy Team',
              description: 'Think of the top people you would love to win with.',
              order: 2,
              type: 'ASSIGNMENT',
              
              estimatedDuration: 5,
              instructions: 'Identify and list your ideal business partners and team members.',
              taskTarget: {
                'game_plan_understood': 0,
                'fantasy_team_built': 1,
                'contacts_expanded': 0,
                'exam_passed': 0,
                'week3_prepared': 0
              }
            },
            {
              name: 'Expand your list with memory joggers',
              description: 'Use joggers to add 10-20 names now. You\'ll need 100-200 to start Week 3.',
              order: 3,
              type: 'ASSIGNMENT',
              
              estimatedDuration: 30,
              instructions: 'Use memory joggers to expand your contact list systematically.',
              taskTarget: {
                'game_plan_understood': 0,
                'fantasy_team_built': 0,
                'contacts_expanded': 20,
                'exam_passed': 0,
                'week3_prepared': 0
              }
            },
            {
              name: 'Pass Your State Exam',
              description: 'Aim to pass within 24 hours of finishing your coursework.',
              order: 4,
              type: 'CERTIFICATION',
              
              estimatedDuration: 120,
              instructions: 'Complete your state licensing exam and achieve a passing score.',
              taskTarget: {
                'game_plan_understood': 0,
                'fantasy_team_built': 0,
                'contacts_expanded': 0,
                'exam_passed': 1,
                'week3_prepared': 0
              }
            },
            {
              name: 'Schedule Week 3 Coaching',
              description: 'Book an hour with your trainer to launch Week 3.',
              order: 5,
              type: 'ASSIGNMENT',
              
              estimatedDuration: 5,
              instructions: 'Schedule your Week 3 coaching session.',
              taskTarget: {
                'game_plan_understood': 0,
                'fantasy_team_built': 0,
                'contacts_expanded': 0,
                'exam_passed': 0,
                'week3_prepared': 1
              }
            }
          ]
        },
        {
          name: 'Week 3 Onboarding',
          description: 'Warm network prospecting and exam preparation',
          order: 3,
          status: 'PUBLISHED' as any,
          timeExpectations: 20,
          dependencies: {
            requiredStages: ['Week 1 Onboarding', 'Week 2 Onboarding']
          },
          startDate: new Date('2024-01-29'),
          endDate: new Date('2024-02-04'),
          desiredOutcomes: [
            'Complete warm network prospecting',
            'Pass state licensing exam',
            'Prepare for field training',
            'Build initial prospect list'
          ],
          outcomeTargets: {
            'prospect_names': 200,
            'qualified_leads': 100,
            'appointments_scheduled': 10
          },
          outcomeActuals: {
            'prospect_names': 0,
            'qualified_leads': 0,
            'appointments_scheduled': 0
          },
          tasks: [
            {
              name: 'Warm Network Prospecting',
              description: 'Reach out to friends, family, and professional contacts for referrals.',
              order: 1,
              type: 'ASSIGNMENT',
              
              estimatedDuration: 600,
              instructions: 'Contact 50+ people in your warm network for referrals and introductions.',
              taskTarget: {
                'warm_contacts_contacted': 50,
                'referrals_requested': 50,
                'prospect_names': 100
              }
            },
            {
              name: 'Complete State Exam',
              description: 'Take and pass your state licensing exam.',
              order: 2,
              type: 'CERTIFICATION',
              
              estimatedDuration: 180,
              instructions: 'Schedule and complete your state licensing exam.',
              taskTarget: {
                'exam_passed': 1,
                'license_obtained': 1
              }
            },
            {
              name: 'Prepare for Field Training',
              description: 'Complete field training preparation and scheduling.',
              order: 3,
              type: 'ASSIGNMENT',
              
              estimatedDuration: 120,
              instructions: 'Schedule field training appointments and prepare materials.',
              taskTarget: {
                'field_training_scheduled': 1,
                'materials_prepared': 1
              }
            }
          ]
        },
        {
          name: 'Field Training',
          description: 'Complete 10 field training appointments with your trainer',
          order: 4,
          status: 'PUBLISHED' as any,
          timeExpectations: 22,
          dependencies: {
            requiredStages: ['Week 3 Onboarding']
          },
          startDate: new Date('2024-02-05'),
          endDate: new Date('2024-02-18'),
          desiredOutcomes: [
            'Complete 10 field training appointments',
            'Observe client interactions',
            'Practice co-leading meetings',
            'Run independent meetings'
          ],
          outcomeTargets: {
            'prospect_names': 200,
            'qualified_leads': 100,
            'appointments_scheduled': 15,
            'appointments_completed': 10,
            'client_recommendations': 6,
            'illustrations_designed': 5,
            'applications_submitted': 3
          },
          outcomeActuals: {
            'prospect_names': 0,
            'qualified_leads': 0,
            'appointments_scheduled': 0,
            'appointments_completed': 0,
            'client_recommendations': 0,
            'illustrations_designed': 0,
            'applications_submitted': 0
          },
          tasks: [
            {
              name: 'Complete Field Training',
              description: 'Finish 10 field training appointments with your trainer.',
              order: 1,
              type: 'SHADOWING',
              
              estimatedDuration: 150,
              instructions: 'Complete the full field training program with your assigned trainer.',
              taskTarget: {
                'appointments_completed': 10,
                'observations_done': 4,
                'co_leading_practiced': 4,
                'independent_meetings': 2
              }
            },
            {
              name: 'Appointment 1',
              description: 'Schedule and complete your first field training appointment.',
              order: 2,
              type: 'SHADOWING',
              
              estimatedDuration: 150,
              instructions: 'Observe silently; learn flow, take notes, debrief after.',
              taskTarget: {
                'appointments_completed': 1,
                'observations_done': 1,
                'co_leading_practiced': 0,
                'independent_meetings': 0
              }
            },
            {
              name: 'Appointment 2',
              description: 'Second field training appointment.',
              order: 3,
              type: 'SHADOWING',
              
              estimatedDuration: 150,
              instructions: 'Observe silently; learn flow, take notes, debrief after.',
              taskTarget: {
                'appointments_completed': 1,
                'observations_done': 1,
                'co_leading_practiced': 0,
                'independent_meetings': 0
              }
            },
            {
              name: 'Appointment 3',
              description: 'Third field training appointment.',
              order: 4,
              type: 'SHADOWING',
              
              estimatedDuration: 150,
              instructions: 'Observe silently; learn flow, take notes, debrief after.',
              taskTarget: {
                'appointments_completed': 1,
                'observations_done': 1,
                'co_leading_practiced': 0,
                'independent_meetings': 0
              }
            },
            {
              name: 'Appointment 4',
              description: 'Fourth field training appointment.',
              order: 5,
              type: 'SHADOWING',
              
              estimatedDuration: 150,
              instructions: 'Observe silently; learn flow, take notes, debrief after.',
              taskTarget: {
                'appointments_completed': 1,
                'observations_done': 1,
                'co_leading_practiced': 0,
                'independent_meetings': 0
              }
            },
            {
              name: 'Appointment 5',
              description: 'Fifth field training appointment.',
              order: 6,
              type: 'SHADOWING',
              
              estimatedDuration: 150,
              instructions: 'Co-lead sections; capture data; trainer supports and coaches.',
              taskTarget: {
                'appointments_completed': 1,
                'observations_done': 0,
                'co_leading_practiced': 1,
                'independent_meetings': 0
              }
            },
            {
              name: 'Appointment 6',
              description: 'Sixth field training appointment.',
              order: 7,
              type: 'SHADOWING',
              
              estimatedDuration: 150,
              instructions: 'Co-lead sections; capture data; trainer supports and coaches.',
              taskTarget: {
                'appointments_completed': 1,
                'observations_done': 0,
                'co_leading_practiced': 1,
                'independent_meetings': 0
              }
            },
            {
              name: 'Appointment 7',
              description: 'Seventh field training appointment.',
              order: 8,
              type: 'SHADOWING',
              
              estimatedDuration: 150,
              instructions: 'Co-lead sections; capture data; trainer supports and coaches.',
              taskTarget: {
                'appointments_completed': 1,
                'observations_done': 0,
                'co_leading_practiced': 1,
                'independent_meetings': 0
              }
            },
            {
              name: 'Appointment 8',
              description: 'Eighth field training appointment.',
              order: 9,
              type: 'SHADOWING',
              
              estimatedDuration: 150,
              instructions: 'Co-lead sections; capture data; trainer supports and coaches.',
              taskTarget: {
                'appointments_completed': 1,
                'observations_done': 0,
                'co_leading_practiced': 1,
                'independent_meetings': 0
              }
            },
            {
              name: 'Appointment 9',
              description: 'Ninth field training appointment.',
              order: 10,
              type: 'SHADOWING',
              
              estimatedDuration: 150,
              instructions: 'Run full meeting; trainer observes; debrief; schedule next steps.',
              taskTarget: {
                'appointments_completed': 1,
                'observations_done': 0,
                'co_leading_practiced': 0,
                'independent_meetings': 1
              }
            },
            {
              name: 'Appointment 10',
              description: 'Tenth field training appointment.',
              order: 11,
              type: 'SHADOWING',
              
              estimatedDuration: 150,
              instructions: 'Run full meeting; trainer observes; debrief; schedule next steps.',
              taskTarget: {
                'appointments_completed': 1,
                'observations_done': 0,
                'co_leading_practiced': 0,
                'independent_meetings': 1
              }
            }
          ]
        },
        {
          name: 'Earn First $1K',
          description: 'Build your system for generating predictable income',
          order: 5,
          status: 'PUBLISHED' as any,
          timeExpectations: 64,
          dependencies: {
            requiredStages: ['Field Training']
          },
          startDate: new Date('2024-02-19'),
          endDate: new Date('2024-02-25'),
          desiredOutcomes: [
            'Create predictable income system',
            'Fill the sales funnel',
            'Identify target personas',
            'Build marketing lists',
            'Track ROI and close deals'
          ],
          outcomeTargets: {
            'prospect_names': 200,
            'qualified_leads': 100,
            'appointments_scheduled': 15,
            'appointments_completed': 10,
            'client_recommendations': 6,
            'illustrations_designed': 5,
            'applications_submitted': 3,
            'applications_declined': 1,
            'clients_helped': 2,
            'premiums_written': 1200,
            'points_earned': 1200,
            'commissions_earned': 1000
          },
          outcomeActuals: {
            'prospect_names': 0,
            'qualified_leads': 0,
            'appointments_scheduled': 0,
            'appointments_completed': 0,
            'client_recommendations': 0,
            'illustrations_designed': 0,
            'applications_submitted': 0,
            'applications_declined': 0,
            'clients_helped': 0,
            'premiums_written': 0,
            'points_earned': 0,
            'commissions_earned': 0
          },
          tasks: [
            {
              name: 'Week 1: Daily Prospecting Calls',
              description: 'Make daily prospecting calls to build your funnel foundation.',
              order: 1,
              type: 'ASSIGNMENT',
              
              estimatedDuration: 420,
              instructions: 'Make 20-30 prospecting calls per day for 7 days to build your initial funnel.',
              taskTarget: {
                'prospect_names': 140,
                'qualified_leads': 35,
                'appointments_scheduled': 7
              }
            },
            {
              name: 'Week 1: Lead Qualification & Follow-up',
              description: 'Qualify leads and follow up systematically.',
              order: 2,
              type: 'ASSIGNMENT',
              
              estimatedDuration: 210,
              instructions: 'Qualify leads from prospecting calls and follow up with interested prospects.',
              taskTarget: {
                'qualified_leads': 35,
                'appointments_scheduled': 7
              }
            },
            {
              name: 'Week 1: Warm Network Outreach',
              description: 'Reach out to your warm network for referrals and introductions.',
              order: 3,
              type: 'ASSIGNMENT',
              
              estimatedDuration: 210,
              instructions: 'Contact friends, family, and professional network for referrals.',
              taskTarget: {
                'prospect_names': 60,
                'qualified_leads': 15,
                'appointments_scheduled': 3
              }
            },
            {
              name: 'Week 1: Admin & Planning',
              description: 'Manage inbox, scheduling, and weekly planning.',
              order: 4,
              type: 'ASSIGNMENT',
              
              estimatedDuration: 120,
              instructions: 'Handle administrative tasks, email management, and weekly planning.',
              taskTarget: {}
            },
            {
              name: 'Week 2: Continue Prospecting',
              description: 'Continue daily prospecting calls to maintain funnel momentum.',
              order: 5,
              type: 'ASSIGNMENT',
              
              estimatedDuration: 420,
              instructions: 'Continue making 20-30 prospecting calls per day.',
              taskTarget: {
                'prospect_names': 140,
                'qualified_leads': 35,
                'appointments_scheduled': 7
              }
            },
            {
              name: 'Week 2: Client Meetings',
              description: 'Conduct client meetings and presentations.',
              order: 6,
              type: 'MEETING',
              
              estimatedDuration: 300,
              instructions: 'Conduct 5 client meetings with qualified prospects.',
              taskTarget: {
                'appointments_completed': 5,
                'client_recommendations': 3,
                'illustrations_designed': 2
              }
            },
            {
              name: 'Week 2: Meeting Prep & Follow-up',
              description: 'Prepare for meetings and follow up with clients.',
              order: 7,
              type: 'ASSIGNMENT',
              
              estimatedDuration: 120,
              instructions: 'Prepare for client meetings and follow up with meeting attendees.',
              taskTarget: {
                'client_recommendations': 3,
                'illustrations_designed': 2
              }
            },
            {
              name: 'Week 2: Admin & Planning',
              description: 'Manage inbox, scheduling, and weekly planning.',
              order: 8,
              type: 'ASSIGNMENT',
              
              estimatedDuration: 120,
              instructions: 'Handle administrative tasks and weekly planning.',
              taskTarget: {}
            },
            {
              name: 'Week 3: Continue Prospecting & Meetings',
              description: 'Continue prospecting and client meetings.',
              order: 9,
              type: 'ASSIGNMENT',
              
              estimatedDuration: 480,
              instructions: 'Continue prospecting calls and conduct additional client meetings.',
              taskTarget: {
                'prospect_names': 140,
                'qualified_leads': 35,
                'appointments_completed': 5,
                'client_recommendations': 3
              }
            },
            {
              name: 'Week 3: Create Illustrations',
              description: 'Create illustrations for client recommendations.',
              order: 10,
              type: 'ASSIGNMENT',
              
              estimatedDuration: 180,
              instructions: 'Create 3 illustrations for client recommendations.',
              taskTarget: {
                'illustrations_designed': 3
              }
            },
            {
              name: 'Week 3: Process Applications',
              description: 'Process applications for interested clients.',
              order: 11,
              type: 'ASSIGNMENT',
              
              estimatedDuration: 180,
              instructions: 'Process 3 applications for clients who want to proceed.',
              taskTarget: {
                'applications_submitted': 3
              }
            },
            {
              name: 'Week 3: Admin & Planning',
              description: 'Manage inbox, scheduling, and weekly planning.',
              order: 12,
              type: 'ASSIGNMENT',
              
              estimatedDuration: 120,
              instructions: 'Handle administrative tasks and weekly planning.',
              taskTarget: {}
            },
            {
              name: 'Week 4: Continue All Activities',
              description: 'Continue prospecting, meetings, and application processing.',
              order: 13,
              type: 'ASSIGNMENT',
              
              estimatedDuration: 480,
              instructions: 'Continue all previous activities to maintain momentum.',
              taskTarget: {
                'prospect_names': 140,
                'qualified_leads': 35,
                'appointments_completed': 5,
                'client_recommendations': 3,
                'applications_submitted': 3
              }
            },
            {
              name: 'Week 4: Carrier Follow-up & Management',
              description: 'Follow up with carriers to push applications through.',
              order: 14,
              type: 'ASSIGNMENT',
              
              estimatedDuration: 180,
              instructions: 'Follow up with carriers on submitted applications and manage the process.',
              taskTarget: {
                'applications_declined': 1,
                'clients_helped': 2,
                'premiums_written': 1200,
                'points_earned': 1200,
                'commissions_earned': 1000
              }
            },
            {
              name: 'Week 4: Commission Tracking & Optimization',
              description: 'Track commissions and optimize for maximum earnings.',
              order: 15,
              type: 'ASSIGNMENT',
              
              estimatedDuration: 210,
              instructions: 'Track commission earnings and optimize strategies for maximum income.',
              taskTarget: {
                'commissions_earned': 1000,
                'premiums_written': 1200,
                'points_earned': 1200
              }
            },
            {
              name: 'Week 4: Admin & Planning',
              description: 'Manage inbox, scheduling, and weekly planning.',
              order: 16,
              type: 'ASSIGNMENT',
              
              estimatedDuration: 120,
              instructions: 'Handle administrative tasks and weekly planning.',
              taskTarget: {}
            }
          ]
        }
      ]
    }
  ];

  let totalProgramUsers = 0;

  // Use Madison Henry as the default assigner
  const assigner = await client.user.findFirst({
    where: { email: '1madison.henry@mailinator.com' }
  });

  if (!assigner) {
    console.error('❌ Default assigner not found');
    return;
  }

  for (const programData of programs) {
    console.log(`📋 Creating program: ${programData.name} for team: ${programData.teamName}`);
    
    // Calculate totals from stages
    const calculatedTimeExpectations = programData.stages.reduce((total: number, stage: any) => {
      return total + (stage.timeExpectations || 0);
    }, 0);
    const totalStages = programData.stages.length;
    
    console.log(`⏱️  Calculated total time expectations: ${calculatedTimeExpectations} hours`);
    console.log(`📊 Total stages: ${totalStages}`);
    
    // Find the team
    const team = await client.team.findFirst({
      where: { name: programData.teamName }
    });

    if (!team) {
      console.error(`❌ Team not found: ${programData.teamName}`);
      continue;
    }

    // Create the program with stages and tasks
    const program = await client.program.create({
      data: {
        name: programData.name,
        subtitle: 'From license to first commission—fast.',
        description: 'Complete life insurance agent onboarding with field training and revenue generation.',
        teamId: team.id,
        status: programData.status,
        publishDate: new Date('2024-01-01'),
        activeDate: new Date('2024-01-15'),
        endDate: null, // Active program
        outcomeType: programData.outcomeType,
        outcomeTarget: 1000,
        productivityTarget: {
          'commissions_earned': 1000,
          'premiums_written': 1200,
          'points_earned': 1200,
          'clients_helped': 2,
          'applications_submitted': 3
        },
        timeExpectations: calculatedTimeExpectations,
        totalStages: totalStages,
        measurementFrequency: programData.measurementFrequency,
        prerequisites: {
          requiredPrograms: [],
          approvalRequired: true,
          approverRole: 'HIRING_MANAGER'
        },

        stages: {
          create: programData.stages.map((stageData: any) => ({
            name: stageData.name,
            description: stageData.description,
            order: stageData.order,
            status: stageData.status,
            timeExpectations: stageData.timeExpectations,
            dependencies: stageData.dependencies,

            desiredOutcomes: stageData.desiredOutcomes,
            outcomeTargets: stageData.outcomeTargets,
            outcomeActuals: stageData.outcomeActuals,
            totalTasks: stageData.tasks.length,
            tasks: {
              create: stageData.tasks.map((taskData: any) => ({
                name: taskData.name,
                description: taskData.description,
                order: taskData.order,
                status: 'ACTIVE',
                type: taskData.type,
                instructions: taskData.instructions,
                estimatedDuration: taskData.estimatedDuration,
                taskTarget: taskData.taskTarget
              }))
            }
          }))
        }
      }
    });

    console.log(`✅ Created program: ${program.name} (${program.id}) for team: ${team.name}`);

    // Assign all team members to the program
    const teamMembers = await client.teamMember.findMany({
      where: { teamId: team.id },
      include: { user: true }
    });

    // Program user assignments based on seed_programs_programRoles.csv
    // Only PARTICIPANT and SUPPORTER roles are actually enrolled in the program
    // participantType is used for scaling program expectations (null for supporters)
    const programUserData = [
      { email: '1avery.lee@mailinator.com', role: ProgramRole.PARTICIPANT, status: ParticipantStatus.ENROLLED, participantType: 'NEW_INSURANCE_AGENT_FULL_TIME' },
      { email: '1youseff.marrak@mailinator.com', role: ProgramRole.PARTICIPANT, status: ParticipantStatus.ENROLLED, participantType: 'NEW_INSURANCE_AGENT_FULL_TIME' },
      { email: '1zeb.rowen@mailinator.com', role: ProgramRole.PARTICIPANT, status: ParticipantStatus.ENROLLED, participantType: 'NEW_INSURANCE_AGENT_FULL_TIME' },
      { email: '1jordan.ortiz@mailinator.com', role: ProgramRole.PARTICIPANT, status: ParticipantStatus.ENROLLED, participantType: 'NEW_INSURANCE_AGENT_FULL_TIME' },
      { email: '1alexis.torres@mailinator.com', role: ProgramRole.PARTICIPANT, status: ParticipantStatus.ENROLLED, participantType: 'NEW_INSURANCE_AGENT_FULL_TIME' },
      { email: '1xiu.ying@mailinator.com', role: ProgramRole.SUPPORTER, status: ParticipantStatus.ENROLLED, participantType: null },
      { email: '1rajesh.kumar@mailinator.com', role: ProgramRole.SUPPORTER, status: ParticipantStatus.ENROLLED, participantType: null }
    ];

    for (const userData of programUserData) {
      const user = userMap.get(userData.email);
      
      if (!user) {
        console.error(`❌ User not found: ${userData.email}`);
        continue;
      }

      await client.programUser.create({
        data: {
          programId: program.id,
          userId: user.id,
          role: userData.role,
          participantType: userData.participantType as any,
          status: userData.status,
          assignedBy: assigner.id,
          notes: 'Assigned based on seed_programs_programRoles.csv'
        }
      });
      totalProgramUsers++;
    }
  }

  console.log(`👤 Using default assigner: ${assigner.name} (${assigner.email})`);
  console.log(`✅ Created ${totalProgramUsers} program user assignments`);

  console.log('✅ Seed completed successfully!\n');

  console.log('📋 Summary:');
  console.log(`- ${TENANT_DATA.length} tenant created`);
  console.log(`- ${TENANT_DATA.reduce((acc, tenant) => acc + tenant.teams.length, 0)} teams created`);
  console.log(`- ${userMap.size} unique users created`);
  console.log(`- ${programs.length} programs created (${programs.length} total)`);
  console.log(`- ${totalProgramUsers} program user assignments created`);
  console.log('- Default password for all users: password123');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await client.$disconnect();
  });
