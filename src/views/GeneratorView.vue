<script setup>
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
    <p class="text-3xl font-semibold mb-8 text-pink-700">{{ props.mensaje }}</p>

    <div class="flex space-x-4 justify-center">
      <button
        @click="$emit('nuevoMensaje')"
        class="py-2 px-4 text-sm text-pink-500 rounded-full border border-pink-500 hover:bg-pink-50 transition-colors duration-300"
      >
        Generar otro
      </button>
      <button
        @click="$emit('volver')"
        class="py-2 px-4 text-sm text-gray-500 rounded-full border border-gray-500 hover:bg-gray-50 transition-colors duration-300"
      >
        Volver
      </button>
    </div>
  </div>
</template>
