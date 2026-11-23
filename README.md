# SALT Electrical — website

A single-page static site in plain HTML, compiled Tailwind CSS v3 and vanilla JS. No frameworks and no runtime CDNs.

```
index.html              the page; sections are separated by big comment banners
thanks.html             shown after the quote form is sent (the house lights up)
404.html                not-found page (the house starts with the power off)
assets/css/styles.css   compiled Tailwind (committed; rebuild with npm run build)
assets/js/main.js       menu, header, reveals, hero power-up + main switch, services board, festoon, form
assets/fonts/           self-hosted woff2 files + OFL licences
images/brand/           logo and mark, redrawn as SVG
images/                 favicons, og-image.jpg (1200×630), site.webmanifest
src/input.css           Tailwind source: @font-face, components, keyframes, reduced-motion rules
tailwind.config.js      brand colours (with where each came from), fonts
sitemap.xml, robots.txt
_shots/                 desktop + mobile screenshots for the team (not published)
_fb-pack/               the Facebook source pack (not published)
```

## Brand

| Name | Hex | Used for |
|---|---|---|
| ink | `#151515` | Text, line-art, dark band. From the logo's black slanted panel |
| cream | `#fef5ec` | Page ground. From the logo and banner background |
| cream-deep / paper | `#f5e7d6` / `#fffaf4` | Alternate section ground / board and form panels |
| action | `#fc9606` | Buttons and calls to action only. From the orange "ELECTRICAL" bar |
| steel | `#949492` | Secondary line-art and rules. From the grey fuse caps |
| lamp | `#ffd27d` | Lit bulbs and light beams in the drawings only (derived from the orange) |

- **Fonts:** Red Hat Display (variable, black italic for headings, which echoes the slanted logo lettering), Host Grotesk (body), Chivo Mono (small circuit-style labels and phone numbers). All OFL, from @fontsource.
- **Logo:** redrawn as a clean SVG (`images/brand/salt-electrical-logo.svg`) from the Facebook profile image: same layout, lettering style, fuse and colours. The fuse is simplified to flat shapes. **Ask the client for their original logo file** and swap it in if they have one.
- **Signature idea:** the electrics of a house. The hero is a line drawing of a house cut away to show its rooms; on load the main switch flicks on, the cable runs draw in and the rooms light up one by one (visitors can tap the consumer unit to switch it off and on). The services section is a consumer unit whose breakers are the services. A cable runs on through a divider and the "How a job runs" connectors, festoon bulbs light up in the December band, and the cable ends at a pendant that switches on above the quote form.

## Editing

- **Text:** edit `index.html` directly. Each section has a banner comment.
- **Colours / fonts:** edit `tailwind.config.js`, then run `npm install` (first time) and `npm run build`.
- **Services board:** each breaker is a `<button role="tab">` in `#svcTabs` and points at an `<article role="tabpanel">` by id. To add a service, copy one button and one article, give them new ids, and add the service to the form's `<select>`. The "Ask about…" button's `data-pick` must match an option in the select.
- **Hero drawing:** inline SVG in the hero (`#scene`). Things that light up have the class `glow` or `lit-fill`, and `--d` sets when each one comes on.
- **Gallery / before-after:** not included, because the pack had no job photos (see below). When the client sends photos, add a "Recent work" section with a lightbox. Save photos as WebP at about 1600px plus an `-sm` version at about 800px.

## Going live — checklist

SarniaSites charges a one-time fee and the client owns everything.

- [ ] Client buys their domain in their own name (roughly £10 a year for .com, £30–40 for .gg)
- [ ] Help the client create a free Cloudflare account in their name; connect this repo to Cloudflare Pages on their account (production branch `main`, no build command, output = repo root) and add their domain to the Pages project
- [ ] Swap `https://sarniasites.github.io/salt-electrical/` for the real domain everywhere: canonical, og tags, JSON-LD, sitemap.xml, robots.txt, the form's `_next`
- [ ] Switch the form from the team's email to the client's (`saltelectrical@outlook.com`?) and activate FormSubmit
- [ ] Confirm both phone numbers (07781 111355 and 07781 429689) and the email; ask who answers each number. If they're named people, use their names on the buttons ("Call …")
- [ ] Get the client to sign off the services wording (see assumptions)
- [ ] After December, update or remove the "Now taking bookings for December" tag, the December band and its nav link
- [ ] Ask for job photos, a few customer reviews and the original logo file
- [ ] Optional: transfer the repo to the client's own GitHub if they want it

### Assumptions and what was left out

- The pack is very thin: a bio line ("Domestic and commercial electricians serving Guernsey. Reliable, professional, affordable."), contact details, and one post about December bookings that mentions new lights, extra sockets and "another job around the house". The four services and their bullet lists are built from that. Items such as "single sockets changed to doubles" or "lighting for shops and offices" are reasonable readings that **the client must confirm**.
- No accreditations, insurance, prices, years trading, owner names or parishes were in the pack, so none appear.
- No reviews were on the page, so there is no testimonials section. There were no FAQ-worthy facts, so there is no FAQ.
- No job photos were in the pack. The only images were the logo, the banner (logo plus contact details) and a default placeholder avatar. That is why there is no gallery or before/after, and why the page uses drawings instead.

Source: built from the Facebook pack in `_fb-pack/` (not published on the live site).
