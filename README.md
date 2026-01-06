# Nallamala House Website

Official website for Nallamala House, IIT Madras BS Degree Program. A comprehensive platform connecting house members with resources, events, council information, and community updates.

## 🌟 Features

- **Latest Updates** - Stay informed about course registrations, events, and house activities
- **Council & Team** - Meet the house representatives and leadership team
- **Communities** - Explore various clubs and student communities
- **Events** - Browse upcoming and past house events
- **Tools** - Access GPA calculators and academic planning tools
- **Resources** - Educational materials and previous year questions (PYQs)
- **Blogs** - Read articles and updates from house members
- **Queries** - Submit questions and get answers from the community

## 🚀 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **UI Components:** Radix UI
- **Package Manager:** pnpm
- **Deployment:** Vercel

## 📋 Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

## 🛠️ Setup

1. Clone the repository:
```bash
git clone https://github.com/PRODHOSH/nallamala-website.git
cd nallamala-house-website
```

2. Install dependencies:
```bash
pnpm install
```

3. Run development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
nallamala-house-website/
├── app/                    # Next.js app directory (routes & pages)
│   ├── blogs/             # Blog posts
│   ├── communities/       # Community pages
│   ├── council/           # Council members page
│   ├── events/            # Events listing
│   ├── gallery/           # Image gallery
│   ├── pyqs/              # Previous year questions
│   ├── queries/           # Q&A section
│   ├── resources/         # Educational resources
│   ├── tools/             # GPA calculators & tools
│   └── updates/           # Latest updates
├── components/            # Reusable React components
│   └── ui/               # UI components (buttons, badges, etc.)
├── lib/                   # Utility functions and helpers
│   └── gpa/              # GPA calculation utilities
├── public/                # Static assets
│   └── images/           # Image assets
└── styles/               # Global CSS files
```

## 🧪 Available Scripts

```bash
# Development
pnpm dev          # Start development server

# Build
pnpm build        # Build for production

# Start
pnpm start        # Start production server

# Lint
pnpm lint         # Run ESLint
```

## 🌐 Deployment

The website is deployed on Vercel with automatic deployments from the main branch.

**Live URL:** [nallamala-house.vercel.app](https://nallamala-house.vercel.app)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is maintained by Nallamala House, IIT Madras BS Degree Program.

## 📧 Contact

For queries or suggestions, reach out to the Nallamala House Council through the website.

---

**Made with ❤️ by Nallamala House**
