<template>
Profile
<br/>
<UButton label="Logout" color="white" variant="ghost" @click="logout" />
</template>

<script setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()

async function logout() {
    await supabase.auth.signOut()
}

watch(user, () => {
    if (!user.value) {
        return navigateTo('/login')
    }
}, { immediate: true })
</script>