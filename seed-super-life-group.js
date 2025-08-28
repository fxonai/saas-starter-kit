const { PrismaClient } = require('@prisma/client');

const client = new PrismaClient();

// Super Life Group - New Agent School Program Structure
const SUPER_LIFE_GROUP_PROGRAM = {
  name: 'New Agent School',
  subtitle: 'From license to first commission—fast.',
  description: 'Complete life insurance agent onboarding with field training and revenue generation. Master the 3-3-60 Game Plan and build your agency systematically.',
  programBenefits: [
    'Structured onboarding from license to first sale',
    'Field training with experienced agents',
    'Systematic lead generation and qualification',
    'Revenue-focused training with ROI tracking',
    'Warm network and cold list development'
  ],
  status: 'PUBLISHED',
  enrollmentType: 'MANAGER_ASSIGNED',
  enrollmentStartDate: new Date('2024-01-01'),
  enrollmentEndDate: null, // Active program - no end date
  publishDate: new Date('2024-01-01'),
  activeDate: new Date('2024-01-15'),
  endDate: null, // Active program - no end date
  expectedOutcomeType: 'REVENUE_TARGET',
  expectedRevenueTarget: 1000, // $1K revenue target
  expectedProductivityTarget: {
    'commissions_earned': 1000,
    'premiums_written': 1200,
    'points_earned': 1200,
    'clients_helped': 2,
    'applications_submitted': 3
  },
  timeExpectations: 156, // Total hours across all stages (30+20+20+22+64)
  measurementFrequency: 'DAILY',
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
  consentLabel: 'I commit to completing the full New Agent School program',
  ctaButtonText: 'Start New Agent School',
  stages: [
    {
      name: 'Week 1 Onboarding',
      description: 'Essential setup and foundational knowledge for new life insurance agents',
      order: 1,
      status: 'PUBLISHED',
      timeExpectations: 30, // 30 hours for pre-licensing education
      startDate: new Date('2024-01-15'),
      endDate: new Date('2024-01-21'),
      desiredOutcomes: [
        'Complete profile setup and orientation',
        'Enroll in pre-licensing course',
        'Schedule state exam',
        'Read foundational materials',
        'Attend orientation session'
      ],
              outcomeTargets: {
          'license_status': 1,
          'product_knowledge': 1,
          'commission_knowledge': 1,
          'professional_branding': 1,
          'business_connections': 1
        },
              outcomeActuals: {
        'license_status': 0,
        'product_knowledge': 0,
        'commission_knowledge': 0,
        'professional_branding': 0,
        'business_connections': 0
      },
      prerequisites: {
        requiredStages: [],
        requiredOutcomes: {}
      },
      completionCriteria: {
        type: 'ALL_TASKS_AND_OUTCOMES',
        requiredTasksCompleted: true,
        requiredOutcomeTargets: {
          'license_status': 1,
          'product_knowledge': 1,
          'commission_knowledge': 1,
          'professional_branding': 1,
          'business_connections': 1
        }
      },
      tasks: [
        {
          name: 'Start Here: Your Week 1 Launch Pad',
          description: 'Get ready for training with this interactive video.',
          order: 1,
          type: 'VIDEO',
          priority: 'CRITICAL',
          estimatedDuration: 10,
          instructions: 'Complete your profile and watch the launch pad video to understand your training journey.',
          completionCriteria: {
            type: 'MANUAL',
            requiredActions: ['Complete Your Profile', 'Watch Now']
          },
          taskTarget: {
            'profile_completed': 1,
            'course_enrolled': 0,
            'exam_scheduled': 0,
            'orientation_attended': 0,
            'materials_read': 0
          }
        },
        {
          name: 'Enroll in pre-licensing course',
          description: 'Select a course provider and enroll in your course.',
          order: 2,
          type: 'ASSIGNMENT',
          priority: 'CRITICAL',
          estimatedDuration: 10,
          instructions: 'Choose your preferred pre-licensing course provider and complete enrollment.',
          completionCriteria: {
            type: 'MANUAL',
            requiredActions: ['Enroll Now']
          },
          taskTarget: {
            'profile_completed': 0,
            'course_enrolled': 1,
            'exam_scheduled': 0,
            'orientation_attended': 0,
            'materials_read': 0
          }
        },
        {
          name: 'Schedule your state exam',
          description: 'Pick your exam date and get it on the calendar now.',
          order: 3,
          type: 'ASSIGNMENT',
          priority: 'HIGH',
          estimatedDuration: 10,
          instructions: 'Schedule your state licensing exam for after your course completion.',
          completionCriteria: {
            type: 'MANUAL',
            requiredActions: ['Schedule Exam']
          },
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
          priority: 'HIGH',
          estimatedDuration: 45,
          instructions: 'Read the foundational book to understand the life insurance industry.',
          resources: {
            documents: ['Money_Wealth_Life_Insurance.pdf'],
            videos: ['https://example.com/book-overview']
          },
          completionCriteria: {
            type: 'MANUAL',
            requiredActions: ['Get the Quick Notes']
          },
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
          priority: 'HIGH',
          estimatedDuration: 90,
          instructions: 'Attend the mandatory orientation session to meet your team and understand expectations.',
          completionCriteria: {
            type: 'MANUAL',
            requiredActions: ['Schedule Orientation']
          },
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
          priority: 'MEDIUM',
          estimatedDuration: 5,
          instructions: 'Schedule your Week 2 coaching session with your assigned trainer.',
          completionCriteria: {
            type: 'MANUAL',
            requiredActions: ['Schedule Coaching']
          },
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
      description: 'Learn the 3-3-60 Game Plan and build your fantasy team',
      order: 2,
      status: 'PUBLISHED',
      timeExpectations: 20, // 20 hours for pre-licensing education
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
      prerequisites: {
        requiredStages: [],
        requiredOutcomes: {}
      },
      completionCriteria: {
        type: 'ALL_TASKS_AND_OUTCOMES',
        requiredTasksCompleted: true,
        requiredOutcomeTargets: {
          'license_status': 1,
          'prospect_names': 160 // 80% of 200 target
        }
      },
      tasks: [
        {
          name: 'Start Week 2: Learn the 3-3-60 Game Plan',
          description: 'Understand how to grow your agency fast with business partners.',
          order: 1,
          type: 'VIDEO',
          priority: 'CRITICAL',
          estimatedDuration: 10,
          instructions: 'Watch the video explaining the 3-3-60 Game Plan for agency growth.',
          completionCriteria: {
            type: 'MANUAL',
            requiredActions: ['Complete Your Snapshot', 'Watch Now']
          },
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
          priority: 'HIGH',
          estimatedDuration: 5,
          instructions: 'Identify and list your ideal business partners and team members.',
          completionCriteria: {
            type: 'MANUAL',
            requiredActions: ['Add Your Dream Team']
          },
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
          priority: 'HIGH',
          estimatedDuration: 30,
          instructions: 'Use memory joggers to expand your contact list systematically.',
          resources: {
            documents: ['Memory_Joggers_List.pdf'],
            apps: ['Contact_Expansion_App']
          },
          completionCriteria: {
            type: 'MANUAL',
            requiredActions: ['Download the App']
          },
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
          priority: 'CRITICAL',
          estimatedDuration: 120,
          instructions: 'Complete your state licensing exam and achieve a passing score.',
          completionCriteria: {
            type: 'MANUAL',
            requiredActions: ['Pass Your Exam']
          },
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
          priority: 'MEDIUM',
          estimatedDuration: 5,
          instructions: 'Schedule your Week 3 coaching session.',
          completionCriteria: {
            type: 'MANUAL',
            requiredActions: ['Schedule Coaching']
          },
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
      description: 'Field training basics and lead qualification',
      order: 3,
      status: 'PUBLISHED',
      timeExpectations: 20, // 20 hours for prospecting and exam prep
      startDate: new Date('2024-01-29'),
      endDate: new Date('2024-02-04'),
      desiredOutcomes: [
        'Understand field training process',
        'Qualify leads with MACHO traits',
        'Practice invitation scripts',
        'Prepare for field training appointments'
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
      prerequisites: {
        requiredStages: ['Week 1 Onboarding', 'Week 2 Onboarding'],
        requiredOutcomes: {}
      },
      completionCriteria: {
        type: 'ALL_TASKS_AND_OUTCOMES',
        requiredTasksCompleted: true,
        requiredOutcomeTargets: {
          'prospect_names': 160, // 80% of 200 target
          'qualified_leads': 80, // 80% of 100 target
          'appointments_scheduled': 8 // 80% of 10 target
        }
      },
      tasks: [
        {
          name: 'Start Week 3: Field Training Basics',
          description: 'Learn how field training helps you build confidence.',
          order: 1,
          type: 'VIDEO',
          priority: 'HIGH',
          estimatedDuration: 10,
          instructions: 'Watch the field training basics video to understand the process.',
          completionCriteria: {
            type: 'MANUAL',
            requiredActions: ['Watch Now']
          },
          taskTarget: {
            'field_training_understood': 1,
            'leads_qualified': 0,
            'scripts_practiced': 0,
            'appointments_prepared': 0
          }
        },
        {
          name: 'Qualify your list of names for marketing',
          description: 'Profile your leads with MACHO traits and connection levels.',
          order: 2,
          type: 'ASSIGNMENT',
          priority: 'HIGH',
          estimatedDuration: 45,
          instructions: 'Use MACHO criteria to qualify your contact list for marketing.',
          resources: {
            documents: ['MACHO_Qualification_Guide.pdf'],
            tools: ['Lead_Qualification_Tool']
          },
          completionCriteria: {
            type: 'MANUAL',
            requiredActions: ['Start Qualifying']
          },
          taskTarget: {
            'field_training_understood': 0,
            'leads_qualified': 50,
            'scripts_practiced': 0,
            'appointments_prepared': 0
          }
        },
        {
          name: 'Practice your script for extending invitations',
          description: 'Use the ETHOR approach to invite without pressure or over-explaining.',
          order: 3,
          type: 'PRACTICE',
          priority: 'HIGH',
          estimatedDuration: 5,
          instructions: 'Practice your invitation script using the ETHOR methodology.',
          resources: {
            documents: ['ETHOR_Script_Guide.pdf'],
            videos: ['https://example.com/ethor-demo']
          },
          completionCriteria: {
            type: 'MANUAL',
            requiredActions: ['Rehearse Now', 'Schedule Roll Play']
          },
          taskTarget: {
            'field_training_understood': 0,
            'leads_qualified': 0,
            'scripts_practiced': 1,
            'appointments_prepared': 0
          }
        },
        {
          name: 'Warm Network Prospecting Calls',
          description: 'Make daily calls to your warm network to build prospect list.',
          order: 4,
          type: 'ASSIGNMENT',
          priority: 'HIGH',
          estimatedDuration: 600, // 10 hours over the week
          instructions: 'Call 20 people from your warm network daily to expand your prospect list.',
          completionCriteria: {
            type: 'MANUAL',
            requiredActions: ['Log Calls', 'Update Prospect List']
          },
          taskTarget: {
            'prospect_names': 100,
            'warm_calls_made': 100,
            'connections_renewed': 50
          }
        },
        {
          name: 'Social Media Prospecting',
          description: 'Use social media to reconnect and expand your network.',
          order: 5,
          type: 'ASSIGNMENT',
          priority: 'MEDIUM',
          estimatedDuration: 300, // 5 hours over the week
          instructions: 'Engage with your social media network to identify prospects.',
          completionCriteria: {
            type: 'MANUAL',
            requiredActions: ['Post Updates', 'Engage with Connections']
          },
          taskTarget: {
            'prospect_names': 50,
            'social_engagements': 25,
            'online_connections': 25
          }
        },
        {
          name: 'Exam Preparation & Scheduling',
          description: 'Finalize exam preparation and schedule your state licensing exam.',
          order: 6,
          type: 'ASSIGNMENT',
          priority: 'CRITICAL',
          estimatedDuration: 240, // 4 hours over the week
          instructions: 'Complete exam prep and schedule your state licensing exam.',
          completionCriteria: {
            type: 'MANUAL',
            requiredActions: ['Complete Prep', 'Schedule Exam']
          },
          taskTarget: {
            'exam_scheduled': 1,
            'exam_prep_completed': 1,
            'license_status': 1
          }
        }
      ]
    },
    {
      name: 'Field Training',
      description: 'Complete 10 field training appointments with your trainer',
      order: 4,
      status: 'PUBLISHED',
      timeExpectations: 22, // 10 appointments × 2 hours each = 20 hours + 2 hours prep = 22 hours
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
      prerequisites: {
        requiredStages: ['Week 3 Onboarding'],
        requiredOutcomes: {}
      },
      completionCriteria: {
        type: 'PRIMARY_OUTCOME_FOCUS',
        requiredTasksCompleted: true,
        primaryOutcome: 'applications_submitted',
        requiredOutcomeTargets: {
          'applications_submitted': 3
        }
      },
      tasks: [
        {
          name: 'Complete Field Training',
          description: 'Finish 10 field training appointments with your trainer.',
          order: 1,
          type: 'SHADOWING',
          priority: 'CRITICAL',
          estimatedDuration: 120, // 2 hours total for field training overview
          instructions: 'Complete the full field training program with your assigned trainer.',
          resources: {
            videos: ['https://example.com/client-experience'],
            documents: ['Field_Training_Guide.pdf']
          },
          completionCriteria: {
            type: 'MANUAL',
            requiredActions: ['Watch the Client Experience', 'Take Notes']
          },
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
          priority: 'HIGH',
          estimatedDuration: 150, // 0.5 prep + 1 appointment + 1 recap = 2.5 hours
          instructions: 'Observe silently; learn flow, take notes, debrief after.',
          completionCriteria: {
            type: 'MANUAL',
            requiredActions: ['Add Client Name', 'Add Trainer Name']
          },
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
          priority: 'HIGH',
          estimatedDuration: 150, // 0.5 prep + 1 appointment + 1 recap = 2.5 hours
          instructions: 'Observe silently; learn flow, take notes, debrief after.',
          completionCriteria: {
            type: 'MANUAL',
            requiredActions: ['Add Client Name', 'Add Trainer Name']
          },
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
          priority: 'HIGH',
          estimatedDuration: 150, // 0.5 prep + 1 appointment + 1 recap = 2.5 hours
          instructions: 'Observe silently; learn flow, take notes, debrief after.',
          completionCriteria: {
            type: 'MANUAL',
            requiredActions: ['Add Client Name', 'Add Trainer Name']
          },
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
          priority: 'HIGH',
          estimatedDuration: 150, // 0.5 prep + 1 appointment + 1 recap = 2.5 hours
          instructions: 'Observe silently; learn flow, take notes, debrief after.',
          completionCriteria: {
            type: 'MANUAL',
            requiredActions: ['Add Client Name', 'Add Trainer Name']
          },
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
          priority: 'HIGH',
          estimatedDuration: 150, // 0.5 prep + 1 appointment + 1 recap = 2.5 hours
          instructions: 'Co-lead sections; capture data; trainer supports and coaches.',
          completionCriteria: {
            type: 'MANUAL',
            requiredActions: ['Add Client Name', 'Add Trainer Name']
          },
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
          priority: 'HIGH',
          estimatedDuration: 150, // 0.5 prep + 1 appointment + 1 recap = 2.5 hours
          instructions: 'Co-lead sections; capture data; trainer supports and coaches.',
          completionCriteria: {
            type: 'MANUAL',
            requiredActions: ['Add Client Name', 'Add Trainer Name']
          },
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
          priority: 'HIGH',
          estimatedDuration: 150, // 0.5 prep + 1 appointment + 1 recap = 2.5 hours
          instructions: 'Co-lead sections; capture data; trainer supports and coaches.',
          completionCriteria: {
            type: 'MANUAL',
            requiredActions: ['Add Client Name', 'Add Trainer Name']
          },
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
          priority: 'HIGH',
          estimatedDuration: 150, // 0.5 prep + 1 appointment + 1 recap = 2.5 hours
          instructions: 'Co-lead sections; capture data; trainer supports and coaches.',
          completionCriteria: {
            type: 'MANUAL',
            requiredActions: ['Add Client Name', 'Add Trainer Name']
          },
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
          priority: 'HIGH',
          estimatedDuration: 150, // 0.5 prep + 1 appointment + 1 recap = 2.5 hours
          instructions: 'Run full meeting; trainer observes; debrief; schedule next steps.',
          completionCriteria: {
            type: 'MANUAL',
            requiredActions: ['Add Client Name', 'Add Trainer Name']
          },
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
          priority: 'HIGH',
          estimatedDuration: 150, // 0.5 prep + 1 appointment + 1 recap = 2.5 hours
          instructions: 'Run full meeting; trainer observes; debrief; schedule next steps.',
          completionCriteria: {
            type: 'MANUAL',
            requiredActions: ['Add Client Name', 'Add Trainer Name']
          },
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
      status: 'PUBLISHED',
      timeExpectations: 64, // 4 weeks × 16 hours = 64 hours (14 productive + 2 admin per week)
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
      prerequisites: {
        requiredStages: ['Field Training'],
        requiredOutcomes: {}
      },
      completionCriteria: {
        type: 'PROGRAM_OUTCOMES',
        requiredTasksCompleted: true,
        requiredOutcomeTargets: {
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
        }
      },
      tasks: [
        // Week 1: Funnel Building Foundation (16 hours: 14 productive + 2 admin)
        {
          name: 'Week 1: Daily Prospecting Calls',
          description: 'Make daily prospecting calls to build your funnel foundation.',
          order: 1,
          type: 'ASSIGNMENT',
          priority: 'CRITICAL',
          estimatedDuration: 420, // 7 days × 60 minutes = 7 hours
          instructions: 'Make 20-30 prospecting calls per day for 7 days to build your initial funnel.',
          completionCriteria: {
            type: 'MANUAL',
            requiredActions: ['Complete Daily Call Log', 'Track Call Outcomes']
          },
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
          priority: 'HIGH',
          estimatedDuration: 210, // 7 days × 30 minutes = 3.5 hours
          instructions: 'Qualify leads from prospecting calls and follow up with interested prospects.',
          completionCriteria: {
            type: 'MANUAL',
            requiredActions: ['Qualify 5 Leads Daily', 'Schedule Follow-ups']
          },
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
          priority: 'HIGH',
          estimatedDuration: 210, // 7 days × 30 minutes = 3.5 hours
          instructions: 'Contact friends, family, and professional network for referrals.',
          completionCriteria: {
            type: 'MANUAL',
            requiredActions: ['Contact 10 Warm Contacts', 'Request Referrals']
          },
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
          priority: 'MEDIUM',
          estimatedDuration: 120, // 2 hours admin time
          instructions: 'Handle administrative tasks, email management, and weekly planning.',
          completionCriteria: {
            type: 'MANUAL',
            requiredActions: ['Clear Inbox', 'Schedule Next Week']
          },
          taskTarget: {}
        },
        
        // Week 2: Funnel + Client Meetings (16 hours: 14 productive + 2 admin)
        {
          name: 'Week 2: Continue Prospecting',
          description: 'Continue daily prospecting calls to maintain funnel momentum.',
          order: 5,
          type: 'ASSIGNMENT',
          priority: 'CRITICAL',
          estimatedDuration: 420, // 7 hours
          instructions: 'Continue making 20-30 prospecting calls per day.',
          completionCriteria: {
            type: 'MANUAL',
            requiredActions: ['Complete Daily Call Log', 'Track Call Outcomes']
          },
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
          priority: 'HIGH',
          estimatedDuration: 300, // 5 meetings × 60 minutes = 5 hours
          instructions: 'Conduct 5 client meetings with qualified prospects.',
          completionCriteria: {
            type: 'MANUAL',
            requiredActions: ['Complete 5 Meetings', 'Document Outcomes']
          },
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
          priority: 'HIGH',
          estimatedDuration: 120, // 2 hours
          instructions: 'Prepare for client meetings and follow up with meeting attendees.',
          completionCriteria: {
            type: 'MANUAL',
            requiredActions: ['Prepare for Each Meeting', 'Follow Up with Clients']
          },
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
          priority: 'MEDIUM',
          estimatedDuration: 120, // 2 hours admin time
          instructions: 'Handle administrative tasks and weekly planning.',
          completionCriteria: {
            type: 'MANUAL',
            requiredActions: ['Clear Inbox', 'Schedule Next Week']
          },
          taskTarget: {}
        },
        
        // Week 3: Funnel + Meetings + Illustrations & Apps (16 hours: 14 productive + 2 admin)
        {
          name: 'Week 3: Continue Prospecting & Meetings',
          description: 'Continue prospecting and client meetings.',
          order: 9,
          type: 'ASSIGNMENT',
          priority: 'CRITICAL',
          estimatedDuration: 480, // 8 hours
          instructions: 'Continue prospecting calls and conduct additional client meetings.',
          completionCriteria: {
            type: 'MANUAL',
            requiredActions: ['Complete Daily Calls', 'Conduct Meetings']
          },
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
          priority: 'HIGH',
          estimatedDuration: 180, // 3 hours
          instructions: 'Create 3 illustrations for client recommendations.',
          completionCriteria: {
            type: 'MANUAL',
            requiredActions: ['Create 3 Illustrations', 'Review with Clients']
          },
          taskTarget: {
            'illustrations_designed': 3
          }
        },
        {
          name: 'Week 3: Process Applications',
          description: 'Process applications for interested clients.',
          order: 11,
          type: 'ASSIGNMENT',
          priority: 'HIGH',
          estimatedDuration: 180, // 3 hours
          instructions: 'Process 3 applications for clients who want to proceed.',
          completionCriteria: {
            type: 'MANUAL',
            requiredActions: ['Process 3 Applications', 'Submit to Carriers']
          },
          taskTarget: {
            'applications_submitted': 3
          }
        },
        {
          name: 'Week 3: Admin & Planning',
          description: 'Manage inbox, scheduling, and weekly planning.',
          order: 12,
          type: 'ASSIGNMENT',
          priority: 'MEDIUM',
          estimatedDuration: 120, // 2 hours admin time
          instructions: 'Handle administrative tasks and weekly planning.',
          completionCriteria: {
            type: 'MANUAL',
            requiredActions: ['Clear Inbox', 'Schedule Next Week']
          },
          taskTarget: {}
        },
        
        // Week 4: Funnel + Meetings + Apps + Carrier Management & Commissions (16 hours: 14 productive + 2 admin)
        {
          name: 'Week 4: Continue All Activities',
          description: 'Continue prospecting, meetings, and application processing.',
          order: 13,
          type: 'ASSIGNMENT',
          priority: 'CRITICAL',
          estimatedDuration: 480, // 8 hours
          instructions: 'Continue all previous activities to maintain momentum.',
          completionCriteria: {
            type: 'MANUAL',
            requiredActions: ['Continue Daily Activities', 'Track Progress']
          },
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
          priority: 'HIGH',
          estimatedDuration: 180, // 3 hours
          instructions: 'Follow up with carriers on submitted applications and manage the process.',
          completionCriteria: {
            type: 'MANUAL',
            requiredActions: ['Follow Up with Carriers', 'Track Application Status']
          },
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
          priority: 'HIGH',
          estimatedDuration: 210, // 7 days × 30 minutes = 3.5 hours
          instructions: 'Track commission earnings and optimize strategies for maximum income.',
          completionCriteria: {
            type: 'MANUAL',
            requiredActions: ['Track Daily Commissions', 'Optimize Strategies']
          },
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
          priority: 'MEDIUM',
          estimatedDuration: 120, // 2 hours admin time
          instructions: 'Handle administrative tasks and weekly planning.',
          completionCriteria: {
            type: 'MANUAL',
            requiredActions: ['Clear Inbox', 'Schedule Next Week']
          },
          taskTarget: {}
        }
      ]
    }
  ]
};

async function seedSuperLifeGroup() {
  console.log('🌱 Starting Super Life Group seed...\n');

  try {
    // Find the Super Life Group team
    const team = await client.team.findFirst({
      where: { name: 'Super Life Group' }
    });

    if (!team) {
      console.error('❌ Super Life Group team not found');
      return;
    }

    console.log(`🏢 Found team: ${team.name} (${team.id})\n`);

    // Create or update the program
    let program = await client.program.findFirst({
      where: { 
        name: SUPER_LIFE_GROUP_PROGRAM.name,
        teamId: team.id
      }
    });

    if (program) {
      console.log(`📋 Updating existing program: ${program.name}`);
      // Extract program data without stages
      const { stages, ...programData } = SUPER_LIFE_GROUP_PROGRAM;
      program = await client.program.update({
        where: { id: program.id },
        data: {
          ...programData,
          team: {
            connect: { id: team.id }
          }
        }
      });
    } else {
      console.log(`📋 Creating new program: ${SUPER_LIFE_GROUP_PROGRAM.name}`);
      // Extract program data without stages
      const { stages, ...programData } = SUPER_LIFE_GROUP_PROGRAM;
      program = await client.program.create({
        data: {
          ...programData,
          team: {
            connect: { id: team.id }
          },
          expectedRevenueTarget: programData.expectedRevenueTarget,
          expectedProductivityTarget: programData.expectedProductivityTarget
        }
      });
    }

    console.log(`✅ Program: ${program.name} (${program.id})\n`);

    // Clear existing stages and tasks for this program
    const existingStages = await client.stage.findMany({
      where: { programId: program.id }
    });

    if (existingStages.length > 0) {
      console.log(`🗑️  Clearing ${existingStages.length} existing stages...`);
      await client.stage.deleteMany({
        where: { programId: program.id }
      });
    }

    // Create stages and tasks
    let totalStages = 0;
    let totalTasks = 0;

    for (const stageData of SUPER_LIFE_GROUP_PROGRAM.stages) {
      console.log(`📋 Creating stage: ${stageData.name}`);
      
      const stage = await client.stage.create({
        data: {
          name: stageData.name,
          description: stageData.description,
          order: stageData.order,
          status: stageData.status,
          programId: program.id,
          timeExpectations: stageData.timeExpectations,
          startDate: stageData.startDate,
          endDate: stageData.endDate,
          desiredOutcomes: stageData.desiredOutcomes,
          outcomeTargets: stageData.outcomeTargets,
          outcomeActuals: stageData.outcomeActuals,
          prerequisites: stageData.prerequisites,
          completionCriteria: stageData.completionCriteria,
          totalTasks: stageData.tasks.length
        },
      });

      console.log(`  ✅ Created stage: ${stage.name} (${stage.id}) - ${stage.totalTasks} tasks`);
      totalStages++;

      // Create tasks for this stage
      for (const taskData of stageData.tasks) {
        console.log(`    📝 Creating task: ${taskData.name}`);
        
        const task = await client.task.create({
          data: {
            name: taskData.name,
            description: taskData.description,
            order: taskData.order,
            status: 'ACTIVE',
            type: taskData.type,
            priority: taskData.priority,
            stageId: stage.id,
            instructions: taskData.instructions,
            resources: taskData.resources || null,
            estimatedDuration: taskData.estimatedDuration,
            completionCriteria: taskData.completionCriteria,
            taskTarget: taskData.taskTarget
          },
        });

        console.log(`      ✅ Created task: ${task.name} (${task.id})`);
        totalTasks++;
      }
      
      console.log('');
    }

    console.log(`📊 Super Life Group seed completed:`);
    console.log(`- Program: ${program.name}`);
    console.log(`- Stages: ${totalStages}`);
    console.log(`- Tasks: ${totalTasks}`);
    console.log(`- Team: ${team.name}`);

  } catch (error) {
    console.error('❌ Error seeding Super Life Group:', error);
  } finally {
    await client.$disconnect();
  }
}

// Run the seed
seedSuperLifeGroup();
