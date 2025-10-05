<script setup>
// Emite el evento 'generar' cuando se haga clic
defineEmits(['generar'])
</script>

<template>
  <div class="text-center p-8">
    <h1 class="text-4xl font-bold mb-8">El Oráculo de Halagos</h1>
    <button
      @click="$emit('generar')"
      class="py-4 px-8 text-xl text-white font-semibold rounded-full bg-pink-500 hover:bg-pink-600 transition-colors duration-300 transform hover:scale-105"
    >
      Revela tu mensaje hoy
    </button>
  </div>
</template>
