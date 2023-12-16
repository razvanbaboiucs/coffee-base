export default async function () {
  const user = useSupabaseUser()
  const supabase = useSupabaseClient()

  const { data, error } = await supabase.from('orders')
        .select('id, state, item_summary')
        .eq('user_id', user?.value?.id || '')
    if (error) {
        throw error
    }
    return [
      ...data.map(order => {
        return {
          id: order.id,
          state: order.state,
          itemSummary: order.item_summary
        }
      })
    ] as Order[]
}