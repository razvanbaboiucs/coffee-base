<template>
  <UCard>
    <div class="flex flex-col space-y-1">
      <p class="font-semibold text-2xl mb-2">Level {{ user.level }}</p>
      <p class="font-medium text-gray-500">You need {{ user.level * 100 - user.points }} more points to get to the next level
        and unlock more special offers.</p>
      <UMeter :max="user.level * 100" :value="user.points" size="lg">
        <template #indicator="{ percent }">
          <div class="text-sm text-right font-semibold text-md">
            {{ user.points }}/{{ user.level * 100 }} points
          </div>
        </template>
      </UMeter>
    </div>
  </UCard>
</template>

<script setup>
 const { data: user } = await useAsyncData('user', getUser);
</script>