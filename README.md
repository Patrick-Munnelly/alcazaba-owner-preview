# Alcazaba Beach · Owners' area mockup

Static HTML mockup of the owners' area. Open `index.html` in a browser to start at the sign-in page; every button and link moves between the pages.

The visual style (colours, Fraunces and Inter type, dark page header with a wave edge, gold labels, pill buttons, dark footer) follows Mr. Theyskens' website draft of 23 September 2026. The pages and how they link together are unchanged.

Live preview: https://patrick-munnelly.github.io/alcazaba-owner-preview/ (rebuilt from `main` on every push).

## Pages

| File | Screen |
| --- | --- |
| `index.html` | Sign in |
| `home.html` | Owner's home, with the latest news |
| `news.html` | News: announcements from the Board and the office |
| `documents.html` | Official documents, newsletters and AGM results (`?tab=newsletters` or `?tab=agm` opens those tabs) |
| `information.html` | Office contacts and hours, community rules, bookings, lost and found, emergency numbers, the Board and the office team |
| `chat.html` | Office chat (assistant first, office takes over) |
| `community.html` | Community wall for owners: the office approves every post and reply before it appears |
| `account.html` | Your account (template owner: John Doe, Block 12 · Apartment 12) |
| `coming-soon.html` | Placeholder for screens not designed yet (`?page=orders`, `app`, `download`, `archive`, `conversation`, `forgot`, `password`, `news`, `newsarchive`) |

## Shared files

- `assets/css/styles.css`: all styles. Colours and fonts are set once at the top under `:root`, taken from the website draft.
- `assets/js/app.js`: language switch, Documents tabs, the phone "More" menu, the coming-soon page, the header that turns white on scroll and the cards that fade in.
- `assets/img/al_beach_logo.png`: the Alcazaba Beach logo used in the header, the footer and on the sign-in page.
- `assets/js/i18n.js`: Spanish copy. English is written in the HTML; each translated element has a `data-i18n` key that matches an entry here.

## Notes

- Pages are responsive: at 1024px wide and below, the header menu becomes a bottom tab bar (News, Information, Orders and the account sit under "More").
- Following the client's feedback on Luc's draft (November 2026): no fiscal or bank details, no private Board Wall, and no profiles for tenants (only owners have accounts). The community wall takes no classifieds, sales or local business offers. Formal complaints, incidents and works requests go by email to admin@alcazababeach.com; the office chat is for quick questions.
- The office address, phone numbers and e-mail in the footer and on the sign-in page come from the website draft.
- Cards fade in as they scroll into view, except for visitors who have reduced motion turned on.
- The EN/ES choice is remembered across pages (and carried in the link as `?lang=es`).
- Posts and chat messages written by owners or staff stay in the language they were written in.
- Text in [brackets] is placeholder content to replace with real details.
- Fonts load from Google Fonts, so they need an internet connection; everything else works offline.
- Every page links the CSS and JS with `?v=<date>`. When you change `styles.css`, `app.js` or `i18n.js`, update that date on all pages so browsers fetch the new files instead of a cached copy.
