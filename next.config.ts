import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['subtitle-backlands-thickness.ngrok-free.dev'],
  experimental: {
    authInterrupts: true,
  },
  images:{
    remotePatterns:[
      {
        protocol:'https',
        hostname:'**.ufs.sh',
        port:'',
        pathname:'/f/**'
      }
    ]
  }
};

export default nextConfig;
