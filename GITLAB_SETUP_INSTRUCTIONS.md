# 🔧 GitLab Setup Instructions (For You Only)

## 📋 Steps to Setup GitLab Repository

### 1. Create GitLab Repository
1. Go to [gitlab.com](https://gitlab.com)
2. Sign in to your account
3. Click "New Project" → "Create blank project"
4. Fill in the details:
   - **Project name**: `tm-rnd-assessment`
   - **Project slug**: `tm-rnd-assessment`
   - **Visibility Level**: Private
   - **Initialize repository with a README**: ❌ (uncheck)
5. Click "Create project"

### 2. Push Your Code
```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit your changes
git commit -m "Initial commit: TM R&D Assessment Angular application"

# Add GitLab remote
git remote add origin https://gitlab.com/YOUR_USERNAME/tm-rnd-assessment.git

# Push to GitLab
git push -u origin main
```

### 3. Add Evaluators (Developer Access)
1. Go to your project → Settings → Members
2. Click "Invite members"
3. Add each evaluator with **Developer** access:

   **Evaluator 1:**
   - Email: `kengcc@gmail.com`
   - Access Level: Developer

   **Evaluator 2:**
   - Email: `norfazlinairyani@gmail.com`
   - Access Level: Developer

   **Evaluator 3:**
   - Email: `azrihasin1999@gmail.com`
   - Access Level: Developer

4. Click "Invite members"

### 4. Verify Access
- Each evaluator will receive an email invitation
- They can accept and access your repository
- They will have Developer access (can view, clone, and contribute)

## 🚀 Next Steps After GitLab Setup

1. **Deploy your application** using Vercel or Netlify
2. **Update the README.md** with your actual demo URL
3. **Add unit tests** for extra points (optional)
4. **Submit the GitLab repository URL** to TM R&D

## 📝 Important Notes

- Keep this file private (don't commit to GitLab)
- The evaluators only need the repository URL
- They don't need to see these setup instructions
- Make sure your repository is private until you're ready to submit

---

**Remember**: The evaluators will only see your code and README, not these setup instructions!
