# 6. Fluxo de Trabalho — Metodo CRURA

Todo codigo produzido segue obrigatoriamente este fluxo antes de ser submetido:

| Etapa | Nome | Acao | Responsavel |
|-------|------|------|-------------|
| **C** | Change | Codifique o script, ajuste ou refatoracao com atencao e intencao. | Agente (Modo Dev) ou Desenvolvedor (Modo Tutor) |
| **R** | Review | Revise os arquivos alterados localmente. Faca commits atomicos para mudancas relacionadas. | Agente executa a avaliacao pos-implementacao e reporta. Desenvolvedor valida. |
| **U** | Upload | Execute `git push`. Use mensagens de commit seguindo Conventional Commits. | Desenvolvedor. O agente sugere a mensagem de commit e o nome da branch, mas o push e do desenvolvedor. |
| **R** | Review Again | Crie a Pull Request, va na aba Files Changed e revise tudo novamente antes de pedir revisao. | Desenvolvedor. O agente pode auxiliar preenchendo o template de PR. |
| **A** | Auto-Revisao | Execute o checklist de auto-revisao (6.1) antes de solicitar review externo. | Desenvolvedor, com suporte do agente para verificacao automatizada. |

**Ponto de transferencia:** O agente conclui sua responsabilidade ao final da etapa R (Review), apos entregar a avaliacao pos-implementacao e atualizar o Registro de Projeto. A partir da etapa U (Upload), a responsabilidade e do desenvolvedor. O agente permanece disponivel para suporte, mas nao executa acoes de git sem instrucao explicita.

## 6.1 Checklist de Auto-Revisao (RA)

Antes de solicitar revisao, confirme:

- [ ] Realizei a auto-revisao na aba "Files Changed".
- [ ] Removi variaveis nao utilizadas e print() desnecessarios.
- [ ] O codigo segue as convencoes do projeto.
- [ ] Bandas espectrais estao corretas para o indice calculado.
- [ ] Filtros temporais e espaciais estao validados.
- [ ] Nomes de variaveis e funcoes seguem o VAR Method.
- [ ] Commits seguem Conventional Commits.
- [ ] Avaliacao pos-implementacao foi executada e passou.

## 6.2 Protocolo de Reversao

Quando uma implementacao aprovada revelar problemas apos a conclusao, o seguinte procedimento se aplica:

1. **Registrar o problema:** Crie uma nova task em `.ai/tasks.md` com tipo `fix` ou `revert`, referenciando a task original que causou o problema.
2. **Reverter com commit adequado:** Use `git revert` para desfazer o commit problematico. A mensagem segue o padrao: `revert(scope): reverte TASK-NNN - [motivo breve]`.
3. **Atualizar o Registro de Projeto:** Registre a reversao no historico com o motivo e a referencia a task original.
4. **Atualizar a task original:** Na secao de resultado da task original em `.ai/tasks.md`, adicione uma nota indicando que foi revertida, com a data e referencia a nova task.
5. **Avaliar a causa raiz:** Antes de reimplementar, identifique por que a avaliacao pos-implementacao nao detectou o problema.
