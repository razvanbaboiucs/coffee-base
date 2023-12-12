<template>
    <UContainer class="flex min-h-full flex-1 flex-col h-screen justify-center px-6 max-w-md">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <img class="mx-auto h-20 w-auto" src="/logo.svg" alt="Nuxt + Supabase" />
            <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-primary">Sign in to your account
            </h2>
        </div>

        <UForm :validate="validate" :state="state" class="space-y-4 flex flex-col" @submit="onSubmit">
            <UFormGroup label="Email" name="email">
                <UInput v-model="state.email" icon="i-heroicons-envelope" />
            </UFormGroup>

            <UFormGroup label="Password" name="password">
                <UInput v-model="state.password" type="password" icon="i-heroicons-key" />
            </UFormGroup>

            <UButton type="submit" class="justify-center">
                Submit
            </UButton>
        </UForm>

        <p class="mt-10 text-center text-sm text-secondary">
            Not a member?
            {{ ' ' }}
            <a href="/signup" class="font-semibold leading-6 text-primary hover:text-primary-500">Create an account</a>
        </p>

    </UContainer>
</template>

<script setup>

definePageMeta({
    layout: 'empty'
})

const supabase = useSupabaseClient()
const user = useSupabaseUser()
const toast = useToast()

const state = reactive({
    email: undefined,
    password: undefined
})

const validate = (state) => {
    const errors = []
    if (!state.email) errors.push({ path: 'email', message: 'Required' })
    if (!state.password) errors.push({ path: 'password', message: 'Required' })
    return errors
}

async function onSubmit(event) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: event.data.email,
        password: event.data.password
    })
    if (error) {
        toast.add({ title: 'Error', description: error, color: 'red' })
    }
}

watch(user, () => {
    if (user.value) {
        return navigateTo("/")
    }
}, { immediate: true })
</script>