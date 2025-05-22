import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCZGvGDBr2S_yg5m-roy25N_MunmKrwO5Q",
  authDomain: "gerenciadortarefas-3ce7a.firebaseapp.com",
  projectId: "gerenciadortarefas-3ce7a",
  storageBucket: "gerenciadortarefas-3ce7a.firebasestorage.app",
  messagingSenderId: "614580184501",
  appId: "1:614580184501:web:12a6af61f383a33a0a25fc"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };