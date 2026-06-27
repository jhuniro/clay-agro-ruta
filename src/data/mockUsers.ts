import { User } from '../types'

export const mockUsers: User[] = [
  {
    id: 'u1',
    name: 'María Flores',
    email: 'maria@gmail.com',
    phone: '987654321',
    address: 'Av. Universitaria 123, Huánuco',
    birthDate: '1985-04-12',
    role: 'farmer',
    password: '12345678'
  },
  {
    id: 'u2',
    name: 'Carlos Ruiz',
    email: 'carlos@gmail.com',
    phone: '976543210',
    address: 'Jr. Dos de Mayo 456, Huánuco',
    birthDate: '1990-11-20',
    role: 'buyer',
    password: '12345678'
  },
  {
    id: 'u3',
    name: 'Juan Pérez',
    email: 'juan@gmail.com',
    phone: '965432109',
    address: 'Carretera Central Km 2, Amarilis',
    birthDate: '1988-08-05',
    role: 'transporter',
    password: '12345678'
  }
]
