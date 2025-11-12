// Default SEO config and JSON-LD schema generators for Service and Person
import { DefaultSeoProps } from 'next-seo'

export const defaultSEO: DefaultSeoProps = {
  titleTemplate: '%s | CineCode',
  defaultTitle: 'CineCode - Cinematic Digital Experiences',
  description:
    'CineCode is a premium digital agency specializing in web development, app development, UI/UX design, video editing, digital marketing, and SEO services.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://cinecode.com',
    siteName: 'CineCode',
    images: [
      {
        url: 'https://cinecode.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'CineCode - Cinematic Digital Experiences',
      },
    ],
  },
  twitter: {
    handle: '@cinecode',
    site: '@cinecode',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: 'theme-color',
      content: '#0a0a0a',
    },
  ],
}

// JSON-LD schema for Service
export const generateServiceSchema = (service: {
  name: string
  description: string
  url: string
  image?: string
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: service.name,
  description: service.description,
  provider: {
    '@type': 'Organization',
    name: 'CineCode',
    url: 'https://cinecode.com',
  },
  url: service.url,
  ...(service.image && { image: service.image }),
})

// JSON-LD schema for Person (team member)
export const generatePersonSchema = (person: {
  name: string
  jobTitle: string
  image?: string
  email?: string
  url?: string
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: person.name,
  jobTitle: person.jobTitle,
  worksFor: {
    '@type': 'Organization',
    name: 'CineCode',
    url: 'https://cinecode.com',
  },
  ...(person.image && { image: person.image }),
  ...(person.email && { email: person.email }),
  ...(person.url && { url: person.url }),
})

// JSON-LD schema for Organization
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'CineCode',
  url: 'https://cinecode.com',
  logo: 'https://cinecode.com/logo.png',
  description:
    'Premium digital agency specializing in web development, app development, UI/UX design, video editing, digital marketing, and SEO.',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'US',
  },
  sameAs: [
    'https://twitter.com/cinecode',
    'https://linkedin.com/company/cinecode',
    'https://github.com/cinecode',
  ],
}

