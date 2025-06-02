<template>
  <ul role="list" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 p-4">
    <ItemView v-for="item in data"
      :key="item.name"
      :data="item" >
      <template #image>
        <GridIcon :item="item" />
      </template>
    </ItemView>

    <!-- More people... -->
  </ul>
</template>

<script setup>
import ItemView from './ItemView.vue'
import { ContentType, FolderType } from '../../../mainHandler/types'
import GridIcon from './GridIcon.vue'

const props = defineProps({
  data: {
    type: [ContentType, FolderType],
    required: true
  }
})
</script>

<style scoped></style>