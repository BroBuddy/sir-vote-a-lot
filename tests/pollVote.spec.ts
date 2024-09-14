import { test, expect } from '@playwright/test'

const appUrl = 'http://localhost:5173'

test.describe('Poll Vote', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(appUrl)
    })

    test('should have 3 initial vote items', async ({ page }) => {
        const voteItems = page.getByTestId('vote-list-items')

        await expect(voteItems).toHaveCount(3)
    })

    test('should have disabled vote button', async ({ page }) => {
        const voteButton = page.getByRole('button', { name: 'Vote' })

        await expect(voteButton).toBeDisabled()
    })

    test('should have 11 initial votes', async ({ page }) => {
        const totalVotes = page.getByTestId('total-votes')

        await expect(totalVotes).toHaveText('11')
    })

    test('should increase total votes', async ({ page }) => {
        test.slow()

        const firstVoteButton = page.getByTestId('vote-list-items').nth(0)
        const voteButton = page.getByRole('button', { name: 'Vote' })
        const totalVotes = page.getByTestId('total-votes')

        await firstVoteButton.click()
        await voteButton.click()
        await expect(totalVotes).toHaveText('12', {
            timeout: 10000,
        })
    })
})
