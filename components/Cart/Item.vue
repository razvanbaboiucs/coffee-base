<template>
    <div class="flex flex-row justify-between">
        <div class="flex flex-row w-1/4 space-x-5 items-center">
            <img :src="item.imagePath" />
            <div>
                <p class="text-primary font-bold text-xl">
                    {{ item.name }}
                </p>
                <p class="text-lg">
                    {{ item.totalPrice }} lei
                </p>
            </div>
        </div>
        <div class="flex flex-row items-center space-x-2">
            <UButton icon="i-heroicons-minus" variant="soft" @click="cartStore.reduceItemQuantity(item)"/>
            <p>
                {{ item.quantity }}
            </p>
            <UButton icon="i-heroicons-plus" variant="soft" @click="cartStore.increaseItemQuantity(item)" />
        </div>
    </div>
</template>
  
<script lang="ts" setup>
const props = defineProps<{
    item: CartProduct
}>()
const cartStore = useCartStore()
</script>