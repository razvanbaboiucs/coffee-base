<template>
    <p class="text-2xl font-semibold">Click and collect</p>
    <ul class="flex flex-row items-stretch overflow-x-scroll overflow-y-hidden h-60 space-x-4">
        <li v-for="item in items" class="h-full mt-2">
            <ClickAndCollectCard :id='item.id' :image-path="item.imagePath" :name="item.name" :price="item.price" :description="item.description" />
        </li>
    </ul>
</template>

<script setup>
const items = [
    {
        id: 1,
        name: 'Espresso',
        description: 'This is a really cool drink. Might have some milk, might not, who knows.',
        price: 12.00,
        imagePath: '/espresso.svg'
    },
    {
        id: 2,
        name: 'Cappucino',
        description: 'This is a really cool drink. Might have some milk, might not, who knows.',
        price: 16.00,
        imagePath: '/cappucino.svg'
    },
    {
        id: 3,
        name: 'Flat white',
        description: 'This is a really cool drink. Might have some milk, might not, who knows.',
        price: 17.00,
        imagePath: '/flatwhite.svg'
    },
    {
        id: 4,
        name: 'Latte',
        description: 'This is a really cool drink. Might have some milk, might not, who knows.',
        price: 18.00,
        imagePath: '/latte.svg'
    },
    {
        id: 5,
        name: 'Americano',
        description: 'This is a really cool drink. Might have some milk, might not, who knows.',
        price: 13.00,
        imagePath: '/americano.svg'
    }
]

</script>