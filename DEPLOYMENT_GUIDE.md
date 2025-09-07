# 🚀 Deployment Guide - TM R&D Assessment

## 📋 Prerequisites

- Node.js (v16 or higher)
- Angular CLI (v17 or higher)
- Git account
- Vercel/Netlify account (free tier available)

## 🛠️ Local Build Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Build for Production
```bash
ng build --configuration production
```

### 3. Test Local Build
```bash
# Install a local server (if not already installed)
npm install -g http-server

# Serve the built files
cd dist/tm-rnd-assessment
http-server -p 8080
```

## 🌐 Deployment Options

### Option 1: Vercel (Recommended)

#### Method A: Vercel CLI
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from project directory
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? (your account)
# - Link to existing project? No
# - Project name: tm-rnd-assessment
# - Directory: ./
# - Override settings? No
```

#### Method B: Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub/GitLab
3. Click "New Project"
4. Import your GitLab repository
5. Configure build settings:
   - **Framework Preset**: Angular
   - **Build Command**: `ng build --configuration production`
   - **Output Directory**: `dist/tm-rnd-assessment`
6. Click "Deploy"

### Option 2: Netlify

#### Method A: Netlify CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy from project directory
netlify deploy --prod --dir=dist/tm-rnd-assessment
```

#### Method B: Netlify Dashboard
1. Go to [netlify.com](https://netlify.com)
2. Sign in with GitHub/GitLab
3. Click "New site from Git"
4. Connect your GitLab repository
5. Configure build settings:
   - **Build command**: `ng build --configuration production`
   - **Publish directory**: `dist/tm-rnd-assessment`
6. Click "Deploy site"

## 🔧 Environment Configuration

### For Production Deployment
The application is configured to work with the TM R&D API endpoints:
- **Authentication**: `https://intermediate-test-v-2-web-test.apps.ocp.tmrnd.com.my/api/auth`
- **Product List**: `https://intermediate-test-v-2-web-test.apps.ocp.tmrnd.com.my/api/data/productList`
- **Alert Data**: `https://intermediate-test-v-2-web-test.apps.ocp.tmrnd.com.my/api/data/alert/list/:id`

### CORS Configuration
The application handles CORS through Angular's proxy configuration. For production, ensure your hosting platform supports the required API calls.

## 📱 Testing Deployment

### 1. Verify Application Loads
- Check if the login page loads correctly
- Verify theme toggle functionality
- Test responsive design on mobile devices

### 2. Test Authentication Flow
- Login with credentials: `dummyUser` / `Test@123`
- Verify navigation to home page
- Test logout functionality

### 3. Test Core Features
- Product list display
- Add/Edit/Remove products
- Navigate to detail page
- Test pagination and date filtering
- Verify dark/light mode persistence

## 🐛 Troubleshooting

### Common Issues

#### Build Fails
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Angular cache
ng cache clean
```

#### Routing Issues
- Ensure your hosting platform supports SPA routing
- Check that all routes redirect to `index.html`

#### API Connection Issues
- Verify CORS settings
- Check network tab in browser dev tools
- Ensure API endpoints are accessible

### Performance Optimization

#### Enable Production Optimizations
```bash
# Build with optimizations
ng build --configuration production --optimization=true --aot=true
```

#### Bundle Analysis
```bash
# Install bundle analyzer
npm install -g webpack-bundle-analyzer

# Analyze bundle
ng build --stats-json
webpack-bundle-analyzer dist/tm-rnd-assessment/stats.json
```

## 🔒 Security Considerations

- API endpoints are configured for the assessment environment
- JWT tokens are handled securely in localStorage
- Route guards protect authenticated pages
- Input validation prevents XSS attacks

## 📊 Performance Metrics

Expected performance on free hosting tiers:
- **First Load**: 2-4 seconds
- **Subsequent Loads**: <1 second (cached)
- **Bundle Size**: ~1.5MB (gzipped: ~400KB)
- **Lighthouse Score**: 90+ (Performance, Accessibility, Best Practices)

## 🎯 Success Criteria

Your deployment is successful when:
- ✅ Application loads without errors
- ✅ Login functionality works
- ✅ All pages are accessible
- ✅ Dark/Light mode toggle works
- ✅ Responsive design functions on mobile
- ✅ API integration works correctly

---

**Ready to deploy? Choose your preferred platform and follow the steps above!**
