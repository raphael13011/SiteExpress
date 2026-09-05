export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { nom, contact, metier, formule, projet, options } = req.body;

  if (!nom || !contact) {
    return res.status(400).json({ error: 'Nom et contact requis' });
  }

  try {
    const optionsText = options && options.length > 0
      ? options.map(o => `- ${o.name} (+${o.price}\u20AC)`).join('\n')
      : 'Aucune';

    const totalOptions = options ? options.reduce((s, o) => s + o.price, 0) : 0;

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'SiteMinute <onboarding@resend.dev>',
        to: process.env.LEAD_EMAIL,
        subject: `Nouveau devis SiteMinute - ${nom} (${metier || 'Non renseigne'})`,
        text: `NOUVELLE DEMANDE DE DEVIS\n\nNom / Entreprise : ${nom}\nContact : ${contact}\nMetier : ${metier || 'Non renseigne'}\nFormule : ${formule || 'Non choisie'}\n\nProjet :\n${projet || 'Non renseigne'}\n\nOptions selectionnees :\n${optionsText}\n\nTotal options : +${totalOptions}\u20AC\n\n---\nEnvoye depuis siteminute.fr`,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('Resend error:', err);
      return res.status(500).json({ error: 'Erreur envoi' });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Contact error:', err);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
}
