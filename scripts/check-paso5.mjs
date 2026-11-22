// Verificador del Paso 5. Corre tests/paso05.test.tsx tres veces:
//   1. contra la función correcta: todo debe pasar y debe haber al menos 3 tests;
//   2. y 3. contra cada versión con un bug: al menos un test debe fallar.
import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const ARCHIVO = "tests/paso05.test.tsx";
const VERSIONES = {
  sumaElDescuento: "suma el descuento en lugar de restarlo",
  noValidaRangos: "acepta precios negativos y porcentajes fuera de 0 a 100",
};
const carpeta = mkdtempSync(path.join(tmpdir(), "paso5-"));

function correr(nombre, version) {
  const salida = path.join(carpeta, `${nombre}.json`);
  const env = { ...process.env };
  if (version) env.PASO5_VERSION = version;
  else delete env.PASO5_VERSION;
  const r = spawnSync(
    "npx",
    ["vitest", "run", ARCHIVO, "--reporter=json", `--outputFile=${salida}`],
    { env, encoding: "utf-8", shell: process.platform === "win32" }
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
} else {
  console.log(`✓ CA-5.1 Tus ${pasaron} tests pasan contra la función correcta.`);
}

if (ok) {
  for (const [version, descripcion] of Object.entries(VERSIONES)) {
    const r = correr(version, version);
    const fallidos = r.reporte?.numFailedTests ?? 0;
    const etiqueta = version === "sumaElDescuento" ? "CA-5.2" : "CA-5.3";
    if (fallidos > 0) {
      console.log(`✓ ${etiqueta} ${fallidos} test(s) se ponen en rojo con la versión que ${descripcion}.`);
    } else {
      console.error(`✗ ${etiqueta} Todos tus tests pasan con una versión que ${descripcion}. Agrega un test que la atrape.`);
      ok = false;
    }
  }
}

process.exit(ok ? 0 : 1);
