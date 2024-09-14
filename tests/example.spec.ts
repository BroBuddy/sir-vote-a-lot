import { test, expect } from '@playwright/test'

const appTitle = 'Sir Vote-a-lot'
const appUrl = 'http://localhost:5173'
const question = 'What is the value of π?'

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

test.describe('Poll Form', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(appUrl)
    })

    test('should have initial question', async ({ page }) => {
        await expect(page.getByTestId('poll-question')).toHaveValue(question)
    })

    test('should have add input and button', async ({ page }) => {
        const addButton = page.getByRole('button', { name: 'Add' })

        await expect(page.getByTestId('poll-add-input')).toBeVisible()
        await expect(addButton).toBeVisible()
    })

    test('should have 3 initial list items', async ({ page }) => {
        const pollItems = page.getByTestId('poll-list-items')

        await expect(pollItems).toHaveCount(3)
    })

    test('should add new option', async ({ page }) => {
        const pollItems = page.getByTestId('poll-list-items')
        const addInput = page.getByTestId('poll-add-input')
        const addButton = page.getByRole('button', { name: 'Add' })

        await expect(addButton).toBeDisabled()
        await addInput.fill('1.23')
        await expect(addButton).toBeEnabled()
        await addButton.click()
        await expect(pollItems).toHaveCount(4)
    })

    test('should remove option', async ({ page }) => {
        const pollItems = page.getByTestId('poll-list-items')
        const firstDeleteButton = page.getByRole('button', { name: 'X' }).nth(0)

        await firstDeleteButton.click()
        await expect(pollItems).toHaveCount(2)
    })

    test('should reset form', async ({ page }) => {
        const pollItems = page.getByTestId('poll-list-items')
        const resetButton = page.getByRole('button', { name: 'Reset' })

        await resetButton.click()
        await expect(pollItems).toHaveCount(0)
        await expect(page.getByTestId('poll-question')).toHaveValue('')
    })
})
