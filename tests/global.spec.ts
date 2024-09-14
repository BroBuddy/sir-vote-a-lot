import { test, expect } from '@playwright/test'

const appTitle = 'Sir Vote-a-lot'
const appUrl = 'http://localhost:5173'

test.describe(appTitle, () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(appUrl)
    })

    test('should have correct title and heading', async ({ page }) => {
        await expect(page).toHaveTitle(appTitle)
        await expect(
            page.getByRole('heading', { name: appTitle })
        ).toBeVisible()
    })
})
