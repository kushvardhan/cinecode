// POST route with zod validation, xss-clean, and rate limiting
import { connectDB } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import { RateLimiterMemory } from 'rate-limiter-flexible'
import { z } from 'zod'

// Zod schema for contact form validation
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  company: z.string().max(100).optional(),
  service: z.string().max(50).optional(),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000),
})

// Rate limiter: 5 requests per 15 minutes per IP
const rateLimiter = new RateLimiterMemory({
  points: 5,
  duration: 15 * 60, // 15 minutes
})

// Simple XSS sanitization
function sanitizeInput(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'

    // Check rate limit
    try {
      await rateLimiter.consume(ip)
    } catch (rateLimiterRes) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    // Parse and validate request body
    const body = await request.json()
    const validatedData = contactSchema.parse(body)

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(validatedData.name),
      email: sanitizeInput(validatedData.email),
      company: validatedData.company ? sanitizeInput(validatedData.company) : '',
      service: validatedData.service ? sanitizeInput(validatedData.service) : '',
      message: sanitizeInput(validatedData.message),
    }

    // Connect to database
    await connectDB()

    // TODO: Save to database
    // Example:
    // const contact = await Contact.create({
    //   ...sanitizedData,
    //   ip,
    //   createdAt: new Date(),
    // })

    // TODO: Send email notification
    // Example:
    // await sendEmail({
    //   to: 'hello@cinecode.com',
    //   subject: `New contact form submission from ${sanitizedData.name}`,
    //   body: `
    //     Name: ${sanitizedData.name}
    //     Email: ${sanitizedData.email}
    //     Company: ${sanitizedData.company}
    //     Service: ${sanitizedData.service}
    //     Message: ${sanitizedData.message}
    //   `,
    // })

    // Log for now (replace with actual DB save)
    console.log('Contact form submission:', sanitizedData)

    return NextResponse.json(
      { message: 'Message sent successfully', data: sanitizedData },
      { status: 200 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      )
    }

    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// OPTIONS for CORS preflight
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 })
}

