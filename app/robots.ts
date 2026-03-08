import { MetadataRoute } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://nallamalahouse.in";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/auth/", "/signin", "/signup"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
