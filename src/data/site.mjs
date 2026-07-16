// Every figure here is taken from Autumn's 2026 Media Kit / Content Day pricing sheet.
// Nothing is estimated or invented. If a number isn't in those PDFs, it isn't on the site.

export const SITE = {
  name: 'Autumn Flowers',
  handleLabel: '@stgeorgemama',
  handleUrl: 'https://www.instagram.com/stgeorgemama/',
  email: 'Autumnflowersugc@gmail.com',
  phone: '(435) 319-5327',
  phoneHref: '+14353195327',
  location: 'St. George, Utah',
  domain: 'autumnflowerssocials.com',
  tagline: 'Content creator / videographer / UGC creator',
};

// GitHub Pages serves static files only — there is no backend to POST the enquiry form
// to, so it relays through Web3Forms (free tier: 250 submissions/month, well above her
// volume). Their access key is a *publishable* identifier, not a secret: it is embedded
// in client-side HTML by design, the same way a reCAPTCHA site key is, and it only ever
// delivers to the inbox it was issued for. Set PUBLIC_WEB3FORMS_KEY as a repository
// variable so it is injected at build time rather than living in source. Until it is
// set, the form tells people to email Autumn directly instead of silently swallowing
// enquiries — a dead contact form is worse than no contact form.
export const FORM = {
  accessKey: import.meta.env.PUBLIC_WEB3FORMS_KEY ?? 'REPLACE_ME__unset',
};

// Media kit, page 2.
export const STATS = [
  { value: '11.5K', label: 'Average weekly Instagram reach', note: 'Media kit, 2026' },
  { value: '40.4%', label: 'Of that audience is in St. George', note: 'Local by a mile' },
  { value: '85.8%', label: 'Women, mostly 25–34', note: 'Parents making the buying calls' },
  { value: '97.4%', label: 'United States', note: 'No hollow overseas reach' },
];

// Named in the media kit under "Brands I've Worked With", plus brands identified
// from the delivered footage itself. Only brands we can actually evidence.
export const BRANDS = [
  'PLUNJ', "Roni's Mac Bar", 'Lauren Mae', 'ToyDash', 'Baby Box Club',
  'Align & Shine Pilates', 'Sandtown Pizza', 'Lemon Lab', 'Vintage Market Days',
  'The Mod Market', 'The Mathis Market', 'The Spring Market', 'Chained & Charmed',
  'Krazy K Maks', 'Downtown Farmers Market', 'Hawaii Fluid Art', 'Fossil Hills Park',
  'Summit View / Cedar Pointe Homes',
];

// Transcribed verbatim from the brand DMs in the media kit (p.4) and the Reviews folder.
// Wording is untouched; only obvious typos in our own copy get fixed, never in a quote.
export const TESTIMONIALS = [
  { quote: 'We just watched the reel and absolutely love it! You did such an amazing job, and it honestly made us smile the whole time. It felt so genuine! We\'re so grateful for all the support you\'ve given us these past few weeks. Starting a new business can feel a little scary, and people like you who are willing to give it a chance and share it with others truly mean so much to us.', brand: 'Baby Box Club', role: 'Family brand' },
  { quote: 'It has 10.2K views, 403 likes, and 48 shares! One thing\'s for sure is that the St George Community loves you!!', brand: 'Local business partner', role: 'On a single reel' },
  { quote: 'We love this! Looks amazing. Yes we would love to accept the collab on this. Of course we would love to work with you in the future too if you would like.', brand: 'Downtown Farmers Market', role: 'Local market' },
  { quote: 'Love the reel! Thank you so much! We\'re so happy you finally came!', brand: 'PLUNJ', role: 'Recovery & wellness' },
  { quote: 'AUTUMN!! this is seriously so amazing I love it!! yes post away and if you can add me as a collaborator on that post? I\'d appreciate it — ahh it\'s so good!!', brand: 'Lauren Mae', role: 'Boutique' },
  { quote: 'Whatever videos you are wanting to do we will support. Looks like this video did really good.', brand: 'Align & Shine Pilates', role: 'Studio' },
];

// Media kit, page 3.
export const UGC_PACKAGES = [
  { name: 'Basic', price: 125, features: [
    'One 15–45 second Instagram Reel', '2–3 stories',
    'Public affiliate link published 72 hours', 'Delivered in 5–7 days'] },
  { name: 'Standard', price: 300, popular: true, features: [
    'Three 15–45 second Instagram Reels', '4–6 stories',
    'Public affiliate link published 72 hours', 'One revision per video',
    'Delivered in 7–10 days'] },
  { name: 'Luxe', price: 550, features: [
    'Five 15–30 second Instagram Reels', '7–10 stories',
    'One revision per video', 'Public affiliate link published 30 days',
    'Delivered in 7–10 days'] },
];

// Content Day pricing sheet. This is the other track: brands buy the footage itself
// rather than a post on Autumn's account.
export const CONTENT_DAY = [
  { name: 'BTS Content Day', price: '$250', unit: '/ hour',
    blurb: 'High-quality content your team can edit and share on your own terms.',
    features: ['On-location filming and photo session',
      'Mix of clips and photo content — behind-the-scenes, product shots, action moments',
      'Raw footage delivered within 24–48 hours'] },
  { name: 'Content Creation', price: '$150', unit: '/ video',
    blurb: 'You send the footage, I\'ll work my magic.',
    features: ['One edited reel', 'Branded text overlays, trending audio, transitions, captions',
      'Formatted for Instagram, TikTok and Facebook', 'One round of revisions',
      'Custom cover images'] },
  { name: 'FPV Drone', price: '$400', unit: '/ hour',
    blurb: 'Aerial and first-person-view work across Southern Utah.',
    features: ['On-location filming and photo session',
      'Mix of clips and photo content', 'Basic colour correction and stabilisation',
      'Delivered within 24–48 hours', 'One edited reel formatted for Instagram and TikTok'] },
];

export const ADD_ONS = [
  { name: 'FPV drone', price: '$400 / hour' },
  { name: 'Additional edited reel', price: '$100' },
  { name: 'Rush editing — 24-hour turnaround', price: '$100' },
];

// Media kit, page 3: "What to expect".
export const EXPECTATIONS = [
  'Authentic, relatable family-focused content',
  'High-quality vertical video for Reels, TikTok and Shorts',
  'Creative concepts, filming and editing included',
  'Clear communication and easy collaboration',
  'Fast turnaround and attention to detail',
];

export const SERVICES = [
  { title: 'UGC video', body: 'Vertical video made to look like a recommendation from a friend, not an advert. Reels, TikTok and Shorts, concept through final cut.' },
  { title: 'Product showcases', body: 'Your product in real hands in a real kitchen. Close-focus detail work and the in-use shots that answer a buyer\'s question before they ask it.' },
  { title: 'Lifestyle content', body: 'Family-led storytelling built around how a product actually fits into a busy morning — the reason a parent stops scrolling.' },
  { title: 'FPV drone footage', body: 'Aerial and first-person-view flying across Southern Utah\'s red rock. The shot most local creators simply cannot deliver.' },
  { title: 'Event coverage', body: 'Markets, launches, openings and pop-ups covered live, with a cut turned around while the event is still worth posting about.' },
  { title: 'Short-form editing', body: 'Send your own footage and get back a finished reel — branded overlays, trending audio, captions, custom cover, formatted per platform.' },
];

export const FAQS = [
  { q: 'What exactly do I get?', a: 'Depends on the track. A UGC package means I create the content and post it to @stgeorgemama, where it reaches my audience. A Content Day means I film for your business and hand the footage to you — you own it and post it wherever you like. Plenty of brands do both.' },
  { q: 'Do I own the footage?', a: 'On a BTS Content Day and Content Creation, yes — raw footage is delivered to you within 24–48 hours and it\'s yours to edit and share on your own terms. UGC packages include a public affiliate link published for a set window; ask me about extended usage rights if you need the content for paid ads.' },
  { q: 'How fast is turnaround?', a: 'Content Day footage lands within 24–48 hours. Edited UGC packages are 5–7 days for Basic and 7–10 days for Standard and Luxe. Need it sooner? Rush editing gets it to you in 24 hours for $100.' },
  { q: 'How many revisions?', a: 'Standard and Luxe include one revision per video, and Content Creation includes one round. Basic doesn\'t include revisions — if you want room to iterate, start at Standard.' },
  { q: 'Do you only work with family brands?', a: 'It\'s where I\'m strongest — 85.8% of my audience are women, mostly 25–34, and they are the ones making the buying decisions for their households. But I\'ve shot restaurants, home builders, med-spas, markets and solar. If your customer is a parent in Southern Utah, we\'ll work well together.' },
  { q: 'Do you travel outside St. George?', a: 'Yes, across Southern Utah. 40.4% of my audience is right here in St. George, so local work carries the most weight — but reach out and we\'ll talk about it.' },
  { q: 'My budget doesn\'t fit your packages.', a: 'Tell me anyway. The packages are a starting point, not a wall, and I put together custom collaborations regularly. The worst outcome is I say it isn\'t a fit.' },
];

export const PROCESS = [
  { step: 'Tell me about it', body: 'You send over what you\'re launching, who you need to reach, and roughly what you want to spend. No pitch deck required.' },
  { step: 'I build the concept', body: 'I come back with the idea — hook, shot list, sound, and how it\'ll land with parents. You approve before anything gets filmed.' },
  { step: 'Filming day', body: 'I show up with the camera and the drone and shoot on location. It\'s quick, low-fuss, and your team can carry on working around it.' },
  { step: 'You get the cut', body: 'Edited, captioned, cover image set, formatted for each platform. Revisions where your package includes them, then it goes live.' },
];
