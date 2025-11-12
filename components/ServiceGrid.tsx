'use client'

import { StaggerContainer, StaggerItem } from '@/components/MotionWrappers'
import ServiceCard from '@/components/ServiceCard'

export default function ServiceGrid({ services }: { services: { icon: string; title: string; slug: string }[] }) {
  return (
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
  )
}
