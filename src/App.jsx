import { useState, useEffect } from "react";

const PLANS = [
  { name: "Essentiel", price: "399", desc: "Votre vitrine en ligne en 48h", features: ["Template professionnel", "3 \u00E0 5 pages", "Adapt\u00E9 mobile & tablette", "Formulaire de contact", "Livr\u00E9 en 48h"], highlight: false },
  { name: "Sur-Mesure", price: "699", desc: "Un site unique \u00E0 votre image", features: ["Design 100% personnalis\u00E9", "Jusqu'\u00E0 10 pages", "R\u00E9f\u00E9rencement Google (SEO)", "Google Analytics", "Formulaire avanc\u00E9", "Livr\u00E9 en 5 jours"], highlight: true },
  { name: "Pro", price: null, desc: "Solution compl\u00E8te sur mesure", features: ["Base de donn\u00E9es clients", "R\u00E9servation en ligne", "Espace admin", "Fonctionnalit\u00E9s avanc\u00E9es", "Accompagnement complet"], highlight: false }
];

const OPTIONS = [
  { category: "Essentiels \u2014 19\u20AC", items: [
    { name: "\uD83D\uDCCD Int\u00E9gration Google Maps", price: 19 },
    { name: "\uD83D\uDCF1 Bouton WhatsApp / Appel direct", price: 19 },
    { name: "\uD83D\uDCF2 Liens r\u00E9seaux sociaux", price: 19 },
    { name: "\uD83C\uDFAC Vid\u00E9o de pr\u00E9sentation", price: 19 },
    { name: "\uD83C\uDF6A Bandeau cookies RGPD", price: 19 },
  ]},
  { category: "Contenu \u2014 39\u20AC", items: [
    { name: "\uD83D\uDCF7 Galerie photos / carrousel", price: 39 },
    { name: "\u2B50 Page avis clients", price: 39 },
    { name: "\uD83C\uDF7D\uFE0F Page menu / carte restaurant", price: 39 },
    { name: "\uD83D\uDCDD Formulaire de contact avanc\u00E9", price: 39 },
  ]},
  { category: "Avanc\u00E9 \u2014 69\u20AC", items: [
    { name: "\uD83D\uDCF0 Blog int\u00E9gr\u00E9 (5 articles SEO)", price: 69 },
    { name: "\uD83D\uDCCB Formulaire devis en ligne", price: 69 },
    { name: "\uD83D\uDD0D SEO avanc\u00E9 (Search Console, sitemap)", price: 69 },
  ]},
  { category: "Premium \u2014 99\u20AC", items: [
    { name: "\uD83E\uDD16 Chatbot IA int\u00E9gr\u00E9", price: 99 },
    { name: "\uD83C\uDF0D Multi-langue (2 langues)", price: 99 },
    { name: "\uD83D\uDCC5 Syst\u00E8me de r\u00E9servation simple", price: 99 },
  ]}
];

const METIERS = [
  { icon: "\uD83D\uDD27", name: "Artisan / BTP", desc: "\u00C9lectricien, plombier, peintre, ma\u00E7on. R\u00E9alisations et demandes de devis." },
  { icon: "\uD83D\uDC85", name: "Beaut\u00E9 / Bien-\u00EAtre", desc: "Proth\u00E9siste ongulaire, esth\u00E9ticienne, coiffeur. Galerie, tarifs, RDV." },
  { icon: "\uD83C\uDF7D\uFE0F", name: "Restaurant / Traiteur", desc: "Menu en ligne, photos, r\u00E9servation, lien Uber Eats." },
  { icon: "\uD83C\uDFCB\uFE0F", name: "Sport / Coaching", desc: "Coach sportif, salle, yoga. Planning, tarifs, inscription." },
  { icon: "\uD83D\uDCF8", name: "Photographe", desc: "Portfolio visuel, galeries clients, r\u00E9servation." },
  { icon: "\uD83E\uDDF9", name: "Services / Nettoyage", desc: "Nettoyage, conciergerie. Zones d'intervention, devis." },
  { icon: "\u2696\uFE0F", name: "Professions lib\u00E9rales", desc: "Avocat, comptable, consultant. Site sobre et pro." },
  { icon: "\uD83C\uDFE0", name: "Immobilier", desc: "Agent, diagnostiqueur. Catalogue de biens, SEO local." }
];

const BLOG = [
  { title: "Pourquoi 72% des clients ne vous appellent jamais sans site web", tag: "Guide", color: "#3b82f6", bg: "#eff6ff", content: "En 2026, le premier r\u00E9flexe d'un client qui cherche un artisan c'est Google. Si vous n'avez pas de site, vous \u00EAtes invisible pour 3 clients potentiels sur 4. Un site vitrine \u00E0 399\u20AC vous rend visible 24h/24." },
  { title: "Comment appara\u00EEtre en premier sur Google dans votre ville", tag: "SEO local", color: "#d97706", bg: "#fef3c7", content: "La combinaison site web optimis\u00E9 + fiche Google Business vous place devant vos concurrents. Votre ville dans le titre, vos quartiers dans le contenu, votre adresse dans le pied de page." },
  { title: "Comment Marie a tripl\u00E9 ses rendez-vous gr\u00E2ce \u00E0 son site", tag: "T\u00E9moignage", color: "#e91e63", bg: "#fce4ec", content: "Marie est proth\u00E9siste ongulaire. Avant son site : 8 clientes/semaine. Apr\u00E8s : 25. Son secret : galerie photos avant/apr\u00E8s + bouton WhatsApp + tarifs en ligne." },
  { title: "Site web vs page Facebook : pourquoi les r\u00E9seaux ne suffisent pas", tag: "Comparatif", color: "#2e7d32", bg: "#e8f5e9", content: "Vous ne contr\u00F4lez ni l'algorithme, ni la visibilit\u00E9. Votre page peut \u00EAtre supprim\u00E9e. Un site vous appartient, appara\u00EEt sur Google, et donne une image professionnelle." },
  { title: "5 erreurs qui font fuir les clients de votre site", tag: "Pratique", color: "#7c3aed", bg: "#f3e8ff", content: "Site lent = 53% de d\u00E9parts. Pas de t\u00E9l\u00E9phone visible = 44% partent. Pas mobile = 60% de visiteurs perdus. Pas de photos = pas de confiance." }
];

const TEMOIGNAGES = [
  { stars: "\u2605\u2605\u2605\u2605\u2605", text: "J'ai re\u00E7u mon site en 2 jours. Depuis, je re\u00E7ois 3-4 demandes de devis par semaine. Avant j'avais rien.", author: "Marc D.", job: "\u00C9lectricien \u2014 Marseille" },
  { stars: "\u2605\u2605\u2605\u2605\u2605", text: "Mes clientes me trouvent sur Google maintenant. La galerie photos fait tout le travail. J'ai doubl\u00E9 ma client\u00E8le en 3 mois.", author: "Sarah L.", job: "Proth\u00E9siste ongulaire \u2014 Aix-en-Provence" },
  { stars: "\u2605\u2605\u2605\u2605\u2605", text: "Le menu en ligne et Google Maps ont chang\u00E9 la donne. Les gens nous trouvent, voient la carte, et viennent.", author: "Paolo R.", job: "Restaurant italien \u2014 Lyon" },
  { stars: "\u2605\u2605\u2605\u2605\u2605", text: "J'avais un devis \u00E0 3 500\u20AC chez une agence. Ici j'ai pay\u00E9 699\u20AC et le r\u00E9sultat est aussi bien. Je recommande.", author: "Karim B.", job: "Plombier \u2014 Montpellier" }
];

export default function App() {
  const [m, setM] = useState(false);
  const [sel, setSel] = useState([]);
  const [cgv, setCgv] = useState(false);

  useEffect(() => { const c = () => setM(window.innerWidth < 768); c(); window.addEventListener("resize", c); return () => window.removeEventListener("resize", c); }, []);

  const toggle = (name, price) => setSel(p => p.find(o => o.name === name) ? p.filter(o => o.name !== name) : [...p, { name, price }]);
  const total = sel.reduce((s, o) => s + o.price, 0);
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div style={{ minHeight: "100vh", background: "#fff", color: "#0f172a", fontFamily: "'Inter', -apple-system, sans-serif" }}>

      {/* NAV */}
      <nav style={{ maxWidth: 1100, margin: "0 auto", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 22, fontWeight: 900 }}>Site<span style={{ color: "#3b82f6" }}>Minute</span></div>
        <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
          {!m && <><span onClick={() => go("metiers")} style={{ fontSize: 14, color: "#64748b", cursor: "pointer" }}>M\u00E9tiers</span><span onClick={() => go("offres")} style={{ fontSize: 14, color: "#64748b", cursor: "pointer" }}>Offres</span><span onClick={() => go("options")} style={{ fontSize: 14, color: "#64748b", cursor: "pointer" }}>Options</span><span onClick={() => go("blog")} style={{ fontSize: 14, color: "#64748b", cursor: "pointer" }}>Blog</span></>}
          <button onClick={() => go("contact")} style={{ background: "#3b82f6", color: "#fff", border: "none", padding: "8px 20px", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Devis gratuit</button>
        </div>
      </nav>

      {/* HERO */}
      <div style={{ background: "linear-gradient(160deg, #0f172a, #1e293b)", padding: m ? "50px 20px" : "80px 20px 70px", textAlign: "center" }}>
        <div style={{ maxWidth: 750, margin: "0 auto" }}>
          <div style={{ background: "rgba(59,130,246,0.13)", color: "#60a5fa", padding: "6px 16px", borderRadius: 20, fontSize: 13, fontWeight: 600, display: "inline-block", marginBottom: 24 }}>Cr\u00E9ation de sites web pour professionnels</div>
          <h1 style={{ fontSize: m ? 32 : 50, fontWeight: 900, color: "#fff", lineHeight: 1.1, margin: "0 0 20px" }}>Vos clients vous cherchent sur Google. <span style={{ color: "#3b82f6" }}>Ils vous trouvent ?</span></h1>
          <p style={{ fontSize: m ? 16 : 18, color: "#94a3b8", margin: "0 auto 20px", lineHeight: 1.7, maxWidth: 560 }}>Un site professionnel pour votre activit\u00E9, livr\u00E9 en 48h. Moderne, rapide, visible sur Google. \u00C0 partir de 399\u20AC.</p>
          <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 28 }}>
            {["\uD83D\uDD27 \u00C9lectricien","\uD83D\uDC85 Proth\u00E9siste ongulaire","\uD83C\uDF55 Restaurant","\uD83D\uDD28 Plombier","\uD83D\uDC87 Coiffeur","\uD83C\uDFD7\uFE0F BTP","\uD83D\uDCF8 Photographe","\uD83E\uDDF9 Nettoyage"].map((j,i) => (
              <span key={i} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#94a3b8", padding: "6px 14px", borderRadius: 20, fontSize: 13 }}>{j}</span>
            ))}
          </div>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => go("offres")} style={{ background: "#3b82f6", color: "#fff", border: "none", padding: "14px 32px", borderRadius: 10, fontSize: 16, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 20px rgba(59,130,246,0.3)" }}>Voir les offres</button>
            <button onClick={() => go("contact")} style={{ background: "transparent", color: "#94a3b8", border: "1px solid #334155", padding: "14px 32px", borderRadius: 10, fontSize: 16, fontWeight: 600, cursor: "pointer" }}>Devis gratuit {"\u2192"}</button>
          </div>
          <div style={{ marginTop: 28, display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)", padding: "10px 20px", borderRadius: 30 }}>
            <span style={{ fontSize: 18 }}>{"\u2705"}</span>
            <span style={{ color: "#4ade80", fontSize: 14, fontWeight: 600 }}>Paiement \u00E0 la livraison \u2014 vous ne payez que si le site vous pla\u00EEt</span>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div style={{ padding: "32px 20px", borderBottom: "1px solid #f1f5f9" }}>
        <div style={{ maxWidth: 750, margin: "0 auto", display: "flex", justifyContent: "center", gap: m ? 20 : 50, flexWrap: "wrap", textAlign: "center" }}>
          {[{ v: "48h", l: "D\u00E9lai de livraison" }, { v: "399\u20AC", l: "\u00C0 partir de" }, { v: "100%", l: "Adapt\u00E9 mobile" }, { v: "49\u20AC/mois", l: "Maintenance tout inclus" }].map((s, i) => (
            <div key={i}><div style={{ fontSize: 24, fontWeight: 900, color: "#3b82f6" }}>{s.v}</div><div style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>{s.l}</div></div>
          ))}
        </div>
      </div>

      {/* METIERS */}
      <div id="metiers" style={{ padding: m ? "50px 20px" : "70px 20px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontSize: m ? 26 : 34, fontWeight: 900, textAlign: "center", margin: "0 0 8px" }}>Un site adapt\u00E9 \u00E0 votre m\u00E9tier</h2>
          <p style={{ fontSize: 15, color: "#64748b", textAlign: "center", margin: "0 0 40px" }}>Chaque profession a ses besoins. On s'adapte.</p>
          <div style={{ display: "grid", gridTemplateColumns: m ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: 14 }}>
            {METIERS.map((mt, i) => (
              <div key={i} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 14, padding: "24px 16px", textAlign: "center", transition: "all 0.2s" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#3b82f6"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.transform = "translateY(0)"; }}
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
          <h2 style={{ fontSize: m ? 26 : 34, fontWeight: 900, textAlign: "center", margin: "0 0 8px" }}>Des offres claires, sans surprise</h2>
          <p style={{ fontSize: 15, color: "#64748b", textAlign: "center", margin: "0 0 40px" }}>Pas d'abonnement cach\u00E9. Vous \u00EAtes propri\u00E9taire de votre site.</p>
          <div style={{ display: "grid", gridTemplateColumns: m ? "1fr" : "repeat(3, 1fr)", gap: 20 }}>
            {PLANS.map((plan, i) => (
              <div key={i} style={{ background: plan.highlight ? "#0f172a" : "#fff", border: plan.highlight ? "2px solid #3b82f6" : "1px solid #e2e8f0", borderRadius: 20, padding: 32, position: "relative", display: "flex", flexDirection: "column" }}>
                {plan.highlight && <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: "#3b82f6", color: "#fff", padding: "4px 16px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>Le + choisi</div>}
                <div style={{ fontSize: 14, fontWeight: 600, color: "#3b82f6", marginBottom: 6 }}>{plan.name}</div>
                <div style={{ fontSize: 40, fontWeight: 900, color: plan.highlight ? "#fff" : "#0f172a", marginBottom: 4 }}>{plan.price ? <>{plan.price}<span style={{ fontSize: 18, fontWeight: 500 }}>{"\u20AC"}</span></> : "Sur devis"}</div>
                <p style={{ fontSize: 14, color: plan.highlight ? "#94a3b8" : "#64748b", margin: "0 0 20px" }}>{plan.desc}</p>
                <div style={{ flex: 1 }}>
                  {plan.features.map((f, j) => (
                    <div key={j} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                      <div style={{ width: 18, height: 18, borderRadius: "50%", background: plan.highlight ? "rgba(59,130,246,0.15)" : "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#3b82f6", flexShrink: 0 }}>{"\u2713"}</div>
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
            <h3 style={{ fontSize: 22, fontWeight: 800, margin: "0 0 8px" }}>Maintenance tout inclus \u2014 49{"\u20AC"}/mois</h3>
            <p style={{ fontSize: 14, color: "#64748b", margin: 0, lineHeight: 1.6 }}>H\u00E9bergement, nom de domaine, mises \u00E0 jour, Google Analytics, support email. Concentrez-vous sur votre m\u00E9tier.</p>
          </div>
          <div style={{ background: "#0f172a", color: "#fff", padding: "20px 32px", borderRadius: 14, textAlign: "center" }}>
            <div style={{ fontSize: 36, fontWeight: 900 }}>49{"\u20AC"}</div>
            <div style={{ fontSize: 13, color: "#94a3b8" }}>/ mois {"\u00B7"} sans engagement</div>
          </div>
        </div>
      </div>

      {/* OPTIONS */}
      <div id="options" style={{ background: "#f8fafc", padding: m ? "50px 20px" : "70px 20px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2 style={{ fontSize: m ? 26 : 34, fontWeight: 900, textAlign: "center", margin: "0 0 8px" }}>Options \u00E0 la carte</h2>
          <p style={{ fontSize: 15, color: "#64748b", textAlign: "center", margin: "0 0 40px" }}>Ajoutez uniquement ce dont vous avez besoin</p>
          {OPTIONS.map((cat, i) => (
            <div key={i}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#3b82f6", textTransform: "uppercase", letterSpacing: 2, margin: "28px 0 12px" }}>{cat.category}</div>
              {cat.items.map((item, j) => {
                const s = sel.find(o => o.name === item.name);
                return (
                  <div key={j} onClick={() => toggle(item.name, item.price)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 16px", borderRadius: 10, background: s ? "#eff6ff" : "#fff", border: s ? "1px solid #3b82f6" : "1px solid #f1f5f9", marginBottom: 6, cursor: "pointer", transition: "all 0.2s" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 20, height: 20, borderRadius: 4, border: s ? "none" : "2px solid #d1d5db", background: s ? "#3b82f6" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 12 }}>{s ? "\u2713" : ""}</div>
                      <span style={{ fontSize: 14, fontWeight: s ? 600 : 400 }}>{item.name}</span>
                    </div>
                    <span style={{ fontSize: 14, fontWeight: 700, color: "#3b82f6" }}>+{item.price}{"\u20AC"}</span>
                  </div>
                );
              })}
            </div>
          ))}
          {sel.length > 0 && (
            <div style={{ background: "#0f172a", borderRadius: 16, padding: 24, marginTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
              <div><div style={{ fontSize: 13, color: "#94a3b8" }}>{sel.length} option{sel.length > 1 ? "s" : ""}</div><div style={{ fontSize: 28, fontWeight: 900, color: "#fff" }}>+{total}{"\u20AC"}</div></div>
              <button onClick={() => go("contact")} style={{ background: "#3b82f6", color: "#fff", border: "none", padding: "12px 24px", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Demander un devis avec ces options</button>
            </div>
          )}
        </div>
      </div>

      {/* COMMENT CA MARCHE */}
      <div style={{ padding: m ? "50px 20px" : "70px 20px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2 style={{ fontSize: m ? 26 : 34, fontWeight: 900, textAlign: "center", margin: "0 0 8px" }}>Simple comme bonjour</h2>
          <p style={{ fontSize: 15, color: "#64748b", textAlign: "center", margin: "0 0 40px" }}>Vous n'avez rien de technique \u00E0 faire</p>
          <div style={{ display: "flex", gap: 32, flexWrap: "wrap", justifyContent: "center" }}>
            {[{ n: "1", t: "Vous nous appelez", d: "Expliquez votre activit\u00E9 en 5 minutes. Vos services, vos tarifs. C'est tout." }, { n: "2", t: "On cr\u00E9e votre site", d: "Design, textes, photos. On s'occupe de tout. Vous validez avant mise en ligne." }, { n: "3", t: "Vos clients vous trouvent", d: "Votre site est en ligne, visible sur Google. Vous recevez des appels et des demandes." }].map((s, i) => (
              <div key={i} style={{ flex: "1 1 200px", maxWidth: 240, textAlign: "center" }}>
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
          <h2 style={{ fontSize: m ? 26 : 34, fontWeight: 900, textAlign: "center", margin: "0 0 8px" }}>Ils nous font confiance</h2>
          <p style={{ fontSize: 15, color: "#64748b", textAlign: "center", margin: "0 0 40px" }}>Des professionnels comme vous</p>
          <div style={{ display: "grid", gridTemplateColumns: m ? "1fr" : "repeat(2, 1fr)", gap: 16 }}>
            {TEMOIGNAGES.map((t, i) => (
              <div key={i} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 14, padding: 24 }}>
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
          <h2 style={{ fontSize: m ? 26 : 34, fontWeight: 900, textAlign: "center", margin: "0 0 8px" }}>Nos conseils pour votre activit\u00E9</h2>
          <p style={{ fontSize: 15, color: "#64748b", textAlign: "center", margin: "0 0 40px" }}>Guides pratiques pour d\u00E9velopper votre pr\u00E9sence en ligne</p>
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
        <div style={{ maxWidth: 700, margin: "0 auto", background: "linear-gradient(135deg, #065f46, #047857)", borderRadius: 20, padding: 36, display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap", justifyContent: "center" }}>
          <div style={{ fontSize: 48 }}>{"\uD83D\uDEE1\uFE0F"}</div>
          <div style={{ flex: 1, minWidth: 250 }}>
            <h3 style={{ fontSize: 22, fontWeight: 800, color: "#fff", margin: "0 0 8px" }}>Satisfait ou vous ne payez pas</h3>
            <p style={{ fontSize: 15, color: "#bbf7d0", margin: 0, lineHeight: 1.6 }}>On cr\u00E9e votre site, vous le validez. Si le r\u00E9sultat ne vous convient pas, vous ne payez rien. Z\u00E9ro risque, z\u00E9ro engagement.</p>
          </div>
        </div>
      </div>

      {/* CONTACT */}
      <div id="contact" style={{ background: "#0f172a", padding: m ? "50px 20px" : "70px 20px" }}>
        <div style={{ maxWidth: 550, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: m ? 26 : 34, fontWeight: 900, color: "#fff", margin: "0 0 8px" }}>Demandez votre devis gratuit</h2>
          <p style={{ fontSize: 15, color: "#94a3b8", margin: "0 0 32px" }}>R\u00E9ponse en moins de 24h. Sans engagement.</p>
          <div style={{ background: "#1e293b", borderRadius: 20, padding: m ? 24 : 32, textAlign: "left" }}>
            {[{ l: "Votre nom ou entreprise", p: "Ex: Boulangerie Martin, \u00C9lectricit\u00E9 Dupont..." }, { l: "Email ou t\u00E9l\u00E9phone", p: "email@exemple.com ou 06 12 34 56 78" }, { l: "Votre m\u00E9tier", p: "Ex: \u00C9lectricien, restaurant, coiffeur..." }].map((f, i) => (
              <div key={i} style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 13, color: "#94a3b8", display: "block", marginBottom: 6 }}>{f.l}</label>
                <input type="text" placeholder={f.p} style={{ width: "100%", padding: 14, background: "#0f172a", border: "1px solid #334155", borderRadius: 10, color: "#fff", fontSize: 15, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }} />
              </div>
            ))}
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 13, color: "#94a3b8", display: "block", marginBottom: 6 }}>Formule souhait\u00E9e</label>
              <select style={{ width: "100%", padding: 14, background: "#0f172a", border: "1px solid #334155", borderRadius: 10, color: "#fff", fontSize: 15, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }}>
                <option>Essentiel \u2014 399{"\u20AC"}</option>
                <option>Sur-Mesure \u2014 699{"\u20AC"}</option>
                <option>Pro \u2014 Sur devis</option>
                <option>Je ne sais pas encore</option>
              </select>
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 13, color: "#94a3b8", display: "block", marginBottom: 6 }}>D\u00E9crivez votre projet</label>
              <textarea placeholder="Ce que vous aimeriez sur votre site..." style={{ width: "100%", padding: 14, background: "#0f172a", border: "1px solid #334155", borderRadius: 10, color: "#fff", fontSize: 15, outline: "none", boxSizing: "border-box", fontFamily: "inherit", minHeight: 100, resize: "vertical" }} />
            </div>
            {sel.length > 0 && (
              <div style={{ background: "#0f172a", borderRadius: 10, padding: 14, marginBottom: 16, border: "1px solid #334155" }}>
                <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 8 }}>Options s\u00E9lectionn\u00E9es :</div>
                {sel.map((o, i) => (<div key={i} style={{ fontSize: 13, color: "#cbd5e1", marginBottom: 4 }}>{"\u2713"} {o.name} (+{o.price}{"\u20AC"})</div>))}
                <div style={{ fontSize: 14, fontWeight: 700, color: "#3b82f6", marginTop: 8 }}>Total options : +{total}{"\u20AC"}</div>
              </div>
            )}
            <button onClick={() => alert("Merci ! Nous vous recontactons dans les 24h.")} style={{ width: "100%", padding: 16, background: "#3b82f6", border: "none", borderRadius: 10, color: "#fff", fontSize: 16, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 20px rgba(59,130,246,0.3)" }}>Envoyer ma demande</button>
          </div>
        </div>
      </div>


      {/* A PROPOS */}
      <div style={{ padding: "40px 20px", borderTop: "1px solid #f1f5f9" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#3b82f6", textTransform: "uppercase", letterSpacing: 2, marginBottom: 16 }}>{"\u00C0"} propos</div>
          <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.8, margin: 0 }}>
            Je m{"\u2019"}appelle Rapha{"\u00EB"}l, ing{"\u00E9"}nieur informaticien de m{"\u00E9"}tier. Passionn{"\u00E9"} de bricolage et titulaire d{"\u2019"}un CAP {"\u00C9"}lectricit{"\u00E9"} repass{"\u00E9"} en candidat libre, j{"\u2019"}ai retrouss{"\u00E9"} mes manches sur pas mal de chantiers. Cette exp{"\u00E9"}rience sur le terrain m{"\u2019"}a permis de comprendre vos r{"\u00E9"}alit{"\u00E9"}s, vos contraintes de temps et vos v{"\u00E9"}ritables enjeux au quotidien. Aujourd{"\u2019"}hui, je mets mes comp{"\u00E9"}tences d{"\u2019"}ing{"\u00E9"}nieur au service des artisans, ind{"\u00E9"}pendants et TPE pour cr{"\u00E9"}er des sites vitrines simples, efficaces et livr{"\u00E9"}s rapidement {"\u2014"} du travail propre et carr{"\u00E9"}, sans jargon technique.
          </p>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ padding: "24px 20px", borderTop: "1px solid #f1f5f9", textAlign: "center" }}>
        <div style={{ fontSize: 18, fontWeight: 900, marginBottom: 8 }}>Site<span style={{ color: "#3b82f6" }}>Minute</span></div>
        <div style={{ marginBottom: 10 }}>
          <button onClick={() => setCgv(true)} style={{ background: "none", border: "none", color: "#94a3b8", fontSize: 12, cursor: "pointer", textDecoration: "underline", marginRight: 16, fontFamily: "inherit" }}>Mentions l\u00E9gales</button>
          <button onClick={() => setCgv(true)} style={{ background: "none", border: "none", color: "#94a3b8", fontSize: 12, cursor: "pointer", textDecoration: "underline", fontFamily: "inherit" }}>CGV</button>
        </div>
        <p style={{ fontSize: 12, color: "#94a3b8", margin: 0 }}>{"\u00A9"} {new Date().getFullYear()} SiteMinute {"\u2014"} Cr\u00E9ation de sites web pour artisans, commerces et PME</p>
      </div>

      {/* CGV MODAL */}
      {cgv && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.6)", zIndex: 1000, display: "flex", justifyContent: "center", alignItems: "center", padding: 16 }} onClick={() => setCgv(false)}>
          <div style={{ background: "#fff", borderRadius: 20, padding: 36, maxWidth: 650, maxHeight: "80vh", overflowY: "auto", fontSize: 13, lineHeight: 1.8 }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h2 style={{ fontSize: 22, fontWeight: 900, margin: 0 }}>Mentions l\u00E9gales & CGV</h2>
              <button onClick={() => setCgv(false)} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#94a3b8" }}>{"\u2715"}</button>
            </div>
            <h3 style={{ color: "#3b82f6", fontSize: 15, marginTop: 16, marginBottom: 6 }}>1. \u00C9diteur du site</h3>
            <p>SiteMinute {"\u2014"} Service de cr\u00E9ation de sites web professionnels. H\u00E9bergement : Vercel Inc., San Francisco, CA, USA.</p>
            <h3 style={{ color: "#3b82f6", fontSize: 15, marginTop: 16, marginBottom: 6 }}>2. Tarifs et paiement</h3>
            <p>Les prix sont en euros TTC. Le paiement s'effectue <strong>\u00E0 la livraison du site</strong>, apr\u00E8s validation par le client. Aucun acompte n'est demand\u00E9.</p>
            <h3 style={{ color: "#3b82f6", fontSize: 15, marginTop: 16, marginBottom: 6 }}>3. Livraison et validation</h3>
            <p>Le client re\u00E7oit une preview pour validation. 2 allers-retours de modifications inclus dans le prix.</p>
            <h3 style={{ color: "#3b82f6", fontSize: 15, marginTop: 16, marginBottom: 6 }}>4. Maintenance</h3>
            <p>L'abonnement maintenance \u00E0 49\u20AC/mois est optionnel et sans engagement. Il comprend h\u00E9bergement, nom de domaine, mises \u00E0 jour, analytics et support.</p>
            <h3 style={{ color: "#3b82f6", fontSize: 15, marginTop: 16, marginBottom: 6 }}>5. Propri\u00E9t\u00E9 du site</h3>
            <p>Le client est propri\u00E9taire de son site d\u00E8s le paiement. En cas de r\u00E9siliation de la maintenance, le client r\u00E9cup\u00E8re tous les fichiers.</p>
            <h3 style={{ color: "#3b82f6", fontSize: 15, marginTop: 16, marginBottom: 6 }}>6. Donn\u00E9es personnelles</h3>
            <p>Les informations du formulaire sont utilis\u00E9es uniquement pour r\u00E9pondre \u00E0 la demande. Conform\u00E9ment au RGPD, vous pouvez demander la suppression de vos donn\u00E9es \u00E0 tout moment.</p>
            <h3 style={{ color: "#3b82f6", fontSize: 15, marginTop: 16, marginBottom: 6 }}>7. Droit applicable</h3>
            <p>Droit fran\u00E7ais. Tribunaux comp\u00E9tents de Marseille.</p>
          </div>
        </div>
      )}
    </div>
  );
}
