// Verificador del Paso 5. Corre tests/paso05.test.tsx tres veces:
//   1. contra la función correcta: todo debe pasar, debe haber al menos 3 tests y cada uno
//      debe llamar a la función y tener un expect;
//   2. y 3. contra cada versión con un bug: al menos un test debe fallar.
// Además, al menos un test debe dibujar ResumenDescuento y buscarlo con getByRole.
import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const ARCHIVO = "tests/paso05.test.tsx";
const VERSIONES = {
  versionA: { etiqueta: "CA-5.2", nombre: "la versión A" },
  versionB: { etiqueta: "CA-5.3", nombre: "la versión B" },
};
const carpeta = mkdtempSync(path.join(tmpdir(), "paso5-"));
const require = createRequire(import.meta.url);

// Cada it(...) debe llamar a la función o dibujar el componente, y comprobar algo con expect.
let hayTestDeComponente = false;
function testsSinComprobacion() {
  hayTestDeComponente = false;
  const ts = require("typescript");
  const fuente = ts.createSourceFile(ARCHIVO, readFileSync(ARCHIVO, "utf-8"), ts.ScriptTarget.Latest, true);
  const debiles = [];
  const visitar = (nodo) => {
    if (
      ts.isCallExpression(nodo) &&
      ts.isIdentifier(nodo.expression) &&
      (nodo.expression.text === "it" || nodo.expression.text === "test") &&
      nodo.arguments.length >= 2
    ) {
      const cuerpo = nodo.arguments[1].getText(fuente);
      const nombre = nodo.arguments[0].getText(fuente);
      const llama = cuerpo.includes("calcularTotalConDescuento(") || cuerpo.includes("render(");
      if (!llama || !cuerpo.includes("expect(")) debiles.push(nombre);
      if (
        cuerpo.includes("render(") &&
        (cuerpo.includes("getByRole(") ||
          cuerpo.includes("findByRole(") ||
          cuerpo.includes("getAllByRole("))
      ) {
        hayTestDeComponente = true;
      }
    }
    ts.forEachChild(nodo, visitar);
  };
  visitar(fuente);
  return debiles;
}


function correr(nombre, version) {
  const salida = path.join(carpeta, `${nombre}.json`);
  const env = { ...process.env };
  if (version) env.PASO5_VERSION = version;
  else delete env.PASO5_VERSION;
  const r = spawnSync(
    process.execPath,
    [path.resolve("node_modules/vitest/vitest.mjs"), "run", ARCHIVO, "--reporter=json", `--outputFile=${salida}`],
    { encoding: "utf8", env }
  );
  let reporte = null;
  try {
    reporte = JSON.parse(readFileSync(salida, "utf-8"));
  } catch {
    // Vitest no llegó a escribir el reporte, por ejemplo por un error de sintaxis.
  }
  return { codigo: r.status, reporte, texto: `${r.stdout}\n${r.stderr}` };
}

let ok = true;
const correcta = correr("correcta");
const pasaron = correcta.reporte?.numPassedTests ?? 0;
const fallaron = correcta.reporte?.numFailedTests ?? 0;

if (!correcta.reporte || correcta.codigo !== 0 || fallaron > 0) {
  console.error("✗ CA-5.1 Tus tests deben pasar contra la función correcta y hoy no pasan.");
  console.error(correcta.texto.split("\n").slice(-40).join("\n"));
  ok = false;
} else if (pasaron < 3) {
  console.error(`✗ CA-5.1 Hay ${pasaron} tests que pasan; se esperan al menos 3 (los it.todo no cuentan).`);
  ok = false;
} else if (testsSinComprobacion().length > 0) {
  console.error(
    `✗ CA-5.1 Cada test debe llamar a calcularTotalConDescuento o dibujar ResumenDescuento con render, y comprobar el resultado con expect. Estos no lo hacen: ${testsSinComprobacion().join(", ")}.`
  );
  ok = false;
} else {
  console.log(`✓ CA-5.1 Tus ${pasaron} tests pasan contra la función correcta.`);
  if (hayTestDeComponente) {
    console.log("✓ CA-5.4 Un test dibuja ResumenDescuento y lo busca con getByRole.");
  } else {
    console.error("✗ CA-5.4 Falta un test que dibuje ResumenDescuento con render y lo busque con getByRole.");
    ok = false;
  }
}

if (ok) {
  for (const [version, { etiqueta, nombre }] of Object.entries(VERSIONES)) {
    const r = correr(version, version);
    const fallidos = r.reporte?.numFailedTests ?? 0;
    if (fallidos > 0) {
      console.log(`✓ ${etiqueta} ${fallidos} test(s) se ponen en rojo con ${nombre}.`);
    } else {
      console.error(`✗ ${etiqueta} Todos tus tests pasan con ${nombre}. Agrega un test que la atrape.`);
      ok = false;
    }
  }
}

process.exit(ok ? 0 : 1);
