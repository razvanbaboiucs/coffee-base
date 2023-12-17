<template>
  <div>
    <UTabs :items="items">
      <template #item="{item, index}">
        <OrdersList :orders="item.orders.value"/>
      </template>
    </UTabs>
  </div>
</template>

<script lang="ts" setup>
const {data: orders} = await useAsyncData('allOrders', getAllOrders)
const newOrders = ref(orders.value?.filter(order => order.state === 'new'))
const pendingOrders = ref(orders.value?.filter(order => order.state === 'pending'))
const finishedOrders = ref(orders.value?.filter(order => order.state === 'finished'))
const declinedOrders = ref(orders.value?.filter(order => order.state === 'declined'))

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

const supabase = useSupabaseClient()
const toast = useToast()
supabase.channel("orders")
  .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'orders' }, payload => {
    const newResource = payload.new
    toast.add({title: 'New order', description: 'New order has been placed', color: 'green'})
    newOrders.value?.unshift({
      ...newResource,
      itemSummary: newResource.item_summary
    } as Order)
  })
  .subscribe()

</script>