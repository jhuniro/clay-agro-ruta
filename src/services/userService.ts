import { db, isFirebaseConfigured } from '../lib/firebase';
import { doc, getDoc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { AgroUser, UserRole } from '../types/userTypes';
import { mockUsers } from '../data/mockUsers';

const STORAGE_KEY = 'agroruta_users';

// Inicializar base de datos simulada en localStorage
const getSimulatedUsers = (): AgroUser[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockUsers));
    return mockUsers;
  }
  return JSON.parse(data);
};

const saveSimulatedUsers = (users: AgroUser[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
};

// Obtener un usuario por su UID
export const getUserById = async (uid: string): Promise<AgroUser | null> => {
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data() as AgroUser;
      }
      return null;
    } catch (error) {
      console.error('Error al obtener usuario en Firestore:', error);
    }
  }

  // Fallback simulado
  const users = getSimulatedUsers();
  return users.find((u) => u.uid === uid) || null;
};

// Crear o actualizar un usuario
export const createUser = async (user: AgroUser): Promise<void> => {
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, 'users', user.uid);
      await setDoc(docRef, user, { merge: true });
      return;
    } catch (error) {
      console.error('Error al guardar usuario en Firestore:', error);
    }
  }

  // Fallback simulado
  const users = getSimulatedUsers();
  const index = users.findIndex((u) => u.uid === user.uid);
  if (index !== -1) {
    users[index] = { ...users[index], ...user };
  } else {
    users.push(user);
  }
  saveSimulatedUsers(users);
};

// Obtener usuarios filtrados por rol
export const getUsersByRole = async (role: UserRole): Promise<AgroUser[]> => {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, 'users'), where('role', '==', role));
      const querySnapshot = await getDocs(q);
      const users: AgroUser[] = [];
      querySnapshot.forEach((docSnap) => {
        users.push(docSnap.data() as AgroUser);
      });
      return users;
    } catch (error) {
      console.error('Error al obtener usuarios por rol en Firestore:', error);
    }
  }

  // Fallback simulado
  const users = getSimulatedUsers();
  return users.filter((u) => u.role === role);
};
