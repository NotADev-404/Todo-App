# Dark-Neo To-Do App

A minimalistic, modern to-do list application with a dark-neo aesthetic, built with React, TypeScript, and Tailwind CSS.

## 🎨 Features

- ✅ **Add/Edit/Delete Tasks** — Double-click tasks to edit, delete with one click
- 🎯 **Categories & Priorities** — Organize tasks by category (Work, Personal, Shopping, Health) with priority levels
- 📅 **Due Dates** — Set due dates with automatic overdue detection
- 🔍 **Search & Filter** — Filter by status (All/Active/Completed) or search by task text
- 📊 **Statistics Dashboard** — Real-time stats showing total, completed, active tasks, priority breakdown, and overdue alerts
- 🔄 **Drag-and-Drop Reordering** — Reorder tasks by dragging (respects active filters)
- 💾 **Auto-Save to localStorage** — All tasks persist across browser sessions
- 📱 **Responsive Design** — Works on desktop, tablet, and mobile devices
- 🌙 **Dark-Neo Aesthetics** — Dark background (#0f0f0f) with cyan neon accents (#00D9FF)

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd AUIG

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:5173/`

### Build

```bash
npm run build
```

The optimized production build will be in the `dist/` folder.

## 📋 How to Use

### Adding Tasks
1. Type your task in the input field
2. (Optional) Select a category from the dropdown
3. (Optional) Choose a priority level (Low/Medium/High)
4. (Optional) Pick a due date
5. Press **Enter** or click "Add Task"

### Editing Tasks
- **Double-click** any task to edit
- Press **Enter** to save or **Escape** to cancel
- Changes are saved to localStorage automatically

### Reordering Tasks
- **Drag tasks** up and down to reorder them
- Reordering respects active filters (All/Active/Completed)
- Order persists across page refreshes

### Filtering & Searching
- Click the filter tabs: **All**, **Active**, **Completed**
- Use the search box to find tasks by name
- Combine filtering and search for precise results

### Viewing Statistics
- The dashboard shows real-time stats:
  - Total tasks
  - Active and completed count
  - Progress percentage
  - Task distribution by priority
  - Task distribution by category
  - Overdue task warnings

## 🛠️ Tech Stack

- **Frontend Framework:** React 18.2.0
- **Language:** TypeScript 5.2.2
- **State Management:** Zustand 4.4.0
- **Styling:** Tailwind CSS 3.3.6
- **Build Tool:** Vite 5.0.8
- **Package Manager:** npm

## 📦 Project Structure

```
src/
├── components/
│   ├── TodoApp.tsx              # Main container
│   ├── TodoInput.tsx            # Add task form
│   ├── TodoList.tsx             # Task list with drag-drop
│   ├── TodoItem.tsx             # Individual task (editable)
│   ├── FilterBar.tsx            # Filter & search controls
│   ├── CategoryBadge.tsx        # Category display
│   └── StatsDashboard.tsx       # Statistics panel
├── store/
│   └── todoStore.ts             # Zustand store & actions
├── types/
│   └── todo.ts                  # TypeScript interfaces
├── App.tsx                      # Root component
├── main.tsx                     # Entry point
└── index.css                    # Global styles
```

## 🌐 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign up
3. Click "New Project" and import your GitHub repo
4. Vercel auto-detects Vite and deploys (no config needed)
5. Your app is live!

**Environment:** Uses `vercel.json` for configuration

### Deploy to Netlify

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com) and sign up
3. Click "New site from Git" and connect GitHub
4. Select your repository
5. Netlify auto-detects the build and deploy settings
6. Click "Deploy site" and wait for completion

**Environment:** Uses `netlify.toml` for configuration

### Deploy to GitHub Pages

```bash
# Update vite.config.ts with base path:
# export default defineConfig({
#   base: '/repo-name/',
#   ...
# })

npm run build
# Push dist/ folder to gh-pages branch
```

## 🎨 Dark-Neo Color Palette

- **Background:** `#0f0f0f` (deep black)
- **Cards:** `#1a1a1a` (dark gray)
- **Borders:** `#3a3a3a` (subtle gray)
- **Primary Accent:** `#00D9FF` (bright cyan)
- **Secondary Accent:** `#FF006E` (magenta)
- **Lime:** `#39FF14` (neon green)
- **Purple:** `#B026FF` (neon purple)
- **Text:** `#e0e0e0` (off-white)
- **Muted Text:** `#666666` (gray)

## 🔧 Configuration

### Tailwind CSS
Customize colors and animations in `tailwind.config.js`:
- Dark-neo color palette extended
- Neon glow shadow utilities
- Fade-in and pulse animations

### PostCSS
Auto-prefixer and Tailwind CSS processing in `postcss.config.js`

## 📊 Performance

- **Bundle Size:** ~153KB JS + 12KB CSS (gzipped)
- **Optimization:** React memoization for TodoItem, useCallback for handlers
- **localStorage:** Efficient for up to 100+ tasks
- **Rendering:** No unnecessary re-renders with Zustand selectors

## 🐛 Known Limitations

- localStorage is per-browser/device (no cloud sync)
- Drag-and-drop respects current filters
- Max ~5-10MB storage per domain (browser limitation)

## 🚀 Future Enhancements

- [ ] Cloud sync & authentication
- [ ] Dark/light theme toggle
- [ ] Task attachments & notes
- [ ] Recurring tasks
- [ ] Push notifications
- [ ] Keyboard shortcuts guide
- [ ] Export/import tasks
- [ ] Analytics dashboard

## 📝 License

MIT License — Feel free to use and modify!

## 🤝 Contributing

Contributions welcome! Feel free to fork, make changes, and submit a pull request.

---

### 🔗 Quick Links

- **GitHub:** https://github.com/NotADev-404/Todo-App
- **Live Demo:** https://todo-app-eight-cyan-40.vercel.app/
- **Issues:** Report bugs in GitHub Issues

---

**Built with ❤️ using React + TypeScript + Tailwind CSS**
