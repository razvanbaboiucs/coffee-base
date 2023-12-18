<template>
    <div>
        <ul class="space-y-2">
            <li v-for="order in orders">
                <OrdersCard :id="order.id" :item-summary="order.itemSummary" :total="order.total" :state="order.state" :user-id="order.userId" :points-used="order.pointsUsed"/>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    orders: Order[]
}>()
</script>