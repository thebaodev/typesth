module.exports = {
	extends: ['stylelint-config-recommended', 'stylelint-config-prettier'],
	rules: {
		'at-rule-no-unknown': [
			true,
			{
				ignoreAtRules: [
					'tailwind',
					'apply',
					'variants',
					'responsive',
					'screen',
				],
			},
		],
	},
};
