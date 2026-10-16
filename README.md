# Alcazaba Beach · Owners' area mockup

Static HTML mockup of the owners' area. Open `index.html` in a browser to start at the sign-in page; every button and link moves between the pages.

The visual style (colours, Fraunces and Inter type, dark page header with a wave edge, gold labels, pill buttons, dark footer) follows Mr. Theyskens' website draft of 23 September 2026. The pages and how they link together are unchanged.

Live preview: https://patrick-munnelly.github.io/alcazaba-owner-preview/ (rebuilt from `main` on every push).

## Pages

| File | Screen |
| --- | --- |
| `index.html` | Sign in |
| `home.html` | Owner's home |
| `documents.html` | Newsletters and AGM results (`?tab=agm` opens the AGM tab) |
| `chat.html` | Office chat (assistant first, office takes over) |
| `community.html` | Community wall, moderated by the office |
| `account.html` | Your account (template owner: John Doe, Block A · Apartment 12) |
| `coming-soon.html` | Placeholder for screens not designed yet (`?page=orders`, `app`, `download`, `archive`, `conversation`, `forgot`, `password`) |

## Shared files

- `assets/css/styles.css`: all styles. Colours and fonts are set once at the top under `:root`, taken from the website draft.
- `assets/js/app.js`: language switch, Documents tabs, the phone "More" menu, the coming-soon page, the header that turns white on scroll and the cards that fade in.
- `assets/img/al_beach_logo.png`: the Alcazaba Beach logo used in the header, the footer and on the sign-in page.
- `assets/js/i18n.js`: Spanish copy. English is written in the HTML; each translated element has a `data-i18n` key that matches an entry here.

## Notes

- Pages are responsive: below 760px wide the header menu becomes a bottom tab bar.
- The office address, phone numbers and e-mail in the footer and on the sign-in page come from the website draft.
- Cards fade in as they scroll into view, except for visitors who have reduced motion turned on.
- The EN/ES choice is remembered across pages (and carried in the link as `?lang=es`).
- Posts and chat messages written by owners or staff stay in the language they were written in.
- Text in [brackets] is placeholder content to replace with real details.
- Fonts load from Google Fonts, so they need an internet connection; everything else works offline.
