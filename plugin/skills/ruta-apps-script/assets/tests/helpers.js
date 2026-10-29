// Carga apps-script/Código.js en un contexto aislado con servicios de Apps Script simulados.
// Todos los datos de las pruebas son inventados: aquí no hay datos reales de las hojas.
// Ajusta el nombre del fichero y los servicios simulados a tu proyecto.
const fs = require('fs'), path = require('path'), vm = require('vm');
const CODIGO = fs.readFileSync(path.join(__dirname, '..', 'apps-script', 'Código.js'), 'utf8');

function cargar(extra) {
  const ctx = Object.assign({
    console, JSON, Date, Math, Number, String, Object, Array, Set, isFinite,
    PropertiesService: { getScriptProperties: () => ({ getProperty: () => null }) },
    LockService: { getScriptLock: () => ({ tryLock: () => true, releaseLock: () => {} }) },
    Utilities: { getUuid: () => 'uuid' }
  }, extra || {});
  vm.createContext(ctx);
  vm.runInContext(CODIGO, ctx, { filename: 'Código.js' });
  return ctx;
}

module.exports = { cargar };
