function loadVeiculos() {
  const table = $("#table-body");

  table.empty();

  $.get("http://localhost:3333/veiculos", (veiculos) => {
    veiculos.forEach((veiculo) => {
      table.append(`<tr>
      <td>${veiculo.id}</td>
      <td>${veiculo.marca}</td>
      <td>${veiculo.modelo_veiculo}</td>
      <td>${veiculo.placa}</td>
      <td>${veiculo.cor}</td>
      <td>${veiculo.ano_fabricacao}</td>
      <td class="small">
        <button class="btn btn-info" onclick="loadVeiculo(${veiculo.id})">Editar</button>
      </td>
      <td class="small">
        <button class="btn btn-danger" onclick="deleteVeiculo(${veiculo.id})">Excluir</button>
      </td>
    </tr>`);
    });
  });
}

function loadVeiculo(id) {
  if (id)
    $.get(`/veiculos/${id}`, (veiculo) => {
      $("#id").val(veiculo.id);
      $("#marca").val(veiculo.marca);
      $("#modelo_veiculo").val(veiculo.modelo_veiculo);
      $("#placa").val(veiculo.placa);
      $("#cor").val(veiculo.cor);
      $("#ano_fabricacao").val(veiculo.ano_fabricacao);
    });
  else {
    $("#id").val("");
    $("#marca").val("");
    $("#modelo_veiculo").val("");
    $("#placa").val("");
    $("#cor").val("");
    $("#ano_fabricacao").val("");
  }
}

function storeVeiculo(id, data) {
  const url = `http://localhost:3333/veiculos${id ? "/" + id : ""}`;

  $("#form-veiculo :input").prop("disabled", true);

  $.ajax({
    url,
    type: id ? "PUT" : "POST",
    contentType: "application/json",
    data: JSON.stringify(data),
  })
    .done(() => {
      loadVeiculo();
      loadVeiculos();
    })
    .fail((err) => {
      console.log(err);

      alert("Ocorreu um erro ao tentar salvar");
    })
    .always(() => {
      $("#form-veiculo :input").prop("disabled", false);
    });
}

function deleteVeiculo(id) {
  $.ajax({
    url: `http://localhost:3333/veiculos/${id}`,
    type: "DELETE",
  })
    .done(() => {
      loadVeiculos();
    })
    .fail((err) => {
      console.log(err);

      alert("Ocorreu um erro ao tentar excluir");
    });
}

function onSubmit(ev) {
  ev.preventDefault();

  const id = $("#id").val();
  const marca = $("#marca").val();
  const modelo_veiculo = $("#modelo_veiculo").val();
  const placa = $("#placa").val();
  const cor = $("#cor").val();
  const ano_fabricacao = $("#ano_fabricacao").val();

  const data = { marca, modelo_veiculo, placa, cor, ano_fabricacao };

  storeVeiculo(id, data);
}

$(document).ready(() => {
  loadVeiculos();
});
