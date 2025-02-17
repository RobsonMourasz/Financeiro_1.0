<?php
    include_once __DIR__.'/../../../data/database.php';

    if (isset($_POST)) {
        $email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
        $senha = $_POST['senha'];
        $tempPassword = password_hash($senha, PASSWORD_DEFAULT);

        try {
            $BuscaUsuario = $conexao->query(" SELECT * FROM caduser WHERE EmailUser like '%$email%' ");

            if ($BuscaUsuario->num_rows > 0) {
                $User = $BuscaUsuario->fetch_all(MYSQLI_ASSOC); 
                $verifyPassword = $conexao->query("SELECT * FROM caduser WHERE EmailUser like '%$email%'");
                $verifyPassword = $verifyPassword->fetch_all(MYSQLI_ASSOC);
                if(password_verify($tempPassword, $verifyPassword['SenhaUser'])){
                    ?> <script> location.assign("app/index.php") </script> <?php
                }else{
                    ?> <script> alert("Senha incorreta!") </script> <?php        
                }

            }else{
            ?> <script> alert("Usuario não encontrado!") </script> <?php
            }

        } catch (\Throwable $th) {
            throw $th;
        }

    }