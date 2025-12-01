### Funcionalidades implementadas:

1. **Tela Inicial (Boot Sequence)**
   - Simulação de inicialização de sistema
   - Aviso institucional fake sobre "arquivo classificado"
   - Campo de código de acesso (qualquer código funciona, "MEME" é easter egg)

2. **Interface de Restauração**
   - Canvas com visualização do "meme corrompido"
   - Botões de RESTAURAR, DESFRAGMENTAR, ANALISAR
   - **A ironia**: restaurar na verdade CORROMPE mais o arquivo
   - Métricas pseudocientíficas ("Ressonância Semântica Digital")
   - Terminal com mensagens de erro absurdas
   - Citações do Historiador aparecem periodicamente

3. **Easter Eggs**
   - Código Konami (↑↑↓↓←→←→BA) ativa "Modo Arqueólogo"
   - Digitar "MEME" na tela inicial mostra mensagem secreta
   - Dicas sutis escondidas na interface

4. **Revelação Final**
   - Narração melancólica do Historiador
   - O "meme" nunca é completamente revelado
   - Apenas fragmentos: "ISSO FOI LONGE DEMAIS"
   - Final ambíguo que questiona o espectador

A ironia do design é que **você não consegue restaurar completamente** — e esse é o ponto narrativo!

## A Mecânica (Intencionalmente Frustrante)

No `RestorationInterface.tsx`, a lógica de restauração funciona assim:

```typescript
const change = secretMode 
  ? Math.random() * 10 - 8 // Modo secreto: restaura de verdade
  : Math.random() * 8 - 2;  // Modo normal: geralmente CORROMPE mais
```

**No modo normal:**
- `Math.random() * 8 - 2` produz valores entre -2 e +6
- Como a maioria dos valores é positiva, a corrupção **aumenta** na maioria das vezes
- O botão "RESTAURAR" é uma mentira — ele piora o arquivo

**Para realmente "restaurar":**

### 1. Ativar o Modo Arqueólogo (Easter Egg)
Digite o **Código Konami** no teclado:
```
↑ ↑ ↓ ↓ ← → ← → B A
```

Isso ativa o `secretMode`, onde a restauração realmente funciona (valores entre -8 e +2, geralmente negativos = menos corrupção).

### 2. Ou Simplesmente Persistir
Após **10+ tentativas** de restauração, o sistema detecta que você está "obcecado" como o Historiador e oferece a revelação final — independente do nível de corrupção.

```typescript
if (corruptionLevel < 20 || restorationAttempts > 10) {
  setShowFinalWarning(true);
}
```

## O Propósito Narrativo

A frustração é intencional. Você experimenta o que o Historiador sente: quanto mais tenta recuperar o passado, mais ele se fragmenta. O "último meme" nunca será totalmente restaurado porque:

> *"Os memes nunca foram sobre as imagens em si. Eram sobre nós."*

É uma metáfora sobre a impossibilidade de recuperar completamente a memória cultural digital. O final mostra apenas fragmentos: **"ISSO FOI LONGE DEMAIS"** — mas nunca o meme completo.
