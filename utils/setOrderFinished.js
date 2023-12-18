export default async function (id) {
  const supabase = useSupabaseClient()
  const {error} = await supabase.from('orders').update({state: 'finished'}).eq('id', id)
  return error
}