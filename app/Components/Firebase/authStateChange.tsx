import { useEffect, useState } from 'react';
import firestore from "@react-native-firebase/firestore";
import auth from '@react-native-firebase/auth';

export default function useAuthStateChange() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async (authUser) => {
      setUser(authUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, loading };
}
