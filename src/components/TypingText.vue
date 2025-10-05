<script setup lang="js">
import { ref, watch, onMounted } from 'vue'

const props = defineProps({
  // La propiedad 'text' que contiene el mensaje completo a mostrar
  text: {
    type: String,
    required: true,
  },
  // La velocidad de escritura en milisegundos por letra
  speed: {
    type: Number,
    default: 50,
  },
})

// La cadena de texto que se va revelando
const displayedText = ref('')
let textIndex = 0
let timeoutId = null

/**
 * Función que añade la siguiente letra a la cadena visible.
 */
const typeNextCharacter = () => {
  // 1. Si ya se mostraron todas las letras, detener el proceso.
  if (textIndex < props.text.length) {
    // 2. Añadir la siguiente letra
    displayedText.value += props.text.charAt(textIndex)
    textIndex++

    // 3. Programar la siguiente letra
    timeoutId = setTimeout(typeNextCharacter, props.speed)
  }
}

/**
 * Función que resetea la animación cada vez que el mensaje cambia.
 */
const startTyping = () => {
  // Limpiar cualquier animación anterior
  clearTimeout(timeoutId)

  // Resetear el estado
  displayedText.value = ''
  textIndex = 0

  // Iniciar la nueva animación en el siguiente ciclo de tick
  setTimeout(typeNextCharacter, 10)
}

// Observar cuando la prop 'text' cambia (es decir, se genera un nuevo mensaje)
watch(
  () => props.text,
  (newText, oldText) => {
    // Solo reiniciar si el mensaje realmente cambió y no está vacío
    if (newText && newText !== oldText) {
      startTyping()
    }
  },
)

// Iniciar la animación al montar el componente (para el primer mensaje)
onMounted(() => {
  startTyping()
})
</script>

<template>
  <span class="typing-text">{{ displayedText }}<span class="cursor"></span></span>
</template>

<style scoped>
/* Animación simple de cursor parpadeante (opcional) */
.cursor {
  display: inline-block;
  width: 2px;
  height: 1.2em; /* Altura de la línea de texto */
  background-color: currentColor; /* Usa el color de texto actual */
  animation: blink 1s step-end infinite;
  margin-left: 2px;
  vertical-align: middle;
}

@keyframes blink {
  from,
  to {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
</style>
