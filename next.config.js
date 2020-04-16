// const withTypescript = require('@zeit/next-typescript')
// const withSass = require('@zeit/next-sass')
const debug = process.env.NODE_ENV !== "production";

console.log(process.env.NODE_ENV)
module.exports = {
	pageExtensions: ['jsx', 'js'],
	assetPrefix: !debug ? '/cvcode' : '',
}

/* module.exports = withTypescript(
	withSass({
		pageExtensions: ['jsx', 'js'],
		assetPrefix: !debug ? '/bncc' : '',
	})
) */