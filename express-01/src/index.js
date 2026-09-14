import "dotenv/config";
import cors from "cors";
import express from "express";
import models, { sequelize } from "./models/index.js";
import routes from "./routes/index.js";

const app = express();

app.set("trust proxy", true);

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// middleware the logs
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

// middleware de autenticação "fake" + injeção dos models no req.context
app.use((req, res, next) => {
  req.context = {
    models,
    me: models.users ? models.users[1] : null, // Proteção extra caso users esteja vazio
  };
  next();
});

// rotas
app.get("/", (req, res) => {
  return res.send("Servidor express executando...");
});
app.use("/session", routes.session);
app.use("/users", routes.user);
app.use("/messages", routes.message);

const createUsersWithMessages = async () => {
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
      username: "ddavids",
      email: "ddavids@email.com",
      messages: [
        { text: "Happy to release ..." },
        { text: "Published a complete ..." },
      ],
    },
    { include: [models.Message] }
  );
};

// =========================================================================
// MUDANÇA PRINCIPAL AQUI:
// Separa o ambiente local (escuta porta) do ambiente Vercel (exporta o app)
// =========================================================================

const eraseDatabaseOnSync = process.env.ERASE_DATABASE_ON_SYNC === "true";

if (process.env.NODE_ENV !== "production") {
  // AMBIENTE LOCAL (npm run dev)
  const port = process.env.PORT || 3000;
  
  sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
    if (eraseDatabaseOnSync) {
      await createUsersWithMessages();
    }
    app.listen(port, () => console.log(`Example app listening on port ${port}!`));
  });
} else {
  // AMBIENTE PRODUÇÃO (Vercel)
  // Conecta ao banco de forma assíncrona, mas não bloqueia a exportação
  sequelize.sync(); 
}

export default app;