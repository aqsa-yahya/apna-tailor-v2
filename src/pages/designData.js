/* ==========================================================================
   designData.js
   Har design ki image + details yahan ek hi jagah likhi hain.
   Design page (cards) aur DesignDetail page (detail + download) dono isi
   file se data lete hain.

   Kisi design ki details badalni hon (ya nayi image lagne ke baad color
   waghera update karna ho) to sirf yahan us design ka entry edit karo.

   Fields:
     category : Neckline | Sleeve | Daman | Trouser | Kurta | Frock
     image    : /public/designs/ folder mein file ka naam
     summary  : card ki choti line
     color    : photo mein dress ka color
     fabric   : suggested fabric (idea hai, tailor se confirm karna)
     occasion : kis mauqe ke liye
     features : photo mein nazar aane wali design ki khasiyat
   ========================================================================== */

const IMAGE_FOLDER = '/designs/';

export const slugify = (text) =>
  String(text)
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

/* Har category ke liye darzi ko kya batana hai */
export const TAILOR_TIPS = {
  Neckline:
    'Tell your darzi the neck depth and width you like, and whether the edge should have piping, lace or embroidery.',
  Sleeve:
    'Mention the sleeve length and how wide the opening should be at the wrist or cuff.',
  Daman:
    'Specify the kameez length and how high the side slits (chaak) should go.',
  Trouser:
    'Share the trouser length and the width you want at the ankle.',
  Kurta:
    'Mention the full kurta length, the slit height and how loose the fit should be.',
  Frock:
    'Mention the frock length and how full the skirt should be. Leave a little room for growth.',
  default:
    'Show this card to your darzi and point out the parts you want copied.',
};

export const DESIGN_DETAILS = {
  Women: {
    'Round Neck': {
      category: 'Neckline',
      image: 'round-neck-f.jpg',
      summary: 'Classic & versatile - suits most fabrics',
      color: 'Navy Blue',
      fabric: 'Cotton, Linen',
      occasion: 'Daily wear, Office',
      features: 'Plain round neck with a fine contrast stitch along the neckline and cuffs',
    },
    'V Neck': {
      category: 'Neckline',
      image: 'v-neck-f.jpg',
      summary: 'Elegant, works well with lawn & lace',
      color: 'Pistachio Green',
      fabric: 'Lawn, Cotton',
      occasion: 'Casual, Daytime',
      features: 'Notched V-neck with floral thread embroidery on the front and 3/4 sleeves with turned cuffs',
    },
    'Boat Neck': {
      category: 'Neckline',
      image: 'boat-neck.jpg',
      summary: 'Wide neckline, great for embroidery',
      color: 'Mustard Yellow',
      fabric: 'Cotton Silk, Lawn',
      occasion: 'Festive, Eid',
      features: 'Wide neckline with a gold border trim and an embroidered motif down the center front',
    },
    'Mandarin Neck': {
      category: 'Neckline',
      image: 'mandarin-neck.jpg',
      summary: 'Structured, formal look',
      color: 'Maroon',
      fabric: 'Cotton, Karandi',
      occasion: 'Formal, Office',
      features: 'Stand collar with a half-button placket and full-length sleeves',
    },
    'Keyhole Neck': {
      category: 'Neckline',
      image: 'keyhole-neck.jpg',
      summary: 'Subtle cutout, pairs with pearls',
      color: 'Ivory White',
      fabric: 'Chiffon, Georgette',
      occasion: 'Semi-formal, Evening',
      features: 'Stand collar with a deep V opening closed by a single pearl button and sheer full sleeves',
    },
    'Square Neck': {
      category: 'Neckline',
      image: 'square-neck.jpg',
      summary: 'Modern silhouette, bold border work',
      color: 'Sky Blue',
      fabric: 'Lawn, Cotton',
      occasion: 'Festive, Day events',
      features: 'Square neckline with contrast piping, a short center placket, a floral embroidery panel and piped cuffs',
    },
    'Sweetheart Neck': {
      category: 'Neckline',
      image: 'sweetheart-neck.jpg',
      summary: 'Soft curved dip, festive look',
      color: 'Blush Pink',
      fabric: 'Satin, Silk',
      occasion: 'Party, Festive',
      features: 'Deep curved neckline with a short button placket and a soft satin finish',
    },
    'Collar Neck': {
      category: 'Neckline',
      image: 'collar-neck.jpg',
      summary: 'Shirt-style collar, smart casual',
      color: 'Black',
      fabric: 'Cotton, Linen',
      occasion: 'Smart casual, Office',
      features: 'Shirt-style folded collar with a button placket',
    },
    'Straight Sleeve': {
      category: 'Sleeve',
      image: 'straight-sleeve.jpg',
      summary: 'Simple, everyday wear',
      color: 'Teal',
      fabric: 'Cotton, Linen',
      occasion: 'Everyday wear',
      features: 'Straight full-length sleeve finished with a simple stitched cuff',
    },
    'Bell Sleeve': {
      category: 'Sleeve',
      image: 'bell-sleeve.jpg',
      summary: 'Flared at the end, festive feel',
      color: 'Dusty Rose',
      fabric: 'Cotton, Chiffon',
      occasion: 'Festive, Eid',
      features: 'Sleeve gathers near the shoulder and flares wide toward the wrist, with an embroidered border on the edge',
    },
    'Rolled Sleeve': {
      category: 'Sleeve',
      image: 'rolled-sleeve.jpg',
      summary: 'Folded cuff, casual style',
      color: 'Mint Green',
      fabric: 'Linen, Cotton',
      occasion: 'Casual, Summer',
      features: 'Sleeve folded back at the wrist and held in place by a stitched cuff',
    },
    'Cuffed 3/4 Sleeve': {
      category: 'Sleeve',
      image: 'cuffed-sleeve.jpg',
      summary: 'Fitted cuff, formal finish',
      color: 'Navy Blue',
      fabric: 'Cotton Silk, Lawn',
      occasion: 'Formal, Festive',
      features: 'Three-quarter sleeve ending in a fitted cuff with an embroidered border',
    },
    'Straight Hem': {
      category: 'Daman',
      image: 'straight-hem.jpg',
      summary: 'Clean, classic finish',
      color: 'Ivory Cream',
      fabric: 'Cotton, Linen',
      occasion: 'Everyday wear',
      features: 'Clean straight hem with side slits, a button placket and piped 3/4 sleeves',
    },
    'Cutwork Hem': {
      category: 'Daman',
      image: 'cutwork-hem.jpg',
      summary: 'Scalloped lace edge',
      color: 'Powder Blue',
      fabric: 'Lawn, Cotton',
      occasion: 'Festive, Day events',
      features: 'Scalloped lace edging along the hem with a buttoned placket and 3/4 sleeves',
    },
    'Asymmetric Hem': {
      category: 'Daman',
      image: 'asymmetric-hem.jpg',
      summary: 'High-low modern cut',
      color: 'Sunshine Yellow',
      fabric: 'Cotton, Lawn',
      occasion: 'Casual, Party',
      features: 'High-low hem with side slits, a gold-button placket and 3/4 sleeves',
    },
    'Straight Pant': {
      category: 'Trouser',
      image: 'straight-pant.jpg',
      summary: 'Everyday comfortable fit',
      color: 'Off White',
      fabric: 'Cotton, Cambric',
      occasion: 'Everyday wear, Office',
      features: 'Slim straight-cut trouser with a clean hem, paired with a buttoned kurta',
    },
    'Tulip Shalwar': {
      category: 'Trouser',
      image: 'tulip-shalwar.jpg',
      summary: 'Traditional draped style',
      color: 'Maroon',
      fabric: 'Cotton, Crepe',
      occasion: 'Formal, Festive',
      features: 'Draped tulip-style shalwar that overlaps at the front and ends in an embroidered ankle border',
    },
    Palazzo: {
      category: 'Trouser',
      image: 'palazzo.jpg',
      summary: 'Wide flowy silhouette',
      color: 'Sage Green',
      fabric: 'Linen, Cotton',
      occasion: 'Casual, Eid',
      features: 'Wide-leg flowy palazzo worn with a knee-length kurta',
    },
  },

  Men: {
    'Mandarin Neck': {
      category: 'Neckline',
      image: 'mandarin-neck-m.jpg',
      summary: 'Classic kurta collar',
      color: 'Navy Blue',
      fabric: 'Cotton, Wash & Wear',
      occasion: 'Formal, Eid',
      features: 'Stand collar with a three-button placket and full sleeves with a contrast cuff lining',
    },
    'Round Neck': {
      category: 'Neckline',
      image: 'round-neck.jpg',
      summary: 'Simple, casual kurta style',
      color: 'Light Grey',
      fabric: 'Cotton',
      occasion: 'Everyday, Casual',
      features: 'Simple round neck kurta with a short button placket',
    },
    'Collar Neck': {
      category: 'Neckline',
      image: 'collar-neck-m.jpg',
      summary: 'Semi-formal shirt collar',
      color: 'White',
      fabric: 'Cotton, Wash & Wear',
      occasion: 'Semi-formal',
      features: 'Shirt-style folded collar with a buttoned placket and full sleeves',
    },
    'Straight Sleeve': {
      category: 'Sleeve',
      image: 'straight-sleeve-m.jpg',
      summary: 'Standard kurta sleeve',
      color: 'Black',
      fabric: 'Cotton, Wash & Wear',
      occasion: 'Everyday, Formal',
      features: 'Straight full-length sleeve with a plain cuff',
    },
    'Cuffed Sleeve': {
      category: 'Sleeve',
      image: 'cuffed-sleeve-m.jpg',
      summary: 'Buttoned cuff, formal look',
      color: 'Olive Green',
      fabric: 'Cotton',
      occasion: 'Formal, Festive',
      features: 'Full sleeve with a stitched cuff and side slits',
    },
    'Straight Hem': {
      category: 'Kurta',
      image: 'straight-hem-m.jpg',
      summary: 'Traditional straight kurta',
      color: 'Maroon',
      fabric: 'Cotton, Wash & Wear',
      occasion: 'Eid, Formal',
      features: 'Straight knee-length kurta with side slits and a half-button placket',
    },
    'Asymmetric Hem': {
      category: 'Kurta',
      image: 'asymmetric-hem-m.jpg',
      summary: 'Modern side-slit kurta',
      color: 'Charcoal Grey',
      fabric: 'Cotton',
      occasion: 'Casual, Modern',
      features: 'Side-slit kurta with a curved hem and a half-button placket',
    },
  },

  'Baby Girl': {
    'Round Neck': {
      category: 'Neckline',
      image: 'round-neck-bg.jpg',
      summary: 'Soft & comfortable for daily wear',
      color: 'Sage Green',
      fabric: 'Soft Cotton, Jersey',
      occasion: 'Everyday wear',
      features: 'Round neck with ruffled shoulders, full sleeves and a tiered skirt',
    },
    'Sweetheart Neck': {
      category: 'Neckline',
      image: 'sweetheart-neck-bg.jpg',
      summary: 'Cute festive frock style',
      color: 'Lilac Purple',
      fabric: 'Net, Tulle with lining',
      occasion: 'Birthday, Party',
      features: 'Sleeveless party frock with a fitted bodice, a large fabric flower at the waist and a sequin lace skirt',
    },
    'Bell Sleeve': {
      category: 'Sleeve',
      image: 'bell-sleeve-bg.jpg',
      summary: 'Frilly, playful look',
      color: 'Pink and Grey',
      fabric: 'Net, Tulle',
      occasion: 'Party, Festive',
      features: 'Frilly flared sleeves that widen toward the wrist',
    },
    'Rolled Sleeve': {
      category: 'Sleeve',
      image: 'rolled-sleeve-bg.jpg',
      summary: 'Easy everyday sleeve',
      color: 'Denim Blue',
      fabric: 'Denim, Cotton',
      occasion: 'Everyday, Casual',
      features: 'Sleeve folded back at the wrist with a small stitched cuff',
    },
    'Straight Hem': {
      category: 'Frock',
      image: 'straight-hem-bg.jpg',
      summary: 'Simple daily frock',
      color: 'Sunny Yellow',
      fabric: 'Ribbed Cotton',
      occasion: 'Everyday, Summer',
      features: 'Simple straight-cut frock with a side slit',
    },
    'Cutwork Hem': {
      category: 'Frock',
      image: 'cutwork-hem-bg.jpg',
      summary: 'Lace-trimmed party frock',
      color: 'Blush Pink',
      fabric: 'Cotton, Lawn',
      occasion: 'Party, Festive',
      features: 'Frock finished with a scalloped lace edge along the hem',
    },
  },

  'Baby Boy': {
    'Round Neck': {
      category: 'Neckline',
      image: 'round-neck-bb.jpg',
      summary: 'Comfortable everyday kurta',
      color: 'Sunshine Yellow',
      fabric: 'Cotton, Chikankari',
      occasion: 'Eid, Everyday',
      features: 'Simple round neck kurta with a short button placket',
    },
    'Mandarin Neck': {
      category: 'Neckline',
      image: 'mandarin-neck-bb.jpg',
      summary: 'Smart festive kurta collar',
      color: 'Teal Green',
      fabric: 'Jacquard, Cotton Silk',
      occasion: 'Festive, Wedding',
      features: 'Stand collar with a side-fastened button front and leaf embroidery',
    },
    'Straight Sleeve': {
      category: 'Sleeve',
      image: 'straight-sleeve-bb.jpg',
      summary: 'Simple, easy to wear',
      color: 'Black',
      fabric: 'Embroidered Cotton',
      occasion: 'Festive',
      features: 'Straight full sleeve with tonal embroidery and a button front',
    },
    'Straight Hem': {
      category: 'Kurta',
      image: 'straight-hem-bb.jpg',
      summary: 'Classic kids kurta cut',
      color: 'Brown and Black',
      fabric: 'Satin',
      occasion: 'Festive, Party',
      features: 'Straight-hem kurta with a checked pocket, worn with satin trousers',
    },
  },
};

/* ----------------------------- helpers ----------------------------- */

export const getImage = (audience, name) => {
  const entry = DESIGN_DETAILS[audience] && DESIGN_DETAILS[audience][name];
  return entry ? IMAGE_FOLDER + entry.image : null;
};

export const designPath = (audience, name) =>
  `/design-details/${slugify(audience)}/${slugify(name)}`;

/* URL ke slugs se design dhoondhta hai. Na mile to null. */
export function findDesign(audienceSlug, designSlug) {
  const audience = Object.keys(DESIGN_DETAILS).find((a) => slugify(a) === audienceSlug);
  if (!audience) return null;

  const name = Object.keys(DESIGN_DETAILS[audience]).find((n) => slugify(n) === designSlug);
  if (!name) return null;

  const entry = DESIGN_DETAILS[audience][name];
  return {
    audience,
    name,
    slug: designSlug,
    ...entry,
    imageUrl: IMAGE_FOLDER + entry.image,
  };
}

/* Right side ki list (page aur download card dono mein same) */
export const buildRows = (design) => [
  ['Color in photo', design.color],
  ['Suggested fabric', design.fabric],
  ['Best for', design.occasion],
  ['Style notes', design.features],
];
