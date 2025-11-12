# CineCode - Cinematic Digital Experiences

A premium digital agency website built with Next.js 16, featuring stunning 3D animations, smooth scrolling, and a cinematic user experience.

## 🚀 Features

- **Next.js 16 App Router** with TypeScript
- **React Three Fiber** for 3D hero animations
- **Framer Motion** for smooth, cinematic animations
- **Lenis** for buttery-smooth scrolling
- **Tailwind CSS v4** for styling
- **Dark/Light Theme** with system preference detection
- **Fully Responsive** - mobile-first design
- **Accessibility** - respects `prefers-reduced-motion`
- **Performance Optimized** - lazy loading, dynamic imports
- **SEO Ready** - metadata, structured data
- **Clerk Authentication** - ready for user management
- **Prisma + MongoDB** - database integration
- **API Routes** - with validation and rate limiting
- **Playwright Tests** - E2E testing setup

## 📦 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **3D Graphics**: React Three Fiber, Three.js
- **Animations**: Framer Motion, GSAP
- **Smooth Scroll**: Lenis
- **Authentication**: Clerk
- **Database**: Prisma (PostgreSQL) + Mongoose (MongoDB)
- **Validation**: Zod
- **Testing**: Playwright
- **Deployment**: Vercel

## 🛠️ Setup

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database (for Prisma)
- MongoDB database (for Mongoose)

### Installation

1. **Clone the repository**

2. **Install dependencies**:
```bash
npm install
```

3. **Set up environment variables**:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your credentials:
- Database URLs (PostgreSQL and MongoDB)
- Clerk API keys (sign up at https://clerk.com)
- Other optional services

4. **Set up Prisma**:
```bash
npx prisma generate
npx prisma db push
```

5. **Run the development server**:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## 📁 Project Structure

```
cinecode/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── api/               # API routes
│   ├── contact/           # Contact page
│   ├── dashboard/         # Protected dashboard
│   ├── projects/          # Dynamic project pages
│   ├── services/          # Dynamic service pages
│   ├── team/              # Team page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── HeroWrapper.tsx    # Hero with 3D/fallback
│   ├── HeroLite.tsx       # Non-3D hero
│   ├── ThreeHero.tsx      # 3D hero scene
│   ├── MotionWrappers.tsx # Animation wrappers
│   ├── ProcessTimeline.tsx
│   ├── ProjectCard.tsx
│   ├── ServiceCard.tsx
│   ├── TeamCard.tsx
│   ├── LenisWrapper.tsx   # Smooth scroll
│   └── ThemeProvider.tsx  # Theme management
├── lib/                   # Utilities
│   ├── auth.ts           # Auth helpers
│   ├── db.ts             # Database connection
│   ├── motion.ts         # Animation tokens
│   └── seo.ts            # SEO config
├── prisma/
│   └── schema.prisma     # Database schema
├── tests/                # Playwright tests
└── public/               # Static assets
```

## 🎨 Customization

### Theme Colors

Edit `app/globals.css` to customize accent colors:
```css
:root {
  --accent-gold: #FFD700;
  --accent-cyan: #00FFC8;
  --accent-purple: #A855F7;
}
```

### Services

Edit `app/page.tsx` to add/remove services in the services array.

### Team Members

Edit `app/team/page.tsx` to update team member information.

## 🧪 Testing

Run Playwright tests:
```bash
npm run test
```

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production

Make sure to set these in your Vercel dashboard:
- `DATABASE_URL`
- `MONGODB_URI`
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run test` - Run Playwright tests
- `npm run type-check` - Check TypeScript types

## 🎯 Performance Tips

- 3D hero is lazy-loaded and pauses when off-screen
- Images use Next.js Image component for optimization
- Animations respect `prefers-reduced-motion`
- Code splitting with dynamic imports
- Smooth scrolling disabled for reduced motion users

## 📄 License

MIT License - feel free to use this project for your own agency!

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

---

Built with ❤️ by CineCode
