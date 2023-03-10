const CracoLessPlugin = require("craco-less");

module.exports = {
	plugins: [
		{
			plugin: CracoLessPlugin,
			options: {
				lessLoaderOptions: {
					lessOptions: {
						modifyVars: {
							"@component-background": "#fff",
							"@primary-color": "#3977f5",
						},
						javascriptEnabled: true,
					},
				},
			},
		},
	],
};
