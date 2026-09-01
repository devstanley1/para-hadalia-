# Contexto e regras do projeto "Para Hadalia"

## Visão geral
Este projeto é um site personalizado para celebrar o relacionamento entre Stanley e Hadalia. Ele combina:
- um calendário com mensagens diárias
- uma galeria de buquês
- uma estética romântica e emotiva
- textos e imagens feitos para uma pessoa específica, com carinho e intenção afetiva

## Contexto da conversa
A conversa começou com a atualização do calendário para um novo mês, com regras específicas para a mensagem diária e para o dia de aniversário do relacionamento.

### Regras do calendário
- O mês deve ser atualizado com base no período desejado.
- O dia 1 deve começar no dia da semana correto.
- O total de dias do mês deve corresponder ao mês atual.
- A mensagem do dia 1 deve ser a primeira do mês e manter o tom emocional do projeto.
- O dia 2 deve ser tratado como o destaque do aniversário do relacionamento.
- O texto do dia 2 deve sempre reforçar o marco do namoro com a frase de aniversário do relacionamento.
- O calendário deve seguir uma estrutura de mensagens de amor, carinho e gratidão, sempre com tom pessoal e íntimo.
- As atualizações devem manter consistência entre:
  - cabeçalho do mês
  - texto da legenda
  - mensagens do objeto `messages`
  - índice de início do mês
  - quantidade total de dias
  - overlay de aniversário

## Regras específicas do relacionamento
- O relacionamento é entre Stanley e Hadalia.
- O dia 2 do mês representa o aniversário do namoro.
- O projeto já teve variações para meses específicos, incluindo a comemoração de 6 meses e depois 7 meses.
- O aniversário deve ser destacado visualmente com mensagem especial e emoção forte.
- Os textos devem continuar sendo românticos, personalizados, e alinhados ao estilo do criador.

## Regras para a galeria de buquês
- A galeria contém fotos de buquês entregues em momentos especiais.
- Cada item precisa ter:
  - `src`: caminho da imagem
  - `title`: título do buquê
  - `caption`: descrições emocionais e temáticas
- Os textos devem celebrar o relacionamento, a pessoa amada e os momentos compartilhados.
- Quando o tema da flor ou imagem for uma referência específica (como Hello Kitty, Van Gogh, macacos, aniversário, etc.), a descrição deve refletir esse tema.
- A intenção é manter a galeria como uma memória afetiva, não como uma simples coleção de fotos.

## Regras estilísticas gerais
- Os textos devem ser em português, com afeto, delicadeza e personalidade.
- O projeto usa um tom íntimo, romântico e simbólico.
- Emoções e metáforas são bem-vindas, desde que mantenham o caráter pessoal.
- Preferência por descrições que conectam a imagem ao relacionamento e à história do casal.

## Observações importantes
- O projeto é estático, em HTML/CSS/JS, sem framework.
- As imagens ficam em `assets/buque/` e são referenciadas pelo caminho relativo no JavaScript.
- A página principal e os elementos do calendário são renderizados com JavaScript.
- O estado da página é altamente dependente do objeto `messages` e dos cálculos do calendário.
- Quando se atualiza o mês, é necessário revisar todos os pontos visuais e lógicos para evitar inconsistência entre os textos exibidos e os dados internos.

## Histórico relevante da conversa
### Calendário
- O usuário pediu atualização do calendário para um novo mês com regras de mensagens e marcação do aniversário.
- O mês foi atualizado de forma gradual, preservando a mesma lógica emocional.
- O dia 2 foi sempre reforçado como marco importante do relacionamento.
- Houve necessidade de corrigir uma atualização parcial em que o cabeçalho já estava em setembro, mas os textos internos ainda refletiam agosto e 6 meses.
- A correção final foi feita para garantir que o calendário refletisse setembro e 7 meses de namoro.

### Galeria de buquês
- A galeria foi criada com uma coleção de fotos pessoais e textos dedicados.
- O item “Buquê 2” foi removido.
- A linguagem dos títulos e descrições foi ajustada para ser mais emocional e mais vinculada à história.
- O buquê “Van Gogh” foi adicionado com descrição baseada na temática artística e no brilho emocional do relacionamento.

## Conclusão
Este documento serve como referência para manter a continuidade do projeto, preservando o estilo, as regras e a história da relação que esse site representa.
