import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/metadata";
import { BlogFilters } from "@/components/blog/blog-filters";
import { BlogCard } from "@/components/blog/blog-card";
import { getPublishedPosts, getAllTags } from "@/lib/blog";
import { BLOG_CATEGORIES } from "@/types/blog";

export const dynamic = "force-static";
export const revalidate = 3600;

const categoryLabels: Record<string, string> = {
  ENTREPRISE: "Entreprise",
  TECHNOLOGIE: "Technologie",
  PROJETS: "Projets",
  CARRIERES: "Carrières",
  EVENEMENTS: "Événements",
};

export async function generateStaticParams() {
  return BLOG_CATEGORIES.map((category) => ({
    category: category.toLowerCase(),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const normalizedCategory = category.toUpperCase();
  const label = categoryLabels[normalizedCategory] || category;

  return createMetadata({
    title: `Blog - ${label}`,
    description: `Articles et actualités sur le thème ${label}.`,
  });
}

export default async function BlogCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const normalizedCategory = category.toUpperCase();

  const isValidCategory =
  BLOG_CATEGORIES.includes(
    normalizedCategory as typeof BLOG_CATEGORIES[number]
  );
  
  if (!isValidCategory) {
    notFound();
  }

  const posts = await getPublishedPosts({ category: normalizedCategory });
  const tags = await getAllTags();

  return (
    <div className="container mx-auto py-20">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          {categoryLabels[normalizedCategory] || category}
        </h1>
        <p className="mt-2 text-muted-foreground">
          Articles et actualités sur le thème {categoryLabels[normalizedCategory] || category}.
        </p>
      </div>

      <BlogFilters tags={tags} currentCategory={normalizedCategory} />

      {posts.length > 0 ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="mt-12 flex justify-center">
          <p className="text-muted-foreground">
            Aucun article pour le moment. Revenez bientôt !
          </p>
        </div>
      )}
    </div>
  );
}