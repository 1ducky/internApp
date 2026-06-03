import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // Ganti URL ini dengan URL website Anda yang sebenarnya
  const baseUrl ='https://sgintern.my.id';

  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/sign-in', '/sign-up'],
      disallow: ['/private/', '/api/'],
    },
    sitemap: `${baseUrl}/feed/sitemap.xml`,
  };
}
