# Setup Guide

## Initial Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to see your portfolio.

## Customization

### 1. Update Personal Information

Edit `pages/index.tsx`:
- Replace "Your Name" with your actual name
- Update the bio/description
- Add your email, GitHub, LinkedIn links
- Update skills array
- Add your work experience in the `companies` array

### 2. Add Projects

Edit `content/projects/projects.json`:
```json
{
  "title": "Project Name",
  "description": "Project description",
  "technologies": ["Tech1", "Tech2"],
  "githubUrl": "https://github.com/username/repo",
  "liveUrl": "https://example.com", // optional
  "category": "Mobile", // optional
  "date": "2024-01-15" // optional
}
```

### 3. Add Blog Posts

**Option A: Markdown Posts**
Create `.md` files in `content/blog/` with frontmatter:
```markdown
---
title: "Post Title"
date: "2024-01-20"
excerpt: "Brief description"
---

Your markdown content here...
```

**Option B: External Links**
Edit `content/blog/external-links.json`:
```json
{
  "title": "Article Title",
  "date": "2024-01-15",
  "excerpt": "Brief description",
  "externalUrl": "https://example.com/article"
}
```

### 4. Configure GitHub Pages

**If repository is `username.github.io`:**
- The site will be available at `https://username.github.io`
- No additional configuration needed

**If repository is a project repo:**
- Update `next.config.js` to add `basePath`:
  ```js
  const nextConfig = {
    basePath: '/repository-name',
    output: 'export',
    // ... rest of config
  }
  ```
- The site will be at `https://username.github.io/repository-name`

### 5. Enable GitHub Pages

1. Go to your repository Settings
2. Navigate to Pages
3. Under "Source", select "GitHub Actions"
4. Push to `main` branch - the workflow will automatically deploy

## Building for Production

```bash
npm run build
```

The static files will be in the `out/` directory, ready for deployment.

## Project Structure

```
portfolio-github-io/
├── content/
│   ├── blog/           # Blog markdown files
│   └── projects/       # Projects JSON file
├── components/         # React components
├── contexts/           # React contexts (Theme)
├── lib/                # Utility functions
├── pages/              # Next.js pages
├── public/             # Static assets
└── styles/             # CSS files
```

## Features

- ✅ Minimalist design
- ✅ Light/Dark mode toggle
- ✅ Blog with markdown support
- ✅ External blog links
- ✅ Projects showcase
- ✅ Responsive design
- ✅ GitHub Pages ready

## Next Steps

1. Customize the content with your information
2. Add your projects
3. Write your first blog post
4. Push to GitHub and enable Pages
5. Share your portfolio!

