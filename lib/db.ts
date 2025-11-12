import mongoose, { Mongoose } from 'mongoose'

type MongooseCache = {
  conn: Mongoose | null
  promise: Promise<Mongoose> | null
}

declare global {
  // Allow global caching without type conflicts
   
  var _mongoose: MongooseCache | undefined
}

const cached: MongooseCache = global._mongoose ?? { conn: null, promise: null }
global._mongoose = cached

export async function connectDB(): Promise<Mongoose> {
  // If already connected, return existing connection
  if (cached.conn) return cached.conn

  if (!cached.promise) {
    const MONGODB_URI = process.env.MONGODB_URI
    if (!MONGODB_URI) {
      throw new Error('⚠️ Please define the MONGODB_URI in .env.local')
    }

    const opts = { bufferCommands: false }

    cached.promise = mongoose.connect(MONGODB_URI, opts)
  }

  try {
    cached.conn = await cached.promise
  } catch (err) {
    cached.promise = null
    throw err
  }

  return cached.conn
}
