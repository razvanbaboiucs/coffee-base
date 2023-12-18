export default async (id, name, cost) => {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const { error: orderError } = await supabase.from('orders').insert({
    user_id: user.value?.id,
    state: 'new',
    item_summary: {
      totalCost: 0,
      totalItems: 1,
      items: [{
        id: id,
        name: name,
        quantity: 1,
        price: 0,
        totalPrice: 0
      }]
    },
    total: 0,
    points_used: cost
  })
  if (orderError) {
    return orderError
  }
  const {data} = await supabase.from('users').select('points').eq('id', user.value.id).limit(1)
  const {error: userError} = await supabase.from('users').update({points: data[0].points - cost}).eq('id', user.value.id)
  return userError
}
