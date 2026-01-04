# 🚀 How to Run Your Portfolio Website

## Method 1: Live Server (Recommended - Best Experience)

### Step 1: Install VS Code Extension
1. Open VS Code
2. Click Extensions icon (left sidebar) or press `Ctrl+Shift+X`
3. Search for "Live Server"
4. Install "Live Server" by Ritwick Dey

### Step 2: Run the Website
1. In VS Code, right-click on `index.html`
2. Select "Open with Live Server"
3. Website opens automatically at `http://localhost:5500`
4. **Auto-refreshes** when you make changes!

### Benefits:
✅ Full functionality  
✅ Auto-refresh on save  
✅ Proper local server  
✅ All features work correctly  

---

## Method 2: Direct File Opening (Current Method)

The file should already be open in your browser!

**Limitations:**
- Some JavaScript features may not work perfectly
- No auto-refresh
- File paths might have issues

**To open manually:**
- Navigate to project folder
- Double-click `index.html`

---

## Method 3: Using Node.js (If Installed)

If you have Node.js installed:

```bash
# Install http-server globally
npm install -g http-server

# Run server
http-server
```

Then open: `http://localhost:8080`

---

## Method 4: Using Python (If Installed)

If you have Python installed:

```bash
# Python 3
python -m http.server 8000

# Then open: http://localhost:8000
```

---

## ✅ Recommended: Use Live Server!

For the best development experience:
1. Install Live Server extension in VS Code
2. Right-click `index.html` → "Open with Live Server"
3. Enjoy auto-refresh and full functionality!

---

## 🐛 Troubleshooting

### Website doesn't load?
- Check that all files are in correct folders
- Verify `index.html` exists in root folder
- Check browser console (F12) for errors

### Styles not showing?
- Make sure CSS files are in `css/` folder
- Check file paths in HTML are correct
- Hard refresh browser (Ctrl+Shift+R)

### JavaScript not working?
- Use Live Server instead of direct file opening
- Check browser console (F12) for errors
- Verify all JS files are in `js/` folder

---

**Your website should now be running! 🎉**

