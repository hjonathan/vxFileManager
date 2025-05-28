<template>
  <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
    <ItemView v-for="item in data"
      :key="item.name"
      :data="item" >
      <template #image>
        <FolderIcon class="size-8 bg-gray-50" />
      </template>
    </ItemView>

    <!-- More people... -->
  </ul>
</template>

<script setup>
import { FolderIcon } from '@heroicons/vue/24/outline'
import ItemView from './ItemView.vue'

const data = [
  {
    name: 'Folder test',
    description: 'This is a description of the folder test',
    lastModified: '2023-01-23T13:23Z',
    lastModifiedBy: 'John Doe'
  },
  {
    name: 'Folder test 2',
    description: 'This is a description of the folder test 2',
    lastModified: '2023-01-23T13:23Z',
    lastModifiedBy: 'Jane Doe'
  },
  {
    name: 'Folder test 2',
    description: 'This is a description of the folder test 2',
    lastModified: '2023-01-23T13:23Z',
    lastModifiedBy: 'Jane Doe'
  },
  {
    name: 'Folder test 2',
    description: 'This is a description of the folder test 2',
    lastModified: '2023-01-23T13:23Z',
    lastModifiedBy: 'Jane Doe'
  },
  {
    name: 'Folder test',
    description: 'This is a description of the folder test',
    lastModified: '2023-01-23T13:23Z',
    lastModifiedBy: 'John Doe'
  },
  {
    name: 'Folder test 2',
    description: 'This is a description of the folder test 2',
    lastModified: '2023-01-23T13:23Z',
    lastModifiedBy: 'Jane Doe'
  },
  {
    name: 'Folder test 2',
    description: 'This is a description of the folder test 2',
    lastModified: '2023-01-23T13:23Z',
    lastModifiedBy: 'Jane Doe'
  },
  {
    name: 'Folder test 2',
    description: 'This is a description of the folder test 2',
    lastModified: '2023-01-23T13:23Z',
    lastModifiedBy: 'Jane Doe'
  },
  {
    name: 'Folder test',
    description: 'This is a description of the folder test',
    lastModified: '2023-01-23T13:23Z',
    lastModifiedBy: 'John Doe'
  },
  {
    name: 'Folder test 2',
    description: 'This is a description of the folder test 2',
    lastModified: '2023-01-23T13:23Z',
    lastModifiedBy: 'Jane Doe'
  },
  {
    name: 'Folder test 2',
    description: 'This is a description of the folder test 2',
    lastModified: '2023-01-23T13:23Z',
    lastModifiedBy: 'Jane Doe'
  },
  {
    name: 'Folder test 2',
    description: 'This is a description of the folder test 2',
    lastModified: '2023-01-23T13:23Z',
    lastModifiedBy: 'Jane Doe'
  },
  {
    name: 'Folder test',
    description: 'This is a description of the folder test',
    lastModified: '2023-01-23T13:23Z',
    lastModifiedBy: 'John Doe'
  },
  {
    name: 'Folder test 2',
    description: 'This is a description of the folder test 2',
    lastModified: '2023-01-23T13:23Z',
    lastModifiedBy: 'Jane Doe'
  },
  {
    name: 'Folder test 2',
    description: 'This is a description of the folder test 2',
    lastModified: '2023-01-23T13:23Z',
    lastModifiedBy: 'Jane Doe'
  },
  {
    name: 'Folder test 2',
    description: 'This is a description of the folder test 2',
    lastModified: '2023-01-23T13:23Z',
    lastModifiedBy: 'Jane Doe'
  },
  {
    name: 'Folder test',
    description: 'This is a description of the folder test',
    lastModified: '2023-01-23T13:23Z',
    lastModifiedBy: 'John Doe'
  },
  {
    name: 'Folder test 2',
    description: 'This is a description of the folder test 2',
    lastModified: '2023-01-23T13:23Z',
    lastModifiedBy: 'Jane Doe'
  },
  {
    name: 'Folder test 2',
    description: 'This is a description of the folder test 2',
    lastModified: '2023-01-23T13:23Z',
    lastModifiedBy: 'Jane Doe'
  },
  {
    name: 'Folder test 2',
    description: 'This is a description of the folder test 2',
    lastModified: '2023-01-23T13:23Z',
    lastModifiedBy: 'Jane Doe'
  },
  {
    name: 'Folder test',
    description: 'This is a description of the folder test',
    lastModified: '2023-01-23T13:23Z',
    lastModifiedBy: 'John Doe'
  },
  {
    name: 'Folder test 2',
    description: 'This is a description of the folder test 2',
    lastModified: '2023-01-23T13:23Z',
    lastModifiedBy: 'Jane Doe'
  },
  {
    name: 'Folder test 2',
    description: 'This is a description of the folder test 2',
    lastModified: '2023-01-23T13:23Z',
    lastModifiedBy: 'Jane Doe'
  },
  {
    name: 'Folder test 2',
    description: 'This is a description of the folder test 2',
    lastModified: '2023-01-23T13:23Z',
    lastModifiedBy: 'Jane Doe'
  }
]
</script>

<style scoped></style>