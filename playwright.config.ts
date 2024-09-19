import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    retries: 1,
    workers: 5,
    timeout: 30 * 1000,
    expect: {
        timeout: 10 * 1000,
    },
    reporter: 'html',
    use: {
        headless: true,
        trace: 'off',
        screenshot: 'only-on-failure',
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'webkit',
            use: { ...devices['Desktop Safari'] },
        },
    ],
})
