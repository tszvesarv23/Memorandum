import type { MetadataRoute } from "next";
import { mainNav, siteConfig, utilityNav } from "@/config/site";
import { getPublishedArticles } from "@/server/articles";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getPublishedArticles(500);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteConfig.url, changeFrequency: "hourly", priority: 1 },
    ...mainNav.map((item) => ({
      url: `${siteConfig.url}${item.href}`,
      changeFrequency: "hourly" as const,
      priority: 0.8,
    })),
    ...utilityNav.map((item) => ({
      url: `${siteConfig.url}${item.href}`,
      changeFrequency: "monthly" as const,
      priority: 0.4,
    })),
    {
      url: `${siteConfig.url}/buzon`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteConfig.url}/documentos`,
      changeFrequency: "weekly",
      priority: 0.6,
    },
  ];

  const articleRoutes: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${siteConfig.url}/${a.category.slug}/${a.slug}`,
    lastModified: a.publishedAt,
    changeFrequency: "daily",
    priority: 0.7,
  }));

  return [...staticRoutes, ...articleRoutes];
}
