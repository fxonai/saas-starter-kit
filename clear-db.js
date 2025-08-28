const { PrismaClient } = require('@prisma/client');

const client = new PrismaClient();

async function clearDatabase() {
  try {
    console.log('🗑️  Clearing database...\n');
    
    // Check initial state
    const initialUsers = await client.user.count();
    const initialTeams = await client.team.count();
    const initialTeamMembers = await client.teamMember.count();
    const initialInvitations = await client.invitation.count();
    
    console.log('📊 Initial database state:');
    console.log(`- Users: ${initialUsers}`);
    console.log(`- Teams: ${initialTeams}`);
    console.log(`- Team Members: ${initialTeamMembers}`);
    console.log(`- Invitations: ${initialInvitations}\n`);
    
    // Clear existing data in correct order
    await client.teamMember.deleteMany();
    await client.invitation.deleteMany();
    await client.team.deleteMany();
    await client.user.deleteMany();
    
    console.log('🗑️  Cleared existing data');
    
    // Check final state
    const finalUsers = await client.user.count();
    const finalTeams = await client.team.count();
    const finalTeamMembers = await client.teamMember.count();
    const finalInvitations = await client.invitation.count();
    
    console.log('\n📊 Final database state:');
    console.log(`- Users: ${finalUsers}`);
    console.log(`- Teams: ${finalTeams}`);
    console.log(`- Team Members: ${finalTeamMembers}`);
    console.log(`- Invitations: ${finalInvitations}`);
    
    if (finalUsers === 0 && finalTeams === 0 && finalTeamMembers === 0 && finalInvitations === 0) {
      console.log('\n✅ Database is EMPTY - ready for restore');
    } else {
      console.log('\n❌ Database still has data - clearing failed');
    }
    
  } catch (error) {
    console.error('❌ Error clearing database:', error);
  } finally {
    await client.$disconnect();
  }
}

clearDatabase();
