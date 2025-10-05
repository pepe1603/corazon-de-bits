<script setup name="GeneratorView">
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  mensaje: {
    type: String,
    required: true,
  },
})

defineEmits(['nuevoMensaje', 'volver'])
</script>

<template>
  <div class="text-center p-8">
    <p class="text-4xl font-light italic mb-8 text-primary-pink leading-relaxed">
      "{{ props.mensaje }}"
    </p>

    <div class="flex space-x-4 justify-center mt-6">
      <button
        @click="$emit('nuevoMensaje')"
        class="py-2 px-4 text-sm text-primary-pink rounded-full border-2 border-primary-pink hover:bg-primary-pink hover:text-white transition-colors duration-300 transform hover:scale-105"
      >
        Generar otro
      </button>
      <button
        @click="$emit('volver')"
        class="py-2 px-4 text-sm text-gray-500 rounded-full border border-gray-500 hover:bg-gray-50 transition-colors duration-300 transform hover:scale-105"
      >
        Volver
      </button>
    </div>
  </div>
</template>
