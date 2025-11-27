import chalk from 'chalk';
import dotenv from 'dotenv';
import { TIMEOUTS } from '../../enums/Timeouts';

dotenv.config();
export class Config {

    // ========================================
    // PLAYWRIGHT SETTINGS
    // ========================================
    static get HEADLESS(): boolean {
        return process.env.PW_HEADLESS === 'true';
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

    static get UI_TEST_USERNAME(): string {
        return process.env.UI_TEST_USERNAME || 'testuser123';
    }

    static get UI_TEST_PASSWORD(): string {
        return process.env.UI_TEST_PASSWORD || 'testpass123';
    }

    static get UI_NAVIGATION_TIMEOUT(): number {
        return Number(process.env.UI_NAVIGATION_TIMEOUT ?? TIMEOUTS.DEFAULT_TIMEOUT);
    }

    static get UI_ELEMENT_TIMEOUT(): number {
        return Number(process.env.UI_ELEMENT_TIMEOUT ?? TIMEOUTS.DEFAULT_TIMEOUT);
    }

    static get UI_ACTION_TIMEOUT(): number {
        return Number(process.env.UI_ACTION_TIMEOUT ?? TIMEOUTS.DEFAULT_TIMEOUT);
    }

    static get PETSTORE_BASE_URL(): string {
        return process.env.PETSTORE_BASE_URL || 'https://petstore.swagger.io/v2';
    }

    static get PETSTORE_API_TOKEN(): string {
        return process.env.PETSTORE_API_TOKEN || '';
    }

    static get PETSTORE_TEST_PET_ID(): number {
        return parseInt(process.env.PETSTORE_TEST_PET_ID || '1');
    }

    // ========================================
    // LOGGING & DEBUGGING
    // ========================================

    static get LOG_LEVEL(): string {
        return process.env.LOG_LEVEL || 'info';
    }

    static get ENABLE_REQUEST_LOGGING(): boolean {
        return process.env.ENABLE_REQUEST_LOGGING === 'true';
    }

    static get ENABLE_PERFORMANCE_METRICS(): boolean {
        return process.env.ENABLE_PERFORMANCE_METRICS === 'true';
    }

    // ========================================
    // RETRY SETTINGS
    // ========================================

    static get API_RETRY_ATTEMPTS(): number {
        return parseInt(process.env.API_RETRY_ATTEMPTS || '3');
    }

    static get API_RETRY_DELAY(): number {
        return parseInt(process.env.API_RETRY_DELAY || '1000');
    }

    // ========================================
    // CI/CD SETTINGS
    // ========================================

    static get CI_MODE(): boolean {
        return process.env.CI_MODE === 'true' || process.env.CI === 'true';
    }

    static get REPORT_DIR(): string {
        return process.env.REPORT_DIR || './playwright-report';
    }

    /**
     * Print all configuration values (for debugging)
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
