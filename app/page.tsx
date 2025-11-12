// Server Component homepage importing HeroWrapper
import HeroWrapper from '@/components/HeroWrapper'
import { FadeInUp, StaggerContainer, StaggerItem } from '@/components/MotionWrappers'
import { DefaultProcessTimeline } from '@/components/ProcessTimeline'
import ServiceCard from '@/components/ServiceCard'

export default function Home() {
  const services = [
    { icon: '🌐', title: 'Web Development', slug: 'web-development' },
    { icon: '📱', title: 'App Development', slug: 'app-development' },
    { icon: '🎨', title: 'UI/UX Design', slug: 'ui-ux-design' },
    { icon: '🎬', title: 'Video Editing', slug: 'video-editing' },
    { icon: '📈', title: 'Digital Marketing', slug: 'digital-marketing' },
    { icon: '🔍', title: 'SEO & GMB', slug: 'seo-gmb' },
  ]

  return (
    <main className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <HeroWrapper />

      {/* Services Section */}
      <section id="services" className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <FadeInUp>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-linear-to-r from-(--accent-gold) to-(--accent-cyan) bg-clip-text text-transparent">
            Our Services
          </h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            We craft exceptional digital experiences that blend creativity with cutting-edge
            technology
          </p>
        </FadeInUp>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <StaggerItem key={service.slug}>
              <ServiceCard
                icon={<span className="text-4xl">{service.icon}</span>}
                title={service.title}
                onClick={() => (window.location.href = `/services/${service.slug}`)}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4 md:px-8 bg-linear-to-b from-black via-gray-900 to-black">
        <FadeInUp>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-linear-to-r from-(--accent-cyan) to-(--accent-purple) bg-clip-text text-transparent">
            Our Process
          </h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            A proven methodology that delivers exceptional results
          </p>
        </FadeInUp>
        <DefaultProcessTimeline />
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-8 text-center">
        <FadeInUp>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Start Your Project?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Let&apos;s create something extraordinary together
          </p>
          <a
            href="/contact"
            className="inline-block px-10 py-4 bg-linear-to-rrom-[var(--accent-gold)] to-(--accent-cyan)t-bold rounded-full hover:scale-105 transition-transform duration-300"
          >
            Get in Touch
          </a>
        </FadeInUp>
      </section>
    </main>
  )
}
