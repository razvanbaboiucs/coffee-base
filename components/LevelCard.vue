<template>
  <UCard>
    <div class="flex flex-col space-y-1">
      <p class="font-semibold text-2xl mb-2">Level {{ level }}</p>
      <p class="font-medium text-gray-500">You need {{ 100 - numberOfPoints }} more points to get to the next level
        and unlock more special offers.</p>
      <UMeter :max="100" :value="numberOfPoints" size="lg">
        <template #indicator="{ percent }">
          <div class="text-sm text-right font-semibold text-md">
            {{ percent }}/100 points
          </div>
        </template>
      </UMeter>
    </div>
  </UCard>
</template>

<script setup>
const level = ref(1)
const numberOfPoints = ref(42)
</script>