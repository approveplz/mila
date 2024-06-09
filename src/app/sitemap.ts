import { MetadataRoute } from "next";

const routes: Array<{
  route: string;
  changeFrequency: MetadataRoute.Sitemap[0]["changeFrequency"];
  priority: number;
}> = [
    {
      route: "/",
      changeFrequency: "monthly",
      priority: 1
    },
    {
      route: "/benefits",
      changeFrequency: "weekly",
      priority: 0.9
    },
    {
      route: "/giveaways",
      changeFrequency: "daily",
      priority: 0.85
    },
    {
      route: "/about-us",
      changeFrequency: "monthly",
      priority: 0.8
    },
    {
      route: "/legal/privacy-policy",
      changeFrequency: "yearly",
      priority: 0.6
    },
    {
      route: "/legal/terms-of-use",
      changeFrequency: "yearly",
      priority: 0.6
    },
    {
      route: "/legal/sweeps-rules",
      changeFrequency: "yearly",
      priority: 0.6
    }
  ]

export default function sitemap(): MetadataRoute.Sitemap {
  const URL = process.env.ENVIRONMENT_TYPE === "live" ? "https://www.milacollective.com" : "https://www.milacollective.today";

  return routes.map(({ route, changeFrequency, priority }) => ({
    url: URL + route,
    changeFrequency,
    priority,
    lastModified: new Date(),
  }))
}