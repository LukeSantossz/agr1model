# TASKS.md — Registro de Tasks para Implementação

> **Este arquivo é o ponto de entrada obrigatório para qualquer implementação.**
> Nenhum agente de IA pode modificar a codebase sem uma task formalmente registrada aqui.
> Consulte `.claude/rules/00-trava-seguranca.md` para as regras completas.

---

## Como Usar

1. Identifique a complexidade da task (patch, minor, major).
2. Para **patch**: use o mini-template (seção abaixo). Para **minor/major**: use o template completo.
3. Adicione a task preenchida na seção "Tasks Ativas".
4. Inicie a sessão com o agente informando o modo de operação desejado (Desenvolvimento, Review ou Tutor).
5. Ao concluir, mova a task para "Tasks Concluídas" com o resultado preenchido.

---

## Mini-Template (Patch)

```markdown
### TASK-[NNN] | patch
- **Status:** pendente | em andamento | concluída
- **Objetivo:** [uma frase — ex: Renomear `userData` para `userProfileData` em `auth.ts`]
- **Arquivo(s):** [listar]
```

---

## Template Completo (Minor / Major)

```markdown
### TASK-[NNN]
- **Status:** pendente | em andamento | concluída | descartada | revertida
- **Modo:** desenvolvimento | review | tutor
- **Complexidade:** minor | major
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
[Limitações técnicas, de tempo, de escopo, ou decisões já tomadas que o agente deve respeitar.]

#### Referências (opcional)
[Links de documentação, PRs anteriores, issues relacionadas, artigos técnicos relevantes.]

#### Log de Andamento (atualizado pelo agente)
> Registro cronológico do progresso da task. O agente adiciona uma entrada a cada sessão.

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

| Nível | Quando usar | Exemplos |
|-------|-------------|----------|
| **patch** | Mudança trivial, sem risco de efeito colateral | Renomear variável, corrigir typo, ajustar espaçamento, remover import não utilizado |
| **minor** | Mudança localizada em um módulo, risco baixo | Implementar função isolada, corrigir bug em um arquivo, adicionar teste |
| **major** | Mudança estrutural, múltiplos arquivos, risco de impacto em cascata | Nova feature com múltiplos módulos, refatoração arquitetural, migração de dependência |

---

## Tasks Ativas

> Tasks em andamento ou pendentes de implementação. O agente só pode trabalhar em tasks listadas aqui.
> **Regra de ordenação:** A primeira task listada é a task ativa. O agente trabalha nela até conclusão, descarte ou bloqueio explícito pelo usuário.

## Tasks Concluídas

> Tasks finalizadas. Movidas para cá após conclusão e atualização do Registro de Projeto (`registry.md`). Nunca remova entradas — o histórico é cumulativo.

### TASK-012
- **Status:** concluída
- **Modo:** desenvolvimento
- **Complexidade:** minor
- **Data de criação:** 2026-05-10

#### Objetivo (!obrigatório)
Migrar framework de desenvolvimento de `.ai/` para `.claude/` versão 1.1.0.

#### Contexto (!obrigatório)
Nova versão do framework consolida regras 10-12 em guias separados, reorganiza templates e atualiza estrutura de diretórios.

#### Escopo Técnico (!obrigatório)
- **Arquivos/módulos envolvidos:** .claude/, CLAUDE.md, .ai/ (remoção)
- **Dependências necessárias:** nenhuma
- **Impacto em funcionalidades existentes:** nenhum

#### Critérios de Aceite (!obrigatório)
- [x] VERSION contém "1.1.0"
- [x] Pasta guides/ criada com guia-codex.md e guia-portfolio.md
- [x] Pasta templates/ criada com pr-template.md e issue-template.md
- [x] Rules contém apenas 00-09 (10 arquivos)
- [x] Contexto do projeto preservado em registry.md
- [x] Base de conhecimento configurada no CLAUDE.md
- [x] .ai/ removida
- [x] .claude_update/ removida

#### Log de Andamento (atualizado pelo agente)

| Data | Sessão | Ação Realizada | Status ao Final |
|------|--------|----------------|-----------------|
| 2026-05-10 | 1 | Migração completa para v1.1.0 | concluída |

#### Resultado (preenchido ao concluir)
- **Data de conclusão:** 2026-05-10
- **Branch:** feat/TASK-005-009-ndwi-analysis
- **Commit(s):** e5a72fe
- **Avaliação pós-implementação:** aprovado
- **Observações:** Migração de .ai/ para .claude/ v1.1.0 concluída

---

### TASK-011
- **Status:** concluída
- **Modo:** desenvolvimento
- **Complexidade:** minor
- **Data de criação:** 2026-05-06

#### Objetivo (!obrigatório)
Corrigir não-conformidades organizacionais identificadas na auditoria de conformidade.

#### Contexto (!obrigatório)
Auditoria de conformidade identificou: (1) tasks concluídas na seção errada, (2) commits não vinculados nas tasks 005-009, (3) TASK-000 inexistente, (4) git hooks não instalados. Esta task corrige os itens organizacionais; TASK-000 trata dos hooks.

#### Escopo Técnico (!obrigatório)
- **Arquivos/módulos envolvidos:** .ai/tasks.md, .ai/registry.md
- **Dependências necessárias:** nenhuma
- **Impacto em funcionalidades existentes:** nenhum

#### Critérios de Aceite (!obrigatório)
- [x] TASK-005 a TASK-010 movidas para seção "Tasks Concluídas"
- [x] Commits atualizados nas tasks 005-009 com hashes reais
- [x] TASK-000 criada para implementação de hooks
- [x] Registry atualizado com entrada TASK-011

#### Log de Andamento (atualizado pelo agente)

| Data | Sessão | Ação Realizada | Status ao Final |
|------|--------|----------------|-----------------|
| 2026-05-06 | 1 | Correcoes organizacionais, movimentacao de tasks | concluída |

#### Resultado (preenchido ao concluir)
- **Data de conclusão:** 2026-05-06
- **Branch:** feat/TASK-005-009-ndwi-analysis
- **Commit(s):** 6146817
- **Avaliação pós-implementação:** aprovado
- **Observações:** Tasks reorganizadas, commits vinculados, TASK-000 implementada

---

### TASK-000
- **Status:** concluída
- **Modo:** desenvolvimento
- **Complexidade:** major
- **Data de criação:** 2026-05-06

#### Objetivo (!obrigatório)
Implementar git hooks de enforcement automatizado conforme regra 09.

#### Contexto (!obrigatório)
A regra 09-enforcement.md define hooks obrigatórios (commit-msg, pre-commit, pre-push, post-merge) para validação automática do fluxo. Esta task deveria ser a primeira do projeto mas foi identificada como ausente na auditoria.

#### Escopo Técnico (!obrigatório)
- **Arquivos/módulos envolvidos:** .ai/hooks/commit-msg, .ai/hooks/pre-commit, .ai/hooks/pre-push, .ai/hooks/post-merge, .ai/enforcement.conf
- **Dependências necessárias:** nenhuma
- **Impacto em funcionalidades existentes:** valida commits, branches e escopo automaticamente

#### Critérios de Aceite (!obrigatório)
- [x] Diretório .ai/hooks/ criado
- [x] Hook commit-msg valida formato Conventional Commits
- [x] Hook pre-commit detecta console.log/print/debugger
- [x] Hook pre-push valida nome de branch e task ativa
- [x] Hook post-merge sinaliza necessidade de verificação pós-pull
- [x] git config core.hooksPath configurado para .ai/hooks
- [x] enforcement.conf criado com patterns por linguagem

#### Restrições (opcional)
- Hooks em bash puro, stack-agnóstico
- Não-bloqueante em caso de dúvida (warning em vez de erro)

#### Log de Andamento (atualizado pelo agente)

| Data | Sessão | Ação Realizada | Status ao Final |
|------|--------|----------------|-----------------|
| 2026-05-06 | 1 | Hooks criados e configurados | concluída |

#### Resultado (preenchido ao concluir)
- **Data de conclusão:** 2026-05-06
- **Branch:** feat/TASK-005-009-ndwi-analysis
- **Commit(s):** 106d2ce
- **Avaliação pós-implementação:** aprovado
- **Observações:** 4 hooks bash implementados, enforcement.conf criado, core.hooksPath configurado

---

## Tasks Descartadas

> Tasks que foram canceladas ou substituídas antes da implementação. Registre o motivo.

[nenhuma task descartada]

---

## Política de Arquivamento

Quando a seção "Tasks Concluídas" ultrapassar **20 entradas**, o agente deve:

1. Mover as tasks mais antigas (mantendo as 10 mais recentes) para `.claude/tasks-archive.md`.
2. O arquivo de arquivo é cumulativo — nunca editar entradas já arquivadas.
3. Ao buscar histórico de tasks, consultar ambos os arquivos se necessário.
4. Tasks descartadas e revertidas também contam para o limite e são arquivadas junto.

Isso garante que o agente carregue apenas o histórico recente em contexto, sem perder rastreabilidade.

---

## Regras de Preenchimento

1. **O campo Objetivo deve caber em uma frase.** Se não cabe, a task é grande demais — quebre em subtasks.
2. **Uma task deve ser completável em uma sessão de desenvolvimento.** Se a estimativa excede uma sessão ou afeta mais de 10 arquivos, decompor em subtasks independentes. Cada subtask recebe seu próprio TASK-NNN.
3. **Critérios de Aceite são obrigatórios e verificáveis.** "Funcionar corretamente" não é critério. "Retornar status 200 para inputs válidos e 400 para inputs inválidos" é.
4. **Escopo Técnico deve listar arquivos concretos.** "Algumas telas" não serve. "src/screens/LoginScreen.tsx, src/services/authService.ts" serve.
5. **Uma task por implementação.** Se surgir necessidade fora do escopo, registre nova task.
6. **Tasks não são retroativas.** Código já implementado sem task deve ser revisado (Modo Review).
7. **O resultado é preenchido pelo agente** ao final da implementação.
8. **Complexidade é obrigatória.** Na dúvida, classifique para cima.
9. **A ordem na seção Tasks Ativas define prioridade.** A primeira é a ativa.
10. **O Log de Andamento é obrigatório para `minor` e `major`.** Tasks `patch` podem omitir.
11. **Tasks revertidas não são deletadas.** Recebem status `revertida` com nota.
