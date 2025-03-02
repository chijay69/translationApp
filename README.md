# TranslApp - AI-Powered Translation Application

A modern web application that provides real-time translation services across 100+ languages using AI technology. Built with Next.js 14, Tailwind CSS, and Google's Gemini AI.

## Features

- 🌐 Support for 100+ languages
- 🎙️ Voice translation capabilities
- 🔒 Secure authentication system
- 👤 Admin dashboard
- 🎨 Modern and responsive UI
- ⚡ Real-time translation
- 🤖 AI-powered accuracy

## Tech Stack

- **Frontend**: Next.js 14, React, Tailwind CSS
- **Authentication**: NextAuth.js
- **AI/ML**: Google Gemini AI
- **State Management**: Server Actions
- **Configuration**: Vercel Edge Config
- **Deployment**: Vercel

## Prerequisites

Before you begin, ensure you have:

- Node.js 18.x or later
- npm or yarn
- A Vercel account
- A Google Cloud account (for Gemini AI API)

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Gemini AI
NEXT_PUBLIC_GEMINI_API_KEY=your-gemini-api-key

# Vercel Edge Config
EDGE_CONFIG=your-edge-config-url
```

## Edge Config Setup

1. Create a new Edge Config in your Vercel dashboard
2. Add the following items:

```json
{
  "admin": {
    "email": "admin@example.com",
    "password": "your-admin-password"
  },
  "users": []
}
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/translapp.git
cd translapp
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── actions/         # Server actions
│   ├── api/            # API routes
│   ├── auth/           # Authentication pages
│   ├── components/     # React components
│   ├── utils/          # Utility functions
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── public/             # Static assets
├── styles/            # Global styles
└── middleware.ts      # NextAuth middleware
```

## Authentication

The app supports two authentication methods:
1. Email/Password
2. Google OAuth

Admin access is managed through Vercel Edge Config.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

The app is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Import your repository in Vercel
3. Configure environment variables
4. Deploy

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@translapp.com or open an issue in the GitHub repository. 