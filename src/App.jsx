import { useState, useEffect } from "react";

const PLANS = [
  { name: "Essentiel", price: "399", desc: "Votre vitrine en ligne en 48h", features: ["Template professionnel", "3 \u00E0 5 pages", "Responsive mobile", "Formulaire de contact basique", "Mise en ligne en 48h"], highlight: false },
  { name: "Sur-Mesure", price: "699", desc: "Un site unique \u00E0 votre image", features: ["Design 100% personnalis\u00E9", "Jusqu'\u00E0 10 pages", "SEO optimis\u00E9", "Google Analytics", "Formulaire avanc\u00E9", "Livr\u00E9 en 5 jours"], highlight: true },
  { name: "Pro", price: null, desc: "Solution compl\u00E8te sur mesure", features: ["Base de donn\u00E9es", "R\u00E9servation en ligne", "Espace client / admin", "Fonctionnalit\u00E9s avanc\u00E9es", "Accompagnement complet"], highlight: false }
];

const OPTIONS = [
  { category: "Essentiels", items: [
    { name: "Int\u00E9gration Google Maps", price: 19 },
    { name: "Bouton WhatsApp / Appel direct", price: 19 },
    { name: "Liens r\u00E9seaux sociaux", price: 19 },
    { name: "Vid\u00E9o de pr\u00E9sentation int\u00E9gr\u00E9e", price: 19 },
    { name: "Bandeau cookies RGPD", price: 19 },
  ]},
  { category: "Contenu", items: [
    { name: "Galerie photos / carrousel", price: 39 },
    { name: "Page avis clients / t\u00E9moignages", price: 39 },
    { name: "Page menu / carte restaurant", price: 39 },
    { name: "Formulaire de contact avanc\u00E9", price: 39 },
  ]},
  { category: "Avanc\u00E9", items: [
    { name: "Blog int\u00E9gr\u00E9 (5 articles)", price: 69 },
    { name: "Formulaire devis en ligne", price: 69 },
    { name: "SEO avanc\u00E9 (meta, sitemap, Search Console)", price: 69 },
  ]},
  { category: "Premium", items: [
    { name: "Chatbot IA int\u00E9gr\u00E9", price: 99 },
    { name: "Multi-langue (2 langues)", price: 99 },
    { name: "Syst\u00E8me de r\u00E9servation simple", price: 99 },
  ]}
];

const PORTFOLIO = [
  { name: "CompareImmo", url: "https://compareimmo.fr", desc: "Comparateur immobilier IA", tag: "Immobilier" },
  { name: "CompareCar", url: "https://comparecar.fr", desc: "Analyse d'annonces auto par IA", tag: "Automobile" },
  { name: "MoinsCher.beauty", url: "https://moinscher.beauty", desc: "Dupe finder cosm\u00E9tique IA", tag: "Beaut\u00E9" }
];

export default function App() {
  const [isMobile, setIsMobile] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const toggleOption = (name, price) => {
    setSelectedOptions(prev => {
      const exists = prev.find(o => o.name === name);
      if (exists) return prev.filter(o => o.name !== name);
      return [...prev, { name, price }];
    });
  };

  const totalOptions = selectedOptions.reduce((s, o) => s + o.price, 0);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ minHeight: "100vh", background: "#fff", color: "#0f172a", fontFamily: "'Inter', -apple-system, sans-serif" }}>

      {/* NAV */}
      <nav style={{ maxWidth: 1100, margin: "0 auto", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 22, fontWeight: 900 }}>Site<span style={{ color: "#3b82f6" }}>Express</span></div>
        <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
          {!isMobile && <>
            <span onClick={() => scrollTo("offres")} style={{ fontSize: 14, color: "#64748b", cursor: "pointer" }}>Offres</span>
            <span onClick={() => scrollTo("options")} style={{ fontSize: 14, color: "#64748b", cursor: "pointer" }}>Options</span>
            <span onClick={() => scrollTo("portfolio")} style={{ fontSize: 14, color: "#64748b", cursor: "pointer" }}>R\u00E9alisations</span>
          </>}
          <button onClick={() => scrollTo("contact")} style={{ background: "#3b82f6", color: "#fff", border: "none", padding: "8px 20px", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Devis gratuit</button>
        </div>
      </nav>

      {/* HERO */}
      <div style={{ background: "linear-gradient(160deg, #0f172a 0%, #1e293b 100%)", padding: isMobile ? "60px 20px 50px" : "100px 20px 80px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <div style={{ background: "#3b82f620", color: "#60a5fa", padding: "6px 16px", borderRadius: 20, fontSize: 13, fontWeight: 600, display: "inline-block", marginBottom: 24 }}>Cr\u00E9ation de sites web professionnels</div>
          <h1 style={{ fontSize: isMobile ? 36 : 56, fontWeight: 900, margin: "0 0 20px", color: "#fff", lineHeight: 1.1 }}>
            Votre site pro<br />en <span style={{ color: "#3b82f6" }}>48 heures</span>
          </h1>
          <p style={{ fontSize: isMobile ? 16 : 19, color: "#94a3b8", margin: "0 auto 36px", lineHeight: 1.7, maxWidth: 550 }}>
            Sites vitrines modernes pour artisans, commerces et PME. Design professionnel, optimis\u00E9 mobile et SEO. \u00C0 partir de 399\u20AC.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => scrollTo("offres")} style={{ background: "#3b82f6", color: "#fff", border: "none", padding: "14px 32px", borderRadius: 10, fontSize: 16, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 20px rgba(59,130,246,0.3)" }}>Voir les offres</button>
            <button onClick={() => scrollTo("portfolio")} style={{ background: "transparent", color: "#94a3b8", border: "1px solid #334155", padding: "14px 32px", borderRadius: 10, fontSize: 16, fontWeight: 600, cursor: "pointer" }}>Nos r\u00E9alisations</button>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div style={{ padding: "32px 20px", borderBottom: "1px solid #f1f5f9" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", display: "flex", justifyContent: "center", gap: isMobile ? 24 : 60, flexWrap: "wrap", textAlign: "center" }}>
          {[{ v: "48h", l: "D\u00E9lai de livraison" }, { v: "399\u20AC", l: "\u00C0 partir de" }, { v: "100%", l: "Responsive mobile" }, { v: "49\u20AC/mois", l: "Maintenance tout inclus" }].map((s, i) => (
            <div key={i}><div style={{ fontSize: 24, fontWeight: 900, color: "#3b82f6" }}>{s.v}</div><div style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>{s.l}</div></div>
          ))}
        </div>
      </div>

      {/* OFFRES */}
      <div id="offres" style={{ padding: isMobile ? "50px 20px" : "80px 20px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <h2 style={{ fontSize: isMobile ? 28 : 36, fontWeight: 900, margin: "0 0 8px", textAlign: "center" }}>Nos offres</h2>
          <p style={{ fontSize: 15, color: "#64748b", margin: "0 0 40px", textAlign: "center" }}>Choisissez votre formule, ajoutez des options \u00E0 la carte</p>

          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 20 }}>
            {PLANS.map((plan, i) => (
              <div key={i} style={{
                background: plan.highlight ? "#0f172a" : "#fff",
                border: plan.highlight ? "2px solid #3b82f6" : "1px solid #e2e8f0",
                borderRadius: 20, padding: 32, position: "relative",
                display: "flex", flexDirection: "column"
              }}>
                {plan.highlight && <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: "#3b82f6", color: "#fff", padding: "4px 16px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>Populaire</div>}
                <div style={{ fontSize: 14, fontWeight: 600, color: plan.highlight ? "#60a5fa" : "#3b82f6", marginBottom: 6 }}>{plan.name}</div>
                <div style={{ fontSize: 40, fontWeight: 900, color: plan.highlight ? "#fff" : "#0f172a", marginBottom: 4 }}>
                  {plan.price ? <>{plan.price}<span style={{ fontSize: 18, fontWeight: 500 }}>\u20AC</span></> : "Sur devis"}
                </div>
                <p style={{ fontSize: 14, color: plan.highlight ? "#94a3b8" : "#64748b", margin: "0 0 20px" }}>{plan.desc}</p>
                <div style={{ flex: 1 }}>
                  {plan.features.map((f, j) => (
                    <div key={j} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                      <div style={{ width: 18, height: 18, borderRadius: "50%", background: plan.highlight ? "#3b82f620" : "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#3b82f6", flexShrink: 0 }}>{"\u2713"}</div>
                      <span style={{ fontSize: 14, color: plan.highlight ? "#cbd5e1" : "#475569" }}>{f}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => { setSelectedPlan(plan.name); scrollTo("contact"); }} style={{
                  width: "100%", padding: 14, marginTop: 20,
                  background: plan.highlight ? "#3b82f6" : "transparent",
                  border: plan.highlight ? "none" : "1px solid #e2e8f0",
                  borderRadius: 10, color: plan.highlight ? "#fff" : "#0f172a",
                  fontSize: 15, fontWeight: 700, cursor: "pointer"
                }}>
                  {plan.price ? "Choisir cette offre" : "Demander un devis"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MAINTENANCE */}
      <div style={{ background: "#f8fafc", padding: "40px 20px", borderTop: "1px solid #f1f5f9" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap", justifyContent: "center" }}>
          <div style={{ flex: 1, minWidth: 250 }}>
            <h3 style={{ fontSize: 22, fontWeight: 800, margin: "0 0 8px" }}>Maintenance — 49\u20AC/mois</h3>
            <p style={{ fontSize: 14, color: "#64748b", margin: 0, lineHeight: 1.6 }}>H\u00E9bergement, nom de domaine, Google Analytics, mises \u00E0 jour de s\u00E9curit\u00E9, support par email. Vous n'avez \u00E0 vous occuper de rien.</p>
          </div>
          <div style={{ background: "#0f172a", color: "#fff", padding: "16px 28px", borderRadius: 12, textAlign: "center" }}>
            <div style={{ fontSize: 32, fontWeight: 900 }}>49\u20AC</div>
            <div style={{ fontSize: 12, color: "#94a3b8" }}>/ mois</div>
          </div>
        </div>
      </div>

      {/* OPTIONS */}
      <div id="options" style={{ padding: isMobile ? "50px 20px" : "80px 20px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2 style={{ fontSize: isMobile ? 28 : 36, fontWeight: 900, margin: "0 0 8px", textAlign: "center" }}>Options \u00E0 la carte</h2>
          <p style={{ fontSize: 15, color: "#64748b", margin: "0 0 40px", textAlign: "center" }}>Personnalisez votre site selon vos besoins</p>

          {OPTIONS.map((cat, i) => (
            <div key={i} style={{ marginBottom: 28 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#3b82f6", textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>{cat.category}</div>
              {cat.items.map((item, j) => {
                const selected = selectedOptions.find(o => o.name === item.name);
                return (
                  <div key={j} onClick={() => toggleOption(item.name, item.price)} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "14px 16px", borderRadius: 10,
                    background: selected ? "#eff6ff" : "#fff",
                    border: selected ? "1px solid #3b82f6" : "1px solid #f1f5f9",
                    marginBottom: 6, cursor: "pointer", transition: "all 0.2s"
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{
                        width: 20, height: 20, borderRadius: 4,
                        border: selected ? "none" : "2px solid #d1d5db",
                        background: selected ? "#3b82f6" : "transparent",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "#fff", fontSize: 12
                      }}>{selected ? "\u2713" : ""}</div>
                      <span style={{ fontSize: 14, color: "#1e293b", fontWeight: selected ? 600 : 400 }}>{item.name}</span>
                    </div>
                    <span style={{ fontSize: 14, fontWeight: 700, color: "#3b82f6" }}>+{item.price}\u20AC</span>
                  </div>
                );
              })}
            </div>
          ))}

          {selectedOptions.length > 0 && (
            <div style={{
              background: "#0f172a", borderRadius: 16, padding: 24, marginTop: 20,
              display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12
            }}>
              <div>
                <div style={{ fontSize: 13, color: "#94a3b8" }}>{selectedOptions.length} option{selectedOptions.length > 1 ? "s" : ""} s\u00E9lectionn\u00E9e{selectedOptions.length > 1 ? "s" : ""}</div>
                <div style={{ fontSize: 28, fontWeight: 900, color: "#fff" }}>+{totalOptions}\u20AC</div>
              </div>
              <button onClick={() => scrollTo("contact")} style={{ background: "#3b82f6", color: "#fff", border: "none", padding: "12px 24px", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Demander un devis avec ces options</button>
            </div>
          )}
        </div>
      </div>

      {/* PORTFOLIO */}
      <div id="portfolio" style={{ background: "#f8fafc", padding: isMobile ? "50px 20px" : "80px 20px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontSize: isMobile ? 28 : 36, fontWeight: 900, margin: "0 0 8px", textAlign: "center" }}>Nos r\u00E9alisations</h2>
          <p style={{ fontSize: 15, color: "#64748b", margin: "0 0 40px", textAlign: "center" }}>Des sites performants, livr\u00E9s rapidement</p>

          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 16 }}>
            {PORTFOLIO.map((p, i) => (
              <a key={i} href={p.url} target="_blank" rel="noopener noreferrer" style={{
                background: "#fff", border: "1px solid #e2e8f0", borderRadius: 16,
                padding: 24, textDecoration: "none", transition: "all 0.2s"
              }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#3b82f6"; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(59,130,246,0.08)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <span style={{ background: "#eff6ff", color: "#3b82f6", padding: "3px 10px", borderRadius: 6, fontSize: 11, fontWeight: 600 }}>{p.tag}</span>
                <h3 style={{ fontSize: 20, fontWeight: 800, margin: "12px 0 6px", color: "#0f172a" }}>{p.name}</h3>
                <p style={{ fontSize: 13, color: "#64748b", margin: "0 0 12px" }}>{p.desc}</p>
                <span style={{ fontSize: 13, color: "#3b82f6", fontWeight: 600 }}>Voir le site {"\u2192"}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* COMMENT CA MARCHE */}
      <div style={{ padding: isMobile ? "50px 20px" : "80px 20px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2 style={{ fontSize: isMobile ? 28 : 36, fontWeight: 900, margin: "0 0 8px", textAlign: "center" }}>Comment \u00E7a marche</h2>
          <p style={{ fontSize: 15, color: "#64748b", margin: "0 0 40px", textAlign: "center" }}>De votre id\u00E9e \u00E0 votre site en ligne</p>

          <div style={{ display: "flex", gap: 32, flexWrap: "wrap", justifyContent: "center" }}>
            {[
              { n: "1", t: "Vous nous contactez", d: "Expliquez-nous votre activit\u00E9, vos besoins, vos pr\u00E9f\u00E9rences. C'est gratuit et sans engagement." },
              { n: "2", t: "On cr\u00E9e votre site", d: "Design, contenu, SEO. Vous recevez une preview pour validation avant mise en ligne." },
              { n: "3", t: "Votre site est en ligne", d: "Publication, nom de domaine, analytics. Tout est pr\u00EAt, vous n'avez rien \u00E0 faire." }
            ].map((s, i) => (
              <div key={i} style={{ flex: "1 1 200px", maxWidth: 240, textAlign: "center" }}>
                <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#0f172a", color: "#3b82f6", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: 22, fontWeight: 900 }}>{s.n}</div>
                <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>{s.t}</div>
                <div style={{ fontSize: 14, color: "#64748b", lineHeight: 1.6 }}>{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CONTACT */}
      <div id="contact" style={{ background: "#0f172a", padding: isMobile ? "50px 20px" : "80px 20px" }}>
        <div style={{ maxWidth: 550, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: isMobile ? 28 : 36, fontWeight: 900, margin: "0 0 8px", color: "#fff" }}>Demandez votre devis gratuit</h2>
          <p style={{ fontSize: 15, color: "#94a3b8", margin: "0 0 32px" }}>R\u00E9ponse en moins de 24h. Sans engagement.</p>

          <div style={{ background: "#1e293b", borderRadius: 20, padding: isMobile ? 24 : 32, textAlign: "left" }}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 13, color: "#94a3b8", display: "block", marginBottom: 6 }}>Votre nom ou entreprise</label>
              <input type="text" placeholder="Ex: Boulangerie Martin" style={{ width: "100%", padding: 14, background: "#0f172a", border: "1px solid #334155", borderRadius: 10, color: "#fff", fontSize: 15, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }} />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 13, color: "#94a3b8", display: "block", marginBottom: 6 }}>Email ou t\u00E9l\u00E9phone</label>
              <input type="text" placeholder="email@exemple.com ou 06 12 34 56 78" style={{ width: "100%", padding: 14, background: "#0f172a", border: "1px solid #334155", borderRadius: 10, color: "#fff", fontSize: 15, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }} />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 13, color: "#94a3b8", display: "block", marginBottom: 6 }}>Formule souhait\u00E9e</label>
              <select style={{ width: "100%", padding: 14, background: "#0f172a", border: "1px solid #334155", borderRadius: 10, color: "#fff", fontSize: 15, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }}>
                <option>Essentiel — 399\u20AC</option>
                <option>Sur-Mesure — 699\u20AC</option>
                <option>Pro — Sur devis</option>
              </select>
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 13, color: "#94a3b8", display: "block", marginBottom: 6 }}>D\u00E9crivez votre projet</label>
              <textarea placeholder="Votre activit\u00E9, ce que vous attendez du site, vos pr\u00E9f\u00E9rences..." style={{ width: "100%", padding: 14, background: "#0f172a", border: "1px solid #334155", borderRadius: 10, color: "#fff", fontSize: 15, outline: "none", boxSizing: "border-box", fontFamily: "inherit", minHeight: 100, resize: "vertical" }} />
            </div>

            {selectedOptions.length > 0 && (
              <div style={{ background: "#0f172a", borderRadius: 10, padding: 14, marginBottom: 16, border: "1px solid #334155" }}>
                <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 8 }}>Options s\u00E9lectionn\u00E9es :</div>
                {selectedOptions.map((o, i) => (
                  <div key={i} style={{ fontSize: 13, color: "#cbd5e1", marginBottom: 4 }}>{"\u2713"} {o.name} (+{o.price}\u20AC)</div>
                ))}
                <div style={{ fontSize: 14, fontWeight: 700, color: "#3b82f6", marginTop: 8 }}>Total options : +{totalOptions}\u20AC</div>
              </div>
            )}

            <button onClick={() => { alert("Merci ! Nous vous recontactons dans les 24h."); }} style={{ width: "100%", padding: 16, background: "#3b82f6", border: "none", borderRadius: 10, color: "#fff", fontSize: 16, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 20px rgba(59,130,246,0.3)" }}>
              Envoyer ma demande
            </button>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ padding: "24px 20px", borderTop: "1px solid #f1f5f9", textAlign: "center" }}>
        <div style={{ fontSize: 18, fontWeight: 900, marginBottom: 8 }}>Site<span style={{ color: "#3b82f6" }}>Express</span></div>
        <p style={{ fontSize: 12, color: "#94a3b8", margin: 0 }}>{"\u00A9"} {new Date().getFullYear()} SiteExpress — Cr\u00E9ation de sites web professionnels</p>
      </div>
    </div>
  );
}
