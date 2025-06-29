import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

interface DesignColors {
  darkColor: { backgroundColor: string };
  lightColor: { backgroundColor: string };
}

const Design = async (): Promise<DesignColors> => {
  const defaultColors: DesignColors = {
    darkColor: { backgroundColor: '#111827' },
    lightColor: { backgroundColor: '#faf9f7' },
  };

  try {
    const docRef = doc(db, 'settings', 'design');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        darkColor: { backgroundColor: data.darkColor || defaultColors.darkColor.backgroundColor },
        lightColor: { backgroundColor: data.lightColor || defaultColors.lightColor.backgroundColor },
      };
    }

    return defaultColors;
  } catch (err) {
    console.error('Error loading design from Firestore:', err);
    return defaultColors;
  }
};

export default Design;
