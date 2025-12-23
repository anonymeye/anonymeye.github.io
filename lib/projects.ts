import fs from 'fs'
import path from 'path'

const projectsDirectory = path.join(process.cwd(), 'content/projects')

export interface Project {
  title: string
  description: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  category?: string
  date?: string
}

export function getProjects(): Project[] {
  const projectsPath = path.join(projectsDirectory, 'projects.json')
  
  if (!fs.existsSync(projectsPath)) {
    return []
  }

  try {
    const fileContents = fs.readFileSync(projectsPath, 'utf8')
    const projects = JSON.parse(fileContents)
    return projects.sort((a: Project, b: Project) => {
      if (a.date && b.date) {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      }
      return 0
    })
  } catch (e) {
    console.error('Error reading projects:', e)
    return []
  }
}

