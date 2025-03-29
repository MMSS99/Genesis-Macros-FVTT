// comprobamos que el jugador tiene un actor seleccionado
let actor = game.user.character;

// si no lo tiene, vemos si tiene un token controlado seleccionado
if (!actor) {
    let token = canvas.tokens.controlled[0];
    if (token) {
        actor = token.actor;
        return actor
    } else {ui.notifications.warn("no actor seleccionado pisha")
    }
} else {
    return actor
}