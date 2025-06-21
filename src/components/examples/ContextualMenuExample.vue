<template>
  <div class="contextual-menu-example">
    <h2 class="text-xl font-bold mb-4">Ejemplos de Menú Contextual</h2>
    
    <!-- Ejemplo 1: Menú contextual básico -->
    <div class="example-section mb-8">
      <h3 class="text-lg font-semibold mb-2">1. Menú Contextual Básico</h3>
      <div 
        class="context-area p-4 border-2 border-dashed border-gray-300 rounded-lg"
        @contextmenu="showBasicMenu"
        @click="hideMenu">
        Haz clic derecho aquí para mostrar el menú contextual básico
      </div>
    </div>

    <!-- Ejemplo 2: Menú contextual con iconos -->
    <div class="example-section mb-8">
      <h3 class="text-lg font-semibold mb-2">2. Menú Contextual con Iconos</h3>
      <div 
        class="context-area p-4 border-2 border-dashed border-blue-300 rounded-lg"
        @contextmenu="showIconMenu"
        @click="hideMenu">
        Haz clic derecho aquí para mostrar el menú contextual con iconos
      </div>
    </div>

    <!-- Ejemplo 3: Menú contextual para archivos -->
    <div class="example-section mb-8">
      <h3 class="text-lg font-semibold mb-2">3. Menú Contextual para Archivos</h3>
      <div 
        class="context-area p-4 border-2 border-dashed border-green-300 rounded-lg"
        @contextmenu="showFileMenu"
        @click="hideMenu">
        Haz clic derecho aquí para mostrar el menú contextual de archivos
      </div>
    </div>

    <!-- Ejemplo 4: Menú contextual con atajos de teclado -->
    <div class="example-section mb-8">
      <h3 class="text-lg font-semibold mb-2">4. Menú Contextual con Atajos</h3>
      <div 
        class="context-area p-4 border-2 border-dashed border-purple-300 rounded-lg"
        @contextmenu="showShortcutMenu"
        @click="hideMenu">
        Haz clic derecho aquí para mostrar el menú contextual con atajos
      </div>
    </div>

    <!-- Componente del menú contextual -->
    <Contextual
      :is-visible="isMenuVisible"
      :event="e"
      :menu-items="currentMenuItems"
      @item-click="handleMenuItemClick"
      @close="hideMenu"
    />

    <!-- Log de acciones -->
    <div class="mt-8">
      <h3 class="text-lg font-semibold mb-2">Log de Acciones:</h3>
      <div class="log-container p-4 bg-gray-100 rounded-lg max-h-40 overflow-y-auto">
        <div v-for="(log, index) in actionLog" :key="index" class="log-item text-sm">
          {{ log }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Contextual from '../ui/ContextualMenu/ContextualMenu.vue'

// Estado del menú
const isMenuVisible = ref(false)
const menuPosition = ref({ x: 0, y: 0 })
const currentMenuItems = ref([])
const actionLog = ref([])
const e = ref({})

// Iconos SVG como componentes
const FolderIcon = {
  template: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-5l-2-2H5a2 2 0 00-2 2z" />
  </svg>`
}

const FileIcon = {
  template: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>`
}

const EditIcon = {
  template: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>`
}

const DeleteIcon = {
  template: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>`
}

const CopyIcon = {
  template: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>`
}

const PasteIcon = {
  template: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
  </svg>`
}

// Métodos para mostrar diferentes tipos de menús
const showBasicMenu = (event) => {
  event.preventDefault()
  e.value = event
  currentMenuItems.value = [
    { id: 'new', label: 'Nuevo', action: () => addLog('Nuevo elemento creado') },
    { id: 'open', label: 'Abrir', action: () => addLog('Elemento abierto') },
    { id: 'save', label: 'Guardar', action: () => addLog('Elemento guardado') },
    { separator: true },
    { id: 'exit', label: 'Salir', action: () => addLog('Saliendo...') }
  ]
  isMenuVisible.value = true
}

const showIconMenu = (event) => {
  event.preventDefault()
  e.value = event
  currentMenuItems.value = [
    { id: 'new-folder', label: 'Nueva Carpeta', icon: FolderIcon, action: () => addLog('Nueva carpeta creada') },
    { id: 'new-file', label: 'Nuevo Archivo', icon: FileIcon, action: () => addLog('Nuevo archivo creado') },
    { separator: true },
    { id: 'edit', label: 'Editar', icon: EditIcon, action: () => addLog('Editando elemento') },
    { id: 'delete', label: 'Eliminar', icon: DeleteIcon, action: () => addLog('Elemento eliminado') }
  ]
  isMenuVisible.value = true
}

const showFileMenu = (event) => {
  event.preventDefault()
  e.value = event
  currentMenuItems.value = [
    { id: 'open', label: 'Abrir', icon: FileIcon, action: () => addLog('Archivo abierto') },
    { id: 'edit', label: 'Editar', icon: EditIcon, action: () => addLog('Archivo en edición') },
    { separator: true },
    { id: 'copy', label: 'Copiar', icon: CopyIcon, action: () => addLog('Archivo copiado') },
    { id: 'paste', label: 'Pegar', icon: PasteIcon, action: () => addLog('Archivo pegado') },
    { separator: true },
    { id: 'rename', label: 'Renombrar', action: () => addLog('Archivo renombrado') },
    { id: 'delete', label: 'Eliminar', icon: DeleteIcon, action: () => addLog('Archivo eliminado') },
    { separator: true },
    { id: 'properties', label: 'Propiedades', action: () => addLog('Mostrando propiedades') }
  ]
  isMenuVisible.value = true
}

const showShortcutMenu = (event) => {
  event.preventDefault()
  e.value = event
  currentMenuItems.value = [
    { id: 'undo', label: 'Deshacer', shortcut: 'Ctrl+Z', action: () => addLog('Deshaciendo acción') },
    { id: 'redo', label: 'Rehacer', shortcut: 'Ctrl+Y', action: () => addLog('Rehaciendo acción') },
    { separator: true },
    { id: 'cut', label: 'Cortar', shortcut: 'Ctrl+X', action: () => addLog('Elemento cortado') },
    { id: 'copy', label: 'Copiar', shortcut: 'Ctrl+C', action: () => addLog('Elemento copiado') },
    { id: 'paste', label: 'Pegar', shortcut: 'Ctrl+V', action: () => addLog('Elemento pegado') },
    { separator: true },
    { id: 'select-all', label: 'Seleccionar Todo', shortcut: 'Ctrl+A', action: () => addLog('Todo seleccionado') },
    { id: 'find', label: 'Buscar', shortcut: 'Ctrl+F', action: () => addLog('Buscando...') },
    { id: 'replace', label: 'Reemplazar', shortcut: 'Ctrl+H', action: () => addLog('Reemplazando...') }
  ]
  isMenuVisible.value = true
}

// Métodos de utilidad
const hideMenu = () => {
  isMenuVisible.value = false
}

const handleMenuItemClick = (item) => {
  addLog(`Menú clickeado: ${item.label}`)
}

const addLog = (message) => {
  const timestamp = new Date().toLocaleTimeString()
  actionLog.value.unshift(`[${timestamp}] ${message}`)
  
  // Mantener solo los últimos 20 logs
  if (actionLog.value.length > 20) {
    actionLog.value = actionLog.value.slice(0, 20)
  }
}
</script>

<style scoped>
.contextual-menu-example {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.example-section {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
  background-color: #f9fafb;
}

.context-area {
  background-color: white;
  cursor: context-menu;
  transition: all 0.2s ease;
}

.context-area:hover {
  background-color: #f3f4f6;
}

.log-container {
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
}

.log-item {
  padding: 2px 0;
  border-bottom: 1px solid #e5e7eb;
}

.log-item:last-child {
  border-bottom: none;
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .example-section {
    background-color: #1f2937;
    border-color: #374151;
  }
  
  .context-area {
    background-color: #374151;
    color: #f9fafb;
  }
  
  .context-area:hover {
    background-color: #4b5563;
  }
  
  .log-container {
    background-color: #1f2937;
    border-color: #374151;
  }
  
  .log-item {
    border-bottom-color: #374151;
  }
}
</style> 