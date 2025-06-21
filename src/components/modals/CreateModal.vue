<template>
  <div class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all w-full">
    <div class="flex flex-row gap-2 w-full">
      <div class="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-emerald-100 sm:mx-0 sm:size-10">
        <svg class="size-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
          <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
        </svg>
      </div>
      <div class="flex flex-col mt-3 text-center w-full space-y-2">
        <h3 class="flex justify-start text-base font-semibold text-gray-900" id="dialog-title">{{config.title}}</h3>
        <div class="flex flex-row gap-2 w-full items-center">
            <input
              v-model="model"
              type="name"
              name="name"
              id="name"
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              placeholder="Folder Name"
            />
        </div>
      </div>
    </div>
    <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
      <button
        type="button"
        class="cursor-pointer inline-flex w-full justify-center rounded-md bg-emerald-500 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-emerald-600 sm:ml-3 sm:w-auto"
        @click="config.buttonHandler(emit, {value: model})">{{config.buttonLabel}}</button>
      <button
        type="button"
        class="cursor-pointer mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
        @click="config.buttonCancelHandler(emit)">{{config.buttonCancelLabel}}</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  config: {
    type: Object,
    default: () => ({}),
    props: {
      title: {
        type: String,
        default: 'Example'
      },
      description: {
        type: String,
        default: 'Example description'
      },
      buttonLabel: {
        type: String,
        default: 'Delete'
      },
      buttonCancelLabel: {
        type: String,
        default: 'Cancel'
      },
      buttonHandler: {
        type: Function,
        default: () => {}
      },
      buttonCancelHandler: {
        type: Function,
        default: () => {}
      }
    }
  }
})

const emit = defineEmits(['event'])

const model = ref()
</script>