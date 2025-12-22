# Anime Blog Frontend - UI/UX Guide

## Overview
A modern, animated React frontend for the Anime Blog platform with beautiful gradients, smooth animations, and responsive design.

## Tech Stack
- **React 19** - UI library
- **Vite** - Build tool
- **Tailwind CSS 4** - Utility-first styling
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **Axios** - HTTP client
- **React Router** - Navigation

## Design System

### Color Palette
```css
Primary Gradients:
- Purple to Pink: from-purple-600 to-pink-600
- Blue to Purple to Pink: from-blue-600 via-purple-500 to-pink-500
- Purple to Red: from-purple-900 via-pink-800 to-red-900

Accent Colors:
- Success: green-500, green-600
- Error: red-500, red-600
- Warning: yellow-400, orange-500
- Info: blue-500, purple-500
```

### Animation Patterns

#### Page Entrance
```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
```

#### Hover Effects
```jsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
```

#### Stagger Children
```jsx
{items.map((item, i) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: i * 0.1 }}
  />
))}
```

## Component Architecture

### Pages

#### 1. LandingPage
**Path:** `/`
**Features:**
- Animated hero section with floating particles
- Auto-redirect to /home after 5 seconds
- Feature cards with icons
- Skip intro button
- Pulsing loading indicators

**Animations:**
- Rotating logo with spring animation
- Text shadow pulse effect
- Floating background particles
- Staggered feature card entrance

#### 2. SignIn
**Path:** `/signin`
**Features:**
- Gradient background with animated shapes
- Icon-based input fields
- Loading spinner on submit
- Back button to landing page
- Link to sign up page

**Styling:**
- Glass morphism card (backdrop-blur)
- Gradient text for title
- Animated form field entrance
- Hover/tap animations on buttons

#### 3. SignUp
**Path:** `/signup`
**Features:**
- Real-time password validation
- Visual feedback with checkmarks
- Password strength indicator
- Confirm password matching
- Animated error messages

**Unique Features:**
- Green checkmarks appear when validation passes
- Red/green text for password match status
- Smooth height transitions for feedback text

#### 4. Home (Dashboard)
**Path:** `/home` (Protected)
**Components:**
- Navbar
- PostList

**Features:**
- Search and filter posts
- Pagination
- Tag-based filtering
- Author filtering

#### 5. CreatePost
**Path:** `/create-post` (Protected)
**Features:**
- AI-powered tag suggestions (Sparkles icon)
- Rich textarea for content
- Media URL support
- Cancel button

**Styling:**
- Large text areas with proper focus states
- Gradient buttons
- Loading states with spinners

#### 6. PostDetail
**Path:** `/posts/:id`
**Features:**
- Full post view
- Like/unlike functionality
- Comment system
- Delete post (owner only)
- Delete comment (owner only)

**Interactive Elements:**
- Animated like button with heart fill
- Comment form
- Delete confirmations

#### 7. UserProfile
**Path:** `/profile/:id`
**Features:**
- User information display
- Editable profile (own profile only)
- List of user's posts
- Post count

## Shared Components

### Navbar
**Features:**
- Sticky top positioning
- Glass morphism effect
- Animated logo rotation
- Mobile responsive menu
- Slide-in mobile drawer

**Animation Highlights:**
- Slides down from top on page load
- Menu items scale on hover
- Mobile menu slides from left
- Animated hamburger ↔ X transition

### Authentication Flow
```
Landing → SignIn/SignUp → Home
         ↓
    Protected Routes
```

## Styling Best Practices

### Gradient Backgrounds
```jsx
// Full page gradient
className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500"

// Navbar gradient
className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-500"
```

### Glass Morphism
```jsx
className="bg-white/95 backdrop-blur-xl"
className="bg-white/10 backdrop-blur-md"
```

### Shadow & Elevation
```jsx
// Soft shadow
className="shadow-md"

// Heavy shadow
className="shadow-2xl"

// Glow effect
className="shadow-lg drop-shadow-lg"
```

### Responsive Design
```jsx
// Mobile first approach
className="text-xl md:text-2xl lg:text-4xl"
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
className="hidden md:flex"  // Desktop only
className="md:hidden"        // Mobile only
```

## Animation Guidelines

### Performance
- Use `transform` and `opacity` for best performance
- Avoid animating `width`, `height`, `left`, `top`
- Use `will-change` sparingly

### Timing
- Quick interactions: 0.15-0.3s
- Page transitions: 0.5-0.8s
- Loading states: 1-2s loops
- Stagger delays: 0.1-0.2s per item

### Easing
```jsx
transition={{
  duration: 0.5,
  ease: "easeInOut"  // or "linear", "easeIn", "easeOut"
}}
```

## Form Patterns

### Input Field with Icon
```jsx
<div className="relative">
  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
  <input
    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500"
    placeholder="Enter username"
  />
</div>
```

### Loading Button
```jsx
<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  disabled={loading}
  className="... disabled:opacity-50 disabled:cursor-not-allowed"
>
  {loading ? (
    <span className="flex items-center justify-center gap-2">
      <motion.span
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
      />
      Loading...
    </span>
  ) : (
    'Submit'
  )}
</motion.button>
```

## Icons Usage

### Common Icons
- `BookOpen` - Logo/branding
- `User` - User profile
- `Mail` - Email input
- `Lock` - Password input
- `Heart` - Likes
- `MessageCircle` - Comments
- `Tag` - Tags
- `Search` - Search
- `PlusCircle` - Create
- `LogOut` - Logout
- `Menu` - Mobile menu
- `X` - Close
- `Sparkles` - AI features

## State Management

### Local State (useState)
- Form inputs
- UI toggles (modals, dropdowns)
- Loading states

### Context (AuthContext)
- User authentication state
- Token management
- Login/logout functions

### URL State (React Router)
- Page navigation
- Route parameters (post ID, user ID)
- Query parameters (search, filters)

## API Integration

### Axios Configuration
```javascript
// Base URL configuration in api.js
const API_URL = "http://127.0.0.1:5000";

// Request interceptor adds JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### API Endpoints Used
```javascript
// Authentication
authAPI.login(credentials)
authAPI.signup(userData)

// Posts
postsAPI.getAll(params)  // ?page=1&limit=10&q=search&tag=anime
postsAPI.create(postData)
postsAPI.getOne(id)
postsAPI.delete(id)
postsAPI.like(id)
postsAPI.suggestTags(content)

// Comments
api.post(`/api/posts/${id}/comments`, { content })
api.get(`/api/posts/${id}/comments`)
api.delete(`/api/comments/${id}`)

// Users
api.get(`/api/users/${id}`)
api.put(`/api/users/${id}`, userData)
api.get(`/api/users/${id}/posts`)
```

## Running the Application

### Development
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive (iOS Safari, Chrome Mobile)
- Requires JavaScript enabled
- CSS Grid and Flexbox support required

## Accessibility Features
- Semantic HTML elements
- Keyboard navigation support
- Focus visible states
- ARIA labels where needed
- Color contrast compliance

## Future Enhancements
- Dark mode toggle
- Skeleton loading states
- Infinite scroll for posts
- Image upload with preview
- Rich text editor for posts
- Real-time notifications
- Post reactions beyond likes
- Share functionality
- Bookmarks/favorites

---

**Last Updated:** December 2025
**Version:** 1.0.0
