<?php

function limpar_texto($str)
{
    return preg_replace("/[^0-9]/","", $str);
}

function FormatarFloat($str)
{   $temp = preg_replace("/[^0-9,]/", "", $str);
    return str_replace(",", ".", $temp);
}

function ConverterDateTimeString($datetime)
{
    if (strlen($datetime) == 19) {
        $temp2 = substr($datetime, 0, 10);
        $temp3 = substr($datetime, 11, 5);
        $temp = explode('-', $temp2);
        $temp4 = implode('/', array_reverse($temp));
        return $temp4 . " " . $temp3;
    } else {
        return false;
    }
}

function converterDateString($date)
{
    
    $temp = explode('/', $date);
    $temp2 = implode('-', array_reverse($temp));
    if (strlen($temp2) == 10) {
        return $temp2;
    } else {
        return false;
    }
}

function converterStringDate($date)
{
    $temp = explode('-', $date);
    $temp2 = implode('/', array_reverse($temp));
    if (strlen($temp2) == 10) {
        $retorno = $temp2;
    } else {
        $retorno = 2000 - 01 - 01;
    }
    return $retorno;
}

function converterStrTelefone($tel) /* FORMATO (00) 00000 - 0000 */
{
    $temp = $tel;
    if (strlen($temp) == 11) {
        $ddd = substr($temp, 0, 2);
        $tel1 = substr($temp, 3, 6);
        $tel2 = substr($temp, 7);
        $telCompleto = "($ddd) $tel1 - $tel2";
    } else
        if (strlen($temp) == 10) {
        $ddd = substr($temp, 0, 2);
        $tel1 = substr($temp, 2, 4);
        $tel2 = substr($temp, 6);
        $telCompleto = "($ddd) $tel1 - $tel2";
    } else {
        $telCompleto = "";
    }
    return $telCompleto;
}

function converterStrCpfCnpj($input)
{
    $temp = $input;
    if (strlen($temp) == 11) {
        $temp1 = substr($temp, 0, 3);
        $temp2 = substr($temp, 3, 3);
        $temp3 = substr($temp, 6, 3);
        $temp4 = substr($temp, 9);
        $retorno = "$temp1.$temp2.$temp3-$temp4";
    } elseif (strlen($temp) == 14) {
        $temp1 = substr($temp, 0, 2);
        $temp2 = substr($temp, 2, 3);
        $temp3 = substr($temp, 5, 3);
        $temp4 = substr($temp, 8, 4);
        $temp5 = substr($temp, 12);
        $retorno = "$temp1.$temp2.$temp3/$temp4-$temp5 ";
    } else {
        $retorno = "";
    }
    return $retorno;
}

function enviarImagemParaPasta($tempSize, $Name, $tempName)
{
    $localSalvar = 'img/upload/';
    if ($tempSize > 2097152) {
        die('Aqruivo muito grande!');
    }
    $extensao = strtolower(pathinfo($Name, PATHINFO_EXTENSION));
    $NameNovo = uniqid();
    $pathSalvar = $localSalvar . $NameNovo . '.' . $extensao;
    $path = '../' . $pathSalvar;
    $deuCerto = move_uploaded_file($tempName, $path);
    if ($deuCerto) {
        return $pathSalvar;
    } else {
        return false;
    }
}

function removeImagem($caminho)
{
    $deucerto = unlink($caminho);
    if ($deucerto) {
        return true;
    } else {
        return false;
    }
}

function gerarExcel($arquivo, $html)
{
    // Configurações header para forçar o download
    header("Expires: Mon, 07 Jul 2016 05:00:00 GMT");
    header("Last-Modified: " . gmdate("D,d M YH:i:s") . " GMT");
    header("Cache-Control: no-cache, must-revalidate");
    header("Pragma: no-cache");
    header("Content-type: application/x-msexcel");
    header("Content-Disposition: attachment; filename=\"{$arquivo}\"");
    header("Content-Description: PHP Generated Data");
    // Envia o conteúdo do arquivo
    echo $html;
}

function acrescentarDias($data, $qtdDias) {
    if (!empty($data)) {
        $temp = new DateTime($data); // Cria um objeto DateTime com a data fornecida
        $temp->add(new DateInterval('P' . $qtdDias . 'D')); // Acrescenta a quantidade de dias especificada
        return $temp->format('Y-m-d'); // Formata a data e retorna
    }else{
        $temp = new DateTime(date('d-m-Y'));
        $temp->add(new DateInterval('P' . $qtdDias . 'D'));
        return $temp; // Retorna null se a data estiver vazia
    }
}

function acrescentarMes($data, $qtdMes) {
    if (!empty($data)) {
        $temp = new DateTime($data); // Cria um objeto DateTime com a data fornecida
        $temp->add(new DateInterval('P' . $qtdMes . 'M')); // Acrescenta a quantidade de dias especificada
        return $temp->format('Y-m-d'); // Formata a data e retorna
    }else{
        return null; // Retorna null se a data estiver vazia
    }
}

// Função para calcular a diferença em meses até 31-12-2050
function mesesAte2050() {
    // Data atual
    $dataAtual = new DateTime();
    
    // Data alvo (31-12-2050)
    $dataAlvo = new DateTime('2050-12-31');
    
    // Calcula a diferença entre as datas
    $diferenca = $dataAtual->diff($dataAlvo);
    
    // Calcula os meses totais de diferença
    $mesesRestantes = ($diferenca->y * 12) + $diferenca->m;
    
    return $mesesRestantes +1;
}


