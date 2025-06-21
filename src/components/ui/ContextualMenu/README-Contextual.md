# Menú Contextual - Documentación

## Descripción
El componente `Contextual.vue` es un menú contextual reutilizable que se puede usar en cualquier parte de la aplicación. Se muestra al hacer clic derecho y se cierra automáticamente al hacer clic fuera o presionar Escape.

## Características
- ✅ Posicionamiento automático en las coordenadas del clic
- ✅ Soporte para iconos SVG
- ✅ Atajos de teclado
- ✅ Separadores
- ✅ Elementos deshabilitados
- ✅ Cierre automático al hacer clic fuera
- ✅ Cierre con tecla Escape
- ✅ Soporte para modo oscuro
- ✅ Totalmente responsive

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `menuItems` | Array | `[]` | Array de elementos del menú |
| `position` | Object | `{x: 0, y: 0}` | Posición del menú en pantalla |
| `isVisible` | Boolean | `false` | Controla la visibilidad del menú |

## Estructura de menuItems

Cada elemento del menú debe tener la siguiente estructura:

```javascript
{
  id: 'unique-id',           // Identificador único (requerido)
  label: 'Texto del menú',   // Texto a mostrar (requerido)
  icon: Component,           // Componente de icono (opcional)
  shortcut: 'Ctrl+C',        // Atajo de teclado (opcional)
  disabled: false,           // Si está deshabilitado (opcional)
  separator: false,          // Si es un separador (opcional)
  action: () => {},          // Función a ejecutar (opcional)
  children: []               // Submenús (opcional)
}
```

## Events

| Event | Parámetros | Descripción |
|-------|------------|-------------|
| `item-click` | `item` | Se emite cuando se hace clic en un elemento |
| `close` | - | Se emite cuando se cierra el menú |

## Ejemplos de Uso

### 1. Uso Básico

```vue
<template>
  <div @contextmenu="showMenu">
    Haz clic derecho aquí
  </div>
  
  <Contextual
    :is-visible="isMenuVisible"
    :position="menuPosition"
    :menu-items="menuItems"
    @item-click="handleItemClick"
    @close="hideMenu"
  />
</template>

<script setup>
import { ref } from 'vue'
import Contextual from './Contextual.vue'

const isMenuVisible = ref(false)
const menuPosition = ref({ x: 0, y: 0 })
const menuItems = ref([
  { id: 'new', label: 'Nuevo', action: () => console.log('Nuevo') },
  { id: 'open', label: 'Abrir', action: () => console.log('Abrir') },
  { separator: true },
  { id: 'exit', label: 'Salir', action: () => console.log('Salir') }
])

const showMenu = (event) => {
  event.preventDefault()
  menuPosition.value = { x: event.clientX, y: event.clientY }
  isMenuVisible.value = true
}

const hideMenu = () => {
  isMenuVisible.value = false
}

const handleItemClick = (item) => {
  console.log('Elemento clickeado:', item.label)
}
</script>
```

### 2. Con Iconos

```javascript
// Definir iconos como componentes
const FolderIcon = {
  template: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-5l-2-2H5a2 2 0 00-2 2z" />
  </svg>`
}

const menuItems = [
  { id: 'new-folder', label: 'Nueva Carpeta', icon: FolderIcon },
  { id: 'new-file', label: 'Nuevo Archivo', icon: FileIcon }
]
```

### 3. Con Atajos de Teclado

```javascript
const menuItems = [
  { id: 'copy', label: 'Copiar', shortcut: 'Ctrl+C' },
  { id: 'paste', label: 'Pegar', shortcut: 'Ctrl+V' },
  { id: 'cut', label: 'Cortar', shortcut: 'Ctrl+X' }
]
```

### 4. Elementos Deshabilitados y Separadores

```javascript
const menuItems = [
  { id: 'edit', label: 'Editar' },
  { id: 'copy', label: 'Copiar' },
  { separator: true },  // Línea separadora
  { id: 'delete', label: 'Eliminar', disabled: true }  // Elemento deshabilitado
]
```

### 5. Con Acciones Personalizadas

```javascript
const menuItems = [
  {
    id: 'download',
    label: 'Descargar',
    action: () => {
      // Lógica personalizada
      downloadFile()
      showNotification('Archivo descargado')
    }
  }
]
```

## Integración en el File Manager

Para integrar el menú contextual en el file manager, puedes usarlo así:

```vue
<template>
  <div class="file-item" @contextmenu="showFileMenu">
    {{ file.name }}
  </div>
  
  <Contextual
    :is-visible="isMenuVisible"
    :position="menuPosition"
    :menu-items="getFileMenuItems(selectedFile)"
    @item-click="handleFileAction"
    @close="hideMenu"
  />
</template>

<script setup>
const getFileMenuItems = (file) => {
  const isFolder = file.type === 'folder'
  
  return [
    { id: 'open', label: 'Abrir', icon: isFolder ? FolderIcon : FileIcon },
    { separator: true },
    { id: 'copy', label: 'Copiar', shortcut: 'Ctrl+C' },
    { id: 'cut', label: 'Cortar', shortcut: 'Ctrl+X' },
    { id: 'paste', label: 'Pegar', shortcut: 'Ctrl+V', disabled: !clipboard.hasItems() },
    { separator: true },
    { id: 'rename', label: 'Renombrar' },
    { id: 'delete', label: 'Eliminar', icon: DeleteIcon },
    { separator: true },
    { id: 'properties', label: 'Propiedades' }
  ]
}

const handleFileAction = (item) => {
  switch (item.id) {
    case 'open':
      openFile(selectedFile)
      break
    case 'copy':
      copyFile(selectedFile)
      break
    case 'delete':
      deleteFile(selectedFile)
      break
    // ... más casos
  }
}
</script>
```

## Estilos Personalizados

El componente incluye estilos por defecto, pero puedes personalizarlos:

```css
/* Personalizar el menú contextual */
.contextual-menu {
  /* Tus estilos personalizados */
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.menu-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
}
```

## Consideraciones de Accesibilidad

- El menú se cierra automáticamente con la tecla Escape
- Soporte para navegación por teclado (se puede expandir)
- Contraste adecuado en modo claro y oscuro
- Indicadores visuales para elementos deshabilitados

## Compatibilidad

- ✅ Vue 3
- ✅ Composition API
- ✅ TypeScript (con definiciones de tipos)
- ✅ Tailwind CSS
- ✅ Navegadores modernos 