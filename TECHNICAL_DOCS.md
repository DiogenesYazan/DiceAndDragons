# Documentação Técnica - Dice and Dragons

## 🔍 Análise Detalhada dos Componentes

### 1. Sistema de Autenticação (AuthGoogleProvider)

#### Responsabilidades:
- Gerenciar estado de autenticação
- Integração com Firebase Auth
- Controle de sessão do usuário

#### Principais Métodos:
```typescript
handleGoogleSignIn()    // Login com Google
handleGoogleSignOut()   // Logout
onAuthStateChanged()    // Listener de mudanças de estado
```

#### Estado Gerenciado:
- `isSignedIn`: Status de login
- `userId`: ID único do usuário
- `userCredential`: Token de acesso
- `userPhotoUrl`: URL da foto do perfil

### 2. Sistema de Pontos (PointsResumeProvider)

#### Funcionalidade:
- Sincronização em tempo real com Firestore
- Cálculo automático de pontos gastos
- Listeners para mudanças nos dados

#### Dados Monitorados:
- `attributesSum`: Total de pontos em atributos
- `perksSum`: Total de pontos em vantagens
- `flawsSum`: Total de pontos em desvantagens
- `skillsSum`: Total de pontos em perícias

### 3. Seletor de Personagens (CharSelector)

#### Processo de Criação:
1. **Validação**: Nome, gênero e XP são obrigatórios
2. **Registro de Usuário**: Cria documento se não existir
3. **Criação do Personagem**: Documento principal
4. **Estrutura de Dados**: Cria subcoleções

#### Estrutura Criada:
```typescript
// Atributos padrão
['strength', 'dexterity', 'intelligence', 'health', 
 'hit-points', 'will', 'perception', 'fatigue-points', 
 'current-fatigue-points', 'current-hit-points']

// Subcoleções vazias
- perks/
- flaws/
- skills/
- equips/
- spells/
```

### 4. Sistema de Atributos (Attributes)

#### Funcionalidades:
- Formulário reativo com React Hook Form
- Máscaras de entrada para números
- Sincronização automática com Firebase
- Cálculo de pontos gastos

#### Validações:
- Valores numéricos obrigatórios
- Máscaras aplicadas automaticamente
- Notificações de sucesso/erro

### 5. Sistema de Vantagens/Desvantagens (Perks/Flaws)

#### Dados Pré-definidos:
- **Vantagens**: 13 tipos com níveis variados
- **Desvantagens**: 24 tipos com níveis variados
- Cada item tem níveis específicos disponíveis

#### Cálculo de Pontos:
- Vantagens: Custo positivo
- Desvantagens: Custo negativo (ganha pontos)
- Modificadores aplicados automaticamente

### 6. Sistema de Perícias (Skills)

#### Características:
- 13 perícias pré-definidas
- Associação com atributos base
- Nível de dificuldade (d, m, md)
- Cálculo de Número de Habilidade (NH)

#### Atributos Relacionados:
- `des`: Destreza
- `int`: Inteligência
- Dificuldades: Difícil, Médio, Muito Difícil

### 7. Sistema de Magias (Spells)

#### Organização:
- 26 magias organizadas por nível (1-5)
- Nível 1: Magias básicas
- Nível 5: Magias avançadas

#### Exemplos por Nível:
- **Nível 1**: Purificar Ar, Criar Fogo, Coceira
- **Nível 3**: Ciclone, Metamorfose, Telepatia
- **Nível 5**: Metamorfose Maior, Terremoto

## 🔧 Utilitários e Máscaras

### 1. numberMask.tsx
- Remove caracteres não numéricos
- Mantém apenas dígitos

### 2. numberMaskWithNegative.tsx
- Permite números negativos
- Controla posição do cursor

### 3. numberWithDecimalsMask.tsx
- Permite casas decimais
- Formatação de números com vírgula

## 🎨 Sistema de Estilos

### Estrutura SCSS:
- Cada componente tem seu próprio arquivo SCSS
- Arquivo principal `App.scss`
- Variáveis globais para cores e espaçamentos

### Responsividade:
- Breakpoints para diferentes tamanhos
- Componentes adaptáveis
- Layout flexível

## 🔄 Fluxo de Dados Detalhado

### 1. Criação de Personagem
```
1. Usuário preenche formulário
2. Validação no frontend
3. Criação do documento principal
4. Criação das subcoleções
5. Redirecionamento para edição
```

### 2. Edição de Atributos
```
1. Carregamento dos dados atuais
2. Formulário com valores pré-preenchidos
3. Máscara aplicada nos inputs
4. Sincronização em tempo real
5. Cálculo automático de pontos
```

### 3. Navegação
```
1. Autenticação verificada
2. ID do personagem na URL
3. Dados carregados do Firestore
4. Estado sincronizado nos contexts
```

## 🛡️ Tratamento de Erros

### Estratégias Implementadas:
- Try-catch em operações assíncronas
- Validação de dados de entrada
- Notificações de erro para usuário
- Fallbacks para carregamento

### Logs de Debug:
- Console.log para debugging
- Informações de criação de personagem
- Status de autenticação
- Erros de Firebase

## 🔍 Monitoramento e Debug

### Ferramentas:
- React DevTools
- Firebase Console
- Browser DevTools
- Network Tab para requisições

### Pontos de Monitoramento:
- Estado de autenticação
- Carregamento de dados
- Sincronização em tempo real
- Performance de componentes

## 📊 Otimizações Implementadas

### Performance:
- Lazy loading de componentes
- Memoização de cálculos
- Debounce em inputs
- Listeners otimizados

### UX:
- Loading states
- Skeleton screens
- Animações suaves
- Feedback visual

## 🚀 Possíveis Melhorias

### Funcionalidades:
1. Sistema de backup/restore
2. Importação/exportação de personagens
3. Histórico de alterações
4. Colaboração entre usuários

### Técnicas:
1. Implementar Redux para estado global
2. Adicionar testes unitários
3. Implementar PWA
4. Adicionar internacionalização

### Performance:
1. Implementar caching
2. Otimizar bundle size
3. Lazy loading de rotas
4. Service Workers

## 🔒 Considerações de Segurança

### Implementadas:
- Autenticação OAuth
- Validação de dados
- Sanitização de inputs
- Rotas protegidas

### Recomendações:
1. Implementar rate limiting
2. Validação server-side
3. Criptografia de dados sensíveis
4. Auditoria de ações

## 📝 Padrões de Código

### Estrutura:
- Componentes funcionais
- Hooks personalizados
- TypeScript para tipagem
- Naming conventions consistentes

### Boas Práticas:
- Separação de responsabilidades
- Componentes reutilizáveis
- Estado centralizado
- Tratamento de erros consistente
