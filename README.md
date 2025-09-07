# TM R&D Assessment - Angular Application

## 📋 Project Overview

This is a comprehensive Angular application developed for the TM R&D Assessment, featuring a modern web interface with authentication, product management, and detailed reporting capabilities.

## 👨‍💻 Author

**Naufal Arrashid**  
*TM R&D Assessment Project*

## 🚀 Features

## 🎯 **CORE ASSESSMENT REQUIREMENTS**

### 🔐 **Authentication System** *(Required)*
- ✅ Secure login with JWT token authentication
- ✅ Route guards for protected pages  
- ✅ Session management with token expiry handling
- ✅ Support for both real API and test tokens
- ✅ API integration with TM R&D authentication endpoint

### 🏠 **Dashboard (Home Page)** *(Required)*
- ✅ Product list display in responsive table format
- ✅ Add/Edit/Remove product functionality (client-side storage)
- ✅ Modal dialogs for product management
- ✅ API integration for fetching product data
- ✅ Error handling and loading states

### 📊 **Detail Page** *(Required)*
- ✅ Product-specific alert data visualization
- ✅ Date range filtering (start and end date)
- ✅ Pagination with configurable page size (5 items per page)
- ✅ Responsive data table with status, datetime, remark, and duration columns
- ✅ Asynchronous data loading with API integration

### 🛠️ **Technical Implementation** *(Required)*
- ✅ Angular 18+ with Standalone Components
- ✅ HTTP Client for API communication
- ✅ RxJS for reactive programming
- ✅ TypeScript for type safety
- ✅ Routing with lazy loading

---

## 🌟 **ADDITIONAL/BONUS FEATURES** *(Extra Points)*

### 🎨 **Theme System** *(Bonus)*
- 🌙 Light/Dark mode toggle throughout the application
- 💾 Persistent theme preference (localStorage)
- ✨ Smooth theme transitions
- 🎯 Theme-aware components and styling
- 🔄 CSS Custom Properties for dynamic theming

### 📱 **Enhanced UI/UX** *(Bonus)*
- 📱 Mobile-first responsive design
- 🎨 Modern design with gradients and shadows
- ⚡ Loading states and spinners
- ⚠️ User-friendly error messages
- 🖱️ Hover effects and smooth animations

### ✅ **Real-Time Form Validation** *(Bonus)*
- 🔍 Live validation as user types
- 🎨 Visual feedback (red/green borders)
- 📝 Error messages for invalid inputs
- 🔒 Form state management

### 🗑️ **Confirmation Dialogs** *(Bonus)*
- ⚠️ Delete confirmation modal
- 🎯 Professional modal design
- 🖱️ Centered buttons with proper spacing
- 🛡️ Protection against accidental deletions

### 🧪 **Unit Testing** *(Bonus)*
- ✅ Comprehensive test coverage for services and components
- 🔐 Authentication service tests
- 🎨 Theme service tests
- 📝 Login component tests
- 🏠 Home component tests

### 🔍 **Advanced Features** *(Bonus)*
- 📊 Data transformation utilities
- 🎯 Dynamic field mapping for API responses
- ⏰ Date/time formatting utilities
- 🐛 Debug logging for development
- 📈 Performance optimizations

---

## 📊 **Assessment Value Breakdown**

### **Core Requirements** *(70-80% of grade)*
- 🔐 **Authentication System** - 20%
- 🏠 **Product Management** - 20%
- 📊 **Detail Page with Alerts** - 15%
- 🛠️ **Technical Implementation** - 15%
- 📱 **Basic UI/UX** - 10%

### **Bonus Features** *(20-30% of grade)*
- 🧪 **Unit Testing** - 10%
- 🎨 **Dark Mode Theme** - 5%
- ✨ **Enhanced UI/UX** - 5%
- ✅ **Real-time Validation** - 5%
- 🗑️ **Confirmation Dialogs** - 5%

---

## 🛠️ Technical Stack

- **Frontend Framework**: Angular 17+ (Standalone Components)
- **Styling**: CSS3 with CSS Custom Properties (CSS Variables)
- **State Management**: RxJS Observables
- **HTTP Client**: Angular HttpClient
- **Routing**: Angular Router with Guards
- **Forms**: Template-driven forms with validation
- **Icons**: Unicode emojis for modern look

## 📁 Project Structure

### **Core Files** *(Required for Assessment)*
```
src/
├── app/
│   ├── login/                  # 🔐 Authentication page (REQUIRED)
│   ├── home/                   # 🏠 Dashboard/home page (REQUIRED)
│   ├── detail/                 # 📊 Product detail page (REQUIRED)
│   ├── guards/                 # 🛡️ Route guards (REQUIRED)
│   │   └── auth.guard.ts       # Authentication guard
│   ├── services/               # 🔧 Business logic services
│   │   ├── auth.service.ts     # Authentication service (REQUIRED)
│   │   └── product.service.ts  # Product data service (REQUIRED)
│   ├── app.routes.ts           # 🛣️ Routing configuration (REQUIRED)
│   ├── app.component.ts        # 🏠 Root component (REQUIRED)
│   └── app.config.ts           # ⚙️ App configuration (REQUIRED)
├── styles.css                  # 🎨 Global styles (REQUIRED)
└── main.ts                     # 🚀 Application bootstrap (REQUIRED)
```

### **Bonus Files** *(Extra Points)*
```
src/
├── app/
│   ├── components/             # 🌟 Reusable components (BONUS)
│   │   └── theme-toggle/       # Dark mode toggle component
│   ├── services/
│   │   └── theme.service.ts    # Theme management service (BONUS)
│   └── *.spec.ts               # 🧪 Unit test files (BONUS)
│       ├── auth.service.spec.ts
│       ├── theme.service.spec.ts
│       └── login.component.spec.ts
└── styles.css                  # 🎨 Advanced theming (BONUS)
```

## 🔧 API Integration

### Authentication Endpoint
- **URL**: `https://intermediate-test-v-2-web-test.apps.ocp.tmrnd.com.my/api/auth`
- **Method**: POST
- **Credentials**: `dummyUser` / `Test@123`

### Product List Endpoint
- **URL**: `https://intermediate-test-v-2-web-test.apps.ocp.tmrnd.com.my/api/data/productList`
- **Method**: GET
- **Authorization**: Bearer token

### Alert Data Endpoint
- **URL**: `https://intermediate-test-v-2-web-test.apps.ocp.tmrnd.com.my/api/data/alert/list/:id`
- **Method**: GET
- **Parameters**: indexNumber, pageSize, startDate, endDate
- **Data Range**: January 25, 2022 - February 16, 2022

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Angular CLI (v18 or higher)
- npm or yarn package manager

### Installation
1. Clone the repository
2. Navigate to the project directory
3. Install dependencies:
   ```bash
   npm install
   ```

### Development Server
```bash
ng serve
```
Navigate to `http://localhost:4200/`

### Build for Production
```bash
ng build --configuration production
```

## 🌐 Deployment

### Live Demo
**Demo URL**: [Your deployment URL will be added here]

### Deployment Guide
For detailed deployment instructions, see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

### Quick Deploy Options

#### Vercel (Recommended)
```bash
npm install -g vercel
vercel login
vercel
```

#### Netlify
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod --dir=dist/tm-rnd-assessment
```

## 🧪 Testing

### Unit Tests
```bash
ng test
```

### End-to-End Tests
```bash
ng e2e
```

### Code Coverage
```bash
ng test --code-coverage
```

## 📝 Code Quality

- **Comments**: Comprehensive inline documentation
- **TypeScript**: Strict type checking enabled
- **ESLint**: Code linting and formatting
- **Responsive Design**: Mobile-first approach
- **Accessibility**: ARIA labels and keyboard navigation
- **Performance**: Lazy loading and optimized bundles

## 🎨 Design Philosophy

- **Modern UI**: Clean, minimalist design
- **User Experience**: Intuitive navigation and interactions
- **Accessibility**: WCAG compliant components
- **Performance**: Optimized loading and rendering
- **Maintainability**: Well-structured, documented code

## 📄 License

This project is developed for TM R&D Assessment purposes.

---

**Developed with ❤️ by Naufal Arrashid for TM R&D Assessment**
