# Angular Forms

##  Construindo uma aplicação contendo um formulário Angular

Os formulários são, provavelmente, um dos aspecto mais importasntes do seu aplicativo da web, isso porque é por meio de formulários que recebemos a maior parte da nossa entrada  de dados .

Aparentemente os formulários são simples: você cria uma tag de entrada, o usuário a preenche e clica em enviar. Simples não é?
Acontece que os formulários podem ser muito complexos. Veja o porquê:

- Os formulários destinam-se a modificar dados, tanto na página quanto no servidor;
- As alterações geralmente precisam ser refletidas em outros lugares da página;
- É preciso validar os valores de entrada para impedir inconsistências;
- Alguns campos dependem de outros e, com isso, a lógica pode ficar complexa;
- Queremos ser capazes de testar nossos formulários.

Felizmente o Angular possui diversos recursos que facilitam a criação de formulários extremamente complexos. E é isso que vamos praticar nessa seção.


::: :walking: Passo a passo :::  

Vamos constuir a nossa aplica em 4 etapas+1, eu explico melhor: a nossa aplicação será um estudo de caso que será construído em 4 versões mais 1 conjunto de testes de integração.

Na versão V1 nós vamos contextuzar as várias maneiras de trabvalhar com formulários, e vamos construir um formulário bastante simples.

Na versão V2 iremos mostrar como trabalhar com validações.

Na versão V3 iremos mostrar o uso de  componentes do tipo select em formulários.

Na última versão (V4) melhorar a aparência do nosso foumulários bem como fazer a ligação com uma classe de dados `Municipio`.

Então vamos lá. Passe para a implementação [Municipio V1](README.V1.md) do nosso Estudo de Caso de Formulários.