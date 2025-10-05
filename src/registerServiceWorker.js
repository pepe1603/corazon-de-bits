import { registerSW } from 'virtual:pwa-register'

// registerSW() devuelve una función para notificar al usuario sobre una nueva versión
export function registerPWA() {
  registerSW({
    // Se llama cuando un nuevo service worker ha sido instalado y está esperando
    onNeedRefresh() {
      console.log('Nueva versión disponible. Recargar para actualizar.')
      // Aquí puedes añadir un diálogo o "toast" para que el usuario recargue
      if (
        confirm('Una nueva versión de Corazón de Bits está disponible. ¿Deseas actualizar ahora?')
      ) {
        window.location.reload()
      }
    },

    // Se llama cuando se detecta que el service worker ha sido actualizado
    onUpdated() {
      console.log('La aplicación ha sido actualizada y recargada.')
    },

    // Se llama cuando se detecta la primera instalación del SW
    onRegistered(registration) {
      console.log('Service Worker registrado con scope:', registration.scope)
    },

    // Manejo de errores
    onRegistrationError(error) {
      console.error('Fallo el registro del Service Worker:', error)
    },
  })
}
