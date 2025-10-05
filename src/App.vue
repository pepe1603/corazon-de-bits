<script setup lang="js">
import { ref, defineAsyncComponent } from 'vue' // 1. Importar defineAsyncComponent y Suspense (implícito)
import frases from '@/data/phrases.json'

// 1. Usar importaciones dinámicas para Lazy Loading (incluyendo PwaDocsView)
const HomeView = defineAsyncComponent(() => import('@/views/HomeView.vue'))
const GeneratorView = defineAsyncComponent(() => import('@/views/GeneratorView.vue'))
const PwaDocsView = defineAsyncComponent(() => import('@/views/PwaDocsView.vue')) // 🟢 NUEVA VISTA

import ThemeSwitcher from '@/components/ThemeSwitcher.vue'

// 2. Extender el estado de vista actual
const vistaActual = ref('inicio') // Puede ser 'inicio', 'generador', o 'docs'
const mensajeGenerado = ref('')

const getRandomIndex = (array) => {
  return Math.floor(Math.random() * array.length)
}

const generarMensaje = () => {
  const inicio = frases.inicioHalagador[getRandomIndex(frases.inicioHalagador)]
  const nucleo = frases.nucleoSentimental[getRandomIndex(frases.nucleoSentimental)]
  const cierre = frases.cierreUnico[getRandomIndex(frases.cierreUnico)]

  mensajeGenerado.value = `${inicio} ${nucleo} ${cierre}`
  vistaActual.value = 'generador'
}

const volverAInicio = () => {
  vistaActual.value = 'inicio'
}

// 3. Objeto para mapear el nombre de la vista al componente
const vistaComponente = {
  inicio: HomeView,
  generador: GeneratorView,
  docs: PwaDocsView, // 🟢 NUEVO MAPEO
}

// 4. Props y Eventos genéricos para el <component>
const propsCompartidas = (vista) => {
  // Inicializamos las props/listeners vacíos
  const props = {}

  if (vista === 'inicio') {
    // CAMBIO: @generar se convierte en onGenerar
    props.onGenerar = generarMensaje
  } else if (vista === 'generador') {
    // 🛑 CORRECCIÓN CLAVE: Acceder al valor de la ref con .value
    props.mensaje = mensajeGenerado.value
    // CAMBIO: @nuevoMensaje se convierte en onNuevoMensaje
    props.onNuevoMensaje = generarMensaje
    // CAMBIO: @volver se convierte en onVolver
    props.onVolver = volverAInicio
  } else if (vista === 'docs') {
    // CAMBIO: @volver se convierte en onVolver
    props.onVolver = volverAInicio
  }

  return props
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
        <Suspense>
          <template #default>
            <component
              :is="vistaComponente[vistaActual]"
              v-bind="propsCompartidas(vistaActual)"
              :key="vistaActual"
            />
          </template>

          <template #fallback>
            <p class="text-xl text-primary-pink font-semibold animate-pulse">
              Cargando inspiración... ✨
            </p>
          </template>
        </Suspense>
      </Transition>
    </main>
    <footer class="absolute bottom-4 left-0 right-0 text-center z-40">
      <button
        @click="vistaActual = 'docs'"
        v-if="vistaActual === 'inicio'"
        class="text-xs text-gray-400 dark:text-gray-600 hover:text-primary-pink dark:hover:text-primary-pink transition-colors underline"
      >
        Acerca de esta PWA
      </button>
    </footer>
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
