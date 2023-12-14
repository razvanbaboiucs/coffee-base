<template>
  <NuxtLoadingIndicator /> 
  <NuxtLayout>
    <NuxtPage/>
  </NuxtLayout>
  <UNotifications />
  <SpeedInsights/>
</template>

<script setup>
import {SpeedInsights} from '@vercel/speed-insights/nuxt'
</script>