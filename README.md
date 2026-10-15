# Alcazaba Beach · Owners' area mockup

Static HTML mockup of the owners' area. Open `index.html` in a browser to start at the sign-in page; every button and link moves between the pages.

## Pages

| File | Screen |
| --- | --- |
| `index.html` | Sign in |
| `home.html` | Owner's home |
| `documents.html` | Newsletters and AGM results (`?tab=agm` opens the AGM tab) |
| `chat.html` | Office chat (assistant first, office takes over) |
| `community.html` | Community wall, moderated by the office |
| `coming-soon.html` | Placeholder for screens not designed yet (`?page=orders`, `restaurant`, `account`, `app`, `download`, `archive`, `conversation`, `forgot`) |

## Shared files

- `assets/css/styles.css`: all styles. Colours and fonts are set once at the top under `:root`.
- `assets/js/app.js`: language switch, Documents tabs, the phone "More" menu and the coming-soon page.
- `assets/js/i18n.js`: Spanish copy. English is written in the HTML; each translated element has a `data-i18n` key that matches an entry here.

## Notes

- Pages are responsive: below 760px wide the header menu becomes a bottom tab bar.
- The EN/ES choice is remembered across pages (and carried in the link as `?lang=es`).
- Posts and chat messages written by owners or staff stay in the language they were written in.
- Text in [brackets] is placeholder content to replace with real details.
- Fonts load from Google Fonts, so they need an internet connection; everything else works offline.
