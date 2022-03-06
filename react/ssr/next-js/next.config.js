module.exports = {
  i18n: {
    defaultLocale: 'zh-CN',
    locales: ['zh-CN', 'en-US'],
  },
  webpack: (config) => {
    config.experiments = { topLevelAwait: true };
    return config;
  },
};