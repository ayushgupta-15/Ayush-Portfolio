# Ayush Gupta Portfolio

A Macintosh-inspired developer portfolio built with Next.js, React, Tailwind CSS, and Framer Motion.

The site presents projects, experience, skills, resume links, and contact information through a desktop-style interface on larger screens and a mobile/tablet app-style interface on compact screens.

## Live Site

[Portfolio](https://portfolio-nine-sigma-74.vercel.app/)

## Highlights

- Desktop experience inspired by classic macOS window management
- Mobile and tablet experience redesigned as an iPhone/iPad-style portfolio UI
- Recruiter-focused sections for projects, work, skills, resume, and contact
- PWA support with offline page and installable metadata
- Built with modern Next.js App Router architecture

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- Zustand
- Nodemailer

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Project Structure

```text
src/app/
  components/        UI, windows, desktop shell, mobile shell
  api/               contact/mail API route
  offline/           offline fallback page
Constants/           app data, metadata, skills, projects
public/              icons, images, audio, resume files, favicons
store/               Zustand store and local storage hook
util/                utility helpers and services
```

## Notes

- Desktop and compact layouts are intentionally different to fit their input model and screen size.
- The site uses local assets for app icons, technology icons, wallpapers, and resume files.
- Production build currently skips ESLint during `next build`; lint can still be run separately with `npm run lint`.

## Contact

- Email: `ayushgupta.professional@gmail.com`
- LinkedIn: [ayush-gupta-](https://www.linkedin.com/in/ayush-gupta-/)
- GitHub: [ayushgupta-15](https://github.com/ayushgupta-15)
