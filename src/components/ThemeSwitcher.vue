<script setup lang="js">
import { ref, watch, onMounted, computed } from 'vue'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
// 1. Importar los íconos de Heroicons
import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/vue/24/solid'

// Estado: Puede ser 'light', 'dark', o 'system'
const theme = ref('system')

// Lista de opciones de tema
const themes = [
  // 2. Usar los componentes de ícono importados
  { id: 'light', name: 'Claro', icon: SunIcon },
  { id: 'dark', name: 'Oscuro', icon: MoonIcon },
  { id: 'system', name: 'Sistema', nameDisplay: 'Sistema', icon: ComputerDesktopIcon },
]

// Función para aplicar la clase 'dark' al <html>
const applyTheme = (newTheme) => {
  const isDark =
    newTheme === 'dark' ||
    (newTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)

  if (isDark) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

// Función para cambiar el tema y guardarlo
const setTheme = (newTheme) => {
  theme.value = newTheme
  localStorage.setItem('theme', newTheme)
  applyTheme(newTheme)
}

// Lógica de ícono a mostrar en el botón principal (el ícono activo)
const activeThemeIcon = computed(() => {
  if (theme.value === 'system') {
    const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    return isSystemDark ? MoonIcon : SunIcon
  }
  return themes.find((t) => t.id === theme.value).icon
})

// Lógica para determinar el color del botón principal
const buttonIconColor = computed(() => {
  // 1. Si el tema NO es 'system' (es 'light' o 'dark'), el color es primary-pink.
  if (theme.value !== 'system') {
    return 'text-primary-pink hover:text-primary-pink/80 dark:text-primary-pink dark:hover:text-primary-pink/80'
  }
  // 2. Si el tema es 'system', el color es gris.
  return 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
})

// Observa cambios en 'theme' para aplicarlos
watch(theme, (newTheme) => {
  applyTheme(newTheme)
})

// Al montar el componente, cargamos el tema guardado o el valor por defecto
onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme) {
    theme.value = savedTheme
  }
  // Escuchar cambios del sistema si el modo es 'system'
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (theme.value === 'system') {
      applyTheme('system')
    }
  })
  applyTheme(theme.value)
})
</script>

<template>
  <Menu as="div" class="relative inline-block text-left z-50">
    <div>
      <MenuButton
        :class="[
          'inline-flex justify-center rounded-full p-2 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-transparent',
          // Aplicamos la clase computada para el color del ícono (sin fondo)
          buttonIconColor,
        ]"
        aria-label="Selector de Tema"
      >
        <component :is="activeThemeIcon" class="h-5 w-5" />
      </MenuButton>
    </div>

    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-to-class="transform scale-95 opacity-0"
    >
      <MenuItems
        class="absolute right-0 mt-2 w-40 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <div class="py-1">
          <MenuItem v-for="item in themes" :key="item.id" v-slot="{ active }">
            <button
              @click="setTheme(item.id)"
              :class="[
                // Hover con gris suave: bg-gray-100 o dark:bg-gray-700
                active ? 'bg-gray-100 dark:bg-gray-700' : '',
                'group flex items-center w-full px-4 py-2 text-sm transition-colors duration-150',
              ]"
            >
              <component
                :is="item.icon"
                :class="[
                  // Ícono activo se pone en color (primary-pink)
                  theme === item.id ? 'text-primary-pink' : 'text-gray-400 dark:text-gray-500',
                  'h-5 w-5 mr-3 transition-colors duration-150',
                ]"
              />

              <span
                :class="[
                  // Texto activo se mantiene en el color del texto base
                  theme === item.id ? 'font-semibold' : 'font-normal',
                  'text-gray-900 dark:text-gray-100',
                ]"
              >
                {{ item.name }}
              </span>
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>
