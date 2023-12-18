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
        <UModal v-model="isPayModalOpen">
            <UCard class="p-3">
                <template #header>
                    <div class="flex flex-row justify-center">
                        <p class="text-2xl font-bold text-primary">Order successful</p>
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
</template>

<script setup lang="ts">
const props = defineProps<{
    name: string,
    description: string,
    cost: number,
    buyDisabled: boolean,
    id: number
}>()

const isModalOpen = ref(false)
const isPayModalOpen = ref(false)
const toast = useToast()

async function buyWithPoints() {
    isModalOpen.value = false
    isPayModalOpen.value = true
    const error = await buyProductWithPoints(props.id, props.name, props.cost)
    if (error) {
        toast.add({ title: 'Error', description: error.message, color: 'red' })
    }
    setTimeout(() => {
        isPayModalOpen.value = false
    }, 2800)
}
</script>