import { connectDB } from '@/lib/db'
import { Contact } from '@/models/Contact'
import { NextRequest, NextResponse } from 'next/server'
import { RateLimiterMemory } from 'rate-limiter-flexible'
import { z } from 'zod'

// ✅ Zod schema for validation
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  company: z.string().max(100).optional(),
  service: z.string().max(50).optional(),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000),
})

// ✅ Rate limiting setup (5 requests / 15 min per IP)
const rateLimiter = new RateLimiterMemory({
  points: 5,
  duration: 15 * 60,
})

// ✅ Simple XSS sanitization
function sanitizeInput(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
}

// ✅ POST handler
export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      'unknown'

    // ⛔ Apply rate limiter
    try {
      await rateLimiter.consume(ip)
    } catch {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    // ✅ Parse and validate body
    const body = await request.json()
    const validated = contactSchema.parse(body)

    // ✅ Sanitize
    const sanitizedData = {
      name: sanitizeInput(validated.name),
      email: sanitizeInput(validated.email),
      company: validated.company ? sanitizeInput(validated.company) : '',
      service: validated.service ? sanitizeInput(validated.service) : '',
      message: sanitizeInput(validated.message),
      ip,
    }

    // ✅ Connect to DB and save
    await connectDB()
    const contact = await Contact.create(sanitizedData)

    return NextResponse.json(
      { message: 'Message sent successfully', data: contact },
      { status: 200 }
    )
  } catch (error) {
    console.error('❌ Contact form error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// ✅ CORS preflight support
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 })
}
