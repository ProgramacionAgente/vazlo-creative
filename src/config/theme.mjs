/* ============================================================
   TEMA DEL SITIO — única fuente de marca (VAZLO CREATIVE)
   ------------------------------------------------------------
   Esto es LO ÚNICO que cambias al crear un sitio nuevo:
   colores, tipografías y logo. No toques el markup ni global.css.
   ============================================================ */

// --- Colores (hex). Las claves son los nombres de clase Tailwind:
//     bg-bg-void, text-accent, text-text-secondary, from-accent, etc.
//     `accent` y `accent-2` son las tintas AA-safe usadas como texto/iconos;
//     `accent-bright` es el coral puro de marca, usado solo desde CSS
//     (rellenos, degradados, glows) donde el contraste no aplica.
export const colors = {
  'bg-void':         '#FFFFFF', // página base
  'bg-depth':        '#F7F6F4', // hueso, secciones alternas
  accent:            '#C0412F', // tinta coral (AA): texto, iconos, bordes, foco
  'accent-bright':   '#E94F3B', // coral puro de marca: rellenos, degradados
  'accent-2':        '#6E8377', // salvia de marca: degradados, texto grande
  'accent-2-ink':    '#55665C', // tinta salvia: estado de éxito
  'text-primary':    '#3C3C3B', // carbón de marca
  'text-secondary':  '#5C5C5A',
  'text-dim':        '#6E6E6B',
  'grad-indigo':     '#E94F3B', // lavado coral (mesh, paneles)
  'grad-violet':     '#6E8377', // lavado salvia (mesh, paneles)
  'grad-pink':       '#B3261E', // rojo de error (.form-status)
};

// --- Tipografías. Cambia las familias y el enlace de Google Fonts juntos.
//     Gilmour es una fuente auto-hospedada (public/fonts/gilmour-bold.otf,
//     declarada en src/styles/fonts.css) — peso único, sin cursiva.
export const fonts = {
  display:    "'Gilmour', 'Poppins', sans-serif",     // titulares
  body:       "'Poppins', system-ui, -apple-system, sans-serif", // cuerpo
  googleHref: 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap',
};

// --- Logo. Si `image` tiene una ruta (archivo en /public), se usa la imagen.
//     Si está vacío, se usa el icono de Material Symbols `icon`.
export const logo = {
  image: '/brand/isotipo.png',
  icon:  'bolt',
  alt:   'VAZLO CREATIVE',
};
