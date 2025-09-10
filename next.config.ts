import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configurações do Next.js
  serverExternalPackages: ["prisma", "some-package"],
};

export default nextConfig;
