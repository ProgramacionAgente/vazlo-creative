/* ============================================================
   TEMA DEL SITIO — única fuente de marca (plantilla3 · Cyber-Luxe)
   ------------------------------------------------------------
   Esto es LO ÚNICO que cambias al crear un sitio nuevo:
   colores, tipografías y logo. No toques el markup ni global.css.
   ============================================================ */

// --- Colores (hex). Las claves son los nombres de clase Tailwind:
//     bg-bg-void, text-accent, text-text-secondary, from-accent, etc.
export const colors = {
  'bg-void':        '#03030F',
  'bg-depth':       '#08082A',
  accent:           '#00F0FF',
  'accent-2':       '#A78BFA',
  'text-primary':   '#EEF2FF',
  'text-secondary': '#8892B0',
  'text-dim':       '#4A5578',
  'grad-indigo':    '#4F46E5',
  'grad-violet':    '#7C3AED',
  'grad-pink':      '#DB2777',
};

// --- Tipografías. Cambia las familias y el enlace de Google Fonts juntos.
export const fonts = {
  display:    'Sora, sans-serif',     // titulares
  body:       'Mulish, sans-serif',   // cuerpo
  googleHref: 'https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Mulish:wght@400;500;600&display=swap',
};

// --- Logo. Si `image` tiene una ruta (archivo en /public), se usa la imagen.
//     Si está vacío, se usa el icono de Material Symbols `icon`.
export const logo = {
  image: '',         // p.ej. '/logo.svg'
  icon:  'bolt',     // nombre de Material Symbols
  alt:   'Logo',
};
