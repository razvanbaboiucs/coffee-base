<template>
    <div>
        <div v-if="userRole === 'basic_user'" class="space-y-3">
            <LevelCard />
            <ClickAndCollectList />
            <BuyWithPointsSection />
        </div>
        <div v-if="userRole === 'coffee_shop'" class="space-y-3">
            <CoffeeShopOrdersList/>
        </div>
    </div>
</template>

<script setup>
const {data: userRole} = await useAsyncData('userRole', getUserRole)
</script>