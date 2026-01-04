# Complete Setup Guide - Step by Step

## 🎯 Welcome! This guide will walk you through everything from scratch.

---

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Project Structure Setup](#project-structure-setup)
3. [Development Tools Installation](#development-tools-installation)
4. [Local Development Setup](#local-development-setup)
5. [Firebase Setup (Optional)](#firebase-setup-optional)
6. [Testing Your Website](#testing-your-website)
7. [Deployment Guide](#deployment-guide)
8. [Troubleshooting](#troubleshooting)

---

## ✅ Prerequisites

You need these installed on your computer:

### 1. **VS Code (Free Code Editor)**
- **Download:** https://code.visualstudio.com/
- **Installation:**
  1. Download the installer for Windows
  2. Run the installer
  3. Follow the installation wizard
  4. Launch VS Code

### 2. **Git (Version Control)**
- **Download:** https://git-scm.com/downloads
- **Installation:**
  1. Download Git for Windows
  2. Run the installer
  3. Keep default settings
  4. Click "Next" through all steps
  5. Verify: Open PowerShell, type `git --version`

### 3. **Web Browser**
- Chrome, Firefox, or Edge (latest version)

---

## 📁 Project Structure Setup

### Step 1: Create Folder Structure

1. Navigate to your desktop (or preferred location)
2. Create a folder named `portfolio-project2`
3. Inside this folder, create these subfolders:
   ```
   portfolio-project2/
   ├── css/
   ├── js/
   ├── images/
   └── assets/
   ```

### Step 2: Copy Files

Make sure all files are in the correct locations:

```
portfolio-project2/
│
├── index.html          (Main page)
├── about.html          (About page)
├── projects.html       (Projects page)
├── contact.html        (Contact page)
├── tasks.html          (Task Manager)
├── README.md           (Documentation)
├── SETUP_GUIDE.md      (This file)
├── .gitignore          (Git ignore file)
│
├── css/
│   ├── style.css       (Main styles)
│   ├── responsive.css  (Responsive rules)
│   └── animations.css  (Animations)
│
├── js/
│   ├── main.js         (Main JavaScript)
│   ├── tasks.js        (Task Manager logic)
│   ├── form-validation.js (Form handling)
│   └── firebase-config.js (Firebase setup)
│
├── images/
│   └── (Add your images here)
│
└── assets/
    └── (Additional assets)
```

---

## 🛠️ Development Tools Installation

### Install VS Code Extensions

1. Open VS Code
2. Click the Extensions icon (left sidebar, looks like 4 squares)
3. Search and install these extensions:
   - **Live Server** (by Ritwick Dey)
   - **Prettier** (by Prettier)
   - **Auto Rename Tag** (by Jun Han)

### Setup Live Server

1. Right-click on `index.html` in VS Code
2. Select "Open with Live Server"
3. Your website will open in browser at `http://localhost:5500`
4. Changes auto-refresh in browser!

---

## 💻 Local Development Setup

### Method 1: Using Live Server (Recommended)

1. Open VS Code
2. Open the `portfolio-project2` folder in VS Code
3. Right-click on `index.html`
4. Select "Open with Live Server"
5. Website opens automatically in browser

### Method 2: Using Python (If you have Python installed)

1. Open PowerShell in project folder
2. Type: `python -m http.server 8000`
3. Open browser: `http://localhost:8000`

### Method 3: Direct File Opening

1. Navigate to `portfolio-project2` folder
2. Double-click `index.html`
3. Opens in default browser (limited functionality)

---

## 🔥 Firebase Setup (Optional - For Backend)

### Why Firebase?
- Store contact form submissions
- Sync tasks across devices
- Free tier: 50K reads/day, 20K writes/day

### Step-by-Step Setup:

#### Step 1: Create Firebase Account
1. Go to https://firebase.google.com/
2. Click "Get Started" (it's free!)
3. Sign in with Google account
4. Click "Add Project"
5. Enter project name: `portfolio-website`
6. Continue (disable Google Analytics if you want)
7. Click "Create Project"

#### Step 2: Add Web App
1. In Firebase Console, click Web icon `</>`
2. Register app nickname: `portfolio-web`
3. Check "Also set up Firebase Hosting" (optional)
4. Click "Register app"
5. **COPY the config object** - looks like this:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIza...",
     authDomain: "...",
     projectId: "...",
     // ... etc
   };
   ```

#### Step 3: Enable Firestore Database
1. In Firebase Console, click "Firestore Database"
2. Click "Create database"
3. Select "Start in test mode" (for development)
4. Choose location closest to you
5. Click "Enable"

#### Step 4: Enable Authentication (Optional)
1. In Firebase Console, click "Authentication"
2. Click "Get started"
3. Enable "Email/Password"
4. Click "Save"

#### Step 5: Add Firebase to Your Website
1. Open `index.html`, `contact.html`, `tasks.html`
2. Before closing `</body>` tag, add:
   ```html
   <!-- Firebase SDK -->
   <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js"></script>
   <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js"></script>
   ```
3. Open `js/firebase-config.js`
4. Replace the placeholder config with your copied config
5. Uncomment the initialization code (remove `//`)

#### Step 6: Update Security Rules (For Production)
1. In Firestore Database, click "Rules"
2. For development, you can use:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if true;
       }
     }
   }
   ```
3. Click "Publish"

**Note:** Change these rules for production to secure your database!

---

## 🧪 Testing Your Website

### Test Checklist:

#### Basic Functionality
- [ ] All pages load correctly
- [ ] Navigation works on all pages
- [ ] Mobile menu toggles properly
- [ ] Links work correctly
- [ ] Images display (if you added any)

#### Responsive Design
- [ ] Resize browser window - layout adapts
- [ ] Test on mobile device (or browser dev tools)
- [ ] All sections are readable on mobile
- [ ] Buttons are easily tappable on mobile

#### Forms
- [ ] Contact form validates input
- [ ] Required fields show errors
- [ ] Email format is validated
- [ ] Form submission works (check console)

#### Task Manager
- [ ] Add task works
- [ ] Edit task works
- [ ] Delete task works
- [ ] Mark task as complete works
- [ ] Filters work (All/Active/Completed)
- [ ] Tasks persist after page refresh

#### Performance
- [ ] Page loads quickly
- [ ] Smooth animations
- [ ] No console errors

---

## 🚀 Deployment Guide

### Option 1: Vercel (Easiest & Recommended)

#### Steps:
1. **Push to GitHub:**
   - Create account at https://github.com
   - Click "New repository"
   - Name: `portfolio-website`
   - Make it Public (required for free hosting)
   - Click "Create repository"
   - Follow instructions to push your code

2. **Deploy to Vercel:**
   - Go to https://vercel.com
   - Sign in with GitHub
   - Click "New Project"
   - Import your GitHub repository
   - Click "Deploy"
   - **Done!** Your site is live (free `.vercel.app` domain)

#### Your Website URL:
`https://your-project-name.vercel.app`

---

### Option 2: Netlify (Also Easy)

#### Steps:
1. **Push to GitHub** (same as above)

2. **Deploy to Netlify:**
   - Go to https://www.netlify.com
   - Sign in with GitHub
   - Click "Add new site" → "Import an existing project"
   - Select your GitHub repository
   - Click "Deploy site"
   - **Done!** Your site is live (free `.netlify.app` domain)

#### Your Website URL:
`https://your-project-name.netlify.app`

---

### Option 3: Firebase Hosting (If you set up Firebase)

#### Steps:
1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```bash
   firebase login
   ```

3. Initialize hosting:
   ```bash
   firebase init hosting
   ```
   - Select your Firebase project
   - Public directory: `.` (current directory)
   - Single-page app: `No`
   - Overwrite index.html: `No`

4. Deploy:
   ```bash
   firebase deploy
   ```

#### Your Website URL:
`https://your-project-id.web.app`

---

### Option 4: GitHub Pages (Simple)

#### Steps:
1. Push code to GitHub repository
2. Go to repository Settings
3. Scroll to "Pages" section
4. Source: Select "main" branch
5. Folder: `/root`
6. Click "Save"
7. Your site: `https://yourusername.github.io/repository-name`

---

## 🎨 Customization Guide

### Change Your Information

1. **Personal Info:**
   - Open `index.html`
   - Find "Your Name" and replace with your name
   - Update email, social media links

2. **Colors:**
   - Open `css/style.css`
   - Find `:root` section at top
   - Change `--primary-color` to your preferred color
   - Example: `--primary-color: #ff6b6b;` (red)

3. **Add Your Images:**
   - Place images in `images/` folder
   - In HTML, replace placeholder with:
     ```html
     <img src="images/your-photo.jpg" alt="Your Name">
     ```

4. **Update Projects:**
   - Open `projects.html`
   - Edit project cards with your actual projects
   - Update links to your GitHub repos

---

## 🐛 Troubleshooting

### Problem: Website doesn't load
**Solution:** 
- Make sure all files are in correct folders
- Check browser console for errors (F12)
- Verify file paths are correct

### Problem: Styles not applying
**Solution:**
- Check `css/style.css` is in `css/` folder
- Verify HTML links to CSS correctly:
  ```html
  <link rel="stylesheet" href="css/style.css">
  ```

### Problem: JavaScript not working
**Solution:**
- Check browser console (F12) for errors
- Verify JavaScript files are in `js/` folder
- Check HTML includes scripts before `</body>`

### Problem: Images not showing
**Solution:**
- Verify image files are in `images/` folder
- Check file names match exactly (case-sensitive)
- Use correct file extensions (.jpg, .png, etc.)

### Problem: Firebase not working
**Solution:**
- Verify Firebase config in `js/firebase-config.js`
- Check Firebase SDK scripts are added to HTML
- Verify Firestore is enabled in Firebase Console
- Check browser console for Firebase errors

### Problem: Contact form doesn't send emails
**Solution:**
- Contact form currently logs to console (by default)
- To send real emails, use:
  - EmailJS (free): https://www.emailjs.com/
  - FormSpree (free): https://formspree.io/
  - Or set up Firebase functions

---

## 📚 Additional Resources

### Learning Resources:
- **MDN Web Docs:** https://developer.mozilla.org
- **W3Schools:** https://www.w3schools.com
- **freeCodeCamp:** https://www.freecodecamp.org
- **CSS Tricks:** https://css-tricks.com

### Free Tools:
- **Icons:** https://fontawesome.com (already included)
- **Images:** https://unsplash.com
- **Color Palette:** https://coolors.co
- **Fonts:** https://fonts.google.com (already included)

---

## ✅ Next Steps

1. ✅ Complete setup guide
2. ✅ Test website locally
3. ✅ Customize with your information
4. ✅ Add your projects
5. ✅ Deploy to Vercel/Netlify
6. ✅ Share your portfolio!

---

## 💡 Tips for Success

1. **Start Simple:** Get the basic site working first
2. **Test Often:** Check in browser after every change
3. **Use Browser Dev Tools:** Press F12 to debug
4. **Save Frequently:** Ctrl+S is your friend!
5. **Version Control:** Commit changes to Git regularly
6. **Backup:** Keep a backup of your code

---

## 🆘 Need Help?

- Check browser console for errors (F12)
- Review this guide again
- Search error messages on Google
- Check file paths and folder structure
- Verify all files are saved

---

**Good luck with your portfolio website! 🚀**

You've got this! Take it one step at a time, and you'll have a beautiful portfolio website in no time.

