import 'dotenv/config';
import models, { sequelize } from './models/index.js';

async function runSeed() {
  try {
    await sequelize.authenticate();
    console.log('Conexão estabelecida.');

    await sequelize.sync({ alter: true });

    const user1 = await models.User.create({
      username: 'arthur.moreira',
      email: 'arthur.moreira@gmail.com',
      nome: 'Arthur Vinícius Moreira da Silva',
      telefone: '(81) 99994-4109',
      resumo_sobre: 'Desenvolvedor Full Stack com experiência em React, Node.js e PostgreSQL. Apaixonado por tecnologia e sempre em busca de novos desafios.'
    });

    await models.AcademicExperience.create({
      user_id: user1.id,
      instituicao: 'Universidade Católica de Pernambuco (UNICAP)',
      curso: 'Tecnólogo em Sistemas para Internet',
      data_inicio: '2025-03-01',
      data_fim: '2027-06-01'
    });

    await models.ProfessionalExperience.create({
      user_id: user1.id,
      empresa: 'Superintendência Estadual do Ministério da Saúde em Pernambuco',
      cargo: 'Estagiário de TI',
      descricao_atividades: 'Desenvolvimento de sistemas Fullstack.',
      data_inicio: '2026-03-01'
    });

    await models.Project.create({
      user_id: user1.id,
      nome_projeto: 'ChronoTask',
      descricao: 'Gerenciador de tarefas para os setores da COTRE/PE e DITRE/PE',
      tecnologias: 'React, Node.js, Postgres'
    });

    const user2 = await models.User.create({
      username: 'emily.marques',
      email: 'emily.marques@gmail.com',
      nome: 'Emily Marques',
      telefone: '(81) 95687-5107',
      resumo_sobre: 'Estudante de Fisioterapia, apaixonada por saúde e bem-estar. Buscando oportunidades para aplicar meus conhecimentos e contribuir para a melhoria da qualidade de vida das pessoas.'
    });

    await models.AcademicExperience.create({
      user_id: user2.id,
      instituicao: 'Universidade Estácio de Sá',
      curso: 'Fisioterapia',
      data_inicio: '2025-03-01',
      data_fim: '2030-06-01'
    });

    console.log('Currículos inseridos com sucesso no NeonDB!');
    process.exit();
  } catch (error) {
    console.error('Erro no seed:', error);
    process.exit(1);
  }
}

runSeed();