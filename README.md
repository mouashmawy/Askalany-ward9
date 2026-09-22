# Mohamed Askalany for Ward 9

Responsive multi-page campaign website for Mohamed Askalany, candidate for Kitchener City Council in Ward 9.

## Pages

- `index.html` — complete campaign overview and nine strategic pillar titles
- `meet-mohamed.html` — biography, experience, credentials, and values
- `priorities-1.html` — photo-led editorial priorities layout
- `priorities-2.html` — redirects to the main priorities page
- `ward-9.html` — Ward 9 context, jurisdiction guide, and official resources
- `vote.html` — election date, eligibility, advance voting, and Ward 9 voting locations
- `get-involved.html` — volunteer, sign request, and campaign update forms
- `contact.html` — issues, ideas, event invitations, and media inquiries
- `donate.html` — contribution instructions using Interac e-Transfer
- `thank-you.html` — form confirmation page

## Shared files

- `styles.css` — responsive visual system
- `script.js` — shared navigation, footer, and mobile menu
- `priorities-data.js` — nine pillars and complete action-plan content used by both priority layouts
- `images/Askalany Logo.webp` — campaign logo

## Forms and deployment

Volunteer, sign request, newsletter, and contact forms are configured for Netlify Forms. After publishing, submit a test response to each form and configure campaign notifications in Netlify.

Campaign contact: `mo@voteaskalany.ca` · `https://voteaskalany.ca`

## Community photo gallery
The homepage includes the Globe version in its community section. The unlisted preview is at `globe.html` (not in navigation). Choose Globe, Orbit, or Photo wall; select any image for the full-size viewer. Three contribution button concepts appear below the gallery.
Add or remove images in `images/globe/`, then run `node generate-globe-manifest.js` for local previews. Netlify runs this automatically on each deployment. Any photo count and common web image filenames are supported.
Donations now use Interac e-Transfer instructions; receipt details are sent by email. No payment or personal details are collected by client-side code.
