import Head from 'next/head'
import { getProjects } from '@/lib/projects'
import type { Project } from '@/lib/projects'
import ProjectCard from '@/components/ProjectCard'

interface ProjectsPageProps {
  projects: Project[]
}

export default function Projects({ projects }: ProjectsPageProps) {
  return (
    <>
      <Head>
        <title>Projects | Portfolio</title>
        <meta name="description" content="Showcase of projects and work" />
      </Head>

      <div className="container">
        <section className="section" style={{ paddingTop: '4rem' }}>
          <h1 className="section-title">Projects</h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.1rem' }}>
            A collection of projects I've worked on, including mobile apps, libraries, and experiments 
            in backend and AI engineering.
          </p>

          {projects.length === 0 ? (
            <div
              style={{
                padding: '3rem',
                textAlign: 'center',
                color: 'var(--text-secondary)',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
              }}
            >
              <p>No projects added yet. Check back soon!</p>
              <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Add projects by editing <code>content/projects/projects.json</code>
              </p>
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '1.5rem',
              }}
            >
              {projects.map((project, index) => (
                <ProjectCard key={index} project={project} />
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  )
}

export async function getStaticProps() {
  const projects = getProjects()
  return {
    props: {
      projects,
    },
  }
}

