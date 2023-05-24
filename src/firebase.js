// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCAmRLnMiDTzXS81klXkyebiSRU4syNbMQ",
  authDomain: "emagazinecsedept.firebaseapp.com",
  projectId: "emagazinecsedept",
  storageBucket: "emagazinecsedept.appspot.com",
  messagingSenderId: "431893019681",
  appId: "1:431893019681:web:ad48987b640cf8d761f760"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export { storage }