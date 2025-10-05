<script setup lang="js">
import { ref } from 'vue'
import frases from '@/data/phrases.json'
import GeneratorView from '@/views/GeneratorView.vue'
import HomeView from './views/HomeView.vue'

const vistaActual = ref('inicio') // Estado inicial: muestra la vista de inicio
const mensajeGenerado = ref('')

// Función para generar un número aleatorio
const getRandomIndex = (array) => {
  return Math.floor(Math.random() * array.length)
}

// Función para generar el mensaje y cambiar a la vista del generador
const generarMensaje = () => {
  const inicio = frases.inicioHalagador[getRandomIndex(frases.inicioHalagador)]
  const nucleo = frases.nucleoSentimental[getRandomIndex(frases.nucleoSentimental)]
  const cierre = frases.cierreUnico[getRandomIndex(frases.cierreUnico)]

  mensajeGenerado.value = `${inicio} ${nucleo} ${cierre}`
  vistaActual.value = 'generador' // Cambia el estado para mostrar la vista del generador
}

const volverAInicio = () => {
  vistaActual.value = 'inicio'
}
</script>

<template>
  <main class="min-h-screen flex items-center justify-center bg-gray-100">
    <HomeView v-if="vistaActual === 'inicio'" @generar="generarMensaje" />
    <GeneratorView
      v-else
      :mensaje="mensajeGenerado"
      @nuevoMensaje="generarMensaje"
      @volver="volverAInicio"
    />
  </main>
</template>
