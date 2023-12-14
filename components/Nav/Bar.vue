<template>
    <div class="flex flex-wrap justify-between items-center">
        <UContainer>
            <ul class="flex font-normal flex-row space-x-12 mt-0">
                <li v-for="route in routes">
                    <ULink :to='route.route' active-class="text-primary font-extrabold" class="flex flex-col items-center"
                        inactive-class="text-gray-500 hover:text-gray-700">
                        <UIcon :name='route.icon' class="text-xl" />
                        <p class="text-xs">
                            {{ route.name }}
                        </p>
                    </ULink>
                </li>
            </ul>
        </UContainer>
    </div>
</template>

<script setup>
const routes = [
    {
        name: 'Home',
        route: '/',
        icon: 'i-heroicons-home'
    },
    {
        name: 'Wallet',
        route: '/wallet',
        icon: 'i-heroicons-wallet'
    },
    {
        name: 'Orders',
        route: '/orders',
        icon: 'i-heroicons-document-text'
    },
    {
        name: 'Profile',
        route: '/profile',
        icon: 'i-heroicons-user'
    }
]
</script>