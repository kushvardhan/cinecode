// Redesigned homepage with complete sections, Navbar, and Footer
import Footer from '@/components/Footer'
import HeroWrapper from '@/components/HeroWrapper'
import { FadeInUp, StaggerContainer, StaggerItem } from '@/components/MotionWrappers'
import Navbar from '@/components/Navbar'
import { DefaultProcessTimeline } from '@/components/ProcessTimeline'
import ProjectCard from '@/components/ProjectCard'
import ServiceGrid from '@/components/ServiceGrid'
import TeamCard from '@/components/TeamCard'
import type { Metadata, Viewport } from 'next'

export default function Home() {
  const services = [
    { icon: '🌐', title: 'Web Development', slug: 'web-development' },
    { icon: '📱', title: 'App Development', slug: 'app-development' },
    { icon: '🎨', title: 'UI/UX Design', slug: 'ui-ux-design' },
    { icon: '🎬', title: 'Video Editing', slug: 'video-editing' },
    { icon: '📈', title: 'Digital Marketing', slug: 'digital-marketing' },
    { icon: '🔍', title: 'SEO & GMB', slug: 'seo-gmb' },
  ]

  const featuredProjects = [
    {
      slug: 'ecommerce-platform',
      title: 'E-Commerce Platform',
      description: 'A modern e-commerce solution with seamless checkout',
      thumbnail: '/projects/ecommerce.jpg',
      category: 'Web Development',
      tags: ['Next.js', 'Stripe', 'Tailwind CSS'],
    },
    {
      slug: 'mobile-fitness-app',
      title: 'Fitness Tracking App',
      description: 'Cross-platform mobile app for fitness enthusiasts',
      thumbnail: '/projects/fitness.jpg',
      category: 'App Development',
      tags: ['React Native', 'Firebase', 'HealthKit'],
    },
  ]

  const teamPreview = [
    {
      name: 'Alex Chen',
      role: 'Creative Director',
      image: '/team/alex.jpg',
      social: {
        twitter: 'https://twitter.com/alexchen',
        linkedin: 'https://linkedin.com/in/alexchen',
      },
    },
    {
      name: 'Sarah Johnson',
      role: 'Lead Developer',
      image: '/team/sarah.jpg',
      social: {
        github: 'https://github.com/sarahjohnson',
        linkedin: 'https://linkedin.com/in/sarahjohnson',
      },
    },
  ]

  return (
    <>
      <Navbar />
      <main className="bg-black text-white min-h-screen pt-20">
        {/* Hero Section */}
        <HeroWrapper />

        {/* Services Section */}
        <section id="services" className="py-32 px-4 md:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-16" data-reveal>
            <h2
              className="text-5xl md:text-6xl font-bold mb-6 bg-linear-to-r from-(--accent-gold) to-(--accent-cyan) bg-clip-text text-transparent"
              data-parallax="0.1"
            >
              What We Do
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              We craft exceptional digital experiences that blend creativity with cutting-edge
              technology
            </p>
          </div>
          <div data-reveal>
            <ServiceGrid services={services} />
          </div>
        </section>

        {/* Featured Projects Section */}
        <section className="py-32 px-4 md:px-8 bg-linear-to-b from-black via-gray-900/50 to-black">
          <div className="max-w-7xl mx-auto">
            <FadeInUp>
              <div className="text-center mb-16">
                <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-linear-to-r from-(--accent-cyan) to-(--accent-purple) bg-clip-text text-transparent">
                  Featured Work
                </h2>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                  Explore our latest projects and see how we bring ideas to life
                </p>
              </div>
            </FadeInUp>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredProjects.map((project) => (
                <StaggerItem key={project.slug}>
                  <ProjectCard {...project} />
                </StaggerItem>
              ))}
            </StaggerContainer>

            <FadeInUp delay={0.6}>
              <div className="text-center mt-12">
                <a
                  href="/projects/ecommerce-platform"
                  className="inline-block px-8 py-3 border-2 border-(--accent-cyan) text-(--accent-cyan) font-semibold rounded-full hover:bg-(--accent-cyan)/10 transition-colors duration-300"
                >
                  View All Projects
                </a>
              </div>
            </FadeInUp>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-32 px-4 md:px-8">
          <FadeInUp>
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-linear-to-r from-(--accent-gold) via-(--accent-cyan) to-(--accent-purple) bg-clip-text text-transparent">
                Our Process
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                A proven methodology that delivers exceptional results every time
              </p>
            </div>
          </FadeInUp>
          <DefaultProcessTimeline />
        </section>

        {/* Team Preview Section */}
        <section className="py-32 px-4 md:px-8 bg-linear-to-b from-black via-gray-900/50 to-black">
          <div className="max-w-7xl mx-auto">
            <FadeInUp>
              <div className="text-center mb-16">
                <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-linear-to-r from-(--accent-purple) to-(--accent-gold) bg-clip-text text-transparent">
                  Meet Our Team
                </h2>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                  Talented individuals united by a passion for creating exceptional digital
                  experiences
                </p>
              </div>
            </FadeInUp>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {teamPreview.map((member) => (
                <StaggerItem key={member.name}>
                  <TeamCard {...member} />
                </StaggerItem>
              ))}
            </StaggerContainer>

            <FadeInUp delay={0.6}>
              <div className="text-center mt-12">
                <a
                  href="/team"
                  className="inline-block px-8 py-3 border-2 border-(--accent-purple) text-(--accent-purple) font-semibold rounded-full hover:bg-(--accent-purple)/10 transition-colors duration-300"
                >
                  Meet the Full Team
                </a>
              </div>
            </FadeInUp>
          </div>
        </section>

        {/* Contact CTA Section */}
        <section className="py-32 px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <FadeInUp>
              <h2 className="text-5xl md:text-7xl font-bold mb-8">Ready to Start Your Project?</h2>
              <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
                Let&apos;s create something extraordinary together. Get in touch and bring your
                vision to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="inline-block px-10 py-4 bg-linear-to-r from-(--accent-gold) to-(--accent-cyan) text-black font-bold rounded-full hover:scale-105 transition-transform duration-300 text-lg"
                >
                  Get in Touch
                </a>
                <a
                  href="/projects/ecommerce-platform"
                  className="inline-block px-10 py-4 border-2 border-white/30 text-white font-bold rounded-full hover:bg-white/10 transition-colors duration-300 text-lg"
                >
                  View Our Work
                </a>
              </div>
            </FadeInUp>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export const metadata: Metadata = {
  title: 'CineCode - Digital Experiences That Feel Like Cinema',
  description:
    'We are a team of passionate creators, developers, and strategists dedicated to crafting digital experiences that feel like cinema.',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}
