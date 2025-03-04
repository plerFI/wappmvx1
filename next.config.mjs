/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fixes wallet connect dependency issue
  // https://docs.walletconnect.com/web3modal/nextjs/about#extra-configuration
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },

  async headers() {
    return [
      {
        source: "/(.*)", // Gilt für alle Routen
        headers: [
          {
            key: "Content-Security-Policy",
            value: "script-src 'self' 'unsafe-eval';", 
          },
        ],
      },
    ];
  },
};

export default nextConfig;
