developer shouldnt# GitLab Setup Guide for TM R&D Assessment

## 📋 Step-by-Step GitLab Repository Setup

### 1. Create GitLab Repository

1. **Go to GitLab.com** and sign in to your account
2. **Click "New Project"** or the "+" button
3. **Choose "Create blank project"**
4. **Fill in the details:**
   - Project name: `tm-rnd-assessment`
   - Project slug: `tm-rnd-assessment`
   - Project description: `TM R&D Assessment - Angular Application by Naufal Arrashid`
   - Visibility Level: **Private** (important for assessment)
5. **Click "Create project"**

### 2. Push Your Code to GitLab

1. **Initialize Git in your project directory:**
   ```bash
   cd "TM RND ASSESSMENT"
   git init
   ```

2. **Add all files:**
   ```bash
   git add .
   ```

3. **Make initial commit:**
   ```bash
   git commit -m "Initial commit: TM R&D Assessment Angular Application"
   ```

4. **Add GitLab remote:**
   ```bash
   git remote add origin https://gitlab.com/YOUR_USERNAME/tm-rnd-assessment.git
   ```
   *Replace YOUR_USERNAME with your actual GitLab username*

5. **Push to GitLab:**
   ```bash
   git branch -M main
   git push -u origin main
   ```

### 3. Add Evaluators as Developers

1. **Go to your project page** on GitLab
2. **Click "Settings"** in the left sidebar
3. **Click "Members"** under "User management"
4. **Click "Invite members"**
5. **Add each evaluator with Developer access:**

   **Evaluator 1:**
   - Email: `kengcc@gmail.com`
   - Access Level: **Developer**
   - Click "Invite"

   **Evaluator 2:**
   - Email: `norfazlinairyani@gmail.com`
   - Access Level: **Developer**
   - Click "Invite"

   **Evaluator 3:**
   - Email: `azrihasin1999@gmail.com`
   - Access Level: **Developer**
   - Click "Invite"

### 4. Verify Repository Access

1. **Check that all evaluators can access:**
   - Repository URL: `https://gitlab.com/YOUR_USERNAME/tm-rnd-assessment`
   - README.md file is visible
   - All source code is accessible
   - Project structure is clear

### 5. Repository Structure Verification

Your repository should contain:
```
tm-rnd-assessment/
├── README.md                    # ✅ Required
├── package.json                 # ✅ Required
├── angular.json                 # ✅ Required
├── vercel.json                  # ✅ For deployment
├── .gitignore                   # ✅ Required
├── src/
│   ├── app/
│   │   ├── components/
│   │   ├── services/
│   │   ├── guards/
│   │   ├── login/
│   │   ├── home/
│   │   └── detail/
│   └── styles.css
└── dist/                        # ✅ Build output (if included)
```

## 🚀 Deployment Integration

### Option A: Vercel + GitLab Integration

1. **Go to Vercel.com** and sign up/login
2. **Click "New Project"**
3. **Import from GitLab:**
   - Select your GitLab repository
   - Configure build settings:
     - Build Command: `npm run build`
     - Output Directory: `dist/tm-rnd-assessment`
     - Install Command: `npm install`
4. **Deploy** - Vercel will automatically deploy on every push

### Option B: Netlify + GitLab Integration

1. **Go to Netlify.com** and sign up/login
2. **Click "New site from Git"**
3. **Connect GitLab** and select your repository
4. **Configure build settings:**
   - Build Command: `ng build --configuration production`
   - Publish Directory: `dist/tm-rnd-assessment`
5. **Deploy** - Netlify will automatically deploy on every push

## 📝 Final Checklist

- [ ] GitLab repository created and private
- [ ] All code pushed to GitLab
- [ ] README.md contains all required sections
- [ ] All 3 evaluators added with Developer access
- [ ] Application deployed and accessible via public URL
- [ ] Demo URL updated in README.md
- [ ] Unit tests included (extra points)
- [ ] Docker configuration included (extra points)

## 🔗 Important Links

- **Repository URL:** `https://gitlab.com/YOUR_USERNAME/tm-rnd-assessment`
- **Demo URL:** `https://your-deployment-url.com`
- **Evaluator Access:** All 3 evaluators have Developer access

## 📧 Contact Information

If evaluators have any issues accessing the repository, they can contact:
- **Developer:** Naufal Arrashid
- **Project:** TM R&D Assessment
- **Repository:** Private GitLab repository with Developer access granted
