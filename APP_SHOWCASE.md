# Photo Opp - Showcase da Aplicação

Este documento apresenta as principais telas e funcionalidades do aplicativo Photo Opp.

## Telas do Aplicativo

### Página Inicial

A página inicial apresenta o logo e o botão para iniciar a experiência de captura de fotos.

**Rota:** `/`

**Funcionalidades:**
- Botão "Iniciar" para acessar a câmera
- Registro de log de início de sessão

### Câmera

Interface de captura de fotos com acesso à câmera do dispositivo.

**Rota:** `/camera`

**Funcionalidades:**
- Acesso à câmera frontal e traseira
- Botão para alternar entre câmeras
- Botão de captura com contagem regressiva
- Efeito de flash ao tirar foto

### Preview da Foto

Tela de visualização da foto capturada com a moldura aplicada.

**Rota:** `/preview`

**Funcionalidades:**
- Visualização da foto com moldura
- Opções para refazer ou continuar
- Geração de QR Code para download após salvar
- Botão de finalização

### Modal de Agradecimento

Modal exibido após finalizar o processo, agradecendo pela participação.

**Funcionalidades:**
- Mensagem de agradecimento
- Redirecionamento automático para a página inicial após 5 segundos

## Dashboard Administrativo

### Visão Geral

Painel administrativo com estatísticas e visualização de imagens.

**Rota:** `/dashboard`

**Funcionalidades:**
- Estatísticas de uso (sessões iniciadas, fotos salvas, fotos descartadas)
- Lista de imagens capturadas com visualização
- Histórico de logs de ações
- Botão para atualizar dados

### Lista de Imagens

Seção do dashboard que exibe todas as imagens capturadas.

**Funcionalidades:**
- Visualização em miniatura das imagens
- Link para visualização em tamanho completo
- Nome do arquivo e número sequencial

### Histórico de Logs

Seção do dashboard que exibe o histórico de ações no aplicativo.

**Funcionalidades:**
- Registro de eventos (início de sessão, captura de foto)
- Registro de ações (salvar, descartar)
- Data e hora de cada evento

## Fluxo de Uso

1. Usuário acessa a página inicial
2. Clica em "Iniciar" para acessar a câmera
3. Captura uma foto (contagem regressiva de 3 segundos)
4. Visualiza a foto com a moldura aplicada
5. Decide entre refazer ou continuar
6. Se continuar, a foto é salva e um QR Code é gerado para download
7. Finaliza o processo e recebe uma mensagem de agradecimento
8. É redirecionado para a página inicial

## Responsividade

O aplicativo é totalmente responsivo, adaptando-se a diferentes tamanhos de tela:

- **Desktop:** Layout otimizado para monitores maiores
- **Tablet:** Adaptação para telas médias
- **Mobile:** Experiência otimizada para smartphones
