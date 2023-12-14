<template>
    <UCard class="p-2 w-56 h-56 bg-primary-800/10">
        <div class="flex flex-col justify-center align-middle items-center my-1">
            <img :src="imagePath" class="w-32 h-20 " />
        </div>
        <div class="flex flex-row justify-between mt-2">
            <p class="text-xl font-semibold">{{ name }}</p>
            <p class="text-lg font-semibold">{{ price }} lei</p>
        </div>
        <div class="flex flex-row justify-between mt-7">
            <UButton icon="i-heroicons-heart" size="md" variant="soft" />
            <UButton label="Add" icon="i-heroicons-shopping-cart" @click="isAddToCartModalOpen = true" />
        </div>
    </UCard>
    <UModal v-model="isAddToCartModalOpen">
        <UCard class="p-3">
            <template #header>
                <div class="flex flex-row justify-center">
                    <p class="text-2xl font-bold text-primary">{{ name }}</p>
                </div>
            </template>
            <UContainer>
                <div class="flex flex-col justify-center align-middle items-center my-1">
                    <img :src="imagePath" class="w-32 h-20 " />
                </div>
                <p class="my-1">
                    {{ description }}
                </p>
            </UContainer>
            <template #footer>
                <div class="flex flex-row justify-between items-center space-x-5">
                    <div class="w-1/3 flex flex-row justify-between items-center">
                        <UButton icon="i-heroicons-minus" variant="soft" @click="quantity--" :disabled="quantity < 2" />
                        <p>
                            {{ quantity }}
                        </p>
                        <UButton icon="i-heroicons-plus" variant="soft" @click="quantity++" />
                    </div>
                    <div class="w-2/3">
                        <UButton size="xl" class="flex flex-col w-full p-1" @click="addToCart">
                            <p>
                                Add
                            </p>
                            <p>
                                {{ price }} lei
                            </p>
                        </UButton>
                    </div>
                </div>
            </template>
        </UCard>
    </UModal>
</template>

<script setup lang="ts">
const props = defineProps<{
    imagePath: string,
    name: string,
    description: string,
    price: number,
    id: number
}>()

const isAddToCartModalOpen = ref(false)
const quantity = ref(1)
const cartStore = useCartStore()

const addToCart = () => {
    cartStore.addItem({
        id: props.id,
        name: props.name,
        quantity: quantity.value,
        price: props.price,
        imagePath: props.imagePath
    })

    isAddToCartModalOpen.value = false

}


</script>