/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "zenbit-task-bucket.0f12097fe2f8fa16cc59b4348b148262.r2.cloudflarestorage.com",
          },
        ],
    },
};

export default nextConfig;
