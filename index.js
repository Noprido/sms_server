const express = require('express');
const twilio = require('twilio');

const app = express();

// Configuration Twilio
const accountSid = 'AC9ce407a4a82665247f9724d5595c3ed8';
const authToken = '684da417becec03ab345eab8a02826b8';
const twilioClient = twilio(accountSid, authToken);

// Route pour l'envoi de SMS
app.post('/api/sms/send', async (req, res) => {

  console.log("api appelée")
  const { phoneNumber, message, senderID } = req.body;

  try {
    // Envoi du SMS avec Twilio
    await twilioClient.messages.create({
      body: message,
      to: phoneNumber,
      from: senderID
    });

    res.status(200).send('SMS envoyé avec succès.');
  } catch (error) {
    console.error('Erreur lors de l\'envoi du SMS :', error);
    res.status(500).send('Erreur lors de l\'envoi du SMS.');
  }
});

// Démarrage du serveur
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
