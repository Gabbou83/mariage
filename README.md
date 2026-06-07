# Invitation de mariage — Yuliia & Gabriel

Page web d'invitation + RSVP, à héberger gratuitement sur **GitHub Pages**.
Mariage : **samedi 11 juillet 2026 — cérémonie à 11 h 00** (arrivée vers 10 h 15),
au chalet familial Boutin (Sainte-Sabine).

- Style **Champêtre**, **trilingue** (Français / English / Українська) avec sélecteur en haut.
  La langue s'affiche automatiquement selon le navigateur de l'invité (français par défaut)
  et reste modifiable d'un clic (le choix est mémorisé).
- Le formulaire RSVP envoie les réponses dans un **Google Form → Google Sheet**.
  Quelle que soit la langue affichée, les valeurs arrivent **en français** (résultats uniformes).
- ✅ Google Forms est **déjà branché et testé** (réponses confirmées dans le Sheet).

## Les fichiers
| Fichier | Rôle |
|---|---|
| `index.html` | L'invitation (page d'accueil). |
| `rsvp.js` | Logique du formulaire RSVP + configuration Google Forms (`RSVP_CONFIG`). |
| `README.md` | Ce document. |

---

## Voir la page en local
Double-cliquez sur `index.html`. Pour un rendu identique à la version en ligne, servez-la
plutôt via un petit serveur : `py -m http.server` puis `http://localhost:8000`.

---

## Mettre en ligne sur GitHub Pages
1. Créez un compte sur <https://github.com> (gratuit) si besoin.
2. **New repository** → nom au choix (ex. `mariage`), visibilité **Public**.
3. **Add file → Upload files** → glissez `index.html` et `rsvp.js` → **Commit changes**.
4. **Settings → Pages** :
   - *Source* : **Deploy from a branch**
   - *Branch* : `main` / `/ (root)` → **Save**
5. ~1 minute plus tard, la page est en ligne à une adresse du type
   `https://VOTRE-NOM.github.io/mariage/`. C'est ce lien qu'on envoie aux invités. 🎉

> 🔁 Pour modifier la page ensuite : re-téléversez le fichier modifié ; GitHub Pages se met à jour seul.

---

## Configuration Google Forms (déjà faite)
Dans `rsvp.js`, le bloc `RSVP_CONFIG` contient le lien d'envoi (`…/formResponse`) et les
identifiants `entry.…` des 4 champs. Les 3 choix de « Votre réponse » doivent rester **identiques
au texte près** à ceux du Google Form :
```
Je confirme ma présence
Peut-être
Je dois malheureusement décliner
```
⚠️ Le formulaire Google doit être **Publié** et **ne pas exiger de connexion** (sinon les envois échouent).

---

## Personnalisations possibles (optionnel)
- **Date limite de réponse** affichée (ex. « Merci de répondre avant le 27 juin »).
- **Adresse exacte + lien Google Maps** du chalet (actuellement « Sainte-Sabine » sans adresse civique).
- **Photo** de vous deux dans l'en-tête.
- **Contact** (courriel/téléphone) pour les questions des invités.
