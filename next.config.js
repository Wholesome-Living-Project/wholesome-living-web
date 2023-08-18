/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: false,
  output: "standalone",
  pageExtensions: ["js", "jsx", "ts", "tsx"],
  compiler: {
    styledComponents: true,
  },
  async headers() {
    const headers = [];
    if (process.env.PREVIEW === "true") {
      headers.push({
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex",
          },
        ],
        source: "/:path*",
      });
    }
    return headers;
  },
};

module.exports = nextConfig;
