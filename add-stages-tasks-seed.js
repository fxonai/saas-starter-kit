const { PrismaClient } = require('@prisma/client');

const client = new PrismaClient();

// Sample stages and tasks data for each program
const PROGRAM_STRUCTURE = {
  'Sales Development Onboarding': {
    stages: [
      {
        name: 'Week 1: Foundation & Tools',
        description: 'Essential tools and foundational knowledge for sales development',
        order: 1,
        status: 'PUBLISHED',
        timeExpectations: 20,
        startDate: new Date('2024-01-15'),
        endDate: new Date('2024-01-21'),
        desiredOutcomes: [
          'Master CRM system navigation and data entry',
          'Understand product portfolio and value propositions',
          'Learn from experienced SDRs through shadowing'
        ],
        outcomeTargets: {
          'leads': 0,
          'qualified_leads': 0,
          'appointments': 0,
          'pipeline_value': 0
        },
        outcomeActuals: {
          'leads': 0,
          'qualified_leads': 0,
          'appointments': 0,
          'pipeline_value': 0
        },
        tasks: [
          {
            name: 'Complete CRM Training',
            description: 'Learn the basics of our CRM system and how to log activities',
            order: 1,
            type: 'VIDEO',
            priority: 'HIGH',
            estimatedDuration: 120,
            instructions: 'Watch the CRM training videos and complete the practice exercises',
            resources: {
              videos: ['https://example.com/crm-basics', 'https://example.com/crm-advanced'],
              documents: ['CRM_User_Guide.pdf', 'Best_Practices.pdf']
            },
            completionCriteria: {
              type: 'QUIZ',
              passingScore: 80,
              requiredActions: ['Complete video modules', 'Pass final quiz']
            },
            taskTarget: {
              'leads': 0,
              'qualified_leads': 0,
              'appointments': 0,
              'pipeline_value': 0
            }
          },
          {
            name: 'Shadow Senior SDR',
            description: 'Observe and learn from experienced sales development representatives',
            order: 2,
            type: 'SHADOWING',
            priority: 'HIGH',
            estimatedDuration: 240,
            instructions: 'Schedule 4 hours of shadowing with a senior SDR to observe calls and techniques',
            completionCriteria: {
              type: 'MANUAL',
              requiredActions: ['Complete shadowing session', 'Submit reflection notes']
            },
            taskTarget: {
              'leads': 0,
              'qualified_leads': 0,
              'appointments': 0,
              'pipeline_value': 0
            }
          },
          {
            name: 'Product Knowledge Assessment',
            description: 'Demonstrate understanding of our product offerings and value propositions',
            order: 3,
            type: 'QUIZ',
            priority: 'MEDIUM',
            estimatedDuration: 60,
            instructions: 'Complete the product knowledge quiz covering our main offerings',
            completionCriteria: {
              type: 'QUIZ',
              passingScore: 85,
              requiredActions: ['Complete product quiz']
            },
            taskTarget: {
              'leads': 0,
              'qualified_leads': 0,
              'appointments': 0,
              'pipeline_value': 0
            }
          }
        ]
      },
      {
        name: 'Week 2: Prospecting & Outreach',
        description: 'Learn effective prospecting techniques and outreach strategies',
        order: 2,
        status: 'PUBLISHED',
        timeExpectations: 25,
        startDate: new Date('2024-01-22'),
        endDate: new Date('2024-01-28'),
        desiredOutcomes: [
          'Master LinkedIn Sales Navigator and prospecting tools',
          'Develop effective cold calling techniques',
          'Create personalized email templates for different segments'
        ],
        outcomeTargets: {
          'leads': 50,
          'qualified_leads': 10,
          'appointments': 5,
          'pipeline_value': 50000
        },
        outcomeActuals: {
          'leads': 0,
          'qualified_leads': 0,
          'appointments': 0,
          'pipeline_value': 0
        },
        tasks: [
          {
            name: 'Prospecting Tools Training',
            description: 'Master LinkedIn Sales Navigator and other prospecting tools',
            order: 1,
            type: 'VIDEO',
            priority: 'HIGH',
            estimatedDuration: 90,
            instructions: 'Complete training on LinkedIn Sales Navigator and other prospecting tools',
            resources: {
              videos: ['https://example.com/linkedin-training'],
              documents: ['Prospecting_Playbook.pdf']
            },
            completionCriteria: {
              type: 'ASSIGNMENT',
              requiredActions: ['Complete training', 'Create 50 prospect lists']
            },
            taskTarget: {
              'leads': 20,
              'qualified_leads': 5,
              'appointments': 2,
              'pipeline_value': 20000
            }
          },
          {
            name: 'Cold Calling Practice',
            description: 'Practice cold calling techniques with role-playing exercises',
            order: 2,
            type: 'PRACTICE',
            priority: 'HIGH',
            estimatedDuration: 180,
            instructions: 'Participate in cold calling role-play sessions with the team',
            completionCriteria: {
              type: 'MANUAL',
              requiredActions: ['Complete 5 role-play sessions', 'Receive positive feedback']
            },
            taskTarget: {
              'leads': 15,
              'qualified_leads': 3,
              'appointments': 2,
              'pipeline_value': 15000
            }
          },
          {
            name: 'Email Template Creation',
            description: 'Create personalized email templates for different prospect segments',
            order: 3,
            type: 'ASSIGNMENT',
            priority: 'MEDIUM',
            estimatedDuration: 120,
            instructions: 'Develop 3 email templates for different prospect personas',
            completionCriteria: {
              type: 'MANUAL',
              requiredActions: ['Create templates', 'Get manager approval']
            },
            taskTarget: {
              'leads': 15,
              'qualified_leads': 2,
              'appointments': 1,
              'pipeline_value': 15000
            }
          }
        ]
      },
      {
        name: 'Week 3: Advanced Techniques',
        description: 'Advanced sales techniques and objection handling',
        order: 3,
        status: 'PUBLISHED',
        timeExpectations: 30,
        startDate: new Date('2024-01-29'),
        endDate: new Date('2024-02-04'),
        desiredOutcomes: [
          'Master objection handling and qualification techniques',
          'Learn BANT qualification framework',
          'Understand pipeline management and forecasting'
        ],
        outcomeTargets: {
          'leads': 30,
          'qualified_leads': 15,
          'appointments': 8,
          'pipeline_value': 75000
        },
        outcomeActuals: {
          'leads': 0,
          'qualified_leads': 0,
          'appointments': 0,
          'pipeline_value': 0
        },
        tasks: [
          {
            name: 'Objection Handling Workshop',
            description: 'Learn to handle common objections and turn them into opportunities',
            order: 1,
            type: 'MEETING',
            priority: 'HIGH',
            estimatedDuration: 240,
            instructions: 'Attend the objection handling workshop and practice scenarios',
            completionCriteria: {
              type: 'ASSIGNMENT',
              requiredActions: ['Attend workshop', 'Complete practice scenarios']
            },
            taskTarget: {
              'leads': 10,
              'qualified_leads': 5,
              'appointments': 3,
              'pipeline_value': 25000
            }
          },
          {
            name: 'Sales Qualification Training',
            description: 'Learn BANT qualification framework and qualification techniques',
            order: 2,
            type: 'VIDEO',
            priority: 'HIGH',
            estimatedDuration: 90,
            instructions: 'Complete training on sales qualification and BANT framework',
            resources: {
              videos: ['https://example.com/bant-training'],
              documents: ['Qualification_Guide.pdf']
            },
            completionCriteria: {
              type: 'QUIZ',
              passingScore: 80,
              requiredActions: ['Complete training', 'Pass qualification quiz']
            },
            taskTarget: {
              'leads': 10,
              'qualified_leads': 5,
              'appointments': 3,
              'pipeline_value': 25000
            }
          },
          {
            name: 'Pipeline Management',
            description: 'Learn to manage and track opportunities in the sales pipeline',
            order: 3,
            type: 'VIDEO',
            priority: 'MEDIUM',
            estimatedDuration: 60,
            instructions: 'Complete training on pipeline management and forecasting',
            completionCriteria: {
              type: 'ASSIGNMENT',
              requiredActions: ['Complete training', 'Create sample pipeline report']
            },
            taskTarget: {
              'leads': 10,
              'qualified_leads': 5,
              'appointments': 2,
              'pipeline_value': 25000
            }
          }
        ]
      }
    ]
  },
  'CodeStart Academy': {
    stages: [
      {
        name: 'Week 1: Programming Fundamentals',
        description: 'Core programming concepts and development environment setup',
        order: 1,
        status: 'PUBLISHED',
        timeExpectations: 40,
        startDate: new Date('2024-02-15'),
        endDate: new Date('2024-02-21'),
        desiredOutcomes: [
          'Set up complete development environment',
          'Master JavaScript fundamentals',
          'Build first coding project'
        ],
        outcomeTargets: {
          'projects_completed': 1,
          'code_reviews_passed': 1,
          'certifications_earned': 0,
          'skills_mastered': 3
        },
        outcomeActuals: {
          'projects_completed': 0,
          'code_reviews_passed': 0,
          'certifications_earned': 0,
          'skills_mastered': 0
        },
        tasks: [
          {
            name: 'Development Environment Setup',
            description: 'Set up your development environment with required tools and IDEs',
            order: 1,
            type: 'ASSIGNMENT',
            priority: 'CRITICAL',
            estimatedDuration: 120,
            instructions: 'Install and configure VS Code, Git, Node.js, and other development tools',
            resources: {
              documents: ['Dev_Environment_Setup.pdf', 'Tool_Installation_Guide.pdf']
            },
            completionCriteria: {
              type: 'ASSIGNMENT',
              requiredActions: ['Install all tools', 'Submit setup verification']
            },
            taskTarget: {
              'projects_completed': 0,
              'code_reviews_passed': 0,
              'certifications_earned': 0,
              'skills_mastered': 1
            }
          },
          {
            name: 'JavaScript Fundamentals',
            description: 'Learn core JavaScript concepts and syntax',
            order: 2,
            type: 'VIDEO',
            priority: 'HIGH',
            estimatedDuration: 300,
            instructions: 'Complete JavaScript fundamentals course covering variables, functions, and objects',
            resources: {
              videos: ['https://example.com/js-basics', 'https://example.com/js-advanced'],
              documents: ['JavaScript_Cheat_Sheet.pdf']
            },
            completionCriteria: {
              type: 'QUIZ',
              passingScore: 85,
              requiredActions: ['Complete course', 'Pass JavaScript quiz']
            },
            taskTarget: {
              'projects_completed': 0,
              'code_reviews_passed': 0,
              'certifications_earned': 0,
              'skills_mastered': 1
            }
          },
          {
            name: 'First Coding Project',
            description: 'Build a simple calculator application using JavaScript',
            order: 3,
            type: 'ASSIGNMENT',
            priority: 'HIGH',
            estimatedDuration: 240,
            instructions: 'Create a calculator application with basic arithmetic operations',
            completionCriteria: {
              type: 'ASSIGNMENT',
              requiredActions: ['Complete project', 'Submit code review']
            },
            taskTarget: {
              'projects_completed': 1,
              'code_reviews_passed': 1,
              'certifications_earned': 0,
              'skills_mastered': 1
            }
          }
        ]
      },
      {
        name: 'Week 2: Modern Development',
        description: 'Modern development practices and frameworks',
        order: 2,
        status: 'PUBLISHED',
        timeExpectations: 45,
        startDate: new Date('2024-02-22'),
        endDate: new Date('2024-02-28'),
        desiredOutcomes: [
          'Master React.js fundamentals and component development',
          'Learn Git version control and collaborative workflows',
          'Build API integration project'
        ],
        outcomeTargets: {
          'projects_completed': 2,
          'code_reviews_passed': 2,
          'certifications_earned': 0,
          'skills_mastered': 3
        },
        outcomeActuals: {
          'projects_completed': 0,
          'code_reviews_passed': 0,
          'certifications_earned': 0,
          'skills_mastered': 0
        },
        tasks: [
          {
            name: 'React Fundamentals',
            description: 'Learn React.js fundamentals and component-based development',
            order: 1,
            type: 'VIDEO',
            priority: 'HIGH',
            estimatedDuration: 360,
            instructions: 'Complete React fundamentals course covering components, state, and props',
            resources: {
              videos: ['https://example.com/react-basics'],
              documents: ['React_Guide.pdf']
            },
            completionCriteria: {
              type: 'ASSIGNMENT',
              requiredActions: ['Complete course', 'Build React component']
            },
            taskTarget: {
              'projects_completed': 0,
              'code_reviews_passed': 0,
              'certifications_earned': 0,
              'skills_mastered': 1
            }
          },
          {
            name: 'Git Version Control',
            description: 'Master Git version control and collaborative development',
            order: 2,
            type: 'VIDEO',
            priority: 'HIGH',
            estimatedDuration: 180,
            instructions: 'Learn Git commands, branching, merging, and collaborative workflows',
            resources: {
              videos: ['https://example.com/git-training'],
              documents: ['Git_Workflow.pdf']
            },
            completionCriteria: {
              type: 'ASSIGNMENT',
              requiredActions: ['Complete training', 'Create GitHub repository']
            },
            taskTarget: {
              'projects_completed': 0,
              'code_reviews_passed': 0,
              'certifications_earned': 0,
              'skills_mastered': 1
            }
          },
          {
            name: 'API Integration Project',
            description: 'Build a weather app that integrates with external APIs',
            order: 3,
            type: 'ASSIGNMENT',
            priority: 'MEDIUM',
            estimatedDuration: 300,
            instructions: 'Create a weather application that fetches data from a weather API',
            completionCriteria: {
              type: 'ASSIGNMENT',
              requiredActions: ['Complete project', 'Present to team']
            },
            taskTarget: {
              'projects_completed': 1,
              'code_reviews_passed': 1,
              'certifications_earned': 0,
              'skills_mastered': 1
            }
          }
        ]
      }
    ]
  },
  'New Agent School_2': { // Realty version
    stages: [
      {
        name: 'Week 1: Real Estate Fundamentals',
        description: 'Core real estate concepts and market knowledge',
        order: 1,
        status: 'PUBLISHED',
        timeExpectations: 30,
        startDate: new Date('2024-01-15'),
        endDate: new Date('2024-01-21'),
        desiredOutcomes: [
          'Master real estate fundamentals and market dynamics',
          'Understand listing and showing processes',
          'Complete comprehensive market knowledge assessment'
        ],
        tasks: [
          {
            name: 'Real Estate Basics Course',
            description: 'Complete comprehensive real estate fundamentals training',
            order: 1,
            type: 'VIDEO',
            priority: 'CRITICAL',
            estimatedDuration: 240,
            instructions: 'Complete the real estate basics course covering market dynamics and processes',
            resources: {
              videos: ['https://example.com/real-estate-basics'],
              documents: ['Real_Estate_Fundamentals.pdf']
            },
            completionCriteria: {
              type: 'QUIZ',
              passingScore: 85,
              requiredActions: ['Complete course', 'Pass fundamentals quiz']
            }
          },
          {
            name: 'Market Analysis Training',
            description: 'Learn to analyze local real estate markets',
            order: 2,
            type: 'READING',
            priority: 'HIGH',
            estimatedDuration: 120,
            instructions: 'Review market analysis tools and techniques',
            resources: {
              documents: ['Market_Analysis_Guide.pdf', 'CMA_Process.pdf']
            },
            completionCriteria: {
              type: 'QUIZ',
              passingScore: 80,
              requiredActions: ['Review materials', 'Pass market analysis quiz']
            }
          },
          {
            name: 'Listing Process Training',
            description: 'Learn the complete listing process from start to finish',
            order: 3,
            type: 'VIDEO',
            priority: 'HIGH',
            estimatedDuration: 180,
            instructions: 'Complete training on listing properties and managing listings',
            completionCriteria: {
              type: 'QUIZ',
              passingScore: 90,
              requiredActions: ['Complete training', 'Pass listing process quiz']
            }
          }
        ]
      },
      {
        name: 'Week 2: Sales & Closing',
        description: 'Real estate sales techniques and closing processes',
        order: 2,
        status: 'PUBLISHED',
        timeExpectations: 35,
        startDate: new Date('2024-01-22'),
        endDate: new Date('2024-01-28'),
        desiredOutcomes: [
          'Master buyer consultation techniques',
          'Practice offer presentation and negotiation',
          'Learn closing processes and documentation'
        ],
        tasks: [
          {
            name: 'Buyer Consultation Training',
            description: 'Learn to conduct effective buyer consultations',
            order: 1,
            type: 'VIDEO',
            priority: 'HIGH',
            estimatedDuration: 150,
            instructions: 'Complete training on buyer consultation best practices',
            resources: {
              videos: ['https://example.com/buyer-consultation'],
              documents: ['Buyer_Consultation_Guide.pdf']
            },
            completionCriteria: {
              type: 'ASSIGNMENT',
              requiredActions: ['Complete training', 'Practice consultation scenarios']
            }
          },
          {
            name: 'Offer Presentation Practice',
            description: 'Practice presenting and negotiating offers',
            order: 2,
            type: 'PRACTICE',
            priority: 'HIGH',
            estimatedDuration: 240,
            instructions: 'Practice offer presentation and negotiation techniques',
            completionCriteria: {
              type: 'MANUAL',
              requiredActions: ['Complete practice sessions', 'Receive feedback']
            }
          },
          {
            name: 'Closing Process Training',
            description: 'Learn closing processes and required documentation',
            order: 3,
            type: 'VIDEO',
            priority: 'MEDIUM',
            estimatedDuration: 120,
            instructions: 'Complete training on closing processes and documentation',
            completionCriteria: {
              type: 'ASSIGNMENT',
              requiredActions: ['Complete training', 'Create closing checklist']
            }
          }
        ]
      }
    ]
  },
  'New Agent School_3': { // Life Insurance version
    stages: [
      {
        name: 'Week 1: Life Insurance Fundamentals',
        description: 'Core life insurance concepts and product knowledge',
        order: 1,
        status: 'PUBLISHED',
        timeExpectations: 30,
        startDate: new Date('2024-01-15'),
        endDate: new Date('2024-01-21'),
        desiredOutcomes: [
          'Master life insurance fundamentals and product portfolio',
          'Understand suitability and compliance requirements',
          'Complete comprehensive product knowledge assessment'
        ],
        tasks: [
          {
            name: 'Life Insurance Basics Course',
            description: 'Complete comprehensive life insurance fundamentals training',
            order: 1,
            type: 'VIDEO',
            priority: 'CRITICAL',
            estimatedDuration: 240,
            instructions: 'Complete the life insurance basics course covering all major product types',
            resources: {
              videos: ['https://example.com/life-insurance-basics'],
              documents: ['Life_Insurance_Fundamentals.pdf']
            },
            completionCriteria: {
              type: 'QUIZ',
              passingScore: 85,
              requiredActions: ['Complete course', 'Pass fundamentals quiz']
            }
          },
          {
            name: 'Product Portfolio Review',
            description: 'Learn about our specific life insurance products and offerings',
            order: 2,
            type: 'READING',
            priority: 'HIGH',
            estimatedDuration: 120,
            instructions: 'Review our life insurance product portfolio and understand each offering',
            resources: {
              documents: ['Life_Product_Portfolio.pdf', 'Illustration_Guide.pdf']
            },
            completionCriteria: {
              type: 'QUIZ',
              passingScore: 80,
              requiredActions: ['Review products', 'Pass product quiz']
            }
          },
          {
            name: 'Suitability Training',
            description: 'Learn about suitability requirements and compliance',
            order: 3,
            type: 'VIDEO',
            priority: 'HIGH',
            estimatedDuration: 180,
            instructions: 'Complete suitability training for life insurance agents',
            completionCriteria: {
              type: 'QUIZ',
              passingScore: 90,
              requiredActions: ['Complete training', 'Pass suitability quiz']
            }
          }
        ]
      },
      {
        name: 'Week 2: Sales & Applications',
        description: 'Life insurance sales techniques and application processes',
        order: 2,
        status: 'PUBLISHED',
        timeExpectations: 35,
        startDate: new Date('2024-01-22'),
        endDate: new Date('2024-01-28'),
        desiredOutcomes: [
          'Master needs analysis and discovery techniques',
          'Practice illustration and presentation delivery',
          'Learn application processes and underwriting'
        ],
        tasks: [
          {
            name: 'Needs Analysis Training',
            description: 'Learn to conduct thorough life insurance needs analysis',
            order: 1,
            type: 'VIDEO',
            priority: 'HIGH',
            estimatedDuration: 150,
            instructions: 'Complete training on life insurance needs analysis',
            resources: {
              videos: ['https://example.com/life-needs-analysis'],
              documents: ['Life_Needs_Analysis_Guide.pdf']
            },
            completionCriteria: {
              type: 'ASSIGNMENT',
              requiredActions: ['Complete training', 'Practice needs analysis scenarios']
            }
          },
          {
            name: 'Illustration Practice',
            description: 'Practice creating and presenting life insurance illustrations',
            order: 2,
            type: 'PRACTICE',
            priority: 'HIGH',
            estimatedDuration: 240,
            instructions: 'Practice creating and presenting life insurance illustrations',
            completionCriteria: {
              type: 'MANUAL',
              requiredActions: ['Complete practice sessions', 'Receive feedback']
            }
          },
          {
            name: 'Application Process Training',
            description: 'Learn application processes and underwriting requirements',
            order: 3,
            type: 'VIDEO',
            priority: 'MEDIUM',
            estimatedDuration: 120,
            instructions: 'Complete training on application processes and underwriting',
            completionCriteria: {
              type: 'ASSIGNMENT',
              requiredActions: ['Complete training', 'Create application checklist']
            }
          }
        ]
      }
    ]
  }
};

async function seedStagesAndTasks() {
  try {
    console.log('🌱 Starting stages and tasks seed...\n');
    
    // Get all programs
    const programs = await client.program.findMany();
    const programMap = new Map(programs.map(p => [p.name, p]));
    
    console.log(`📋 Found ${programs.length} programs\n`);
    
    let totalStages = 0;
    let totalTasks = 0;
    
    // Create stages and tasks for each program
    for (const [programName, programData] of Object.entries(PROGRAM_STRUCTURE)) {
      const program = programMap.get(programName);
      if (!program) {
        console.error(`❌ Program not found: ${programName}`);
        continue;
      }
      
      console.log(`🏢 Creating stages for: ${programName}`);
      
      // Create stages for this program
      for (const stageData of programData.stages) {
        console.log(`  📋 Creating stage: ${stageData.name}`);
        
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
            outcomeTargets: stageData.outcomeTargets || null,
            outcomeActuals: stageData.outcomeActuals || null,
            completionCriteria: stageData.completionCriteria || null,
            prerequisites: stageData.prerequisites || null,
            totalTasks: stageData.tasks.length
          },
        });
        
        console.log(`    ✅ Created stage: ${stage.name} (${stage.id}) - ${stage.totalTasks} tasks`);
        totalStages++;
        
        // Create tasks for this stage
        for (const taskData of stageData.tasks) {
          console.log(`      📝 Creating task: ${taskData.name}`);
          
          const task = await client.task.create({
            data: {
              name: taskData.name,
              description: taskData.description,
              order: taskData.order,
              status: taskData.status || 'ACTIVE',
              type: taskData.type,
              priority: taskData.priority,
              stageId: stage.id,
              instructions: taskData.instructions,
              resources: taskData.resources,
              attachments: taskData.attachments || [],
              estimatedDuration: taskData.estimatedDuration,
              dueDate: taskData.dueDate,
              startDate: taskData.startDate,
              endDate: taskData.endDate,
              completionCriteria: taskData.completionCriteria,
              taskTarget: taskData.taskTarget || null,
              verificationMethod: taskData.verificationMethod,
              autoComplete: taskData.autoComplete || false,
              prerequisites: taskData.prerequisites || null,
              dependencies: taskData.dependencies || null
            },
          });
          
          console.log(`        ✅ Created task: ${task.name} (${task.id})`);
          totalTasks++;
        }
      }
      
      console.log(`\n✅ Completed: ${programName} - ${programData.stages.length} stages, ${programData.stages.reduce((sum, stage) => sum + stage.tasks.length, 0)} tasks\n`);
    }
    
    // Check final state
    const stageCount = await client.stage.count();
    const taskCount = await client.task.count();
    console.log(`📊 Final database state:`);
    console.log(`- Stages: ${stageCount}`);
    console.log(`- Tasks: ${taskCount}`);
    console.log(`- Created stages: ${totalStages}`);
    console.log(`- Created tasks: ${totalTasks}`);
    
    console.log('\n✅ Stages and tasks seed completed successfully!');
    
  } catch (error) {
    console.error('❌ Error seeding stages and tasks:', error);
  } finally {
    await client.$disconnect();
  }
}

seedStagesAndTasks();
