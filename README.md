# 🚀 TM R&D Assessment - Angular Application

**Project Title:** TM R&D Assessment - Full-Stack Angular Web Application

## 📋 Project Description

This is a comprehensive Angular application developed for the TM R&D Assessment, featuring a modern web interface with authentication, product management, and detailed reporting capabilities. The application demonstrates full-stack development skills with Angular 18+, TypeScript, and modern web technologies.

**Key Features:**
- Secure JWT authentication system
- Product management with CRUD operations
- Real-time data filtering and pagination
- Responsive design with dark/light mode
- API integration with TM R&D endpoints
- Professional UI/UX with modern styling

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

### 🐳 **Containerization** *(Bonus)*
- 🐳 Docker containerization with multi-stage build
- 📦 Production-ready container image
- 🚀 Easy deployment to cloud platforms
- 🔧 Docker Compose configuration
- 📋 Comprehensive Docker documentation

### 🔍 **Advanced Features** *(Bonus)*
- 📊 Data transformation utilities
- 🎯 Dynamic field mapping for API responses
- ⏰ Date/time formatting utilities
- 🐛 Debug logging for development
- 📈 Performance optimizations

---

## 📊 **Feature Implementation Overview**

### **Core Requirements**
- 🔐 **Authentication System** - JWT-based secure login
- 🏠 **Product Management** - CRUD operations with API integration
- 📊 **Detail Page with Alerts** - Data visualization with filtering
- 🛠️ **Technical Implementation** - Angular 18+ with modern practices
- 📱 **Basic UI/UX** - Responsive design and user experience

### **Additional Features**
- 🧪 **Unit Testing** - Comprehensive test coverage
- 🎨 **Dark Mode Theme** - Light/dark mode toggle
- ✨ **Enhanced UI/UX** - Professional styling and animations
- ✅ **Real-time Validation** - Live form validation
- 🗑️ **Confirmation Dialogs** - User-friendly confirmations
- 🐳 **Containerization** - Docker deployment ready

---

## 🛠️ Technical Stack

- **Frontend Framework**: Angular 18+ (Standalone Components)
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

### Docker Containerization
```bash
# Build Docker image
docker build -t tm-rnd-assessment .

# Run container locally
docker run -p 3000:80 tm-rnd-assessment

# Run with Docker Compose
docker-compose up
```

**Access the containerized application at:** `http://localhost:3000`

## 🚀 **Deployment Guide**

### 🌐 **Live Demo**

**Demo URL**: [https://tm-rnd-assessment.vercel.app](https://tm-rnd-assessment.vercel.app)

*This public demo allows you to test the application without any setup.*

### 📋 **How to Deploy to Vercel (Public Demo)**

#### Prerequisites
- Node.js installed
- Vercel account (free)

#### Step 1: Build the Application
```bash
ng build --configuration production
```

#### Step 2: Deploy to Vercel
1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```

4. **Configure Vercel Settings:**
   - **Framework Preset:** Angular
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist/tm-rnd-assessment/browser`
   - **Install Command:** `npm install`

#### Step 3: Verify Public Demo
- Visit the Vercel URL
- Test authentication flow
- Confirm all features work
- Share URL as needed

### 🐳 **Docker Containerization (Bonus Feature)**

*This demonstrates containerization skills and provides additional deployment options.*

#### Prerequisites
- Docker Desktop installed and running
- Access to the GitLab repository

#### Step 1: Access the Repository
- The repository is already available in your GitLab account
- Navigate to the project directory
- Ensure you're in the root directory containing the Dockerfile

#### Step 2: Build Docker Image
```bash
docker build -t tm-rnd-assessment .
```

#### Step 3: Run Container Locally
```bash
# Option A: Direct Docker run
docker run -p 3000:80 tm-rnd-assessment

# Option B: Using Docker Compose (recommended)
docker-compose up
```

#### Step 4: Access the Application
- **Local URL:** http://localhost:3000
- **Container Status:** Check with `docker ps`
- **Container Logs:** `docker logs [container-id]`

#### Step 5: Stop the Container
```bash
# If running with docker run
Ctrl+C

# If running with docker-compose
docker-compose down
```

#### Step 6: Production Deployment Options
- **AWS ECS/Fargate:** Upload image to ECR and deploy
- **Google Cloud Run:** Build and deploy with Cloud Build
- **Azure Container Instances:** Deploy from Azure Container Registry
- **Kubernetes:** Use provided docker-compose.yml as reference
- Test authentication flow
- Confirm all features work as expected

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
