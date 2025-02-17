<?php 
    include_once __DIR__."/env/config";
    include_once __DIR__."/funcoes.php";

    try {
        $conexao = new mysqli(Servidor, Usuario, Senha, DataBase, Porta);
    } catch (\Throwable $th) {
        ?> <script>alert('Erro na Conexao')</script> <?php
        die("Erro conexão: ". $th->getMessage());
    }