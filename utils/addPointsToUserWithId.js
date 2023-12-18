export default async function (userId, pointsToAdd) {
  const supabase = useSupabaseClient()
  const {data} = await supabase.from('users').select('points').eq('id', userId).limit(1)
  const currentPoints = data[0].points
  const finalPoints = currentPoints + pointsToAdd
  let level = 1
  if (finalPoints >= 100) {
    level = 2
  }
  if (finalPoints >= 200) {
    level = 3
  }
  const {error} = await supabase.from('users').update({points: finalPoints, level}).eq('id', userId)
  return error
}
