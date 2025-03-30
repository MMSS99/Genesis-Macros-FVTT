new Dialog({
    title: "Tirada modificada",
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
            <label for="tiradadividida">¿Es la tirada dividida?</label><br/>
            <input type="radio" name="tiradadividida" id="divididaNO" value="NO" checked /> No
            <input type="radio" name="tiradadividida" id="divididaSI" value="SI" /> Si
        </p>
        <p>
            <label for="vecesDividida">¿Dividida cuántas veces?</label>
            <input id="vecesDividida" type="number" class="inputs" value="2"/>
        </p>
      </div>
      <hr/>
      <div style="padding:2px 0px">
        <p>
            <label for="dadosPLUS">¿Cuentas con dados adicionales? (+D)</label>
            <input id="dadosPLUS" type="number" class="inputs" value="0"/>
        </p>
      </div>
      <div>
        <p>
            <label for="modPLUS">¿Modificador final? (+MOD)</label>
            <input id="modPLUS" type="number" class="inputs" value="0"/>
        </p>
      </div>`,
    buttons: {
      roll: {
        label: "Roll",
        callback: async (html) => {
            let tiradaDiv = html.find("input[name='tiradadividida']:checked").val();
            let dadosFinalesCaracteristica = 0;
          
            // sacamos el actor seleccionado
            const selectoractor = game.macros.get("1tnVvWQAtYaAjTdC");
            const actor = await selectoractor.execute();

            // obtenemos habilidad
            const caracteristica = actor.system.attributes.CHAR.XXX
            const habilidad = actor.system.attributes.HABXXX.XXXXXXX

            //calculamos dados a tirar finales y bonificador final
            let heridasLeves = actor.system.attributes.HERIDASLEVES.value;
            let heridasGraves = actor.system.attributes.HERIDASGRAVES.value;

            if (tiradaDiv === "SI") {
            dadosFinalesCaracteristica = Math.round((caracteristica.value - heridasGraves)/Number(html.find("#vecesDividida").val() || 1))}
            else {dadosFinalesCaracteristica = caracteristica.value - heridasGraves};

            if (dadosFinalesCaracteristica <= 0) {dadosFinalesCaracteristica = 1}

        

            let dadosFinales = dadosFinalesCaracteristica + Number(html.find("#dadosPLUS").val() || 0)
            let modificadorFinal = 0 - heridasLeves + Number(html.find("#modPLUS").val() || 0);


            // lanzamos tirada

            const rollmacro = game.macros.get("FXJH1rfQ0HSJemOX");
            await rollmacro.execute({
                actorID: actor._id,
                dadosBaseFinales: dadosFinales,
                modFinal: modificadorFinal,
                caracteristicalabel: caracteristica.label,
                habilidadvalue: habilidad.value,
                habilidadlabel: habilidad.label}
            );  



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