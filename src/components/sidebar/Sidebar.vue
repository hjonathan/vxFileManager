<template>
  <!-- Static sidebar for desktop -->
  <div class="hidden xl:inset-y-0 xl:z-50 xl:flex xl:w-72 xl:flex-col text-gray-500 overflow-scroll">
    <!-- Sidebar component, swap this element with another sidebar if you like -->
    <div class="flex grow flex-col gap-y-5 overflow-y-auto px-6 ring-1 ring-white/5">
      <HeaderSidebar />
      <nav class="flex flex-1 flex-col">
        <ul role="list" class="flex flex-1 flex-col gap-y-7">
          <li>
            <BaseSection :items="baseItems"/>
          </li>
          <li>
            <HomeBaseSection v-model:items="data" title="Navigator" @event="onEvent" :enable="true" />
          </li>
          <li class="-mx-6 mt-auto">
            <a href="#" class="flex items-center gap-x-4 px-6 py-3 text-sm/6 font-semibold text-white hover:bg-gray-800">
              <img class="size-8 rounded-full bg-gray-800" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
              <span class="sr-only">Your profile</span>
              <span aria-hidden="true">Tom Cook</span>
            </a>
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