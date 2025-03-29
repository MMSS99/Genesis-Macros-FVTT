// sacamos el actor seleccionado
const selectoractor = game.macros.get("1tnVvWQAtYaAjTdC");
const actor = await selectoractor.execute();

// obtenemos habilidad
const caracteristica = actor.system.attributes.CHAR.XXX
const habilidad = actor.system.attributes.HABXXX.XXXXXXX


// lanzamos tirada
const rollmacro = game.macros.get("FXJH1rfQ0HSJemOX");
await rollmacro.execute({
    actorID: actor._id,
    caracteristicavalue: caracteristica.value,
    caracteristicalabel: caracteristica.label,
    habilidadvalue: habilidad.value,
    habilidadlabel: habilidad.label}
);