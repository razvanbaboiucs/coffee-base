<template>
  <div>

    <div v-if="cartStore.isEmpty()">
      <UContainer class="flex flex-col items-center mt-20">
        <UIcon name="i-heroicons-shopping-cart" class="text-xl" />
        <p class="font-semibold">
          Cart is empty
        </p>
      </UContainer>
    </div>
    <div v-else>

      <ul class="space-y-4 mb-4">
        <li v-for="item in cartStore.items" class="space-y-2">
          <CartItem :item="item" />
          <UDivider />
        </li>
      </ul>
      <UContainer class="space-y-6 bottom-0">
        <div class="flex flex-row justify-between">
          <p class="text-lg font-semibold">Total</p>
          <p class="text-lg font-semibold">{{ cartStore.totalCost }} euros</p>
        </div>
        <UButton size="xl" to="/cart" class="w-full flex flex-row items-center justify-center" @click="pay">
          <p>Pay</p>
        </UButton>
      </UContainer>
      <UModal v-model="isPayModalOpen">
        <UCard class="p-3">
          <template #header>
            <div class="flex flex-row justify-center">
              <p class="text-2xl font-bold text-primary">Payment successful</p>
            </div>
          </template>
          <UContainer>
            <ClientOnly>
              <div class="flex flex-col justify-center align-middle items-center my-1">
                <img src="/success-animation.gif" class="w-32 h-32 " />
              </div>
            </ClientOnly>
          </UContainer>
        </UCard>
      </UModal>
    </div>
  </div>
</template>

<script setup>
const cartStore = useCartStore()
const user = useSupabaseUser()
const supabase = useSupabaseClient()
const toast = useToast()
const isPayModalOpen = ref(false)

async function pay() {
  isPayModalOpen.value = true
  const orderSummary = cartStore.orderSummary()
  const { error } = await supabase.from('orders').insert({
    user_id: user.value?.id,
    state: 'new',
    item_summary: orderSummary,
    total: orderSummary.totalCost
  })
  if (error) {
    toast.add({ title: 'Error', description: error.message, color: 'red' })
  }
  setTimeout(() => {
    cartStore.emptyCart()
    isPayModalOpen.value = false
  }, 2800)
}
</script>