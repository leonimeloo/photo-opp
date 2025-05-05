# Photo Opp

Aplicação interativa desenvolvida para estandes de eventos, permitindo que os participantes interajam com uma tela touchscreen para tirar uma foto com uma moldura personalizada do evento.

## Links

- **Aplicativo**: [https://photo-opp.vercel.app/](https://photo-opp.vercel.app/)
- **Dashboard Admin**: [https://photo-opp.vercel.app/dashboard](https://photo-opp.vercel.app/dashboard)

## Setup

1. **Clone o repositório**
   ```bash
   git clone https://github.com/leonimeloo/photo-opp.git
   cd photo-opp
   ```
2. **Instale as dependências**
   ```bash
   npm install
   ```
3. **Variáveis de ambiente**

   Crie um arquivo `.env.local` na pasta raiz do projeto, seguindo o exemplo abaixo:
   ```env
   FIREBASE_SERVICE_ACCOUNT_KEY=conteudo_do_json_da_service_account_key
   FIREBASE_STORAGE_BUCKET=nome_do_bucket_no_firebase
   ```

4. **Executar o servidor de desenvolvimento**

   Inicie o servidor de desenvolvimento do Next.js:
   ```bash
   npm run dev
   ```
   Por padrão, o servidor iniciará em `http://localhost:3000`.

5. **Construir para produção**

   Para construir uma build em produção:
   ```bash
   npm run build
   ```

6. **Iniciar o servidor de produção**

   Após a construção, inicie o servidor de produção:
   ```bash
   npm run start
   ```

## Configuração

Para configurar o projeto, consulte:

- [Configuração do Firebase](./FIREBASE_SETUP.md) - Instruções para configurar o Firebase
- [Showcase da Aplicação](./APP_SHOWCASE.md) - Visualização das telas e funcionalidades

## 🛠 Tecnologias Utilizadas

- Node.JS: versão 18.20.x
- Next.JS: App Router e API
- Shadcn UI
- Sharp
- Firebase: Firestore e Storage
- Vercel

## Documentação da API

O Photo Opp oferece uma API RESTful para interação com o aplicativo. Abaixo estão as rotas disponíveis:

### Logs

#### GET `/api/logs`

Retorna estatísticas e histórico de logs do aplicativo.

**Resposta:**
\`\`\`json
{
  "appIniciado": 42,
  "fotosSalvas": 28,
  "fotosDescartadas": 14,
  "logs": [
    {
      "event": "appIniciado",
      "action": null,
      "timestamp": "2023-05-15T14:30:45.123Z"
    },
    {
      "event": "fotoTirada",
      "action": "salvar",
      "timestamp": "2023-05-15T14:32:12.456Z"
    }
  ]
}
\`\`\`

#### POST `/api/logs/application`

Registra o início de uma nova sessão do aplicativo.

**Corpo da requisição:** Nenhum

**Resposta:**
\`\`\`json
{
  "message": "Log registrado com sucesso!"
}
\`\`\`

#### POST `/api/logs/photos`

Registra ações relacionadas a fotos (salvar ou descartar).

**Corpo da requisição:**
\`\`\`json
{
  "action": "salvar" // ou "descartar"
}
\`\`\`

**Resposta:**
\`\`\`json
{
  "message": "Log de foto registrado com sucesso!"
}
\`\`\`

#### GET `/api/logs/photos`

Retorna URLs de todas as imagens armazenadas.

**Resposta:**
\`\`\`json
{
  "imageUrls": [
    "https://storage.googleapis.com/photo-opp.appspot.com/imagens/abc123.png",
    "https://storage.googleapis.com/photo-opp.appspot.com/imagens/def456.png"
  ]
}
\`\`\`

### Processamento de Imagens

#### POST `/api/generate`

Aplica a moldura personalizada à imagem enviada.

**Corpo da requisição:**
\`\`\`json
{
  "image": "data:image/png;base64,..." // Base64 da imagem
}
\`\`\`

**Resposta:**
\`\`\`json
{
  "image": "data:image/png;base64,..." // Base64 da imagem com moldura
}
\`\`\`

#### POST `/api/upload`

Faz upload da imagem para o Firebase Storage.

**Corpo da requisição:**
\`\`\`json
{
  "image": "data:image/png;base64,..." // Base64 da imagem
}
\`\`\`

**Resposta:**
\`\`\`json
{
  "image": "https://storage.googleapis.com/photo-opp.appspot.com/imagens/abc123.png"
}
\`\`\`