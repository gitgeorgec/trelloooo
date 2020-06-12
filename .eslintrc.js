module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es6: true,
		node: true,
	},
	extends: [
		'xo',
		'xo-react',
	],
	globals: {
		jest: 'readonly',
		describe: 'readonly',
		test: 'readonly',
		expect: 'readonly',
		beforeEach: 'readonly',
		afterEach: 'readonly',
	},
	parser: 'babel-eslint',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 2018,
	},
	plugins: [
		'react',
		'react-hooks',
	],
	rules: {
		'padding-line-between-statements': [
			'error',
			{
				blankLine: 'always',
				prev: 'multiline-block-like',
				next: '*',
			},
			{
				blankLine: 'always',
				prev: '*',
				next: [
					'block',
					'block-like',
					'class',
					'export',
					'import',
					'let',
					'var',
				],
			},
			{
				blankLine: 'always',
				prev: [
					'block',
					'block-like',
					'class',
					'export',
					'import',
					'let',
					'var',
				],
				next: '*',
			},
			{
				blankLine: 'any',
				prev: ['export', 'import'],
				next: ['export', 'import'],
			},
		],
		'comma-dangle': [
			'error',
			{
				arrays: 'always-multiline',
				objects: 'always-multiline',
				imports: 'always-multiline',
				exports: 'always-multiline',
				functions: 'never',
			},
		],
		'object-curly-spacing': ['error', 'always'],
		'valid-jsdoc': ['error', { requireParamDescription: false, requireReturnDescription: false }],
		'default-param-last': 'off',
		'new-cap': ['error', { capIsNewExceptions: ['Map', 'List'] }],
		'func-names': 'off',
		'react/function-component-definition': ['off'],
		'react/jsx-sort-props': ['off'],
	},
};
