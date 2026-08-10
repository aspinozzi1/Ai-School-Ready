import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Kit sources and tooling never ship in the deploy; the finished kit
  // deliverables DO, so the gated download route can stream them from disk.
  outputFileTracingExcludes: {
    "*": ["./kits/**/src/**", "./kits/tooling/**", "./kits/free-resources/**"],
  },
  outputFileTracingIncludes: {
    "/api/download/[slug]/[file]": ["./kits/kit*/Kit*.pdf", "./kits/kit*/Kit*.pptx"],
  },
};

export default nextConfig;
