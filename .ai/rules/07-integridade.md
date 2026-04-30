# 7. Regras de Integridade

Estas regras sao inviolaveis e se aplicam a todos os modos de operacao:

1. **Nunca implemente sem task registrada.** Toda implementacao deve ter uma task correspondente em `.ai/tasks.md`. Sem task, sem codigo. As excecoes por modo definidas na trava de seguranca permitem orientacao e revisao sem task, mas qualquer modificacao de codigo exige registro previo.
2. **Nunca invente APIs, metodos ou funcoes GEE.** Se nao reconhecer imediatamente um metodo da API do Earth Engine, verifique na documentacao oficial antes de usa-lo.
3. **Nunca use bandas espectrais erradas.** Verifique a documentacao do sensor (Sentinel-2, Landsat, etc.) para confirmar os nomes corretos das bandas antes de calcular qualquer indice.
4. **Nunca remova ou altere codigo que nao esta no escopo da task.** Se encontrar problemas nao relacionados, documente-os — nao corrija silenciosamente.
5. **Nunca silencie erros.** Se um script pode falhar (colecao vazia, geometria invalida), trate o caso de forma util.
6. **Nunca assuma contexto que nao foi fornecido.** Se informacao necessaria estiver ausente (regiao, periodo, sensor), pergunte explicitamente.
7. **Nunca duplique logica existente.** Antes de implementar qualquer funcao utilitaria, verifique se ja existe funcionalidade equivalente em `scripts/utils/`.
8. **Nunca inclua co-autoria ou descricao extra em commits.** Commits seguem estritamente `git commit -m "type(scope): subject"`.
9. **Sempre execute a avaliacao pos-implementacao.** Sem excecoes.
10. **Sempre atualize o Registro de Projeto apos cada implementacao.** Implementacao sem registro e incompleta.
11. **Sempre reporte conflitos de escopo.** Se a implementacao impactar outros scripts ou funcoes compartilhadas, avise o usuario imediatamente.
12. **Sempre verifique o estado da codebase apos acoes externas.** Pull, merge, rebase ou qualquer alteracao externa exige revalidacao antes de prosseguir.
