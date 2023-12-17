<template>
    <ul class="space-y-2">
        <li v-for="order in orders">
            <UCard @click="openOrder(order.id)">
                <div class="flex flex-row justify-between items-center w-full space-x-4">
                    <div class="w-3/12">
                        <UBadge :label="order.state" :color="getOrderStateBadgeColor(order.state)" variant="subtle" />
                    </div>
                    <div class="flex flex-col space-y-1 w-6/12">
                        <ul>
                            <li v-for="(item, index) in order.itemSummary.items">
                                <div v-if="index < 2" class="flex flex-row justify-between space-x-4">
                                    <p>{{ item.quantity }} x {{ item.name }}</p>
                                </div>
                            </li>
                            <li v-if="order.itemSummary.items.length > 2">
                                ...
                            </li>
                        </ul>
                    </div>
                    <p class="font-normal text-lg w-3/12 text-right">{{ order.total }} euros</p>
                </div>
            </UCard>
        </li>
    </ul>
</template>

<script setup lang="ts">
const props = defineProps<{
    orders: Order[]
}>()

const router = useRouter()

function openOrder(orderId: number) {
    router.push(`/orders/${orderId}`)
}

function getOrderStateBadgeColor(state: OrderStateEnum) {
    switch (state) {
        case 'new':
            return 'green'
        case 'pending':
            return 'cyan'
        case 'declined':
            return 'red'
        case 'finished':
            return 'primary'
    }
}
</script>