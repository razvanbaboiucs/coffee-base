<template>
    <UContainer :class="showViewBasketButton() ? 'w-full items-center flex flex-row align-middle mb-4' : 'hidden'">
        <UButton size="xl" to="/cart" class="w-full flex flex-row items-center justify-center">
            <p>View basket</p>
            <p>{{ cartStore.totalCost }} euros</p>
        </UButton>
    </UContainer>
</template>

<script setup>
const currentRoute = useRoute()
const cartStore = useCartStore()

function showViewBasketButton() {
    return !cartStore.isEmpty() && currentRoute.name !== 'cart'
}
</script>