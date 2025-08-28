import { PrismaClient } from '@prisma/client';
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

// CSV data converted to structured format
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
  },
  {
    name: 'Super Realty Team',
    domain: null, // Independent agency
    teams: [
      {
        name: 'Super Realty Team',
        slug: 'super-realty-team',
        isMainTeam: true,
        users: [
          { name: 'Jin Kim', email: '2jin-soo.kim@mailinator.com', role: 'OWNER' },
          { name: 'Madison Henry', email: '2madison.henry@mailinator.com', role: 'ADMIN' },
          { name: 'Avery Lee', email: '2avery.lee@mailinator.com', role: 'MEMBER' },
          { name: 'Youseff Marrak', email: '2youseff.marrak@mailinator.com', role: 'MEMBER' },
          { name: 'Zeb Rowen', email: '2zeb.rowen@mailinator.com', role: 'MEMBER' },
          { name: 'Jordan Ortiz', email: '2jordan.ortiz@mailinator.com', role: 'MEMBER' },
          { name: 'Gary Gunnison', email: '2gary.gunnison@mailinator.com', role: 'ADMIN' },
          { name: 'Alexis Torres', email: '2alexis.torres@mailinator.com', role: 'MEMBER' },
          { name: 'Xiu Ying', email: '2xiu.ying@mailinator.com', role: 'MEMBER' },
          { name: 'Rajesh Kumar', email: '2rajesh.kumar@mailinator.com', role: 'MEMBER' }
        ]
      },
      {
        name: 'Managers Group',
        slug: 'super-realty-team-managers',
        isMainTeam: false,
        users: [
          { email: '2jin-soo.kim@mailinator.com', role: 'OWNER' },
          { email: '2madison.henry@mailinator.com', role: 'ADMIN' },
          { email: '2gary.gunnison@mailinator.com', role: 'ADMIN' }
        ]
      },
      {
        name: 'Pinnacle',
        slug: 'super-realty-team-pinnacle',
        isMainTeam: false,
        users: [
          { email: '2avery.lee@mailinator.com', role: 'MEMBER' },
          { email: '2zeb.rowen@mailinator.com', role: 'MEMBER' },
          { email: '2xiu.ying@mailinator.com', role: 'MEMBER' }
        ]
      },
      {
        name: 'Synergy',
        slug: 'super-realty-team-synergy',
        isMainTeam: false,
        users: [
          { email: '2youseff.marrak@mailinator.com', role: 'MEMBER' },
          { email: '2jordan.ortiz@mailinator.com', role: 'MEMBER' },
          { email: '2alexis.torres@mailinator.com', role: 'MEMBER' },
          { email: '2rajesh.kumar@mailinator.com', role: 'MEMBER' }
        ]
      }
    ]
  },
  {
    name: 'Super Enterprise Software',
    domain: 'supersoftware.com', // Enterprise company
    teams: [
      {
        name: 'Super Enterprise Software',
        slug: 'super-enterprise-software',
        isMainTeam: true,
        users: [
          { name: 'Jin Kim', email: '3jin-soo.kim@mailinator.com', role: 'OWNER' },
          { name: 'Madison Henry', email: '3madison.henry@mailinator.com', role: 'ADMIN' },
          { name: 'Avery Lee', email: '3avery.lee@mailinator.com', role: 'MEMBER' },
          { name: 'Youseff Marrak', email: '3youseff.marrak@mailinator.com', role: 'MEMBER' },
          { name: 'Zeb Rowen', email: '3zeb.rowen@mailinator.com', role: 'MEMBER' },
          { name: 'Jordan Ortiz', email: '3jordan.ortiz@mailinator.com', role: 'MEMBER' },
          { name: 'Gary Gunnison', email: '3gary.gunnison@mailinator.com', role: 'ADMIN' },
          { name: 'Alexis Torres', email: '3alexis.torres@mailinator.com', role: 'MEMBER' },
          { name: 'Xiu Ying', email: '3xiu.ying@mailinator.com', role: 'MEMBER' },
          { name: 'Rajesh Kumar', email: '3rajesh.kumar@mailinator.com', role: 'MEMBER' }
        ]
      },
      {
        name: 'Managers Group',
        slug: 'super-enterprise-software-managers',
        isMainTeam: false,
        users: [
          { email: '3jin-soo.kim@mailinator.com', role: 'OWNER' },
          { email: '3madison.henry@mailinator.com', role: 'ADMIN' },
          { email: '3gary.gunnison@mailinator.com', role: 'ADMIN' }
        ]
      },
      {
        name: 'Sales Team',
        slug: 'super-enterprise-software-sales',
        isMainTeam: false,
        users: [
          { email: '3avery.lee@mailinator.com', role: 'MEMBER' },
          { email: '3jordan.ortiz@mailinator.com', role: 'MEMBER' },
          { email: '3gary.gunnison@mailinator.com', role: 'ADMIN' },
          { email: '3alexis.torres@mailinator.com', role: 'MEMBER' },
          { email: '3xiu.ying@mailinator.com', role: 'MEMBER' }
        ]
      },
      {
        name: 'Engineering Team',
        slug: 'super-enterprise-software-engineering',
        isMainTeam: false,
        users: [
          { email: '3youseff.marrak@mailinator.com', role: 'MEMBER' },
          { email: '3zeb.rowen@mailinator.com', role: 'MEMBER' },
          { email: '3gary.gunnison@mailinator.com', role: 'ADMIN' },
          { email: '3rajesh.kumar@mailinator.com', role: 'MEMBER' }
        ]
      }
    ]
  },
  {
    name: 'Super Insurance Carrier',
    domain: 'supercarrier.com', // Enterprise company
    teams: [
      {
        name: 'Super Insurance Carrier',
        slug: 'super-insurance-carrier',
        isMainTeam: true,
        users: [
          { name: 'Jin Kim', email: '4jin-soo.kim@mailinator.com', role: 'OWNER' },
          { name: 'Madison Henry', email: '4madison.henry@mailinator.com', role: 'ADMIN' },
          { name: 'Avery Lee', email: '4avery.lee@mailinator.com', role: 'MEMBER' },
          { name: 'Youseff Marrak', email: '4youseff.marrak@mailinator.com', role: 'MEMBER' },
          { name: 'Zeb Rowen', email: '4zeb.rowen@mailinator.com', role: 'MEMBER' },
          { name: 'Jordan Ortiz', email: '4jordan.ortiz@mailinator.com', role: 'MEMBER' },
          { name: 'Gary Gunnison', email: '4gary.gunnison@mailinator.com', role: 'ADMIN' },
          { name: 'Alexis Torres', email: '4alexis.torres@mailinator.com', role: 'MEMBER' },
          { name: 'Xiu Ying', email: '4xiu.ying@mailinator.com', role: 'MEMBER' },
          { name: 'Rajesh Kumar', email: '4rajesh.kumar@mailinator.com', role: 'MEMBER' }
        ]
      },
      {
        name: 'Managers Group',
        slug: 'super-insurance-carrier-managers',
        isMainTeam: false,
        users: [
          { email: '4jin-soo.kim@mailinator.com', role: 'OWNER' },
          { email: '4madison.henry@mailinator.com', role: 'ADMIN' },
          { email: '4gary.gunnison@mailinator.com', role: 'ADMIN' }
        ]
      },
      {
        name: 'Sales Team',
        slug: 'super-insurance-carrier-sales',
        isMainTeam: false,
        users: [
          { email: '4madison.henry@mailinator.com', role: 'ADMIN' },
          { email: '4avery.lee@mailinator.com', role: 'MEMBER' },
          { email: '4youseff.marrak@mailinator.com', role: 'MEMBER' },
          { email: '4zeb.rowen@mailinator.com', role: 'MEMBER' },
          { email: '4jordan.ortiz@mailinator.com', role: 'MEMBER' },
          { email: '4gary.gunnison@mailinator.com', role: 'ADMIN' },
          { email: '4alexis.torres@mailinator.com', role: 'MEMBER' },
          { email: '4xiu.ying@mailinator.com', role: 'MEMBER' },
          { email: '4rajesh.kumar@mailinator.com', role: 'MEMBER' }
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
  const teams = await client.team.count();
  const teamMembers = await client.teamMember.count();
  const invitations = await client.invitation.count();
  
  console.log('🔍 Database state after clearing:');
  console.log(`- Users: ${users}`);
  console.log(`- Teams: ${teams}`);
  console.log(`- Team Members: ${teamMembers}`);
  console.log(`- Invitations: ${invitations}`);
  
  if (users === 0 && teams === 0 && teamMembers === 0 && invitations === 0) {
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
        const team = teamMap.get(teamData.name);
        await client.teamMember.create({
          data: {
            teamId: team.id,
            userId: user.id,
            role: userData.role as any,
          },
        });
      }
    }
  }

  // Create programs and program users
  console.log('\n📋 Creating programs and program users...');
  
  // Sample programs data (without License Launchpad)
  const PROGRAMS = [
    {
      name: 'Sales Development Onboarding',
      subtitle: 'Essential training for new sales development representatives',
      description: 'Comprehensive onboarding program covering sales techniques, CRM tools, and customer engagement strategies',
      programBenefits: [
        'Faster ramp-up to productivity',
        'Improved sales performance',
        'Better customer relationships',
        'Higher conversion rates'
      ],
      status: 'PUBLISHED',
      enrollmentType: 'MANAGER_ASSIGNED',
      enrollmentStartDate: new Date('2024-01-01'),
      enrollmentEndDate: new Date('2024-12-31'),
      publishDate: new Date('2024-01-01'),
      activeDate: new Date('2024-01-15'),
      endDate: new Date('2024-12-31'),
      expectedOutcomeType: 'REVENUE_TARGET',
      timeExpectations: 60,
      measurementFrequency: 'WEEKLY',
      eligibilityCriteria: {
        role: ['MEMBER'],
        experienceLevel: 'NEW_HIRE',
        department: ['SALES']
      },
      prerequisites: {
        requiredPrograms: [],
        approvalRequired: true,
        approverRole: 'HIRING_MANAGER'
      },
      consentLabel: 'I agree to participate in the sales development onboarding program',
      ctaButtonText: 'Start Sales Training'
    },
    {
      name: 'CodeStart Academy',
      subtitle: 'Comprehensive coding bootcamp for new software engineers',
      description: 'Intensive programming bootcamp covering modern development practices, tools, and team collaboration',
      programBenefits: [
        'Master modern programming languages',
        'Learn industry best practices',
        'Build real-world projects',
        'Prepare for engineering roles'
      ],
      status: 'ACTIVE',
      enrollmentType: 'SELF_SELECT',
      enrollmentStartDate: new Date('2024-02-01'),
      enrollmentEndDate: new Date('2024-11-30'),
      publishDate: new Date('2024-02-01'),
      activeDate: new Date('2024-02-15'),
      endDate: new Date('2024-11-30'),
      expectedOutcomeType: 'QUALITY_STANDARD',
      timeExpectations: 200,
      measurementFrequency: 'WEEKLY',
      eligibilityCriteria: {
        role: ['MEMBER'],
        experienceLevel: 'BEGINNER',
        department: ['ENGINEERING']
      },
      prerequisites: {
        requiredPrograms: [],
        approvalRequired: false,
        approverRole: null
      },
      consentLabel: 'I commit to completing the full coding bootcamp program',
      ctaButtonText: 'Join Academy'
    },
    {
      name: 'New Agent School',
      subtitle: 'Comprehensive training for new insurance agents',
      description: 'Complete training program covering insurance products, regulations, and client relationship management',
      programBenefits: [
        'Comprehensive product knowledge',
        'Regulatory compliance training',
        'Client relationship skills',
        'Commission optimization'
      ],
      status: 'ACTIVE',
      enrollmentType: 'MANAGER_ASSIGNED',
      enrollmentStartDate: new Date('2024-01-01'),
      enrollmentEndDate: new Date('2024-12-31'),
      publishDate: new Date('2024-01-01'),
      activeDate: new Date('2024-01-15'),
      endDate: new Date('2024-12-31'),
      expectedOutcomeType: 'REVENUE_TARGET',
      timeExpectations: 120,
      measurementFrequency: 'WEEKLY',
      eligibilityCriteria: {
        role: ['MEMBER'],
        experienceLevel: 'NEW_HIRE',
        department: ['SALES']
      },
      prerequisites: {
        requiredPrograms: [],
        approvalRequired: true,
        approverRole: 'HIRING_MANAGER'
      },
      consentLabel: 'I agree to complete the new agent training program',
      ctaButtonText: 'Start Agent Training'
    }
  ];

  // Program assignments (updated without License Launchpad)
  const PROGRAM_ASSIGNMENTS = [
    // Sales Development Onboarding assignments
    { email: '3avery.lee@mailinator.com', programName: 'Sales Development Onboarding', role: 'PARTICIPANT' },
    { email: '3jordan.ortiz@mailinator.com', programName: 'Sales Development Onboarding', role: 'PARTICIPANT' },
    { email: '3alexis.torres@mailinator.com', programName: 'Sales Development Onboarding', role: 'PARTICIPANT' },
    { email: '3xiu.ying@mailinator.com', programName: 'Sales Development Onboarding', role: 'SUPPORTER' },
    
    // CodeStart Academy assignments
    { email: '3youseff.marrak@mailinator.com', programName: 'CodeStart Academy', role: 'PARTICIPANT' },
    { email: '3zeb.rowen@mailinator.com', programName: 'CodeStart Academy', role: 'PARTICIPANT' },
    
    // New Agent School assignments (including former License Launchpad users)
    { email: '1avery.lee@mailinator.com', programName: 'New Agent School', role: 'PARTICIPANT' },
    { email: '1youseff.marrak@mailinator.com', programName: 'New Agent School', role: 'PARTICIPANT' },
    { email: '1alexis.torres@mailinator.com', programName: 'New Agent School', role: 'PARTICIPANT' },
    { email: '1gary.gunnison@mailinator.com', programName: 'New Agent School', role: 'HIRING_MANAGER' },
    { email: '1xiu.ying@mailinator.com', programName: 'New Agent School', role: 'SUPPORTER' },
    { email: '1zeb.rowen@mailinator.com', programName: 'New Agent School', role: 'PARTICIPANT' },
    { email: '1jordan.ortiz@mailinator.com', programName: 'New Agent School', role: 'PARTICIPANT' },
    { email: '1rajesh.kumar@mailinator.com', programName: 'New Agent School', role: 'SUPPORTER' },
    
    { email: '2avery.lee@mailinator.com', programName: 'New Agent School', role: 'PARTICIPANT' },
    { email: '2youseff.marrak@mailinator.com', programName: 'New Agent School', role: 'PARTICIPANT' },
    { email: '2alexis.torres@mailinator.com', programName: 'New Agent School', role: 'PARTICIPANT' },
    { email: '2gary.gunnison@mailinator.com', programName: 'New Agent School', role: 'HIRING_MANAGER' },
    { email: '2xiu.ying@mailinator.com', programName: 'New Agent School', role: 'SUPPORTER' },
    { email: '2zeb.rowen@mailinator.com', programName: 'New Agent School', role: 'PARTICIPANT' },
    { email: '2jordan.ortiz@mailinator.com', programName: 'New Agent School', role: 'PARTICIPANT' },
    { email: '2rajesh.kumar@mailinator.com', programName: 'New Agent School', role: 'SUPPORTER' },
    
    { email: '4avery.lee@mailinator.com', programName: 'New Agent School', role: 'PARTICIPANT' },
    { email: '4youseff.marrak@mailinator.com', programName: 'New Agent School', role: 'PARTICIPANT' },
    { email: '4zeb.rowen@mailinator.com', programName: 'New Agent School', role: 'PARTICIPANT' },
    { email: '4jordan.ortiz@mailinator.com', programName: 'New Agent School', role: 'PARTICIPANT' },
    { email: '4alexis.torres@mailinator.com', programName: 'New Agent School', role: 'PARTICIPANT' },
    
    // Global roles (apply to all programs)
    { email: '1jin-soo.kim@mailinator.com', programName: 'Sales Development Onboarding', role: 'EXECUTIVE' },
    { email: '1jin-soo.kim@mailinator.com', programName: 'CodeStart Academy', role: 'EXECUTIVE' },
    { email: '1jin-soo.kim@mailinator.com', programName: 'New Agent School', role: 'EXECUTIVE' },
    { email: '2jin-soo.kim@mailinator.com', programName: 'Sales Development Onboarding', role: 'EXECUTIVE' },
    { email: '2jin-soo.kim@mailinator.com', programName: 'CodeStart Academy', role: 'EXECUTIVE' },
    { email: '2jin-soo.kim@mailinator.com', programName: 'New Agent School', role: 'EXECUTIVE' },
    { email: '3jin-soo.kim@mailinator.com', programName: 'Sales Development Onboarding', role: 'EXECUTIVE' },
    { email: '3jin-soo.kim@mailinator.com', programName: 'CodeStart Academy', role: 'EXECUTIVE' },
    { email: '3jin-soo.kim@mailinator.com', programName: 'New Agent School', role: 'EXECUTIVE' },
    { email: '4jin-soo.kim@mailinator.com', programName: 'Sales Development Onboarding', role: 'EXECUTIVE' },
    { email: '4jin-soo.kim@mailinator.com', programName: 'CodeStart Academy', role: 'EXECUTIVE' },
    { email: '4jin-soo.kim@mailinator.com', programName: 'New Agent School', role: 'EXECUTIVE' },
    
    // Program Managers
    { email: '1madison.henry@mailinator.com', programName: 'Sales Development Onboarding', role: 'PROGRAM_MANAGER' },
    { email: '1madison.henry@mailinator.com', programName: 'CodeStart Academy', role: 'PROGRAM_MANAGER' },
    { email: '1madison.henry@mailinator.com', programName: 'New Agent School', role: 'PROGRAM_MANAGER' },
    { email: '2madison.henry@mailinator.com', programName: 'Sales Development Onboarding', role: 'PROGRAM_MANAGER' },
    { email: '2madison.henry@mailinator.com', programName: 'CodeStart Academy', role: 'PROGRAM_MANAGER' },
    { email: '2madison.henry@mailinator.com', programName: 'New Agent School', role: 'PROGRAM_MANAGER' },
    { email: '3madison.henry@mailinator.com', programName: 'Sales Development Onboarding', role: 'PROGRAM_MANAGER' },
    { email: '3madison.henry@mailinator.com', programName: 'CodeStart Academy', role: 'PROGRAM_MANAGER' },
    { email: '3madison.henry@mailinator.com', programName: 'New Agent School', role: 'PROGRAM_MANAGER' },
    { email: '4madison.henry@mailinator.com', programName: 'Sales Development Onboarding', role: 'PROGRAM_MANAGER' },
    { email: '4madison.henry@mailinator.com', programName: 'CodeStart Academy', role: 'PROGRAM_MANAGER' },
    { email: '4madison.henry@mailinator.com', programName: 'New Agent School', role: 'PROGRAM_MANAGER' },
    
    // Additional Hiring Managers
    { email: '3gary.gunnison@mailinator.com', programName: 'Sales Development Onboarding', role: 'HIRING_MANAGER' },
    { email: '3gary.gunnison@mailinator.com', programName: 'CodeStart Academy', role: 'HIRING_MANAGER' },
    { email: '3gary.gunnison@mailinator.com', programName: 'New Agent School', role: 'HIRING_MANAGER' },
    { email: '4gary.gunnison@mailinator.com', programName: 'Sales Development Onboarding', role: 'HIRING_MANAGER' },
    { email: '4gary.gunnison@mailinator.com', programName: 'CodeStart Academy', role: 'HIRING_MANAGER' },
    { email: '4gary.gunnison@mailinator.com', programName: 'New Agent School', role: 'HIRING_MANAGER' },
    
    // Additional Supporters
    { email: '3rajesh.kumar@mailinator.com', programName: 'Sales Development Onboarding', role: 'SUPPORTER' },
    { email: '3rajesh.kumar@mailinator.com', programName: 'CodeStart Academy', role: 'SUPPORTER' },
    { email: '3rajesh.kumar@mailinator.com', programName: 'New Agent School', role: 'SUPPORTER' },
    { email: '4xiu.ying@mailinator.com', programName: 'Sales Development Onboarding', role: 'SUPPORTER' },
    { email: '4xiu.ying@mailinator.com', programName: 'CodeStart Academy', role: 'SUPPORTER' },
    { email: '4xiu.ying@mailinator.com', programName: 'New Agent School', role: 'SUPPORTER' }
  ];

  // Get the first team to associate programs with
  const firstTeam = await client.team.findFirst();
  if (!firstTeam) {
    console.error('❌ No teams found. Cannot create programs.');
    return;
  }
  
  console.log(`🏢 Using team: ${firstTeam.name} (${firstTeam.id})`);
  
  // Create programs
  const programMap = new Map();
  for (const programData of PROGRAMS) {
    console.log(`📋 Creating program: ${programData.name}`);
    
    const program = await client.program.create({
      data: {
        ...programData,
        teamId: firstTeam.id
      },
    });
    
    programMap.set(program.name, program);
    console.log(`✅ Created program: ${program.name} (${program.id})`);
  }
  
  // Get a default assigner
  const defaultAssigner = Array.from(userMap.values()).find(u => u.email.includes('madison.henry'));
  if (!defaultAssigner) {
    console.error('❌ No default assigner found');
    return;
  }
  
  console.log(`👤 Using default assigner: ${defaultAssigner.name} (${defaultAssigner.email})`);
  
  // Create program user assignments
  let createdCount = 0;
  for (const assignment of PROGRAM_ASSIGNMENTS) {
    const program = programMap.get(assignment.programName);
    const user = userMap.get(assignment.email);
    
    if (!program || !user) {
      console.error(`❌ Program or user not found: ${assignment.programName} / ${assignment.email}`);
      continue;
    }
    
    try {
      await client.programUser.create({
        data: {
          programId: program.id,
          userId: user.id,
          role: assignment.role,
          assignedBy: defaultAssigner.id,
          status: assignment.role === 'PARTICIPANT' ? 'ENROLLED' : 'COMPLETED'
        },
      });
      
      createdCount++;
      
    } catch (error) {
      if (error.code === 'P2002') {
        console.log(`⏭️  Skipped duplicate: ${user.name} (${assignment.role}) in ${program.name}`);
      } else {
        console.error(`❌ Error creating assignment: ${error.message}`);
      }
    }
  }
  
  console.log(`✅ Created ${createdCount} program user assignments`);

  console.log('✅ Seed completed successfully!');
  console.log('\n📋 Summary:');
  console.log(`- ${TENANT_DATA.length} tenants created`);
  console.log(`- ${TENANT_DATA.reduce((acc, tenant) => acc + tenant.teams.length, 0)} teams created`);
  console.log(`- ${userMap.size} unique users created`);
  console.log(`- ${PROGRAMS.length} programs created`);
  console.log(`- ${createdCount} program user assignments created`);
  console.log(`- Default password for all users: password123`);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await client.$disconnect();
  });
