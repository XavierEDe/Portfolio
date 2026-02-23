// CREDENTIALS & STATE
const ADMIN_EMAIL = 'admin@eventxed.com';
const ADMIN_PW = 'XED12345';
const TODAY = new Date('2026-02-22');

let currentUser = null;
let currentCategory = 'All';
let currentSearch = '';
let currentModal = null;
let currentSection = 'home';
let uploadedDataUrl = null;

// EVENTS DATA (2026 upcoming + 2025 past)
let events = [
  // 2026 UPCOMING
  {id:1,name:'Consensus 2026',cat:'Fintech',date:'2026-05-11',location:'Austin, USA',country:'USA',format:'In-Person',price:'Paid',organizer:'CoinDesk',desc:"The world's largest crypto, blockchain, and Web3 summit. Three days of keynotes, workshops, and networking with the builders shaping decentralized finance.",url:'https://consensus.coindesk.com',img:'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&q=80',featured:true,views:1840},
  {id:2,name:'Web Summit 2026',cat:'Tech',date:'2026-11-02',location:'Lisbon, Portugal',country:'Portugal',format:'In-Person',price:'Paid',organizer:'Web Summit',desc:'One of the largest technology conferences on earth, bringing together founders, CEOs, policymakers, and investors from 160+ countries.',url:'https://websummit.com',img:'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80',featured:true,views:3100},
  {id:3,name:'Money20/20 USA 2026',cat:'Fintech',date:'2026-10-25',location:'Las Vegas, USA',country:'USA',format:'In-Person',price:'Paid',organizer:'Money20/20',desc:"The world's largest fintech event, where the global payments ecosystem connects to create the future of money and financial services.",url:'https://us.money2020.com',img:'https://images.unsplash.com/photo-1605792657660-596af9009e82?w=600&q=80',featured:true,views:2660},
  {id:4,name:'TechCrunch Disrupt 2026',cat:'Startup',date:'2026-10-19',location:'San Francisco, USA',country:'USA',format:'In-Person',price:'Paid',organizer:'TechCrunch',desc:"The premier destination for the world's most audacious startups and the investors backing them. Startup Battlefield returns with its iconic pitch competition.",url:'https://techcrunch.com/events',img:'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&q=80',featured:true,views:2140},
  {id:5,name:'GITEX Global 2026',cat:'Tech',date:'2026-10-12',location:'Dubai, UAE',country:'UAE',format:'In-Person',price:'Paid',organizer:'DWTC',desc:"The world's largest tech show. 200,000+ visitors across AI, Web3, cloud, cybersecurity, and smart cities. 40+ conferences running simultaneously.",url:'https://gitex.com',img:'https://images.unsplash.com/photo-1594024917-c97416fdb679?w=600&q=80',featured:true,views:2950},
  {id:6,name:'Global AI Governance Summit 2026',cat:'Government',date:'2026-03-10',location:'London, UK',country:'UK',format:'Hybrid',price:'Paid',organizer:'UK AI Safety Institute',desc:'International policymakers, AI researchers, and industry leaders align on frontier AI governance frameworks, safety benchmarks, and cross-border regulation.',url:'https://gov.uk',img:'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80',featured:false,views:1700},
  {id:7,name:'SuperReturn International 2026',cat:'Investor',date:'2026-06-09',location:'Berlin, Germany',country:'Germany',format:'In-Person',price:'Paid',organizer:'SuperReturn',desc:"The world's leading private equity and venture capital conference. 5,000+ LPs, GPs, and institutional investors across 3 intensive days of deal-making.",url:'https://superreturn.com',img:'https://images.unsplash.com/photo-1560472355-536de3962603?w=600&q=80',featured:false,views:1600},
  {id:8,name:'Slush 2026',cat:'Startup',date:'2026-11-19',location:'Helsinki, Finland',country:'Finland',format:'In-Person',price:'Paid',organizer:'Slush',desc:"The world's most founder-focused startup event. Built by and for entrepreneurs, Slush connects the best startups with the most committed investors.",url:'https://slush.org',img:'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&q=80',featured:false,views:1270},
  {id:9,name:'Singapore Fintech Festival 2026',cat:'Fintech',date:'2026-11-04',location:'Singapore',country:'Singapore',format:'In-Person',price:'Paid',organizer:'MAS & SFA',desc:"Asia's flagship fintech event, bringing together 60,000+ attendees from 130+ countries to shape the future of finance, payments, and digital banking.",url:'https://fintechfestival.sg',img:'https://images.unsplash.com/photo-1501386761578-eaa54b01dc1e?w=600&q=80',featured:false,views:1480},
  {id:10,name:'VivaTech 2026',cat:'Tech',date:'2026-06-10',location:'Paris, France',country:'France',format:'In-Person',price:'Paid',organizer:'Viva Technology',desc:"Europe's biggest startup and tech event. 150,000+ visitors, 2,500+ startups, and 450+ speakers debating innovations reshaping every industry.",url:'https://vivatechnology.com',img:'https://images.unsplash.com/photo-1495562569060-2eec283d3391?w=600&q=80',featured:false,views:1950},
  {id:11,name:'Nigeria Digital Economy Summit 2026',cat:'Government',date:'2026-04-22',location:'Abuja, Nigeria',country:'Nigeria',format:'In-Person',price:'Free',organizer:'NITDA',desc:"Nigeria's premier government-convened digital economy forum. Policymakers, regulators, founders, and investors align on Digital Economy Policy implementation.",url:'https://nitda.gov.ng',img:'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=600&q=80',featured:false,views:680},
  {id:12,name:'SaaStr Annual 2026',cat:'Startup',date:'2026-09-09',location:'San Mateo, USA',country:'USA',format:'In-Person',price:'Paid',organizer:'SaaStr',desc:"The world's largest gathering of SaaS founders, operators, and investors. 10,000+ attendees, 500+ sessions, and the highest density of SaaS expertise on earth.",url:'https://saastrannual.com',img:'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=600&q=80',featured:false,views:1380},
  {id:13,name:'Collision 2026',cat:'Tech',date:'2026-06-15',location:'Toronto, Canada',country:'Canada',format:'In-Person',price:'Paid',organizer:'Collision',desc:"North America's fastest-growing tech conference — four days in Toronto where tech's boldest founders, biggest investors, and media collide.",url:'https://collisionconf.com',img:'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80',featured:false,views:1520},
  {id:14,name:'Money20/20 Europe 2026',cat:'Fintech',date:'2026-06-01',location:'Amsterdam, Netherlands',country:'Netherlands',format:'In-Person',price:'Paid',organizer:'Money20/20',desc:"Europe's defining fintech event. 8,000+ senior financial services leaders, regulators, and innovators building the future of money.",url:'https://europe.money2020.com',img:'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=600&q=80',featured:false,views:1330},
  {id:15,name:'Web3 Summit 2026',cat:'Tech',date:'2026-04-06',location:'Berlin, Germany',country:'Germany',format:'In-Person',price:'Paid',organizer:'Web3 Foundation',desc:'The flagship gathering of the decentralized web community. Protocol developers, dApp founders, and ecosystem investors building the open internet.',url:'https://web3summit.com',img:'https://images.unsplash.com/photo-1639762681057-408e52192e55?w=600&q=80',featured:false,views:1090},
  {id:16,name:'Nairobi Tech Week 2026',cat:'Tech',date:'2026-07-14',location:'Nairobi, Kenya',country:'Kenya',format:'In-Person',price:'Paid',organizer:'Africa Tech Network',desc:"East Africa's premier technology festival covering mobile money, agritech, healthtech, and the infrastructure powering Africa's digital transformation.",url:'https://nairobitechweek.com',img:'https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=600&q=80',featured:false,views:820},
  {id:17,name:'TechEx Global Virtual 2026',cat:'Tech',date:'2026-08-17',location:'Online',country:'',format:'Virtual',price:'Free',organizer:'TechEx',desc:'The worlds largest free virtual tech summit. 70,000+ registered attendees and 200 speakers across AI, cloud, data, and cybersecurity.',url:'https://techexglobal.com',img:'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=600&q=80',featured:false,views:950},
  {id:18,name:'Investor Summit Africa 2026',cat:'Investor',date:'2026-05-28',location:'Lagos, Nigeria',country:'Nigeria',format:'In-Person',price:'Paid',organizer:'Africa Capital Alliance',desc:'Pan-African investment summit connecting LPs, GPs, and family offices deploying capital across Sub-Saharan Africa across infrastructure, tech, and agriculture.',url:'https://africacapital.com',img:'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=600&q=80',featured:false,views:740},

  // 2025/2026 PAST
  {id:101,name:'CES 2026',cat:'Tech',date:'2026-01-06',location:'Las Vegas, USA',country:'USA',format:'In-Person',price:'Paid',organizer:'Consumer Technology Association',desc:'CES 2026 premiered foldable laptops from three major OEMs, AI-integrated household appliances, and quantum computing chips from Intel and IBM.',url:'https://ces.tech',img:'https://images.unsplash.com/photo-1585689189883-0c88cd4c4f6d?w=600&q=80',featured:false,views:5200},
  {id:102,name:'Web Summit 2025',cat:'Tech',date:'2025-11-03',location:'Lisbon, Portugal',country:'Portugal',format:'In-Person',price:'Paid',organizer:'Web Summit',desc:'The 2025 edition welcomed 75,000+ attendees and saw major product launches from Apple, Google, and 2,500+ startups across four days.',url:'https://websummit.com',img:'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80',featured:false,views:5600},
  {id:103,name:'GITEX Global 2025',cat:'Tech',date:'2025-10-13',location:'Dubai, UAE',country:'UAE',format:'In-Person',price:'Paid',organizer:'DWTC',desc:'A record 200,000+ visitors attended GITEX 2025, with AI dominating the agenda alongside major partnerships between Gulf governments and global tech firms.',url:'https://gitex.com',img:'https://images.unsplash.com/photo-1594024917-c97416fdb679?w=600&q=80',featured:false,views:6800},
  {id:104,name:'TechCrunch Disrupt 2025',cat:'Startup',date:'2025-10-20',location:'San Francisco, USA',country:'USA',format:'In-Person',price:'Paid',organizer:'TechCrunch',desc:'The 2025 Startup Battlefield crowned an AI-native healthcare startup as winner, with $100M in investor commitments announced during the event.',url:'https://techcrunch.com/events',img:'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&q=80',featured:false,views:3900},
  {id:105,name:'Money20/20 USA 2025',cat:'Fintech',date:'2025-10-26',location:'Las Vegas, USA',country:'USA',format:'In-Person',price:'Paid',organizer:'Money20/20',desc:'The 2025 edition set attendance records with 12,000+ fintech leaders debating open banking, AI in payments, and CBDC implementation globally.',url:'https://us.money2020.com',img:'https://images.unsplash.com/photo-1605792657660-596af9009e82?w=600&q=80',featured:false,views:4100},
  {id:106,name:'Slush 2025',cat:'Startup',date:'2025-11-20',location:'Helsinki, Finland',country:'Finland',format:'In-Person',price:'Paid',organizer:'Slush',desc:'Slush 2025 saw €2.3B in funding announced by attendees, with a record 4,000 investor-startup meetings facilitated through the platform.',url:'https://slush.org',img:'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&q=80',featured:false,views:2900},
  {id:107,name:'VivaTech 2025',cat:'Tech',date:'2025-06-11',location:'Paris, France',country:'France',format:'In-Person',price:'Paid',organizer:'Viva Technology',desc:'VivaTech 2025 attracted 165,000 visitors and featured live demonstrations of humanoid robots, generative AI platforms, and climate tech innovations.',url:'https://vivatechnology.com',img:'https://images.unsplash.com/photo-1495562569060-2eec283d3391?w=600&q=80',featured:false,views:3300},
  {id:108,name:'Consensus 2025',cat:'Fintech',date:'2025-05-14',location:'Austin, USA',country:'USA',format:'In-Person',price:'Paid',organizer:'CoinDesk',desc:'The 2025 edition brought 15,000+ crypto and Web3 professionals together in Austin for three days of groundbreaking announcements and regulatory debate.',url:'https://consensus.coindesk.com',img:'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&q=80',featured:false,views:4200},
  {id:109,name:'Africa Tech Summit 2025',cat:'Tech',date:'2025-03-15',location:'Nairobi, Kenya',country:'Kenya',format:'In-Person',price:'Paid',organizer:'Africa Tech Summit',desc:'The 2025 Summit convened 1,500+ African tech ecosystem players, with $350M in new venture capital commitments to African startups announced.',url:'https://africatechsummit.com',img:'https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=600&q=80',featured:false,views:1900},
  {id:110,name:'Singapore Fintech Festival 2025',cat:'Fintech',date:'2025-11-06',location:'Singapore',country:'Singapore',format:'In-Person',price:'Paid',organizer:'MAS & SFA',desc:'The 2025 Festival broke records with 62,000 attendees from 135 countries, with MAS announcing a new digital asset regulatory framework.',url:'https://fintechfestival.sg',img:'https://images.unsplash.com/photo-1501386761578-eaa54b01dc1e?w=600&q=80',featured:false,views:3700},
];

// HELPERS
const isUpcoming = ev => new Date(ev.date + 'T00:00:00') >= TODAY;
const fmtDate = d => new Date(d + 'T00:00:00').toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'});
const getMonth = d => new Date(d + 'T00:00:00').toLocaleDateString('en-US', {month: 'long'});
const s = (href, w = 14, h = 14) => `<svg width="${w}" height="${h}"><use href="${href}"/></svg>`;
const catIcon = c => ({Tech: '#i-cpu', Fintech: '#i-card', Startup: '#i-rocket', Investor: '#i-dollar', Government: '#i-landmark', All: '#i-globe', Virtual: '#i-monitor'}[c] || '#i-cal');

// THEME
let dark = localStorage.getItem('ex-theme') === 'dark';
function applyTheme() {
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  const btn = document.getElementById('themeBtn');
  if (btn) btn.innerHTML = dark ? s('#i-sun') : s('#i-moon');
}
applyTheme();
document.getElementById('themeBtn').onclick = () => { dark = !dark; localStorage.setItem('ex-theme', dark ? 'dark' : 'light'); applyTheme(); };

// SECTIONS
const SECTIONS = ['home', 'events', 'about', 'signin', 'signup'];
function gotoSection(name) {
  SECTIONS.forEach(n => { const el = document.getElementById('sec-' + n); if (el) el.style.display = name === n ? '' : 'none'; });
  currentSection = name;
  document.querySelectorAll('.nav-links a').forEach((a, i) => {
    a.classList.toggle('active', (i === 0 && ['home', 'signin', 'signup'].includes(name)) || (i === 1 && name === 'events') || (i === 2 && name === 'about'));
  });
  document.querySelectorAll('.mob-ni').forEach((b, i) => {
    b.classList.toggle('active', (i === 0 && name === 'home') || (i === 1 && name === 'events') || (i === 2 && name === 'about') || (i === 3 && ['signin', 'signup'].includes(name)));
  });
  if (name === 'events') { renderCats(); renderAllEvents(); }
  window.scrollTo({top: 0, behavior: 'smooth'});
}
function filterCat(cat) { currentCategory = cat; gotoSection('events'); }

// CARD BUILDER
function makeCard(ev, dark = false) {
  const past = !isUpcoming(ev);
  const el = document.createElement('div');
  el.className = 'card' + (past ? ' past' : '');
  el.innerHTML = `
    <div class="ci">
      ${ev.img ? `<img src="${ev.img}" alt="${ev.name}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">` : ``}
      <div class="ci-ph" style="display:${ev.img ? 'none' : 'flex'}">${s(catIcon(ev.cat), 52, 52)}</div>
      <div class="badges">
        <span class="badge b-${ev.cat}">${s(catIcon(ev.cat), 9, 9)} ${ev.cat}</span>
        ${ev.featured && !past ? `<span class="badge b-feat">${s('#i-star', 9, 9)} Featured</span>` : ''}
        ${past ? '<span class="badge b-past">Past</span>' : ''}
        ${ev.price === 'Free' ? '<span class="badge b-free">Free</span>' : ''}
        ${ev.format === 'Virtual' ? `<span class="badge b-Virtual">${s('#i-monitor', 9, 9)} Virtual</span>` : ''}
      </div>
    </div>
    <div class="cb">
      <div class="cmeta">
        <span class="cdate${past ? ' past-c' : ''}">${s('#i-cal', 12, 12)} ${fmtDate(ev.date)}</span>
        <span class="cloc">${s('#i-pin', 11, 11)} ${ev.location}</span>
      </div>
      <div class="ctitle">${ev.name}</div>
      <div class="cdesc">${ev.desc}</div>
      <div class="cfoot">
        <span class="corg">${s('#i-building', 11, 11)} ${ev.organizer || '—'}</span>
        <button class="btn ${past ? 'btn-ghost' : 'btn-primary'} btn-sm" onclick="openModal(${ev.id},event)">${past ? 'View Archive' : 'View Event'} ${s('#i-arrow', 11, 11)}</button>
      </div>
    </div>`;
  if (dark) {
    const t = el.querySelector('.ctitle'), d = el.querySelector('.cdesc'), l = el.querySelector('.cloc'), dt = el.querySelector('.cdate');
    if (t) t.style.color = '#fff'; if (d) d.style.color = 'rgba(255,255,255,.5)';
    if (l) l.style.color = 'rgba(255,255,255,.4)'; if (dt) dt.style.color = 'var(--orange-l)';
  }
  return el;
}

// FEATURED + TRENDING
function renderFeatured() {
  const c = document.getElementById('featCarousel'); if (!c) return; c.innerHTML = '';
  events.filter(e => e.featured && isUpcoming(e)).forEach(ev => {
    const card = makeCard(ev, true); card.className = 'fcard'; c.appendChild(card);
  });
}
function renderTrending() {
  const g = document.getElementById('trendGrid'); if (!g) return; g.innerHTML = '';
  [...events].filter(isUpcoming).sort((a, b) => b.views - a.views).slice(0, 6).forEach(ev => g.appendChild(makeCard(ev)));
}

// CATEGORY CHIPS
function renderCats() {
  const w = document.getElementById('catChips'); if (!w) return; w.innerHTML = '';
  ['All', 'Tech', 'Fintech', 'Startup', 'Investor', 'Government', 'Virtual'].forEach(cat => {
    const chip = document.createElement('div');
    chip.className = 'cat-chip' + (currentCategory === cat ? ' active' : '');
    chip.dataset.cat = cat;
    chip.innerHTML = `${s(catIcon(cat), 13, 13)} ${cat}`;
    chip.onclick = () => { currentCategory = cat; document.querySelectorAll('.cat-chip').forEach(x => x.classList.remove('active')); chip.classList.add('active'); renderAllEvents(); };
    w.appendChild(chip);
  });
}

// EVENTS FILTERING
function applyFilters() { renderAllEvents(); }
function filterBase(list) {
  let f = [...list];
  if (currentCategory && currentCategory !== 'All')
    f = f.filter(e => currentCategory === 'Virtual' ? e.format === 'Virtual' : e.cat === currentCategory);
  if (currentSearch) { const q = currentSearch.toLowerCase(); f = f.filter(e => (e.name + e.location + e.cat + e.desc).toLowerCase().includes(q)); }
  const co = document.getElementById('cFilter')?.value; if (co) f = f.filter(e => e.country === co);
  const mo = document.getElementById('mFilter')?.value; if (mo) f = f.filter(e => getMonth(e.date) === mo);
  const fm = document.getElementById('fmFilter')?.value; if (fm) f = f.filter(e => e.format === fm);
  const pr = document.getElementById('prFilter')?.value; if (pr) f = f.filter(e => e.price === pr);
  return f;
}
function renderAllEvents() {
  const ug = document.getElementById('upGrid'), pg = document.getElementById('pastGrid'),
        pd = document.getElementById('pastDivider'), em = document.getElementById('emptyState'),
        cnt = document.getElementById('filterCnt');
  const tf = document.getElementById('tFilter')?.value || '';
  let filtered = filterBase(events);
  let up = filtered.filter(isUpcoming).sort((a, b) => new Date(a.date) - new Date(b.date));
  let ps = filtered.filter(e => !isUpcoming(e)).sort((a, b) => new Date(b.date) - new Date(a.date));
  if (tf === 'upcoming') ps = [];
  if (tf === 'past') up = [];
  const total = up.length + ps.length;
  if (cnt) cnt.textContent = `${total} event${total !== 1 ? 's' : ''}`;
  if (ug) ug.innerHTML = ''; if (pg) pg.innerHTML = '';
  if (!total) { if (em) em.style.display = 'block'; if (pd) pd.style.display = 'none'; return; }
  if (em) em.style.display = 'none';
  up.forEach(ev => { if (ug) ug.appendChild(makeCard(ev)); });
  if (ps.length && tf !== 'upcoming') { if (pd) pd.style.display = 'flex'; ps.forEach(ev => { if (pg) pg.appendChild(makeCard(ev)); }); }
  else { if (pd) pd.style.display = 'none'; }
}

// MODAL
function openModal(id, e) { if (e) e.stopPropagation();
  const ev = events.find(x => x.id === id); if (!ev) return;
  currentModal = ev; ev.views = (ev.views || 0) + 1;
  const past = !isUpcoming(ev);
  document.getElementById('mHero').innerHTML = ev.img
    ? `<img src="${ev.img}" alt="${ev.name}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"><div class="modal-img-ph" style="display:none">${s(catIcon(ev.cat), 76, 76)}</div>`
    : `<div class="modal-img-ph">${s(catIcon(ev.cat), 76, 76)}</div>`;
  document.getElementById('mBadges').innerHTML = `<span class="badge b-${ev.cat}" style="font-size:.78rem;padding:5px 13px">${s(catIcon(ev.cat), 11, 11)} ${ev.cat}</span>${past ? '<span class="badge b-past" style="font-size:.78rem;padding:5px 13px">Past Event</span>' : ev.featured ? `<span class="badge b-feat" style="font-size:.78rem;padding:5px 13px">${s('#i-star', 11, 11)} Featured</span>` : ''}<span class="mtag">${ev.format}</span><span class="mtag">${ev.price}</span>`;
  document.getElementById('mTitle').textContent = ev.name;
  document.getElementById('mOrg').innerHTML = `${s('#i-building', 13, 13)} Organized by <strong>${ev.organizer || 'N/A'}</strong>`;
  document.getElementById('mDesc').textContent = ev.desc;
  document.getElementById('mInfo').innerHTML = `<div class="mi"><div class="ml">${s('#i-cal', 11, 11)} Date</div><div class="mv">${fmtDate(ev.date)}</div></div><div class="mi"><div class="ml">${s('#i-pin', 11, 11)} Location</div><div class="mv">${ev.location}</div></div><div class="mi"><div class="ml">${s(catIcon(ev.cat), 11, 11)} Category</div><div class="mv">${ev.cat}</div></div><div class="mi"><div class="ml">${s('#i-eye', 11, 11)} Views</div><div class="mv">${ev.views.toLocaleString()}</div></div>`;
  const ua = document.getElementById('mUrl'); ua.href = ev.url || '#'; ua.innerHTML = `${s('#i-ext', 14, 14)} ${past ? 'View Archive' : 'Visit Official Website'}`;
  document.getElementById('eventModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal() { document.getElementById('eventModal').classList.remove('open'); document.body.style.overflow = ''; }
function shareEvent() { navigator.clipboard.writeText(window.location.href).catch(() => {}); showToast('Link copied to clipboard'); }
function shareTw() { if (currentModal) window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(currentModal.name + ' — EventXed')); }
function shareLI() { if (currentModal) window.open('https://linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(window.location.href)); }

// AUTH - SOCIAL
function handleSocial(provider) {
  showToast(`Redirecting to ${provider}...`);
  setTimeout(() => {
    loginSuccess({name: 'User', email: provider.toLowerCase() + '@social.com', isAdmin: false});
  }, 1600);
}

// AUTH - EMAIL SIGN IN
function doSignin() {
  const email = (document.getElementById('siEmail').value || '').trim().toLowerCase();
  const pw = document.getElementById('siPw').value;
  const errEl = document.getElementById('siErr');
  const errMsg = document.getElementById('siErrMsg');
  errEl.classList.remove('show');

  if (!email || !pw) { errMsg.textContent = 'Please enter your email and password.'; errEl.classList.add('show'); return; }

  // Admin check
  if (email === ADMIN_EMAIL && pw === ADMIN_PW) {
    loginSuccess({name: 'Admin', email: ADMIN_EMAIL, isAdmin: true});
    return;
  }
  // Regular user (demo: any non-empty valid email + pw length >=6)
  if (pw.length < 6) { errMsg.textContent = 'Password must be at least 6 characters.'; errEl.classList.add('show'); return; }
  const name = email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  loginSuccess({name, email, isAdmin: false});
}

// AUTH - EMAIL SIGN UP
function doSignup() {
  const first = (document.getElementById('suFirst').value || '').trim();
  const email = (document.getElementById('suEmail').value || '').trim().toLowerCase();
  const pw = document.getElementById('suPw').value;
  const terms = document.getElementById('suTerms').checked;
  if (!first || !email || !pw) { showToast('Please fill in all required fields.'); return; }
  if (pw.length < 8) { showToast('Password must be at least 8 characters.'); return; }
  if (!terms) { showToast('Please accept the Terms of Service to continue.'); return; }
  // Admin email cannot be registered via signup
  if (email === ADMIN_EMAIL) { showToast('This email is reserved. Please use a different email.'); return; }
  loginSuccess({name: first, email, isAdmin: false});
}

// LOGIN SUCCESS - update nav + show/hide admin fab
function loginSuccess(user) {
  currentUser = user;
  const navRight = document.getElementById('navRight');
  const initials = user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
  navRight.innerHTML = `
    <button class="icon-btn" id="themeBtn2"><svg width="15" height="15"><use href="${dark ? '#i-sun' : '#i-moon'}"/></svg></button>
    <div style="display:flex;align-items:center;gap:7px;padding:6px 13px;border-radius:var(--rs);background:var(--s3);font-size:.86rem;font-weight:600;color:var(--text)">
      <div style="width:26px;height:26px;border-radius:50%;background:linear-gradient(135deg,var(--blue),var(--orange));display:flex;align-items:center;justify-content:center;font-size:.65rem;font-weight:800;color:#fff;flex-shrink:0">${initials}</div>
      ${user.name}${user.isAdmin ? '<span style="font-size:.7rem;background:rgba(5,150,105,.12);color:#059669;padding:2px 8px;border-radius:100px;border:1px solid rgba(5,150,105,.2);font-weight:700">Admin</span>' : ''}
    </div>
    <button class="btn btn-ghost btn-sm" onclick="doSignout()">Sign Out</button>`;
  document.getElementById('themeBtn2').onclick = () => { dark = !dark; localStorage.setItem('ex-theme', dark ? 'dark' : 'light'); applyTheme(); };

  // Show admin fab only to admin
  const fab = document.getElementById('adminFab');
  if (fab) fab.style.display = user.isAdmin ? 'flex' : 'none';

  if (user.isAdmin) {
    showToast('Signed in as Admin. Admin panel is now available.');
  } else {
    showToast(`Welcome back, ${user.name}!`);
  }
  setTimeout(() => gotoSection('home'), 900);
}
function doSignout() {
  currentUser = null;
  document.getElementById('adminFab').style.display = 'none';
  closeAdmin();
  location.reload();
}

// PASSWORD TOGGLE
function togglePw(id, btn) {
  const inp = document.getElementById(id);
  const show = inp.type === 'text';
  inp.type = show ? 'password' : 'text';
  btn.innerHTML = show ? s('#i-eye') : s('#i-eye-off');
}

// ADMIN PANEL
function toggleAdmin() {
  if (!currentUser?.isAdmin) { showToast('Admin access required. Please sign in as admin.'); return; }
  document.getElementById('adminDrawer').classList.toggle('open');
  if (document.getElementById('adminDrawer').classList.contains('open')) { renderAdminList(); renderStats(); }
}
function closeAdmin() { document.getElementById('adminDrawer').classList.remove('open'); }
function switchTab(name) {
  ['add', 'manage', 'stats'].forEach(n => {
    document.getElementById('aTab-' + n).classList.toggle('active', n === name);
    document.getElementById('aContent-' + n).classList.toggle('active', n === name);
  });
  if (name === 'manage') renderAdminList();
  if (name === 'stats') renderStats();
}

// IMAGE UPLOAD
function handleImgFile(input) {
  const file = input.files[0]; if (!file) return;
  if (file.size > 5 * 1024 * 1024) { showToast('Image too large. Max 5 MB.'); return; }
  const reader = new FileReader();
  reader.onload = e => {
    uploadedDataUrl = e.target.result;
    document.getElementById('aImgUrl').value = '';
    showPreview(uploadedDataUrl);
  };
  reader.readAsDataURL(file);
}
function previewUrl(url) {
  if (!url) return;
  uploadedDataUrl = null;
  showPreview(url);
}
function showPreview(src) {
  const wrap = document.getElementById('previewWrap');
  document.getElementById('previewImg').src = src;
  wrap.style.display = 'block';
  document.getElementById('uploadZone').style.display = 'none';
}
function removeImg() {
  uploadedDataUrl = null;
  document.getElementById('previewImg').src = '';
  document.getElementById('aImgUrl').value = '';
  document.getElementById('previewWrap').style.display = 'none';
  document.getElementById('uploadZone').style.display = 'block';
  document.getElementById('imgFile').value = '';
}

function addEvent(e) {
  e.preventDefault();
  const imgSrc = uploadedDataUrl || document.getElementById('aImgUrl').value.trim() || '';
  const ev = {
    id: Date.now(),
    name: document.getElementById('aName').value,
    cat: document.getElementById('aCat').value,
    date: document.getElementById('aDate').value,
    location: document.getElementById('aLoc').value,
    country: document.getElementById('aCountry').value || '',
    format: document.getElementById('aFmt').value,
    price: document.getElementById('aPrc').value,
    organizer: document.getElementById('aOrg').value,
    desc: document.getElementById('aDesc').value,
    url: document.getElementById('aUrl').value,
    img: imgSrc,
    featured: document.getElementById('aFeat').checked,
    views: 0
  };
  events.unshift(ev);
  e.target.reset();
  removeImg();
  renderAll();
  renderAdminList();
  showToast('Event published successfully.');
  switchTab('manage');
}
function deleteEvent(id) {
  if (!confirm('Delete this event permanently?')) return;
  events = events.filter(e => e.id !== id);
  renderAll(); renderAdminList(); renderStats();
  showToast('Event deleted.');
}
function renderAdminList() {
  const q = (document.getElementById('adminSearch')?.value || '').toLowerCase();
  const sb = document.getElementById('adminStat');
  const up = events.filter(isUpcoming).length, ps = events.filter(e => !isUpcoming(e)).length;
  if (sb) sb.innerHTML = `${s('#i-eye')} <strong style="color:var(--text)">${events.length} events</strong> &nbsp;— ${up} upcoming, ${ps} archived`;
  const list = document.getElementById('adminList'); if (!list) return; list.innerHTML = '';
  const filtered = q ? events.filter(e => e.name.toLowerCase().includes(q) || e.cat.toLowerCase().includes(q)) : events;
  filtered.forEach(ev => {
    const row = document.createElement('div'); row.className = 'ev-row';
    row.innerHTML = `${ev.img ? `<img class="ev-row-img" src="${ev.img}" onerror="this.style.display='none'">` : `<div class="ev-row-img-ph">${s(catIcon(ev.cat), 14, 14)}</div>`}<span class="ev-nm" title="${ev.name}">${ev.name}</span><span class="ev-ct">${isUpcoming(ev) ? ev.cat : 'Past'}</span><button class="ev-del" onclick="deleteEvent(${ev.id})">${s('#i-trash', 11, 11)}</button>`;
    list.appendChild(row);
  });
}
function renderStats() {
  const el = document.getElementById('statsContent'); if (!el) return;
  const up = events.filter(isUpcoming); const ps = events.filter(e => !isUpcoming(e));
  const cats = ['Tech', 'Fintech', 'Startup', 'Investor', 'Government'];
  const catCounts = cats.map(c => ({c, n: events.filter(e => e.cat === c).length})).sort((a, b) => b.n - a.n);
  const topViews = [...events].sort((a, b) => b.views - a.views).slice(0, 5);
  el.innerHTML = `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px">
      <div class="stat-card"><h4>Total Events</h4><div class="big">${events.length}</div></div>
      <div class="stat-card"><h4>Upcoming</h4><div class="big" style="color:#059669">${up.length}</div></div>
      <div class="stat-card"><h4>Past Events</h4><div class="big" style="color:var(--muted)">${ps.length}</div></div>
      <div class="stat-card"><h4>Featured</h4><div class="big" style="color:var(--orange)">${events.filter(e => e.featured).length}</div></div>
    </div>
    <div class="stat-card" style="margin-bottom:16px"><h4 style="margin-bottom:12px">By Category</h4>${catCounts.map(x => `<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px"><span style="font-size:.82rem;flex:1;font-weight:500">${x.c}</span><div style="height:6px;border-radius:3px;background:linear-gradient(90deg,var(--blue),var(--orange));width:${Math.round((x.n / events.length) * 100)}%;min-width:8px"></div><span style="font-size:.8rem;color:var(--muted);flex-shrink:0">${x.n}</span></div>`).join('')}</div>
    <div class="stat-card"><h4 style="margin-bottom:10px">Top by Views</h4>${topViews.map(e => `<div style="display:flex;justify-content:space-between;font-size:.8rem;margin-bottom:7px;align-items:center"><span style="flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-right:8px">${e.name}</span><span style="color:var(--blue);font-weight:600;flex-shrink:0">${e.views.toLocaleString()}</span></div>`).join('')}</div>`;
}

// TOAST
function showToast(msg) {
  document.getElementById('toastMsg').textContent = msg;
  const t = document.getElementById('toast'); t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3400);
}

// INIT
function renderAll() { renderFeatured(); renderTrending(); if (currentSection === 'events') { renderCats(); renderAllEvents(); } }
renderAll();
document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeModal(); closeAdmin(); } });
