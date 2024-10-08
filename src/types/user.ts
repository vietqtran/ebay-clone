export type User = {
   id?: string
   email: string
   hashed_password?: string
   name?: string
   first_name?: string
   last_name?: string
   provider: AuthProvider
   role?: UserRole
   avatar_url?: string
   created_at?: Date
   updated_at?: Date
   is_verified?: boolean
}

export enum UserRole {
   USER = 'user',
   ADMIN = 'admin',
   VENDOR = 'vendor',
   STAFF = 'staff'
}

export type LoginCredentials = {
   email: string
   password: string
}

export type RegisterPersonalCredentials = {
   first_name: string
   last_name: string
   email: string
   password: string
   provider: AuthProvider
}

export type RegisterBusinessCredentials = {
   user_id: string
   description?: string
   business_name: string
   country: string
   logo_url?: string
}

type AuthProvider = 'google' | 'facebook' | 'email'
