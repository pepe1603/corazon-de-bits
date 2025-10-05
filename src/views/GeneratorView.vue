<script setup name="GeneratorView" lang="js">
import { defineProps, defineEmits, ref } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons'
// 🟢 CORRECCIÓN 1: Importar el componente TypingText
import TypingText from '@/components/TypingText.vue'

const props = defineProps({
  mensaje: {
    type: String,
    required: true,
  },
})

defineEmits(['nuevoMensaje', 'volver'])

// Variable reactiva para controlar la visibilidad del mensaje de éxito
const copiadoExito = ref(false)

const copiarMensaje = () => {
  // Evitar ejecuciones múltiples
  if (copiadoExito.value) return // Lógica de Copia

  const copiar = (callback) => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(props.mensaje)
        .then(callback)
        .catch((err) => {
          console.error('Error al copiar el mensaje:', err)
        })
    } else {
      // Lógica de Fallback
      const textArea = document.createElement('textarea')
      textArea.value = props.mensaje
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      try {
        document.execCommand('copy')
        callback()
      } catch (err) {
        console.error('Fallback: Error al copiar el mensaje', err)
      }
      document.body.removeChild(textArea)
    }
  } // Ejecutamos la copia y mostramos el feedback al éxito

  copiar(() => {
    console.log('Mensaje copiado al portapapeles') // 🟢 Añadir feedback háptico (Vibración)

    if (navigator.vibrate) {
      navigator.vibrate(100) // Vibra 100 milisegundos
    } // Mostrar el mensaje de éxito

    copiadoExito.value = true // Ocultar el mensaje después de 2 segundos (2000 ms) y restaurar el botón

    setTimeout(() => {
      copiadoExito.value = false
    }, 2000)
  })
}
</script>

<template>
  <div class="flex flex-col items-center p-4 sm:p-8">
    <div class="relative w-full max-w-2xl mb-12">
      <div
        :key="mensaje"
        class="text-4xl font-light italic text-primary-pink leading-relaxed font-pacifico text-center px-4 mt-2.5 min-h-[120px] sm:min-h-[160px]"
      >
        " <TypingText :text="props.mensaje" :speed="40" /> "
      </div>

      <button
        @click="copiarMensaje"
        :class="[
          'absolute right-0 sm:right-4 top-0 p-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-transparent', // Estilos para el estado NO copiado (Ícono)
          !copiadoExito
            ? 'border border-primary-pink text-primary-pink hover:bg-primary-pink hover:text-white size-8 flex items-center justify-center'
            : 'bg-green-100 text-green-600 px-3 py-1.5', // Estilos para el mensaje de éxito
          // Ajuste de margen negativo para subirlo ligeramente fuera del flujo

          'transform -translate-y-1/2',
        ]"
        :style="{ minWidth: copiadoExito ? '150px' : '40px' }"
        aria-label="Copiar Mensaje"
      >
        <Transition name="fade" mode="out-in">
          <FontAwesomeIcon v-if="!copiadoExito" :icon="faCopy" key="copy-icon" class="size-3.5" />

          <span v-else key="success-text" class="text-sm font-semibold whitespace-nowrap">
            ¡Copiado con éxito! 🎉
          </span>
        </Transition>
      </button>
    </div>

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

<style scoped>
/* Estilos de transición y clases min-height se mantienen */
/* ... */
</style>
<style scoped>
/* Estilos para la transición 'fade' */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Añadir un min-height al contenedor del texto para evitar saltos de diseño */
/* cuando el texto se revela línea por línea (ajustar si es necesario) */
.min-h-text-area {
  min-height: 120px;
}
</style>
