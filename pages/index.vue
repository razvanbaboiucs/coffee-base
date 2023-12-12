<template>
    <div v-if="role === 'admin'">
        <AdminView />
    </div>
    <div v-else-if="role === 'basic_user'">
        <BasicUserView />
    </div>
</template>

<script setup>
const { data: role } = await useAsyncData('role', userRole)
</script>