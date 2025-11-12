// Dynamic project detail page with case study layout
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { FadeInUp } from '@/components/MotionWrappers'

const projects = {
  'ecommerce-platform': {
    title: 'E-Commerce Platform',
    description: 'A modern e-commerce solution with seamless checkout experience',
    thumbnail: '/projects/ecommerce.jpg',
    category: 'Web Development',
    tags: ['Next.js', 'Stripe', 'Tailwind CSS'],
    client: 'Fashion Retailer',
    year: '2024',
    challenge:
      'The client needed a fast, scalable e-commerce platform that could handle high traffic during sales events.',
    solution:
      'We built a Next.js-based platform with server-side rendering, optimized images, and integrated Stripe for payments.',
    results: ['50% faster page load times', '30% increase in conversions', '99.9% uptime'],
  },
  'mobile-fitness-app': {
    title: 'Fitness Tracking App',
    description: 'Cross-platform mobile app for fitness enthusiasts',
    thumbnail: '/projects/fitness.jpg',
    category: 'App Development',
    tags: ['React Native', 'Firebase', 'HealthKit'],
    client: 'Fitness Startup',
    year: '2024',
    challenge: 'Create an engaging fitness app that works seamlessly on both iOS and Android.',
    solution:
      'We developed a React Native app with real-time sync, workout tracking, and social features.',
    results: ['100K+ downloads', '4.8 star rating', 'Featured on App Store'],
  },
}

export async function generateStaticParams() {
  return Object.keys(projects).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const project = projects[slug as keyof typeof projects]

  if (!project) {
    return { title: 'Project Not Found' }
  }

  return {
    title: project.title,
    description: project.description,
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = projects[slug as keyof typeof projects]

  if (!project) {
    notFound()
  }

  return (
    <main className="bg-black text-white min-h-screen">
      <section className="py-32 px-4 md:px-8 max-w-5xl mx-auto">
        <FadeInUp>
          <div className="mb-6">
            <span className="px-4 py-2 bg-[var(--accent-gold)]/20 text-[var(--accent-gold)] rounded-full text-sm font-semibold">
              {project.category}
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[var(--accent-gold)] to-[var(--accent-cyan)] bg-clip-text text-transparent">
            {project.title}
          </h1>
          <p className="text-xl text-gray-300 mb-8">{project.description}</p>
          <div className="flex gap-6 text-sm text-gray-400 mb-12">
            <div>
              <span className="font-semibold text-white">Client:</span> {project.client}
            </div>
            <div>
              <span className="font-semibold text-white">Year:</span> {project.year}
            </div>
          </div>
        </FadeInUp>

        <FadeInUp delay={0.2}>
          <div className="relative h-96 rounded-2xl overflow-hidden mb-16">
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </div>
        </FadeInUp>

        <div className="space-y-12">
          <FadeInUp delay={0.3}>
            <h2 className="text-3xl font-bold mb-4 text-[var(--accent-cyan)]">The Challenge</h2>
            <p className="text-gray-300 leading-relaxed">{project.challenge}</p>
          </FadeInUp>

          <FadeInUp delay={0.4}>
            <h2 className="text-3xl font-bold mb-4 text-[var(--accent-purple)]">Our Solution</h2>
            <p className="text-gray-300 leading-relaxed">{project.solution}</p>
          </FadeInUp>

          <FadeInUp delay={0.5}>
            <h2 className="text-3xl font-bold mb-4 text-[var(--accent-gold)]">Results</h2>
            <ul className="space-y-3">
              {project.results.map((result) => (
                <li key={result} className="flex items-start gap-3">
                  <span className="text-[var(--accent-gold)] mt-1">✓</span>
                  <span className="text-gray-300">{result}</span>
                </li>
              ))}
            </ul>
          </FadeInUp>

          <FadeInUp delay={0.6}>
            <div className="flex flex-wrap gap-3">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-white/5 rounded-full text-sm border border-white/10"
                >
                  {tag}
                </span>
              ))}
            </div>
          </FadeInUp>
        </div>

        <FadeInUp delay={0.7}>
          <div className="mt-16 text-center">
            <a
              href="/contact"
              className="inline-block px-10 py-4 bg-gradient-to-r from-[var(--accent-gold)] to-[var(--accent-cyan)] text-black font-bold rounded-full hover:scale-105 transition-transform duration-300"
            >
              Start Your Project
            </a>
          </div>
        </FadeInUp>
      </section>
    </main>
  )
}

