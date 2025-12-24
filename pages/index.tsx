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
        <section className="section">
          <h2 className="section-title">Experience</h2>
          <div
            style={{
              padding: '1.5rem',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
            }}
          >
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>
              iOS Software Engineer
            </h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '1.1rem' }}>
              I've worked as an iOS Software Engineer across different company sizes, from startups to mid-size companies to large enterprises.
            </p>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '1.1rem' }}>
              My experience spans multiple industries including <strong>retail</strong>, <strong>hospitality</strong>, <strong>fintech</strong>, and <strong>energy</strong>. 
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
              For more details about my work experience, please visit my{' '}
              <a 
                href="https://www.linkedin.com/in/abderrahmane-abourkia/" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: 'var(--accent)', textDecoration: 'underline' }}
              >
                LinkedIn profile
              </a>.
            </p>
          </div>
        </section>

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
            <a href="https://github.com/anonymeye" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/abderrahmane-abourkia/" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              LinkedIn
            </a>
          </div>
        </section>
      </div>
    </>
  )
}

