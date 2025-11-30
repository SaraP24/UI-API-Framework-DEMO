import { Config } from './config/Config';
import chalk from 'chalk';

async function globalSetup() {
  console.log(chalk.blue('\n' + '='.repeat(50)));
  console.log(chalk.blue('🚀 TEST EXECUTION STARTED - Configuration Summary'));
  console.log(chalk.blue('='.repeat(50)));
  Config.printConfig();
  console.log(chalk.blue('All tests will use the above configuration\n'));
}

export default globalSetup;
