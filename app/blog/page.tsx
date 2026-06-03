import { createMetadata } from "@/lib/metadata";
import { BlogFilters } from "@/components/blog/blog-filters";
import { BlogCard } from "@/components/blog/blog-card";
import { getPublishedPosts, getAllTags } from "@/lib/blog";

export const dynamic = "force-static";
export const revalidate = 3600;

export const metadata = createMetadata({
  title: "Blog",
  description: "Actualités et articles sur nos projets, technologies et événements.",
});

export default async function BlogPage() {
  const posts = await getPublishedPosts();
  const tags = await getAllTags();

  return (
    <div className="container mx-auto py-20">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
        <p className="mt-2 text-muted-foreground">
          Actualités, tutoriels et histoires depuis notre équipe.
        </p>
      </div>

      <BlogFilters tags={tags} />

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