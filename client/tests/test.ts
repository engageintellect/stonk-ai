import { expect, test } from '@playwright/test';

test('index page has expected div', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('heading', { name: 'stonk ai' })).toBeVisible();
});
