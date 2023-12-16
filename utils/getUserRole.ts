export default async function (): Promise<UserRoleEnum> {
    const supabase = useSupabaseClient()
    const user = useSupabaseUser()
    const { data: roles, error } = await supabase.from('users').select('role').eq('id', user?.value?.id || '')
    if (error) {
        console.error(error)
        return UserRoleEnum.basic_user
    }
    return roles[0].role as UserRoleEnum
}