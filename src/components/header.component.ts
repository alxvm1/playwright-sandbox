import type { Locator, Page } from '@playwright/test'

export class HeaderComponent {
	readonly homeLink: Locator

	readonly categoriesButton: Locator
	readonly handToolsLink: Locator
	readonly powerToolsLink: Locator
	readonly otherToolsLink: Locator
	readonly specialToolsLink: Locator
	readonly rentalsLink: Locator

	readonly contactLink: Locator

	// Гость
	readonly signInLink: Locator

	// Авторизованный пользователь
	readonly accountMenuButton: Locator
	readonly myAccountLink: Locator
	readonly myFavoritesLink: Locator
	readonly myProfileLink: Locator
	readonly myInvoicesLink: Locator
	readonly myMessagesLink: Locator
	readonly signOutLink: Locator

	readonly languageSelectButton: Locator

	constructor(private readonly page: Page) {
		this.homeLink = page.getByTestId('nav-home')

		this.categoriesButton = page.getByTestId('nav-categories')
		this.handToolsLink = page.getByTestId('nav-hand-tools')
		this.powerToolsLink = page.getByTestId('nav-power-tools')
		this.otherToolsLink = page.getByTestId('nav-other')
		this.specialToolsLink = page.getByTestId('nav-special-tools')
		this.rentalsLink = page.getByTestId('nav-rentals')

		this.contactLink = page.getByTestId('nav-contact')

		this.signInLink = page.getByTestId('nav-sign-in')

		this.accountMenuButton = page.getByTestId('nav-menu')
		this.myAccountLink = page.getByTestId('nav-my-account')
		this.myFavoritesLink = page.getByTestId('nav-my-favorites')
		this.myProfileLink = page.getByTestId('nav-my-profile')
		this.myInvoicesLink = page.getByTestId('nav-my-invoices')
		this.myMessagesLink = page.getByTestId('nav-my-messages')
		this.signOutLink = page.getByTestId('nav-sign-out')

		this.languageSelectButton = page.getByTestId('language-select')
	}

	async openCategoriesMenu(): Promise<void> {
		await this.categoriesButton.click()
	}

	async openAccountMenu(): Promise<void> {
		await this.accountMenuButton.click()
	}

	async signOut(): Promise<void> {
		await this.openAccountMenu()
		await this.signOutLink.click()
	}

	async goToSignIn(): Promise<void> {
		await this.signInLink.click()
	}

	async goToCategory(
		category: 'hand-tools' | 'power-tools' | 'other' | 'special-tools'
	): Promise<void> {
		await this.openCategoriesMenu()
		const map = {
			'hand-tools': this.handToolsLink,
			'power-tools': this.powerToolsLink,
			other: this.otherToolsLink,
			'special-tools': this.specialToolsLink,
		}
		await map[category].click()
	}
}
