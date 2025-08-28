const { PrismaClient } = require('@prisma/client');

const client = new PrismaClient();

async function demonstrateOutcomeProgress() {
  console.log('🎯 Outcome Progress Demonstration\n');

  try {
    // Get all stages with their programs
    const stages = await client.stage.findMany({
      include: { 
        program: true,
        tasks: {
          include: {
            userProgress: true
          }
        }
      },
      orderBy: [
        { program: { name: 'asc' } },
        { order: 'asc' }
      ]
    });

    for (const stage of stages) {
      console.log(`📋 ${stage.program.name} - ${stage.name}`);
      
      if (stage.outcomeTargets && stage.outcomeActuals) {
        const targets = stage.outcomeTargets;
        const actuals = stage.outcomeActuals;
        
        console.log('  🎯 Outcome Progress:');
        for (const [metric, target] of Object.entries(targets)) {
          const current = actuals[metric] || 0;
          const percentage = target > 0 ? Math.round((current / target) * 100) : 0;
          const progressBar = '█'.repeat(Math.floor(percentage / 10)) + '░'.repeat(10 - Math.floor(percentage / 10));
          
          console.log(`    ${current} of ${target} ${metric.replace('_', ' ')} (${percentage}%)`);
          console.log(`    [${progressBar}]`);
        }
        
        console.log('  📝 Task Contributions:');
        for (const task of stage.tasks) {
          if (task.outcomeContributions) {
            const contributions = task.outcomeContributions;
            console.log(`    • ${task.name}:`);
            for (const [metric, contribution] of Object.entries(contributions)) {
              if (contribution > 0) {
                console.log(`      - ${contribution} ${metric.replace('_', ' ')}`);
              }
            }
          }
        }
      } else {
        console.log('  No outcome tracking configured');
      }
      
      console.log('');
    }

    // Show example of how to update progress
    console.log('🔄 Example: Updating Progress When Task is Completed');
    console.log('When a user completes "Cold Calling Practice" task:');
    console.log('• Task contributes: 15 leads, 3 qualified_leads, 2 appointments, $15,000 pipeline_value');
    console.log('• User actually achieves: 12 leads, 2 qualified_leads, 1 appointment, $12,000 pipeline_value');
    console.log('• Stage progress updates from: 0 of 50 leads → 12 of 50 leads (24%)');
    console.log('• Stage progress updates from: 0 of 10 qualified_leads → 2 of 10 qualified_leads (20%)');
    console.log('');

    // Show the math
    console.log('🧮 Progress Calculation Example:');
    console.log('Week 2: Prospecting & Outreach');
    console.log('Targets: 50 leads, 10 qualified_leads, 5 appointments, $50,000 pipeline_value');
    console.log('');
    console.log('Task 1: Prospecting Tools Training (completed)');
    console.log('  Contributes: 20 leads, 5 qualified_leads, 2 appointments, $20,000 pipeline_value');
    console.log('  Progress: 20 of 50 leads (40%), 5 of 10 qualified_leads (50%)');
    console.log('');
    console.log('Task 2: Cold Calling Practice (completed)');
    console.log('  Contributes: 15 leads, 3 qualified_leads, 2 appointments, $15,000 pipeline_value');
    console.log('  Progress: 35 of 50 leads (70%), 8 of 10 qualified_leads (80%)');
    console.log('');
    console.log('Task 3: Email Template Creation (not started)');
    console.log('  Will contribute: 15 leads, 2 qualified_leads, 1 appointment, $15,000 pipeline_value');
    console.log('  Final progress: 50 of 50 leads (100%), 10 of 10 qualified_leads (100%)');

  } catch (error) {
    console.error('❌ Error demonstrating outcome progress:', error);
  } finally {
    await client.$disconnect();
  }
}

// Run the demonstration
demonstrateOutcomeProgress();
