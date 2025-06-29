import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";

 const Design :any = async () => {
  try {
    const docRef = doc(db, 'settings', 'design');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      
      return {
          darkColor: { backgroundColor: data.darkColor || "#111827" },
          lightColor: { backgroundColor: data.lightColor || "#faf9f7" },
        };
    } else {
      return {
        darkColor: { backgroundColor: "#111827" },
        lightColor: { backgroundColor: "#faf9f7" },
      };
    }
  } catch (err) {
    console.error('Error loading design from Firestore:', err);
    return {
      darkColor: { backgroundColor: "#111827" },
      lightColor: { backgroundColor: "#faf9f7" },
    };
  }
};

export default Design;