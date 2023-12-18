<template>
  <div class="flex flex-col space-y-1">
    <p class="font-semibold text-2xl mb-2">Buy with points</p>
    <UTabs :items="items">
      <template #item="{ item, index }">
        <div v-if="userLevel < index + 1" class="mb-2">
          <UAlert icon="i-heroicons-exclamation-circle" color="orange" variant="outline" title="Warning" description="You don't have the necessary level to be able to purchase these products"/>
        </div>
        <ul class="space-y-2">
          <li v-for="offer in item.offers">
            <BuyWithPointsCard :name="offer.name" :buy-disabled="userLevel < index + 1" :cost="offer.cost" :description="offer.description" :id="offer.id" />
          </li>
        </ul>
      </template>
    </UTabs>
  </div>
</template>

<script lang="ts" setup>
const {data: user} = await useAsyncData('user', getUser)
const userLevel = user.value?.level || 1
const items = [{
  label: 'Level 1',
  offers: [{
    id: 1,
    name: 'Espresso',
    cost: 20,
    description: 'The best coffee'
  }, {
    id: 2,
    name: 'Capuccino',
    cost: 35,
    description: 'The best milk coffee'
  }]
}, {
  label: 'Level 2',
  offers: [{
    id: 3,
    name: 'Flat white',
    cost: 40,
    description: 'The best double shot milk coffee'
  }]
}, {
  label: 'Level 3',
  offers: [{
    id: 4,
    name: 'Latte',
    cost: 50,
    description: 'The biggest milk coffee'
  }]
}]
</script>