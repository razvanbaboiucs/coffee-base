<template>
  <div>
    <UTabs :items="items">
      <template #item="{item, index}">
        <OrdersList :orders="item.orders"/>
      </template>
    </UTabs>
  </div>
</template>

<script lang="ts" setup>
const {data: orders} = await useAsyncData('allOrders', getAllOrders)
const newOrders = orders.value?.filter(order => order.state === 'new')
const pendingOrders = orders.value?.filter(order => order.state === 'pending')
const finishedOrders = orders.value?.filter(order => order.state === 'finished')
const declinedOrders = orders.value?.filter(order => order.state === 'declined')

const items = [{
  label: 'New',
  orders: newOrders
}, {
  label: 'Pending',
  orders: pendingOrders
}, {
  label: 'Finished',
  orders: finishedOrders
}, {
  label: 'Declined',
  offers: declinedOrders
}]
</script>