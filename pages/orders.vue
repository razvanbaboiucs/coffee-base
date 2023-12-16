<template>
  <ul class="space-y-2">
    <li v-for="order in orders">
      <UCard>
        <div class="flex flex-row justify-between items-center">
            <div class="flex flex-col space-y-1">
                <p class="font-semibold text-lg">{{ order.id }}</p>
            </div>
        </div>
    </UCard>
    </li>
  </ul>
</template>

<script lang="ts" setup>
const user = useSupabaseUser()
const {data: orders} = await useAsyncData('orders', getOrders)
</script>