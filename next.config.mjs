/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['s3-alpha-sig.figma.com',
      'mila-staging-bucket.s3.amazonaws.com'],
  },
};

export default nextConfig;
