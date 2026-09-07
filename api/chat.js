export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { message, history } = req.body;
  if (!message) return res.status(400).json({ error: 'Message requis' });

  const systemPrompt = `Tu es l'assistant virtuel de Site Minute, une agence de creation de sites web pour artisans et PME. Tu reponds en francais, de maniere courte et amicale (2-3 phrases max).

Voici les infos sur Site Minute :
- Offre Essentiel : 399 EUR, site vitrine template, 3-5 pages, responsive, livre en 48h
- Offre Sur-Mesure : 699 EUR, design personnalise, jusqu'a 10 pages, SEO, Analytics, livre en 5 jours
- Offre Pro : sur devis, base de donnees, reservation, espace admin
- Maintenance : 49 EUR/mois, hebergement, domaine, mises a jour, support
- Paiement a la livraison uniquement - le client ne paye que s'il est satisfait
- Options a la carte : Google Maps (19 EUR), WhatsApp (19 EUR), galerie photos (39 EUR), blog (69 EUR), chatbot IA (99 EUR), etc.
- Le fondateur est ingenieur informaticien avec un CAP Electricite, il comprend les artisans

Si le visiteur semble interesse, propose-lui de remplir le formulaire de devis gratuit en bas de la page ou de nous contacter directement.
Ne reponds jamais a des questions qui n'ont rien a voir avec Site Minute ou la creation de sites web.`;

  try {
    const messages = (history || []).map(h => ({ role: h.role, content: h.content }));
    messages.push({ role: 'user', content: message });

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 300,
        system: systemPrompt,
        messages: messages,
      }),
    });

    const data = await response.json();
    if (data.error) return res.status(500).json({ error: data.error.message });

    const text = data.content.filter(i => i.type === 'text').map(i => i.text).join('');
    return res.status(200).json({ reply: text });
  } catch (err) {
    console.error('Chat error:', err);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
}
