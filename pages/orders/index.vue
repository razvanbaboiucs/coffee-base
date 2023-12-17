<template>
  <OrdersList :orders="orders || []"/>
</template>

<script lang="ts" setup>
const { data: orders } = await useAsyncData('orders', getOrdersDescending)

</script>