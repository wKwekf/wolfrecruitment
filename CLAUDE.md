# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 14 website for Wolf, a German AI recruiting company. The site uses TypeScript, Tailwind CSS, and the App Router pattern.

## Commands

```bash
# Development
npm run dev        # Start development server on http://localhost:3000

# Build & Production
npm run build      # Build for production
npm run start      # Start production server

# Code Quality
npm run lint       # Run ESLint with TypeScript support
```

## Architecture

### Tech Stack
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS with custom animations
- **UI Libraries**: Radix UI, Framer Motion, GSAP, Locomotive Scroll
- **Analytics**: Vercel Analytics and Speed Insights
- **Forms**: HubSpot integration for lead capture

### Project Structure
- `/app` - Next.js App Router pages and components
  - `/(legal)` - Legal pages (AGB, Datenschutz, Impressum)
  - `/(sides)/(resources)` - Resource landing pages for lead generation
  - `/api` - API routes for HubSpot and video URLs
  - `/components` - Shared components organized by type
- `/public` - Static assets including fonts, logos, and videos
- `/components` - Additional shadcn/ui components

### Key Integrations

#### HubSpot Forms
Resource pages use HubSpot for lead capture. Forms submit to `/api/hubspot-submit` which handles the integration. Each resource page has its own HubSpot form ID configured in the component.

#### A/B Testing
The site supports Vercel-based A/B testing for resource pages. Different variants can be created by duplicating pages and using Vercel's edge middleware for traffic splitting.

### Important Patterns

1. **Resource Landing Pages**: Follow the template in `/app/(sides)/(resources)/kandidatenprofile/page.tsx`. Each resource page includes:
   - Hero section with lead form
   - Value proposition sections
   - Success page redirect after form submission

2. **Component Organization**:
   - Forms: `/app/components/forms/`
   - Layout: `/app/components/layout/`
   - Sections: `/app/components/sections/`
   - UI: Both `/app/components/ui/` and `/components/ui/` (shadcn/ui)

3. **Styling**: Uses Tailwind CSS with custom utilities defined in `globals.css`. The Figtree font is configured as the primary font family.

## Typography Guidelines

The project follows specific typography rules (from README.md):
- Headlines and subtitles do not end with periods
- Full sentences in body text end with periods
- Navigation and button labels have no punctuation
- Lists follow consistent punctuation patterns

## Environment Variables

The project requires environment variables for HubSpot integration (not included in repo). These should be configured in production deployment.