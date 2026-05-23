import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
