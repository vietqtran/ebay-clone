export type User = {
   id?: string
   email: string
   hashed_password?: string
   name?: string
   first_name?: string
   last_name?: string
   provider: AuthProvider
   role_id?: string
   avatar_url?: string
   created_at?: Date
   updated_at?: Date
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
   business_name: string
   business_email: string
   password: string
   country: string
   provider: AuthProvider
}

type AuthProvider = 'google' | 'facebook' | 'email'
