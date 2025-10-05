<template>
  <div class="text-center p-8">
    <h1 class="mb-8 text-primary-pink font-pacifico">El Oráculo de Halagos</h1>
    <button
      @click="$emit('generar')"
      class="py-4 px-8 text-xl text-white font-semibold rounded-full bg-primary-pink hover:bg-pink-600 transition-colors duration-300 transform hover:scale-105 active:scale-95"
    >
      Revela tu mensaje hoy
    </button>
  </div>
</template>
