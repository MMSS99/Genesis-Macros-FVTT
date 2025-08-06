new Dialog({
    title: "Daño sufrido",
    content: `
      <style>
        .inputs {
          width: 50px; /* Adjusted width */
          float: right;
          text-align: center;
        }
      </style>
      <div style="padding:2px 0px">
        <p>
            <label for="danoSufrido">¿Daño a aguante sufrido?</label>
            <input id="danoSufrido" type="number" class="inputs" value="0"/>
        </p>
      </div>`,
    buttons: {
      roll: {
        label: "Dañar",
        callback: async (html) => {
            let dano = Number(html.find("#danoSufrido").val());
          
            const selectoractor = game.macros.get("1tnVvWQAtYaAjTdC");
            const actor = await selectoractor.execute();

            let aguanteACT = actor.system.attributes.AGUANTE.value;
            const aguanteMAX = actor.system.attributes.AGUANTE.max;

            let heridasLeves = actor.system.attributes.HERIDASLEVES.value;
            let heridasGraves = actor.system.attributes.HERIDASGRAVES.value;
            const heridasLIMIT = actor.system.attributes.HERIDASLEVES.max;
            const dureza = actor.system.attributes.HABFIS.DUREZA.value;

            let mensaje = actor.name + " sufre ";

            if (dano <= aguanteACT) {
                actor.update({"system.attributes.AGUANTE.value": (aguanteACT - dano)});
                mensaje += dano + "a su Aguante!"
                }
            else {
              var danoSufrido = dano;
              var aguanteRestante = aguanteACT;
              var accHeridas = 0;
              while (danoSufrido > aguanteRestante){
                danoSufrido -= aguanteRestante + dureza;
                aguanteRestante = aguanteMAX
                accHeridas += 1
              }
              aguanteRestante -= danoSufrido

              actor.update({"system.attributes.AGUANTE.value": aguanteRestante})
              if ((heridasLeves + accHeridas) >= heridasLIMIT){
                var heridasGravesSuf = Math.floor(accHeridas / heridasLIMIT);
                var accHeridas = accHeridas % heridasLIMIT;
                actor.update({"system.attributes.HERIDASGRAVES.value": (heridasGravesSuf + heridasGraves),
                              "system.attributes.HERIDASLEVES.value": (accHeridas + heridasLeves)})
                mensaje += accHeridas + " heridas leves y " + heridasGravesSuf + " heridas graves, manteniendo " + aguanteRestante + " aguante!"
              } else{
                actor.update({"system.attributes.HERIDASLEVES.value": (accHeridas + heridasLeves)})
                mensaje += accHeridas + " heridas leves , manteniendo " + aguanteRestante + " aguante!"
              }

              

            };

            ChatMessage.create({content: mensaje})

            



        }
      }
    },
    render: (html) => {
      // Ensure that styles are applied after the dialog is rendered
      html.find(".inputs").css({
        width: "50px",  // Or your desired width
        textAlign: "center",
        float: "right"
      });
    }
  }).render(true);