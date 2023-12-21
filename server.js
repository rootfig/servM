const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/post', (req, res) => {
  const { sum, orientation, payer, client } = req.body;

  if (!sum || !orientation || !payer || !client) {
    let missingFields = [];
    if (!sum) missingFields.push('sum');
    if (!orientation) missingFields.push('orientation');
    if (!payer) missingFields.push('payer');
    if (!client) missingFields.push('client');

    return res.status(400).json({ error: `Отсутствуют обязательные поля: ${missingFields.join(', ')}` });
  }

  const { name: payerName, phone: payerPhone, email: payerEmail } = payer;
  const { name: clientName, phone: clientPhone, comment } = client;

  if (!payerName || !payerPhone || !payerEmail || !clientName || !clientPhone) {
    let missingFields = [];
    if (!payerName) missingFields.push('payer.name');
    if (!payerPhone) missingFields.push('payer.phone');
    if (!payerEmail) missingFields.push('payer.email');
    if (!clientName) missingFields.push('client.name');
    if (!clientPhone) missingFields.push('client.phone');

    return res.status(400).json({ error: `Отсутствуют обязательные поля: ${missingFields.join(', ')}` });
  }

  const randomId = uuidv4();

  const responseData = {
    randomId,
    sum,
    orientation,
    payer: {
      name: payerName,
      phone: payerPhone,
      email: payerEmail,
    },
    client: {
      name: clientName,
      phone: clientPhone,
      comment,
    },
  };

  return res.json(responseData);
});

const PORT = 3044;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порте ${PORT}`);
});
