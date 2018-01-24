<?php
 header("Access-Control-Allow-Origin: *");
 echo '
 [{
   "id": 1,
   "nome": "Pizzaria Terra Nostra",
   "descricao": "Lorem Ipsum is simply dummy text of the printing and.",
   "telefone": "(17) 3265-3265",
   "celular": "(17) 99194-0256",
   "endereco": "Rua benedito ramalho junior, 10",
   "imagem": "pizza.png",
   "banner": "https://lh5.googleusercontent.com/p/AF1QipM8tC9MjL7o3u0iZ2BOQUJZPgm5IePR04ynWcyE=w408-h306-k-no"
   "cardapio": {
     "nome": "Pizza de teste",
     "Descrição": "Feita de teste e amor com uma pitada de bug",
     "valor": "19.00"
   }
 }]
';
 ?>
