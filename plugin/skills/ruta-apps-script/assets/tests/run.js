// Ejecuta todas las pruebas: node tests/run.js
const fs = require('fs'), path = require('path');
let fallos = 0;
for (const f of fs.readdirSync(__dirname).filter(f => f.endsWith('.test.js')).sort()) {
  try { require(path.join(__dirname, f))(); console.log('OK   ' + f); }
  catch (e) { fallos++; console.log('FALLO ' + f + '\n  ' + (e && e.stack || e)); }
}
if (fallos) { console.log(fallos + ' prueba(s) fallida(s)'); process.exit(1); }
console.log('Todas las pruebas pasan');
