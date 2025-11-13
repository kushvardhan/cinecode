// Premium Clerk sign-up page with cinematic background
import { SignUp } from '@clerk/nextjs'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign Up - CineCode',
  description: 'Create your CineCode account',
}

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-accent-purple/20 rounded-full blur-[128px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-accent-cyan/20 rounded-full blur-[128px] animate-pulse delay-1000" />
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-md px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-3 bg-linear-to-r from-(--accent-purple) via-(--accent-cyan) to-(--accent-gold) bg-clip-text text-transparent">
            Join CineCode
          </h1>
          <p className="text-gray-400">Create an account to get started</p>
        </div>
        
        <div className="flex justify-center">
          <SignUp
            appearance={{
              elements: {
                rootBox: 'w-full',
                card: 'bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl',
                headerTitle: 'text-white',
                headerSubtitle: 'text-gray-400',
                socialButtonsBlockButton: 'bg-white/5 border-white/10 hover:bg-white/10 text-white',
                formButtonPrimary: 'bg-linear-to-r from-(--accent-purple) via-(--accent-cyan) to-(--accent-gold) hover:opacity-90',
                footerActionLink: 'text-accent-cyan hover:text-accent-gold',
                formFieldInput: 'bg-white/5 border-white/10 text-white',
                formFieldLabel: 'text-gray-300',
                identityPreviewText: 'text-white',
                identityPreviewEditButton: 'text-accent-cyan',
              },
            }}
            redirectUrl="/dashboard"
            signInUrl="/sign-in"
          />
        </div>
      </div>
    </div>
  )
}

