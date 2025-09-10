import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configurações do Next.js
  experimental: {
    // Pacotes externos usados no server components
    serverComponentsExternalPackages: ["@prisma/client", "bcrypt"],
  },
};

export default nextConfig;
