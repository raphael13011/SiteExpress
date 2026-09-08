import { useState, useEffect, useRef } from "react";

const PLANS = [
  { name: "Essentiel", price: "399", desc: "Votre vitrine en ligne en 48h", features: ["Template professionnel", "3 à 5 pages", "Adapté mobile & tablette", "Formulaire de contact", "Livré en 48h"], highlight: false },
  { name: "Sur-Mesure", price: "699", desc: "Un site unique à votre image", features: ["Design 100% personnalisé", "Jusqu'à 10 pages", "Référencement Google (SEO)", "Google Analytics", "Formulaire avancé", "Livré en 5 jours"], highlight: true },
  { name: "Pro", price: null, desc: "Solution complète sur mesure", features: ["Base de données clients", "Réservation en ligne", "Espace admin", "Fonctionnalités avancées", "Accompagnement complet"], highlight: false }
];

const OPTIONS = [
  { category: "Essentiels — 19€", items: [
    { name: "\uD83D\uDCCD Intégration Google Maps", price: 19 },
    { name: "\uD83D\uDCF1 Bouton WhatsApp / Appel direct", price: 19 },
    { name: "\uD83D\uDCF2 Liens réseaux sociaux", price: 19 },
    { name: "\uD83C\uDFAC Vidéo de présentation", price: 19 },
    { name: "\uD83C\uDF6A Bandeau cookies RGPD", price: 19 },
  ]},
  { category: "Contenu — 39€", items: [
    { name: "\uD83D\uDCF7 Galerie photos / carrousel", price: 39 },
    { name: "\u2B50 Page avis clients", price: 39 },
    { name: "\uD83C\uDF7D\uFE0F Page menu / carte restaurant", price: 39 },
    { name: "\uD83D\uDCDD Formulaire de contact avancé", price: 39 },
  ]},
  { category: "Avancé — 69€", items: [
    { name: "\uD83D\uDCF0 Blog intégré (5 articles SEO)", price: 69 },
    { name: "\uD83D\uDCCB Formulaire devis en ligne", price: 69 },
    { name: "\uD83D\uDD0D SEO avancé (Search Console, sitemap)", price: 69 },
  ]},
  { category: "Premium — 99€", items: [
    { name: "\uD83E\uDD16 Chatbot IA intégré", price: 99 },
    { name: "\uD83C\uDF0D Multi-langue (2 langues)", price: 99 },
    { name: "\uD83D\uDCC5 Système de réservation simple", price: 99 },
  ]}
];

const METIERS = [
  { icon: "\uD83D\uDD27", name: "Artisan / BTP", desc: "Électricien, plombier, peintre, maçon. Réalisations et demandes de devis." },
  { icon: "\uD83D\uDC85", name: "Beauté / Bien-être", desc: "Prothésiste ongulaire, esthéticienne, coiffeur. Galerie, tarifs, RDV." },
  { icon: "\uD83C\uDF7D\uFE0F", name: "Restaurant / Traiteur", desc: "Menu en ligne, photos, réservation, lien Uber Eats." },
  { icon: "\uD83C\uDFCB\uFE0F", name: "Sport / Coaching", desc: "Coach sportif, salle, yoga. Planning, tarifs, inscription." },
  { icon: "\uD83D\uDCF8", name: "Photographe", desc: "Portfolio visuel, galeries clients, réservation." },
  { icon: "\uD83E\uDDF9", name: "Services / Nettoyage", desc: "Nettoyage, conciergerie. Zones d'intervention, devis." },
  { icon: "\u2696\uFE0F", name: "Professions libérales", desc: "Avocat, comptable, consultant. Site sobre et pro." },
  { icon: "\uD83C\uDFE0", name: "Immobilier", desc: "Agent, diagnostiqueur. Catalogue de biens, SEO local." }
];

const BLOG = [
  { title: "Pourquoi 72% des clients ne vous appellent jamais sans site web", tag: "Guide", color: "#3b82f6", bg: "#eff6ff", content: "En 2026, le premier réflexe d'un client qui cherche un artisan c'est Google. Si vous n'avez pas de site, vous êtes invisible pour 3 clients potentiels sur 4. Un site vitrine à 399€ vous rend visible 24h/24." },
  { title: "Comment apparaître en premier sur Google dans votre ville", tag: "SEO local", color: "#d97706", bg: "#fef3c7", content: "La combinaison site web optimisé + fiche Google Business vous place devant vos concurrents. Votre ville dans le titre, vos quartiers dans le contenu, votre adresse dans le pied de page." },
  { title: "Comment Marie a triplé ses rendez-vous grâce à son site", tag: "Témoignage", color: "#e91e63", bg: "#fce4ec", content: "Marie est prothésiste ongulaire. Avant son site : 8 clientes/semaine. Après : 25. Son secret : galerie photos avant/après + bouton WhatsApp + tarifs en ligne." },
  { title: "Site web vs page Facebook : pourquoi les réseaux ne suffisent pas", tag: "Comparatif", color: "#2e7d32", bg: "#e8f5e9", content: "Vous ne contrôlez ni l'algorithme, ni la visibilité. Votre page peut être supprimée. Un site vous appartient, apparaît sur Google, et donne une image professionnelle." },
  { title: "5 erreurs qui font fuir les clients de votre site", tag: "Pratique", color: "#7c3aed", bg: "#f3e8ff", content: "Site lent = 53% de départs. Pas de téléphone visible = 44% partent. Pas mobile = 60% de visiteurs perdus. Pas de photos = pas de confiance." }
];

const TEMOIGNAGES = [
  { stars: "★★★★★", text: "J'ai reçu mon site en 2 jours. Depuis, je reçois 3-4 demandes de devis par semaine. Avant j'avais rien.", author: "Marc D.", job: "Électricien — Marseille" },
  { stars: "★★★★★", text: "Mes clientes me trouvent sur Google maintenant. La galerie photos fait tout le travail. J'ai doublé ma clientèle en 3 mois.", author: "Sarah L.", job: "Prothésiste ongulaire — Aix-en-Provence" },
  { stars: "★★★★★", text: "Le menu en ligne et Google Maps ont changé la donne. Les gens nous trouvent, voient la carte, et viennent.", author: "Paolo R.", job: "Restaurant italien — Lyon" },
  { stars: "★★★★★", text: "J'avais un devis à 3 500€ chez une agence. Ici j'ai payé 699€ et le résultat est aussi bien. Je recommande.", author: "Karim B.", job: "Plombier — Montpellier" }
];


const BLOG_FULL = [
  { id: "clients-sans-site", image: "/blog-clients.jpg", title: "Pourquoi 72% des clients ne vous appellent jamais sans site web", tag: "Guide", color: "#3b82f6", bg: "#eff6ff", readTime: "5 min", date: "2026-09-01",
    content: `En 2026, le premier réflexe d'un client qui cherche un artisan c'est Google. Pas les Pages Jaunes, pas le bouche à oreille. Si vous n'avez pas de site, vous êtes invisible pour 3 clients potentiels sur 4.

## Les chiffres qui parlent

Une étude IFOP montre que 72% des Français ne contactent jamais un professionnel qui n'a pas de site web. Pas parce que vous êtes mauvais — parce qu'ils ne vous trouvent pas. Quand quelqu'un tape "électricien Marseille" sur Google, seuls les pros avec un site apparaissent.

## Ce que ça vous coûte

Imaginons que vous ratez 3 clients par semaine à cause de votre absence en ligne. À 200€ de panier moyen, c'est 600€/semaine, soit 2 400€/mois de manque à gagner. Un site vitrine à 399€ se rentabilise dès le premier client.

## La solution

Un site vitrine simple avec vos prestations, vos tarifs, un formulaire de contact et votre numéro de téléphone visible. C'est tout ce qu'il faut. Pas besoin de 50 pages ou de fonctionnalités complexes. L'important c'est d'exister sur Google.

## L'investissement le plus rentable

Pour 399€ + 49€/mois de maintenance, vous êtes visible 24h/24. C'est moins cher qu'une pub dans le journal local, et ça travaille pour vous même quand vous dormez.` },

  { id: "premier-sur-google", image: "/blog-google.jpg", title: "Comment apparaître en premier sur Google dans votre ville", tag: "SEO local", color: "#d97706", bg: "#fef3c7", readTime: "6 min", date: "2026-08-28",
    content: `Quand quelqu'un tape "plombier Lyon" ou "coiffeur Marseille", Google affiche en priorité les professionnels qui ont un site web optimisé et une fiche Google Business. Voici comment y arriver.

## Étape 1 : Avoir un site web optimisé

Votre site doit contenir le nom de votre ville dans le titre, dans les textes, et dans les balises meta. Par exemple : "Électricien à Marseille - Dépannage et installation" plutôt que juste "Électricien".

## Étape 2 : Créer votre fiche Google Business

C'est gratuit et indispensable. Allez sur business.google.com, créez votre fiche avec vos horaires, votre adresse, vos photos, et votre numéro. Les fiches Google Business apparaissent en haut des résultats avec la carte.

## Étape 3 : Obtenir des avis clients

Les avis Google sont le facteur numéro 1 de classement local. Demandez à vos clients satisfaits de vous laisser un avis. 10 avis 5 étoiles et vous passez devant 90% de vos concurrents.

## Étape 4 : Être présent partout

Inscrivez-vous sur PagesJaunes, Yelp, et les annuaires de votre métier. Chaque mention de votre nom + adresse + téléphone renforce votre position sur Google.

## Résultat

Avec ces 4 étapes, vous pouvez passer de invisible à première page de Google en 2-3 mois. C'est exactement ce qu'on configure dans nos offres Sur-Mesure.` },

  { id: "marie-triple-rdv", image: "/blog-marie.jpg", title: "Comment Marie a triplé ses rendez-vous grâce à son site", tag: "Témoignage", color: "#e91e63", bg: "#fce4ec", readTime: "4 min", date: "2026-08-25",
    content: `Marie est prothésiste ongulaire à Aix-en-Provence. Avant son site, elle ne travaillait que par bouche à oreille — 8 à 10 clientes par semaine. Aujourd'hui elle en a 25. Voici son histoire.

## Le problème

Marie avait une page Instagram avec 500 abonnées, mais les nouvelles clientes ne la trouvaient pas sur Google. Quand quelqu'un tapait "prothésiste ongulaire Aix-en-Provence", elle n'apparaissait nulle part.

## La solution

On lui a créé un site Sur-Mesure avec :
- Une galerie photos avant/après de ses réalisations
- Ses tarifs clairement affichés
- Un bouton WhatsApp pour prise de RDV directe
- Son adresse avec Google Maps intégré
- Ses horaires et disponibilités

## Les résultats

Dès le premier mois, Marie a commencé à recevoir des appels de clientes qui l'avaient trouvée sur Google. Au bout de 3 mois, elle est passée de 8 à 25 clientes par semaine.

## Le secret

Les photos avant/après sur son site sont partagées par ses clientes sur Instagram, ce qui crée un cercle vertueux. Le site alimente les réseaux sociaux, qui alimentent le site.

## Le coût

699€ pour le site + 49€/mois de maintenance. Rentabilisé dès la première semaine avec 2-3 nouvelles clientes.` },

  { id: "site-vs-facebook", image: "/blog-facebook.jpg", title: "Site web vs page Facebook : pourquoi les réseaux sociaux ne suffisent pas", tag: "Comparatif", color: "#2e7d32", bg: "#e8f5e9", readTime: "5 min", date: "2026-08-20",
    content: `Beaucoup d'artisans pensent qu'une page Facebook ou un compte Instagram suffit pour être visible en ligne. C'est une erreur qui vous coûte des clients.

## Ce que Facebook ne fait pas

Facebook ne vous rend pas visible sur Google. Quand un client tape "plombier Marseille", votre page Facebook n'apparaît pas dans les résultats. Seuls les sites web apparaissent.

## Le problème de l'algorithme

Facebook montre vos publications à 5-10% de vos abonnés seulement. Vous avez 500 abonnés ? Seulement 25 à 50 personnes voient votre post. Et ce chiffre baisse chaque année.

## Vous ne contrôlez rien

Facebook peut supprimer votre page du jour au lendemain. Changement de politique, signalement abusif, bug — et vous perdez tout. Un site web vous appartient.

## L'image professionnelle

Un artisan avec un site web dédié inspire plus confiance qu'un artisan avec juste une page Facebook. C'est un signal de sérieux et de professionnalisme.

## La bonne stratégie

L'idéal c'est les deux : un site web comme base solide (visible sur Google, professionnel, vous appartient) + des réseaux sociaux qui redirigent vers votre site. Le site est la fondation, les réseaux sont la vitrine.` },

  { id: "erreurs-site-web", image: "/blog-erreurs.jpg", title: "5 erreurs qui font fuir les clients de votre site", tag: "Pratique", color: "#7c3aed", bg: "#f3e8ff", readTime: "4 min", date: "2026-08-15",
    content: `Un site web mal conçu fait plus de mal que pas de site du tout. Voici les 5 erreurs les plus courantes et comment les éviter.

## Erreur 1 : Un site qui charge lentement

53% des visiteurs quittent un site qui met plus de 3 secondes à charger. Sur mobile, c'est encore pire. Un site lent = des clients perdus. La solution : un hébergement rapide et des images optimisées.

## Erreur 2 : Pas de numéro de téléphone visible

44% des visiteurs quittent un site s'ils ne trouvent pas de numéro de téléphone. Votre numéro doit être visible en haut de chaque page, cliquable sur mobile.

## Erreur 3 : Pas adapté mobile

60% de vos visiteurs sont sur smartphone. Si votre site ne s'adapte pas à l'écran du téléphone, vous perdez plus de la moitié de vos clients potentiels.

## Erreur 4 : Pas de photos

Un artisan sans photos de ses réalisations, c'est un restaurant sans photos de ses plats. Les clients veulent voir votre travail avant de vous contacter.

## Erreur 5 : Pas de formulaire de contact

Certains clients préfèrent écrire plutôt qu'appeler, surtout en dehors des heures ouvrées. Un formulaire de contact simple capture ces demandes 24h/24.

## La bonne nouvelle

Ces 5 erreurs sont faciles à éviter quand le site est bien conçu dès le départ. C'est exactement ce qu'on fait chez Site Minute — chaque site est rapide, mobile, avec téléphone visible, photos et formulaire.` }
];

export default function App() {
  const [m, setM] = useState(false);
  const [sel, setSel] = useState([]);
  const [cgv, setCgv] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [page, setPage] = useState("home");
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showRdv, setShowRdv] = useState(false);
  const [chatMessages, setChatMessages] = useState([{ role: "assistant", content: "Bonjour ! Je suis l'assistant Site Minute. Comment puis-je vous aider ?" }]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);

  const sendChat = async () => {
    if (!chatInput.trim() || chatLoading) return;
    const msg = chatInput.trim();
    setChatInput("");
    setChatMessages(prev => [...prev, { role: "user", content: msg }]);
    setChatLoading(true);
    try {
      const resp = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg, history: chatMessages })
      });
      const data = await resp.json();
      setChatMessages(prev => [...prev, { role: "assistant", content: data.reply || "Désolé, une erreur est survenue." }]);
    } catch (e) {
      setChatMessages(prev => [...prev, { role: "assistant", content: "Erreur de connexion. Réessayez." }]);
    }
    setChatLoading(false);
  };

  useEffect(() => { const c = () => setM(window.innerWidth < 768); c(); window.addEventListener("resize", c); return () => window.removeEventListener("resize", c); }, []);

  // Load Cal.com embed
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://app.cal.com/embed/embed.js';
    script.async = true;
    document.head.appendChild(script);
  }, []);

  // Inject animations
  useEffect(() => {
    const s = document.createElement('style');
    s.textContent = `
      @keyframes fadeUp { from { opacity:0; transform:translateY(40px); } to { opacity:1; transform:translateY(0); } }
      @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
      @keyframes scaleIn { from { opacity:0; transform:scale(0.92); } to { opacity:1; transform:scale(1); } }
      @keyframes slideL { from { opacity:0; transform:translateX(-40px); } to { opacity:1; transform:translateX(0); } }
      @keyframes slideR { from { opacity:0; transform:translateX(40px); } to { opacity:1; transform:translateX(0); } }
      @keyframes float { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-8px); } }
      @keyframes shimmer { 0% { background-position:-200% 0; } 100% { background-position:200% 0; } }
      @keyframes countUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
      @keyframes glow { 0%,100% { box-shadow:0 0 20px rgba(59,130,246,0); } 50% { box-shadow:0 0 30px rgba(59,130,246,0.15); } }
      .reveal { opacity:0; transform:translateY(30px); transition:opacity 0.7s ease, transform 0.7s ease; }
      .reveal.vis { opacity:1; transform:translateY(0); }
      .reveal-d1 { transition-delay:0.1s; }
      .reveal-d2 { transition-delay:0.2s; }
      .reveal-d3 { transition-delay:0.3s; }
      .reveal-d4 { transition-delay:0.4s; }
      .hero-t { animation:fadeUp 0.9s ease forwards; }
      .hero-s { animation:fadeUp 0.9s ease 0.15s forwards; opacity:0; }
      .hero-j { animation:fadeUp 0.9s ease 0.3s forwards; opacity:0; }
      .hero-b { animation:fadeUp 0.9s ease 0.45s forwards; opacity:0; }
      .hero-g { animation:scaleIn 0.7s ease 0.6s forwards; opacity:0; }
      .card-fx { transition:transform 0.35s cubic-bezier(.4,0,.2,1), box-shadow 0.35s ease, border-color 0.3s; }
      .card-fx:hover { transform:translateY(-6px); box-shadow:0 16px 48px rgba(15,23,42,0.08); }
      .plan-fx { transition:transform 0.35s cubic-bezier(.4,0,.2,1), box-shadow 0.35s ease; }
      .plan-fx:hover { transform:translateY(-8px) scale(1.02); box-shadow:0 20px 50px rgba(59,130,246,0.12); }
      .opt-fx { transition:all 0.2s ease; }
      .opt-fx:hover { transform:translateX(6px); border-color:#3b82f6 !important; background:#eff6ff !important; }
      .btn-glow { position:relative; overflow:hidden; transition:transform 0.2s, box-shadow 0.3s; }
      .btn-glow:hover { transform:translateY(-2px); box-shadow:0 8px 30px rgba(59,130,246,0.35); }
      .btn-glow::after { content:''; position:absolute; top:0; left:-100%; width:100%; height:100%; background:linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent); animation:shimmer 3s infinite; }
      .step-fx:hover .step-n-fx { animation:float 2s ease infinite; }
      .stat-fx { transition:transform 0.3s ease; cursor:default; }
      .stat-fx:hover { transform:scale(1.12); }
      .temo-fx { transition:transform 0.3s ease, box-shadow 0.3s; }
      .temo-fx:hover { transform:translateY(-4px); box-shadow:0 12px 36px rgba(0,0,0,0.06); }
      .guarantee-fx { animation:glow 3s ease infinite; }
    `;
    document.head.appendChild(s);

    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('vis'); });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    setTimeout(() => document.querySelectorAll('.reveal').forEach(el => obs.observe(el)), 100);

    return () => obs.disconnect();
  }, []);

  // Scroll animations
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      @keyframes scaleIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
      @keyframes slideLeft { from { opacity: 0; transform: translateX(-30px); } to { opacity: 1; transform: translateX(0); } }
      @keyframes slideRight { from { opacity: 0; transform: translateX(30px); } to { opacity: 1; transform: translateX(0); } }
      @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
      @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
      @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
      .anim { opacity: 0; }
      .anim.visible { animation: fadeUp 0.6s ease forwards; }
      .anim-delay-1 { animation-delay: 0.1s !important; }
      .anim-delay-2 { animation-delay: 0.2s !important; }
      .anim-delay-3 { animation-delay: 0.3s !important; }
      .anim-delay-4 { animation-delay: 0.4s !important; }
      .hero-title { animation: fadeUp 0.8s ease forwards; }
      .hero-sub { animation: fadeUp 0.8s ease 0.2s forwards; opacity: 0; }
      .hero-btns-anim { animation: fadeUp 0.8s ease 0.4s forwards; opacity: 0; }
      .hero-badge-anim { animation: fadeUp 0.8s ease 0.6s forwards; opacity: 0; }
      .stat-anim:hover { transform: scale(1.1); transition: transform 0.2s; }
      .plan-hover { transition: transform 0.3s, box-shadow 0.3s !important; }
      .plan-hover:hover { transform: translateY(-6px); box-shadow: 0 12px 40px rgba(59,130,246,0.12); }
      .option-hover { transition: all 0.15s !important; }
      .option-hover:hover { transform: translateX(4px); }
      .metier-float:hover { animation: float 2s ease infinite; }
      .btn-shine { position: relative; overflow: hidden; }
      .btn-shine::after { content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent); animation: shimmer 3s infinite; }
    `;
    document.head.appendChild(style);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
    }, { threshold: 0.1 });
    document.querySelectorAll('.anim').forEach(el => observer.observe(el));

    return () => { observer.disconnect(); document.head.removeChild(style); };
  }, []);

  const renderMarkdown = (content) => {
    return content.trim().split("\n").map((line, i) => {
      if (line.startsWith("## ")) return <h2 key={i} style={{ fontSize: 20, fontWeight: 800, color: "#0f172a", margin: "28px 0 10px" }}>{line.replace("## ", "")}</h2>;
      if (line.trim() === "") return null;
      return <p key={i} style={{ fontSize: 14, color: "#475569", margin: "6px 0", lineHeight: 1.8 }}>{line}</p>;
    });
  };

  const toggle = (name, price) => setSel(p => p.find(o => o.name === name) ? p.filter(o => o.name !== name) : [...p, { name, price }]);
  const total = sel.reduce((s, o) => s + o.price, 0);
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  // BLOG PAGE
  if (page === "blog") {
    return (
      <div style={{ minHeight: "100vh", background: "#fff", color: "#0f172a", fontFamily: "'Inter', -apple-system, sans-serif" }}>
        <nav style={{ maxWidth: 1100, margin: "0 auto", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div onClick={() => setPage("home")} style={{ fontSize: 22, fontWeight: 900, cursor: "pointer" }}>Site <span style={{ color: "#3b82f6" }}>Minute</span></div>
          <button onClick={() => setPage("home")} style={{ background: "#3b82f6", color: "#fff", border: "none", padding: "8px 20px", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Retour</button>
        </nav>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "40px 20px 60px" }}>
          <h1 style={{ fontSize: m ? 28 : 36, fontWeight: 900, margin: "0 0 8px", textAlign: "center" }}>Blog Site Minute</h1>
          <p style={{ fontSize: 15, color: "#64748b", margin: "0 0 40px", textAlign: "center" }}>Conseils pour développer votre présence en ligne</p>
          {BLOG_FULL.map((article) => (
            <div key={article.id} onClick={() => { setSelectedArticle(article); setPage("article"); }} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 16, marginBottom: 14, cursor: "pointer", transition: "all 0.2s", overflow: "hidden" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#3b82f6"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e2e8f0"; }}
            >
              {article.image && <img src={article.image} alt={article.title} style={{ width: "100%", height: 180, objectFit: "cover" }} />}
              <div style={{ padding: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <span style={{ background: article.bg, color: article.color, padding: "3px 10px", borderRadius: 6, fontSize: 11, fontWeight: 600 }}>{article.tag}</span>
                <span style={{ fontSize: 12, color: "#94a3b8" }}>{article.readTime}</span>
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 800, margin: "0 0 6px" }}>{article.title}</h3>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 12, color: "#94a3b8" }}>{article.date}</span>
                <span style={{ fontSize: 13, color: "#3b82f6", fontWeight: 600 }}>Lire →</span>
              </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ARTICLE PAGE
  if (page === "article" && selectedArticle) {
    return (
      <div style={{ minHeight: "100vh", background: "#fff", color: "#0f172a", fontFamily: "'Inter', -apple-system, sans-serif" }}>
        <nav style={{ maxWidth: 1100, margin: "0 auto", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div onClick={() => setPage("home")} style={{ fontSize: 22, fontWeight: 900, cursor: "pointer" }}>Site <span style={{ color: "#3b82f6" }}>Minute</span></div>
          <button onClick={() => setPage("blog")} style={{ background: "none", border: "1px solid #e2e8f0", color: "#0f172a", padding: "8px 20px", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>← Blog</button>
        </nav>
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "20px 20px 60px" }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 16, flexWrap: "wrap" }}>
            <span style={{ background: selectedArticle.bg, color: selectedArticle.color, padding: "3px 10px", borderRadius: 6, fontSize: 11, fontWeight: 600 }}>{selectedArticle.tag}</span>
            <span style={{ fontSize: 12, color: "#94a3b8" }}>{selectedArticle.date}</span>
            <span style={{ fontSize: 12, color: "#94a3b8" }}>{selectedArticle.readTime}</span>
          </div>
          <h1 style={{ fontSize: m ? 26 : 34, fontWeight: 900, margin: "0 0 20px", lineHeight: 1.2 }}>{selectedArticle.title}</h1>
          {selectedArticle.image && <img src={selectedArticle.image} alt={selectedArticle.title} style={{ width: "100%", height: 280, objectFit: "cover", borderRadius: 16, marginBottom: 24 }} />}
          <article>{renderMarkdown(selectedArticle.content)}</article>
          <div style={{ background: "#0f172a", borderRadius: 16, padding: 28, textAlign: "center", marginTop: 32 }}>
            <h3 style={{ color: "#fff", fontSize: 20, fontWeight: 800, margin: "0 0 8px" }}>Besoin d'un site pour votre activité ?</h3>
            <p style={{ color: "#94a3b8", fontSize: 14, margin: "0 0 16px" }}>À partir de 399€, livré en 48h.</p>
            <button onClick={() => { setPage("home"); setTimeout(() => go("contact"), 100); }} style={{ background: "#3b82f6", color: "#fff", border: "none", padding: "12px 28px", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>Demander un devis gratuit</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#fff", color: "#0f172a", fontFamily: "'Inter', -apple-system, sans-serif" }}>

      {/* NAV */}
      <nav style={{ maxWidth: 1100, margin: "0 auto", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 22, fontWeight: 900 }}>Site <span style={{ color: "#3b82f6" }}>Minute</span></div>
        <div style={{ display: "flex", gap: m ? 8 : 20, alignItems: "center" }}>
          {!m && <><span onClick={() => go("metiers")} style={{ fontSize: 14, color: "#64748b", cursor: "pointer" }}>Métiers</span><span onClick={() => go("offres")} style={{ fontSize: 14, color: "#64748b", cursor: "pointer" }}>Offres</span><span onClick={() => go("options")} style={{ fontSize: 14, color: "#64748b", cursor: "pointer" }}>Options</span><span onClick={() => setPage("blog")} style={{ fontSize: 14, color: "#64748b", cursor: "pointer" }}>Blog</span><span onClick={() => setShowRdv(true)} style={{ color: "#64748b", fontSize: 14, cursor: "pointer" }}>RDV</span></>}
          <button onClick={() => m ? setShowRdv(true) : go("contact")} style={{ background: "#3b82f6", color: "#fff", border: "none", padding: "8px 16px", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>{m ? "📅 RDV" : "Devis gratuit"}</button>
        </div>
      </nav>

      {/* HERO */}
      <div style={{ background: "linear-gradient(160deg, #0f172a, #1e293b)", padding: m ? "50px 20px" : "80px 20px 70px", textAlign: "center" }}>
        <div style={{ maxWidth: 750, margin: "0 auto" }}>
          <div style={{ background: "rgba(59,130,246,0.13)", color: "#60a5fa", padding: "6px 16px", borderRadius: 20, fontSize: 13, fontWeight: 600, display: "inline-block", marginBottom: 24 }}>Création de sites web pour professionnels</div>
          <h1 className="hero-t" style={{ fontSize: m ? 32 : 50, fontWeight: 900, color: "#fff", lineHeight: 1.1, margin: "0 0 20px" }}>Vos clients vous cherchent sur Google. <span style={{ color: "#3b82f6" }}>Ils vous trouvent ?</span></h1>
          <p className="hero-s" style={{ fontSize: m ? 16 : 18, color: "#94a3b8", margin: "0 auto 20px", lineHeight: 1.7, maxWidth: 560 }}>Un site professionnel pour votre activité, livré en 48h. Moderne, rapide, visible sur Google. À partir de 399€.</p>
          <div className="hero-j" style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 28 }}>
            {["\uD83D\uDD27 Électricien","\uD83D\uDC85 Prothésiste ongulaire","\uD83C\uDF55 Restaurant","\uD83D\uDD28 Plombier","\uD83D\uDC87 Coiffeur","\uD83C\uDFD7\uFE0F BTP","\uD83D\uDCF8 Photographe","\uD83E\uDDF9 Nettoyage"].map((j,i) => (
              <span key={i} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#94a3b8", padding: "6px 14px", borderRadius: 20, fontSize: 13 }}>{j}</span>
            ))}
          </div>
          <div className="hero-b" style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => go("offres")} className="btn-glow" style={{ background: "#3b82f6", color: "#fff", border: "none", padding: "14px 32px", borderRadius: 10, fontSize: 16, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 20px rgba(59,130,246,0.3)" }}>Voir les offres</button>
            <button onClick={() => go("contact")} style={{ background: "transparent", color: "#94a3b8", border: "1px solid #334155", padding: "14px 32px", borderRadius: 10, fontSize: 16, fontWeight: 600, cursor: "pointer" }}>Devis gratuit {"→"}</button>
          </div>
          <div className="hero-g" style={{ marginTop: 28, display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)", padding: "10px 20px", borderRadius: 30 }}>
            <span style={{ fontSize: 18 }}>{"\u2705"}</span>
            <span style={{ color: "#4ade80", fontSize: 14, fontWeight: 600 }}>Paiement à la livraison — vous ne payez que si le site vous plaît</span>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div style={{ padding: "32px 20px", borderBottom: "1px solid #f1f5f9" }}>
        <div style={{ maxWidth: 750, margin: "0 auto", display: "flex", justifyContent: "center", gap: m ? 20 : 50, flexWrap: "wrap", textAlign: "center" }}>
          {[{ v: "48h", l: "Délai de livraison" }, { v: "399€", l: "À partir de" }, { v: "100%", l: "Adapté mobile" }, { v: "49€/mois", l: "Maintenance tout inclus" }].map((s, i) => (
            <div key={i} className="stat-fx"><div style={{ fontSize: 24, fontWeight: 900, color: "#3b82f6" }}>{s.v}</div><div style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>{s.l}</div></div>
          ))}
        </div>
      </div>

      {/* METIERS */}
      <div id="metiers" style={{ padding: m ? "50px 20px" : "70px 20px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontSize: m ? 26 : 34, fontWeight: 900, textAlign: "center", margin: "0 0 8px" }} className="reveal">Un site adapté à votre métier</h2>
          <p style={{ fontSize: 15, color: "#64748b", textAlign: "center", margin: "0 0 40px" }}>Chaque profession a ses besoins. On s'adapte.</p>
          <div style={{ display: "grid", gridTemplateColumns: m ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: 14 }}>
            {METIERS.map((mt, i) => (
              <div key={i} className="card-fx" style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 14, padding: "24px 16px", textAlign: "center" }}
              >
                <div style={{ fontSize: 32, marginBottom: 10 }}>{mt.icon}</div>
                <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{mt.name}</div>
                <div style={{ fontSize: 12, color: "#64748b", lineHeight: 1.5 }}>{mt.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* OFFRES */}
      <div id="offres" style={{ background: "#f8fafc", padding: m ? "50px 20px" : "70px 20px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <h2 style={{ fontSize: m ? 26 : 34, fontWeight: 900, textAlign: "center", margin: "0 0 8px" }} className="reveal">Des offres claires, sans surprise</h2>
          <p style={{ fontSize: 15, color: "#64748b", textAlign: "center", margin: "0 0 40px" }}>Pas d'abonnement caché. Vous êtes propriétaire de votre site.</p>
          <div style={{ display: "grid", gridTemplateColumns: m ? "1fr" : "repeat(3, 1fr)", gap: 20 }}>
            {PLANS.map((plan, i) => (
              <div key={i} className="plan-fx" style={{ background: plan.highlight ? "#0f172a" : "#fff", border: plan.highlight ? "2px solid #3b82f6" : "1px solid #e2e8f0", borderRadius: 20, padding: 32, position: "relative", display: "flex", flexDirection: "column" }}>
                {plan.highlight && <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: "#3b82f6", color: "#fff", padding: "4px 16px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>Le + choisi</div>}
                <div style={{ fontSize: 14, fontWeight: 600, color: "#3b82f6", marginBottom: 6 }}>{plan.name}</div>
                <div style={{ fontSize: 40, fontWeight: 900, color: plan.highlight ? "#fff" : "#0f172a", marginBottom: 4 }}>{plan.price ? <>{plan.price}<span style={{ fontSize: 18, fontWeight: 500 }}>{"€"}</span></> : "Sur devis"}</div>
                <p style={{ fontSize: 14, color: plan.highlight ? "#94a3b8" : "#64748b", margin: "0 0 20px" }}>{plan.desc}</p>
                <div style={{ flex: 1 }}>
                  {plan.features.map((f, j) => (
                    <div key={j} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                      <div style={{ width: 18, height: 18, borderRadius: "50%", background: plan.highlight ? "rgba(59,130,246,0.15)" : "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#3b82f6", flexShrink: 0 }}>{"✓"}</div>
                      <span style={{ fontSize: 14, color: plan.highlight ? "#cbd5e1" : "#475569" }}>{f}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => go("contact")} style={{ width: "100%", padding: 14, marginTop: 20, background: plan.highlight ? "#3b82f6" : "transparent", border: plan.highlight ? "none" : "1px solid #e2e8f0", borderRadius: 10, color: plan.highlight ? "#fff" : "#0f172a", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>{plan.price ? "Choisir cette offre" : "Demander un devis"}</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MAINTENANCE */}
      <div style={{ padding: "40px 20px" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap", justifyContent: "center" }}>
          <div style={{ flex: 1, minWidth: 250 }}>
            <h3 style={{ fontSize: 22, fontWeight: 800, margin: "0 0 8px" }}>Maintenance tout inclus — 49{"€"}/mois</h3>
            <p style={{ fontSize: 14, color: "#64748b", margin: 0, lineHeight: 1.6 }}>Hébergement, nom de domaine, mises à jour, Google Analytics, support email. Concentrez-vous sur votre métier.</p>
          </div>
          <div style={{ background: "#0f172a", color: "#fff", padding: "20px 32px", borderRadius: 14, textAlign: "center" }}>
            <div style={{ fontSize: 36, fontWeight: 900 }}>49{"€"}</div>
            <div style={{ fontSize: 13, color: "#94a3b8" }}>/ mois {"·"} sans engagement</div>
          </div>
        </div>
      </div>

      {/* OPTIONS */}
      <div id="options" style={{ background: "#f8fafc", padding: m ? "50px 20px" : "70px 20px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2 style={{ fontSize: m ? 26 : 34, fontWeight: 900, textAlign: "center", margin: "0 0 8px" }} className="reveal">Options à la carte</h2>
          <p style={{ fontSize: 15, color: "#64748b", textAlign: "center", margin: "0 0 40px" }}>Ajoutez uniquement ce dont vous avez besoin</p>
          {OPTIONS.map((cat, i) => (
            <div key={i}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#3b82f6", textTransform: "uppercase", letterSpacing: 2, margin: "28px 0 12px" }}>{cat.category}</div>
              {cat.items.map((item, j) => {
                const s = sel.find(o => o.name === item.name);
                return (
                  <div key={j} onClick={() => toggle(item.name, item.price)} className="opt-fx" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 16px", borderRadius: 10, background: s ? "#eff6ff" : "#fff", border: s ? "1px solid #3b82f6" : "1px solid #f1f5f9", marginBottom: 6, cursor: "pointer" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 20, height: 20, borderRadius: 4, border: s ? "none" : "2px solid #d1d5db", background: s ? "#3b82f6" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 12 }}>{s ? "✓" : ""}</div>
                      <span style={{ fontSize: 14, fontWeight: s ? 600 : 400 }}>{item.name}</span>
                    </div>
                    <span style={{ fontSize: 14, fontWeight: 700, color: "#3b82f6" }}>+{item.price}{"€"}</span>
                  </div>
                );
              })}
            </div>
          ))}
          {sel.length > 0 && (
            <div style={{ background: "#0f172a", borderRadius: 16, padding: 24, marginTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
              <div><div style={{ fontSize: 13, color: "#94a3b8" }}>{sel.length} option{sel.length > 1 ? "s" : ""}</div><div style={{ fontSize: 28, fontWeight: 900, color: "#fff" }}>+{total}{"€"}</div></div>
              <button onClick={() => go("contact")} style={{ background: "#3b82f6", color: "#fff", border: "none", padding: "12px 24px", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Demander un devis avec ces options</button>
            </div>
          )}
        </div>
      </div>

      {/* COMMENT CA MARCHE */}
      <div style={{ padding: m ? "50px 20px" : "70px 20px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2 style={{ fontSize: m ? 26 : 34, fontWeight: 900, textAlign: "center", margin: "0 0 8px" }} className="reveal">Simple comme bonjour</h2>
          <p style={{ fontSize: 15, color: "#64748b", textAlign: "center", margin: "0 0 40px" }}>Vous n'avez rien de technique à faire</p>
          <div style={{ display: "flex", gap: 32, flexWrap: "wrap", justifyContent: "center" }}>
            {[{ n: "1", t: "Vous nous appelez", d: "Expliquez votre activité en 5 minutes. Vos services, vos tarifs. C'est tout." }, { n: "2", t: "On crée votre site", d: "Design, textes, photos. On s'occupe de tout. Vous validez avant mise en ligne." }, { n: "3", t: "Vos clients vous trouvent", d: "Votre site est en ligne, visible sur Google. Vous recevez des appels et des demandes." }].map((s, i) => (
              <div key={i} className="reveal" style={{ flex: "1 1 200px", maxWidth: 240, textAlign: "center" }}>
                <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#0f172a", color: "#3b82f6", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: 22, fontWeight: 900 }}>{s.n}</div>
                <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>{s.t}</div>
                <div style={{ fontSize: 14, color: "#64748b", lineHeight: 1.6 }}>{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TEMOIGNAGES */}
      <div style={{ background: "#f8fafc", padding: m ? "50px 20px" : "70px 20px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2 style={{ fontSize: m ? 26 : 34, fontWeight: 900, textAlign: "center", margin: "0 0 8px" }} className="reveal">Ils nous font confiance</h2>
          <p style={{ fontSize: 15, color: "#64748b", textAlign: "center", margin: "0 0 40px" }}>Des professionnels comme vous</p>
          <div style={{ display: "grid", gridTemplateColumns: m ? "1fr" : "repeat(2, 1fr)", gap: 16 }}>
            {TEMOIGNAGES.map((t, i) => (
              <div key={i} className="temo-fx" style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 14, padding: 24 }}>
                <div style={{ color: "#f59e0b", fontSize: 16, marginBottom: 10 }}>{t.stars}</div>
                <div style={{ fontSize: 14, color: "#475569", lineHeight: 1.6, marginBottom: 12, fontStyle: "italic" }}>"{t.text}"</div>
                <div style={{ fontSize: 13, fontWeight: 700 }}>{t.author}</div>
                <div style={{ fontSize: 12, color: "#64748b" }}>{t.job}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BLOG */}
      <div id="blog" style={{ padding: m ? "50px 20px" : "70px 20px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2 style={{ fontSize: m ? 26 : 34, fontWeight: 900, textAlign: "center", margin: "0 0 8px" }} className="reveal">Nos conseils pour votre activité</h2>
          <p style={{ fontSize: 15, color: "#64748b", textAlign: "center", margin: "0 0 40px" }}>Guides pratiques pour développer votre présence en ligne</p>
          <div style={{ display: "grid", gridTemplateColumns: m ? "1fr" : "repeat(2, 1fr)", gap: 16 }}>
            {BLOG.map((b, i) => (
              <div key={i} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 14, padding: 24, ...(i === 0 && !m ? { gridColumn: "1 / -1" } : {}) }}>
                <span style={{ background: b.bg, color: b.color, padding: "3px 10px", borderRadius: 6, fontSize: 11, fontWeight: 600 }}>{b.tag}</span>
                <h3 style={{ fontSize: i === 0 ? 20 : 17, fontWeight: 800, margin: "12px 0 8px" }}>{b.title}</h3>
                <p style={{ fontSize: i === 0 ? 14 : 13, color: "#64748b", lineHeight: 1.6, margin: 0 }}>{b.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* GARANTIE */}
      <div style={{ padding: "40px 20px" }}>
        <div className="guarantee-fx" style={{ maxWidth: 700, margin: "0 auto", background: "linear-gradient(135deg, #065f46, #047857)", borderRadius: 20, padding: 36, display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap", justifyContent: "center" }}>
          <div style={{ fontSize: 48 }}>{"\uD83D\uDEE1\uFE0F"}</div>
          <div style={{ flex: 1, minWidth: 250 }}>
            <h3 style={{ fontSize: 22, fontWeight: 800, color: "#fff", margin: "0 0 8px" }}>Satisfait ou vous ne payez pas</h3>
            <p style={{ fontSize: 15, color: "#bbf7d0", margin: 0, lineHeight: 1.6 }}>On crée votre site, vous le validez. Si le résultat ne vous convient pas, vous ne payez rien. Zéro risque, zéro engagement.</p>
          </div>
        </div>
      </div>

      {/* CONTACT */}
      <div id="contact" style={{ background: "#0f172a", padding: m ? "50px 20px" : "70px 20px" }}>
        <div style={{ maxWidth: 550, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: m ? 26 : 34, fontWeight: 900, color: "#fff", margin: "0 0 8px" }} className="reveal">Demandez votre devis gratuit</h2>
          <p style={{ fontSize: 15, color: "#94a3b8", margin: "0 0 20px" }}>Réponse en moins de 24h. Sans engagement.</p>
          <button onClick={() => setShowRdv(true)} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)", padding: "12px 24px", borderRadius: 30, color: "#4ade80", fontSize: 15, fontWeight: 600, cursor: "pointer", marginBottom: 24 }}>📅 Ou prenez directement un RDV de 15 min</button>
          <div style={{ background: "#1e293b", borderRadius: 20, padding: m ? 24 : 32, textAlign: "left" }}>
            {[{ l: "Votre nom ou entreprise", p: "Ex: Boulangerie Martin, Électricité Dupont..." }, { l: "Email ou téléphone", p: "email@exemple.com ou 06 12 34 56 78" }, { l: "Votre métier", p: "Ex: Électricien, restaurant, coiffeur..." }].map((f, i) => (
              <div key={i} style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 13, color: "#94a3b8", display: "block", marginBottom: 6 }}>{f.l}</label>
                <input type="text" placeholder={f.p} style={{ width: "100%", padding: 14, background: "#0f172a", border: "1px solid #334155", borderRadius: 10, color: "#fff", fontSize: 15, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }} />
              </div>
            ))}
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 13, color: "#94a3b8", display: "block", marginBottom: 6 }}>Formule souhaitée</label>
              <select style={{ width: "100%", padding: 14, background: "#0f172a", border: "1px solid #334155", borderRadius: 10, color: "#fff", fontSize: 15, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }}>
                <option>Essentiel — 399{"€"}</option>
                <option>Sur-Mesure — 699{"€"}</option>
                <option>Pro — Sur devis</option>
                <option>Je ne sais pas encore</option>
              </select>
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 13, color: "#94a3b8", display: "block", marginBottom: 6 }}>Décrivez votre projet</label>
              <textarea placeholder="Ce que vous aimeriez sur votre site..." style={{ width: "100%", padding: 14, background: "#0f172a", border: "1px solid #334155", borderRadius: 10, color: "#fff", fontSize: 15, outline: "none", boxSizing: "border-box", fontFamily: "inherit", minHeight: 100, resize: "vertical" }} />
            </div>
            {sel.length > 0 && (
              <div style={{ background: "#0f172a", borderRadius: 10, padding: 14, marginBottom: 16, border: "1px solid #334155" }}>
                <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 8 }}>Options sélectionnées :</div>
                {sel.map((o, i) => (<div key={i} style={{ fontSize: 13, color: "#cbd5e1", marginBottom: 4 }}>{"✓"} {o.name} (+{o.price}{"€"})</div>))}
                <div style={{ fontSize: 14, fontWeight: 700, color: "#3b82f6", marginTop: 8 }}>Total options : +{total}{"€"}</div>
              </div>
            )}
            <button onClick={async () => {
              const form = document.querySelectorAll('#contact input, #contact select, #contact textarea');
              const nom = form[0]?.value;
              const contact = form[1]?.value;
              const metier = form[2]?.value;
              const formule = form[3]?.value;
              const projet = form[4]?.value;
              if (!nom || !contact) { alert("Merci de remplir votre nom et contact."); return; }
              try {
                const resp = await fetch("/api/contact", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ nom, contact, metier, formule, projet, options: sel })
                });
                if (resp.ok) {
                  alert("Merci " + nom + " ! Nous vous recontactons dans les 24h.");
                  form.forEach(f => f.value = "");
                  setSel([]);
                } else { alert("Erreur, réessayez ou contactez-nous directement."); }
              } catch(e) { alert("Erreur réseau, réessayez."); }
            }} className="btn-glow" style={{ width: "100%", padding: 16, background: "#3b82f6", border: "none", borderRadius: 10, color: "#fff", fontSize: 16, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 20px rgba(59,130,246,0.3)" }}>Envoyer ma demande</button>
          </div>
        </div>
      </div>


      {/* A PROPOS */}
      <div style={{ padding: "40px 20px", borderTop: "1px solid #f1f5f9" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#3b82f6", textTransform: "uppercase", letterSpacing: 2, marginBottom: 16 }}>{"À"} propos</div>
          <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.8, margin: 0 }}>
            Je m{"’"}appelle Rapha{"ë"}l, ing{"é"}nieur informaticien de m{"é"}tier. Passionn{"é"} de bricolage et titulaire d{"’"}un CAP {"É"}lectricit{"é"} repass{"é"} en candidat libre, j{"’"}ai retrouss{"é"} mes manches sur pas mal de chantiers. Cette exp{"é"}rience sur le terrain m{"’"}a permis de comprendre vos r{"é"}alit{"é"}s, vos contraintes de temps et vos v{"é"}ritables enjeux au quotidien. Aujourd{"’"}hui, je mets mes comp{"é"}tences d{"’"}ing{"é"}nieur au service des artisans, ind{"é"}pendants et TPE pour cr{"é"}er des sites vitrines simples, efficaces et livr{"é"}s rapidement {"—"} du travail propre et carr{"é"}, sans jargon technique.
          </p>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ padding: "24px 20px", borderTop: "1px solid #f1f5f9", textAlign: "center" }}>
        <div style={{ fontSize: 18, fontWeight: 900, marginBottom: 8 }}>Site <span style={{ color: "#3b82f6" }}>Minute</span></div>
        <div style={{ marginBottom: 10 }}>
          <button onClick={() => setCgv(true)} style={{ background: "none", border: "none", color: "#94a3b8", fontSize: 12, cursor: "pointer", textDecoration: "underline", marginRight: 16, fontFamily: "inherit" }}>Mentions légales</button>
          <button onClick={() => setCgv(true)} style={{ background: "none", border: "none", color: "#94a3b8", fontSize: 12, cursor: "pointer", textDecoration: "underline", fontFamily: "inherit" }}>CGV</button>
        </div>
        <p style={{ fontSize: 12, color: "#94a3b8", margin: 0 }}>{"©"} {new Date().getFullYear()} Site Minute {"—"} Création de sites web pour artisans, commerces et PME</p>
      </div>

      {/* CHATBOT */}
      <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 999 }}>
        {chatOpen && (
          <div style={{ width: m ? "calc(100vw - 48px)" : 380, height: 480, background: "#0f172a", borderRadius: 20, boxShadow: "0 20px 60px rgba(0,0,0,0.3)", display: "flex", flexDirection: "column", overflow: "hidden", marginBottom: 12 }}>
            <div style={{ background: "#1e293b", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#22c55e" }} />
                <span style={{ color: "#fff", fontSize: 14, fontWeight: 700 }}>Site Minute - Assistant</span>
              </div>
              <button onClick={() => setChatOpen(false)} style={{ background: "none", border: "none", color: "#94a3b8", fontSize: 18, cursor: "pointer" }}>✕</button>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
              {chatMessages.map((msg, i) => (
                <div key={i} style={{ alignSelf: msg.role === "user" ? "flex-end" : "flex-start", maxWidth: "80%" }}>
                  <div style={{ background: msg.role === "user" ? "#3b82f6" : "#1e293b", color: "#fff", padding: "10px 14px", borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px", fontSize: 13, lineHeight: 1.5 }}>{msg.content}</div>
                </div>
              ))}
              {chatLoading && (
                <div style={{ alignSelf: "flex-start" }}>
                  <div style={{ background: "#1e293b", color: "#94a3b8", padding: "10px 14px", borderRadius: "16px 16px 16px 4px", fontSize: 13 }}>...</div>
                </div>
              )}
            </div>
            <div onClick={() => { setChatOpen(false); go("options"); }} style={{ padding: "8px 14px", background: "linear-gradient(135deg, #1e3a5f, #1e293b)", borderTop: "1px solid #334155", cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 14 }}>🤖</span>
              <span style={{ fontSize: 11, color: "#60a5fa", lineHeight: 1.4 }}>Ce chatbot vous plaît ? <strong>Ajoutez-le à votre site pour 99€.</strong></span>
              <span style={{ fontSize: 11, color: "#3b82f6", marginLeft: "auto" }}>→</span>
            </div>
            <div style={{ padding: 12, borderTop: "1px solid #334155", display: "flex", gap: 8 }}>
              <input value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendChat()} placeholder="Votre question..." style={{ flex: 1, padding: "10px 14px", background: "#1e293b", border: "1px solid #334155", borderRadius: 10, color: "#fff", fontSize: 14, outline: "none", fontFamily: "inherit" }} />
              <button onClick={sendChat} disabled={chatLoading} style={{ background: "#3b82f6", color: "#fff", border: "none", borderRadius: 10, padding: "10px 16px", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>→</button>
            </div>
          </div>
        )}
        <button onClick={() => setChatOpen(!chatOpen)} style={{ width: 60, height: 60, borderRadius: "50%", background: "linear-gradient(135deg, #3b82f6, #2563eb)", color: "#fff", border: "none", cursor: "pointer", boxShadow: "0 8px 30px rgba(59,130,246,0.35)", fontSize: 24, display: "flex", alignItems: "center", justifyContent: "center", marginLeft: "auto" }}>{chatOpen ? "✕" : "💬"}</button>
      </div>

      {/* RDV MODAL */}
      {showRdv && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.7)", zIndex: 1001, display: "flex", justifyContent: "center", alignItems: "center", padding: 16 }} onClick={() => setShowRdv(false)}>
          <div style={{ background: "#fff", borderRadius: 20, width: m ? "100%" : 700, maxHeight: "90vh", overflow: "hidden", display: "flex", flexDirection: "column" }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 24px", borderBottom: "1px solid #f1f5f9" }}>
              <div>
                <div style={{ fontSize: 18, fontWeight: 800 }}>Site <span style={{ color: "#3b82f6" }}>Minute</span></div>
                <div style={{ fontSize: 13, color: "#64748b" }}>Réservez un appel gratuit de 15 min</div>
              </div>
              <button onClick={() => setShowRdv(false)} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#94a3b8" }}>✕</button>
            </div>
            <div style={{ flex: 1, overflow: "auto" }}>
              <iframe src="https://cal.com/sitemute.fr/15min?embed=true&theme=light" style={{ width: "100%", height: 600, border: "none" }} />
            </div>
          </div>
        </div>
      )}

      {/* CGV MODAL */}
      {cgv && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.6)", zIndex: 1000, display: "flex", justifyContent: "center", alignItems: "center", padding: 16 }} onClick={() => setCgv(false)}>
          <div style={{ background: "#fff", borderRadius: 20, padding: 36, maxWidth: 650, maxHeight: "80vh", overflowY: "auto", fontSize: 13, lineHeight: 1.8 }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h2 style={{ fontSize: 22, fontWeight: 900, margin: 0 }}>Mentions légales & CGV</h2>
              <button onClick={() => setCgv(false)} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#94a3b8" }}>{"✕"}</button>
            </div>
            <h3 style={{ color: "#3b82f6", fontSize: 15, marginTop: 16, marginBottom: 6 }}>1. Éditeur du site</h3>
            <p>Site Minute {"—"} Service de création de sites web professionnels. Hébergement : Vercel Inc., San Francisco, CA, USA.</p>
            <h3 style={{ color: "#3b82f6", fontSize: 15, marginTop: 16, marginBottom: 6 }}>2. Tarifs et paiement</h3>
            <p>Les prix sont en euros TTC. Le paiement s'effectue <strong>à la livraison du site</strong>, après validation par le client. Aucun acompte n'est demandé.</p>
            <h3 style={{ color: "#3b82f6", fontSize: 15, marginTop: 16, marginBottom: 6 }}>3. Livraison et validation</h3>
            <p>Le client reçoit une preview pour validation. 2 allers-retours de modifications inclus dans le prix.</p>
            <h3 style={{ color: "#3b82f6", fontSize: 15, marginTop: 16, marginBottom: 6 }}>4. Maintenance</h3>
            <p>L'abonnement maintenance à 49€/mois est optionnel et sans engagement. Il comprend hébergement, nom de domaine, mises à jour, analytics et support.</p>
            <h3 style={{ color: "#3b82f6", fontSize: 15, marginTop: 16, marginBottom: 6 }}>5. Propriété du site</h3>
            <p>Le client est propriétaire de son site dès le paiement. En cas de résiliation de la maintenance, le client récupère tous les fichiers.</p>
            <h3 style={{ color: "#3b82f6", fontSize: 15, marginTop: 16, marginBottom: 6 }}>6. Données personnelles</h3>
            <p>Les informations du formulaire sont utilisées uniquement pour répondre à la demande. Conformément au RGPD, vous pouvez demander la suppression de vos données à tout moment.</p>
            <h3 style={{ color: "#3b82f6", fontSize: 15, marginTop: 16, marginBottom: 6 }}>7. Droit applicable</h3>
            <p>Droit français. Tribunaux compétents de Marseille.</p>
          </div>
        </div>
      )}
    </div>
  );
}
