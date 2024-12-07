import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();
const API_KEY = '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'; 
//API KEY from https://platform.openai.com/account/api-keys.

router.post('/generate-speech', async (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).send('Text is required to generate speech.');
  }
  try {
    const response = await fetch('https://api.openai.com/v1/audio/speech', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`, 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'tts-1',
        voice: 'alloy',
        input: text,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenAI API Error: ${errorText}`);
    }
    const audioBuffer = await response.arrayBuffer();
    res.set('Content-Type', 'audio/mp3');
    res.send(Buffer.from(audioBuffer));
  } catch (error) {
    console.error('Error generating speech:', error);
    res.status(500).send('Error generating speech');
  }
});

export default router;
