# Ruby Website

A multi-language healthcare platform built with Next.js and next-intl.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Internationalization**: next-intl
- **Languages**: English (en), German (de), Polish (pl)
- **Styling**: CSS Modules
- **Package Manager**: npm
- **Deployment**: Netlify

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

## Project Structure

```
/app
  /[locale]           # Localized routes
    /about           # About page
    /privacy         # Privacy policy page
    page.tsx         # Home page
    layout.tsx       # Root layout with header
  globals.css        # Global styles

/components
  /Button            # Button component
  /Header            # Header with navigation and language switcher

/i18n
  request.ts         # next-intl request config
  routing.ts         # Routing configuration

/messages
  en.json            # English translations
  de.json            # German translations
  pl.json            # Polish translations
```

## Features

- ✅ Three pages: Home, About, Privacy Policy
- ✅ Multi-language support (EN, DE, PL)
- ✅ Responsive design
- ✅ Accessible components
- ✅ CSS Modules for component styling
- ✅ Header with language switcher
- ✅ Keyboard navigation support
- ✅ Reduced motion support

## Adding New Pages

1. Create a new folder in `app/[locale]/your-page`
2. Add `page.tsx` and `page.module.css` files
3. Add translations to all language files in `/messages`
4. Add navigation link to Header component if needed

## Deployment

This site is configured for deployment on [Netlify](https://www.netlify.com).
