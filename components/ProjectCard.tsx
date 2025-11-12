// Accessible project card with framer-motion and reduced-motion support
'use client'
import { scaleIn } from '@/lib/motion'
import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

interface ProjectCardProps {
  slug: string
  title: string
  description: string
  thumbnail: string
  category: string
  tags?: string[]
}

export default function ProjectCard({
  slug,
  title,
  description,
  thumbnail,
  category,
  tags = [],
}: ProjectCardProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.article
      initial={prefersReducedMotion ? undefined : scaleIn.hidden}
      whileInView={prefersReducedMotion ? undefined : scaleIn.visible}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      className="group"
    >
      <Link href={`/projects/${slug}`} className="block">
        <div className="relative overflow-hidden rounded-2xl bg-gray-900 shadow-lg hover:shadow-2xl transition-shadow duration-300">
          {/* Thumbnail */}
          <div className="relative h-64 md:h-80 overflow-hidden">
            <Image
              src={thumbnail}
              alt={title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

            {/* Category Badge */}
            <div className="absolute top-4 left-4 px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs font-semibold text-white">
              {category}
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-(--accent-cyan) transition-colors">
              {title}
            </h3>
            <p className="text-gray-400 text-sm line-clamp-2 mb-4">{description}</p>

            {/* Tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-white/5 rounded text-xs text-gray-300">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-linear-to-r from-(--accent-gold)/0 to-(--accent-cyan)/0 group-hover:from-(--accent-gold)/10 group-hover:to-(--accent-cyan)/10 transition-all duration-500 pointer-events-none" />
        </div>
      </Link>
    </motion.article>
  )
}
