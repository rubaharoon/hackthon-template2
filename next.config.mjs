/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      domains: ["cdn.sanity.io"],
    },
    webpack(_config) {
      return _config;
    },
  };
  
  export default nextConfig;
  