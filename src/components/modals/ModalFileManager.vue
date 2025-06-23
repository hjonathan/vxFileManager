<template>
  <Modal v-model="showModal" @close="closeModal">
    <component :key="type" v-if="modalConfig" :is="modalComponent[type]" :config="modalConfig" @event="onEvent" />
  </Modal>
</template>

<script setup>
import { defineAsyncComponent, ref, computed } from 'vue'
import Modal from '../ui/modal/Modal.vue'
import { modalConfigBuilder } from './config'

const DangerModal = defineAsyncComponent(() => import('./DangerModal.vue'))
const CreateModal = defineAsyncComponent(() => import('./CreateModal.vue'))
const UploadFilesModal = defineAsyncComponent(() => import('./UploadFilesModal/UploadFilesModal.vue'))

const emit = defineEmits(['event'])

const props = defineProps({
  type: {
    type: String,
    default: null
  }
})

const showModal = defineModel('showModal', {
  type: Boolean,
  default: false
})

const modalConfig =  computed(() => modalConfigBuilder(props.type))

const modalComponent = {
  'delete-item': DangerModal,
  'create-folder': CreateModal,
  'upload-files': UploadFilesModal
}

const onEvent = (event) => {
  emit('event', event)
}

</script>