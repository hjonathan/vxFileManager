<template>
  <li
    :class="data.selected ? 'bg-gray-100' : ''"
    class="col-span-1 flex flex-col rounded-lg text-center  hover:bg-gray-50 hover:cursor-pointer"
    @click="$emit('click')">
    <div class="flex flex-1 flex-col p-8 items-center">
      <slot name="image" />
      <h3 class="w-full mt-6 text-sm font-medium text-gray-900 hover:underline line-clamp-2">{{ data.name }}</h3>
      <dl class="mt-1 flex grow flex-col justify-start text-xs text-gray-500">
        <dd>{{ data.type }}</dd>
        <dd>{{ formattedDate }}</dd>
      </dl>
    </div>
  </li>
</template>

<script setup>
import { computed } from 'vue'
import { ContentType, FolderType } from '../../../mainHandler/types'
import { dateFormat } from '../../config/globalVariables'
import dayjs from 'dayjs'

const data = defineModel('data', {
  type: [ContentType, FolderType],
  required: true
})

const emit = defineEmits(['click'])

const formattedDate = computed(() => {
  return data.value?.appDocCreateDate
  return dayjs(data.value.appDocCreateDate).format(dateFormat)
})
</script>

<style scoped></style>