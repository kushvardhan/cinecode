// Dynamic service detail page with generateStaticParams
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { FadeInUp } from '@/components/MotionWrappers'

const services = {
  'web-development': {
    title: 'Web Development',
    description: 'Custom web applications built with modern technologies',
    icon: '🌐',
    features: [
      'Responsive Design',
      'Performance Optimization',
      'SEO-Friendly Architecture',
      'Progressive Web Apps',
      'E-commerce Solutions',
    ],
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js'],
  },
  'app-development': {
    title: 'App Development',
    description: 'Native and cross-platform mobile applications',
    icon: '📱',
    features: [
      'iOS & Android Development',
      'Cross-Platform Solutions',
      'App Store Optimization',
      'Push Notifications',
      'Offline Functionality',
    ],
    technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase'],
  },
  'ui-ux-design': {
    title: 'UI/UX Design',
    description: 'Beautiful, intuitive interfaces that users love',
    icon: '🎨',
    features: [
      'User Research',
      'Wireframing & Prototyping',
      'Visual Design',
      'Usability Testing',
      'Design Systems',
    ],
    technologies: ['Figma', 'Adobe XD', 'Sketch', 'Framer', 'Principle'],
  },
  'video-editing': {
    title: 'Video Editing',
    description: 'Professional video production and post-production',
    icon: '🎬',
    features: [
      'Color Grading',
      'Motion Graphics',
      'Sound Design',
      'Visual Effects',
      'Brand Videos',
    ],
    technologies: ['Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Final Cut Pro'],
  },
  'digital-marketing': {
    title: 'Digital Marketing',
    description: 'Data-driven marketing strategies that deliver results',
    icon: '📈',
    features: [
      'Social Media Marketing',
      'Content Strategy',
      'Email Campaigns',
      'PPC Advertising',
      'Analytics & Reporting',
    ],
    technologies: ['Google Ads', 'Facebook Ads', 'Mailchimp', 'HubSpot', 'Google Analytics'],
  },
  'seo-gmb': {
    title: 'SEO & GMB',
    description: 'Improve your visibility and rank higher in search results',
    icon: '🔍',
    features: [
      'Keyword Research',
      'On-Page Optimization',
      'Technical SEO',
      'Local SEO',
      'Google My Business Management',
    ],
    technologies: ['Google Search Console', 'SEMrush', 'Ahrefs', 'Screaming Frog'],
  },
}

export async function generateStaticParams() {
  return Object.keys(services).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const service = services[slug as keyof typeof services]
  
  if (!service) {
    return { title: 'Service Not Found' }
  }

  return {
    title: service.title,
    description: service.description,
  }
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = services[slug as keyof typeof services]

  if (!service) {
    notFound()
  }

  return (
    <main className="bg-black text-white min-h-screen">
      <section className="py-32 px-4 md:px-8 max-w-5xl mx-auto">
        <FadeInUp>
          <div className="text-6xl mb-6 text-center">{service.icon}</div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-center bg-gradient-to-r from-[var(--accent-gold)] to-[var(--accent-cyan)] bg-clip-text text-transparent">
            {service.title}
          </h1>
          <p className="text-xl text-gray-300 text-center mb-12">{service.description}</p>
        </FadeInUp>

        <div className="grid md:grid-cols-2 gap-12 mt-16">
          <FadeInUp delay={0.2}>
            <h2 className="text-3xl font-bold mb-6 text-[var(--accent-cyan)]">Features</h2>
            <ul className="space-y-3">
              {service.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <span className="text-[var(--accent-gold)] mt-1">✓</span>
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
          </FadeInUp>

          <FadeInUp delay={0.4}>
            <h2 className="text-3xl font-bold mb-6 text-[var(--accent-purple)]">Technologies</h2>
            <div className="flex flex-wrap gap-3">
              {service.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-white/5 rounded-full text-sm border border-white/10"
                >
                  {tech}
                </span>
              ))}
            </div>
          </FadeInUp>
        </div>

        <FadeInUp delay={0.6}>
          <div className="mt-16 text-center">
            <a
              href="/contact"
              className="inline-block px-10 py-4 bg-gradient-to-r from-[var(--accent-gold)] to-[var(--accent-cyan)] text-black font-bold rounded-full hover:scale-105 transition-transform duration-300"
            >
              Get Started
            </a>
          </div>
        </FadeInUp>
      </section>
    </main>
  )
}

