<template>
  <transition name="modal-fade">
    <div v-if="isVisible" class="fixed inset-0 bg-gray-800/50 bg-opacity-60 flex justify-center items-center z-50" @click.self="closeModal">
      <div class="bg-white rounded-lg shadow-xl w-11/12 max-w-lg max-h-[90vh] overflow-y-auto flex flex-col" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
import { defineComponent, ref, watch, onMounted, onUnmounted } from 'vue';

export default defineComponent({
  name: 'ModalComponent',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue', 'close'],
  setup(props, { emit }) {
    const isVisible = ref(props.modelValue);

    watch(() => props.modelValue, (newValue) => {
      isVisible.value = newValue;
    });

    const closeModal = () => {
      isVisible.value = false;
      emit('update:modelValue', false);
      emit('close');
    };

    const handleKeydown = (event) => {
      if (event.key === 'Escape' && isVisible.value) {
        closeModal();
      }
    };

    onMounted(() => {
      document.addEventListener('keydown', handleKeydown);
    });

    onUnmounted(() => {
      document.removeEventListener('keydown', handleKeydown);
    });

    return {
      isVisible,
      closeModal
    };
  }
});
</script>

<style scoped>
/* Transiciones para Vue (no son de Tailwind directamente, pero las usamos con las clases) */
.modal-fade-enter-active, .modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from, .modal-fade-leave-to {
  opacity: 0;
}

/* Transición para el contenido del modal */
.modal-fade-enter-active .bg-white,
.modal-fade-leave-active .bg-white {
  transition: all 0.3s ease;
}

.modal-fade-enter-from .bg-white,
.modal-fade-leave-to .bg-white {
  transform: translateY(-20px);
  opacity: 0;
}
</style>