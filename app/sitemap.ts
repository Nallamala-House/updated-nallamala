import { MetadataRoute } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://nallamalahouse.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/blogs`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/communities`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/council`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/events`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/gallery`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/pyqs`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/queries`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/resources`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/tools`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/tools/gpa-calculator`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/tools/gpa-predictor`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/tools/semester-gpa`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/updates`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];

  return staticRoutes;
}
