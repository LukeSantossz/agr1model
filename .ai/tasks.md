# TASKS.md — Registro de Tasks para Implementação

> **Este arquivo é o ponto de entrada obrigatório para qualquer implementação.**
> Nenhum agente de IA pode modificar a codebase sem uma task formalmente registrada aqui.
> Consulte `.ai/rules/00-trava-seguranca.md` para as regras completas.

---

## Como Usar

1. Copie o template da Seção "Template de Task" abaixo.
2. Preencha todos os campos obrigatórios (marcados com `!`).
3. Adicione a task preenchida na Seção "Tasks Ativas".
4. Inicie a sessão com o agente informando o modo de operação desejado (Desenvolvimento, Review ou Tutor).
5. Ao concluir, mova a task para "Tasks Concluídas" com o resultado preenchido.

---

## Template de Task

```markdown
### TASK-[NNN]
- **Status:** pendente | em andamento | concluída | descartada | revertida
- **Modo:** desenvolvimento | review | tutor
- **Complexidade:** patch | minor | major
- **Data de criação:** [YYYY-MM-DD]

#### Objetivo (!obrigatório)
[Descreva de forma direta o que precisa ser feito. Uma frase clara.
Teste: se alguém ler apenas esta linha, entende o que será entregue?]

#### Contexto (!obrigatório)
[Por que essa mudança é necessária? Qual problema resolve?
Se houver link de issue, PR, ou card de projeto, inclua aqui.]

#### Escopo Técnico (!obrigatório)
- **Arquivos/módulos envolvidos:** [listar os arquivos ou áreas que serão tocados]
- **Dependências necessárias:** [novas dependências ou "nenhuma"]
- **Impacto em funcionalidades existentes:** [descrever ou "nenhum"]

#### Critérios de Aceite (!obrigatório)
[Liste as entregas concretas que definem a task como concluída.
Cada critério deve ser verificável — sim ou não, passou ou não passou.]
- [ ] [Critério 1]
- [ ] [Critério 2]
- [ ] [Critério 3]

#### Restrições (opcional)
[Limitações técnicas, de tempo, de escopo, ou decisões já tomadas que o agente deve respeitar.
Ex: "Não alterar o módulo X", "Manter compatibilidade com a versão Y", "Não adicionar dependências novas".]

#### Referências (opcional)
[Links de documentação, PRs anteriores, issues relacionadas, artigos técnicos relevantes.]

#### Log de Andamento (atualizado pelo agente)
> Registro cronológico do progresso da task. O agente adiciona uma entrada a cada sessão em que a task for trabalhada, incluindo sessões onde houve travamento ou interrupção. Nunca remova entradas anteriores.

| Data | Sessão | Ação Realizada | Status ao Final |
|------|--------|----------------|-----------------|
| —    | —      | —              | —               |

#### Resultado (preenchido ao concluir)
- **Data de conclusão:** [YYYY-MM-DD]
- **Branch:** [nome da branch utilizada]
- **Commit(s):** [hash ou mensagem]
- **Avaliação pós-implementação:** [aprovado / aprovado com ressalvas / reprovado]
- **Observações:** [notas relevantes para futuras tasks]
```

### Classificação de Complexidade

A complexidade determina o nível de cerimônia na avaliação pós-implementação (ver `.ai/rules/04-avaliacao-pos.md`):

| Nível | Quando usar | Exemplos |
|-------|-------------|----------|
| **patch** | Mudança trivial, sem risco de efeito colateral | Renomear variável, corrigir typo, ajustar espaçamento, remover import não utilizado |
| **minor** | Mudança localizada em um módulo, risco baixo | Implementar função isolada, corrigir bug em um arquivo, adicionar teste |
| **major** | Mudança estrutural, múltiplos arquivos, risco de impacto em cascata | Nova feature com múltiplos módulos, refatoração arquitetural, migração de dependência |

---

## Tasks Ativas

> Tasks em andamento ou pendentes de implementação. O agente só pode trabalhar em tasks listadas aqui.
> **Regra de ordenação:** A primeira task listada é a task ativa. O agente trabalha nela até conclusão, descarte ou bloqueio explícito pelo usuário. Para mudar a prioridade, o usuário reordena as tasks nesta seção.

## Tasks Concluídas

> Tasks finalizadas. Movidas para cá após conclusão e atualização do Registro de Projeto (`registry.md`). Nunca remova entradas — o histórico é cumulativo.

### TASK-004
- **Status:** concluída
- **Modo:** desenvolvimento
- **Complexidade:** minor
- **Data de criação:** 2026-05-05

#### Objetivo (!obrigatório)
Adicionar configuração para OpenAI Codex no projeto, similar aos arquivos existentes para outros agentes de IA.

#### Contexto (!obrigatório)
O projeto possui pontos de entrada para Claude Code, Cursor, Windsurf e GitHub Copilot, mas faltava a configuração para o OpenAI Codex CLI.

#### Escopo Técnico (!obrigatório)
- **Arquivos/módulos envolvidos:** AGENTS.md (novo), CONTRIBUTING.md (atualização)
- **Dependências necessárias:** nenhuma
- **Impacto em funcionalidades existentes:** nenhum

#### Critérios de Aceite (!obrigatório)
- [x] AGENTS.md criado com instruções para Codex
- [x] CONTRIBUTING.md atualizado com Codex na tabela de IDEs
- [x] Estrutura consistente com os demais arquivos de configuração

#### Log de Andamento (atualizado pelo agente)

| Data | Sessão | Ação Realizada | Status ao Final |
|------|--------|----------------|-----------------|
| 2026-05-05 | 1 | AGENTS.md criado, CONTRIBUTING.md atualizado | concluída |

#### Resultado (preenchido ao concluir)
- **Data de conclusão:** 2026-05-05
- **Branch:** chore/TASK-004-codex-config
- **Commit(s):** dfa13b2, 2f91dbf
- **Avaliação pós-implementação:** aprovado
- **Observações:** Codex agora suportado via AGENTS.md. Checklist agêntico: aplicado.

---

### TASK-003
- **Status:** concluída
- **Modo:** desenvolvimento
- **Complexidade:** minor
- **Data de criação:** 2026-05-05

#### Objetivo (!obrigatório)
Criar CONTRIBUTING.md com orientações de contribuição e instruções para uso de IDEs com IA.

#### Contexto (!obrigatório)
O projeto possui múltiplos pontos de entrada para agentes de IA mas não havia documentação consolidada para contribuidores.

#### Escopo Técnico (!obrigatório)
- **Arquivos/módulos envolvidos:** CONTRIBUTING.md (novo)
- **Dependências necessárias:** nenhuma
- **Impacto em funcionalidades existentes:** nenhum

#### Critérios de Aceite (!obrigatório)
- [x] CONTRIBUTING.md criado em inglês
- [x] Seção de configuração por IDE (Claude Code, Cursor, Windsurf, GitHub Copilot)
- [x] Referência às regras em .ai/rules/
- [x] Instruções de workflow (task → branch → commit → PR)

#### Log de Andamento (atualizado pelo agente)

| Data | Sessão | Ação Realizada | Status ao Final |
|------|--------|----------------|-----------------|
| 2026-05-05 | 1 | CONTRIBUTING.md criado com guias de IDE | concluída |

#### Resultado (preenchido ao concluir)
- **Data de conclusão:** 2026-05-05
- **Branch:** docs/TASK-003-contributing-guide
- **Commit(s):** 543cb1b
- **Avaliação pós-implementação:** aprovado
- **Observações:** Inclui setup para Claude Code, Cursor, Windsurf, GitHub Copilot. Checklist agêntico: aplicado.

---

### TASK-002
- **Status:** concluída
- **Modo:** desenvolvimento
- **Complexidade:** minor
- **Data de criação:** 2026-05-05

#### Objetivo (!obrigatório)
Padronizar o README.md conforme modelo da regra 12 (Portfólio Público) — em inglês, com contexto de negócio, diagrama de arquitetura, decisões de engenharia e instruções de execução.

#### Contexto (!obrigatório)
O README atual estava em português e não seguia a estrutura definida na regra 12.2. Para repositórios públicos, o README deve comunicar valor para leitores externos.

#### Escopo Técnico (!obrigatório)
- **Arquivos/módulos envolvidos:** README.md
- **Dependências necessárias:** nenhuma
- **Impacto em funcionalidades existentes:** nenhum

#### Critérios de Aceite (!obrigatório)
- [x] README em inglês
- [x] Seção de contexto de negócio (por que o projeto existe)
- [x] Diagrama de arquitetura em Mermaid
- [x] Seção de decisões de engenharia
- [x] Instruções de execução claras

#### Log de Andamento (atualizado pelo agente)

| Data | Sessão | Ação Realizada | Status ao Final |
|------|--------|----------------|-----------------|
| 2026-05-05 | 1 | README reescrito seguindo regra 12.2 | concluída |

#### Resultado (preenchido ao concluir)
- **Data de conclusão:** 2026-05-05
- **Branch:** docs/TASK-002-readme-portfolio
- **Commit(s):** 5f69523
- **Avaliação pós-implementação:** aprovado
- **Observações:** README agora em inglês com estrutura de portfólio. Checklist agêntico: aplicado.

---

### TASK-001
- **Status:** concluída
- **Modo:** desenvolvimento
- **Complexidade:** major
- **Data de criação:** 2026-05-05

#### Objetivo (!obrigatório)
Sincronizar `.ai/rules/` com o estado atualizado de `.claude_config/rules/`, garantindo que a metodologia reflita a versão mais recente.

#### Contexto (!obrigatório)
Auditoria identificou divergências significativas entre as duas pastas:
- 3 arquivos ausentes em `.ai/rules/` (regras 10, 11, 12)
- Diferenças de acentuação (ASCII vs UTF-8)
- Caminhos de arquivos divergentes (`.ai/` vs raiz)
- Conteúdo específico GEE vs conteúdo genérico
- Seções e tipos de commit ausentes

#### Escopo Técnico (!obrigatório)
- **Arquivos/módulos envolvidos:** Todos os arquivos em `.ai/rules/` (00 a 09) + criação de 10, 11, 12
- **Dependências necessárias:** nenhuma
- **Impacto em funcionalidades existentes:** Atualiza regras operacionais do agente

#### Critérios de Aceite (!obrigatório)
- [x] Arquivos 10, 11, 12 criados em `.ai/rules/`
- [x] Todos os arquivos 00-09 atualizados com conteúdo de `.claude_config/rules/`
- [x] Acentuação UTF-8 aplicada em todos os arquivos
- [x] Caminhos atualizados para padrão sem prefixo `.ai/`
- [x] VAR Method atualizado com sufixos genéricos
- [x] Tipos de commit build, ci, revert adicionados
- [x] Seção 6.3 Templates adicionada em 06-crura.md
- [x] Commits atômicos seguindo Conventional Commits em inglês

#### Restrições (opcional)
- Commits em inglês
- Mensagens seguindo Conventional Commits
- Um commit por arquivo ou grupo lógico

#### Referências (opcional)
- Auditoria realizada nesta sessão

#### Log de Andamento (atualizado pelo agente)

| Data | Sessão | Ação Realizada | Status ao Final |
|------|--------|----------------|-----------------|
| 2026-05-05 | 1 | Criado tasks.md, iniciando sincronização | em andamento |
| 2026-05-05 | 1 | Sincronização completa, 7 commits atômicos realizados | concluída |

#### Resultado (preenchido ao concluir)
- **Data de conclusão:** 2026-05-05
- **Branch:** refactor/TASK-001-sync-ai-rules
- **Commit(s):** 01a3f29, c2c0c47, 1df471f, b286771, 3f1ecca, 8271213, 124d1b7
- **Avaliação pós-implementação:** aprovado
- **Observações:** Sincronização bem-sucedida. 13 arquivos de regras atualizados/criados + 2 templates + registry. Checklist agêntico: aplicado.

---

## Tasks Descartadas

> Tasks que foram canceladas ou substituídas antes da implementação. Registre o motivo.

[nenhuma task descartada]

---

## Regras de Preenchimento

1. **O campo Objetivo deve caber em uma frase.** Se não cabe, a task é grande demais — quebre em subtasks.
2. **Uma task deve ser completável em uma sessão de desenvolvimento.** Se a estimativa de implementação excede uma sessão, ou se a task afeta mais de 10 arquivos, ela deve ser decomposta em subtasks independentes. Cada subtask recebe seu próprio TASK-NNN e segue o fluxo completo. O campo Contexto da subtask deve referenciar a task mãe.
3. **Critérios de Aceite são obrigatórios e verificáveis.** "Funcionar corretamente" não é critério. "Retornar status 200 para inputs válidos e 400 para inputs inválidos" é.
4. **Escopo Técnico deve listar arquivos concretos.** "Algumas telas" não serve. "src/screens/LoginScreen.tsx, src/services/authService.ts" serve.
5. **Uma task por implementação.** Se durante o desenvolvimento surgir necessidade de outra mudança fora do escopo, registre uma nova task — não expanda a atual.
6. **Tasks não são retroativas.** Código já implementado sem task registrada deve ser revisado (Modo Review) e documentado antes de prosseguir com novas tasks.
7. **O resultado é preenchido pelo agente** ao final da implementação, junto com a atualização do Registro de Projeto.
8. **Complexidade é obrigatória.** Toda task deve ser classificada como `patch`, `minor` ou `major`. Na dúvida, classifique para cima (minor em vez de patch, major em vez de minor). A classificação determina o nível de cerimônia da avaliação pós-implementação.
9. **A ordem na seção Tasks Ativas define prioridade.** A primeira task é a ativa. O agente não pula para a segunda sem que a primeira esteja concluída, descartada ou explicitamente pausada pelo usuário.
10. **O Log de Andamento é obrigatório para tasks `minor` e `major`.** O agente registra uma entrada a cada sessão em que trabalhar na task, incluindo interrupções e travamentos. Tasks `patch` podem omitir o log. O log captura o progresso intermediário; a conclusão final é registrada no Resultado da task e no Histórico de Implementações do `registry.md`.
11. **Tasks revertidas não são deletadas.** Ao reverter uma implementação, a task original recebe status `revertida` com nota explicativa, e uma nova task `fix` ou `revert` é criada referenciando a original.
