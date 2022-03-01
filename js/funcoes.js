function validarEquipamento(idNomeEquipamento, idCodEquipamento, idDetalEquipamento, idQtidadeEquipamento, idProcEquipamento) {
    let nome = document.getElementById(idNomeEquipamento).value;
    let codigo = document.getElementById(idCodEquipamento).value;
    let det = document.getElementById(idDetalEquipamento).value;
    let qtidade = document.getElementById(idQtidadeEquipamento).value;
    let proc = document.getElementById(idProcEquipamento).value;

    if (nome == "")
        alert("Nome do Equipamento não pode estar em branco. Favor preenchê-lo!");
    else if (codigo == "")
        alert("Os detalhes do Equipamento não podem estar em branco. Favor preenchê-lo!");
    else cadastrarEquipamento(nome, codigo, det, parseInt(qtidade), proc);
}

function cadastrarEquipamento(equipamento, codig, detalhe, qtidade, proce) {
    let novoEquipamento = {nome:equipamento, codigo:codig, detalhes:detalhe, quantidade:qtidade, procede:proce};

    if (typeof(Storage) !== "undefined") {
        let equipamentos = localStorage.getItem("equipamentos");
        if (equipamentos == null) equipamentos = [];
        else equipamentos = JSON.parse(equipamentos);
        equipamentos.push(novoEquipamento);
        localStorage.setItem("equipamentos",JSON.stringify(equipamentos))
        alert("O equipamento foi cadastrado com sucesso e já está no painel de estoque.");
        atualizarTotalEstoque("totalEstoque");
        location.reload();
    } 
    else alert("A versão do seu navegador é muito antiga. Por isso, não será possível executar essa aplicação");
}

function atualizarTotalEstoque(idCampo) {
    localStorage.setItem("totalEstoque",++document.getElementById(idCampo).innerHTML)
}

function carregarTotalEstoque(idCampo) {
    if (typeof(Storage) !== "undefined") {
        let totalEstoque = localStorage.getItem("totalEstoque");
        if (totalEstoque == null) totalEstoque = 0;
        document.getElementById(idCampo).innerHTML = totalEstoque;
    }
    else alert("A versão do seu navegador é muito antiga. Por isso, não será possível executar essa aplicação");
}

function listarEstoque() {
    if (typeof(Storage) !== "undefined") {
        let equipamentos = localStorage.getItem("equipamentos");
        document.write("<h1>Equipamentos do Estoque:</h1>")
        if (equipamentos == null)
            document.write("<h3>Ainda não há nenhum item no estoque</h3>");
        else {
            equipamentos = JSON.parse(equipamentos);
            equipamentos.forEach(equipamento => {
                document.write("<ul>");
                document.write("<li>Tipo: "+equipamento.nome+"</li>");
                document.write("<li>Responsável: "+equipamento.codigo+"</li>");
                document.write("<li>Localização: "+equipamento.detalhes+"</li>");
                document.write("<li>É doação?: "+equipamento.quantidade+"</li>");
                document.write("<li>Mais detalhes: "+equipamento.procede+"</li>");
                document.write("</ul>");
            });
        }
    } 
    else alert("A versão do seu navegador é muito antiga. Por isso, não será possível visualizar o estoque!");    
}