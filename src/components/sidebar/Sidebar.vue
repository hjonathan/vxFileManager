<template>
  <!-- Static sidebar for desktop -->
  <div class="w-full flex flex-col text-gray-500">
    <!-- Sidebar component, swap this element with another sidebar if you like -->
    <div class="flex grow flex-col gap-y-5 pl-4 pr-2 ring-1 ring-white/5">
      <HeaderSidebar />
      <nav class="flex flex-1 flex-col">
        <ul role="list" class="flex flex-1 flex-col gap-y-7">
          <li>
            <BaseSection :items="baseItems"/>
          </li>
          <li>
            <HomeBaseSection v-model:items="data" :title="$t('ID_HOME')" @event="onEvent" :enable="true" />
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import HeaderSidebar from './header/HeaderSidebar.vue'
import BaseSection from './baseSection/BaseSection.vue'
import HomeBaseSection from '../sidebar/homeSection/HomeBaseSection.vue';
import { $t } from '../config/globalVariables'
import {
  HomeIcon,
  TrashIcon,
  InboxArrowDownIcon,
  LinkIcon
} from '@heroicons/vue/24/outline'

const emit = defineEmits(['event'])

const data = defineModel('data', {
  type: Array,
  required: true,
})

const baseItems = ref([
  {
    name: 'My Files',
    icon: HomeIcon,
  },
  {
    name: 'Shared with me',
    icon: LinkIcon,
  },
  {
    name: 'Recent Uploads',
    icon: InboxArrowDownIcon,
  },
  {
    name: 'Trash',
    icon: TrashIcon,
  },
])

const onEvent = (event) => {
  emit('event', event)
}
</script>

<style scoped></style>