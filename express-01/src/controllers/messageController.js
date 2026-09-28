import { messageService } from "../services/index.js";

const getMessages = async (req, res) => {
  const messages = await messageService.getAllMessages();
  return res.send(messages);
};

const getMessage = async (req, res) => {
  const message = await messageService.getMessageById(req.params.messageId);
  return res.send(message);
};

const createMessage = async (req, res) => {
  const message = await messageService.createMessage({
    text: req.body.text,
    userId: req.context.me.id,
  });

  return res.send(message);
};

const deleteMessage = async (req, res) => {
  await messageService.deleteMessage(req.params.messageId);
  return res.send(true);
};

const updateMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const data = req.body;

    if (!messageId || !data || Object.keys(data).length === 0) {
      return res.status(400).send({ error: "ID da mensagem e conteúdo são obrigatórios." });
    }

    const updatedMessage = await messageService.updateMessage(messageId, data);

    if (!updatedMessage) {
      return res.status(404).send({ error: "Mensagem não encontrada." });
    }

    return res.status(200).send(updatedMessage);
  } catch (error) {
    return res.status(500).send({ error: "Erro interno ao atualizar a mensagem." });
  }
};

export default {
  getMessages,
  getMessage,
  createMessage,
  deleteMessage,
  updateMessage,
};