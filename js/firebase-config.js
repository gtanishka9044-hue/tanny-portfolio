// ============================================
// FIREBASE CONFIGURATION (OPTIONAL)
// Backend Integration for Contact Form & Tasks
// ============================================

/*
 * SETUP INSTRUCTIONS:
 * 
 * 1. Go to https://firebase.google.com/
 * 2. Click "Get Started" and create a free account
 * 3. Click "Add Project" and give it a name
 * 4. Click on "Web" icon (</>) to add a web app
 * 5. Register your app and copy the config object
 * 6. Replace the firebaseConfig object below with your config
 * 7. Enable Firestore Database in Firebase Console
 * 8. Enable Authentication (Email/Password) in Firebase Console
 * 
 * IMPORTANT: This file is optional. The website works without Firebase!
 * Local Storage is used as a fallback for tasks.
 */

// ============================================
// FIREBASE CONFIG - REPLACE WITH YOUR CONFIG
// ============================================
const firebaseConfig = {
    // REPLACE THESE VALUES WITH YOUR FIREBASE CONFIG
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// ============================================
// INITIALIZE FIREBASE (Only if config is valid)
// ============================================
let firebaseInitialized = false;

// Check if Firebase config is set (not placeholder values)
const isConfigValid = firebaseConfig.apiKey !== "YOUR_API_KEY" && 
                      firebaseConfig.projectId !== "YOUR_PROJECT_ID";

if (isConfigValid) {
    try {
        // Initialize Firebase (you'll need to include Firebase SDK in HTML)
        // Add this to your HTML <head>:
        // <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js"></script>
        // <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js"></script>
        
        // Uncomment these lines after adding Firebase SDK:
        // firebase.initializeApp(firebaseConfig);
        // const db = firebase.firestore();
        // firebaseInitialized = true;
        
        console.log('Firebase configuration found. To enable:');
        console.log('1. Add Firebase SDK scripts to HTML');
        console.log('2. Uncomment initialization code in firebase-config.js');
        
    } catch (error) {
        console.error('Firebase initialization error:', error);
        firebaseInitialized = false;
    }
} else {
    console.log('Firebase not configured. Using Local Storage for data persistence.');
}

// ============================================
// FIREBASE FUNCTIONS (Contact Form)
// ============================================
async function submitContactFormToFirebase(formData) {
    if (!firebaseInitialized) {
        throw new Error('Firebase not initialized');
    }

    try {
        // Uncomment after Firebase is set up:
        // await db.collection('contact-messages').add({
        //     name: formData.name,
        //     email: formData.email,
        //     subject: formData.subject,
        //     message: formData.message,
        //     timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        //     read: false
        // });
        
        console.log('Contact form data (would be saved to Firebase):', formData);
        return true;
    } catch (error) {
        console.error('Error saving contact form:', error);
        throw error;
    }
}

// ============================================
// FIREBASE FUNCTIONS (Tasks)
// ============================================
async function syncTasksToFirebase(tasks) {
    if (!firebaseInitialized) {
        return; // Silently fail - Local Storage is backup
    }

    try {
        // Uncomment after Firebase is set up:
        // const userId = 'anonymous'; // Or get from authentication
        // await db.collection('users').doc(userId).set({
        //     tasks: tasks,
        //     lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
        // }, { merge: true });
        
        console.log('Tasks synced to Firebase:', tasks.length, 'tasks');
    } catch (error) {
        console.error('Error syncing tasks to Firebase:', error);
        // Don't throw - Local Storage is backup
    }
}

async function loadTasksFromFirebase() {
    if (!firebaseInitialized) {
        return null; // Return null to use Local Storage
    }

    try {
        // Uncomment after Firebase is set up:
        // const userId = 'anonymous';
        // const doc = await db.collection('users').doc(userId).get();
        // if (doc.exists()) {
        //     return doc.data().tasks || [];
        // }
        
        return null;
    } catch (error) {
        console.error('Error loading tasks from Firebase:', error);
        return null; // Fallback to Local Storage
    }
}

// ============================================
// EXPOSE FUNCTIONS GLOBALLY
// ============================================
window.submitContactFormToFirebase = submitContactFormToFirebase;
window.syncTasksToFirebase = syncTasksToFirebase;
window.loadTasksFromFirebase = loadTasksFromFirebase;
window.firebaseConfig = firebaseConfig; // Export config

// ============================================
// USAGE INSTRUCTIONS
// ============================================
/*
 * TO ENABLE FIREBASE:
 * 
 * 1. In index.html, contact.html, tasks.html - Add before closing </body>:
 *    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js"></script>
 *    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js"></script>
 *    <script src="js/firebase-config.js"></script>
 * 
 * 2. In this file, replace firebaseConfig with your actual config
 * 
 * 3. Uncomment the firebase initialization code
 * 
 * 4. Uncomment the database operations in the functions
 * 
 * 5. In Firebase Console:
 *    - Create Firestore Database
 *    - Set security rules (for development):
 *      rules_version = '2';
 *      service cloud.firestore {
 *        match /databases/{database}/documents {
 *          match /{document=**} {
 *            allow read, write: if true;
 *          }
 *        }
 *      }
 *    - Note: Change rules for production!
 */

