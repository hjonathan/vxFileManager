<template>
  <div class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all w-full">
    <div class="sm:flex sm:items-start">
      <div class="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
        <svg class="size-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
        </svg>
      </div>
      <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
        <h3 class="text-base font-semibold text-gray-900" id="dialog-title">{{config.title}}</h3>
        <div class="mt-2">
          <p class="text-sm text-gray-500">{{config.description}}</p>
        </div>
      </div>
    </div>
    <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
      <button type="button" class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto" @click="config.buttonHandler(emit)">{{config.buttonLabel}}</button>
      <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto" @click="config.buttonCancelHandler(emit)">{{config.buttonCancelLabel}}</button>
    </div>
  </div>
</template>

<script setup>
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
</script>