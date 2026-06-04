import { MetadataRoute } from 'next';
import prisma from '@/libs/db';

export const revalidate = 86400; // Cache selama 1 minggu (dalam detik: 60 * 60 * 24 * 7)

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://sgintern.my.id';

  // Mengambil 100 post terakhir yang sudah di-publish
  const posts = await prisma.post.findMany({
    where: {
      status: 'PUBLISHED',
    },
    select: {
      slug: true,
      updatedAt: true,
      assets:{
        where:{
          fileStatus:'ACTIVE',
          fileType:'IMAGE'
        },
        select:{
          fileUrl:true
        }
      },
      author:{
        select:{
          imageUrl:true
        }
      }
    },
    orderBy: {
      createdAt: 'desc',
    }
  });

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/feed/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: 'weekly',
    priority: 0.8,
    images: post.assets.map((asset) => asset.fileUrl) || [post.author.imageUrl] || undefined,
  }));

  return [
    {
      url: baseUrl,
      lastModified: postEntries[0].lastModified,
      changeFrequency: 'yearly',
      priority: 1,
    },
    ...postEntries,
  ];
}
