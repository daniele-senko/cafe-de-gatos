# Café de Gatos (Pixel Art Edition) - Autenticação & Backend

## Descrição

Este projeto é uma aplicação full-stack voltada para o gerenciamento de um Café de Gatos. O sistema atende ao requisito da atividade avaliativa: **"Autenticação com Google e validação do token no backend"**. 

A aplicação foi estruturada separando as responsabilidades entre o frontend e o backend. O frontend lida com a interface do usuário e inicia o fluxo de login com o Google, enquanto o backend recebe as requisições e valida o token de forma segura, garantindo que usuários não autorizados sejam bloqueados.

## Tecnologias utilizadas

**Frontend:**
* Vue.js 3
* Vuetify
* Firebase Authentication (SDK do Cliente)

**Backend:**
* Node.js
* Express.js (utilizando ES Modules: `import`/`export`)
* Firebase Admin SDK
* dotenv
* CORS

## Arquitetura do sistema

O fluxo arquitetural da autenticação funciona da seguinte maneira:

```
Usuário → Login Google (Firebase) → Frontend obtém getIdToken()
→ Envia token para backend → Backend valida assinatura com Firebase Admin
→ Backend retorna resposta de sucesso (200) ou bloqueio (401)
```

## Pré-requisitos

Para rodar este projeto, você precisará de:
* **Node.js** (versão 18+ recomendada) instalado.
* Conta ativa no Google/Firebase.
* Projeto do Firebase configurado (Authentication habilitado para Google).

## Instalação

O projeto está dividido em duas partes, que devem ser instaladas separadamente:

### Frontend

Abra um terminal na pasta raiz do projeto e instale as dependências:
```bash
npm install
```

### Backend

Abra um terminal na pasta `backend` e instale as dependências:
```bash
cd backend
npm install
```

## Configuração do backend (.env)

O backend realiza a validação criptográfica do token, exigindo comunicação direta com os servidores do Firebase. Para que ele inicie corretamente, é necessário configurar as variáveis de ambiente com as credenciais da sua Conta de Serviço (Service Account).

Dentro da pasta `backend`, crie um arquivo chamado `.env` (você pode copiar a estrutura do arquivo `backend/.env.example`) e preencha com as seguintes chaves geradas no painel do Firebase:

```env
FIREBASE_PROJECT_ID=seu-project-id
FIREBASE_CLIENT_EMAIL=seu-client-email
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nSUA_CHAVE_AQUI\n-----END PRIVATE KEY-----\n"
```

**Importante:** Nunca versione o arquivo `.env` contendo chaves reais. Ele já se encontra incluído no `.gitignore` por segurança.

## Fluxo de autenticação

O sistema executa a validação de identidade na seguinte ordem:

1. O usuário clica em "Login com Google" e se autentica pelo pop-up no frontend.
2. O Firebase valida as credenciais no lado do cliente e retorna os dados do usuário autenticado.
3. Imediatamente após o login, o frontend solicita o ID Token do usuário ao Firebase (`user.getIdToken()`).
4. O frontend faz uma requisição POST ao backend, enviando este token através do cabeçalho HTTP de autorização (`Authorization: Bearer <token>`).
5. O backend recebe a requisição, extrai o JWT e o valida de forma segura utilizando o Firebase Admin (`verifyIdToken`).
6. Se a assinatura do token for válida e dentro do tempo de expiração, o backend retorna sucesso. Se for forjado ou expirado, retorna erro.

## Endpoints do backend

A API expõe as seguintes rotas protegidas:

### `POST /api/auth/validate`

Rota responsável por receber e inspecionar a autenticidade do token.

* **Headers esperados:** `Authorization: Bearer <seu_id_token_aqui>`
* **Resposta de Sucesso (200 OK):** Retorna uma mensagem de confirmação junto dos dados estruturados do usuário autêntico.
* **Resposta de Erro (401 Unauthorized):** Retorna o bloqueio caso o token seja inválido, mal formatado ou não esteja presente.

## Segurança

O nível de segurança implementado garante que o projeto cumpra a exigência estabelecida:
* Todos os tokens são obrigatoriamente validados no servidor (backend).
* O backend **não confia** no payload bruto do frontend; ele ativamente reconstrói e verifica a assinatura e validade pelo `firebase-admin`.
* Tokens expirados, adulterados ou ausentes são prontamente rejeitados.
* Nenhuma chave sensível (`private_key`) é exposta, existindo exclusivamente na camada de servidor usando `.env`.

## Como rodar o projeto completo

Para que a aplicação opere de ponta a ponta e a validação do Google Auth ocorra, é preciso iniciar ambos os servidores (eles devem rodar simultaneamente).

1. **Inicie o Backend (em um terminal separado):**
   ```bash
   cd backend
   npm run dev
   ```
   *(O backend iniciará na porta 3000)*

2. **Inicie o Frontend:**
   ```bash
   npm run dev
   ```
   *(O frontend iniciará na porta configurada pelo Vite, geralmente 5173)*

Acesse a URL do frontend no navegador, faça login pelo botão de integração com o Google e verifique o console para atestar a comunicação de sucesso com o servidor.

## Possíveis erros

Se você encontrar algum comportamento inesperado, verifique a lista abaixo:
* **`Token inválido ou expirado` (HTTP 401):** O token JWT enviado é irreal ou atingiu a expiração estipulada de 1 hora pelo Google. Faça o login novamente.
* **`Erro de Conexão / ERR_CONNECTION_REFUSED`:** Ocorreu a tentativa de envio do token, mas o backend não está rodando. Certifique-se de ter rodado `npm run dev` dentro da pasta `backend`.
* **`Aviso: Variáveis de ambiente do Firebase não encontradas` / Falha de Startup Backend:** O arquivo `.env` na pasta `backend` não existe ou está incompleto. Configure-o de acordo com o `backend/.env.example`.
* **Bloqueio de CORS:** Pode ocorrer se o domínio do frontend for trocado sem aviso. O Express já está com o middleware CORS habilitado por padrão.

## Autor

* **Daniele Senko**
* Disciplina de Frameworks Modernos para Desenvolvimento de Sistemas (FACET-SNP-310)
