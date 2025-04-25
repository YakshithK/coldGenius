# ColdGenius

ColdGenius is an advanced web application that helps entrepreneurs, freelancers, and job seekers write high-quality, AI-generated cold emails in seconds. It utilizes Google's powerful Gemini language model to craft personalized outreach messages.

![ColdGenius Screenshot](public/screenshot.png)

## Features

- **AI-Powered Email Generation**: Generate personalized cold emails using Google's Gemini language model
- **Email History**: Save and access previously generated emails
- **Custom Tones**: Choose from multiple email tones to match your communication style
- **Responsive Design**: Beautiful UI that works on all devices
- **Real-time Suggestions**: Get personalized tips for effective cold emails specific to your industry
- **Copy to Clipboard**: Easy one-click copy functionality
- **Modern Animations**: Smooth transitions and loading states

## Tech Stack

- **Frontend**: Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **State Management**: Zustand for global state
- **Forms**: React Hook Form with Zod validation
- **AI Integration**: Google Gemini Pro via the official SDK
- **UI Components**: Custom components with Framer Motion for animations
- **Styling**: Tailwind CSS with a custom design system

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Google Gemini API key from [Google AI Studio](https://ai.google.dev/)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/coldgenius.git
cd coldgenius
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory and add your Gemini API key:
```
GEMINI_API_KEY=your_gemini_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Deployment

### Deploy to Vercel (Recommended)

1. **Push your code to a Git repository** (GitHub, GitLab, or BitBucket)

2. **Sign up for Vercel**:
   - Go to [vercel.com](https://vercel.com) and sign up or log in
   - Connect your Git provider (GitHub, GitLab, or BitBucket)

3. **Import your repository**:
   - Click "Import Project" or "New Project"
   - Select the repository containing your ColdGenius application

4. **Configure the project**:
   - Set your environment variables:
     - Add `GEMINI_API_KEY` with your actual API key
   - Choose your deployment settings (usually the defaults work well)
   - Click "Deploy"

### Deploy to Netlify

1. **Create a `netlify.toml` file** in the root of your project:
```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NEXT_USE_NETLIFY_EDGE = "true"
```

2. **Push your code to a Git repository**

3. **Log in to Netlify** and import your project:
   - Connect your Git provider and select your repository
   - Configure your build settings and environment variables
   - Click "Deploy"

### Deploy to a custom server

1. **Build your application**:
```bash
npm run build
```

2. **Set up environment variables on your server**

3. **Start the server**:
```bash
npm start
```

## Project Structure

```
coldgenius/
├── app/                      # Next.js App Router files
│   ├── api/                  # API routes
│   │   └── generate/        # Email generation endpoint
│   ├── globals.css          # Global CSS
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/               # React components
│   ├── EmailForm.tsx        # Email generation form
│   ├── EmailResult.tsx      # Results display
│   ├── HistorySidebar.tsx   # Email history sidebar
│   └── Navbar.tsx           # Navigation component
├── lib/                      # Utility functions and state
│   ├── gemini.ts            # Gemini API integration
│   ├── store.ts             # Zustand state store
│   └── validation.ts        # Zod schemas
└── public/                   # Static assets
```

## Environment Variables

- `GEMINI_API_KEY`: Your Google Gemini API key (required)
- `NODE_ENV`: Environment (development/production)
- `NEXT_PUBLIC_ANALYTICS_ID`: Optional analytics ID

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT

## Acknowledgments

- [Google Gemini](https://ai.google.dev/) for the powerful language model
- [Next.js](https://nextjs.org/) for the React framework
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Zustand](https://github.com/pmndrs/zustand) for state management
- [Framer Motion](https://www.framer.com/motion/) for animations 