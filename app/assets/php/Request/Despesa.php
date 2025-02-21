<?php
if (!isset($_SESSION)) {session_start();}
require_once __DIR__ . "/../../../data/database.php";

if (isset($_SESSION['SessaoAtiva'])) {
    if (isset($_POST)) {
        if ($_POST['Requisicao'] === "Pesquisar") {
            if ($_POST['data_inicial'] && $_POST['data_final']) {
                $Data1 = $_POST['data_inicial'];
                $Data2 = $_POST['data_final'];
                $sqlPesq = "SELECT * 
                FROM cp_lancamentos a 
                WHERE a.DataVencimento BETWEEN '$Data1' AND '$Data2'";

                if (!empty($_POST['Descricao'])) {
                    $Descricao  = $_POST['Descricao'];
                    $sqlAndDescricao = " (AND a.Descricao LIKE '%$Descricao%' OR a.Controle LIKE '%$Descricao%')";
                }

                if (!empty($_POST['Categoria'])) {
                    $idCat = intval(limpar_texto($_POST['Categoria']));
                    $sqlAndCategoria .= " AND a.idCategoria = $idCat";
                    if (!empty($_POST['SubCategoria'])) {
                        $idSub = limpar_texto($_POST['SubCategoria']);
                        $sqlAndCategoria .= " AND a.id_SubCategoria = $idSub";
                    }
                }

                if (!empty($_POST['Tipo'])) {
                    $Tipo = $_POST['Tipo'];
                    $sqlAndTipo = " AND a.Tipo = '$Tipo'";
                }

                if (!empty($_POST['Situacao'])) {
                    $Situacao = $_POST['Situacao'];
                    $sqlAndSituacao = " AND a.Confirmada = '$Situacao'";
                }

                $sqlPesq .= $sqlAndDescricao ?? "";
                $sqlPesq .= $sqlAndCategoria ?? "";
                $sqlPesq .= $sqlAndTipo ?? "";
                $sqlPesq .= $sqlAndSituacao ?? "";
                $sqlPesq .= " ORDER BY a.DataVencimento ASC";

                try {
                    $PesqCpLancamentos = $conexao->query($sqlPesq);
                    $PesqCpLancamentos = $PesqCpLancamentos->fetch_all(MYSQLI_ASSOC);
                    $retorno = array("Retorno" => "OK", "Dados" => $PesqCpLancamentos);
                    echo json_encode($retorno);
                    exit;
                } catch (\Throwable $th) {
                    $retorno = array("Retorno" => "ERRO", "Motivo" => "Consulta SQL: " . $th->getMessage());
                    echo json_encode($retorno);
                    exit;
                }
            }
        }
    }
} else {
    $retorno = ["Retorno" => "ERRO", "Motivo" => "Sessão não ativa"];
    echo json_encode($retorno);
    die();
}
