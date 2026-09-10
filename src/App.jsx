import { useState, useEffect, useRef } from "react";

const PLANS = [
  { name: "Essentiel", price: "399", desc: "Votre vitrine en ligne en 48h", features: ["Template professionnel", "3 à 5 pages", "Adapté mobile & tablette", "Formulaire de contact", "Livré en 48h"], highlight: false, orange: false },
  { name: "Sur-Mesure", price: "699", desc: "Un site unique à votre image", features: ["Design 100% personnalisé", "Jusqu'à 10 pages", "Référencement Google (SEO)", "Google Analytics", "Formulaire avancé", "Livré en 5 jours"], highlight: true, orange: false },
  { name: "Pro", price: null, desc: "Solution complète sur mesure", features: ["Base de données clients", "Réservation en ligne", "Espace admin", "Fonctionnalités avancées", "Accompagnement complet"], highlight: false, orange: false },
  { name: "IA & Automation", price: "49", desc: "Boostez votre site avec l'IA", features: ["Chatbot IA 24h/24", "Prise de RDV automatique", "Réponse auto aux leads", "Relance email J+3 / J+7", "FAQ intelligente", "Devis automatique"], highlight: false, orange: true }
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
  { id: "clients-sans-site", image: "/blog-clients.jpg", title: "Pourquoi 72% des clients ne vous appellent jamais sans site web", tag: "Guide", color: "#3b82f6", bg: "#eff6ff", readTime: "8 min", date: "2026-09-01",
    content: `J'ai un pote plombier à Marseille. Un bon. Le genre de mec qui bosse proprement, qui arrive à l'heure, qui nettoie derrière lui. Bref, le rêve pour un client. Sauf que pendant des années, il a galéré à remplir son planning. Il bossait uniquement au bouche à oreille et ça suffisait pas toujours.

Un jour je lui ai demandé : "T'as un site web ?". Il m'a regardé comme si je lui parlais chinois. "Pour quoi faire ? Mes clients me connaissent." Ouais, ses clients actuels le connaissent. Mais tous ceux qui tapent "plombier Marseille" sur Google à 22h parce que leur chauffe-eau vient de lâcher ? Eux, ils le connaissent pas.

## Le réflexe Google

En 2026, c'est devenu un automatisme. Votre lave-vaisselle tombe en panne ? Google. Vous cherchez une coiffeuse pour votre mariage ? Google. Besoin d'un électricien pour une mise aux normes ? Google.

Une étude IFOP le confirme : 72% des Français ne contactent jamais un professionnel qui n'a pas de présence en ligne. C'est pas qu'ils vous font pas confiance. C'est qu'ils ne savent même pas que vous existez.

Pensez-y deux secondes. Sur 10 personnes qui cherchent votre métier dans votre ville, 7 ne vous contacteront jamais si vous n'avez pas de site. Sept clients potentiels perdus. Chaque semaine. Chaque mois.

## "Mais j'ai une page Facebook"

J'entends ça tout le temps. Et je comprends, c'est gratuit, c'est facile. Mais Facebook c'est pas Google. Quand quelqu'un tape "électricien Aix-en-Provence" sur Google, votre page Facebook n'apparaît quasiment jamais dans les résultats. Ce qui apparaît, ce sont les sites web.

Et puis il y a un truc que beaucoup de gens ignorent : Facebook ne montre vos publications qu'à 5 à 10% de vos abonnés. Vous avez 400 abonnés ? Seulement 20 à 40 personnes voient votre post. L'algorithme décide pour vous.

## Combien ça vous coûte vraiment

Faisons un calcul simple. Disons que vous ratez 3 clients par semaine parce qu'ils ne vous trouvent pas en ligne. Si votre intervention moyenne vaut 200€, ça fait 600€ par semaine de manque à gagner. Sur un mois, c'est 2 400€. Sur un an, presque 30 000€.

Maintenant, un site web vitrine coûte 399€ à créer. La maintenance c'est 29€ par mois. Faites le calcul : votre site se rembourse dès le premier client. Tout le reste, c'est du bonus.

## Ce qu'il faut sur votre site (et rien de plus)

Pas besoin d'un site de 50 pages avec des animations dans tous les sens. Les clients veulent 5 choses, c'est tout :

Vos prestations. Qu'est-ce que vous faites exactement ? Dépannage, installation, rénovation ? Soyez précis.

Votre zone d'intervention. Vous bossez sur Marseille et 30 km autour ? Dites-le clairement. C'est aussi ce qui vous fait remonter sur Google.

Des photos de vos réalisations. Un artisan sans photos, c'est comme un restaurant sans carte. Les gens veulent voir votre travail.

Votre numéro de téléphone. Visible, en gros, cliquable sur mobile. Si un client doit chercher 30 secondes pour trouver comment vous joindre, il part.

Un formulaire de contact. Pour ceux qui préfèrent écrire plutôt qu'appeler, surtout le soir ou le week-end. Ce formulaire travaille pour vous même à 3h du matin.

## Mon pote plombier, la suite

Je lui ai créé son site en deux jours. Rien de compliqué : ses prestations, des photos de chantiers, son 06 bien visible, un formulaire. On a rajouté Google Maps pour que les gens voient qu'il est à côté de chez eux.

Premier mois : 4 appels via le site. Deuxième mois : 8. Au bout de 6 mois il refusait des chantiers. Aujourd'hui il me dit que la moitié de ses nouveaux clients viennent de Google.

Pour 399€, c'est le meilleur investissement qu'il ait jamais fait. Et il le sait.` },

  { id: "premier-sur-google", image: "/blog-google.jpg", title: "Comment apparaître en premier sur Google dans votre ville", tag: "SEO local", color: "#d97706", bg: "#fef3c7", readTime: "9 min", date: "2026-08-28",
    content: `Quand vous cherchez un restaurant, qu'est-ce que vous faites ? Vous sortez votre téléphone et vous tapez "restaurant italien près de moi". En 0,3 secondes, Google vous donne une liste. Vous cliquez sur le premier ou le deuxième résultat. Vous regardez les avis. Vous y allez.

Vos clients font exactement la même chose avec votre métier. "Plombier Lyon 7", "coiffeuse Aix-en-Provence", "électricien Aubagne urgence". Et la question c'est : est-ce que c'est vous qui apparaissez en premier ? Ou est-ce que c'est votre concurrent d'en face ?

## Comment Google décide qui passe en premier

Google c'est pas magique. C'est un algorithme qui classe les résultats selon des critères précis. Et la bonne nouvelle, c'est que ces critères sont connus. Pas besoin d'être informaticien pour les comprendre.

Pour les recherches locales — et c'est ça qui nous intéresse — Google regarde trois choses. La pertinence : est-ce que votre site parle bien du service recherché ? La distance : est-ce que vous êtes géographiquement proche de la personne qui cherche ? Et la notoriété : est-ce que d'autres sites, annuaires, avis parlent de vous ?

## Étape 1 : Votre fiche Google Business, c'est non négociable

Avant même de parler de site web, il y a un truc gratuit qui prend 20 minutes et qui change tout : votre fiche Google Business. C'est ce qui apparaît dans le petit encadré avec la carte quand vous tapez un commerce sur Google. Le truc avec les étoiles, les horaires, le numéro.

Allez sur business.google.com. Créez votre fiche. Mettez votre vraie adresse (ou votre zone d'intervention si vous vous déplacez). Ajoutez des photos — pas des photos pourries prises à l'arrache, des vraies photos de votre travail. Vos horaires. Votre numéro.

Et surtout : demandez des avis. Les avis Google c'est le nerf de la guerre. Un artisan avec 15 avis à 4,8 étoiles passe systématiquement devant un artisan sans avis, même si ce dernier bosse mieux. C'est injuste, mais c'est comme ça.

## Étape 2 : Un site web avec les bons mots au bon endroit

Avoir un site c'est bien. Avoir un site que Google comprend c'est mieux. Et pour ça, il faut parler le langage de Google.

Concrètement, ça veut dire mettre votre ville dans le titre de votre site. Pas "Entreprise Martin" mais "Entreprise Martin — Électricien à Marseille 13008". Ça veut dire mentionner vos quartiers d'intervention dans vos textes : "Nous intervenons dans tout le 8ème arrondissement, à la Plage du Prado, Sainte-Anne, Bonneveine...".

Ça veut dire aussi avoir une page par service si possible. Une page "Dépannage électrique", une page "Installation tableau électrique", une page "Mise aux normes NF C 15-100". Chaque page est une porte d'entrée supplémentaire sur Google.

## Étape 3 : Les annuaires, ça compte encore

PagesJaunes, Yelp, les annuaires de votre fédération professionnelle. Chaque fois que votre nom, adresse et téléphone apparaissent sur un autre site, Google se dit "tiens, ce pro est connu, il est légitime". En SEO on appelle ça des citations locales.

C'est pas le truc le plus excitant du monde, mais 30 minutes à vous inscrire sur 5-6 annuaires et c'est fait une bonne fois pour toutes. Et ça booste votre classement.

## Étape 4 : Le contenu qui attire

Un blog sur votre site c'est un bonus énorme. Pas un blog où vous racontez vos vacances — un blog utile. "Comment choisir son chauffe-eau en 2026", "Les 5 pannes électriques les plus fréquentes", "Prix d'une rénovation salle de bain à Marseille".

Ces articles attirent des gens qui cherchent des réponses. Ils arrivent sur votre site, découvrent vos services, et certains deviennent clients. C'est ce qu'on appelle le référencement naturel, et c'est le trafic le plus rentable qui existe parce qu'il est gratuit.

## Combien de temps pour voir des résultats ?

Soyons honnêtes. Le SEO c'est pas instantané. Comptez 2 à 3 mois pour commencer à apparaître sur la première page de Google sur des requêtes locales. Parfois plus vite si la concurrence est faible dans votre ville.

Mais une fois que vous y êtes, ça dure. Contrairement à une pub qui s'arrête dès que vous arrêtez de payer, votre position Google reste tant que vous maintenez votre site et vos avis.` },

  { id: "marie-triple-rdv", image: "/blog-marie.jpg", title: "Comment Marie a triplé ses rendez-vous grâce à son site", tag: "Témoignage", color: "#e91e63", bg: "#fce4ec", readTime: "7 min", date: "2026-08-25",
    content: `Je vais vous raconter l'histoire de Marie. C'est pas une étude de cas à la con sortie d'un bouquin de marketing. C'est une vraie personne, une prothésiste ongulaire installée à Aix-en-Provence depuis 4 ans.

## Le point de départ

Quand Marie m'a contacté, elle avait une clientèle fidèle mais stagnante. 8 à 10 clientes par semaine, uniquement du bouche à oreille et quelques abonnées Instagram. Elle payait 600€ de loyer pour son petit local et certaines semaines elle couvrait à peine ses charges.

Son problème c'était pas la qualité de son travail — ses ongles sont magnifiques, elle a un vrai talent. Son problème c'est que personne ne la trouvait en dehors de son cercle. Quand une fille tapait "prothésiste ongulaire Aix-en-Provence" sur Google, Marie n'existait pas.

## Ce qu'on a mis en place

On lui a créé un site simple mais efficace. Pas un truc avec 45 pages et des animations. Un site propre avec exactement ce dont elle avait besoin.

D'abord, une galerie photos. C'est le nerf de la guerre pour une prothésiste ongulaire. On a pris ses plus belles réalisations — les baby boomer, les nail art, les French manucure — et on les a mises en avant avec des photos nettes sur fond propre. Avant/après quand c'était pertinent.

Ensuite, ses tarifs. Clairement affichés. Manucure simple, semi-permanent, gel, nail art, dépose. Les clientes détestent devoir appeler juste pour connaître un prix. Quand c'est sur le site, elles arrivent déjà décidées.

Un bouton WhatsApp bien visible. Parce que sa clientèle c'est des femmes de 20 à 45 ans et elles préfèrent envoyer un message que passer un coup de fil. Le bouton ouvre directement la conversation WhatsApp avec un message pré-rempli.

Google Maps intégré pour montrer où elle est. Et ses horaires bien visibles.

## Le déclic

Le premier mois, elle a reçu 6 appels de nouvelles clientes qui l'avaient trouvée sur Google. Des filles qui habitaient le quartier et qui ne savaient même pas qu'elle existait. Au deuxième mois, on est passé à 12. Et au troisième, elle a commencé à refuser des créneaux.

Aujourd'hui Marie tourne à 25 clientes par semaine. Elle a même augmenté ses tarifs de 15% parce que la demande dépasse l'offre. Son chiffre d'affaires a plus que doublé.

## Le truc qu'on avait pas prévu

Ce qui a vraiment fait exploser son trafic, c'est un effet boule de neige qu'on n'avait pas anticipé. Ses clientes prennent des photos de leurs ongles et les postent sur Instagram en taguant Marie. Ces posts renvoient vers son site. Le site renvoie vers Instagram. C'est un cercle vertueux.

Et les avis Google. On lui a dit de demander à chaque cliente satisfaite de laisser un avis. En 3 mois elle avait 35 avis à 4,9 étoiles. Sur Aix-en-Provence, c'est imbattable. Elle apparaît systématiquement dans les 3 premiers résultats Google Maps.

## Ce que ça lui a coûté

699€ pour le site sur-mesure. 29€ par mois pour la maintenance. Total première année : 1 287€. Son gain supplémentaire la première année : environ 15 000€ de chiffre d'affaires en plus. Je vous laisse faire le calcul du retour sur investissement.` },

  { id: "site-vs-facebook", image: "/blog-facebook.jpg", title: "Site web vs page Facebook : pourquoi les réseaux sociaux ne suffisent pas", tag: "Comparatif", color: "#2e7d32", bg: "#e8f5e9", readTime: "7 min", date: "2026-08-20",
    content: `La semaine dernière un peintre en bâtiment m'a dit : "Pourquoi je paierais pour un site alors que j'ai déjà ma page Facebook ?". C'est une question légitime. Et la réponse est simple : parce que Facebook et un site web ne font pas du tout le même travail.

## Facebook c'est pas Google

C'est la confusion la plus courante. Les gens pensent que s'ils sont sur Facebook, ils sont visibles "sur internet". Techniquement oui. En pratique, non.

Quand un client potentiel a besoin d'un peintre, il ouvre Google et tape "peintre en bâtiment Marseille". Il ne va pas sur Facebook pour chercher. Les résultats Google affichent des sites web, pas des pages Facebook. Votre page Facebook est donc invisible au moment exact où le client cherche votre service.

C'est comme avoir une belle vitrine dans une rue où personne ne passe. Votre vitrine est super, mais elle est dans la mauvaise rue.

## L'algorithme travaille contre vous

Même pour vos propres abonnés, Facebook vous rend de moins en moins visible. En 2026, une publication organique touche en moyenne 5 à 8% de vos abonnés. Vous avez 500 abonnés ? Seulement 25 à 40 personnes voient votre post. Et ce chiffre baisse chaque année parce que Facebook veut vous pousser à payer de la pub.

Avec un site web, c'est l'inverse. Plus votre site est ancien et bien référencé, plus Google vous met en avant. Gratuitement. Pas besoin de sortir la carte bleue tous les mois.

## Vous ne possédez rien sur Facebook

Ça c'est le point que personne ne réalise avant qu'il soit trop tard. Votre page Facebook ne vous appartient pas. Elle appartient à Meta. Et Meta peut la supprimer quand il veut, sans prévenir.

J'ai vu ça arriver. Un artisan qui avait 2 000 abonnés, des centaines de photos de ses réalisations, des dizaines d'avis. Un matin : page désactivée. Motif : "non-respect des conditions d'utilisation". Il a jamais su ce qu'il avait fait de mal. Il a tout perdu.

Un site web vous appartient. Le code, les textes, les photos, le nom de domaine. Si demain votre hébergeur fait faillite, vous prenez vos fichiers et vous allez ailleurs. C'est à vous.

## L'image professionnelle

Soyons honnêtes deux secondes. Quand vous recevez un devis d'un artisan et que vous voulez vérifier s'il est sérieux, qu'est-ce qui vous inspire le plus confiance ? Un lien vers une page Facebook avec une photo de profil pixelisée et le dernier post qui date de 6 mois ? Ou un site web propre avec ses réalisations, ses tarifs, ses certifications ?

Un site web dit "je suis un professionnel établi". Une page Facebook dit "je fais ça sur le côté". C'est pas forcément vrai, mais c'est la perception.

## La bonne stratégie : les deux, mais dans le bon ordre

Le site web c'est votre maison. C'est la base, le truc solide qui vous appartient et qui bosse pour vous 24h/24 sur Google. Les réseaux sociaux c'est le mégaphone : vous y partagez vos réalisations, vos coulisses, votre quotidien. Mais tout doit ramener vers le site.

Un post Instagram de vos réalisations avec "Lien dans la bio → monsite.fr". Un partage Facebook de votre dernier article de blog. Le site est le centre, les réseaux sont les satellites.` },

  { id: "erreurs-site-web", image: "/blog-erreurs.jpg", title: "5 erreurs qui font fuir les clients de votre site", tag: "Pratique", color: "#7c3aed", bg: "#f3e8ff", readTime: "8 min", date: "2026-08-15",
    content: `Un mauvais site web c'est pire que pas de site du tout. Au moins quand vous n'avez pas de site, le client ne se fait pas d'opinion. Mais un site lent, moche ou mal foutu, ça envoie un message très clair : "ce professionnel n'est pas sérieux". Voici les 5 erreurs que je vois le plus souvent.

## Erreur 1 : Votre site met 10 secondes à charger

Vous savez combien de temps un visiteur attend avant de partir ? Trois secondes. Pas trente. Pas dix. Trois. Au-delà, 53% des gens ferment la page et vont chez votre concurrent.

Et devinez quoi, le premier site de votre concurrent charge en 2 secondes parce qu'il a été fait correctement. Pendant que votre site affiche encore un écran blanc, le client est déjà en train de l'appeler.

Les causes les plus fréquentes : des images de 5 Mo prises directement depuis l'appareil photo sans les compresser, un hébergement low-cost qui rame, du code mal optimisé. Des trucs faciles à corriger quand le site est fait par quelqu'un qui sait ce qu'il fait.

## Erreur 2 : Votre numéro de téléphone joue à cache-cache

Ça semble évident et pourtant. Le nombre de sites d'artisans où il faut scroller jusqu'en bas de la page, cliquer sur "Contact", puis lire un pavé de texte pour trouver un numéro de téléphone... c'est affolant.

Votre numéro doit être visible immédiatement. En haut de la page. Sur toutes les pages. Et surtout : cliquable sur mobile. Quand quelqu'un est sur son téléphone et qu'il voit votre numéro, il doit pouvoir appuyer dessus et vous appeler directement. Pas le copier-coller manuellement dans l'appli téléphone.

44% des visiteurs quittent un site s'ils ne trouvent pas facilement un moyen de contact. Quarante-quatre pour cent. Mettez votre 06 en gros en haut du site et c'est réglé.

## Erreur 3 : Votre site est illisible sur téléphone

En 2026, plus de 60% du trafic web vient des smartphones. Si votre site a été conçu uniquement pour un écran d'ordinateur, vous perdez plus de la moitié de vos visiteurs.

Un site "responsive" — qui s'adapte automatiquement à la taille de l'écran — c'est plus une option, c'est obligatoire. Le texte doit être lisible sans zoomer, les boutons assez gros pour qu'on puisse appuyer avec le pouce, les images qui ne débordent pas de l'écran.

Google pénalise aussi les sites non adaptés mobile dans ses résultats de recherche. Donc non seulement vous perdez les visiteurs qui arrivent sur votre site, mais en plus vous en attirez moins.

## Erreur 4 : Pas de photos, ou des photos horribles

Un plombier sans photos de ses réalisations, c'est un restaurant sans photos de ses plats. Vous iriez manger dans un restaurant dont le site montre zéro photo ? Moi non plus.

Les photos c'est la preuve sociale. C'est ce qui transforme un inconnu sur internet en professionnel de confiance. Un avant/après d'une salle de bain rénovée, un tableau électrique proprement câblé, une terrasse en bois fraîchement posée. Ça vaut tous les discours du monde.

Et par pitié, pas de photos de banque d'images avec des gens en costard qui se serrent la main devant un bureau vitré. Vos clients veulent voir votre vrai travail, pas des photos génériques.

## Erreur 5 : Aucun moyen de vous contacter le soir ou le week-end

Quand est-ce que les gens cherchent un artisan sur internet ? Le soir, après le boulot. Le week-end. Bref, quand vous êtes pas joignable au téléphone.

Si votre site n'a pas de formulaire de contact, vous perdez tous ces clients potentiels. Un formulaire simple — nom, email, téléphone, message — suffit. Le client remplit le formulaire à 23h, vous le rappelez le lendemain matin à 8h. Lui il est content, vous vous avez un nouveau client.

Un formulaire de contact travaille pour vous 24 heures sur 24, 7 jours sur 7, 365 jours par an. C'est votre commercial qui dort jamais et qui vous coûte rien.

## Le point commun de toutes ces erreurs

Elles sont toutes évitables. Un site bien conçu dès le départ n'a aucune de ces erreurs. C'est rapide, c'est mobile, le téléphone est visible, les photos sont belles, le formulaire fonctionne. C'est pas de la magie, c'est du bon sens appliqué correctement.` },

  { id: "conformite-site-web", image: "/blog-conformite.jpg", title: "Votre site est-il vraiment aux normes ? Les 10 trucs que personne ne vérifie", tag: "Juridique", color: "#dc2626", bg: "#fef2f2", readTime: "10 min", date: "2026-09-08",
    content: `Je vais vous raconter un truc qui m'est arrivé le mois dernier. Un client m'appelle, un restaurateur à Marseille. Il avait fait faire son site par un "cousin qui s'y connaît". Le site était joli, les photos donnaient faim, tout allait bien. Sauf qu'il venait de recevoir une mise en demeure. Son site n'avait pas de mentions légales. Pas de politique de confidentialité. Pas de bandeau cookies. Rien. En 2026, c'est le genre de truc qui peut vous coûter très cher.

Alors on va faire simple. Voici les 10 points à vérifier sur votre site. Si vous cochez pas tout, vous êtes en infraction. Et non, c'est pas du blabla de juriste — c'est du concret qui peut vous tomber dessus.

## 1. Les mentions légales — le truc que tout le monde oublie

C'est la loi (LCEN pour les intimes). Tout site édité en France doit afficher ses mentions légales. Accessible depuis n'importe quelle page, généralement en bas dans le footer.

Concrètement, qu'est-ce qu'il faut mettre dedans ? Si vous êtes auto-entrepreneur ou société : votre nom ou raison sociale, votre adresse, votre numéro SIRET, et les coordonnées de votre hébergeur. C'est tout. C'est pas compliqué, mais faut le faire.

Le truc qui énerve c'est que la majorité des sites de petits artisans n'ont tout simplement pas de page de mentions légales. Et personne leur dit. Jusqu'au jour où quelqu'un le signale.

## 2. Le bandeau cookies — non, le petit "j'accepte" suffit pas

Depuis que la CNIL a serré la vis, c'est devenu un vrai sujet. Si vous utilisez Google Analytics (et vous devriez), vous déposez un cookie de traçage sur le navigateur de vos visiteurs. Et ça, vous avez pas le droit de le faire sans demander la permission.

Les règles sont claires. Le visiteur doit pouvoir refuser aussi facilement qu'accepter. Pas de bouton "Accepter" bien gros et un "Refuser" planqué en gris clair en bas à gauche. Les deux boutons doivent être au même niveau. Et le silence — genre le mec qui scrolle sans cliquer — ça vaut pas consentement.

Je sais, c'est chiant. Mais c'est la loi. Et une amende CNIL, c'est entre 2% et 4% de votre chiffre d'affaires. Autant dire que ça douille.

## 3. La politique de confidentialité — le RGPD c'est pas que pour les gros

Beaucoup d'artisans pensent que le RGPD c'est un truc de Google ou de Facebook. Pas du tout. Dès que vous collectez un nom, un email, un numéro de téléphone via un formulaire de contact, vous traitez des données personnelles. Et le RGPD s'applique.

Vous devez avoir une page "Politique de confidentialité" qui explique en langage normal ce que vous faites des données. Pourquoi vous les collectez (pour répondre à une demande de devis, par exemple). Combien de temps vous les gardez. Qui y a accès. Et comment le visiteur peut demander leur suppression.

C'est pas un roman à écrire. Une page d'une vingtaine de lignes suffit largement pour un site vitrine d'artisan.

## 4. Vos formulaires — arrêtez de demander la date de naissance

Le principe de minimisation, c'est le mot barbare pour dire : ne demandez que ce dont vous avez réellement besoin. Votre formulaire de devis a besoin du nom, de l'email ou du téléphone, et du message. Point.

Pas besoin de la date de naissance. Pas besoin de l'adresse postale complète (sauf si c'est pertinent pour votre intervention). Et surtout, pas de case pré-cochée "Je souhaite recevoir la newsletter". C'est interdit.

Autre truc important : sous chaque formulaire, mettez une petite ligne du genre "Vos données sont utilisées uniquement pour répondre à votre demande. Consultez notre politique de confidentialité." Avec un lien vers ladite politique. Voilà, c'est fait, vous êtes dans les clous.

## 5. Les CGV — obligatoires si vous vendez en ligne

Si vous vendez des produits ou des services directement sur votre site, vous devez avoir des Conditions Générales de Vente. C'est le contrat entre vous et votre client.

Ça doit couvrir le prix, les modalités de paiement et de livraison, le droit de rétractation de 14 jours (pour les particuliers), et les garanties légales. Si vous vendez pas en ligne — si votre site sert juste de vitrine — les CGV sont pas obligatoires. Mais c'est quand même bien de les avoir.

## 6. L'accessibilité — le sujet dont personne parle

Rendre votre site accessible aux personnes en situation de handicap, c'est pas juste un truc sympa à faire. C'est de plus en plus encadré par la loi, notamment avec le RGAA en France.

En pratique pour un site d'artisan, ça veut dire quoi ? Des textes alternatifs sur vos images (le petit texte qui décrit l'image pour les lecteurs d'écran). Un contraste suffisant entre votre texte et votre fond (pas de gris clair sur blanc, par pitié). Et la possibilité de naviguer au clavier, pas seulement à la souris.

Honnêtement, la plupart des sites d'artisans sont pas aux normes d'accessibilité. Mais c'est un sujet qui monte, et les sanctions vont tomber tôt ou tard. Autant s'y mettre maintenant.

## 7. Les images — non vous pouvez pas prendre n'importe quoi sur Google

Ça c'est le classique. Le mec qui fait son site, il va sur Google Images, il tape "plombier travail", il prend la première photo qui lui plaît. Sauf que cette photo appartient à quelqu'un. Et l'utiliser sans autorisation, c'est de la contrefaçon.

La solution ? Utilisez vos propres photos. Prenez votre téléphone, photographiez vos chantiers, vos réalisations, votre atelier. C'est mieux pour votre crédibilité ET c'est légal. Sinon, il existe des banques d'images gratuites comme Unsplash ou Pexels.

Même chose pour les polices de caractères. Si vous utilisez une police spéciale sur votre site, vérifiez que vous avez la licence web. Google Fonts est gratuit et légal, utilisez ça.

## 8. La médiation — le truc que personne met

Si vous vendez à des particuliers, vous devez obligatoirement indiquer les coordonnées d'un médiateur de la consommation sur votre site. C'est le professionnel neutre vers lequel votre client peut se tourner en cas de litige.

Concrètement, c'est une ligne dans vos CGV ou vos mentions légales avec le nom et le site web du médiateur. Vous pouvez en trouver un via la liste officielle du ministère de l'Économie. C'est pas le truc le plus excitant du monde mais c'est obligatoire.

## 9. Le HTTPS — si votre site est encore en HTTP, on a un problème

En 2026, un site sans certificat SSL (le petit cadenas dans la barre d'adresse), c'est plus possible. D'abord parce que Google pénalise les sites non sécurisés dans ses résultats de recherche. Ensuite parce que les navigateurs affichent un gros avertissement "Site non sécurisé" qui fait fuir les visiteurs. Et enfin parce que le RGPD impose de sécuriser les données que vous collectez.

Avec un bon hébergeur, le certificat SSL est inclus et s'active en un clic. Il y a vraiment aucune raison de pas l'avoir.

Tant qu'on parle de sécurité : mettez un mot de passe solide sur votre interface d'administration. Pas "admin123" ou le nom de votre chien. Un vrai mot de passe avec des majuscules, des chiffres, des caractères spéciaux. Et activez la double authentification si c'est possible.

## 10. Les droits des utilisateurs — ils peuvent vous demander de tout supprimer

Vos visiteurs ont des droits sur leurs données. Ils peuvent vous demander d'accéder à ce que vous avez sur eux, de le corriger, ou de tout effacer. C'est ce qu'on appelle le droit à l'oubli.

En pratique, mettez une adresse email de contact pour ces demandes dans votre politique de confidentialité. Quelque chose comme contact@votresite.fr. Et précisez que le visiteur peut aussi porter réclamation auprès de la CNIL s'il estime que ses droits ne sont pas respectés.

## Le mot de la fin

Je sais que tout ça peut sembler lourd. Mais la réalité c'est que 90% du boulot se fait une seule fois, à la création du site. Mentions légales, politique de confidentialité, bandeau cookies, formulaires propres — quand c'est bien fait dès le départ, vous avez plus à y toucher.

C'est exactement pour ça que quand on crée un site chez Site Minute, tout est inclus d'office. On va pas vous livrer un site joli mais illégal. Le juridique fait partie du package, parce qu'un site qui respecte pas la loi, c'est un site qui vous met en danger.` }
];

export default function App() {
  const [m, setM] = useState(false);
  const [sel, setSel] = useState([]);
  const [cgv, setCgv] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [cookieConsent, setCookieConsent] = useState(() => {
    try { return window.sessionStorage?.getItem("cookie_consent"); } catch(e) { return null; }
  });

  const acceptCookies = () => {
    setCookieConsent("accepted");
    try { window.sessionStorage?.setItem("cookie_consent", "accepted"); } catch(e) {}
  };
  const refuseCookies = () => {
    setCookieConsent("refused");
    try { window.sessionStorage?.setItem("cookie_consent", "refused"); } catch(e) {}
    try { window['ga-disable-G-6T2955EZ45'] = true; } catch(e) {}
  };
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
    const featured = BLOG_FULL[0];
    const rest = BLOG_FULL.slice(1);
    return (
      <div style={{ minHeight: "100vh", background: "#f8fafc", color: "#0f172a", fontFamily: "'Inter', -apple-system, sans-serif" }}>
        {/* Nav */}
        <div style={{ background: "#fff", borderBottom: "1px solid #f1f5f9", position: "sticky", top: 0, zIndex: 10 }}>
          <div style={{ maxWidth: 1000, margin: "0 auto", padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div onClick={() => setPage("home")} style={{ fontSize: 22, fontWeight: 900, cursor: "pointer" }}>Site <span style={{ color: "#3b82f6" }}>Minute</span></div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setPage("home")} style={{ background: "none", border: "1px solid #e2e8f0", color: "#64748b", padding: "7px 16px", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>← Accueil</button>
              <button onClick={() => go("contact")} style={{ background: "#3b82f6", color: "#fff", border: "none", padding: "7px 16px", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Devis gratuit</button>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: 1000, margin: "0 auto", padding: m ? "32px 16px 60px" : "48px 20px 80px" }}>
          {/* Header */}
          <div style={{ marginBottom: 40 }}>
            <h1 style={{ fontSize: m ? 30 : 42, fontWeight: 900, margin: "0 0 10px" }}>Le blog</h1>
            <p style={{ fontSize: 16, color: "#64748b", margin: 0, maxWidth: 500 }}>Conseils concrets pour développer votre activité grâce au web. Pas de blabla, que du pratique.</p>
          </div>

          {/* Featured article */}
          <div onClick={() => { setSelectedArticle(featured); setPage("article"); }} style={{ display: "grid", gridTemplateColumns: m ? "1fr" : "1fr 1fr", background: "#fff", borderRadius: 20, overflow: "hidden", cursor: "pointer", marginBottom: 32, boxShadow: "0 1px 3px rgba(0,0,0,0.04)", transition: "all 0.3s" }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 8px 30px rgba(59,130,246,0.08)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.04)"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            <div style={{ background: featured.image ? `url(${featured.image}) center/cover` : "#e2e8f0", minHeight: m ? 200 : 300 }} />
            <div style={{ padding: m ? 24 : 36, display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 14 }}>
                <span style={{ background: featured.bg, color: featured.color, padding: "4px 12px", borderRadius: 6, fontSize: 12, fontWeight: 600 }}>{featured.tag}</span>
                <span style={{ fontSize: 13, color: "#94a3b8" }}>{featured.readTime}</span>
              </div>
              <h2 style={{ fontSize: m ? 22 : 26, fontWeight: 900, margin: "0 0 12px", lineHeight: 1.25 }}>{featured.title}</h2>
              <p style={{ fontSize: 14, color: "#64748b", margin: "0 0 16px", lineHeight: 1.6 }}>{featured.content.substring(0, 180).trim()}...</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 13, color: "#94a3b8" }}>{featured.date}</span>
                <span style={{ fontSize: 14, color: "#3b82f6", fontWeight: 700 }}>Lire l'article →</span>
              </div>
            </div>
          </div>

          {/* Grid */}
          <div style={{ display: "grid", gridTemplateColumns: m ? "1fr" : "repeat(2, 1fr)", gap: 20 }}>
            {rest.map((article) => (
              <div key={article.id} onClick={() => { setSelectedArticle(article); setPage("article"); }} style={{ background: "#fff", borderRadius: 16, overflow: "hidden", cursor: "pointer", boxShadow: "0 1px 3px rgba(0,0,0,0.04)", transition: "all 0.3s" }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 8px 30px rgba(59,130,246,0.08)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.04)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div style={{ background: article.image ? `url(${article.image}) center/cover` : "#e2e8f0", height: 180 }} />
                <div style={{ padding: 22 }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 12 }}>
                    <span style={{ background: article.bg, color: article.color, padding: "3px 10px", borderRadius: 6, fontSize: 11, fontWeight: 600 }}>{article.tag}</span>
                    <span style={{ fontSize: 12, color: "#94a3b8" }}>{article.readTime}</span>
                  </div>
                  <h3 style={{ fontSize: 17, fontWeight: 800, margin: "0 0 10px", lineHeight: 1.35 }}>{article.title}</h3>
                  <p style={{ fontSize: 13, color: "#94a3b8", margin: "0 0 14px", lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{article.content.substring(0, 120).trim()}...</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 12, color: "#cbd5e1" }}>{article.date}</span>
                    <span style={{ fontSize: 13, color: "#3b82f6", fontWeight: 600 }}>Lire →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA bottom */}
          <div style={{ background: "#0f172a", borderRadius: 20, padding: m ? 28 : 40, textAlign: "center", marginTop: 40 }}>
            <h3 style={{ color: "#fff", fontSize: 22, fontWeight: 800, margin: "0 0 8px" }}>Prêt à être visible sur Google ?</h3>
            <p style={{ color: "#94a3b8", fontSize: 14, margin: "0 0 20px" }}>Votre site pro à partir de 399€, livré en 48h.</p>
            <button onClick={() => { setPage("home"); setTimeout(() => go("contact"), 100); }} className="btn-glow" style={{ background: "#3b82f6", color: "#fff", border: "none", padding: "14px 32px", borderRadius: 10, fontSize: 16, fontWeight: 700, cursor: "pointer" }}>Demander un devis gratuit</button>
          </div>
        </div>
      </div>
    );
  }

  // ARTICLE PAGE
  if (page === "article" && selectedArticle) {
    const otherArticles = BLOG_FULL.filter(a => a.id !== selectedArticle.id).slice(0, 3);
    return (
      <div style={{ minHeight: "100vh", background: "#fff", color: "#0f172a", fontFamily: "'Inter', -apple-system, sans-serif" }}>
        {/* Hero image */}
        {selectedArticle.image && (
          <div style={{ width: "100%", height: m ? 220 : 360, background: `linear-gradient(to bottom, rgba(15,23,42,0.3), rgba(15,23,42,0.7)), url(${selectedArticle.image}) center/cover`, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: m ? "20px" : "40px" }}>
            <div style={{ maxWidth: 700, margin: "0 auto", width: "100%" }}>
              <span style={{ background: selectedArticle.bg, color: selectedArticle.color, padding: "4px 12px", borderRadius: 6, fontSize: 12, fontWeight: 600 }}>{selectedArticle.tag}</span>
              <h1 style={{ fontSize: m ? 24 : 36, fontWeight: 900, color: "#fff", margin: "12px 0 8px", lineHeight: 1.15 }}>{selectedArticle.title}</h1>
              <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>{selectedArticle.date}</span>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>{selectedArticle.readTime} de lecture</span>
              </div>
            </div>
          </div>
        )}
        {/* Nav */}
        <div style={{ borderBottom: "1px solid #f1f5f9", position: "sticky", top: 0, background: "#fff", zIndex: 10 }}>
          <div style={{ maxWidth: 700, margin: "0 auto", padding: "12px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div onClick={() => setPage("home")} style={{ fontSize: 20, fontWeight: 900, cursor: "pointer" }}>Site <span style={{ color: "#3b82f6" }}>Minute</span></div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setPage("blog")} style={{ background: "none", border: "1px solid #e2e8f0", color: "#64748b", padding: "6px 14px", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>← Blog</button>
              <button onClick={() => { if (navigator.share) { navigator.share({ title: selectedArticle.title, url: "https://siteminute.fr/blog/" + selectedArticle.id }); } else { navigator.clipboard.writeText("https://siteminute.fr/blog/" + selectedArticle.id); alert("Lien copié !"); } }} style={{ background: "none", border: "1px solid #e2e8f0", color: "#64748b", padding: "6px 14px", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Partager</button>
            </div>
          </div>
        </div>
        {/* Content */}
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "32px 20px 20px" }}>
          {!selectedArticle.image && (
            <div>
              <span style={{ background: selectedArticle.bg, color: selectedArticle.color, padding: "4px 12px", borderRadius: 6, fontSize: 12, fontWeight: 600 }}>{selectedArticle.tag}</span>
              <h1 style={{ fontSize: m ? 26 : 36, fontWeight: 900, margin: "12px 0 8px", lineHeight: 1.15 }}>{selectedArticle.title}</h1>
              <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
                <span style={{ fontSize: 13, color: "#94a3b8" }}>{selectedArticle.date}</span>
                <span style={{ fontSize: 13, color: "#94a3b8" }}>{selectedArticle.readTime}</span>
              </div>
            </div>
          )}
          <article style={{ fontSize: 15, lineHeight: 1.9 }}>{renderMarkdown(selectedArticle.content)}</article>
        </div>
        {/* CTA */}
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 20px 32px" }}>
          <div style={{ background: "linear-gradient(135deg, #0f172a, #1e293b)", borderRadius: 20, padding: m ? 28 : 40, display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 200 }}>
              <h3 style={{ color: "#fff", fontSize: 22, fontWeight: 800, margin: "0 0 8px" }}>Besoin d'un site ?</h3>
              <p style={{ color: "#94a3b8", fontSize: 14, margin: 0, lineHeight: 1.6 }}>À partir de 399€, livré en 48h. Paiement à la livraison uniquement.</p>
            </div>
            <button onClick={() => { setPage("home"); setTimeout(() => go("contact"), 100); }} className="btn-glow" style={{ background: "#3b82f6", color: "#fff", border: "none", padding: "14px 28px", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}>Devis gratuit →</button>
          </div>
        </div>
        {/* Articles similaires */}
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 20px 60px" }}>
          <h3 style={{ fontSize: 20, fontWeight: 800, margin: "0 0 16px" }}>À lire aussi</h3>
          <div style={{ display: "grid", gridTemplateColumns: m ? "1fr" : "repeat(3, 1fr)", gap: 12 }}>
            {otherArticles.map((a) => (
              <div key={a.id} onClick={() => { setSelectedArticle(a); window.scrollTo(0, 0); }} style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 12, padding: 16, cursor: "pointer", transition: "all 0.2s" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#3b82f6"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e2e8f0"; }}
              >
                <span style={{ background: a.bg, color: a.color, padding: "2px 8px", borderRadius: 4, fontSize: 10, fontWeight: 600 }}>{a.tag}</span>
                <h4 style={{ fontSize: 14, fontWeight: 700, margin: "8px 0 0", lineHeight: 1.4 }}>{a.title}</h4>
              </div>
            ))}
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
          {!m && <><span onClick={() => setPage("blog")} style={{ fontSize: 14, color: "#64748b", cursor: "pointer" }}>Blog</span><span onClick={() => setShowRdv(true)} style={{ color: "#64748b", fontSize: 14, cursor: "pointer" }}>RDV</span></>}
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
          {[{ v: "48h", l: "Délai de livraison" }, { v: "399€", l: "À partir de" }, { v: "100%", l: "Adapté mobile" }, { v: "29€/mois", l: "Maintenance tout inclus" }].map((s, i) => (
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
          <div style={{ display: "grid", gridTemplateColumns: m ? "1fr" : "repeat(4, 1fr)", gap: 16 }}>
            {PLANS.map((plan, i) => (
              <div key={i} className="plan-fx" style={{ background: plan.highlight ? "#0f172a" : "#fff", border: plan.orange ? "2px solid #f97316" : plan.highlight ? "2px solid #3b82f6" : "1px solid #e2e8f0", borderRadius: 20, padding: 32, position: "relative", display: "flex", flexDirection: "column" }}>
                {plan.highlight && <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: "#3b82f6", color: "#fff", padding: "4px 16px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>Le + choisi</div>}
                <div style={{ fontSize: 14, fontWeight: 600, color: "#3b82f6", marginBottom: 6 }}>{plan.name}</div>
                <div style={{ fontSize: 40, fontWeight: 900, color: plan.highlight ? "#fff" : "#0f172a", marginBottom: 4 }}>{plan.price ? <>{plan.orange && <span style={{ fontSize: 13, fontWeight: 500, display: "block", marginBottom: -4, color: "#f97316" }}>à partir de</span>}{plan.price}<span style={{ fontSize: 18, fontWeight: 500 }}>{"€"}</span></> : "Sur devis"}</div>
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
            <h3 style={{ fontSize: 22, fontWeight: 800, margin: "0 0 8px" }}>Maintenance tout inclus — 29{"€"}/mois</h3>
            <p style={{ fontSize: 14, color: "#64748b", margin: 0, lineHeight: 1.6 }}>Hébergement, nom de domaine, mises à jour, Google Analytics, support email. Concentrez-vous sur votre métier.</p>
          </div>
          <div style={{ background: "#0f172a", color: "#fff", padding: "20px 32px", borderRadius: 14, textAlign: "center" }}>
            <div style={{ fontSize: 36, fontWeight: 900 }}>29{"€"}</div>
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

      {/* COOKIE BANNER */}
      {!cookieConsent && (
        <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 998, background: "#0f172a", borderTop: "1px solid #1e293b", padding: m ? "16px" : "20px 32px", boxShadow: "0 -4px 20px rgba(0,0,0,0.2)" }}>
          <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", gap: m ? 12 : 24, flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 250 }}>
              <p style={{ fontSize: 13, color: "#cbd5e1", margin: "0 0 4px", lineHeight: 1.6 }}>
                Ce site utilise des cookies pour mesurer l'audience via Google Analytics. Aucune donnée personnelle n'est vendue ou partagée.
              </p>
              <button onClick={() => setCgv(true)} style={{ background: "none", border: "none", color: "#64748b", fontSize: 11, cursor: "pointer", textDecoration: "underline", padding: 0, fontFamily: "inherit" }}>En savoir plus</button>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={refuseCookies} style={{ background: "transparent", border: "1px solid #334155", color: "#94a3b8", padding: "10px 20px", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Refuser</button>
              <button onClick={acceptCookies} style={{ background: "#3b82f6", border: "none", color: "#fff", padding: "10px 20px", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Accepter</button>
            </div>
          </div>
        </div>
      )}

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
            <p>L'abonnement maintenance à 29€/mois est optionnel et sans engagement. Il comprend hébergement, nom de domaine, mises à jour, analytics et support.</p>
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
