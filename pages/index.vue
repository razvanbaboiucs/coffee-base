<template>
    <p class="text-2xl font-semibold">Click and collect</p>
    <ul class="flex flex-row items-stretch overflow-x-scroll overflow-y-hidden h-60 space-x-4">
        <li v-for="item in items" class="h-full mt-2">
            <UCard class="p-2 w-56 h-56 bg-primary-800/10">
                <div class="flex flex-col justify-center align-middle items-center my-1">
                    <img :src="item.imagePath" class="w-32 h-20 "/>
                </div>
                <div class="flex flex-row justify-between mt-2">
                    <p class="text-xl font-semibold">{{ item.name }}</p>
                    <p class="text-lg font-semibold">{{ item.price }} lei</p>
                </div>
                <div class="flex flex-row justify-between mt-7">
                    <UButton icon="i-heroicons-heart" size="md" variant="soft"/>
                    <UButton label="Add" icon="i-heroicons-shopping-cart"/>
                </div>
            </UCard>
        </li>
    </ul>
</template>

<script setup>
const items = [
    {
        name: 'Espresso',
        price: 12.00,
        imagePath: '/espresso.svg'
    },
    {
        name: 'Cappucino',
        price: 16.00,
        imagePath: '/cappucino.svg'
    },
    {
        name: 'Flat white',
        price: 17.00,
        imagePath: '/flatwhite.svg'
    },
    {
        name: 'Latte',
        price: 18.00,
        imagePath: '/latte.svg'
    },
    {
        name: 'Americano',
        price: 13.00,
        imagePath: '/americano.svg'
    },
]
</script>