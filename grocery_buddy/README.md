# Grocery Buddy 🛒

A comprehensive grocery management application built with Next.js, React, and Tailwind CSS.

## 🚀 Features Implemented (Week 1)

### ✅ Navigation & Layout

- **Responsive Header**: Clean header with logo and navigation links
- **Mobile-First Sidebar**: Collapsible sidebar with mobile hamburger menu
- **Breadcrumb Navigation**: Easy navigation between pages
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### ✅ Main Pages Structure

- **Dashboard**: Overview with stats, quick actions, and recent activity
- **Recipes**: Recipe management interface (placeholder for Sprint 2)
- **Meal Planner**: Weekly meal planning calendar (placeholder for Sprint 2)
- **Inventory**: Ingredient tracking with expiry alerts (placeholder for Sprint 3)
- **Grocery Lists**: Store-organized shopping lists (placeholder for Sprint 3)

### ✅ UI Components

- **Reusable Card Component**: Consistent card styling across the app
- **Button Component**: Multiple variants (primary, secondary, outline, ghost)
- **Loading Spinner**: Animated loading indicator
- **Custom Tailwind Configuration**: Extended color palette and animations

### ✅ Design System

- **Green Color Scheme**: Professional grocery-themed color palette
- **Lucide React Icons**: Consistent iconography throughout the app
- **Smooth Animations**: Hover effects and transitions
- **Custom Scrollbars**: Styled scrollbars for better UX

## 🛠️ Technology Stack

- **Frontend**: Next.js 15 with React 19
- **Styling**: Tailwind CSS 4.x
- **Icons**: Lucide React
- **TypeScript**: Full type safety
- **Fonts**: Geist Sans & Geist Mono

## 📱 Responsive Design

The application is fully responsive with breakpoints for:

- **Mobile**: < 768px (collapsible sidebar, stacked layouts)
- **Tablet**: 768px - 1024px (adjusted grid layouts)
- **Desktop**: > 1024px (full sidebar, multi-column layouts)

## 🎨 Design Features

- **Modern UI**: Clean, professional interface
- **Accessibility**: Focus states and keyboard navigation
- **Dark Mode Ready**: CSS variables prepared for dark theme
- **Smooth Transitions**: 200ms ease transitions throughout
- **Hover Effects**: Subtle animations on interactive elements

## 🚀 Getting Started

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Run Development Server**

   ```bash
   npm run dev
   ```

3. **Open in Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Dashboard (Home)
│   ├── recipes/           # Recipe management
│   ├── meal-planner/      # Meal planning
│   ├── inventory/         # Inventory tracking
│   └── grocery-lists/     # Shopping lists
├── components/            # Reusable UI components
│   ├── Layout.tsx         # Main layout wrapper
│   ├── Header.tsx         # Top navigation
│   ├── Sidebar.tsx        # Side navigation
│   ├── Card.tsx           # Card component
│   ├── Button.tsx         # Button component
│   ├── Breadcrumb.tsx     # Navigation breadcrumbs
│   └── LoadingSpinner.tsx # Loading indicator
└── globals.css            # Global styles and Tailwind
```

## 🎯 Next Steps (Sprint 2-4)

- **Sprint 2**: Recipe CRUD operations, meal planner calendar functionality
- **Sprint 3**: Inventory management, grocery list creation and management
- **Sprint 4**: Authentication, database integration, testing

## 🎨 Color Palette

- **Primary Green**: #16a34a (green-600)
- **Success**: #22c55e (green-500)
- **Warning**: #f59e0b (yellow-500)
- **Error**: #ef4444 (red-500)
- **Neutral**: #6b7280 (gray-500)

## 📱 Mobile Features

- Hamburger menu for navigation
- Touch-friendly button sizes
- Optimized grid layouts
- Swipe-friendly interactions

---

**Built with ❤️ for CSE 499 Team Project**
