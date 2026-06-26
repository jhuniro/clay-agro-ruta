import { auth, isFirebaseConfigured } from '../lib/firebase';
import { signOut } from 'firebase/auth';

const STORAGE_KEY = 'agroruta_current_user_uid';

// Retorna el UID del usuario logueado actualmente (real o simulado)
export const getCurrentUserUid = (): string | null => {
  if (isFirebaseConfigured && auth) {
    return auth.currentUser?.uid || null;
  }
  // En modo simulado, recuperamos el UID guardado en localStorage
  return localStorage.getItem(STORAGE_KEY);
};

// Establece el UID del usuario en el storage para simular la sesión
export const loginSimulated = (uid: string): void => {
  localStorage.setItem(STORAGE_KEY, uid);
};

// Cierra la sesión
export const logoutUser = async (): Promise<void> => {
  if (isFirebaseConfigured && auth) {
    await signOut(auth);
  }
  localStorage.removeItem(STORAGE_KEY);
};
