
# ERP Suporte

Sistema **ERP (Enterprise Resource Planning)** projetado para gerenciar e automatizar processos empresariais de forma eficiente. Utiliza tecnologias modernas para oferecer alto desempenho, escalabilidade e uma experiência de usuário intuitiva, ideal para microempresas ou freelancers que desejam um maior controle sobre suas atividades.

Embora o projeto não possua um backend estruturado, ele utiliza armazenamento local para gerenciar os dados, mantendo a simplicidade e a praticidade para pequenos negócios.

---

## Funcionalidades

- **Gerenciamento de Processos**: Controle e organização de fluxos empresariais.
- **Interface Responsiva**: Design adaptado para desktops.
- **Configurações Personalizáveis**: Ajuste de funcionalidades conforme as necessidades do negócio.
- **Desempenho Otimizado**: Uso de ferramentas modernas de build para eficiência.
- **Estrutura Modular**: Código organizado para facilitar manutenção e atualizações.
- **Backup e Restauração de Dados**: Através da funcionalidade de gerenciamento de dados, é possível:
  - Exportar os dados do sistema em um arquivo JSON contendo todas as informações.
  - Importar o arquivo JSON em outra máquina, caso seja necessário restaurar ou transferir os dados.

---

## Tecnologias Utilizadas

- **Framework de Desenvolvimento**: [Vite](https://vitejs.dev/)
- **Linguagem Principal**: [TypeScript](https://www.typescriptlang.org/)
- **Estilização**: [Tailwind CSS](https://tailwindcss.com/)
- **Gerenciamento de Dependências**: [NPM](https://www.npmjs.com/) ou [Bun](https://bun.sh/)
- **Ferramentas de Build**: [Vite](https://vitejs.dev/) e [PostCSS](https://postcss.org/)

---

## Instalação e Clonagem do Projeto

1. Abra o terminal.
2. Navegue até o diretório onde deseja clonar o projeto.
3. Clone o repositório:

   ```bash
   git clone https://github.com/maicotreinmuller/erp-suporte.git
   ```

4. Acesse o diretório do projeto:

   ```bash
   cd erp-suporte
   ```

5. Instale as dependências:

   Usando NPM:
   ```bash
   npm install
   ```

---

## Executando o Projeto

Inicie o servidor de desenvolvimento com o comando:

Usando NPM:
```bash
npm run dev
```

---

## Estrutura do Projeto

```plaintext
erp-suporte/
├── public/                 # Arquivos estáticos (imagens, fontes, etc.)
├── src/                    # Código-fonte principal
├── .gitignore              # Arquivos ignorados pelo Git
├── bun.lockb               # Lockfile do Bun
├── components.json         # Configurações de componentes
├── eslint.config.js        # Configuração do ESLint
├── index.html              # Arquivo HTML principal
├── package.json            # Configurações e scripts do projeto
├── package-lock.json       # Lockfile do NPM
├── postcss.config.js       # Configurações do PostCSS
├── README.md               # Documentação do projeto
├── tailwind.config.ts      # Configurações do Tailwind CSS
├── tsconfig.app.json       # Configurações do TypeScript para aplicação
├── tsconfig.json           # Configurações globais do TypeScript
├── tsconfig.node.json      # Configurações do TypeScript para Node.js
└── vite.config.ts          # Configurações do Vite
```

---

Este projeto é uma solução acessível e prática para quem busca gerenciar suas atividades empresariais sem a complexidade de sistemas robustos. Com recursos de backup e restauração, ele garante segurança e flexibilidade para o uso diário.
