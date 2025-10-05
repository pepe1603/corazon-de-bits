<script setup lang="js">
import { ref } from 'vue'
import frases from '@/data/phrases.json'
import GeneratorView from '@/views/GeneratorView.vue'
import HomeView from './views/HomeView.vue'
import ThemeSwitcher from '@/components/ThemeSwitcher.vue' // 1. Importar el componente

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
  <div
    class="min-h-screen relative bg-background-light text-text-light dark:bg-background-dark dark:text-text-dark transition-colors duration-500"
  >
    <div class="fixed top-4 right-4 z-50">
      <ThemeSwitcher />
    </div>

    <main class="w-full min-h-screen flex items-center justify-center">
      <Transition name="fade" mode="out-in">
        <HomeView v-if="vistaActual === 'inicio'" @generar="generarMensaje" />
        <GeneratorView
          v-else
          :mensaje="mensajeGenerado"
          @nuevoMensaje="generarMensaje"
          @volver="volverAInicio"
        />
      </Transition>
    </main>
  </div>
</template>

<style>
/* Estilos para la transición de vista */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
/* Estilo crucial para asegurar que el tema oscuro funcione en el scrollbar de ser necesario */
.dark {
  color-scheme: dark;
}
</style>
