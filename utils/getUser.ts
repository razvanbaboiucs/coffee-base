export default async function (): Promise<User | undefined> {
    const supabase = useSupabaseClient()
    const user = useSupabaseUser()
    const { data, error } = await supabase.from('users')
        .select('id, email, role, first_name, last_name, level, points')
        .eq('id', user?.value?.id || '')
        .limit(1)
    if (error) {
        throw error
    }
    return {
        id: data[0].id,
        email: data[0].email,
        role: data[0].role as UserRoleEnum,
        firstName: data[0].first_name,
        lastName: data[0].last_name,
        level: data[0].level,
        points: data[0].points
    }
}