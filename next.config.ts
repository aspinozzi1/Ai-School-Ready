import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingExcludes: { "*": ["./kits/**"] },
};

export default nextConfig;
