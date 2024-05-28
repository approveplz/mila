/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['mila-staging-bucket.s3.us-east-1.amazonaws.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mila-staging-bucket.s3.us-east-1.amazonaws.com',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;

