# World Taza Four Branch Digital Menu

This folder generates branch-specific digital ordering menus for four World Taza branches.

## Main menu

- `index.html` - one branch-aware digital menu.
- `menu-items.csv` - structured branch-specific menus and prices from the branch PDF files.
- `branches.csv` - branch names, Arabic names, addresses, Arabic addresses, phones, and WhatsApp numbers.
- `all-branches-menu.csv` - one combined CSV with every branch repeated against every menu item and price.

## Direct branch entry pages

Use these files as QR destinations when hosted:

- `al-ajaweed.html`
- `prince-abdul-majeed.html`
- `al-samer.html`
- `abraq-ar-rughamah.html`
- `samir.html` - alias for Al Samer
- `sulaimaniya.html` - alias entry for the grill/menu branch

You can also use query links:

- `index.html?branch=al-ajaweed`
- `index.html?branch=prince-abdul-majeed`
- `index.html?branch=al-samer`
- `index.html?branch=abraq-ar-rughamah`
- `index.html?branch=samir`
- `index.html?branch=sulaimaniya`

## Branches

1. Al Ajaweed - +966 50 685 9014, +966 53 640 9680, +966 12 620 8191
2. Prince Abdul Majeed - +966 50 722 1992
3. Al Samer - +966 53 700 6405
4. Abraq Ar Rughamah - +966 53 070 6128

## How it works

The customer selects a branch or opens a branch-specific QR link. The menu, search, category filters, cart, and WhatsApp order flow stay the same, but the product list and prices change for the selected branch.

The page also includes an English/Arabic language selector. WhatsApp order messages are always sent with both English and Arabic item text so the branch team can read the order clearly.

The cart includes payment options:

- Cash on delivery / pickup
- Card on delivery / pickup
- Online payment link request

The current build does not process live card payments directly because no payment gateway credentials or hosted payment URL were provided. When "Online payment link" is selected, the WhatsApp order asks the branch to send a payment link.

## Current menu variant counts

- Al Ajaweed: 59
- Prince Abdul Majeed: 57
- Al Samer: 59
- Abraq Ar Rughamah: 84

Numbers are forced to English/Latin formatting on both English and Arabic pages, including phone numbers, prices, totals, and WhatsApp order text.
