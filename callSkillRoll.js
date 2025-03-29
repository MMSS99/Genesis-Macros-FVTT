// sacamos el actor seleccionado
console.log("n");
const selectoractor = game.macros.get("1tnVvWQAtYaAjTdC");
const actor = await selectoractor.execute();
console.log(actor); 

// obtenemos habilidad
const caracteristica = actor.system.attributes.CHAR.XXX
const habilidad = actor.system.attributes.HABXXX.XXXXXXX

console.log("NNI")

// lanzamos tirada
const rollmacro = game.macros.get("FXJH1rfQ0HSJemOX");
await rollmacro.execute({
    actorID: actor._id,
    caracteristicavalue: caracteristica.value,
    caracteristicalabel: caracteristica.label,
    habilidadvalue: habilidad.value,
    habilidadlabel: habilidad.label}
);