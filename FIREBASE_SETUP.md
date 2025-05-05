# Configuração do Firebase

Este guia fornece instruções passo a passo para configurar o Firebase para o projeto Photo Opp.

## Pré-requisitos

- Conta Google
- Projeto criado no [Firebase Console](https://console.firebase.google.com/)

## 1. Criar um Projeto no Firebase

1. Acesse o [Firebase Console](https://console.firebase.google.com/)
2. Clique em "Adicionar projeto"
3. Digite um nome para o projeto (ex: "photo-opp")
4. Siga as instruções para criar o projeto

## 2. Configurar o Firestore Database

1. No menu lateral do Firebase Console, clique em "Firestore Database"
2. Clique em "Criar banco de dados"
3. Selecione "Iniciar no modo de produção" ou "Iniciar no modo de teste" (recomendado para desenvolvimento)
4. Escolha a região do servidor mais próxima de seus usuários
5. Clique em "Próximo" e depois em "Ativar"

### Criar Coleção de Logs

1. Após o Firestore ser ativado, clique em "Iniciar coleção"
2. Digite "logs" como ID da coleção
3. Clique em "Próximo"
4. Você pode adicionar um documento de teste ou pular esta etapa

## 3. Configurar o Storage

1. No menu lateral, clique em "Storage"
2. Clique em "Começar"
3. Selecione "Iniciar no modo de produção" ou "Iniciar no modo de teste"
4. Clique em "Próximo"
5. Selecione a região do servidor e clique em "Concluído"

### Configurar Regras de Storage

1. Após o Storage ser ativado, clique na aba "Regras"
2. Modifique as regras para permitir leitura pública e escrita autenticada:

\`\`\`
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null || true; // Remova "|| true" em produção
    }
  }
}
\`\`\`

3. Clique em "Publicar"

## 4. Gerar Chave de Conta de Serviço

1. No menu lateral, clique em "Configurações do projeto" (ícone de engrenagem)
2. Selecione a aba "Contas de serviço"
3. Em "Firebase Admin SDK", clique em "Gerar nova chave privada"
4. Clique em "Gerar chave" para baixar o arquivo JSON
5. Guarde este arquivo com segurança - ele contém credenciais sensíveis

## 5. Configurar Variáveis de Ambiente

1. Abra o arquivo JSON da conta de serviço baixado
2. Copie todo o conteúdo do arquivo
3. Configure a variável de ambiente `FIREBASE_SERVICE_ACCOUNT` com o conteúdo do JSON
4. Configure a variável de ambiente `FIREBASE_STORAGE_BUCKET` com o valor do bucket do seu projeto (geralmente `seu-projeto-id.appspot.com`)

### No Vercel

1. Acesse o dashboard do seu projeto no Vercel
2. Vá para "Settings" > "Environment Variables"
3. Adicione as variáveis:
   - Nome: `FIREBASE_SERVICE_ACCOUNT`, Valor: `{"type":"service_account",...}` (todo o JSON)
   - Nome: `FIREBASE_STORAGE_BUCKET`, Valor: `seu-projeto-id.appspot.com`
4. Clique em "Save" para salvar as variáveis

### Localmente

Crie um arquivo `.env.local` na raiz do projeto com o seguinte conteúdo:

\`\`\`
FIREBASE_SERVICE_ACCOUNT={"type":"service_account",...}
FIREBASE_STORAGE_BUCKET=seu-projeto-id.appspot.com
\`\`\`