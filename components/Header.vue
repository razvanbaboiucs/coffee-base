<template>
    <div class="flex flex-row justify-between mb-6">
        <div class="flex flex-row">
            <UButton icon="i-heroicons-chevron-left" :class="currentRoute.name !== 'cart' ? 'hidden' : 'mr-2'" size="xl"
                variant="ghost" @click="router.back()" />
            <h1 class="text-4xl font-bold text-primary flex items-center justify-center">
                {{ routeToTitleMap[currentRoute.name] }}
            </h1>
        </div>
        <div :class="currentRoute.name === 'cart' && 'hidden'" class="flex items-center justify-center">
            <UChip size="xl">
                <UButton icon="i-heroicons-bell" size="xl" variant="soft" />
            </UChip>
        </div>
    </div>
</template>

<script setup>
const currentRoute = useRoute()
const router = useRouter()

const routeToTitleMap = {
    index: 'Home',
    profile: 'Your profile',
    wallet: 'Your wallet',
    orders: 'Your orders',
    cart: 'Cart'
}
</script>