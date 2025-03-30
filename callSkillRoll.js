// sacamos el actor seleccionado
const selectoractor = game.macros.get("1tnVvWQAtYaAjTdC");
const actor = await selectoractor.execute();

// obtenemos habilidad
const caracteristica = actor.system.attributes.CHAR.XXX
const habilidad = actor.system.attributes.HABXXX.XXXXXXX

//calculamos dados a tirar finales y bonificador final
let heridasLeves = actor.system.attributes.HERIDASLEVES.value;
let heridasGraves = actor.system.attributes.HERIDASGRAVES.value;

let dadosFinalesCaracteristica = caracteristica.value - heridasGraves;
let modificadorFinal = 0 - heridasLeves;

if (dadosFinalesCaracteristica <= 0) {dadosFinalesCaracteristica = 1}


// lanzamos tirada
const rollmacro = game.macros.get("FXJH1rfQ0HSJemOX");
await rollmacro.execute({
    actorID: actor._id,
    dadosBaseFinales: dadosFinalesCaracteristica,
    modFinal: modificadorFinal,
    caracteristicalabel: caracteristica.label,
    habilidadvalue: habilidad.value,
    habilidadlabel: habilidad.label}
);