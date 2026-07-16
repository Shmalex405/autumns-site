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

// GitHub Pages serves static files only — there is no backend to POST the inquiry form
// to, so it relays through Web3Forms (free tier: 250 submissions/month, well above her
// volume). Their access key is a *publishable* identifier, not a secret: it is embedded
// in client-side HTML by design, the same way a reCAPTCHA site key is, and it only ever
// delivers to the inbox it was issued for. Set PUBLIC_WEB3FORMS_KEY as a repository
// variable so it is injected at build time rather than living in source. Until it is
// set, the form tells people to email Autumn directly instead of silently swallowing
// inquiries — a dead contact form is worse than no contact form.
export const FORM = {
  accessKey: import.meta.env.PUBLIC_WEB3FORMS_KEY ?? 'REPLACE_ME__unset',
};

// Media kit, page 2.
export const STATS = [
  { value: '11.5K', label: 'Average weekly Instagram reach', note: 'Media kit, 2026' },
  { value: '40.4%', label: 'Of that audience is in St. George', note: 'Right down the road' },
  { value: '85.8%', label: 'Women, mostly 25–34', note: 'Often the ones deciding' },
  { value: '97.4%', label: 'Based in the United States', note: 'Close to home' },
];

// Her brief asks for "a results section featuring engagement metrics, video views, and
// success stories from past campaigns".
//
// EVERYTHING BELOW IS REAL AND SOURCED. The per-reel engagement numbers come from a
// brand's own DM (media kit p.4); the reach is from the media kit; the volume figures
// are counted from the delivered files. Nothing here is estimated.
//
// This section is thinner than it should be, because one reel's numbers is all the
// campaign data we actually have. Autumn can make it far stronger by sending view /
// like / share / save counts and any sales or footfall outcomes for her best campaigns.
// Add them here — do not invent them.
export const RESULTS = {
  featured: {
    value: '10.2K',
    label: 'views on a single local reel',
    detail: 'Plus 403 likes and 48 shares. These are the brand\'s own numbers, sent to Autumn after the post went up.',
    quote: 'One thing\'s for sure is that the St George Community loves you!!',
  },
  stats: [
    { value: '11.5K', label: 'Average weekly reach', note: 'Every week, not per campaign' },
    { value: '44', label: 'Pieces delivered', note: 'Across 18+ local businesses' },
    { value: '28 min', label: 'Of finished video', note: 'Filmed, edited, delivered' },
  ],
  stories: [
    { brand: 'Downtown Farmers Market', outcome: 'Accepted the collaboration, then asked to keep going',
      body: 'A reel for a weekly market that needs a reason for people to show up again. They came back the same day asking about future work — the clearest signal a piece did its job.' },
    { brand: 'Baby Box Club', outcome: 'Helped a brand-new business find its first customers',
      body: 'A launch-stage family brand with no audience of its own. The reel put them in front of 11.5K weekly local reach and, in their words, made starting out feel less scary.' },
    { brand: 'PLUNJ', outcome: 'Turned a first visit into an ongoing relationship',
      body: 'Recovery and wellness — a category that lives or dies on trust. Showing the experience honestly beat describing it, and the reel landed the same week it was shot.' },
  ],
};

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
      'Mix of clips and photo content', 'Basic color correction and stabilization',
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
  { title: 'UGC video', body: 'Vertical video that feels like a recommendation from someone you trust rather than an ad. Reels, TikTok and Shorts, from first concept through final cut.' },
  { title: 'Product showcases', body: 'Your product in real hands, in a real setting. Close-focus detail and in-use moments that answer a customer\'s question before they think to ask it.' },
  { title: 'Lifestyle content', body: 'Storytelling built around how your product actually fits into someone\'s day — the reason a viewer slows down and pays attention.' },
  { title: 'FPV drone footage', body: 'Aerial and first-person-view flying across Southern Utah\'s red rock, giving a familiar place a perspective people haven\'t seen before.' },
  { title: 'Event coverage', body: 'Markets, launches, openings and pop-ups covered live, with a cut turned around while the event is still fresh.' },
  { title: 'Short-form editing', body: 'Send me your own footage and I\'ll send back a finished reel — branded overlays, trending audio, captions, a custom cover, formatted for each platform.' },
];

export const FAQS = [
  { q: 'What exactly do I get?', a: 'It depends which track suits you. A UGC package means I create the content and share it on @stgeorgemama, where it reaches my audience. A Content Day means I film for your business and hand the footage over to you — it\'s yours to post wherever you like. Plenty of businesses do a little of both.' },
  { q: 'Do I own the footage?', a: 'On a BTS Content Day and Content Creation, yes — raw footage is delivered within 24–48 hours and it\'s yours to edit and share on your own terms. UGC packages include a public affiliate link published for a set window. If you\'d like to use the content for paid ads, just ask and we\'ll sort out extended usage rights.' },
  { q: 'How fast is turnaround?', a: 'Content Day footage lands within 24–48 hours. Edited UGC packages are 5–7 days for Basic, and 7–10 days for Standard and Luxe. If you need it sooner, rush editing gets it to you in 24 hours for $100.' },
  { q: 'How many revisions are included?', a: 'Standard and Luxe include one revision per video, and Content Creation includes one round. Basic doesn\'t include revisions, so if you\'d like room to fine-tune, Standard is a comfortable place to start.' },
  { q: 'What kinds of businesses do you work with?', a: 'All sorts — restaurants, home builders, markets, tourism, beauty and wellness, retail, home services and family brands. My audience skews toward women aged 25–34, who tend to make the buying decisions for their households, and that turns out to be a natural fit for a lot of local businesses. If you\'re in Southern Utah, there\'s a good chance we\'d work well together.' },
  { q: 'Do you travel outside St. George?', a: 'Yes, all across Southern Utah. A good share of my audience is right here in St. George, so local work carries a little extra weight — but I\'d love to hear what you have in mind either way.' },
  { q: 'What if my budget doesn\'t fit the packages?', a: 'Just ask. The packages are a starting point rather than a rule, and I put together custom collaborations all the time. I\'d much rather hear what you have in mind than have you count yourself out.' },
];

export const PROCESS = [
  { step: 'Tell me about it', body: 'Send over what you\'re working on, who you\'d like to reach, and roughly what you have in mind. No pitch deck required.' },
  { step: 'We shape the idea', body: 'I\'ll come back with a concept — the hook, the shot list, the sound, and how it\'ll land with your audience. Nothing gets filmed until you\'re happy with it.' },
  { step: 'Filming day', body: 'I show up with the camera and the drone and shoot on location. It\'s quick and low-key, and your team can carry on working around me.' },
  { step: 'You get the cut', body: 'Edited, captioned, cover image set, and formatted for each platform. Revisions where your package includes them, and then it\'s ready to share.' },
];
