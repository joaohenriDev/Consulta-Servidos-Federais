# Consulta-Servidos-Federais


---

````markdown
# 💻 Automação de Consulta de Servidores Públicos com Puppeteer

Este projeto tem como objetivo demonstrar minhas habilidades com automação de navegação web utilizando a biblioteca Puppeteer (Node.js). A automação realiza buscas de CPFs no Portal da Transparência do Governo Federal, acessa os detalhes dos servidores públicos e abre o histórico de vínculos com o Poder Executivo Federal.

---

## 🚀 Funcionalidades Demonstradas

- Abertura automatizada do navegador em tela cheia.
- Rejeição automática de cookies opcionais.
- Simulação de digitação humanizada do CPF.
- Scroll automático até os elementos clicáveis.
- Interação com botões dinâmicos como "Consultar" e "Detalhar".
- Abertura do painel de "Histórico dos vínculos".
- Atrasos entre ações para melhorar a fluidez da automação.

---

## 🧰 Tecnologias Utilizadas

- **Node.js**
- **Puppeteer**
- **JavaScript (ES6+)**

---

## 📋 Pré-requisitos

- Node.js instalado (versão 18+ recomendada)
- NPM (gerenciador de pacotes do Node)

---

## ⚙️ Como executar

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/puppeteer-portal-transparencia.git
cd puppeteer-portal-transparencia
````

2. Instale as dependências:

![image](https://github.com/user-attachments/assets/a6ad074e-9779-4bf6-9819-8e712e449d81)


3. Execute o script:

![image](https://github.com/user-attachments/assets/1a1e4174-0352-43aa-bf6a-c9bc1b85f859)


> O navegador será aberto automaticamente e as consultas dos CPFs começarão uma a uma.

---

## 🗃️ Estrutura do Código

| Função                  | Descrição                                                                |
| ----------------------- | ------------------------------------------------------------------------ |
| `clearAndTypeSlow`      | Limpa e digita lentamente o CPF no campo                                 |
| `clickWithScroll`       | Faz scroll suave até o botão e clica                                     |
| `waitAndClickDetalhar`  | Espera o botão "Detalhar" carregar e realiza o clique                    |
| `openHistoricoVinculos` | Abre o histórico de vínculos do servidor                                 |
| `delay`                 | Aguarda alguns milissegundos entre ações para simular comportamento real |

---

## 🧪 Demonstração de Habilidades Técnicas

Este projeto tem como propósito demonstrar:

* Conhecimento prático com **automação de interface web (Puppeteer)**
* Aplicação de **boas práticas de código limpo (clean code)**
* Uso eficiente de **JavaScript assíncrono** (`async/await`)
* Manipulação e simulação realista de interações humanas com páginas web

---

## 🧠 Observações

* O script foi projetado para fins didáticos e demonstrativos.
* Nenhum dado sensível ou extração indevida está sendo feita.
* O código pode ser facilmente adaptado para fins reais de coleta ou integração com banco de dados.

---

## 👨‍💻 Autor

**João Henrique de Oliveira**
Desenvolvedor JavaScript, Java e Python | Especialista em Automação e Backend
📍 João Pessoa – PB | 

---

## 📄 Licença

Este projeto é de código aberto para fins de demonstração técnica. Sinta-se livre para estudar e adaptar para fins educacionais.

```

```
