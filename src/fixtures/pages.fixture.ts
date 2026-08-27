import { CatalogPage } from '@pages/catalog.page'
import { test as base } from '@playwright/test'

type Pages = {
	catalogPage: CatalogPage
}

export const test = base.extend<Pages>({
	catalogPage: async ({ page }, use) => {
		await use(new CatalogPage(page))
	},
})
