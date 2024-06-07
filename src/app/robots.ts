import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    const URL = process.env.ENVIRONMENT_TYPE === "live" ? "https://www.milacollective.com" : "https://www.milacollective.today";

    if(process.env.ENVIRONMENT_TYPE === "live") {
        return {
            rules: {
              userAgent: '*',
              allow: '/',
            },
            sitemap: `${URL}/sitemap.xml`,
        }
    }

    return {
        rules: {
          userAgent: '*',
          disallow: '/',
        },
    }
}