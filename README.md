# Dice and Dragons - RPG Character Manager

## 📋 Descrição do Projeto

O **Dice and Dragons** é uma aplicação web para gerenciamento de personagens de RPG desenvolvida em React com TypeScript. A aplicação permite que os usuários criem, gerenciem e customizem personagens de RPG com atributos, vantagens, desvantagens, perícias, equipamentos e magias.
Sendo um fork do projeto original [Atto RPG]

## 🏗️ Arquitetura do Projeto

### Estrutura de Pastas

```
src/
├── components/          # Componentes React
│   ├── Attributes/      # Gerenciamento de atributos
│   ├── Character/       # Página principal do personagem
│   ├── CharacterResume/ # Resumo do personagem
│   ├── CharSelector/    # Seletor de personagens
│   ├── Equips/         # Equipamentos
│   ├── Flaws/          # Desvantagens
│   ├── Header/         # Cabeçalho
│   ├── Login/          # Página de login
│   ├── Menu/           # Menu de navegação
│   ├── Perks/          # Vantagens
│   ├── Skills/         # Perícias
│   └── Spells/         # Magias
├── contexts/           # Contexts React
│   ├── AuthGoogleProvider.tsx
│   ├── CharactersProvider.tsx
│   ├── PointsResumeProvider.tsx
│   └── ToastifyProvider.tsx
├── services/           # Serviços e configurações
│   ├── firebase-config.ts
│   └── gameData.ts
├── utils/             # Utilitários
│   ├── numberMask.tsx
│   ├── numberMaskWithNegative.tsx
│   └── numberWithDecimalsMask.tsx
└── assets/            # Imagens e recursos
```

## 🔧 Tecnologias Utilizadas

- **React 18** - Biblioteca principal
- **TypeScript** - Tipagem estática
- **Firebase** - Autenticação e banco de dados
- **React Router DOM** - Roteamento
- **React Hook Form** - Gerenciamento de formulários
- **Sass** - Estilização
- **Vite** - Bundler e servidor de desenvolvimento

## 🚀 Configuração do Ambiente

### 1. Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn
- Conta no Firebase

### 2. Instalação

```bash
# Clone o repositório
git clone [https://github.com/DiogenesYazan/DiceAndDragons.git]

# Navegue para o diretório
cd DiceAndDragons

# Instale as dependências
npm install
```

### 3. Configuração do Firebase

1. Crie um projeto no [Firebase Console](https://console.firebase.google.com/)
2. Habilite a **Authentication** com Google Sign-In
3. Crie um banco **Firestore Database**
4. Obtenha as credenciais do projeto

### 4. Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_FIREBASE_API_KEY=sua_api_key_aqui
VITE_FIREBASE_AUTH_DOMAIN=seu_projeto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=seu_project_id
VITE_FIREBASE_STORAGE_BUCKET=seu_projeto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
VITE_FIREBASE_APP_ID=seu_app_id
VITE_FIREBASE_MEASUREMENT_ID=seu_measurement_id
```

### 5. Executar o Projeto

```bash
# Modo desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

## 📱 Como Usar a Aplicação

### 1. Login
- A aplicação inicia na tela de login
- Clique em "Continuar com Google" para autenticar
- Após o login, você será redirecionado para a página inicial

### 2. Criação de Personagem
- Na página inicial, clique em "Novo personagem"
- Preencha os dados básicos:
  - Nome do personagem
  - Gênero
  - Experiência (XP)
  - Idade (opcional)
  - Altura (opcional)
  - Peso (opcional)
  - Escolha um avatar
- Clique em "Criar personagem"

### 3. Gerenciamento de Personagem
Após criar um personagem, você pode:

#### Atributos
- Definir valores para: Força, Destreza, Inteligência, Saúde, Pontos de Vida, Vontade, Percepção, Pontos de Fadiga
- O sistema calcula automaticamente a soma dos pontos gastos

#### Vantagens (Perks)
- Adicionar vantagens como: Aparência, Ambidestria, Aptidão Mágica, etc.
- Definir nível e modificadores
- Calcular pontos gastos automaticamente

#### Desvantagens (Flaws)
- Adicionar desvantagens como: Alcoolismo, Cegueira, Covardia, etc.
- Definir nível e modificadores
- Ganhar pontos extras (valores negativos)

#### Perícias (Skills)
- Gerenciar perícias como: Mobilidade, Armas Brancas, Sobrevivência, etc.
- Definir nível de habilidade e modificadores
- Associar com atributos base

#### Equipamentos
- Adicionar equipamentos com peso e custo
- Gerenciar inventário do personagem

#### Magias (Spells)
- Adicionar magias por nível
- Definir nível de habilidade mágica
- Gerenciar grimório do personagem

## 🔄 Fluxo de Dados

### Contextos Principais

1. **AuthGoogleProvider**: Gerencia autenticação com Google
2. **PointsResumeProvider**: Calcula pontos gastos em tempo real
3. **CharactersProvider**: Gerencia dados dos personagens
4. **ToastifyProvider**: Notificações para o usuário

### Estrutura do Banco de Dados (Firestore)

```
users/
  └── {userId}/
      └── characters/
          └── {characterId}/
              ├── (dados básicos do personagem)
              ├── attributes/
              │   ├── strength: { value: "10" }
              │   ├── dexterity: { value: "10" }
              │   └── ... (outros atributos)
              ├── perks/
              │   └── {perkId}: { description, level, mod, obs, points }
              ├── flaws/
              │   └── {flawId}: { description, level, mod, obs, points }
              ├── skills/
              │   └── {skillId}: { description, mod, nh, attRelative, points }
              ├── equips/
              │   └── {equipId}: { description, weight, cost }
              └── spells/
                  └── {spellId}: { description, level, points, nh, mod, obs }
```

## 🛠️ Principais Funcionalidades

### Sistema de Pontos
- Cálculo automático de pontos gastos em atributos
- Soma de pontos de vantagens e desvantagens
- Sincronização em tempo real com Firebase

### Máscaras de Input
- Máscaras para números
- Máscaras para números com decimais
- Máscaras para números negativos

### Sistema de Navegação
- Rotas protegidas por autenticação
- Navegação entre diferentes seções do personagem
- Armazenamento de sessão para persistência

### Interface Responsiva
- Design adaptativo para diferentes tamanhos de tela
- Componentes colapsáveis
- Animações suaves

## 🐛 Solução de Problemas Comuns

### Login não funciona
- Verifique se as credenciais do Firebase estão corretas no `.env`
- Certifique-se de que a autenticação Google está habilitada no Firebase
- Verifique se o domínio está autorizado no Firebase

### Personagem não é criado
- Verifique se o Firestore está configurado corretamente
- Confirme se as regras de segurança do Firestore permitem escrita
- Verifique o console do navegador para erros específicos

### Dados não carregam
- Verifique a conexão com o Firebase
- Confirme se o usuário está autenticado
- Verifique se o ID do personagem está correto na URL

## 📊 Sistema de Dados do Jogo

O arquivo `gameData.ts` contém:
- **Vantagens**: 13 tipos com diferentes níveis
- **Desvantagens**: 24 tipos com diferentes níveis
- **Perícias**: 13 perícias com atributos relacionados
- **Magias**: 26 magias organizadas por nível (1-5)

## 🔐 Segurança

- Autenticação via Google OAuth
- Dados armazenados de forma segura no Firestore
- Validação no frontend e backend
- Rotas protegidas por autenticação

## 🚀 Deploy

O projeto está configurado para deploy no Vercel:
- Arquivo `vercel.json` configurado
- Build automático com TypeScript
- Variáveis de ambiente configuradas no Vercel

## 📝 Contribuição

Para contribuir com o projeto:
1. Faça um fork do repositório
2. Crie uma branch para sua feature
3. Implemente suas mudanças
4. Faça commit e push
5. Abra um Pull Request
