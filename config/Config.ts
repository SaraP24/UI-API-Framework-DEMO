import chalk from 'chalk';
import dotenv from 'dotenv';
import { TIMEOUTS } from './Timeouts'; 

dotenv.config();
export class Config {

    static get HEADLESS(): boolean {
        return process.env.PW_HEADLESS !== 'false';
    }

    static get RETRIES(): number {
        return parseInt(process.env.PW_RETRIES || '1');
    }

    static get API_RETRY_ATTEMPTS(): number {
        return parseInt(process.env.API_RETRY_ATTEMPTS || '2');
    }
    static get API_REQUEST_TIMEOUT(): number {
        return TIMEOUTS.DEFAULT_TIMEOUT;
    }

    static get CI_MODE(): boolean {
        return process.env.CI_MODE === 'true';
    }

    static get WORKERS(): number {
        return parseInt(process.env.PW_WORKERS || '4');
    }

    static get DEBUG(): boolean {
        return process.env.PW_DEBUG === 'true';
    }

    static get UI_BASE_URL(): string {
        return process.env.UI_BASE_URL || 'https://www.demoblaze.com';
    }

    static get UI_NAVIGATION_TIMEOUT(): number {
        return Number(process.env.UI_NAVIGATION_TIMEOUT ?? TIMEOUTS.DEFAULT_TIMEOUT);
    }

    static get UI_ACTION_TIMEOUT(): number {
        return TIMEOUTS.DEFAULT_TIMEOUT;
    }

    static get PETSTORE_BASE_URL(): string {
        return process.env.PETSTORE_BASE_URL || 'https://petstore.swagger.io/v2';
    }

    static get PETSTORE_API_TOKEN(): string {
        return process.env.PETSTORE_API_TOKEN || '';
    }

    /**
     * Print all configuration values
     */
    static printConfig(): void {
        console.log(chalk.blue('\n========== CONFIGURATION =========='));
        console.log(chalk.blue('Playwright:'));
        console.log(chalk.blue(`  Headless: ${this.HEADLESS}`));
        console.log(chalk.blue(`  Workers: ${this.WORKERS}`));
        console.log(chalk.blue(`  Debug: ${this.DEBUG}`));

        console.log(chalk.blue('\nUI Tests:'));
        console.log(chalk.blue(`  Base URL: ${this.UI_BASE_URL}`));

        console.log(chalk.blue('\nAPI Tests (PetStore):'));
        console.log(chalk.blue(`  Base URL: ${this.PETSTORE_BASE_URL}`));
        console.log(chalk.blue('===================================\n'));
    }
}

export default Config;
