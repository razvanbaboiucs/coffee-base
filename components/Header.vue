<template>
    <div class="flex flex-row justify-between mb-6">
        <div class="flex flex-row">
            <UButton icon="i-heroicons-chevron-left" :class="showBackButton() ? 'mr-2' : 'hidden'" size="xl" variant="ghost"
                @click="router.back()" />
            <h1 :key="currentRoute.name" class="text-4xl font-bold text-primary flex items-center justify-center">
                {{ routeToTitleMap[currentRoute.name] }}
            </h1>
        </div>
        <div :class="showBackButton() && 'hidden'" class="flex items-center justify-center">
            <div v-if="userRole === 'basic_user'">
                <UChip size="xl">
                    <UButton icon="i-heroicons-bell" size="xl" variant="soft" />
                </UChip>
            </div>
            <div v-else>
                <UButton icon="i-heroicons-user" size="xl" variant="soft" @click="openProfile" />
            </div>
        </div>
    </div>
</template>

<script setup>
const currentRoute = useRoute()
const router = useRouter()
const { data: userRole } = await useAsyncData('userRole', getUserRole)
const routeToTitleMap = {
    index: 'Home',
    profile: 'Your profile',
    wallet: 'Your wallet',
    orders: 'Your orders',
    'orders-id': `Your order`,
    cart: 'Cart'
}

function showBackButton() {
    return ['cart', 'orders-id'].filter(name => name === currentRoute.name).length > 0 
    || (userRole.value === 'coffee_shop' && currentRoute.name === 'profile')
}

function openProfile() {
    router.push("/profile")
}
</script>