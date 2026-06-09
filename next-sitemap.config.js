/** @type {import('next-sitemap').IConfig} */

const productSlugs = [
  "chem-13", "chem-15", "chem-18", "cst-lf-w", "cst-pu-w", "cst-pu-g",
  "cst-pu-b", "cst-fnc", "cst-tesd", "cst-pesd", "cst-clc", "cst-flexigrip",
  "cst-cut-c", "cst-gn-cut-d", "cst-opu-cut-d", "cst-bpu-cut-e"
];

module.exports = {
  siteUrl: 'https://www.cephassafetech.com',
  generateRobotsTxt: true,
  outDir: 'public',
  exclude: ['/icon.png', '/opengraph-image.png', '/twitter-image.png'],
  additionalPaths: async () => {
    return [
      ...productSlugs.map((slug) => ({ 
        loc: `/products/${slug}`, 
        priority: 0.8,
        lastmod: new Date().toISOString()
      })),
      { loc: '/products/chemical-resistant-gloves', priority: 0.9, lastmod: new Date().toISOString() },
      { loc: '/standards', priority: 0.7, lastmod: new Date().toISOString() },
      { loc: '/about', priority: 0.6, lastmod: new Date().toISOString() },
      { loc: '/contact', priority: 0.6, lastmod: new Date().toISOString() },
    ];
  }
}
