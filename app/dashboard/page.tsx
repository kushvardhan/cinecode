// Protected dashboard stub with auth check
import { isAuthenticated } from '@/lib/auth'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'CineCode dashboard - manage your projects and services',
}
export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default async function DashboardPage() {
  const authenticated = await isAuthenticated()

  if (!authenticated) {
    redirect('/sign-in')
  }

  return (
    <main className="bg-black text-white min-h-screen">
      <div className="py-32 px-4 md:px-8 max-w-7xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-linear-to-r from-(--accent-gold) to-(--accent-cyan) bg-clip-text text-transparent">
          Dashboard
        </h1>
        <p className="text-xl text-gray-300 mb-12">
          Welcome to your CineCode dashboard. Manage your projects, services, and more.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 bg-white/5 rounded-2xl border border-white/10">
            <h2 className="text-2xl font-bold mb-2">Projects</h2>
            <p className="text-4xl font-bold text-(--accent-cyan)">12</p>
            <p className="text-sm text-gray-400 mt-2">Active projects</p>
          </div>

          <div className="p-8 bg-white/5 rounded-2xl border border-white/10">
            <h2 className="text-2xl font-bold mb-2">Services</h2>
            <p className="text-4xl font-bold text-(--accent-gold)">6</p>
            <p className="text-sm text-gray-400 mt-2">Available services</p>
          </div>

          <div className="p-8 bg-white/5 rounded-2xl border border-white/10">
            <h2 className="text-2xl font-bold mb-2">Team</h2>
            <p className="text-4xl font-bold text-(--accent-purple)">4</p>
            <p className="text-sm text-gray-400 mt-2">Team members</p>
          </div>
        </div>

        <div className="mt-12 p-8 bg-white/5 rounded-2xl border border-white/10">
          <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
          <p className="text-gray-400">No recent activity to display.</p>
        </div>
      </div>
    </main>
  )
}
