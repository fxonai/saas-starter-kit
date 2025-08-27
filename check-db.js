const { PrismaClient } = require('@prisma/client');

const client = new PrismaClient();

async function checkDatabase() {
  try {
    console.log('🔍 Current database state...\n');
    
    // Check each table
    const users = await client.user.count();
    const teams = await client.team.count();
    const teamMembers = await client.teamMember.count();
    const invitations = await client.invitation.count();
    const programs = await client.program.count();
    const programUsers = await client.programUser.count();
    
    console.log('📊 Database Contents:');
    console.log(`- Users: ${users}`);
    console.log(`- Teams: ${teams}`);
    console.log(`- Team Members: ${teamMembers}`);
    console.log(`- Invitations: ${invitations}`);
    console.log(`- Programs: ${programs}`);
    console.log(`- Program Users: ${programUsers}`);
    
    if (users > 0) {
      console.log('\n👥 Sample Users:');
      const sampleUsers = await client.user.findMany({ take: 3 });
      sampleUsers.forEach(user => {
        console.log(`  - ${user.name} (${user.email})`);
      });
    }
    
    if (teams > 0) {
      console.log('\n🏢 Sample Teams:');
      const sampleTeams = await client.team.findMany({ take: 3 });
      sampleTeams.forEach(team => {
        console.log(`  - ${team.name} (${team.slug}) - Domain: ${team.domain || 'null'}`);
      });
    }
    
    if (programs > 0) {
      console.log('\n📋 Sample Programs:');
      const samplePrograms = await client.program.findMany({ take: 3 });
      samplePrograms.forEach(program => {
        console.log(`  - ${program.name} (${program.status}) - ${program.subtitle}`);
      });
    }
    
    if (programUsers > 0) {
      console.log('\n👥 Sample Program Users:');
      const sampleProgramUsers = await client.programUser.findMany({ 
        include: { 
          user: true, 
          program: true 
        }, 
        take: 5 
      });
      sampleProgramUsers.forEach(pu => {
        console.log(`  - ${pu.user.name} (${pu.role}) in ${pu.program.name}`);
      });
    }
    
  } catch (error) {
    console.error('❌ Error checking database:', error);
  } finally {
    await client.$disconnect();
  }
}

checkDatabase(); 