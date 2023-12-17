<template>
    <div class="min-h-screen dark:bg-zinc-900 mb-28">
        <div class="py-7">
            <main>
                <div class="mx-auto max-w-7xl px-3">
                    <Header/>
                    <slot />
                </div>
            </main>
        </div>
        <nav v-if="userRole === 'basic_user'" class="px-1 py-3 bg-primary-800/20 backdrop-blur fixed bottom-0 min-w-full rounded-t-2xl">
            <NavCartButton/>
            <NavBar/>
        </nav>
    </div>
</template>

<script setup>
const {data: userRole} = await useAsyncData('userRole', getUserRole)
</script>