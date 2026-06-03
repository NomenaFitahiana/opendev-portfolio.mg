import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BLOG_CATEGORIES } from "@/types/blog";

const categoryLabels: Record<string, string> = {
  ENTREPRISE: "Entreprise",
  TECHNOLOGIE: "Technologie",
  PROJETS: "Projets",
  CARRIERES: "Carrières",
  EVENEMENTS: "Événements",
};

interface BlogFiltersProps {
  tags?: string[];
  currentCategory?: string;
}

export function BlogFilters({ tags = [], currentCategory }: BlogFiltersProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        <Button
          variant={!currentCategory ? "default" : "outline"}
          size="sm"
          asChild={!currentCategory ? false : true}
        >
          {!currentCategory ? (
            "Tous"
          ) : (
            <Link href="/blog">Tous</Link>
          )}
        </Button>
        {BLOG_CATEGORIES.map((category) => (
          <Button
            key={category}
            variant={currentCategory === category ? "default" : "outline"}
            size="sm"
            asChild
          >
            <Link href={`/blog/category/${category.toLowerCase()}`}>
              {categoryLabels[category] || category}
            </Link>
          </Button>
        ))}
      </div>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Button key={tag} variant="ghost" size="sm" className="text-xs">
              #{tag}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}