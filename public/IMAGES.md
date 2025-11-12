# Required Images

This document lists all the images referenced in the CineCode project. You'll need to add these images to make the site fully functional.

## Hero Images

- `/hero-poster.jpg` - Fallback poster image for the hero section (recommended: 1920x1080px)

## Project Images

- `/projects/ecommerce.jpg` - E-commerce platform project thumbnail (recommended: 1200x800px)
- `/projects/fitness.jpg` - Fitness app project thumbnail (recommended: 1200x800px)

## Team Images

- `/team/alex.jpg` - Alex Chen profile photo (recommended: 800x800px)
- `/team/sarah.jpg` - Sarah Johnson profile photo (recommended: 800x800px)
- `/team/marcus.jpg` - Marcus Williams profile photo (recommended: 800x800px)
- `/team/emily.jpg` - Emily Rodriguez profile photo (recommended: 800x800px)

## Branding

- `/logo.png` - CineCode logo (recommended: 512x512px, transparent background)
- `/og-image.jpg` - Open Graph image for social sharing (required: 1200x630px)

## Recommended Image Specifications

- **Format**: WebP for best performance, with JPG/PNG fallbacks
- **Optimization**: Use tools like TinyPNG, Squoosh, or ImageOptim
- **Naming**: Use lowercase, hyphen-separated names
- **Alt Text**: Always provide descriptive alt text for accessibility

## Using Next.js Image Component

All images in this project use the Next.js `<Image>` component for automatic optimization:

```tsx
import Image from 'next/image'

<Image
  src="/hero-poster.jpg"
  alt="Hero background"
  fill
  priority
  className="object-cover"
  sizes="100vw"
/>
```

## Placeholder Images

For development, you can use placeholder services:
- https://placehold.co/1920x1080
- https://picsum.photos/1920/1080
- https://unsplash.com (free high-quality images)

## AI Image Generation Tools (Free)

- **Leonardo.ai** - Free tier with daily credits
- **Playground AI** - Free image generation
- **Bing Image Creator** - Free with Microsoft account
- **Craiyon** - Completely free
- **Stable Diffusion** - Free, open-source (requires setup)

## Stock Photo Resources (Free)

- **Unsplash** - https://unsplash.com
- **Pexels** - https://pexels.com
- **Pixabay** - https://pixabay.com
- **Freepik** - https://freepik.com (attribution required)

