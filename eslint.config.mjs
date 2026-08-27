import js from '@eslint/js'
import prettierConfig from 'eslint-config-prettier'
import playwright from 'eslint-plugin-playwright'
import tseslint from 'typescript-eslint'

export default tseslint.config(
	{
		ignores: [
			'node_modules',
			'playwright-report',
			'test-results',
			'blob-report',
			'.auth',
		],
	},
	js.configs.recommended,
	...tseslint.configs.recommendedTypeChecked,
	{
		languageOptions: {
			parserOptions: {
				projectService: {
					allowDefaultProject: ['eslint.config.mjs'],
				},
				tsconfigRootDir: import.meta.dirname,
			},
		},
		rules: {
			'@typescript-eslint/no-floating-promises': 'error',
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{ argsIgnorePattern: '^_' },
			],
		},
	},
	{
		files: ['tests/**/*.ts'],
		...playwright.configs['flat/recommended'],
		rules: {
			...playwright.configs['flat/recommended'].rules,
			'no-restricted-imports': [
				'error',
				{
					paths: [
						{
							name: '@playwright/test',
							message:
								'Импортируй test и expect из @fixtures (кроме tests/setup/**).',
						},
					],
				},
			],
		},
	},
	{
		files: ['tests/setup/**/*.ts'],
		rules: { 'no-restricted-imports': 'off' },
	},
	prettierConfig
)
