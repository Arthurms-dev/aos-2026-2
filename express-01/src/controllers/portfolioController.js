const getPerfil = async (req, res) => {
  try {
    const perfil = {
      nome: "Arthur Vinícius",
      titulo: "Desenvolvedor Full Stack",
      resumo: "Desenvolvedor focado em criar soluções completas e eficientes utilizando React, React Native e Node.js. Tenho experiência prática em construir desde sistemas administrativos e dashboards de monitoramento para a área da saúde pública até plataformas com integrações complexas. Sou apaixonado por resolver problemas reais utilizando tecnologia e inteligência artificial."
    };
    return res.status(200).json(perfil);
  } catch (error) {
    return res.status(500).json({ error: "Erro interno ao buscar perfil." });
  }
};

const getAcademica = async (req, res) => {
  try {
    const academica = [
      { 
        id: '1', 
        curso: 'Sistemas para Internet', 
        instituicao: 'Universidade Católica de Pernambuco (UNICAP)', 
        periodo: '2025 - 2027 (Previsão)', 
        descricao: 'Atualmente no 4º período. Foco em desenvolvimento web, arquitetura de software, e construção de soluções modernas para a internet.' 
      },
      { 
        id: '2', 
        curso: 'Programação de Jogos Digitais (Ensino Médio Integrado)', 
        instituicao: 'Escola Técnica Estadual Cícero Dias', 
        periodo: '2022 - 2024', 
        descricao: 'Formação técnica onde desenvolvi forte base em lógica de programação e estruturação de projetos tecnológicos.' 
      },
      { 
        id: '3', 
        curso: 'Bootcamp AI React Front-end', 
        instituicao: 'Digital Innovation One (DIO)', 
        periodo: 'Concluído', 
        descricao: 'Trilha intensiva de especialização focada no ecossistema React e integração com conceitos e APIs de Inteligência Artificial.' 
      }
    ];
    return res.status(200).json(academica);
  } catch (error) {
    return res.status(500).json({ error: "Erro interno ao buscar dados acadêmicos." });
  }
};

const getProfissional = async (req, res) => {
  try {
    const profissional = [
      { 
        id: '1', 
        cargo: 'Estagiário de TI', 
        empresa: 'Superintendência Estadual do Ministério da Saúde (PE)', 
        periodo: 'Março 2026 - Presente', 
        descricao: 'Desenvolvimento de sistemas fullstack, criação de dashboards avançados, pesquisas aplicadas sobre inteligência artificial e resolução de problemas técnicos utilizando tecnologia. Atuação contínua na otimização do sistema administrativo.' 
      },
      { 
        id: '2', 
        cargo: 'Residente em Tecnologia', 
        empresa: 'Porto Digital', 
        periodo: 'Julho 2026 - Presente', 
        descricao: 'Alocado em squad multidisciplinar de tecnologia para resolução de desafios práticos propostos pela indústria.' 
      },
      { 
        id: '3', 
        cargo: 'Assistente de Departamento Pessoal', 
        empresa: 'Grupo GPS', 
        periodo: 'Dezembro 2025 - Março 2026', 
        descricao: 'Atuação na admissão de colaboradores no sistema TOTVS, gestão de benefícios, realização de integração e apresentação para novos funcionários.' 
      },
      { 
        id: '4', 
        cargo: 'Jovem Aprendiz de Assistente Administrativo', 
        empresa: 'Servis Segurança', 
        periodo: 'Junho 2025 - Dezembro 2025', 
        descricao: 'Apoio estratégico à equipe externa, organização documental, logística de compras de EPIs e contato contínuo com colaboradores.' 
      }
    ];
    return res.status(200).json(profissional);
  } catch (error) {
    return res.status(500).json({ error: "Erro interno ao buscar dados profissionais." });
  }
};

const getProjetos = async (req, res) => {
  try {
    const projetos = [
      { 
        id: '1', 
        nome: 'ChronoTask', 
        descricao: 'Gerenciador de tarefas departamental. Permite à chefia designar e controlar demandas em tempo real, além de contar com chat interno, calendário dinâmico, filtros avançados e extração de planilhas.', 
        tech: 'React, Node.js, Express, Tailwind CSS',
        imagem: 'https://i.imgur.com/hP7jXjE.png'
      },
      { 
        id: '2', 
        nome: 'Dashboard - Sismob', 
        descricao: 'Dashboard interativo para acompanhamento de obras voltadas à saúde. Possui mapas por município, gráficos, tabelas e um sistema de importação de planilhas que atualiza as métricas automaticamente.', 
        tech: 'React, Node.js, Express, Tailwind CSS',
        imagem: 'https://i.imgur.com/9zZVemS.png'
      },
      { 
        id: '3', 
        nome: 'Dashboard - Monitoramento de Convênios', 
        descricao: 'Dashboard gerencial construído para acompanhamento detalhado da situação de convênios dos setores COTRE/PE e DITRE/PE, contando com indicadores complexos e mapa situacional.', 
        tech: 'Power BI / React, Node.js, Express, Tailwind CSS',
        imagem: 'https://i.imgur.com/YrRSL7i.png'
      }
    ];
    return res.status(200).json(projetos);
  } catch (error) {
    return res.status(500).json({ error: "Erro interno ao buscar projetos." });
  }
};

export default {
  getPerfil,
  getAcademica,
  getProfissional,
  getProjetos,
};