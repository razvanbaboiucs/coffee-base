<template>
  <ul class="space-y-4 mb-4">
    <li v-for="item in cartStore.items" class="space-y-2">
      <CartItem :item="item" />
      <UDivider />
    </li>
  </ul>
  <UContainer class="space-y-6 bottom-0">
    <div class="flex flex-row justify-between">
      <p class="text-lg font-semibold">Total</p>
      <p class="text-lg font-semibold">{{ cartStore.totalCost }} lei</p>
    </div>
    <UButton size="xl" to="/cart" class="w-full flex flex-row items-center justify-center">
      <p>Pay</p>
    </UButton>
  </UContainer>
</template>

<script lang="ts" setup>
const cartStore = useCartStore()
</script>