new Dialog({
    title: "Custom Dice Roll",
    content: `
      <style>
        .inputs {
          width: 50px; /* Adjusted width */
          float: right;
          text-align: center;
        }
      </style>
      <div style="padding:5px 0px">
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
        callback: (html) => {
          let diceCount = html.find("#dice-count").val() || 1;
          let roll = new Roll(`${diceCount}d6`);
          roll.roll().toMessage();
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