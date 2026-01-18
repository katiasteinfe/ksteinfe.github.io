# Katia Steinfeld Website Brand Guide

This document summarises the visual identities used throughout the personal website and offers guidance for maintaining a cohesive look and feel. Each of the three core sections—Science, Technology and Founder—possesses a distinct identity aligned with its purpose while remaining part of a unified experience.

## Science Page: Monochrome, Academic Aesthetic

**Colours**

| Element | Colour | Notes |
|---|---|---|
| Background | `#FFFFFF` | Pure white to evoke paper |
| Text | `#000000` | Pure black for maximum contrast |
| Borders/dividers | `#000000` | Used sparingly to separate sections |

The Science page deliberately avoids embellishment. Black text on a white background echoes printed scientific journals. There are no gradients or drop‑shadows. Serif typography (e.g. Georgia or EB Garamond) supports a classical academic tone. Headings and body text are well spaced to improve legibility.

## Technology Page: Marshmallow Pastel Aesthetic

The Technology page is inspired by the **marshmallow** pastel theme described in the shadcn/UI “Marshmallow” design system. That theme is characterised by soft pinks and lavenders with cloud‑like comfort【866784422967169†L85-L101】. Pastels are calibrated to maintain contrast and readability【866784422967169†L92-L100】. Dark mode transitions to dusty rose and muted purples while keeping the cosy atmosphere【866784422967169†L100-L101】.

**Colours (suggested)**

| Element | Colour | Notes |
|---|---|---|
| Background gradient | `#F7EAFF` → `#EAF5FF` | Soft pink fading into a light blue/purple |
| Primary accent | `#6A3386` | Plum tone used for badges and icons |
| Secondary accents | `#EFDaf6`, `#F4EAF7` | Very light pink/purple surfaces |

Rounded shapes, subtle shadows and gentle hover animations give a pillowy feel. Sans‑serif fonts such as Poppins maintain a contemporary, approachable look. Cards have 20 px corner radii and soft box‑shadows. Pastel badges mark technology tags. Adapt colours as needed to align with the marshmallow palette referenced above【866784422967169†L85-L101】.

## Founder Page: Escolhares Brand Identity

Escolhares has its own established branding. To remain faithful to the organisation, you should extract the official colour codes, logos and typography from the **Canva account** or the official website. This implementation uses approximate values:

| Element | Approximate Colour | Notes |
|---|---|---|
| Primary colour | `#00A8E8` | Turquoise blue used in navigation and accents |
| Secondary colour | `#FFD166` | Warm yellow used sparingly for contrast |
| Dark accent | `#00395D` | Deep navy for headings and text |
| Background | `#F7FAFC` | Off‑white neutral background |

Once you download the official assets from Canva or the Instagram feed, replace these values with precise hex codes. Fonts on the Founder page mimic the friendly, accessible feel of the NGO, using Montserrat (a geometric sans‑serif). Metric panels use the primary colour for numbers and dark text for labels. Map markers adopt the primary colour for schools, the secondary colour for glasses distribution and a lighter blue (`#8ECAE6`) for app users.

## Typography

| Section | Primary Typeface | Backup |
|---|---|---|
| Science | Georgia, “Times New Roman” | Generic serif |
| Technology | Poppins, Helvetica Neue | Arial, sans‑serif |
| Founder | Montserrat | Arial, sans‑serif |

Font files are loaded from Google Fonts via `<link>` tags in each HTML document.

## Logos & Graphics

* Download official **Escolhares** logos from the Canva account using the provided credentials and place them in the `images/` directory. Replace the placeholder logo used in the header of the Founder page with the actual asset.
* Replace placeholder images in the gallery and reading sections with your own photos or book covers. Upload them into the corresponding `images/reading/` and `images/featured/` folders and update the Excel data accordingly.

## Illustration of Aesthetic Differences

Below is a simple illustration showing how the three identities relate. The Science identity is stark and minimal, the Technology identity is soft and pastel, and the Founder identity is vibrant and community‑focused.

![Science vs Technology vs Founder Styles]({{file:file-XFtzVABoHyn5brXefK4Zut}})

## Updating the Brand

To modify the colour palette or typography:

1. Open the appropriate CSS file inside `katia-site/css/` (`science.css`, `technology.css` or `founder.css`).
2. Adjust the hex values, font families or other properties.
3. Replace the placeholder images or icons in the `images/` directory with your own assets.
4. Refresh your browser to see the changes.

By keeping each identity in its own stylesheet and clearly documenting your colours and fonts here, you ensure that future updates remain consistent and intentional.