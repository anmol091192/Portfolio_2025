# Anmol Khandekar Portfolio 🚀

A modern, space-themed portfolio website showcasing Full Stack Development & AI expertise. Built with React and Tailwind CSS, featuring beautiful JWST imagery, parallax scrolling, and professional certifications.

## 🌐 Live Portfolio

**🚀 [anmolkhandekar.netlify.app](https://anmolkhandekar.netlify.app/)**

Experience the full portfolio with interactive parallax effects, space-themed animations, mobile-optimized touch interactions, and comprehensive project showcase.

## ✨ Features

### 🎨 **Visual & Design**
- **Space-themed Design**: Stunning JWST (James Webb Space Telescope) background images
- **Parallax Scrolling**: Immersive depth effects with background and content moving at different speeds
- **Glass-morphism UI**: Modern translucent design elements with backdrop blur
- **Responsive Design**: Optimized for all screen sizes (mobile, tablet, desktop)
- **Custom Animations**: Smooth fade-in transitions and hover effects

### 🧭 **Navigation & UX**
- **Collapsible Navigation**: Toggle-able left sidebar navigation with smooth animations
- **Rocket Navigation**: Unique bottom-right rocket for section scrolling
- **ScrollSpy**: Active section highlighting with smooth transitions
- **Mobile-First**: Touch-friendly interface with swipe gestures and responsive breakpoints
- **Touch Optimization**: Carousel swipe support and enhanced mobile interactions

### 📊 **Professional Content**
- **Real Experience Data**: Authentic work history from AWS, Linqia, and Egen Solutions
- **AI Certifications**: Purdue University Applied Generative AI Specialization showcase
- **Interactive Projects**: Portfolio with live demos and GitHub links
- **Resume Download**: Professional PDF resume with one-click download

### 💬 **Contact & Communication**
- **EmailJS Integration**: Functional contact form with Gmail integration
- **Social Links**: Direct links to LinkedIn and GitHub
- **Fallback Systems**: Mailto backup for contact form reliability

## 🛠️ Tech Stack

### **Frontend**
- **React 19**: Latest React with hooks and modern patterns
- **Tailwind CSS 3.4.17**: Utility-first CSS framework with custom space theme
- **EmailJS**: Client-side email service integration
- **JavaScript ES6+**: Modern JavaScript features and syntax

### **Development & Build**
- **Create React App**: Zero-config React build setup
- **PostCSS & Autoprefixer**: CSS processing and vendor prefixes
- **ESLint**: Code quality and consistency
- **React Scripts**: Development and build tooling

### **Assets & Media**
- **NASA JWST Images**: Official high-resolution space imagery (locally optimized)
- **Custom Rocket Favicon**: Space-themed black rocket icon for browser tabs
- **Image Preloading**: Optimized loading system for background images
- **Icons8**: Professional icon library
- **PDF.js Support**: Resume and certificate viewing
- **Responsive Images**: Optimized loading and performance

## 📁 Project Structure

```
src/
├── components/
│   ├── ScrollSpyNav/          # Collapsible left sidebar navigation
│   ├── ExperienceCard/        # Professional experience components
│   ├── ProjectCard/           # Portfolio project showcase
│   ├── CertificationCard/     # Interactive certificate display
│   └── ImageInfoOverlay/      # JWST image information overlay
├── sections/
│   ├── Home/                  # Landing section with parallax
│   ├── About/                 # Professional background
│   ├── Experience/            # Work history with real data
│   ├── Projects/              # Portfolio showcase
│   ├── Certificates/          # AI certifications carousel
│   └── Contact/               # EmailJS contact form + resume download
├── data/
│   ├── portfolioContent.json  # Centralized content management
│   └── usePortfolioData.js    # Custom data hooks
└── config/
    └── emailjs.js             # Email service configuration

public/
├── assets/
│   ├── certificates/         # PDF certificates collection
│   ├── resume/               # Professional resume PDF
│   └── images/               # JWST background imagery (locally stored)
├── rocket favicon files     # Custom black rocket icons (multiple sizes)
├── sitemap.xml               # SEO sitemap
└── manifest.json             # PWA configuration with rocket icons
```

## 🚀 Getting Started

### **Prerequisites**
- Node.js 16+ and npm
- Git for version control

### **Installation**

1. **Clone the repository**
```bash
git clone https://github.com/anmol091192/Portfolio_2025.git
cd Portfolio_2025/bottom-up-portfolio
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables** (optional for contact form)
```bash
cp .env.example .env
# Edit .env with your EmailJS credentials
```

4. **Start development server**
```bash
npm start
```
Open [http://localhost:3000](http://localhost:3000) to view in browser.

### **Available Scripts**

#### `npm start`
Runs the app in development mode with hot reloading and lint error display.

#### `npm run build`
Creates optimized production build in the `build` folder.
- JavaScript bundle: ~75KB (gzipped)
- CSS bundle: ~6KB (gzipped)
- Performance optimized for fast loading

#### `npm test`
Launches the test runner in interactive watch mode.

#### `npx serve -s build`
Serves the production build locally for testing.

## 🎨 Design & Features

### **Visual Design**
- **Custom Color Palette**: Space-blue (#1e3a8a) and cosmic-purple (#7c3aed) gradients
- **Parallax Effects**: Multi-layer scrolling with fixed backgrounds and moving content
- **Glass-morphism**: Translucent cards with backdrop blur and border effects
- **Responsive Grid**: Adaptive layouts with mobile-first approach
- **Custom Animations**: Staggered fade-ins, scale effects, and smooth transitions

### **Background Imagery**
High-quality JWST imagery featuring:
- **Pillars of Creation** (Home section)
- **Herbig-Haro 211** (Experience section)  
- **NGC 4254 Galaxy** (Contact section)
- **Stellar nurseries** and cosmic phenomena

### **Interactive Elements**
- **Hover Effects**: Scale animations and color transitions
- **Expandable Cards**: Experience and project detail expansion
- **Carousel Navigation**: Certificate showcase with indicators
- **Form Validation**: Real-time input validation and feedback
- **Download Actions**: One-click resume and certificate downloads

## 🔧 Architecture & Development

### **Component Architecture**
- **Functional Components**: Modern React hooks pattern throughout
- **Custom Hooks**: Centralized data management with `usePortfolioData`
- **Responsive Design**: Mobile-first with Tailwind breakpoints
- **Performance Optimized**: Lazy loading and optimized re-renders
- **Clean Code**: Proper separation of concerns and modular structure

### **Data Management**
- **Centralized Content**: Single JSON file for all portfolio data
- **Type Safety**: Consistent data structures and validation
- **Easy Updates**: Edit content without touching component code
- **Dynamic Rendering**: Components automatically adapt to data changes

### **State Management**
- **React Hooks**: useState, useEffect, useRef for local state
- **Session Storage**: Navigation state persistence across reloads
- **Form State**: Controlled inputs with validation and error handling
- **Scroll State**: Parallax and navigation position tracking

## 📱 Portfolio Sections

### 1. **🏠 Home**
- Hero section with animated title and tagline
- Parallax background with Pillars of Creation imagery
- Professional introduction and call-to-action

### 2. **👨‍💻 About** 
- Professional background and expertise
- AI specialization from Purdue University
- Skills showcase with technology icons
- Personal story and career journey

### 3. **💼 Experience**
- Real work history: AWS, Linqia, Egen Solutions
- Interactive experience cards with achievements
- Technology stacks and responsibilities
- Professional growth timeline

### 4. **🚀 Projects**
- Portfolio of real applications and tools
- Live demo links and GitHub repositories
- Technology stacks and project highlights
- Full-stack and AI project showcases

### 5. **🎓 Certificates**
- Purdue University AI Specialization certificates
- Interactive carousel with touch/swipe support
- PDF downloads and verification links
- Verification links and credential details
- Skills breakdown for each certification

### 6. **📞 Contact**
- Functional EmailJS contact form
- Professional resume download
- Social media links (LinkedIn, GitHub)
- Direct email and networking options

## 🌟 Navigation Features

### **Multi-Modal Navigation**
- **Collapsible Sidebar**: Left navigation with show/hide toggle
- **Rocket Navigation**: Bottom-right black rocket for sequential scrolling  
- **ScrollSpy**: Active section highlighting with smooth indicators
- **Touch Gestures**: Swipe support for mobile carousel navigation
- **Direct Links**: Section-specific URLs for bookmarking

### **User Experience**
- **Smooth Transitions**: Hardware-accelerated CSS animations
- **Mobile Optimization**: Touch-friendly interface with swipe gestures
- **Enhanced Mobile Scroll**: Simplified section navigation for mobile devices
- **Keyboard Accessible**: Full keyboard navigation support
- **Visual Feedback**: Hover states and active indicators

### **Performance Features**  
- **Image Preloading**: Background images preloaded for instant transitions
- **Parallax Optimization**: Only calculates when sections are visible
- **Efficient Scrolling**: Throttled scroll event handling
- **Memory Management**: Proper cleanup of event listeners
- **Cross-Browser**: Tested on Chrome, Firefox, Safari, Edge
- **Local Assets**: All background images stored locally for reliability

## 🎯 Production Features

### **Complete & Optimized**
The portfolio is production-ready with:
- **SEO Optimization**: Meta tags, sitemap, Open Graph, Twitter Cards
- **Performance**: ~76KB total bundle size (gzipped)
- **PWA Support**: Installable web app with custom rocket favicon
- **Security**: Clean production build with optimized assets
- **Mobile Excellence**: Touch-optimized interactions and responsive design

## 🎯 Key Highlights

### **Professional Showcase**
- **Real Industry Experience**: 5+ years at top companies (AWS, Linqia, Egen)
- **AI Expertise**: Purdue University Applied Generative AI Specialization
- **Full-Stack Proficiency**: React, Node.js, Python, AWS, databases
- **Modern Development**: Latest React patterns, responsive design, performance optimization

### **Technical Excellence**
- **Production Quality**: Enterprise-level code standards and best practices
- **Performance Optimized**: Fast loading with image preloading and optimized bundles
- **SEO Ready**: Complete meta tags, sitemap, and social media integration
- **Accessible Design**: WCAG compliant with keyboard and screen reader support
- **Mobile Mastery**: Advanced touch interactions and responsive design

### **Unique Features**
- **Parallax Scrolling**: Immersive depth effects throughout
- **Interactive Certificates**: PDF viewing with verification links and touch navigation
- **Functional Contact**: Real email integration with fallback systems
- **Professional Downloads**: Resume and certificates with one-click access
- **Custom Favicon**: Space-themed black rocket icon for professional branding
- **Touch-Optimized**: Advanced mobile interactions with swipe gestures

## 🙏 Acknowledgments

- **NASA JWST Team**: For the breathtaking space imagery that powers the visual design
- **Purdue University**: For the world-class AI education and certification program  
- **Open Source Community**: React, Tailwind CSS, and the amazing ecosystem
- **Icons8**: For the professional icon library used throughout
- **EmailJS**: For enabling client-side email functionality

**Built with 🚀 passion and ⭐ precision by [Anmol Khandekar](https://linkedin.com/in/anmol-khandekar)**

*Full Stack Developer & AI Specialist | React Expert | AWS Certified*
