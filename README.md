# Ward 9 Kitchener Campaign Website Starter

This is a responsive static campaign website for a Kitchener Ward 9 municipal election candidate, configured for real form submissions through Netlify Forms.

## Files

- `index.html` - complete homepage
- `styles.css` - responsive visual system
- `script.js` - mobile navigation and demo form handling

## What to replace before launch

1. Candidate name and short name
2. Candidate portrait and community photos
3. Candidate biography
4. Verified experience and credentials
5. Final campaign priorities
6. Official Ward 9 map
7. Official City of Kitchener ward lookup link
8. Official election date and voting information
9. Real endorsements with explicit publishing permission
10. Campaign email and phone
11. Donation link
12. Social media links
13. Newsletter integration
14. Volunteer, sign, contact, and endorsement form integrations
15. Required election advertising authorization wording
16. Privacy policy
17. Accessibility statement
18. Land acknowledgement, if used, after local verification

## Run locally

Open `index.html` directly in a browser, or run a simple local server:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Recommended next development step

Convert the starter to a framework only if you need:
- a CMS
- dynamic campaign updates
- CRM integration
- online donation integration
- form processing
- multilingual content
- analytics
- SEO metadata per page
- separate detailed policy pages

The site is intentionally written so it can later be split into reusable components.


## Publish with working forms

The forms are configured for Netlify Forms. To publish:

1. Create a Netlify account.
2. Add a new site and deploy this folder or connect the Git repository containing it.
3. Once deployed, submit a test form.
4. Open Netlify > your site > Forms to see volunteer, endorsement, contact, and newsletter submissions.
5. In Netlify settings, configure form submission notifications if campaign staff should receive emails.
6. Connect the campaign's custom domain when ready.

No JavaScript demo interception remains. The forms submit normally when hosted on Netlify.
