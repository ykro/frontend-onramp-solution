# Paso 0. Entorno y tu primer componente de React

Este paso toma unos 30 minutos.

## Antes de empezar

1. Cuando abres una página web, ¿qué parte llega como HTML y qué parte arma JavaScript después en el navegador?
2. Si una variable de JavaScript cambia de valor, ¿por qué la pantalla no se actualiza sola?
3. ¿Qué diferencia hay entre pasarle un dato a una función como parámetro y guardarlo adentro de la función?

## Por qué importa

Todo el curso de frontend usa [React](https://react.dev/learn), y React se apoya en tres ideas que conviene ver funcionando antes de tocar accesibilidad, TypeScript o `fetch`. Un componente es una función que devuelve lo que se ve en pantalla. Las props son los datos que esa función recibe desde afuera. El estado es lo que el componente recuerda entre un clic y otro, y cada vez que cambia React vuelve a dibujar. En este paso levantas el proyecto con [Vite](https://vite.dev/guide/) y ves esas tres ideas en un componente pequeño.

## Lo mínimo que necesitas saber

- **Terminal.** Es la ventana donde escribes comandos: Terminal en macOS y Linux, PowerShell en Windows. `cd carpeta` entra a una carpeta, `ls` (o `dir` en Windows) muestra lo que hay adentro y `Ctrl+C` detiene el programa que esté corriendo, como el servidor de Vite. Para bajar este repositorio escribe `git clone https://github.com/ykro/frontend-onramp.git` y después `cd frontend-onramp`. Si no tienes `git`, instálalo desde [git-scm.com](https://git-scm.com/downloads).
- **HTML y DOM.** El navegador lee el HTML y arma un árbol de objetos, el DOM, donde cada etiqueta es un nodo con hijos. Lo que ves en pantalla es ese árbol, no el archivo HTML. React no escribe HTML a mano; calcula cómo debería quedar el árbol y cambia solo los nodos que hacen falta.
- **Eventos.** `onClick={sumar}` conecta una función al clic; va sin paréntesis, porque `sumar()` la ejecutaría al dibujar.
- **JSX.** Es la sintaxis parecida a HTML que escribes dentro de un archivo `.tsx`. Lo que va entre llaves, como `{nombre}`, es JavaScript. Dos diferencias con HTML que vas a ver mucho son `className` en lugar de `class` y `htmlFor` en lugar de `for`.
- **Componente.** Una función con nombre en mayúscula que devuelve JSX, por ejemplo `function Saludo() { return <h2>Hola</h2>; }`. Se usa como si fuera una etiqueta, `<Saludo />`.
- **Props.** Los atributos que le pasas a un componente, `<Saludo nombre="Ana" />`, llegan como un objeto en el primer parámetro de la función.
- **Estado con `useState`.** `const [valor, setValor] = useState(0)` te da el valor actual y una función para cambiarlo. Llamar a `setValor` le avisa a React que vuelva a dibujar el componente. Cambiar una variable normal no le avisa nada.
- **JavaScript moderno.** Funciones flecha, template strings, desestructuración y `map`; la plantilla los usa.

## Qué vas a hacer

- **Preparar.** Instala [Node.js](https://nodejs.org/en/download) en la versión que indica `.nvmrc` (24). Si usas [nvm](https://github.com/nvm-sh/nvm), basta con `nvm install` y `nvm use` en la raíz del repo. Luego corre `npm install`.
- **Leer.** Corre `npm run dev`, abre la URL que imprime Vite (normalmente `http://localhost:5173`) y entra a la pestaña **Paso 0**. Después abre [Saludo.tsx](../../src/paso00-hola/Saludo.tsx) en tu editor (VS Code sirve) y ubica qué parte del JSX dibuja cada cosa que ves.
- **Debuguear.** Haz clic varias veces en **Sumar uno** con la consola del navegador abierta (clic derecho, **Inspeccionar**, pestaña **Console**). El `console.log` muestra que la variable sí cambia. Lee los tres `TODO` del archivo.
- **Escribir.** Corrige los tres comportamientos. Vite recarga la página cada vez que guardas, así que puedes ver el efecto de cada cambio al instante.

## Criterios de aceptación

- `CA-0.1` Con `<Saludo nombre="Ana" ... />` el título dice `Hola, Ana`.
- `CA-0.2` Tres clics en **Sumar uno** dejan en pantalla `Clics: 3`.
- `CA-0.3` La lista **Temas del curso** muestra un elemento por cada texto de la prop `temas`, en el mismo orden.

## Al terminar

1. Cambia el `nombre` que recibe `Saludo` en [App.tsx](../../src/playground/App.tsx). ¿Qué archivo tuviste que tocar y por qué no fue `Saludo.tsx`?
2. Recarga la página después de sumar cinco clics. ¿En cuánto queda el contador y por qué?
3. Si dos temas tuvieran el mismo texto, ¿qué advertencia te mostraría React en la consola? Pruébalo y piensa qué dato usarías como `key`.
4. Explica en tres líneas, con tus palabras, qué cambiaste y por qué. Si no puedes, vuelve a la pista 1 antes de seguir.

## Cómo verificar

```bash
npm run check:paso0
```

Si te trabas, abre la [pista 1](hints/1.md). Cada pista da un poco más que la anterior; la pista 3 trae un esqueleto, nunca la respuesta completa.

## Respuestas de autoevaluación

1. Tocaste `App.tsx`, que es quien usa `<Saludo nombre="..." />`. El componente no decide su nombre; lo recibe por props desde quien lo dibuja. Así el mismo componente sirve para cualquier persona.
2. Vuelve a `Clics: 0`. El estado vive en la memoria de la página; al recargar, React arranca el componente desde cero con el valor inicial de `useState`. Para que sobreviva haría falta guardarlo en otro lado, como `localStorage` o un servidor.
3. React advierte que encontró dos hijos con la misma `key`. Con keys repetidas no puede saber qué elemento es cuál cuando la lista cambia. En datos reales se usa un `id` único que viene del backend.
4. Respuesta personal. Debe mencionar que las props llegan desde afuera, que `useState` le avisa a React que vuelva a dibujar y que `map` convierte datos en elementos con una `key`.
