# Katia Steinfeld Personal Website

This repository contains the source code and content for the personal website of **Dr. Katia Steinfeld**, an MD‑PhD applied data scientist specialising in visual neuroscience, technology innovation and nonprofit leadership. The site showcases her scientific research, technological projects, and the impact of her NGO, Escolhares. All dynamic sections are backed by editable Excel files to make updates simple without touching the code.

## Directory Overview

| Path | Purpose |
|---|---|
| `index.html` | Homepage with trilingual motto, featured work, “What I’m Reading” section, gallery and contact system. |
| `science.html` | Science page (black & white aesthetic) with research overview, publications, collaboration map, focus areas and awards. |
| `technology.html` | Technology page (marshmallow pastel aesthetic) showcasing projects, technical skills and a contact section. |
| `founder.html` | Founder page (Escolhares branding) with impact metrics, three interactive maps, documents and Instagram feed. |
| `css/` | Stylesheets: `base.css` for common styles; `science.css`, `technology.css`, `founder.css` for the three identities. |
| `js/main.js` | JavaScript that loads Excel data, initialises maps, populates featured and reading sections, and handles the contact form. |
| `data/` | Editable Excel files powering the dynamic content. |
| `images/` | Placeholder images for gallery, reading items and featured work; replace these with your own assets. |
| `brand-guide.md` | Document explaining the three visual identities and colour palettes. |

## Updating Excel Back‑Ends

All maps and lists on the site read from Excel files located in the `data/` directory. To update any data set, open the corresponding file in Excel or Google Sheets, edit or add rows and save the file in the same format.

### Science Collaborations (`data/science_collaborations.xlsx`)

| Column | Description |
|---|---|
| `Name` | Name of the collaborating institution |
| `Latitude` | Decimal latitude |
| `Longitude` | Decimal longitude |
| `Description` | Short description shown in the marker popup |

Add new rows for additional collaborators. When the site reloads, the map will update automatically.

### Escolhares Maps

There are three separate files:

* **Schools Served:** `data/escolhares_schools.xlsx`
* **Glasses Distribution:** `data/escolhares_glasses.xlsx`
* **App Users:** `data/escolhares_app_users.xlsx`

Each file has the following columns:

| Column | Description |
|---|---|
| `Location` | Name of the school/site/region |
| `Latitude` | Decimal latitude |
| `Longitude` | Decimal longitude |
| `Info` | Additional information shown in the popup |

Markers on the maps use different colours according to the dataset. To add a new school or distribution site, append a row with the appropriate coordinates. Ensure latitude and longitude are accurate to avoid misplaced markers.

### “What I’m Reading” (`data/what_im_reading.xlsx`)

This file defines the books or articles displayed on the homepage. Columns include:

| Column | Description |
|---|---|
| `Category` | One of: Global Health, Science, Technology, Innovation, Personal Interest |
| `Title` | Title of the book or article |
| `Author` | Author names |
| `ImageURL` | Path to a cover image stored in `images/reading/` |
| `LinkURL` | URL to purchase or read the item |
| `Description` | Optional short note or summary |
| `DateAdded` | Date you added the entry |

Add or modify entries and make sure to upload corresponding images into `images/reading/`. The site groups items by category and displays them in a responsive grid.

### Featured Work (`data/featured_content.xlsx`)

Featured work drives the cards on the homepage and is reused on other pages. Each row has:

| Column | Description |
|---|---|
| `Title` | Title of the featured item |
| `Description` | Brief description |
| `ThumbnailURL` | Path to an image in `images/featured/` |
| `LinkURL` | Direct link to the original content (e.g. DOI, video, article) |
| `Category` | Science, Technology, Founder, or Media |

To add new items (for example from your LinkedIn featured section), append a row with appropriate values and upload a thumbnail image. The JavaScript automatically renders all items.

### Documents (`data/escolhares_documents.xlsx`)

This list powers the document section on the Founder page. Columns:

| Column | Description |
|---|---|
| `Title` | Name of the document |
| `LinkURL` | URL to the PDF or resource |
| `Description` | Brief description |

Add new reports or guides by appending rows.

## Updating Images

Upload your own photos or graphics into the relevant sub‑folders inside `images/`:

* `images/reading/` – book covers or article illustrations referenced in `what_im_reading.xlsx`.
* `images/featured/` – thumbnail images referenced in `featured_content.xlsx`.
* `images/` – gallery images (`placeholder1.jpg`–`placeholder3.jpg` by default).

Keep file names consistent with the paths specified in the Excel files. For best results, optimise images for the web (e.g. JPEGs at 80 % quality) and use similar aspect ratios.

## Adding LinkedIn Featured Items

LinkedIn restricts anonymous access to the Featured section. To incorporate new featured items:

1. Manually collect the URLs, titles and descriptions of the content you wish to feature.
2. Save thumbnail images locally (e.g. screenshots or promotional images).
3. Append a row to `data/featured_content.xlsx` with the item’s title, description, thumbnail path, link and category.
4. Copy the image into `images/featured/` and reference it in the `ThumbnailURL` column.

After saving the Excel file, refreshing your browser will show the new content. The site’s design will automatically place the card in the appropriate section based on its category.

## Updating the Contact Form

The contact form uses **[FormSubmit](https://formsubmit.co/)** by default. To change the email provider:

1. Open each HTML file and locate the `<form>` element inside the contact modal.
2. Replace the `action` attribute (currently set to `https://formsubmit.co/ks7689@nyu.edu`) with your own FormSubmit endpoint or an alternative service such as EmailJS.
3. If using EmailJS or a similar solution, include the necessary client library and update the `handleContactSubmit` function in `js/main.js` to send the form data programmatically.

The form includes hidden fields for setting the email subject and an auto‑response message. Adjust these strings as needed. A success alert is displayed after submission; you can customise this behaviour in `handleContactSubmit()`.

## Changing Contact Categories

The four categories—Global Health, Science, Innovation and Other—are defined directly in the HTML. To modify or add categories:

1. Edit the icon grid in each HTML file where the “Connect” section appears.
2. Add or remove `<div class="connect-icon" ...>` elements and adjust the `onclick` function to pass the new category name.
3. Update the `<select>` options inside the contact form modal so that the available categories match the icons.

## Deployment

This site is static and can be deployed on any standard web hosting platform (e.g. GitHub Pages, Netlify, Vercel). To deploy:

1. Ensure all dependencies (Leaflet, XLSX and Font Awesome) are loaded via CDN as in the HTML files.
2. Upload the entire `katia-site` folder to your hosting provider, preserving the directory structure.
3. Make sure Excel files remain in the `data/` folder. Some hosts may treat `.xlsx` files as binary; if that causes issues, convert them to `.csv` and adjust the paths in `js/main.js` accordingly.

## Further Customisation

* **Styling** – Adjust colours and fonts in `css/` files as described in the brand guide.
* **Animations** – The Technology page benefits from gentle micro‑interactions. You can add CSS transitions or JavaScript animations for hover effects.
* **Instagram Feed** – Replace the placeholder in `founder.html` with an embedded widget from Instagram (e.g. [LightWidget](https://lightwidget.com/) or Instagram’s official embed). Ensure the widget inherits the Escolhares colour palette.
* **Search Engine Optimisation (SEO)** – Add `<meta>` tags for description and keywords, and configure Open Graph tags for better social media previews.

With these instructions, you can keep Dr. Steinfeld’s website up to date and aligned with her evolving research, projects and humanitarian impact.