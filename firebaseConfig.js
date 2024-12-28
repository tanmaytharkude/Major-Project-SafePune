// Import Firebase functions
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, child } from "firebase/database"; // Ensure 'set' is imported

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDv6WGQfX9UnjaWWCNOyzORqIqVR8AU-b0",
  authDomain: "safepune-6166d.firebaseapp.com",
  projectId: "safepune-6166d",
  storageBucket: "safepune-6166d.firebasestorage.app",
  messagingSenderId: "620483149376",
  appId: "1:620483149376:web:c1921aa80ac3aeb7cb69a5",
  measurementId: "G-2V2J8DC0PF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Function to write data
function writeUserData(userId, name, email) {
  set(ref(database, 'users/' + userId), {
    username: name,
    email: email,
  })
    .then(() => console.log("Data written successfully!"))
    .catch((error) => console.error("Error writing data: ", error));
}

// Function to read data
function readUserData(userId) {
  const dbRef = ref(database);
  get(child(dbRef, `users/${userId}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => console.error("Error reading data: ", error));
}

// Example usage
writeUserData("1", "Alice", "alice@example.com");
readUserData("1");
