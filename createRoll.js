const actorID = scope.actorID;
const diceBASE = scope.dadosBaseFinales;
const modBASE = scope.modFinal;
const habVAL = scope.habilidadvalue;

const charLAB = scope.caracteristicalabel;
const habLAB = scope.habilidadlabel;

let totalDice = 0;
if (!Number(habVAL)) {
    totalDice = diceBASE
} else { totalDice = diceBASE + habVAL}

let rollFormula =  totalDice + "d6kh" + diceBASE + "+" + modBASE;
let roll = new Roll(rollFormula);

await roll.evaluate();

// Get only the kept dice
let keptDice = roll.terms[0].results
    .map(d => d.result)  // Extract dice results
    .sort((a, b) => b - a)  // Sort descending
    .slice(0, diceBASE);  // Keep the highest charVAL dice

// Count how many kept dice rolled a 6
let sixCount = keptDice.filter(d => d === 6).length;

// Calculate the total sum of kept dice
let keptSum = keptDice.reduce((sum, d) => sum + d, 0);

roll.toMessage({
    speaker: { alias: game.actors.get(actorID).name},
    flavor: `${habLAB? habLAB : charLAB} <br>Seises: ${sixCount} | Total: ${keptSum+modBASE}  <br>Dados finales: ${keptDice.join(", ")} `
});