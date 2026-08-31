// Shared dataset of trending / sample designs.
// Photos are deliberately picked from different shoots/models/colors
// so the gallery doesn't feel like the same photo repeated.

export const trendingDesigns = [
  {
    id: 1,
    name: 'Sage Embroidered Suit',
    image: 'https://images.pexels.com/photos/20792022/pexels-photo-20792022.jpeg?auto=compress&cs=tinysrgb&w=800',
    fabric: 'Lawn Cotton',
    neckline: 'Embroidered V-Neck',
    sleeves: 'Lace-trimmed 3/4',
    daman: 'Straight with Border',
    color: 'Sage Green',
    tags: ['green', 'sage', 'embroidered', 'lawn', 'casual'],
  },
  {
    id: 2,
    name: 'Ivory Chikankari Set',
    image: 'https://images.pexels.com/photos/27603173/pexels-photo-27603173.jpeg?auto=compress&cs=tinysrgb&w=800',
    fabric: 'Chikankari Cotton',
    neckline: 'Round Neck',
    sleeves: 'Full Sleeves',
    daman: 'Straight Hem',
    color: 'Ivory White',
    tags: ['white', 'ivory', 'chikankari', 'formal'],
  },
  {
    id: 3,
    name: 'Royal Purple Bridal Dress',
    image: 'https://images.pexels.com/photos/19486434/pexels-photo-19486434.jpeg?auto=compress&cs=tinysrgb&w=800',
    fabric: 'Net with Embroidery',
    neckline: 'Sweetheart Neck',
    sleeves: 'Embroidered Full Sleeves',
    daman: 'Layered Hem',
    color: 'Royal Purple',
    tags: ['purple', 'bridal', 'net', 'party', 'festive'],
  },
  {
    id: 4,
    name: 'Ruby Red Traditional Suit',
    image: 'https://images.pexels.com/photos/725462/pexels-photo-725462.jpeg?auto=compress&cs=tinysrgb&w=800',
    fabric: 'Silk with Zari Work',
    neckline: 'Boat Neck',
    sleeves: 'Embroidered 3/4',
    daman: 'Zari Border',
    color: 'Ruby Red',
    tags: ['red', 'bridal', 'silk', 'festive', 'party'],
  },
  {
    id: 5,
    name: 'Multicolor Saree Set',
    image: 'https://images.pexels.com/photos/2723623/pexels-photo-2723623.jpeg?auto=compress&cs=tinysrgb&w=800',
    fabric: 'Silk Saree',
    neckline: 'Sweetheart Blouse Neck',
    sleeves: 'Sleeveless Blouse',
    daman: 'Pleated Drape',
    color: 'Multicolor Plaid',
    tags: ['multicolor', 'saree', 'silk', 'formal', 'party'],
  },
  {
    id: 6,
    name: 'Mint Casual Daywear',
    image: 'https://images.pexels.com/photos/25184947/pexels-photo-25184947.jpeg?auto=compress&cs=tinysrgb&w=800',
    fabric: 'Cotton',
    neckline: 'Keyhole Neck',
    sleeves: 'Straight Slit Cuff',
    daman: 'Organza Finish',
    color: 'Mint',
    tags: ['mint', 'casual', 'daywear', 'cotton'],
  },
];

// Free, legitimate galleries where users can browse more designs -
// we only LINK to these (never copy their images), since the designs
// on those sites belong to those platforms/artists.
export const inspirationSites = [
  {
    name: 'Freepik - Neckline & Embroidery Designs',
    url: 'https://www.freepik.com/free-photos-vectors/neckline-embroidery',
    note: 'Thousands of free embroidery & neckline vector designs',
  },
  {
    name: 'Vecteezy - Lace Border Designs',
    url: 'https://www.vecteezy.com/free-vector/lace-border',
    note: 'Free lace and border vector graphics',
  },
  {
    name: 'Pexels - South Asian Dresses',
    url: 'https://www.pexels.com/search/south%20asian%20dresses/',
    note: 'Free-to-use real photos of traditional outfits',
  },
];
