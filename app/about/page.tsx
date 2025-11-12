// About page with company story and values
import type { Metadata } from 'next'
import { FadeInUp, StaggerContainer, StaggerItem } from '@/components/MotionWrappers'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about CineCode - a team of passionate creators dedicated to crafting cinematic digital experiences.',
}

export default function AboutPage() {
  const values = [
    {
      title: 'Innovation',
      description: 'We push boundaries and embrace cutting-edge technologies to deliver next-level solutions.',
      icon: '💡',
    },
    {
      title: 'Quality',
      description: 'Every pixel, every line of code, every frame - crafted with meticulous attention to detail.',
      icon: '⭐',
    },
    {
      title: 'Collaboration',
      description: 'We work closely with our clients, turning their vision into reality through partnership.',
      icon: '🤝',
    },
    {
      title: 'Creativity',
      description: 'We blend art and technology to create experiences that inspire and engage.',
      icon: '🎨',
    },
  ]

  return (
    <main className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <section className="py-32 px-4 md:px-8 max-w-5xl mx-auto text-center">
        <FadeInUp>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-linear-to-r from-(--accent-gold)[var(--accent-cyan)] to-(--accent-purple)lip-text text-transparent">
            About CineCode
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            We are a team of passionate creators, developers, and strategists dedicated to crafting
            digital experiences that feel like cinema.
          </p>
        </FadeInUp>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4 md:px-8 max-w-4xl mx-auto">
        <FadeInUp>
          <h2 className="text-4xl font-bold mb-6 text-(--accent-cyan)">Our Story</h2>
          <div className="space-y-4 text-gray-300 leading-relaxed">
            <p>
              CineCode was born from a simple belief: digital experiences should be as captivating
              as cinema. We saw a gap between traditional web development and the immersive,
              emotional experiences that great films create.
            </p>
            <p>
              Our team brings together expertise in web development, app development, UI/UX design,
              video editing, digital marketing, and SEO. We don&apos;t just build websites and
              apps - we craft experiences that tell stories, evoke emotions, and drive results.
            </p>
            <p>
              Every project is an opportunity to push boundaries, experiment with new technologies,
              and create something truly exceptional. From startups to established brands, we help
              our clients stand out in the digital landscape.
            </p>
          </div>
        </FadeInUp>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
        <FadeInUp>
          <h2 className="text-4xl font-bold mb-12 text-center text-(--accent-gold)">
            Our Values
          </h2>
        </FadeInUp>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((value) => (
            <StaggerItem key={value.title}>
              <div className="p-8 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 hover:border-(--accent-cyan)/50 transition-colors">
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-2xl font-bold mb-3 text-white">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-8 text-center">
        <FadeInUp>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Want to Work With Us?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Let&apos;s create something extraordinary together
          </p>
          <a
            href="/contact"
            className="inline-block px-10 py-4 bg-linear-to-r from-(--accent-gold) to-(--accent-cyan) text-black font-bold rounded-full hover:scale-105 transition-transform duration-300"
          >
            Get in Touch
          </a>
        </FadeInUp>
      </section>
    </main>
  )
}

