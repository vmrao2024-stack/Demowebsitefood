/* SweetCrumbs: each function below = one React component later (props in, JSX out). */
const C = window.CONFIG, $ = (s, r = document) => r.querySelector(s), money = n => '$' + Number(n).toFixed(2);
const U = id => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=600&q=70`;
const FB = "this.onerror=null;this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22%3E%3Crect width=%22100%25%22 height=%22100%25%22 fill=%22%23FADADD%22/%3E%3C/svg%3E'";
const img = (src, alt, cls = '') => `<img loading="lazy" src="${src}" alt="${alt}" onerror="${FB}" class="${cls}">`;

/* ---------- DATA (replace with API / props) ---------- */
const NAV = [['Home', 'home'], ['About', 'about'], ['Cakes', 'cakes'], ['Categories', 'categories'], ['Custom Cakes', 'custom'], ['Blog', 'blog'], ['Contact', 'contact']];
const P1 = 'photo-1578985545062-69928b1d9587', P2 = 'photo-1464349095431-e9a21285b5f3', P3 = 'photo-1535141192574-5d4897c12636', P4 = 'photo-1621303837174-89787a7d4729', P5 = 'photo-1588195538326-c5b1e9f80a1b';
const CATS = [['Birthday Cakes', P1], ['Cupcakes', P5], ['Wedding Cakes', P2], ['Anniversary Cakes', P4], ['Photo Cakes', P3], ['Special Cakes', P2], ['Corporate Cakes', P1]];
const PRODUCTS = [
  { id: 1, name: 'Chocolate Bliss Cake', price: 32, rating: 4.5, reviews: 125, img: P1, cat: 'Birthday Cakes' },
  { id: 2, name: 'Red Velvet Cake', price: 30, rating: 4.5, reviews: 98, img: P4, cat: 'Anniversary Cakes' },
  { id: 3, name: 'Fresh Fruit Cake', price: 35, rating: 4.5, reviews: 110, img: P2, cat: 'Special Cakes' },
  { id: 4, name: 'Black Forest Cake', price: 32, rating: 4.5, reviews: 90, img: P3, cat: 'Birthday Cakes' },
  { id: 5, name: 'Caramel Crunch Cake', price: 33, rating: 4.5, reviews: 76, img: P5, cat: 'Corporate Cakes' },
  { id: 6, name: 'Vanilla Rose Cake', price: 45, rating: 5, reviews: 64, img: P2, cat: 'Wedding Cakes' },
  { id: 7, name: 'Strawberry Cupcakes (6)', price: 18, rating: 4.5, reviews: 140, img: P5, cat: 'Cupcakes' },
  { id: 8, name: 'Heart Photo Cake', price: 40, rating: 4, reviews: 52, img: P3, cat: 'Photo Cakes' },
];
const REVIEWS = [['Emily Johnson', 'The cake was absolutely amazing! It made our celebration even more special. Thank you, SweetCrumbs!'], ['Michael Smith', 'Super soft, delicious and beautifully designed. Highly recommended!'], ['Sophia Brown', 'Great taste, perfect delivery and wonderful service. Will order again!']];
const BLOG = [['5 Cake Trends You\'ll Love in 2024', 'Discover the latest cake trends making celebrations even sweeter this year.', P1], ['Baking Tips for Beginners', 'Simple tips and tricks to help you bake the perfect cake at home.', P5], ['How to Choose the Perfect Cake', 'A guide to choosing the perfect cake for every occasion.', P2]];
const WHY = [['🌾', 'Premium Ingredients', 'We use only the finest and freshest ingredients.'], ['🔥', 'Freshly Baked', 'Every cake is baked fresh, just for you.'], ['🎨', 'Custom Designs', 'Unique designs tailored to your special occasions.'], ['🚚', 'On-Time Delivery', 'Punctual delivery to make your moments perfect.']];

/* ---------- CART (localStorage) ---------- */
const getCart = () => { try { return JSON.parse(localStorage.getItem('sc_cart')) || [] } catch { return [] } };
const saveCart = c => { localStorage.setItem('sc_cart', JSON.stringify(c)); const b = $('#badge'); if (b) b.textContent = count() };
const count = () => getCart().reduce((a, i) => a + i.qty, 0);
const total = () => getCart().reduce((a, i) => a + i.qty * i.price, 0);
function addToCart(id) { const c = getCart(), p = PRODUCTS.find(x => x.id == id), i = c.find(x => x.id == id); i ? i.qty++ : c.push({ id: p.id, name: p.name, price: p.price, qty: 1, img: p.img }); saveCart(c); toast(p.name + ' added to cart 🎂'); }
function toast(m) { const t = $('#toast'); t.textContent = m; t.style.opacity = 1; setTimeout(() => t.style.opacity = 0, 2000); }

/* ---------- SHARED COMPONENTS ---------- */
const Header = r => `<header class="sticky top-0 z-40 bg-blush/95 backdrop-blur border-b border-[#F5DDE0]"><div class="max-w-[1200px] mx-auto px-4 h-16 flex items-center justify-between">
<a href="#/home" class="flex items-center gap-2"><span class="text-2xl">🧁</span><span><b class="font-serif italic text-wine text-xl leading-none block">SweetCrumbs</b><small class="text-[9px] text-mut">Making Moments Sweeter</small></span></a>
<nav class="hidden lg:flex gap-8 text-sm" aria-label="Main">${NAV.map(([l, h]) => `<a href="#/${h}" class="pb-1 ${r == h ? 'text-rose border-b border-rose' : 'hover:text-rose'}">${l}</a>`).join('')}</nav>
<div class="flex items-center gap-4 text-lg"><button data-search aria-label="Search">🔍</button><a href="#/contact" aria-label="Account">👤</a>
<a href="#/cart" class="relative" aria-label="Cart">🛒<span id="badge" class="absolute -top-2 -right-3 bg-wine text-white text-[10px] rounded-full w-4 h-4 grid place-items-center">${count()}</span></a>
<button data-menu class="lg:hidden" aria-label="Menu">☰</button></div></div>
<nav id="mnav" class="hidden flex-col gap-3 px-4 pb-4 text-sm lg:hidden">${NAV.map(([l, h]) => `<a href="#/${h}" class="${r == h ? 'text-rose' : ''}">${l}</a>`).join('')}</nav></header>`;

const Footer = () => `<footer class="scallop text-white"><div class="max-w-[1200px] mx-auto px-4 py-10 grid gap-8 text-sm sm:grid-cols-2 lg:grid-cols-5">
<div><b class="font-serif italic text-xl">🧁 SweetCrumbs</b><p class="my-3">We bake more than cakes, we bake happiness!</p><div class="flex gap-2">${['f', 'in', 'P', '▶'].map(s => `<a href="#" class="bg-white text-rose w-8 h-8 rounded-full grid place-items-center text-xs font-bold" aria-label="Social">${s}</a>`).join('')}</div></div>
<div><h4 class="font-semibold mb-3">Quick Links</h4>${[['Home', 'home'], ['About Us', 'about'], ['Cakes', 'cakes'], ['Custom Cakes', 'custom'], ['Contact Us', 'contact']].map(([l, h]) => `<a class="block mb-1" href="#/${h}">${l}</a>`).join('')}</div>
<div><h4 class="font-semibold mb-3">Customer Service</h4>${['FAQs', 'Shipping & Delivery', 'Returns & Refunds', 'Privacy Policy', 'Terms & Conditions'].map(l => `<a class="block mb-1" href="#/contact">${l}</a>`).join('')}</div>
<div><h4 class="font-semibold mb-3">Contact Us</h4><p>📞 ${C.PHONE}</p><p class="my-1">✉️ ${C.OWNER_EMAIL}</p><p>📍 ${C.ADDRESS}</p></div>
<div><h4 class="font-semibold mb-3">Newsletter</h4><p class="mb-2">Subscribe to get updates on new cakes, offers & more!</p><form data-news><input type="email" required placeholder="Enter your email" aria-label="Email" class="inp text-ink"><button class="w-full mt-2 bg-[#E0566F] rounded-full py-2 font-medium">Subscribe</button></form></div>
</div><p class="text-center text-xs pb-4">© 2024 SweetCrumbs. All Rights Reserved.</p></footer>`;

const Title = t => `<h2 class="stitle">${t}</h2>`;
const stars = n => '★'.repeat(Math.floor(n)) + (n % 1 ? '⯪' : '') ;
const Card = p => `<article class="card reveal">${img(U(p.img), p.name, 'rounded-xl w-full aspect-[4/3] object-cover')}<h3 class="font-semibold text-sm mt-3">${p.name}</h3>
<div class="text-gold text-xs">${stars(p.rating)} <span class="text-mut">(${p.reviews})</span></div><p class="font-semibold my-1">${money(p.price)}</p>
<button data-add="${p.id}" class="btn w-full">🛒 Add to Cart</button></article>`;
const Banner = (t, s) => `<section class="bg-blush2 text-center py-14 px-4"><h1 class="font-serif font-bold text-4xl">${t}</h1><p class="text-mut mt-2 text-sm">${s}</p></section>`;
const Sec = (inner, bg = '') => `<section class="${bg} py-12"><div class="max-w-[1200px] mx-auto px-4">${inner}</div></section>`;
const CatTile = (c, big) => `<a href="#/cakes?cat=${encodeURIComponent(c[0])}" class="text-center shrink-0 text-sm"><div class="circle ${big ? 'w-44 h-44' : 'w-28 h-28 md:w-32 md:h-32'} mx-auto mb-2 p-2">${img(U(c[1]), c[0], 'rounded-full w-full h-full object-cover')}</div>${c[0]}</a>`;

/* ---------- ORDER FORM (email + WhatsApp) ---------- */
const F = (n, l, t = 'text', req) => `<label class="block text-sm">${l}${req ? '*' : ''}<input name="${n}" type="${t}" ${req ? 'required' : ''} class="inp"></label>`;
const S = (n, l, o) => `<label class="block text-sm">${l}<select name="${n}" class="inp">${o.map(x => `<option>${x}</option>`).join('')}</select></label>`;
function OrderForm(withCart) {
  const min = new Date(Date.now() + C.MIN_DAYS_AHEAD * 864e5).toISOString().slice(0, 10);
  return `<form id="orderForm" novalidate class="card !p-6 grid gap-4 sm:grid-cols-2 text-left">
${F('name', 'Full Name', 'text', 1)}${F('phone', 'Phone / WhatsApp', 'tel', 1)}${F('email', 'Email', 'email', 1)}
${S('type', 'Cake Type', CATS.map(c => c[0]))}${F('flavour', 'Flavour')}${S('weight', 'Weight / Size', ['0.5 kg', '1 kg', '2 kg', '3 kg+'])}
${S('eggless', 'Eggless?', ['No', 'Yes'])}${S('tiers', 'Tiers', ['1', '2', '3'])}${F('message', 'Message on Cake')}
<label class="block text-sm sm:col-span-2">Design Description<textarea name="design" rows="3" class="inp"></textarea></label>
<label class="block text-sm sm:col-span-2">Reference Image (optional)<input name="ref" type="file" accept="image/*" class="inp"></label>
${S('delivery', 'Delivery or Pickup', ['Delivery', 'Pickup'])}${F('address', 'Delivery Address / City / Pincode')}
<label class="block text-sm">Date Needed*<input name="date" type="date" min="${min}" required class="inp"></label>${F('time', 'Time', 'time')}
${F('budget', 'Budget (optional)')}${F('notes', 'Additional Notes')}
<label class="block text-sm sm:col-span-2">Order Summary<textarea name="items" rows="3" readonly class="inp bg-blush">${withCart ? getCart().map(i => `${i.qty} x ${i.name} (${money(i.price)})`).join('\n') + `\nTotal: ${money(total())}` : ''}</textarea></label>
<p id="formMsg" role="alert" class="sm:col-span-2 text-sm"></p><button class="btn sm:col-span-2 !py-3">Send Order 💕</button></form>`;
}
function validate(d) {
  if (!d.name.trim()) return 'Please enter your name.';
  if (!/^\+?[0-9\s-]{10,15}$/.test(d.phone)) return 'Enter a valid phone number (10–15 digits).';
  if (!/^\S+@\S+\.\S+$/.test(d.email)) return 'Enter a valid email address.';
  if (!d.date || new Date(d.date) < new Date(new Date().toDateString()) || (new Date(d.date) - Date.now()) / 864e5 < C.MIN_DAYS_AHEAD - 1) return `Choose a date at least ${C.MIN_DAYS_AHEAD} days from today.`;
  return '';
}
const orderText = d => `🎂 *New Order – SweetCrumbs*\n👤 Name: ${d.name}\n📞 Phone: ${d.phone}\n✉️ Email: ${d.email}\n🍰 Cake: ${d.type} | Flavour: ${d.flavour || '-'} | Weight: ${d.weight} | Eggless: ${d.eggless} | Tiers: ${d.tiers}\n📝 Message on cake: ${d.message || '-'}\n🎨 Design: ${d.design || '-'}\n📅 Date & Time: ${d.date} ${d.time || ''}\n📍 ${d.delivery}: ${d.address || '-'}\n🛒 Items: ${d.items || '-'}\n💰 Budget: ${d.budget || '-'}\n🗒️ Notes: ${d.notes || '-'}`;
async function submitOrder(form) {
  const d = Object.fromEntries(new FormData(form)), msg = $('#formMsg'), err = validate(d);
  if (err) { msg.className = 'sm:col-span-2 text-sm text-red-600'; msg.textContent = err; return; }
  const text = orderText(d); d.ref = d.ref && d.ref.name || '';
  window.open(`https://wa.me/${C.OWNER_WHATSAPP}?text=${encodeURIComponent(text)}`, '_blank'); // 1) WhatsApp (opened first so browsers don't block it)
  if (C.EMAIL_ENDPOINT) { // 2) Email via Formspree / your backend (which also emails the customer)
    try { await fetch(C.EMAIL_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ _subject: `New Cake Order – ${d.name}`, _replyto: d.email, ...d, order_details: text }) }); } catch (e) { console.error(e); }
  } else { const a = document.createElement('a'); a.href = `mailto:${C.OWNER_EMAIL}?subject=${encodeURIComponent('New Cake Order – ' + d.name)}&body=${encodeURIComponent(text.replace(/\*/g, ''))}`; a.click(); }
  msg.className = 'sm:col-span-2 text-sm text-rose font-medium'; msg.textContent = "Thank you! Your order has been sent. We'll contact you shortly 💕";
  if (form.dataset.cart) saveCart([]); form.reset();
}

/* ---------- PAGES ---------- */
const Home = () => `
<section class="relative overflow-hidden bg-gradient-to-r from-blush via-blush to-pinkc/60"><div class="max-w-[1200px] mx-auto px-4 grid md:grid-cols-2 items-center gap-6 py-12 md:py-20">
<div class="relative z-10"><p class="text-xs mb-3">Delicious Cakes for Every Celebration</p><h1 class="font-serif font-bold text-4xl md:text-5xl leading-tight">Made with Love,<br><i class="text-rose font-medium text-5xl md:text-6xl">Just for You!</i></h1>
<p class="text-rose my-2">〰♥〰</p><p class="text-sm max-w-xs mb-5">From birthdays to anniversaries, we bake moments into every slice.</p><a href="#/cakes" class="btn">Shop Now →</a></div>
${img(U(P2), 'Pink cake with chocolate drip and strawberries', 'rounded-3xl w-full h-72 md:h-96 object-cover shadow-xl')}</div></section>
${Sec(Title('Shop by Category') + `<div class="flex gap-6 overflow-x-auto pb-2 lg:justify-between">${CATS.map(c => CatTile(c)).join('')}</div>`)}
${Sec(Title('Our Bestsellers') + `<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">${PRODUCTS.slice(0, 5).map(Card).join('')}</div>`)}
<section class="bg-blush2 py-12"><div class="max-w-[1200px] mx-auto px-4 grid lg:grid-cols-2 gap-10 items-center">
<div class="grid sm:grid-cols-2 gap-6 items-center"><div><p class="text-rose text-xs mb-2">A Little About Us</p><h2 class="font-serif font-bold text-2xl mb-3">Baked with Passion, Served with Love.</h2><p class="text-xs mb-4">At SweetCrumbs, we believe every celebration deserves a perfect cake. We use the finest ingredients to craft delicious cakes that bring joy to your special moments.</p><a href="#/about" class="btn">Read More</a></div>${img(U(P2), 'Pink flower cake', 'rounded-2xl w-full h-64 object-cover')}</div>
<div><p class="text-rose text-xs mb-3">Why Choose Us?</p><div class="grid sm:grid-cols-2 gap-5">${WHY.map(w => `<div class="flex gap-3"><span class="circle w-12 h-12 shrink-0">${w[0]}</span><div><b class="text-sm">${w[1]}</b><p class="text-xs text-mut">${w[2]}</p></div></div>`).join('')}</div></div></div></section>
${Sec(Title('What Our Customers Say') + Reviews() + `<p class="text-center text-rose mt-4 text-xs">● <span class="opacity-40">● ●</span></p>`)}
${Sec(Title('Latest from Our Blog') + BlogGrid())}`;
const Reviews = () => `<div class="grid md:grid-cols-3 gap-4">${REVIEWS.map(r => `<div class="card reveal !p-5"><div class="flex items-center gap-3 mb-2"><span class="circle w-10 h-10">🙂</span><b class="text-sm">${r[0]}</b><span class="text-gold text-xs">★★★★★</span></div><p class="text-rose text-2xl leading-none">❝</p><p class="text-xs">${r[1]}</p></div>`).join('')}</div>`;
const BlogGrid = () => `<div class="grid md:grid-cols-3 gap-4">${BLOG.map(b => `<article class="card reveal flex gap-3 !p-0 overflow-hidden">${img(U(b[2]), b[0], 'w-28 object-cover')}<div class="py-3 pr-3"><h3 class="font-semibold text-sm mb-1">${b[0]}</h3><p class="text-xs text-mut mb-2">${b[1]}</p><a href="#/blog" class="text-rose text-xs">Read More →</a></div></article>`).join('')}</div>`;

const About = () => Banner('About SweetCrumbs', 'Home / About') + Sec(`<div class="grid md:grid-cols-2 gap-10 items-center">${img(U(P2), 'Our bakery', 'rounded-2xl w-full h-80 object-cover')}<div><h2 class="font-serif font-bold text-3xl mb-3">Our Story</h2><p class="text-sm mb-3">SweetCrumbs began in a tiny home kitchen with one belief: a cake should taste as good as it looks. Today we bake every order fresh, by hand, with real butter, real fruit and plenty of love.</p><p class="text-sm"><b>Mission:</b> turn your moments into memories, one slice at a time. <b>Values:</b> fresh, honest, handmade.</p></div></div>`) +
  Sec(Title('Why Choose Us') + `<div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">${WHY.map(w => `<div class="card text-center"><span class="circle w-14 h-14 mx-auto mb-2">${w[0]}</span><b class="text-sm">${w[1]}</b><p class="text-xs text-mut">${w[2]}</p></div>`).join('')}</div>`, 'bg-blush2') +
  Sec(Title('Meet Our Bakers') + `<div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">${['Anna|Head Baker', 'Rohan|Cake Designer', 'Mia|Pastry Chef', 'Leo|Delivery Lead'].map(t => `<div class="card"><span class="circle w-20 h-20 mx-auto mb-2 text-3xl">🧑‍🍳</span><b class="text-sm">${t.split('|')[0]}</b><p class="text-xs text-mut">${t.split('|')[1]}</p></div>`).join('')}</div>`) +
  Sec(`<div class="grid grid-cols-3 text-center font-serif text-rose text-3xl font-bold"><div>12,000+<p class="font-sans text-xs text-mut font-normal">Cakes baked</p></div><div>8,500+<p class="font-sans text-xs text-mut font-normal">Happy customers</p></div><div>9<p class="font-sans text-xs text-mut font-normal">Years</p></div></div><p class="text-center mt-8"><a href="#/custom" class="btn">Design your cake</a></p>`);

const Cakes = q => { const cat = q.get('cat') || '', s = (q.get('q') || '').toLowerCase(); const list = PRODUCTS.filter(p => (!cat || p.cat == cat) && p.name.toLowerCase().includes(s));
  return Banner(cat || 'Our Cakes', 'Home / Cakes') + Sec(`<div class="flex flex-wrap gap-2 mb-6 justify-center"><a href="#/cakes" class="btn ${cat ? '!bg-pinkc !text-wine' : ''}">All</a>${CATS.map(c => `<a href="#/cakes?cat=${encodeURIComponent(c[0])}" class="btn ${cat == c[0] ? '' : '!bg-pinkc !text-wine'}">${c[0]}</a>`).join('')}</div>
<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">${list.map(Card).join('') || '<p class="col-span-full text-center text-mut">No cakes found. Try another category.</p>'}</div>`); };
const Categories = () => Banner('Categories', 'Pick an occasion') + Sec(`<div class="grid grid-cols-2 md:grid-cols-4 gap-8">${CATS.map(c => CatTile(c, 1)).join('')}</div>`);
const Custom = () => Banner('Custom Cakes', 'Your idea, our oven') + Sec(Title('How It Works') + `<div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">${['💡 Share your idea', '💬 Get a quote', '🎂 We bake', '🚚 Delivery'].map((s, i) => `<div class="card">${s}</div>`).join('')}</div>`, 'bg-blush2') +
  Sec(Title('Past Creations') + `<div class="grid grid-cols-2 md:grid-cols-4 gap-4">${[P1, P2, P3, P4].map(p => img(U(p), 'Custom cake', 'rounded-2xl aspect-square object-cover w-full')).join('')}</div>`) +
  Sec(Title('Place Your Custom Order') + `<div class="max-w-3xl mx-auto">${OrderForm()}</div>`);
const Blog = () => Banner('Our Blog', 'Tips, trends & stories') + Sec(BlogGrid() + BlogGrid());
const Contact = () => Banner('Contact Us', 'We would love to hear from you') + Sec(`<div class="grid md:grid-cols-2 gap-10"><div class="text-sm space-y-3"><p>📞 ${C.PHONE}</p><p>✉️ ${C.OWNER_EMAIL}</p><p>📍 ${C.ADDRESS}</p><p>🕘 Mon–Sun, 9am – 8pm</p><iframe title="Map" class="w-full h-56 rounded-2xl border-0" loading="lazy" src="https://www.google.com/maps?q=${encodeURIComponent(C.ADDRESS)}&output=embed"></iframe></div>
<form data-contact class="card !p-6 grid gap-4">${F('name', 'Name', 'text', 1)}${F('email', 'Email', 'email', 1)}<label class="text-sm">Message*<textarea name="message" rows="4" required class="inp"></textarea></label><button class="btn !py-3">Send Message</button></form></div>`);
const Cart = () => { const c = getCart(); return Banner('Your Cart', 'Review and place your order') + Sec(c.length ? `<div class="grid lg:grid-cols-2 gap-8"><div class="space-y-3">${c.map(i => `<div class="card flex items-center gap-3">${img(U(i.img), i.name, 'w-16 h-16 rounded-xl object-cover')}<div class="flex-1 text-sm"><b>${i.name}</b><p>${money(i.price)}</p></div><button data-qty="${i.id}:-1" class="btn !px-3">−</button>${i.qty}<button data-qty="${i.id}:1" class="btn !px-3">+</button><button data-del="${i.id}" aria-label="Remove">✕</button></div>`).join('')}<p class="text-right font-semibold">Subtotal: ${money(total())}</p></div>${OrderForm(1).replace('<form ', '<form data-cart="1" ')}</div>` : `<p class="text-center">Your cart is empty. <a class="text-rose underline" href="#/cakes">Browse cakes</a></p>`); };

/* ---------- ROUTER ---------- */
const ROUTES = { home: Home, about: About, cakes: Cakes, categories: Categories, custom: Custom, blog: Blog, contact: Contact, cart: Cart };
function render() {
  const [path, qs] = (location.hash.slice(2) || 'home').split('?'), r = ROUTES[path] ? path : 'home';
  $('#app').innerHTML = Header(r) + `<main>${ROUTES[r](new URLSearchParams(qs))}</main>` + Footer();
  window.scrollTo(0, 0);
  const io = new IntersectionObserver(e => e.forEach(x => x.isIntersecting && x.target.classList.add('show')), { threshold: .1 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  $('#wa-float').href = `https://wa.me/${C.OWNER_WHATSAPP}?text=${encodeURIComponent('Hi SweetCrumbs! I would like to order a cake.')}`;
}
addEventListener('hashchange', render); addEventListener('DOMContentLoaded', render);

document.addEventListener('click', e => {
  const t = e.target.closest('[data-add],[data-menu],[data-search],[data-qty],[data-del]'); if (!t) return;
  if (t.dataset.add) addToCart(t.dataset.add);
  if (t.dataset.menu) $('#mnav').classList.toggle('hidden');
  if (t.dataset.search) { const q = prompt('Search cakes:'); if (q) location.hash = '#/cakes?q=' + encodeURIComponent(q); }
  if (t.dataset.qty) { const [id, d] = t.dataset.qty.split(':'), c = getCart(), i = c.find(x => x.id == id); i.qty = Math.max(1, i.qty + +d); saveCart(c); render(); }
  if (t.dataset.del) { saveCart(getCart().filter(x => x.id != t.dataset.del)); render(); }
});
document.addEventListener('submit', e => {
  e.preventDefault(); const f = e.target;
  if (f.id == 'orderForm') submitOrder(f);
  else if (f.matches('[data-news]')) { toast('Subscribed! 💕'); f.reset(); }
  else if (f.matches('[data-contact]')) { const d = Object.fromEntries(new FormData(f)); window.open(`https://wa.me/${C.OWNER_WHATSAPP}?text=${encodeURIComponent(`💌 Contact: ${d.name} (${d.email})\n${d.message}`)}`, '_blank'); location.href = `mailto:${C.OWNER_EMAIL}?subject=Website enquiry&body=${encodeURIComponent(d.message + '\n' + d.name + ' ' + d.email)}`; f.reset(); }
});
