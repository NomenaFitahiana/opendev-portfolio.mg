/**
 * Page de détail d'un projet
 * Route dynamique basée sur le slug
 */

import ProjectDetail from '@/components/projects/ProjectDetail'

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  return (
    <main>
      <ProjectDetail projectSlug={params.slug} />
    </main>
  )
}
