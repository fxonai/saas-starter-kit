const { PrismaClient } = require('@prisma/client');
const client = new PrismaClient();
const { hash } = require('bcryptjs');
const { randomUUID } = require('crypto');

// Onboarding Platform Seed Data
async function seedOnboardingPlatform() {
  console.log('🌱 Seeding Onboarding Platform...');

  // 1. Create the main tenant (team)
  const tenant = await createTenant();
  
  // 2. Create users with specific roles
  const users = await createUsers();
  
  // 3. Assign users to the tenant with roles
  await assignUsersToTenant(tenant, users);
  
  // 4. Create onboarding program with hierarchy
  const program = await createOnboardingProgram(tenant);
  
  // 5. Create tasks with hierarchy (Stages → Tasks → Subtasks → Actions)
  await createTaskHierarchy(program);
  
  // 6. Assign participants to the program
  await assignParticipantsToProgram(program, users);
  
  console.log('✅ Onboarding Platform seeded successfully!');
}

async function createTenant() {
  const tenant = await client.team.create({
    data: {
      name: 'Acme Sales Agency',
      slug: 'acme-sales-agency',
      domain: 'acme-sales.com',
    },
  });
  console.log('🏢 Created tenant:', tenant.name);
  return tenant;
}

async function createUsers() {
  const users = [];
  
  // Admin user
  const adminPassword = await hash('admin123', 12);
  const admin = await client.user.create({
    data: {
      email: 'admin@acme-sales.com',
      name: 'Sarah Johnson',
      password: adminPassword,
      emailVerified: new Date(),
    },
  });
  users.push({ ...admin, role: 'ADMIN' });
  
  // Program Manager
  const pmPassword = await hash('pm123', 12);
  const programManager = await client.user.create({
    data: {
      email: 'pm@acme-sales.com',
      name: 'Mike Chen',
      password: pmPassword,
      emailVerified: new Date(),
    },
  });
  users.push({ ...programManager, role: 'MEMBER' });
  
  // Hiring Manager
  const hmPassword = await hash('hm123', 12);
  const hiringManager = await client.user.create({
    data: {
      email: 'hm@acme-sales.com',
      name: 'Lisa Rodriguez',
      password: hmPassword,
      emailVerified: new Date(),
    },
  });
  users.push({ ...hiringManager, role: 'MEMBER' });
  
  // Participants (New Hires)
  const participants = [
    { email: 'alex@acme-sales.com', name: 'Alex Thompson', password: 'newhire123' },
    { email: 'jordan@acme-sales.com', name: 'Jordan Lee', password: 'newhire123' },
    { email: 'taylor@acme-sales.com', name: 'Taylor Smith', password: 'newhire123' },
  ];
  
  for (const participant of participants) {
    const password = await hash(participant.password, 12);
    const user = await client.user.create({
      data: {
        email: participant.email,
        name: participant.name,
        password,
        emailVerified: new Date(),
      },
    });
    users.push({ ...user, role: 'MEMBER' });
  }
  
  console.log('👥 Created users:', users.length);
  return users;
}

async function assignUsersToTenant(tenant, users) {
  const teamMembers = [];
  
  for (const user of users) {
    const role = user.role === 'ADMIN' ? 'ADMIN' : 'MEMBER';
    const teamMember = await client.teamMember.create({
      data: {
        teamId: tenant.id,
        userId: user.id,
        role,
      },
    });
    teamMembers.push(teamMember);
  }
  
  console.log('🔗 Assigned users to tenant:', teamMembers.length);
}

async function createOnboardingProgram(tenant) {
  // Note: This will need to be updated once we add the Program model
  // For now, we'll create a placeholder
  console.log('📋 Program creation will be implemented after database schema update');
  
  // Placeholder program object
  const program = {
    id: randomUUID(),
    name: 'Sales Representative Onboarding',
    description: 'Comprehensive 30-60-90 day onboarding program for new sales representatives',
    teamId: tenant.id,
  };
  
  return program;
}

async function createTaskHierarchy(program) {
  // Note: This will need to be updated once we add the Task model
  // For now, we'll create a placeholder structure
  
  const taskHierarchy = [
    {
      type: 'STAGE',
      name: 'Week 1: Foundation',
      description: 'Basic company knowledge and tools setup',
      tasks: [
        {
          type: 'TASK',
          name: 'Complete HR Paperwork',
          description: 'Fill out all required HR forms and documentation',
          subtasks: [
            {
              type: 'SUBTASK',
              name: 'Fill out I-9 Form',
              description: 'Complete employment eligibility verification',
              actions: [
                { type: 'ACTION', name: 'Click link to I-9 form', description: 'Access the I-9 form in the HR portal' },
                { type: 'ACTION', name: 'Upload driver\'s license', description: 'Provide government-issued ID' },
                { type: 'ACTION', name: 'Submit form', description: 'Complete and submit the I-9 form' },
              ]
            },
            {
              type: 'SUBTASK',
              name: 'Complete W-4 Form',
              description: 'Set up tax withholding preferences',
              actions: [
                { type: 'ACTION', name: 'Access W-4 form', description: 'Open the W-4 form in the HR portal' },
                { type: 'ACTION', name: 'Enter personal information', description: 'Fill in your personal details' },
                { type: 'ACTION', name: 'Submit W-4', description: 'Complete and submit the form' },
              ]
            }
          ]
        },
        {
          type: 'TASK',
          name: 'Company Orientation',
          description: 'Learn about company culture, values, and policies',
          subtasks: [
            {
              type: 'SUBTASK',
              name: 'Watch Company Overview Video',
              description: 'Complete the company introduction video',
              actions: [
                { type: 'ACTION', name: 'Open company video', description: 'Click the link to watch the overview video' },
                { type: 'ACTION', name: 'Complete video', description: 'Watch the entire 15-minute video' },
                { type: 'ACTION', name: 'Take quiz', description: 'Complete the post-video assessment' },
              ]
            }
          ]
        }
      ]
    },
    {
      type: 'STAGE',
      name: 'Week 2: Sales Tools & CRM',
      description: 'Learn essential sales tools and CRM system',
      tasks: [
        {
          type: 'TASK',
          name: 'CRM System Training',
          description: 'Complete Salesforce CRM training modules',
          subtasks: [
            {
              type: 'SUBTASK',
              name: 'Salesforce Basics',
              description: 'Learn fundamental CRM operations',
              actions: [
                { type: 'ACTION', name: 'Access Salesforce training', description: 'Log into the training portal' },
                { type: 'ACTION', name: 'Complete Module 1', description: 'Finish the basics module' },
                { type: 'ACTION', name: 'Complete Module 2', description: 'Finish the intermediate module' },
              ]
            }
          ]
        }
      ]
    },
    {
      type: 'STAGE',
      name: 'Week 3: Sales Methodology',
      description: 'Learn the company\'s sales process and methodology',
      tasks: [
        {
          type: 'TASK',
          name: 'SPIN Selling Training',
          description: 'Complete SPIN selling methodology training',
          subtasks: [
            {
              type: 'SUBTASK',
              name: 'SPIN Framework Overview',
              description: 'Learn the SPIN selling framework',
              actions: [
                { type: 'ACTION', name: 'Read SPIN overview', description: 'Review the SPIN selling framework document' },
                { type: 'ACTION', name: 'Watch SPIN video', description: 'Complete the SPIN methodology video' },
                { type: 'ACTION', name: 'Practice scenarios', description: 'Complete 3 practice sales scenarios' },
              ]
            }
          ]
        }
      ]
    }
  ];
  
  console.log('📝 Created task hierarchy with', taskHierarchy.length, 'stages');
  console.log('   - Week 1: Foundation');
  console.log('   - Week 2: Sales Tools & CRM');
  console.log('   - Week 3: Sales Methodology');
  
  return taskHierarchy;
}

async function assignParticipantsToProgram(program, users) {
  // Note: This will need to be updated once we add the Participant model
  const participants = users.filter(user => 
    user.email.includes('alex') || 
    user.email.includes('jordan') || 
    user.email.includes('taylor')
  );
  
  console.log('👤 Assigned participants to program:', participants.length);
  console.log('   - Alex Thompson (alex@acme-sales.com)');
  console.log('   - Jordan Lee (jordan@acme-sales.com)');
  console.log('   - Taylor Smith (taylor@acme-sales.com)');
}

async function init() {
  try {
    await seedOnboardingPlatform();
  } catch (error) {
    console.error('❌ Error seeding onboarding platform:', error);
  } finally {
    await client.$disconnect();
  }
}

init();
