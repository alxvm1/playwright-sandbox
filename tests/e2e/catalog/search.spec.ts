import { expect, test } from '@fixtures'

test.describe('Поиск по каталогу', () => {
	test.beforeEach(async ({ catalogPage }) => {
		await catalogPage.open()
	})

	test('находит товар по запросу "pliers"', async ({ catalogPage }) => {
		await catalogPage.searchFor('pliers')

		await expect(catalogPage.productCards.first()).toBeVisible()

		const names = await catalogPage.productNames.allTextContents()
		for (const name of names) {
			expect(name.toLowerCase()).toContain('pliers')
		}
	})

	test('сброс поиска возвращает полный список', async ({
		catalogPage,
		page,
	}) => {
		await catalogPage.searchFor('pliers')
		const filteredCount = await catalogPage.productCards.count()

		await catalogPage.searchResetButton.click()

		await expect
			.poll(() => catalogPage.productCards.count())
			.toBeGreaterThanOrEqual(filteredCount)
	})
})
