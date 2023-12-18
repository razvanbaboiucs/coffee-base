export default async function () {
  const user = useSupabaseUser()
  const supabase = useSupabaseClient()

  const { data, error } = await supabase.from('orders')
        .select('id, state, item_summary, total, user_id, points_used')
        .order('id', {ascending: false})
        .eq('user_id', user?.value?.id || '')
    if (error) {
        throw error
    }
    return [
      ...data.map(order => {
        return {
          id: order.id,
          state: order.state,
          total: order.total,
          itemSummary: order.item_summary,
          userId: order.user_id,
          pointsUsed: order.points_used
        }
      })
    ] as Order[]
}