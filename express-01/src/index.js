import "dotenv/config";
import express from "express";
import models, { sequelize } from "./models/index.js";
import {
  corsMiddleware,
  logMiddleware,
  contextMiddleware,
} from "./middlewares/index.js";
import * as routes from "./routes/index.js";
import errorHandler from "./middlewares/errorHandler.js";
import helmet from "helmet";

const app = express();

app.set("trust proxy", true);

app.use(helmet());

// middlewares
app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logMiddleware);
app.use(contextMiddleware);

// rotas
app.get("/", (req, res) => {
  return res.status(200).send("Servidor express a executar...");
});

app.use("/session", routes.session);
app.use("/users", routes.user);
app.use("/messages", routes.message);
app.use("/portfolio", routes.portfolio); 

app.use(errorHandler);

const port = process.env.PORT || 3000;

const eraseDatabaseOnSync = process.env.ERASE_DATABASE_ON_SYNC === "true";
const syncDatabase = process.env.SYNC_DATABASE === "true" || eraseDatabaseOnSync;

const startServer = () => {
  app.listen(port, () => console.log(`Servidor rodando na porta ${port}!`));
};

if (syncDatabase) {
  sequelize.sync({ force: eraseDatabaseOnSync, alter: !eraseDatabaseOnSync }).then(async () => {
    if (eraseDatabaseOnSync) {
      await createInitialData();
    }
    startServer();
  });
} else {
  startServer();
}

const createInitialData = async () => {
  await models.User.create(
    {
      username: "rwieruch",
      email: "rwieruch@email.com",
      messages: [
        { text: "Published the Road to learn React" },
      ],
    },
    { include: [models.Message] }
  );

  await models.User.create(
    {
      username: "arthur.moreira",
      email: "arthur.moreira@gmail.com",
      nome: "Arthur Vinícius Moreira da Silva",
      telefone: "(81) 99994-4109",
      resumo_sobre: "Desenvolvedor Full Stack com experiência em React, Node.js e PostgreSQL. Apaixonado por tecnologia e sempre em busca de novos desafios.",
      academic_experiences: [
        {
          instituicao: "Universidade Católica de Pernambuco (UNICAP)",
          curso: "Tecnólogo em Sistemas para Internet",
          data_inicio: "2025-03-01",
          data_fim: "2027-06-01"
        }
      ],
      professional_experiences: [
        {
          empresa: "Superintendência Estadual do Ministério da Saúde em Pernambuco",
          cargo: "Estagiário de TI",
          descricao_atividades: "Desenvolvimento de sistemas Fullstack.",
          data_inicio: "2026-03-01"
        }
      ],
      projects: [
        {
          nome_projeto: "ChronoTask",
          descricao: "Gerenciador de tarefas para os setores da COTRE/PE e DITRE/PE",
          tecnologias: "React, Node.js, Postgres",
          link_repositorio: "https://github.com/MinisterioSaudeEstag/ChronoTask"
        }
      ]
    },
    {
      include: [
        models.AcademicExperience,
        models.ProfessionalExperience,
        models.Project
      ],
    }
  );

  await models.User.create(
    {
      username: "emily.marques",
      email: "emily.marques@gmail.com",
      nome: "Emily Marques",
      telefone: "(81) 95687-5107",
      resumo_sobre: "Estudante de Fisioterapia, apaixonada por saúde e bem-estar. Buscando oportunidades para aplicar meus conhecimentos e contribuir para a melhoria da qualidade de vida das pessoas.",
      academic_experiences: [
        {
          instituicao: "Universidade Estácio de Sá",
          curso: "Fisioterapia",
          data_inicio: "2025-03-01",
          data_fim: "2030-06-01"
        }
      ],
      professional_experiences: [
        {
          empresa: "Clínica Vida e Saúde",
          cargo: "Estagiária de Fisioterapia",
          descricao_atividades: "Atendimento a pacientes, acompanhamento de tratamentos e suporte em atividades clínicas.",
          data_inicio: "2026-03-01",
          data_fim: "2026-10-01"
        }
      ],
      projects: [
        {
          nome_projeto: "Projeto de Pesquisa em Reabilitação",
          descricao: "Pesquisa sobre técnicas de reabilitação para pacientes com lesões musculoesqueléticas.",
          tecnologias: "Métodos de pesquisa, análise de dados"
        }
      ]
    },
    {
      include: [
        models.AcademicExperience,
        models.ProfessionalExperience,
        models.Project
      ],
    }
  );
};

export default app;