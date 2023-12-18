<template>
    <UContainer class="flex flex-col items-center justify-center space-y-3">
        <UForm :validate="validate" :state='state' class="space-y-4 flex flex-col" @submit="onSubmit">
            <UFormGroup label="Email" name="email">
                <UInput v-model="state.email" icon="i-heroicons-envelope" disabled />
            </UFormGroup>
            <div v-if="userRole === 'basic_user'">
                <UFormGroup label="First name" name="firstName">
                    <UInput v-model="state.firstName" icon="i-heroicons-user" />
                </UFormGroup>
                <UFormGroup label="Last name" name="lastName">
                    <UInput v-model="state.lastName" icon="i-heroicons-user" />
                </UFormGroup>
            </div>
            <div v-else>
                <UFormGroup label="Coffee shop name" name="coffeeShopName">
                    <UInput v-model="state.coffeeShopName" icon="i-heroicons-user" />
                </UFormGroup>
            </div>
            <UButton type="submit" class="justify-center">
                Update
            </UButton>
        </UForm>

        <UButton label="Logout" color="white" @click="logout" />
    </UContainer>
</template>

<script setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const toast = useToast()
const { data: userRole } = await useAsyncData('userRole', getUserRole)

const { data: userData } = await useAsyncData('user', getUser)
const state = reactive({
    email: userData.value.email,
    firstName: userData.value.firstName,
    lastName: userData.value.lastName,
    coffeeShopName: userData.value.coffeeShopName
})

async function onSubmit() {
    const updateObject = userRole === 'basic_user'
        ? { first_name: state.firstName, last_name: state.lastName }
        : { coffee_shop_name: state.coffeeShopName }
    const { error } = await supabase.from('users').update(updateObject).eq('id', user.value.id)
    if (error) {
        toast.add({ title: 'Error', description: error, color: 'red' })
    }
}

const validate = (state) => {
    const errors = []
    if (userRole === 'basic_user') {
        if (!state.firstName) errors.push({ path: 'firstName', message: 'Required' })
        if (!state.lastName) errors.push({ path: 'lastName', message: 'Required' })
    }
    else {
        if (!state.coffeeShopName) errors.push({ path: 'coffeeShopName', message: 'Required' })
    }
    return errors
}

async function logout() {
    await supabase.auth.signOut()
}

watch(user, () => {
    if (!user.value) {
        return navigateTo('/login')
    }
}, { immediate: true })
</script>