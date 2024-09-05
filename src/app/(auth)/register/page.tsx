import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function Page() {
   const cookieStore = cookies()
   const supabase = createClient(cookieStore)

   const { data: todos } = await supabase.from('todos').select()
   console.log(todos)
   return <ul>{todos?.map((todo: any) => <li key={todo.id}>{todo.created_at}</li>)}</ul>
}
