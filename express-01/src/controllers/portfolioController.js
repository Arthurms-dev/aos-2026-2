const getPerfil = async (req, res) => {
  try {
    const perfil = {
      nome: "Arthur Vinícius",
      titulo: "Desenvolvedor Full Stack",
      resumo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
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
        curso: 'Lorem Ipsum Dolor', 
        instituicao: 'Sit Amet University', 
        periodo: '2022 - Presente', 
        descricao: 'Consectetur adipiscing elit. Sed do eiusmod tempor incididunt.' 
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
        cargo: 'Senior Lorem Ipsum', 
        empresa: 'Dolor Sit Amet Tech', 
        periodo: '2023 - Presente', 
        descricao: 'Duis aute irure dolor in reprehenderit in voluptate velit esse.' 
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
        nome: 'Lorem Ipsum Alpha', 
        descricao: 'Pellentesque ornare sem lacinia quam venenatis.', 
        tech: 'React Native, Node.js' 
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