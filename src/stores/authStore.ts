import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { AuthState, User, UserRole } from '../types'
import { mockUsers } from '../data/mockUsers'

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      selectedRole: null,
      isAuthenticated: false,
      loginError: null,
      registerError: null,
      registerSuccess: null,
      
      setSelectedRole: (role) => set({ selectedRole: role, loginError: null, registerError: null, registerSuccess: null }),
      
      login: (email, pass) => {
        const { selectedRole } = get()
        // Buscar el usuario por email y contraseña en mockUsers o los registrados dinámicamente
        // Nota: en una DB real, buscaríamos en la DB. Para este MVP, verificamos el email.
        const foundUser = mockUsers.find(u => u.email === email && u.password === pass)
        
        if (!foundUser) {
          set({ loginError: 'Correo o contraseña incorrectos.' })
          return false
        }
        
        if (selectedRole && foundUser.role !== selectedRole) {
          const roleNames: Record<UserRole, string> = { farmer: 'Agricultor', buyer: 'Comprador', transporter: 'Transportista' }
          set({ loginError: `Esta cuenta pertenece al rol ${roleNames[foundUser.role] || foundUser.role}. Ingrese desde la opción correspondiente.` })
          return false
        }
        
        set({ user: foundUser, isAuthenticated: true, loginError: null, selectedRole: foundUser.role })
        return true
      },
      
      register: (userData) => {
        const emailExists = mockUsers.some(u => u.email === userData.email)
        if (emailExists) {
          set({ registerError: 'El correo ya está registrado.' })
          return false
        }
        
        const newUser: User = {
          ...userData,
          id: `u${Date.now()}`
        }
        
        // Lo añadimos temporalmente a mockUsers (en memoria) para que funcione en la sesión
        mockUsers.push(newUser)
        
        set({ registerError: null, registerSuccess: '¡Cuenta creada exitosamente! Redirigiendo a Login...' })
        return true
      },
      
      logout: () => {
        set({ user: null, isAuthenticated: false, selectedRole: null })
      },
      
      clearErrors: () => set({ loginError: null, registerError: null }),
      clearRegisterSuccess: () => set({ registerSuccess: null })
    }),
    {
      name: 'agroruta-auth',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated, selectedRole: state.selectedRole })
    }
  )
)
