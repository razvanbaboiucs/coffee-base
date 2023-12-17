<template>
    <div class="space-y-3">
        <div v-if="userRole === 'basic_user'">
            <LevelCard />
            <ClickAndCollectList />
            <BuyWithPointsSection />
        </div>
        <div v-if="userRole === 'coffee_shop'">
            <CoffeeShopOrdersList/>
        </div>
    </div>
</template>

<script setup>
const {data: userRole} = await useAsyncData('userRole', getUserRole)
</script>