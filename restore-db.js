const { PrismaClient } = require('@prisma/client');
const { hash } = require('bcryptjs');

const client = new PrismaClient();

// Type definitions for better TypeScript support
const TENANT_DATA = [
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

async function restoreDatabase() {
  try {
    console.log('🌱 Starting database restore...\n');
    
    // Check initial state
    const initialUsers = await client.user.count();
    const initialTeams = await client.team.count();
    const initialTeamMembers = await client.teamMember.count();
    
    console.log('📊 Initial database state:');
    console.log(`- Users: ${initialUsers}`);
    console.log(`- Teams: ${initialTeams}`);
    console.log(`- Team Members: ${initialTeamMembers}\n`);
    
    if (initialUsers > 0 || initialTeams > 0 || initialTeamMembers > 0) {
      console.log('⚠️  Warning: Database has existing data. Consider clearing first.\n');
    }
    
    // Track created users by email for multi-team assignment
    const userMap = new Map();

    // Create teams and users
    for (const tenant of TENANT_DATA) {
      console.log(`🏢 Creating tenant: ${tenant.name}`);
      
      // Create all teams for this tenant first
      const teamMap = new Map();
      
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
              role: userData.role,
            },
          });
        }
      }
    }

    // Check final state
    const finalUsers = await client.user.count();
    const finalTeams = await client.team.count();
    const finalTeamMembers = await client.teamMember.count();
    
    console.log('\n✅ Database restore completed successfully!');
    console.log('\n📋 Summary:');
    console.log(`- ${TENANT_DATA.length} tenants created`);
    console.log(`- ${TENANT_DATA.reduce((acc, tenant) => acc + tenant.teams.length, 0)} teams created`);
    console.log(`- ${userMap.size} unique users created`);
    console.log(`- Default password for all users: password123`);
    
    console.log('\n📊 Final database state:');
    console.log(`- Users: ${finalUsers}`);
    console.log(`- Teams: ${finalTeams}`);
    console.log(`- Team Members: ${finalTeamMembers}`);
    
  } catch (error) {
    console.error('❌ Error restoring database:', error);
  } finally {
    await client.$disconnect();
  }
}

restoreDatabase();
