<template>
    <div>
        <UCard>
            <div class="flex flex-row justify-between items-center">
                <div class="flex flex-col space-y-1">
                    <p class="font-semibold text-lg">{{ name }}</p>
                    <p class="font-normal text-sm">{{ description }}</p>
                </div>
                <div>
                    <UButton color='primary' variant="outline" :disabled="buyDisabled" @click="isModalOpen = true">
                        {{ cost }} points
                    </UButton>
                </div>
            </div>
        </UCard>
        <UModal v-model="isModalOpen">
            <UCard class="p-3">
                <template #header>
                    <div class="flex flex-row justify-center">
                        <p class="text-2xl font-bold text-primary">{{ name }}</p>
                    </div>
                </template>
                <UContainer>
                    <p class="my-1">
                        {{ description }}
                    </p>
                </UContainer>
                <template #footer>
                    <div class="flex flex-row justify-between items-center space-x-5">
                        <UButton size="xl" block class="flex flex-col p-1" @click="buyWithPoints">
                            <p>Buy</p>
                            <p>{{ cost }} points</p>
                        </UButton>
                    </div>
                </template>
            </UCard>
        </UModal>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    name: string,
    description: string,
    cost: number,
    buyDisabled: boolean
}>()

const isModalOpen = ref(false)

function buyWithPoints() {
    isModalOpen.value = false
}
</script>