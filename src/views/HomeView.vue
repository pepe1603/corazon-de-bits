<template>
  <div class="text-center p-8">
    <h1 class="h1 mb-8 text-primary-pink">El Oráculo de Halagos</h1>
    <button
      @click="$emit('generar')"
      class="py-4 px-8 text-xl text-white font-semibold rounded-full bg-primary-pink hover:bg-secondary-pink transition-colors duration-300 transform hover:scale-105 active:scale-95"
    >
      Revela tu mensaje hoy
    </button>
  </div>
</template>
