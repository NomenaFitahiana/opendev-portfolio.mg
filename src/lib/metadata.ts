import type { Metadata } from "next";
import { siteConfig } from "./config";
import { getServerUrl } from "./getServerUrl";

type MetadataParams = {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
  keywords?: string[];
  canonicalUrl?: string;
};

const defaultMetadata: Metadata = {
  metadataBase: getServerUrl(),
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ["Next.js", "React", "SaaS", "Boilerplate", "developers"],
  authors: [{ name: siteConfig.author, url: siteConfig.url }],
  creator: siteConfig.author,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: getServerUrl()!,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: `${getServerUrl()}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${getServerUrl()}/og.png`], // to update, need to create twitter-image.tsx in /app folder
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
};

export function createMetadata({
  title,
  description,
  image,
  noIndex = false,
  keywords,
  canonicalUrl,
}: MetadataParams = {}): Metadata {
  const ogImage = image
    ? [{ url: image, width: 1200, height: 630, alt: title ?? siteConfig.name }]
    : defaultMetadata.openGraph?.images;

  return {
    ...defaultMetadata,
    ...(title && { title }),
    ...(description && { description }),
    ...(keywords && { keywords }),
    ...(noIndex && { robots: { index: false, follow: false } }),
    ...(canonicalUrl && { alternates: { canonical: canonicalUrl } }),
    openGraph: {
      ...(defaultMetadata.openGraph as object),
      ...(title && { title }),
      ...(description && { description }),
      ...(canonicalUrl && { url: canonicalUrl }),
      images: ogImage,
    },
    twitter: {
      ...(defaultMetadata.twitter as object),
      ...(title && { title }),
      ...(description && { description }),
      images: image ? [image] : (defaultMetadata.twitter?.images as string[]),
    },
  };
}
