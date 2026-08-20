module.exports = ({ config }) => ({
  ...config,
  web: {
    ...config.web,
    baseUrl: process.env.EXPO_PUBLIC_BASE_URL || '',
  },
});
