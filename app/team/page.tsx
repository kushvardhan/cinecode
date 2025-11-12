// Team page with TeamCard grid
import type { Metadata } from 'next'
import TeamCard from '@/components/TeamCard'
import { FadeInUp, StaggerContainer, StaggerItem } from '@/components/MotionWrappers'

export const metadata: Metadata = {
  title: 'Our Team',
  description: 'Meet the talented team behind CineCode - creators, developers, and strategists.',
}

export default function TeamPage() {
  const team = [
    {
      name: 'Alex Chen',
      role: 'Creative Director',
      image: '/team/alex.jpg',
      bio: 'Visionary designer with 10+ years of experience crafting award-winning digital experiences.',
      social: {
        twitter: 'https://twitter.com/alexchen',
        linkedin: 'https://linkedin.com/in/alexchen',
      },
    },
    {
      name: 'Sarah Johnson',
      role: 'Lead Developer',
      image: '/team/sarah.jpg',
      bio: 'Full-stack engineer passionate about building scalable, performant web applications.',
      social: {
        github: 'https://github.com/sarahjohnson',
        linkedin: 'https://linkedin.com/in/sarahjohnson',
      },
    },
    {
      name: 'Marcus Williams',
      role: 'Video Producer',
      image: '/team/marcus.jpg',
      bio: 'Award-winning filmmaker bringing cinematic storytelling to digital content.',
      social: {
        twitter: 'https://twitter.com/marcuswilliams',
        linkedin: 'https://linkedin.com/in/marcuswilliams',
      },
    },
    {
      name: 'Emily Rodriguez',
      role: 'Marketing Strategist',
      image: '/team/emily.jpg',
      bio: 'Data-driven marketer with expertise in SEO, content strategy, and growth hacking.',
      social: {
        twitter: 'https://twitter.com/emilyrodriguez',
        linkedin: 'https://linkedin.com/in/emilyrodriguez',
      },
    },
  ]

  return (
    <main className="bg-black text-white min-h-screen">
      <section className="py-32 px-4 md:px-8 max-w-6xl mx-auto">
        <FadeInUp>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-center bg-linear-to-r from-(--accent-gold) via-(--accent-cyan) to-(--accent-purple) bg-clip-text text-transparent">
            Meet Our Team
          </h1>
          <p className="text-xl text-gray-300 text-center mb-16 max-w-3xl mx-auto">
            A diverse group of talented individuals united by a passion for creating exceptional
            digital experiences.
          </p>
        </FadeInUp>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {team.map((member) => (
            <StaggerItem key={member.name}>
              <TeamCard
                name={member.name}
                role={member.role}
                image={member.image}
                bio={member.bio}
                social={member.social}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeInUp delay={0.6}>
          <div className="mt-20 text-center">
            <h2 className="text-3xl font-bold mb-4">Want to Join Us?</h2>
            <p className="text-gray-400 mb-8">
              We&apos;re always looking for talented individuals to join our team.
            </p>
            <a
              href="/contact"
              className="inline-block px-10 py-4 bg-linear-to-rrom-[var(--accent-gold)] to-(--accent-cyan) text-black font-bold rounded-full hover:scale-105 transition-transform duration-300"
            >
              Get in Touch
            </a>
          </div>
        </FadeInUp>
      </section>
    </main>
  )
}

