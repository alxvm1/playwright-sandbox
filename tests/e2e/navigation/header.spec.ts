import { HeaderComponent } from '@components/header.component'
import { expect, test } from '@playwright/test'

test('гость видит Sign in, категории кликабельны', async ({ page }) => {
	const header = new HeaderComponent(page)
	await page.goto('/')

	await expect(header.signInLink).toBeVisible()

	await header.openCategoriesMenu()
	await expect(header.handToolsLink).toBeVisible()
})
