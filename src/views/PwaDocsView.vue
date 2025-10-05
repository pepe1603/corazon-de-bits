<script setup name="PwaDocsView" lang="js">
import { defineEmits } from 'vue'
// Ya no necesitamos importar la fuente aquí, Tailwind lo maneja.

defineEmits(['volver'])
</script>

<template>
  <div class="p-8 max-w-xl mx-auto text-center">
    <h2 class="text-3xl font-bold text-primary-pink mb-6 font-pacifico">
      ✨ Corazón de Bits es una PWA
    </h2>
    <p class="text-lg mb-8 text-text-light dark:text-text-dark">
      ¡Gracias por usar la aplicación! Como **Aplicación Web Progresiva (PWA)**, Corazón de Bits te
      ofrece una experiencia mejorada:
    </p>

    <div
      class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl text-left border border-gray-200 dark:border-gray-700 mb-8"
    >
      <h3 class="text-xl font-semibold mb-3 text-secondary-pink font-caveat">Beneficios Clave</h3>
      <ul class="list-disc list-inside space-y-3 text-base text-gray-700 dark:text-gray-300">
        <li>
          <strong>Instalación Rápida:</strong> Puedes **instalarla** directamente en tu teléfono o
          computadora (busca el ícono de "Instalar" o "Añadir a pantalla de inicio").
        </li>
        <li>
          <strong>Modo Offline:</strong> La aplicación está cacheada y funciona **sin conexión a
          Internet**, perfecto para generar mensajes en cualquier lugar.
        </li>
        <li>
          <strong>Experiencia Nativa:</strong> Se ejecuta en pantalla completa, sin la barra de
          direcciones del navegador.
        </li>
      </ul>
    </div>

    <button
      @click="$emit('volver')"
      class="py-2 px-6 text-sm text-gray-500 rounded-full border border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300 transform hover:scale-105 mt-4"
    >
      Entendido, ¡Volver al Inicio!
    </button>
  </div>
</template>
