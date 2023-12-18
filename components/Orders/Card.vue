<template>
  <div>
    <UCard @click="openOrderModal = true">
      <div class="flex flex-row justify-between items-center w-full space-x-4">
        <div class="w-3/12 flex flex-col space-y-1">
          <p class="font-semibold justify-center">Order #{{ id }}</p>
          <UBadge class='justify-center' :label="state" :color="getOrderStateBadgeColor()" variant="subtle" />
        </div>
        <div class="flex flex-col space-y-1 w-6/12">
          <ul>
            <li v-for="(item, index) in itemSummary.items">
              <div v-if="index < 2" class="flex flex-row justify-between space-x-4">
                <p>{{ item.quantity }} x {{ item.name }}</p>
              </div>
            </li>
            <li v-if="itemSummary.items.length > 2">
              ...
            </li>
          </ul>
        </div>
        <p class="font-normal text-lg w-3/12 text-right">{{ total }} euros</p>
      </div>
    </UCard>
    <UModal v-model="openOrderModal">
      <UCard class="p-3">
        <template #header>
          <div class="flex flex-row justify-between">
            <p class="text-2xl font-bold text-primary">Order #{{ id }}</p>
            <UBadge :label="state" :color="getOrderStateBadgeColor()" variant="subtle" class="w-1/4 justify-center" />
          </div>
        </template>
        <UContainer>
          <div class="flex flex-col space-y-3">
            <ul>
              <li v-for="(item, index) in itemSummary.items">
                <div class="flex flex-row justify-between space-x-4">
                  <p>{{ item.quantity }} x {{ item.name }}</p>
                </div>
              </li>
            </ul>
            <UDivider/>
            <div class="flex flex-row justify-between">
              <p class="font-semibold">Quantity: {{ itemSummary.totalItems }}</p>
              <p class="font-semibold">Price: {{ total }} euros</p>
            </div>
          </div>
        </UContainer>
        <template #footer>
          <div v-if="userRole === 'coffee_shop'">
            <div v-if="state === 'new'">
              <div class="flex flex-row justify-between">
                <UButton label="Decline" variant="soft" color="red" size="xl" class="w-1/3 justify-center" @click="declineOrder"/>
                <UButton label="Accept" size="xl" class="w-1/3 justify-center" @click="acceptOrder"/>
              </div>
            </div>
            <div v-else-if="state === 'pending'">
              <UButton block label="Finish order" size="xl" @click="finishOrder"/>
            </div>
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  id: number,
  state: OrderStateEnum,
  total: number,
  itemSummary: OrderSummary,
  userId: string
}>()

const {data: userRole} = await useAsyncData('userRole', getUserRole)

function getOrderStateBadgeColor() {
  switch (props.state) {
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

const openOrderModal = ref(false)
const toast = useToast()

async function declineOrder() {
  const error = await setOrderDeclined(props.id)
  if (error) {
    toast.add({title: 'Error', description: error.message})
  }
  openOrderModal.value = false
}

async function acceptOrder() {
  const error = await setOrderPending(props.id)
  if (error) {
    toast.add({title: 'Error', description: error.message})
  }
  await addPointsToUser()
  openOrderModal.value = false
}

async function finishOrder() {
  const error = await setOrderFinished(props.id)
  if (error) {
    toast.add({title: 'Error', description: error.message})
  }
  openOrderModal.value = false
}

async function addPointsToUser() {
  const error = await addPointsToUserWithId(props.userId, props.total)
  if (error) {
    toast.add({title: 'Error', description: error.message})
  }
}
</script>