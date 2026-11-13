# SupportAI — Frontend

A context-aware AI customer support frontend application built with React, Tailwind CSS, Lucide Icons, and Recharts.

## 📁 Directory Structure
```
frontend/
├── src/
│   ├── assets/              # Icons & branding assets
│   ├── components/
│   │   ├── chat/            # Chat interface, Order cards, Context panel, Escalation modal
│   │   ├── dashboard/       # KPI cards, Recharts Line & Donut charts
│   │   ├── knowledge/       # Policy viewer, FAQs accordion, Topic lists
│   │   ├── ui/              # Modal, Badge, Loading skeleton components
│   │   └── Sidebar.jsx      # Navigation sidebar (#17213D)
│   ├── data/
│   │   └── mockData.js      # Customer (Aarav Sharma), Orders (₹ INR), Tickets, Policies
│   ├── pages/
│   │   ├── ChatPage.jsx     # AI conversational support with simulated typing & keywords
│   │   ├── DashboardPage.jsx# SupportAI Analytics Dashboard
│   │   ├── ProfilePage.jsx  # Customer Profile & notification preferences
│   │   ├── KnowledgePage.jsx# Knowledge & Policy Assistant
│   │   ├── TicketsPage.jsx  # Ticket management & resolution
│   │   ├── HistoryPage.jsx  # Past chat history
│   │   └── SettingsPage.jsx # Preferences & system configuration
│   ├── App.jsx              # App layout, shared state & screen router
│   ├── index.css            # Plus Jakarta Sans, scrollbars & Tailwind base
│   └── main.jsx             # React DOM root entry
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## 🚀 How to Run

1. Open PowerShell or Terminal and navigate to the `frontend` folder:
```bash
cd "c:\Users\Nishtha\Desktop\context_llm\frontend"
```

2. Start the development server:
```bash
npm run dev
```

3. Open the browser at [http://localhost:5173/](http://localhost:5173/).

## 🛠️ Available Scripts

- `npm run dev`: Starts the Vite development server with Hot Module Replacement (HMR).
- `npm run build`: Bundles the production application to the `dist/` directory.
- `npm run lint`: Runs Oxlint code quality verification.
- `npm run preview`: Previews the production build locally.
