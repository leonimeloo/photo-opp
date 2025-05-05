# Photo Opp

Aplicação interativa desenvolvida para estandes de eventos, permitindo que os participantes interajam com uma tela touchscreen para tirar uma foto com uma moldura personalizada do evento.

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

## 🛠 Tecnologias Utilizadas

- Node.JS: versão 18.20.x
- Next.JS: App Router e API
- Sharp
- Firebase: Firestore e Storage
- Vercel