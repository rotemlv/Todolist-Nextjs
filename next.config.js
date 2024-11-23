/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    FB_apiKey: process.env.FB_apiKey,
    FB_authDomain: process.env.FB_authDomain,
    FB_projectId: process.env.FB_projectId,
    FB_storageBucket: process.env.FB_storageBucket,
    FB_messagingSenderId: process.env.FB_messagingSenderId,
    FB_appId: process.env.FB_appId,
  },
    reactStrictMode: true,
    swcMinify: true,
  
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.resolve.fallback = {
          fs: false,
        };
      }
  
      return config;
    },
  };
  
  module.exports = nextConfig;
  