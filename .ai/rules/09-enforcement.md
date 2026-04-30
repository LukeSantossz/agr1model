# 9. Enforcement Automatizado

> As regras deste sistema dependem do agente segui-las voluntariamente. Esta secao define uma camada de verificacao automatizada que valida o cumprimento do fluxo independentemente do agente ou do desenvolvedor.

## 9.1 Escopo da Validacao

O enforcement opera via git hooks (stack-agnostico, puro bash + git) e valida as seguintes regras automaticamente:

**`commit-msg` — Executa a cada commit:**

- A mensagem segue o formato `type(scope): subject` com type valido.
- Nao ha body, rodape, ou linhas alem da primeira.
- Nao ha trailers de co-autoria (`Co-authored-by`, `Signed-off-by`).
- O subject esta no imperativo e tem entre 10 e 100 caracteres.

**`pre-commit` — Executa antes de cada commit:**

- Nao ha `console.log`, `debugger`, ou `alert()` nos arquivos staged (aplicavel a scripts .js).
- Nao ha arquivos staged fora do escopo declarado na task ativa.

**`pre-push` — Executa antes de cada push:**

- A branch ativa segue o formato `type/TASK-NNN-descricao-curta`.
- Existe uma task com status `em andamento` em `.ai/tasks.md` cujo numero corresponde ao `TASK-NNN` da branch.

**`post-merge` — Executa apos pull/merge:**

- Sinaliza ao desenvolvedor que o estado da codebase pode ter mudado e que a verificacao pos-pull deve ser executada na proxima sessao com o agente.

## 9.2 Principios de Implementacao

- **Stack-agnostico:** Os hooks usam exclusivamente bash, git e grep. Nenhuma dependencia de runtime e necessaria.
- **Configuravel:** Padroes de debug log sao definidos em um arquivo `.ai/enforcement.conf` que lista os patterns por tipo de arquivo.
- **Nao-bloqueante em caso de duvida:** Se um hook nao conseguir determinar com certeza se ha violacao, ele emite warning em vez de bloquear.
- **Bypass documentado:** O desenvolvedor pode usar `git commit --no-verify` para pular hooks em situacoes excepcionais. Toda ocorrencia de `--no-verify` deve ser justificada na proxima sessao com o agente.

## 9.3 Instalacao

Os hooks sao instalados na primeira sessao de desenvolvimento via **TASK-000** — a task de bootstrap obrigatoria para qualquer projeto que adote este sistema. Registre-a em `.ai/tasks.md` como a primeira task do projeto, com complexidade `major`.
