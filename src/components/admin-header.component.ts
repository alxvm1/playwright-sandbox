import type { Locator, Page } from '@playwright/test'

export class AdminHeaderComponent {
	readonly accountMenuButton: Locator

	readonly dashboardLink: Locator
	readonly brandsLink: Locator
	readonly categoriesLink: Locator
	readonly productsLink: Locator
	readonly ordersLink: Locator
	readonly usersLink: Locator
	readonly messagesLink: Locator
	readonly settingsLink: Locator

	readonly reportsButton: Locator
	readonly statisticsLink: Locator
	readonly averageMonthSalesLink: Locator
	readonly averageWeekSalesLink: Locator

	readonly signOutLink: Locator

	readonly languageSelectButton: Locator

	constructor(private readonly page: Page) {
		this.accountMenuButton = page.getByTestId('nav-menu')

		this.dashboardLink = page.getByTestId('nav-admin-dashboard')
		this.brandsLink = page.getByTestId('nav-admin-brands')
		this.categoriesLink = page.getByTestId('nav-admin-categories')
		this.productsLink = page.getByTestId('nav-admin-products')
		this.ordersLink = page.getByTestId('nav-admin-orders')
		this.usersLink = page.getByTestId('nav-admin-users')
		this.messagesLink = page.getByTestId('nav-admin-messages')
		this.settingsLink = page.getByTestId('nav-admin-settings')

		this.reportsButton = page.getByRole('button', { name: 'Reports' })
		this.statisticsLink = page.getByTestId('nav-admin-statistics')
		this.averageMonthSalesLink = page.getByTestId('nav-average-month-sales')
		this.averageWeekSalesLink = page.getByTestId('nav-average-week-sales')

		this.signOutLink = page.getByTestId('nav-sign-out')

		this.languageSelectButton = page.getByTestId('language-select')
	}

	async openAccountMenu(): Promise<void> {
		await this.accountMenuButton.click()
	}

	async goTo(
		section:
			| 'dashboard'
			| 'brands'
			| 'categories'
			| 'products'
			| 'orders'
			| 'users'
			| 'messages'
			| 'settings'
	): Promise<void> {
		await this.openAccountMenu()
		const map = {
			dashboard: this.dashboardLink,
			brands: this.brandsLink,
			categories: this.categoriesLink,
			products: this.productsLink,
			orders: this.ordersLink,
			users: this.usersLink,
			messages: this.messagesLink,
			settings: this.settingsLink,
		}
		await map[section].click()
	}

	async signOut(): Promise<void> {
		await this.openAccountMenu()
		await this.signOutLink.click()
	}
}
