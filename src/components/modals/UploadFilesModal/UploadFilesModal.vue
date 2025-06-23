<template>
  <div
    class="relative transform overflow-y-auto overflow-x-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all w-full">
    <div class="flex flex-col gap-2 w-full">
      <div class="flex flex-col mt-3 text-center w-full space-y-2">
        <h3 class="flex justify-start text-base font-semibold text-gray-900" id="dialog-title">{{ config.title }}</h3>
        <div class="col-span-full">
          <div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            <div class="text-center">
              <svg class="mx-auto size-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
                data-slot="icon">
                <path fill-rule="evenodd"
                  d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                  clip-rule="evenodd" />
              </svg>
              <div class="mt-4 flex text-sm/6 text-gray-600">
                <label for="file-upload"
                  class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-indigo-500">
                  <span>Upload a file</span>
                  <input id="file-upload" name="file-upload" type="file" multiple class="sr-only" @change="onFileChange" />
                </label>
                <p class="pl-1">or drag and drop</p>
              </div>
              <p class="text-xs/5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>
      </div>
      <UploadFilesList v-if="data" v-model:data="data" />
    </div>
    <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
      <button type="button"
        class="cursor-pointer inline-flex w-full justify-center rounded-md bg-emerald-500 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-emerald-600 sm:ml-3 sm:w-auto"
        @click="config.buttonHandler(emit, data)">{{ config.buttonLabel }}</button>
      <button type="button"
        class="cursor-pointer mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
        @click="config.buttonCancelHandler(emit)">{{ config.buttonCancelLabel }}</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import UploadFilesList from './UploadFilesList.vue'

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
        default: () => { }
      },
      buttonCancelHandler: {
        type: Function,
        default: () => { }
      }
    }
  }
})

const emit = defineEmits(['event'])
const data = ref()

const onFileChange = (event) => {
  data.value = Array.from(event.target.files)
}
</script>