# Josh Menzies – Shua Portfolio Platform

A premium, Apple-grade portfolio platform built with Next.js 14, TypeScript, TailwindCSS, and Framer Motion. Designed to impress employers, recruiters, and senior engineers.

## 🎯 Features

- **Apple-Grade Design**: Black glass UI with fluid animations and premium spacing
- **Full-Stack Portfolio**: Complete showcase of experience, skills, projects, and blog
- **Shua AI Assistant**: Interactive chatbot interface for learning about Josh's work
- **Responsive**: Fully optimized for desktop, tablet, and mobile
- **Static Export Ready**: Configured for S3 + CloudFront deployment

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Export static site (for S3/CloudFront)
npm run export
```

The site will be available at `http://localhost:3000`

## 📁 Project Structure

```
shua-portfolio/
├── app/                    # Next.js App Router pages
│   ├── about/             # About pages
│   ├── blog/              # Blog pages
│   ├── projects/          # Project case studies
│   └── ...
├── components/            # React components
│   ├── Navigation.tsx
│   ├── Hero.tsx
│   ├── GlassCard.tsx
│   └── ...
├── content/               # Content data
│   ├── experience.ts
│   ├── projects.ts
│   ├── skills.ts
│   └── ...
└── types/                 # TypeScript types
```

## 🎨 Design System

### Glass Cards
- `bg-white/5` with `backdrop-blur-2xl`
- Hover effects with scale and glow
- Rounded corners (`rounded-3xl`)

### Typography
- **Display**: Space Grotesk (headings)
- **Body**: Inter (content)
- Gradient text for emphasis

### Colors
- Background: Pure black (`#000000`)
- Glass: `white/5` with `white/10` borders
- Gradients: Blue → Purple → Green

### Animations
- Framer Motion for all interactions
- Fade-up on scroll
- Parallax mouse tracking
- Smooth transitions

## 📝 Content Management

### Updating Experience
Edit `content/experience.ts` to add or modify work experience.

### Adding Projects
1. Add project data to `content/projects.ts`
2. Create case study content in the component
3. Projects automatically appear on `/projects`

### Blog Posts
Blog posts are currently using placeholder content. To add MDX support:
1. Create markdown files in `content/blog/`
2. Update `app/blog/[slug]/page.tsx` to load MDX files
3. Configure MDX loader in `next.config.js`

### Skills
Edit `content/skills.ts` to update skill categories and technologies.

## 🔧 Configuration

### Static Export
The project is configured for static export (`output: 'export'`). After building:

```bash
npm run build
```

The `out/` directory will contain the static site ready for S3/CloudFront deployment.

### Resume PDF
Place your resume PDF at `public/resume.pdf` for the download link to work.

## 🎯 Key Pages

- `/` - Hero and preview sections
- `/about` - About Josh
- `/about/shua` - Meet Shua AI assistant
- `/experience` - Full experience timeline
- `/skills` - Skills grid
- `/projects` - Project case studies
- `/blog` - Blog index
- `/contact` - Contact form
- `/chat` - Full-page Shua chat interface

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Blog**: MDX (configured, ready for content)

## 📦 Deployment

### S3 + CloudFront
1. Build the static site: `npm run build`
2. Upload `out/` directory to S3 bucket
3. Configure CloudFront distribution
4. Set up custom domain (optional)

### Vercel
Simply connect your repository to Vercel for automatic deployments.

## 🎨 Customization

### Colors
Edit `tailwind.config.ts` to customize the color scheme.

### Fonts
Update `app/globals.css` to change fonts. Currently using:
- Inter (body)
- Space Grotesk (headings)

### Animations
Modify Framer Motion configurations in individual components to adjust animation timing and effects.

## 📄 License

Private project for Josh Menzies portfolio.

## 🤝 Contributing

This is a personal portfolio project. For suggestions or improvements, please reach out directly.

---

Built with ❤️ using Next.js, TypeScript, and TailwindCSS.

