<template>
  <div>
    <div class="justify-between flex flex-row mb-4">
      <p class="font-bold text-primary text-2xl">Resources</p>
      <UButton @click="isOpen = true" class="justify-center">
        Add resource
      </UButton>

    </div>
    <UTable :rows='rows' :columns="columns">
      <template #actions-data="{ row }">
        <UDropdown :items="actions(row)">
          <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
        </UDropdown>
      </template>
    </UTable>
  </div>
  <UModal v-model="isOpen" class="min-w-xl min-h-2xl" prevent-close>
    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        <p class="h-8 font-bold text-xl">Add new resource</p>
      </template>
      <UForm :validate="validate" :state="state" class="space-y-3 flex flex-col justify-center align-middle"
        @submit="onSubmit">
        <UFormGroup name="file" label="File">
          <input @change="updateFile" type="file" />
        </UFormGroup>
        <UFormGroup name="fileName" label="File name">
          <UInput v-model="state.fileName" />
        </UFormGroup>
        <UFormGroup name="description" label="Description">
          <UTextarea v-model="state.description" />
        </UFormGroup>
        <div class="flex flex-row justify-between space-x-3">
          <UButton :loading='uploadingInProgress' class="justify-center px-4" color="gray" variant="outline" size="md"
            @click="closeModal">
            Cancel
          </UButton>
          <UButton :loading='uploadingInProgress' type="submit" class="justify-center px-4" size="md">
            Add file
          </UButton>
        </div>
      </UForm>
    </UCard>

  </UModal>
</template>

<script setup>
const supabase = useSupabaseClient()
const { data: rows } = await useAsyncData('resources', getResources)
const state = reactive({
  file: undefined,
  fileName: undefined,
  description: undefined
})
const isOpen = ref(false)
const uploadingInProgress = ref(false)
const toast = useToast()

const columns = [{
  key: 'name',
  label: 'Name'
}, {
  key: 'description',
  label: 'Description'
}, {
  key: 'path',
  label: 'File path'
}, {
  key: 'actions'
}]

const actions = (row) => [
  [{
    label: 'Download',
    icon: 'i-heroicons-arrow-down-tray-20-solid',
    click: () => downloadFile(row.path)
  }]
]

const validate = (state) => {
  const errors = []
  if (!state.file) errors.push({ path: 'file', message: 'Required' })
  if (!state.fileName) errors.push({ path: 'fileName', message: 'Required' })
  if (!state.description) errors.push({ path: 'description', message: 'Required' })
  return errors
}

function closeModal() {
  state.file = undefined
  state.fileName = undefined
  state.description = undefined
  isOpen.value = false
}

function updateFile(event) {
  state.file = event.target.files[0]
}

async function onSubmit() {
  uploadingInProgress.value = true
  const uploadedToStorage = await uploadFile(state.file)
  if (uploadedToStorage) {
    await insertResource()
  }
  uploadingInProgress.value = false
}

async function insertResource() {
  const newResource = {
    name: state.fileName,
    description: state.description,
    path: state.file.name
  }
  const { error } = await supabase.from('resources').insert(newResource)
  if (error) {
    toast.add({ title: "Error", description: error, color: "red" })
  }
  else {
    rows.value = [...rows.value, newResource]
    toast.add({ title: "Success", description: "Resource added successfully" })
    isOpen.value = false
  }
}

async function uploadFile(file) {
  const { error } = await supabase.storage.from('resources').upload(`public/${file.name}`, file)
  if (error) {
    toast.add({ title: "Error", description: error, color: "red" })
    return false
  }
  else {
    return true
  }
}

async function getResources() {
  const { data: resources } = await supabase.from('resources').select('name,description,path')
  return resources
}

async function downloadFile(path) {
  const { data } = await supabase.storage.from('resources').createSignedUrls([`public/${path}`], 60)
  window.open(data[0].signedUrl, '_blank')
}
</script>


