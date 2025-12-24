import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  const skills = [
    'iOS Development',
    'React Native',
    'Clojure',
    'ClojureScript',
    'Java',
    'Python',
    'Backend Development',
    'AI/ML',
  ]

  const companies = [
    {
      name: 'Company Name',
      role: 'iOS Engineer',
      period: '2020 - Present',
      description: 'Worked on mobile applications using Swift and React Native.',
    },
    // Add more companies as needed
  ]

  return (
    <>
      <Head>
        <title>Portfolio | Abdel - iOS & Full-Stack Engineer</title>
        <meta name="description" content="Portfolio of Abdel - iOS and Full-Stack Engineer" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container">
        {/* Hero Section */}
        <section className="section" style={{ paddingTop: '4rem' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '1rem', lineHeight: 1.2 }}>
            Hi, I'm{' '}
            <span style={{ color: 'var(--accent)' }}>Abdel</span>
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '2rem', maxWidth: '600px' }}>
            iOS & Full-Stack Engineer passionate about mobile development, backend systems, and AI technologies.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/projects" className="btn">
              View Projects
            </Link>
            <Link href="/blog" className="btn btn-outline">
              Read Blog
            </Link>
          </div>
        </section>

        {/* About Section */}
        <section className="section">
          <h2 className="section-title">About</h2>
          <div style={{ maxWidth: '700px' }}>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '1.1rem' }}>
              I'm a mobile engineer with experience in iOS development, React Native, and various backend technologies. 
              I'm passionate about building scalable systems, exploring AI technologies, and creating end-to-end solutions.
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
              I've worked with Clojure and ClojureScript, built libraries, and enjoy exploring new technologies. 
              This portfolio showcases my projects and work across mobile, backend, and AI domains.
            </p>
          </div>
        </section>

        {/* Skills Section */}
        <section className="section">
          <h2 className="section-title">Skills & Technologies</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            {skills.map((skill, index) => (
              <span
                key={index}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  color: 'var(--text-primary)',
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        {companies.length > 0 && (
          <section className="section">
            <h2 className="section-title">Experience</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {companies.map((company, index) => (
                <div
                  key={index}
                  style={{
                    padding: '1.5rem',
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                    <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)' }}>{company.name}</h3>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{company.period}</span>
                  </div>
                  <p style={{ color: 'var(--accent)', marginBottom: '0.5rem', fontSize: '1rem' }}>{company.role}</p>
                  <p style={{ color: 'var(--text-secondary)' }}>{company.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Contact Section */}
        <section className="section">
          <h2 className="section-title">Get in Touch</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '1.1rem' }}>
            Interested in collaborating or have questions? Feel free to reach out.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="mailto:your.email@example.com" className="btn">
              Email Me
            </a>
            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              GitHub
            </a>
            <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              LinkedIn
            </a>
          </div>
        </section>
      </div>
    </>
  )
}

