export default async function () {
  const supabase = useSupabaseClient()

  const { data, error } = await supabase.from('orders')
        .select('id, state, item_summary, total')
        .order('id', {ascending: false})
    if (error) {
        throw error
    }
    return [
      ...data.map(order => {
        return {
          id: order.id,
          state: order.state,
          total: order.total,
          itemSummary: order.item_summary
        }
      })
    ] as Order[]
}