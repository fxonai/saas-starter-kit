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
            }
          }
        ]
      }
    ]
  },
  'New Agent School': {
    stages: [
      {
        name: 'Week 1: Insurance Fundamentals',
        description: 'Core insurance concepts and product knowledge',
        order: 1,
        status: 'PUBLISHED',
        timeExpectations: 30,
        startDate: new Date('2024-01-15'),
        endDate: new Date('2024-01-21'),
        desiredOutcomes: [
          'Master insurance fundamentals and product portfolio',
          'Understand regulatory compliance requirements',
          'Complete comprehensive product knowledge assessment'
        ],
        tasks: [
          {
            name: 'Insurance Basics Course',
            description: 'Complete comprehensive insurance fundamentals training',
            order: 1,
            type: 'VIDEO',
            priority: 'CRITICAL',
            estimatedDuration: 240,
            instructions: 'Complete the insurance basics course covering all major insurance types',
            resources: {
              videos: ['https://example.com/insurance-basics'],
              documents: ['Insurance_Fundamentals.pdf']
            },
            completionCriteria: {
              type: 'QUIZ',
              passingScore: 85,
              requiredActions: ['Complete course', 'Pass fundamentals quiz']
            }
          },
          {
            name: 'Product Portfolio Review',
            description: 'Learn about our specific insurance products and offerings',
            order: 2,
            type: 'READING',
            priority: 'HIGH',
            estimatedDuration: 120,
            instructions: 'Review our product portfolio and understand each offering',
            resources: {
              documents: ['Product_Portfolio.pdf', 'Pricing_Guide.pdf']
            },
            completionCriteria: {
              type: 'QUIZ',
              passingScore: 80,
              requiredActions: ['Review products', 'Pass product quiz']
            }
          },
          {
            name: 'Regulatory Compliance Training',
            description: 'Learn about insurance regulations and compliance requirements',
            order: 3,
            type: 'VIDEO',
            priority: 'HIGH',
            estimatedDuration: 180,
            instructions: 'Complete regulatory compliance training for insurance agents',
            completionCriteria: {
              type: 'QUIZ',
              passingScore: 90,
              requiredActions: ['Complete training', 'Pass compliance quiz']
            }
          }
        ]
      },
      {
        name: 'Week 2: Sales Techniques',
        description: 'Insurance sales techniques and client relationship management',
        order: 2,
        status: 'PUBLISHED',
        timeExpectations: 35,
        startDate: new Date('2024-01-22'),
        endDate: new Date('2024-01-28'),
        desiredOutcomes: [
          'Master client needs analysis techniques',
          'Practice sales presentation delivery',
          'Learn CRM tools and client relationship management'
        ],
        tasks: [
          {
            name: 'Needs Analysis Training',
            description: 'Learn to conduct thorough client needs analysis',
            order: 1,
            type: 'VIDEO',
            priority: 'HIGH',
            estimatedDuration: 150,
            instructions: 'Complete training on conducting effective client needs analysis',
            resources: {
              videos: ['https://example.com/needs-analysis'],
              documents: ['Needs_Analysis_Guide.pdf']
            },
            completionCriteria: {
              type: 'ASSIGNMENT',
              requiredActions: ['Complete training', 'Practice needs analysis']
            }
          },
          {
            name: 'Sales Presentation Practice',
            description: 'Practice delivering insurance sales presentations',
            order: 2,
            type: 'PRACTICE',
            priority: 'HIGH',
            estimatedDuration: 240,
            instructions: 'Practice delivering sales presentations with role-playing exercises',
            completionCriteria: {
              type: 'MANUAL',
              requiredActions: ['Complete practice sessions', 'Receive feedback']
            }
          },
          {
            name: 'Client Relationship Management',
            description: 'Learn CRM tools and client relationship best practices',
            order: 3,
            type: 'VIDEO',
            priority: 'MEDIUM',
            estimatedDuration: 120,
            instructions: 'Complete training on CRM usage and client relationship management',
            completionCriteria: {
              type: 'ASSIGNMENT',
              requiredActions: ['Complete training', 'Create sample client profiles']
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
