# Mileage - Car Rental Platform

A full-stack car rental website built for a local business in Al Ain, UAE. Features bilingual support (English/Arabic with RTL), admin dashboard for inventory management, and modern responsive design.

**Live:** [mileage.vercel.app](https://mileage.vercel.app)

## What I Built

This is a real production app I developed for a car rental company. The main challenge was building a system that works seamlessly in both English and Arabic (including right-to-left layout), while keeping the admin side simple enough for non-technical users.

### Tech Stack

**Frontend**
- Next.js 15 (App Router) with TypeScript
- Tailwind CSS + shadcn/ui components
- next-intl for internationalization
- Framer Motion for animations

**Backend**
- PostgreSQL (hosted on Supabase)
- Prisma ORM

**Deployment**
- Vercel (with automatic deployments)
- GitHub for version control

## Main Features

**Public Site**
- Fully bilingual (English/Arabic) with automatic RTL layout switching
- Responsive car catalog with filtering
- Direct WhatsApp/phone contact integration
- Dynamic pricing with special offers/discounts

**Admin Panel**
- Secure login with session management
- Add/edit/delete vehicles from inventory
- Image upload with drag-and-drop
- Mobile-friendly dashboard
- Only accessible at `/en/admin` (no Arabic version needed)

## Project Structure

```
src/
├── app/
│   ├── [locale]/          # All routes support en/ar
│   │   ├── admin/        # Protected admin routes
│   │   └── page.tsx      # Homepage
│   └── api/auth/         # NextAuth endpoints
├── components/
│   ├── ui/               # Reusable UI components
│   └── ...               # Feature-specific components
├── lib/
│   ├── prisma.ts        # Database client
│   └── auth.ts          # Auth config
└── middleware.ts        # Handles i18n + auth protection
```

## Key Implementation Details

### Internationalization
Used `next-intl` to handle translations and routing. The middleware automatically prefixes all routes with the locale (`/en/*` or `/ar/*`) and switches the layout direction based on language.

### Authentication
NextAuth.js v5 with credentials provider. Passwords are hashed with bcrypt, and sessions use JWT tokens. The middleware protects admin routes and redirects unauthorized users.

### Database
Prisma makes it easy to work with PostgreSQL. Main models are `Car` (inventory) and `Admin` (users). Used Supabase for hosting because it has good free tier and built-in image storage.

### Image Management
UploadThing handles uploads because dealing with S3 directly was too complex. Images are optimized automatically using Next.js Image component.

## Running Locally

1. Clone the repo
```bash
git clone https://github.com/anjum613/mileage.git
cd mileage
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables (create `.env` file)
```env
DATABASE_URL="your-postgres-url"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-a-random-secret"
UPLOADTHING_TOKEN="your-uploadthing-token"
NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-key"
```

4. Set up database
```bash
npx prisma migrate dev
npx prisma db seed  # Optional: adds sample cars
```

5. Run dev server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

To access admin panel, go to `/en/admin`

## Database Schema

```prisma
model Car {
  id            String   @id @default(cuid())
  name          String
  model         String
  dailyPrice    Int
  discountPrice Int?
  offerTag      String?  // "New Arrival", "Best Deal", etc.
  img           String   // UploadThing URL
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

model Admin {
  id       String @id @default(cuid())
  email    String @unique
  password String  // bcrypt hashed
}
```

## Challenges I Solved

1. **RTL Layout** - Getting Tailwind to work properly with Arabic was tricky. Had to set `dir` attribute dynamically on the `<html>` tag based on locale.

2. **Admin Routes with i18n** - Initially had the admin panel outside the `[locale]` folder, which caused 404s. Had to restructure to `[locale]/admin` and update middleware accordingly.

3. **Session Management** - NextAuth's session needed to work with both the public site and admin panel. Used middleware to protect routes while allowing unauthenticated access to the main site.

4. **Image Loading** - Static images in `/public` weren't loading because middleware was intercepting them. Fixed by updating the matcher regex to exclude image extensions.

## Deployment

The app is deployed on Vercel. Just push to `main` branch and it auto-deploys. Environment variables are configured in the Vercel dashboard.

## What I Learned

- How to implement proper i18n with RTL support in Next.js
- Working with Prisma migrations and seeding
- NextAuth configuration and middleware patterns
- Handling file uploads in a serverless environment
- Building responsive admin interfaces

---

**Author:** Anjum  
**GitHub:** [@anjum613](https://github.com/anjum613)
