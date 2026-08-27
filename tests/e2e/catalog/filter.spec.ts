import { expect, test } from '@fixtures'

test('фильтр по категории "Hand Tools" сужает список', async ({
	catalogPage,
}) => {
	await catalogPage.open()
	const totalBefore = await catalogPage.productCards.count()

	await catalogPage.filterByCategoryName('Hand Tools')

	await expect
		.poll(() => catalogPage.productCards.count())
		.toBeLessThanOrEqual(totalBefore)
	await expect(catalogPage.productCards.first()).toBeVisible()
})
