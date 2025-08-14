# MetaJob Theme - Next.js UI Components

A comprehensive Next.js UI theme package for job board applications. This theme is the official UI component library used in the **MetaJob** full-stack job board solution.

## 🎨 Features

- **Modern Design** - Clean, professional job board interface
- **Responsive Layout** - Mobile-first design that works on all devices
- **TypeScript Support** - Fully typed components for better development experience
- **Customizable** - Easy to customize colors, fonts, and layouts
- **Optimized Performance** - Built with Next.js best practices
- **Accessibility Ready** - WCAG compliant components

## 📦 Installation

### For MetaJob Full-Stack Solution

If you're using the complete MetaJob solution, the theme is already integrated. Simply run:

```bash
pnpm install
```

### Standalone Installation

To use this theme in your own Next.js project:

```bash
npm install metajob-theme
# or
yarn add metajob-theme
# or
pnpm add metajob-theme
```

## 🚀 Quick Start

### 1. Import Theme Styles

Add the theme CSS to your `_app.js` or `layout.tsx`:

```jsx
import 'metajob-theme/styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
```

### 2. Use Theme Components

```jsx
import { JobCard, SearchBar, Header } from 'metajob-theme'

function HomePage() {
  return (
    <div>
      <Header />
      <SearchBar onSearch={(query) => console.log(query)} />
      <JobCard 
        title="Frontend Developer"
        company="Tech Company"
        location="Remote"
        salary="$70k - $90k"
      />
    </div>
  )
}
```

## 🧩 Components

### Core Components
- `Header` - Navigation header with logo and menu
- `Footer` - Site footer with links and information
- `JobCard` - Individual job listing display
- `SearchBar` - Job search functionality
- `FilterPanel` - Job filtering sidebar
- `Pagination` - Page navigation component

### Form Components
- `LoginForm` - User authentication form
- `RegisterForm` - User registration form
- `JobApplicationForm` - Job application submission
- `ContactForm` - Contact/inquiry form

### Layout Components
- `Container` - Responsive container wrapper
- `Grid` - Flexible grid system
- `Sidebar` - Collapsible sidebar layout
- `Modal` - Overlay modal component

## 🎨 Customization

### Theme Configuration

Create a `theme.config.js` file in your project root:

```javascript
module.exports = {
  colors: {
    primary: '#3B82F6',
    secondary: '#10B981',
    accent: '#F59E0B',
    background: '#FFFFFF',
    text: '#1F2937'
  },
  fonts: {
    primary: 'Inter, sans-serif',
    heading: 'Poppins, sans-serif'
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px'
  }
}
```

### CSS Custom Properties

Override theme variables in your CSS:

```css
:root {
  --metajob-primary: #your-color;
  --metajob-secondary: #your-color;
  --metajob-font-family: 'Your Font', sans-serif;
}
```

## 📖 Integration with MetaJob

This theme is designed to work seamlessly with the MetaJob full-stack solution:

1. **Backend Integration** - Works with Strapi CMS backend
2. **API Ready** - Components designed for REST/GraphQL APIs
3. **Authentication** - Built-in auth components
4. **Job Management** - Complete job CRUD operations
5. **User Profiles** - Employer and candidate interfaces

## 🛠️ Development

### Prerequisites

- Node.js (v18 or higher)
- Next.js 13+
- React 18+

### Local Development

```bash
# Clone the MetaJob repository
git clone https://github.com/your-username/metajob-pro.git
cd metajob-pro/packages/metajob-theme

# Install dependencies
pnpm install

# Start development
pnpm dev
```

## 📁 Project Structure

```
metajob-theme/
├── components/          # React components
│   ├── common/         # Shared components
│   ├── forms/          # Form components
│   ├── layout/         # Layout components
│   └── ui/             # UI primitives
├── styles/             # CSS and styling
│   ├── globals.css     # Global styles
│   ├── components/     # Component styles
│   └── themes/         # Theme variations
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── types/              # TypeScript definitions
└── index.ts            # Main export file
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

- ✅ **FREE for Personal Use** - Learning, development, personal projects
- 💼 **Commercial License Required** - Business use, client projects, revenue-generating apps

**Get Commercial License:** [MetaJob Commercial License](https://jstemplate.net/item/job-board-app-with-nextjs-strapi)

## 🔗 Related Packages

- **MetaJob Core** - Complete full-stack job board solution
- **MetaJob Backend** - Strapi CMS backend for job management

## 📞 Support

- **Documentation:** [MetaJob Docs](https://docs.jstemplate.net/metajob/)
- **Issues:** [GitHub Issues](https://github.com/your-username/metajob-pro/issues)
- **Email:** [info@jstemplate.net](mailto:info@jstemplate.net)

## 🌟 Show Your Support

If this theme helps you build amazing job board applications, please ⭐ star this repo!

---

**Built with ❤️ for the developer community**
