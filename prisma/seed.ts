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
      expectedOutcomeType: 'REVENUE_TARGET' as any,
      timeExpectations: 156,
      measurementFrequency: 'DAILY' as any,
      status: 'ACTIVE' as any,
      stages: [
        {
          name: 'Week 1: Foundation',
          order: 1,
          timeExpectations: 20,
          tasks: [
            { name: 'Complete CRM Training', type: 'VIDEO', order: 1, estimatedDuration: 60 },
            { name: 'Read Sales Handbook', type: 'READING', order: 2, estimatedDuration: 45 },
            { name: 'Take Product Knowledge Quiz', type: 'QUIZ', order: 3, estimatedDuration: 30 }
          ]
        },
        {
          name: 'Week 2: Lead Generation',
          order: 2,
          timeExpectations: 25,
          tasks: [
            { name: 'Learn Lead Qualification', type: 'VIDEO', order: 1, estimatedDuration: 90 },
            { name: 'Practice Cold Calling', type: 'PRACTICE', order: 2, estimatedDuration: 120 },
            { name: 'Shadow Experienced Agent', type: 'MEETING', order: 3, estimatedDuration: 180 }
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
        enrollmentType: programData.enrollmentType,
        expectedOutcomeType: programData.expectedOutcomeType,
        expectedRevenueTarget: 1000,
        timeExpectations: programData.timeExpectations,
        measurementFrequency: programData.measurementFrequency,
        stages: {
          create: programData.stages.map((stageData: any) => ({
            name: stageData.name,
            order: stageData.order,
            timeExpectations: stageData.timeExpectations,
            status: 'ACTIVE',
            tasks: {
              create: stageData.tasks.map((taskData: any) => ({
                name: taskData.name,
                type: taskData.type,
                order: taskData.order,
                estimatedDuration: taskData.estimatedDuration,
                status: 'ACTIVE'
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
      { email: '1avery.lee@mailinator.com', role: 'PARTICIPANT', status: 'ENROLLED', participantType: 'NEW_INSURANCE_AGENT_FULL_TIME' },
      { email: '1youseff.marrak@mailinator.com', role: 'PARTICIPANT', status: 'ENROLLED', participantType: 'NEW_INSURANCE_AGENT_FULL_TIME' },
      { email: '1zeb.rowen@mailinator.com', role: 'PARTICIPANT', status: 'ENROLLED', participantType: 'NEW_INSURANCE_AGENT_FULL_TIME' },
      { email: '1jordan.ortiz@mailinator.com', role: 'PARTICIPANT', status: 'ENROLLED', participantType: 'NEW_INSURANCE_AGENT_FULL_TIME' },
      { email: '1alexis.torres@mailinator.com', role: 'PARTICIPANT', status: 'ENROLLED', participantType: 'NEW_INSURANCE_AGENT_FULL_TIME' },
      { email: '1xiu.ying@mailinator.com', role: 'SUPPORTER', status: 'ENROLLED', participantType: null },
      { email: '1rajesh.kumar@mailinator.com', role: 'SUPPORTER', status: 'ENROLLED', participantType: null }
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
          role: userData.role as any,
          participantType: userData.participantType as any,
          status: userData.status as any,
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
