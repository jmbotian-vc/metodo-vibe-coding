// Ejemplo de prueba: cada fichero *.test.js exporta una función que lanza un error si algo falla.
const assert = require('assert');
const { cargar } = require('./helpers');

module.exports = function () {
  const ctx = cargar();
  // Sustituye por una función real de tu Código.js, con datos inventados:
  // assert.strictEqual(ctx.normalizarTelefono_('600 11 22 33'), '600112233');
  assert.ok(ctx, 'El código se carga sin errores');
};
