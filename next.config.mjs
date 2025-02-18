/** @type {import('next').NextConfig} */

const APP_URL =
  process.env.NODE_ENV == 'production'
    ? 'https://ramis-store-be.vercel.app'
    : 'http://localhost:8000'

const nextConfig = {
    env:{
        APP_URL,
    }
};

export default nextConfig;
