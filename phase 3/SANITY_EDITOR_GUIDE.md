# Sanity editor guide — Sulyap Homes & Leasing

How to manage the website's listings, agents and neighborhoods without touching code.
The Studio lives at **`/studio`** on the website (for example `http://localhost:3000/studio` while developing). You sign in with the Sanity account that was invited to the project.

> Status: written in Phase 3. The Studio and the connection to the site have **not been run by the author**; follow the first-time checks in section 9 and report anything that looks wrong.

## 1. Draft and publish

- Every change is saved as a **draft** automatically. Drafts are **not** shown on the website.
- Click **Publish** to put a document on the site. The site picks up published changes within about **one minute**.
- To remove a listing from the site entirely, open it and choose **Unpublish**. (Do not delete it unless you are sure.)
- A document with red validation messages cannot be published. Fix the messages first.

## 2. Add a property

1. **Properties → Create new.**
2. **Basics:** title, then **Generate** the web address (it must be unique), choose *For sale* or *For rent*, the property type, availability, and write the overview and full description (blank line between paragraphs).
3. **Price and lease:** enter the price in pesos (for rentals, the **monthly** rent). Rentals also show lease terms.
4. **Specifications:** fill in only what applies. Enter **0** bedrooms for a studio. Residential lots usually need only the lot area.
5. **Location:** the exact address is shown as **text** on the property page only. See section 5 for the map point.
6. **Photos and plans:** upload authentic photographs of this property. Alt text is required (describe what the photo shows). The first photo is the cover. Add floor plans one per level, with the level in the caption.
7. **Area and agent:** choose the neighborhood and the **assigned agent** (required to publish). Optionally offer a backup agent, or send visitors to the contact page, for times the agent is unavailable.
8. **Publish.**

If a listing has no photos yet, the site shows clearly labelled placeholder artwork instead.

**Availability rules:** *Sold* is for sale listings only; *Rented* is for rentals only. The Studio will tell you if they are mixed up.

**Sample listing switch:** only turn this on for fictional listings. It shows a "Sample listing" tag. Leave it off for real ones.

## 3. Agents

- **Agents → Create new.** Add a portrait (4:5 works best, with permission), a short bio, a public email, an optional public phone, and the neighborhoods served.
- The **Cal.com booking link** is the agent's own link for the 30-minute in-person viewing event. It is used when online booking goes live.
- Turn **Active** off to hide an agent everywhere. Inactive agents cannot be chosen for new listings. Reassign their existing listings first.

## 4. Neighborhoods

Each neighborhood has a summary, daily-life text, a general location, photos, landmarks, nearby places and ways of getting around. Use real names for nearby places only once confirmed.

## 5. The map point (important)

Each property and neighborhood has **public map latitude and longitude** fields.

- **Type them by hand.** Do not copy them from the address and do not use any tool that converts an address to coordinates.
- Place the point **about 150–300 metres away** from the true location, so a public map never pinpoints a home. Visitors see the label "Approximate locations".
- Latitude is a number between 4 and 21 (Baguio is about 16.4). Longitude is between 116 and 127 (Baguio is about 120.6). The Studio rejects values outside those ranges.

## 6. Site settings

**Site settings** is a single document (there is no "create new"). It holds the business name, tagline, public contact details, social links, the order of homepage featured properties and the footer text.

- Clear the **Sample-data notice** before launch, once only real content remains.
- The administrator email is **not** stored here. It is set by the developer in the `CENTRAL_ADMIN_EMAIL` environment variable, because anyone can read a public dataset.

## 7. What each field controls

| Where it appears | Fields |
|-|-|
| Property cards | Title, type, neighborhood, price, key specifications, first photo, availability |
| Property page | Everything on the property, its agent and its neighborhood |
| Homepage featured row | "Feature on the homepage" and the order in Site settings |
| Agent pages and cards | Name, photo, bio, contact details, neighborhoods, assigned properties |
| Area pages | Neighborhood text, nearby places, the properties assigned to it |

## 8. Things not managed here

The FAQ, privacy notice, brand values and page headings are still written in code for now.

## 9. First-time checks (after the developer has connected Sanity)

1. Open `/studio` and sign in.
2. Create one neighborhood, one agent and one property that uses them. Publish all three.
3. Within about a minute they should appear on the website (`/buy` or `/rent`, `/areas`, `/agents`).
4. Unpublish the property and confirm it disappears from the site.
5. Type map coordinates and confirm they save exactly as typed.
