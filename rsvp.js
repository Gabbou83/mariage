/* ============================================================
   RSVP — logique partagée par les styles d'invitation
   ------------------------------------------------------------
   Le formulaire envoie les réponses dans un Google Form (gratuit,
   illimité, résultats dans un Google Sheet que vous contrôlez).

   ➜ POUR L'ACTIVER : remplissez le bloc RSVP_CONFIG ci-dessous.
     Voir README.md (section « Brancher Google Forms ») pour la marche
     à suivre détaillée.

   Tant que la configuration n'est pas remplie, le formulaire
   fonctionne en MODE APERÇU : il affiche le message de remerciement
   sans rien envoyer.

   Les valeurs envoyées à Google Forms restent TOUJOURS en français
   (peu importe la langue affichée), pour des résultats uniformes.
   ============================================================ */

const RSVP_CONFIG = {
  // 1) Lien d'envoi du formulaire Google. Doit se terminer par « /formResponse ».
  formActionUrl: "https://docs.google.com/forms/d/e/1FAIpQLSe5DDVcg5HlF7gbcgFyY6pL0dv-lsKbEue9w3sKSIQVHMDv0w/formResponse",

  // 2) Identifiants « entry.XXXX » de chaque champ du Google Form.
  fields: {
    nom:            "entry.1313786754",
    accompagnement: "entry.138877916",
    presence:       "entry.1088954764",
    message:        "entry.1158913929"
  },

  // 3) Les valeurs DOIVENT correspondre EXACTEMENT au texte des choix
  //    du champ « Votre réponse » dans le Google Form.
  presenceValues: {
    confirme: "Je confirme ma présence",
    peutetre: "Peut-être",
    decline:  "Je dois malheureusement décliner"
  }
};

/* --- Textes localisés du formulaire (fr / en / uk) ---------- */
const RSVP_L10N = {
  fr: {
    needName:   "Merci d'inscrire votre nom.",
    needChoice: "Merci de choisir votre réponse.",
    sending:    "Envoi…",
    thanks: {
      confirme: "Quelle joie ! On a hâte de célébrer avec vous. 💛",
      peutetre: "Merci ! Tenez-nous au courant dès que possible.",
      decline:  "Merci de nous l'avoir dit. Vous nous manquerez."
    }
  },
  en: {
    needName:   "Please enter your name.",
    needChoice: "Please choose your response.",
    sending:    "Sending…",
    thanks: {
      confirme: "Wonderful! We can't wait to celebrate with you. 💛",
      peutetre: "Thank you! Let us know as soon as you can.",
      decline:  "Thank you for telling us. We'll miss you."
    }
  },
  uk: {
    needName:   "Будь ласка, впишіть своє ім'я.",
    needChoice: "Будь ласка, оберіть відповідь.",
    sending:    "Надсилання…",
    thanks: {
      confirme: "Яка радість! Не можемо дочекатися свята з вами. 💛",
      peutetre: "Дякуємо! Повідомте нам, щойно зможете.",
      decline:  "Дякуємо, що сказали. Нам вас бракуватиме."
    }
  }
};

function rsvpLang() {
  var l = (document.documentElement.lang || "fr").slice(0, 2).toLowerCase();
  return RSVP_L10N[l] ? l : "fr";
}

/* ------------------------------------------------------------ */

function rsvpIsConfigured() {
  return (
    RSVP_CONFIG.formActionUrl.indexOf("docs.google.com") !== -1 &&
    RSVP_CONFIG.formActionUrl.indexOf("/formResponse") !== -1
  );
}

function initRsvp() {
  const form = document.querySelector("[data-rsvp-form]");
  if (!form) return;

  const status = form.querySelector("[data-rsvp-status]");
  const submitBtn = form.querySelector("[data-rsvp-submit]");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const L = RSVP_L10N[rsvpLang()];

    const nom = (form.elements["nom"] || {}).value || "";
    const presence = (form.querySelector('input[name="presence"]:checked') || {}).value;

    if (!nom.trim()) {
      showStatus(status, L.needName, "error");
      return;
    }
    if (!presence) {
      showStatus(status, L.needChoice, "error");
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = L.sending;
    }

    const done = function () {
      revealThankYou(form, presence);
    };

    if (!rsvpIsConfigured()) {
      console.info("[RSVP] Mode aperçu : configurez RSVP_CONFIG dans rsvp.js pour activer l'envoi réel.");
      window.setTimeout(done, 600);
      return;
    }

    const data = new FormData();
    data.append(RSVP_CONFIG.fields.nom, nom);
    data.append(RSVP_CONFIG.fields.accompagnement, (form.elements["accompagnement"] || {}).value || "");
    data.append(RSVP_CONFIG.fields.message, (form.elements["message"] || {}).value || "");
    data.append(RSVP_CONFIG.fields.presence, RSVP_CONFIG.presenceValues[presence] || presence);

    fetch(RSVP_CONFIG.formActionUrl, { method: "POST", mode: "no-cors", body: data })
      .then(done)
      .catch(done);
  });
}

function showStatus(node, message, kind) {
  if (!node) return;
  node.textContent = message;
  node.setAttribute("data-kind", kind || "info");
}

function revealThankYou(form, presence) {
  const card = form.closest("[data-rsvp-card]") || form;
  const thanks = document.querySelector("[data-rsvp-thanks]");
  const messages = RSVP_L10N[rsvpLang()].thanks;

  if (thanks) {
    const line = thanks.querySelector("[data-rsvp-thanks-line]");
    if (line) line.textContent = messages[presence] || "";
    form.setAttribute("hidden", "");
    thanks.removeAttribute("hidden");
    thanks.scrollIntoView({ behavior: "smooth", block: "center" });
  } else {
    card.innerHTML = "<p style='text-align:center'>" + (messages[presence] || "Merci !") + "</p>";
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initRsvp);
} else {
  initRsvp();
}
