export default async function (id) {
  const supabase = useSupabaseClient()
  const {error} = await supabase.from('orders').update({state: 'pending'}).eq('id', id)
  return error
}