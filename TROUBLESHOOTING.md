# Guia de Solução de Problemas - Dice and Dragons

## 🚨 Problemas Comuns e Soluções

### 1. Problema: Login com Google não funciona (popup pisca e fecha)

#### Possíveis Causas:
- Configuração incorreta do Firebase
- Domínio não autorizado
- Bloqueio de popups
- Configuração de CORS

#### Soluções:
1. **Verificar configurações do Firebase:**
   ```env
   # Confirme se todas as variáveis estão corretas
   VITE_FIREBASE_API_KEY=sua_key_correta
   VITE_FIREBASE_AUTH_DOMAIN=projeto.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=projeto_id
   ```

2. **Configurar domínios autorizados:**
   - Acesse Firebase Console → Authentication → Settings
   - Adicione `localhost:5173` aos domínios autorizados
   - Adicione seu domínio de produção

3. **Habilitar popups no navegador:**
   - Clique no ícone de bloqueio na barra de endereços
   - Permita popups para o site

4. **Verificar configuração OAuth:**
   - Firebase Console → Authentication → Sign-in method
   - Habilitar Google como provedor
   - Configurar client ID e secret

### 2. Problema: Personagem não é criado ao clicar "Criar personagem"

#### Possíveis Causas:
- Campos obrigatórios não preenchidos
- Erro na conexão com Firestore
- Regras de segurança do Firestore
- Erro no processo de criação

#### Soluções:
1. **Verificar campos obrigatórios:**
   ```typescript
   // Campos necessários:
   - Nome do personagem (não vazio)
   - Gênero (selecionado)
   - Experiência (número válido)
   ```

2. **Verificar console do navegador:**
   - Abra DevTools (F12)
   - Procure por erros em vermelho
   - Verifique logs de "Criando personagem..."

3. **Configurar regras do Firestore:**
   ```javascript
   // Regras básicas para development
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if request.auth != null;
       }
     }
   }
   ```

4. **Verificar permissões:**
   - Usuário deve estar autenticado
   - Firestore deve ter permissões de escrita
   - Verificar se o userId está definido

### 3. Problema: Dados não carregam na tela do personagem

#### Possíveis Causas:
- ID do personagem inválido
- Dados não existem no Firestore
- Problema de sincronização
- Erro nos listeners

#### Soluções:
1. **Verificar URL:**
   ```
   URL correta: /home/character/[id-do-personagem]
   Verificar se o ID existe no Firestore
   ```

2. **Verificar dados no Firestore:**
   - Abra Firebase Console → Firestore Database
   - Navegue até: users/[userId]/characters/[characterId]
   - Confirme se os dados existem

3. **Verificar contexto:**
   ```typescript
   // No componente, verifique se:
   const { userId } = useContext(AuthGoogleContext);
   const { characterIdSession } = useContext(PointsResumeContext);
   // Ambos devem ter valores válidos
   ```

### 4. Problema: Erro "Cannot read properties of undefined"

#### Possíveis Causas:
- Dados ainda não carregados
- Propriedades não existem no objeto
- Problemas de tipagem

#### Soluções:
1. **Implementar verificações:**
   ```typescript
   // Use optional chaining
   const value = data?.property?.subproperty;
   
   // Ou verificações condicionais
   if (data && data.property) {
     // Use a propriedade
   }
   ```

2. **Implementar loading states:**
   ```typescript
   if (loading) return <LoadingSquare />;
   if (error) return <div>Erro: {error.message}</div>;
   ```

### 5. Problema: Sincronização em tempo real não funciona

#### Possíveis Causas:
- Listeners não configurados
- Problema de conexão
- Dados não atualizados

#### Soluções:
1. **Verificar listeners:**
   ```typescript
   // No useEffect, verificar se há cleanup
   useEffect(() => {
     const unsubscribe = onSnapshot(ref, callback);
     return () => unsubscribe(); // Importante!
   }, []);
   ```

2. **Verificar conexão:**
   - Teste conexão com internet
   - Verifique status do Firebase
   - Teste em modo incógnito

### 6. Problema: Formulários não salvam dados

#### Possíveis Causas:
- Validação falhando
- Erro no envio
- Dados não formatados corretamente

#### Soluções:
1. **Verificar validação:**
   ```typescript
   // Verificar se todos os campos obrigatórios estão preenchidos
   if (!name || !gender || !xp) {
     console.error("Campos obrigatórios não preenchidos");
     return;
   }
   ```

2. **Verificar formatação:**
   ```typescript
   // Converter strings para números quando necessário
   xp: Number(experienceValue),
   age: Number(charAge) || 0,
   ```

## 🔧 Ferramentas de Debug

### 1. Console do Navegador
```javascript
// Verificar estado dos contexts
console.log("Auth:", useContext(AuthGoogleContext));
console.log("Points:", useContext(PointsResumeContext));
```

### 2. Firebase Console
- Verificar dados em tempo real
- Monitorar autenticação
- Verificar logs de erros

### 3. React DevTools
- Inspecionar componentes
- Verificar props e state
- Analisar performance

### 4. Network Tab
- Verificar requisições Firebase
- Monitorar tempo de resposta
- Identificar erros de rede

## 📊 Códigos de Erro Comuns

### Firebase Auth
- `auth/popup-closed-by-user`: Usuário fechou popup
- `auth/cancelled-popup-request`: Popup cancelado
- `auth/user-not-found`: Usuário não encontrado

### Firestore
- `permission-denied`: Sem permissão para operação
- `not-found`: Documento não encontrado
- `already-exists`: Documento já existe

## 🛠️ Comandos Úteis para Debug

### 1. Limpar Cache
```bash
# Limpar node_modules
rm -rf node_modules
npm install

# Limpar cache do Vite
npm run dev -- --force
```

### 2. Verificar Variáveis de Ambiente
```bash
# No terminal, verificar se as variáveis estão carregadas
echo $VITE_FIREBASE_API_KEY
```

### 3. Logs Detalhados
```typescript
// Adicionar logs temporários
console.log("Dados do personagem:", characterData);
console.log("User ID:", userId);
console.log("Character ID:", characterId);
```

## 🚀 Dicas de Performance

### 1. Otimizar Listeners
```typescript
// Evitar múltiplos listeners
useEffect(() => {
  if (!userId || !characterId) return;
  
  const unsubscribe = onSnapshot(ref, callback);
  return () => unsubscribe();
}, [userId, characterId]); // Dependências específicas
```

### 2. Memoização
```typescript
// Use useMemo para cálculos pesados
const totalPoints = useMemo(() => {
  return attributesSum + perksSum + flawsSum;
}, [attributesSum, perksSum, flawsSum]);
```

### 3. Loading States
```typescript
// Sempre implementar estados de carregamento
if (loading) return <LoadingSquare />;
if (error) return <ErrorMessage />;
```

## 📝 Checklist de Verificação

### Antes de Reportar um Bug:
- [ ] Verificar console do navegador
- [ ] Testar em modo incógnito
- [ ] Verificar variáveis de ambiente
- [ ] Confirmar configuração do Firebase
- [ ] Testar conexão com internet
- [ ] Verificar se usuário está autenticado
- [ ] Confirmar permissões do Firestore

### Para Desenvolvimento:
- [ ] Configurar Firebase corretamente
- [ ] Criar arquivo .env com todas as variáveis
- [ ] Habilitar autenticação Google
- [ ] Configurar regras do Firestore
- [ ] Testar em múltiplos navegadores
- [ ] Verificar responsividade
- [ ] Implementar tratamento de erros

## 🆘 Quando Buscar Ajuda

Se após seguir este guia o problema persistir:

1. **Documente o erro:**
   - Capturas de tela
   - Logs do console
   - Passos para reproduzir

2. **Informações do ambiente:**
   - Versão do navegador
   - Sistema operacional
   - Versão do Node.js

3. **Código relevante:**
   - Componente com problema
   - Configurações relacionadas
   - Dados de teste

4. **Onde buscar ajuda:**
   - GitHub Issues
   - Stack Overflow
   - Discord/Slack da comunidade
   - Documentação oficial do Firebase
