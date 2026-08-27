import { HeaderComponent } from '@components/header.component'
import type { Locator, Page } from '@playwright/test'
import { BasePage } from './base.page'

export class CatalogPage extends BasePage {
	protected readonly path = '/'

	readonly header: HeaderComponent

	readonly searchInput: Locator
	readonly searchSubmitButton: Locator
	readonly searchResetButton: Locator

	readonly sortSelect: Locator

	readonly productCards: Locator
	readonly productNames: Locator

	readonly nextPageButton: Locator
	readonly prevPageButton: Locator

	readonly productPrices: Locator

	constructor(page: Page) {
		super(page)
		this.header = new HeaderComponent(page)

		this.searchInput = page.getByTestId('search-query')
		this.searchSubmitButton = page.getByTestId('search-submit')
		this.searchResetButton = page.getByTestId('search-reset')

		this.sortSelect = page.getByTestId('sort')

		this.productCards = page.locator('[data-test^="product-"]')
		this.productNames = page.getByTestId('product-name')

		this.nextPageButton = page.getByTestId('pagination-next')
		this.prevPageButton = page.getByTestId('pagination-prev')

		this.productPrices = page.getByTestId('product-price')
	}

	async searchFor(query: string): Promise<void> {
		await this.searchInput.fill(query)
		await this.searchSubmitButton.click()
	}

	async sortBy(
		option:
			| 'name,asc'
			| 'name,desc'
			| 'price,desc'
			| 'price,asc'
			| 'co2_rating,asc'
			| 'co2_rating,desc'
	): Promise<void> {
		await this.sortSelect.selectOption(option)
	}

	/** Находит карточку товара по видимому названию (текст внутри product-name). */
	productCardByName(name: string): Locator {
		return this.productCards.filter({
			has: this.page
				.getByTestId('product-name')
				.getByText(name, { exact: true }),
		})
	}

	async openProduct(name: string): Promise<void> {
		await this.productCardByName(name).click()
	}

	async filterByCategoryName(categoryName: string): Promise<void> {
		await this.page.getByLabel(categoryName, { exact: true }).check()
	}

	async filterByBrandId(brandId: string): Promise<void> {
		await this.page.getByTestId(`brand-${brandId}`).check()
	}

	async goToPage(pageNumber: number): Promise<void> {
		await this.page.getByRole('link', { name: `Page-${pageNumber}` }).click()
	}
}
