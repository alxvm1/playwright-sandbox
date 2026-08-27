import { expect, test } from '@fixtures'

test('сортировка по цене от низкой к высокой', async ({ catalogPage }) => {
	await catalogPage.open()
	await catalogPage.sortBy('price,asc')

	const prices = (await catalogPage.productPrices.allTextContents()).map(p =>
		parseFloat(p.replace('$', ''))
	)

	expect(prices).toEqual([...prices].sort((a, b) => a - b))
})
