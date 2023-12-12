<template>
  <div>
    <p class="font-bold text-primary text-2xl mb-4">Access requests</p>
    <UTable :rows='rowsRef' :columns="columns">
      <template #status-data="{ row }">
        <UBadge :color="row.status === 'accepted' ? 'green' : row.status === 'denied' ? 'red' : 'cyan'" variant="subtle">
          {{ row.status }}</UBadge>
      </template>
      <template #actions-data="{ row }">
        <UDropdown :items="actions(row)">
          <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
        </UDropdown>
      </template>
    </UTable>
  </div>
</template>

<script setup>
const columns = [{
  key: 'id',
  label: 'ID'
}, {
  key: 'userEmail',
  label: 'User email'
}, {
  key: 'resourceName',
  label: 'Resource name'
}, {
  key: 'status',
  label: 'Request status'
}, {
  key: 'actions',
}]

const actions = (row) => [
  [{
    label: 'Accept',
    icon: 'i-heroicons-check-20-solid',
    click: () => acceptRequest(row.id)
  }, {
    label: 'Deny',
    icon: 'i-heroicons-x-mark-20-solid',
    click: () => denyRequest(row.id)
  }]
]

const supabase = useSupabaseClient()
const toast = useToast()

const { data: rows } = await useAsyncData('accessRequests', getAccessRequests)
const rowsRef = ref(rows)

supabase.channel("access_requests_channel")
  .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'access_requests' }, payload => {
    const newAccessRequest = payload.new
    rowsRef.value = rowsRef.value.map(element => {
      if (element.id === newAccessRequest.id) {
        element.status = newAccessRequest.status
      }
      return element
    });
  })
  .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'access_requests' }, payload => {
    onNewAccessRequestAdded(payload.new)
    toast.add({ title: 'Notification', description: 'A new access request has been added' })
  })
  .subscribe()

async function onNewAccessRequestAdded(request) {
  const { data: newAccessRequest } = await supabase.from('access_requests').select('id,resources(name),users(email),status').eq('id', request.id).limit(1)
  rowsRef.value.push({
    id: newAccessRequest[0].id,
    userEmail: newAccessRequest[0].users.email,
    resourceName: newAccessRequest[0].resources.name,
    status: newAccessRequest[0].status
  })
}

async function getAccessRequests() {
  const { data: accessRequests } = await supabase.from('access_requests').select('id,resources(name),users(email),status')
  return accessRequests.map(element => {
    return {
      id: element.id,
      userEmail: element.users.email,
      resourceName: element.resources.name,
      status: element.status
    }
  }) || []
}

async function acceptRequest(requestId) {
  const { error } = await supabase.from('access_requests').update({ status: 'accepted' }).eq('id', requestId)
  if (error) {
    toast.add({ title: 'Error', description: error, color: 'red' })
  }
}

async function denyRequest(requestId) {
  const { error } = await supabase.from('access_requests').update({ status: 'denied' }).eq('id', requestId)
  if (error) {
    toast.add({ title: 'Error', description: error, color: 'red' })
  }
}

</script>

