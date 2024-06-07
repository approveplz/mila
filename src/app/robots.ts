import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    const URL = process.env.NODE_ENV === "production" ? "https://www.milacollective.com" : "https://www.milacollective.today";

    if(process.env.NODE_ENV === "production") {
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