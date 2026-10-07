import type { Metadata } from 'next';

interface SeoParams {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
}

export function generateSeoMetadata(params: SeoParams): Metadata {
  const { title, description, keywords, image, url } = params;

  return {
    title,
    description,
    keywords: keywords?.join(', '),
    openGraph: {
      title,
      description,
      images: image ? [{ url: image }] : undefined,
      url,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export function generatePageMetadata(
  page: string,
  siteName: string = 'ICMon Web App'
): Metadata {
  return {
    title: {
      default: siteName,
      template: `%s | ${siteName}`,
    },
    description: 'IoT Monitoring Dashboard',
  };
}
