<template>
    <div class="min-h-screen dark:bg-zinc-900 mb-10">
        <div class="py-7">
            <main>
                <div class="mx-auto max-w-7xl px-3">
                    <div class="flex flex-row justify-between">
                        <h1 class="text-3xl font-bold text-primary mb-6">
                            {{ routeToTitleMap[currentRoute.name] }}
                        </h1>
                        <UBadge class="mb-4 text-sm" variant="outline">
                            {{ role === 'admin' ? 'Admin' : 'Basic user' }}
                        </UBadge>
                    </div>
                    <slot />
                </div>
            </main>
        </div>
        <nav class="px-3 py-2 bg-zinc-800 fixed bottom-0 min-w-full">
            <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                <UContainer>
                    <ul class="flex font-normal flex-row space-x-12 mt-0">
                        <li v-for="route in routes">
                            <ULink :to='route.route' active-class="text-primary" class="flex flex-col items-center"
                                inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                                <UIcon :name='route.icon' class="text-xl" />
                                <p class="text-xs">
                                    {{ route.name }}
                                </p>
                            </ULink>
                        </li>
                    </ul>
                </UContainer>
            </div>
        </nav>
    </div>
</template>

<script setup>

const currentRoute = useRoute()

const routeToTitleMap = {
    index: 'Home',
    profile: 'Your profile',
    wallet: 'Your wallet',
    orders: 'Your orders'
}

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

const { data: role } = await useAsyncData('role', userRole)

</script>