<?php
    include_once __DIR__.'/../../../data/database.php';

    if (isset($_POST)) {
        $email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
        $senha = $_POST['senha'];

        try {
            $conexao->select_db(Usuario."_"."dados");
            $BuscaUsuario = $conexao->query(" SELECT * FROM cadlogin WHERE Email like '%$email%' ");

            if ($BuscaUsuario->num_rows > 0) {
                $User = $BuscaUsuario->fetch_assoc(); 
                $conexao->select_db(Usuario."_".$User['Cpf_Cnpj']);
                $verifyPassword = $conexao->query("SELECT * FROM caduser WHERE EmailUser like '%$email%'");
                $verifyPassword = $verifyPassword->fetch_assoc();
                if(password_verify($senha, $verifyPassword['SenhaUser'])){
                    session_start();
                    $_SESSION['Cnpj'] = $verifyPassword['NomeUser'];
                    $_SESSION['Usuario'] = $verifyPassword['cpf_cnpj'];
                    $_SESSION['Nivel'] = $verifyPassword['Nivel'];
                    $_SESSION['SessaoAtiva'] = "S";
                    ?> <script> location.assign("../../../index.php") </script> <?php
                }else{
                    ?> <script> 
                            alert("Senha incorreta!") 
                            location.assign("../../../../index.html")
                        </script> 
                    <?php        
                }

            }else{
            ?> <script> 
                    alert("Usuario não encontrado!") 
                    location.assign("../../../../index.html")
                </script> 
            <?php
            }

        } catch (\Throwable $th) {
            throw $th;
        }

    }