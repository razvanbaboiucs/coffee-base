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
  orders: declinedOrders
}]

const supabase = useSupabaseClient()
const toast = useToast()
supabase.channel("orders")
  .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'orders' }, payload => {
    const order = {
      ...payload.new,
      itemSummary: payload.new.item_summary,
      userId: payload.new.user_id,
      pointsUsed: payload.new.points_used
    } as Order

    newOrders.value?.unshift(order)

    toast.add({title: 'New order', description: 'New order has been placed', color: 'green'})
  })
  .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'orders' }, payload => {
    const order = {
      ...payload.new,
      itemSummary: payload.new.item_summary,
      userId: payload.new.user_id,
      pointsUsed: payload.new.points_used
    } as Order

    if (order.state === 'declined') {
      declinedOrders.value?.unshift(order)
      newOrders.value = newOrders.value?.filter(o => o.id !== order.id)
      toast.add({title: 'Order declined', description: `Order ${order.id} has been declined`, color: 'red'})
    }
    else if (order.state === 'pending') {
      pendingOrders.value?.unshift(order)
      newOrders.value = newOrders.value?.filter(o => o.id !== order.id)
      toast.add({title: 'Order accepted', description: `Order ${order.id} has been accepted`, color: 'cyan'})
    }
    else {
      finishedOrders.value?.unshift(order)
      pendingOrders.value = pendingOrders.value?.filter(o => o.id !== order.id)
      toast.add({title: 'Order finished', description: `Order ${order.id} is ready for pickup`, color: 'green'})
    }

  })

  .subscribe()

</script>