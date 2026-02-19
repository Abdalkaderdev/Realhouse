// ═══════════════════════════════════════════════════════════════════════════
// Real House IQ - Admin Dashboard
// Note: This admin panel uses innerHTML with proper escaping via escapeHtml()
// All user content is sanitized before rendering
// ═══════════════════════════════════════════════════════════════════════════

const API_URL = 'http://localhost:3001/api';
let authToken = localStorage.getItem('rh-admin-token');

// ─── HTML Sanitization ─────────────────────────────────────────────────────
function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function formatDate(dateStr) {
  if (!dateStr) return '-';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// ─── Authentication ────────────────────────────────────────────────────────

document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const errorEl = document.getElementById('login-error');

  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      errorEl.textContent = data.error || 'Login failed';
      return;
    }

    authToken = data.token;
    localStorage.setItem('rh-admin-token', authToken);
    document.getElementById('user-name').textContent = data.user.name;
    showDashboard();
  } catch (err) {
    errorEl.textContent = 'Connection error. Is the server running?';
  }
});

document.getElementById('logout-btn').addEventListener('click', () => {
  localStorage.removeItem('rh-admin-token');
  authToken = null;
  showLogin();
});

function showLogin() {
  document.getElementById('login-screen').classList.remove('hidden');
  document.getElementById('dashboard').classList.add('hidden');
}

function showDashboard() {
  document.getElementById('login-screen').classList.add('hidden');
  document.getElementById('dashboard').classList.remove('hidden');
  loadDashboardData();
}

async function checkAuth() {
  if (!authToken) {
    showLogin();
    return;
  }

  try {
    const res = await fetch(`${API_URL}/auth/me`, {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });

    if (res.ok) {
      const user = await res.json();
      document.getElementById('user-name').textContent = user.name;
      showDashboard();
    } else {
      showLogin();
    }
  } catch (err) {
    showLogin();
  }
}

// ─── Navigation ────────────────────────────────────────────────────────────

document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    const page = item.dataset.page;

    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    item.classList.add('active');

    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(`page-${page}`).classList.add('active');

    document.getElementById('page-title').textContent = item.textContent.trim();
    loadPageData(page);
  });
});

function loadPageData(page) {
  switch (page) {
    case 'properties': loadProperties(); break;
    case 'inquiries': loadInquiries(); break;
    case 'testimonials': loadTestimonials(); break;
    case 'team': loadTeam(); break;
    case 'faqs': loadFaqs(); break;
    case 'agents': loadAgents(); break;
    case 'analytics': loadAnalytics(); break;
    case 'settings': loadSettings(); break;
  }
}

// ─── Modal Functions ───────────────────────────────────────────────────────

function openModal(id) {
  document.getElementById(id).classList.add('active');
}

function closeModal(id) {
  document.getElementById(id).classList.remove('active');
  const form = document.getElementById(id.replace('-modal', '-form'));
  if (form) form.reset();
}

document.querySelectorAll('.modal').forEach(modal => {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });
});

// ─── API Helpers ───────────────────────────────────────────────────────────

async function apiGet(endpoint) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: { 'Authorization': `Bearer ${authToken}` }
  });
  return res.json();
}

async function apiPost(endpoint, data) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return res.json();
}

async function apiPut(endpoint, data) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return res.json();
}

async function apiDelete(endpoint) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${authToken}` }
  });
  return res.json();
}

// ─── Dashboard Data ────────────────────────────────────────────────────────

async function loadDashboardData() {
  try {
    const stats = await apiGet('/dashboard/stats');
    document.getElementById('stat-properties').textContent = stats.properties || 0;
    document.getElementById('stat-inquiries').textContent = stats.newInquiries || 0;
    document.getElementById('stat-testimonials').textContent = stats.testimonials || 0;
    document.getElementById('stat-team').textContent = stats.teamMembers || 0;
    document.getElementById('inquiry-badge').textContent = stats.newInquiries || 0;

    const { inquiries } = await apiGet('/inquiries?limit=5');
    renderRecentInquiries(inquiries || []);
  } catch (err) {
    console.error('Failed to load dashboard data:', err);
  }
}

function renderRecentInquiries(inquiries) {
  const tbody = document.getElementById('recent-inquiries');
  tbody.textContent = '';

  if (!inquiries.length) {
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.colSpan = 5;
    td.className = 'empty';
    td.textContent = 'No inquiries yet';
    tr.appendChild(td);
    tbody.appendChild(tr);
    return;
  }

  inquiries.forEach(inq => {
    const tr = document.createElement('tr');

    const tdName = document.createElement('td');
    tdName.textContent = inq.name;
    tr.appendChild(tdName);

    const tdEmail = document.createElement('td');
    tdEmail.textContent = inq.email;
    tr.appendChild(tdEmail);

    const tdProperty = document.createElement('td');
    tdProperty.textContent = inq.property_title || '-';
    tr.appendChild(tdProperty);

    const tdStatus = document.createElement('td');
    const statusBadge = document.createElement('span');
    statusBadge.className = `status-badge ${inq.status}`;
    statusBadge.textContent = inq.status;
    tdStatus.appendChild(statusBadge);
    tr.appendChild(tdStatus);

    const tdDate = document.createElement('td');
    tdDate.textContent = formatDate(inq.created_at);
    tr.appendChild(tdDate);

    tbody.appendChild(tr);
  });
}

// ─── Properties ────────────────────────────────────────────────────────────

async function loadProperties() {
  const properties = await apiGet('/properties');
  const tbody = document.getElementById('properties-list');
  tbody.textContent = '';

  if (!properties.length) {
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.colSpan = 6;
    td.className = 'empty';
    td.textContent = 'No properties found';
    tr.appendChild(td);
    tbody.appendChild(tr);
    return;
  }

  properties.forEach(p => {
    const tr = document.createElement('tr');

    const tdTitle = document.createElement('td');
    const strong = document.createElement('strong');
    strong.textContent = p.title;
    tdTitle.appendChild(strong);
    tr.appendChild(tdTitle);

    const tdType = document.createElement('td');
    tdType.textContent = p.type;
    tr.appendChild(tdType);

    const tdPrice = document.createElement('td');
    tdPrice.textContent = `$${Number(p.price_value).toLocaleString()}`;
    tr.appendChild(tdPrice);

    const tdLocation = document.createElement('td');
    tdLocation.textContent = p.location;
    tr.appendChild(tdLocation);

    const tdStatus = document.createElement('td');
    const badge = document.createElement('span');
    badge.className = `status-badge ${p.published ? 'published' : 'draft'}`;
    badge.textContent = p.published ? 'Published' : 'Draft';
    tdStatus.appendChild(badge);
    tr.appendChild(tdStatus);

    const tdActions = document.createElement('td');
    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'action-btns';

    const editBtn = document.createElement('button');
    editBtn.className = 'action-btn';
    editBtn.title = 'Edit';
    editBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>';
    editBtn.onclick = () => editProperty(p.id);
    actionsDiv.appendChild(editBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'action-btn delete';
    deleteBtn.title = 'Delete';
    deleteBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3,6 5,6 21,6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>';
    deleteBtn.onclick = () => deleteProperty(p.id);
    actionsDiv.appendChild(deleteBtn);

    tdActions.appendChild(actionsDiv);
    tr.appendChild(tdActions);

    tbody.appendChild(tr);
  });
}

document.getElementById('property-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = document.getElementById('property-id').value;
  const data = {
    title: document.getElementById('property-title').value,
    type: document.getElementById('property-type').value,
    price: `$${Number(document.getElementById('property-price').value).toLocaleString()}`,
    priceValue: Number(document.getElementById('property-price').value),
    status: document.getElementById('property-status').value,
    location: document.getElementById('property-location').value,
    beds: Number(document.getElementById('property-beds').value),
    baths: Number(document.getElementById('property-baths').value),
    sqft: `${document.getElementById('property-sqm').value} m²`,
    description: document.getElementById('property-description').value,
    features: document.getElementById('property-features').value.split(',').map(f => f.trim()).filter(Boolean),
    images: document.getElementById('property-images').value.split('\n').map(u => u.trim()).filter(Boolean),
    featured: document.getElementById('property-featured').checked,
    published: document.getElementById('property-published').checked
  };

  if (id) {
    await apiPut(`/properties/${id}`, data);
  } else {
    await apiPost('/properties', data);
  }

  closeModal('property-modal');
  loadProperties();
  loadDashboardData();
});

async function editProperty(id) {
  const properties = await apiGet('/properties');
  const p = properties.find(prop => prop.id === id);
  if (!p) return;

  document.getElementById('property-id').value = p.id;
  document.getElementById('property-title').value = p.title;
  document.getElementById('property-type').value = p.type;
  document.getElementById('property-price').value = p.price_value;
  document.getElementById('property-status').value = p.status || 'For Sale';
  document.getElementById('property-location').value = p.location;
  document.getElementById('property-beds').value = p.beds;
  document.getElementById('property-baths').value = p.baths;
  document.getElementById('property-sqm').value = parseInt(p.sqft) || 0;
  document.getElementById('property-description').value = p.description;
  document.getElementById('property-features').value = (p.features || []).join(', ');
  document.getElementById('property-images').value = (p.images || []).join('\n');
  document.getElementById('property-featured').checked = p.featured;
  document.getElementById('property-published').checked = p.published;

  document.getElementById('property-modal-title').textContent = 'Edit Property';
  openModal('property-modal');
}

async function deleteProperty(id) {
  if (!confirm('Are you sure you want to delete this property?')) return;
  await apiDelete(`/properties/${id}`);
  loadProperties();
  loadDashboardData();
}

// ─── Inquiries ─────────────────────────────────────────────────────────────

async function loadInquiries() {
  const filter = document.getElementById('inquiry-filter').value;
  const query = filter ? `?status=${filter}` : '';
  const { inquiries } = await apiGet(`/inquiries${query}`);
  const tbody = document.getElementById('inquiries-list');
  tbody.textContent = '';

  if (!inquiries || !inquiries.length) {
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.colSpan = 7;
    td.className = 'empty';
    td.textContent = 'No inquiries found';
    tr.appendChild(td);
    tbody.appendChild(tr);
    return;
  }

  inquiries.forEach(inq => {
    const tr = document.createElement('tr');

    const cells = [
      { content: inq.name, strong: true },
      { content: inq.email },
      { content: inq.phone || '-' },
      { content: inq.property_title || '-' },
      { content: inq.status, badge: true },
      { content: formatDate(inq.created_at) }
    ];

    cells.forEach(cell => {
      const td = document.createElement('td');
      if (cell.strong) {
        const strong = document.createElement('strong');
        strong.textContent = cell.content;
        td.appendChild(strong);
      } else if (cell.badge) {
        const badge = document.createElement('span');
        badge.className = `status-badge ${cell.content}`;
        badge.textContent = cell.content;
        td.appendChild(badge);
      } else {
        td.textContent = cell.content;
      }
      tr.appendChild(td);
    });

    const tdActions = document.createElement('td');
    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'action-btns';

    const editBtn = document.createElement('button');
    editBtn.className = 'action-btn';
    editBtn.title = 'Update';
    editBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>';
    editBtn.onclick = () => editInquiry(inq.id, inq.status, inq.notes || '');
    actionsDiv.appendChild(editBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'action-btn delete';
    deleteBtn.title = 'Delete';
    deleteBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3,6 5,6 21,6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>';
    deleteBtn.onclick = () => deleteInquiry(inq.id);
    actionsDiv.appendChild(deleteBtn);

    tdActions.appendChild(actionsDiv);
    tr.appendChild(tdActions);

    tbody.appendChild(tr);
  });
}

document.getElementById('inquiry-filter').addEventListener('change', loadInquiries);

function editInquiry(id, status, notes) {
  document.getElementById('inquiry-id').value = id;
  document.getElementById('inquiry-status').value = status;
  document.getElementById('inquiry-notes').value = notes;
  openModal('inquiry-modal');
}

document.getElementById('inquiry-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = document.getElementById('inquiry-id').value;
  await apiPut(`/inquiries/${id}`, {
    status: document.getElementById('inquiry-status').value,
    notes: document.getElementById('inquiry-notes').value
  });
  closeModal('inquiry-modal');
  loadInquiries();
  loadDashboardData();
});

async function deleteInquiry(id) {
  if (!confirm('Are you sure you want to delete this inquiry?')) return;
  await apiDelete(`/inquiries/${id}`);
  loadInquiries();
  loadDashboardData();
}

// ─── Testimonials ──────────────────────────────────────────────────────────

async function loadTestimonials() {
  const testimonials = await apiGet('/content/testimonials');
  const container = document.getElementById('testimonials-list');
  container.textContent = '';

  if (!testimonials.length) {
    const p = document.createElement('p');
    p.className = 'empty';
    p.textContent = 'No testimonials found';
    container.appendChild(p);
    return;
  }

  testimonials.forEach(t => {
    const card = createTestimonialCard(t);
    container.appendChild(card);
  });
}

function createTestimonialCard(t) {
  const card = document.createElement('div');
  card.className = 'card';

  const header = document.createElement('div');
  header.className = 'card-header';

  const img = document.createElement('img');
  img.src = t.image || 'https://via.placeholder.com/48';
  img.alt = t.name;
  img.className = 'card-avatar';
  header.appendChild(img);

  const info = document.createElement('div');
  info.className = 'card-info';
  const h4 = document.createElement('h4');
  h4.textContent = t.name;
  info.appendChild(h4);
  const p = document.createElement('p');
  p.textContent = `${t.role || ''} ${t.location ? '• ' + t.location : ''}`;
  info.appendChild(p);
  header.appendChild(info);

  card.appendChild(header);

  const content = document.createElement('div');
  content.className = 'card-content';
  content.textContent = `"${t.quote}"`;
  card.appendChild(content);

  const footer = document.createElement('div');
  footer.className = 'card-footer';

  const meta = document.createElement('div');
  meta.className = 'card-meta';
  const stars = document.createElement('span');
  stars.className = 'stars';
  stars.textContent = '★'.repeat(t.rating) + '☆'.repeat(5 - t.rating);
  meta.appendChild(stars);
  footer.appendChild(meta);

  const actions = document.createElement('div');
  actions.className = 'action-btns';

  const editBtn = document.createElement('button');
  editBtn.className = 'action-btn';
  editBtn.title = 'Edit';
  editBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>';
  editBtn.onclick = () => editTestimonial(t.id);
  actions.appendChild(editBtn);

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'action-btn delete';
  deleteBtn.title = 'Delete';
  deleteBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3,6 5,6 21,6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>';
  deleteBtn.onclick = () => deleteTestimonial(t.id);
  actions.appendChild(deleteBtn);

  footer.appendChild(actions);
  card.appendChild(footer);

  return card;
}

document.getElementById('testimonial-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = document.getElementById('testimonial-id').value;
  const data = {
    name: document.getElementById('testimonial-name').value,
    role: document.getElementById('testimonial-role').value,
    location: document.getElementById('testimonial-location').value,
    quote: document.getElementById('testimonial-quote').value,
    rating: Number(document.getElementById('testimonial-rating').value),
    propertyType: document.getElementById('testimonial-property-type').value,
    image: document.getElementById('testimonial-image').value
  };

  if (id) {
    await apiPut(`/content/testimonials/${id}`, data);
  } else {
    await apiPost('/content/testimonials', data);
  }

  closeModal('testimonial-modal');
  loadTestimonials();
  loadDashboardData();
});

async function editTestimonial(id) {
  const testimonials = await apiGet('/content/testimonials');
  const t = testimonials.find(item => item.id === id);
  if (!t) return;

  document.getElementById('testimonial-id').value = t.id;
  document.getElementById('testimonial-name').value = t.name;
  document.getElementById('testimonial-role').value = t.role || '';
  document.getElementById('testimonial-location').value = t.location || '';
  document.getElementById('testimonial-quote').value = t.quote;
  document.getElementById('testimonial-rating').value = t.rating;
  document.getElementById('testimonial-property-type').value = t.property_type || '';
  document.getElementById('testimonial-image').value = t.image || '';

  document.getElementById('testimonial-modal-title').textContent = 'Edit Testimonial';
  openModal('testimonial-modal');
}

async function deleteTestimonial(id) {
  if (!confirm('Are you sure you want to delete this testimonial?')) return;
  await apiDelete(`/content/testimonials/${id}`);
  loadTestimonials();
  loadDashboardData();
}

// ─── Team ──────────────────────────────────────────────────────────────────

async function loadTeam() {
  const team = await apiGet('/content/team');
  const container = document.getElementById('team-list');
  container.textContent = '';

  if (!team.length) {
    const p = document.createElement('p');
    p.className = 'empty';
    p.textContent = 'No team members found';
    container.appendChild(p);
    return;
  }

  team.forEach(m => {
    const card = createTeamCard(m);
    container.appendChild(card);
  });
}

function createTeamCard(m) {
  const card = document.createElement('div');
  card.className = 'card';

  const header = document.createElement('div');
  header.className = 'card-header';

  const img = document.createElement('img');
  img.src = m.image || 'https://via.placeholder.com/48';
  img.alt = m.name;
  img.className = 'card-avatar';
  header.appendChild(img);

  const info = document.createElement('div');
  info.className = 'card-info';
  const h4 = document.createElement('h4');
  h4.textContent = m.name;
  info.appendChild(h4);
  const p = document.createElement('p');
  p.textContent = m.role;
  info.appendChild(p);
  header.appendChild(info);

  card.appendChild(header);

  if (m.bio) {
    const content = document.createElement('div');
    content.className = 'card-content';
    content.textContent = m.bio;
    card.appendChild(content);
  }

  const footer = document.createElement('div');
  footer.className = 'card-footer';

  const meta = document.createElement('div');
  meta.className = 'card-meta';
  meta.textContent = m.email || '';
  footer.appendChild(meta);

  const actions = document.createElement('div');
  actions.className = 'action-btns';

  const editBtn = document.createElement('button');
  editBtn.className = 'action-btn';
  editBtn.title = 'Edit';
  editBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>';
  editBtn.onclick = () => editTeamMember(m.id);
  actions.appendChild(editBtn);

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'action-btn delete';
  deleteBtn.title = 'Delete';
  deleteBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3,6 5,6 21,6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>';
  deleteBtn.onclick = () => deleteTeamMember(m.id);
  actions.appendChild(deleteBtn);

  footer.appendChild(actions);
  card.appendChild(footer);

  return card;
}

document.getElementById('team-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = document.getElementById('team-id').value;
  const data = {
    name: document.getElementById('team-name').value,
    role: document.getElementById('team-role').value,
    bio: document.getElementById('team-bio').value,
    email: document.getElementById('team-email').value,
    image: document.getElementById('team-image').value
  };

  if (id) {
    await apiPut(`/content/team/${id}`, data);
  } else {
    await apiPost('/content/team', data);
  }

  closeModal('team-modal');
  loadTeam();
  loadDashboardData();
});

async function editTeamMember(id) {
  const team = await apiGet('/content/team');
  const m = team.find(item => item.id === id);
  if (!m) return;

  document.getElementById('team-id').value = m.id;
  document.getElementById('team-name').value = m.name;
  document.getElementById('team-role').value = m.role;
  document.getElementById('team-bio').value = m.bio || '';
  document.getElementById('team-email').value = m.email || '';
  document.getElementById('team-image').value = m.image || '';

  document.getElementById('team-modal-title').textContent = 'Edit Team Member';
  openModal('team-modal');
}

async function deleteTeamMember(id) {
  if (!confirm('Are you sure you want to delete this team member?')) return;
  await apiDelete(`/content/team/${id}`);
  loadTeam();
  loadDashboardData();
}

// ─── FAQs ──────────────────────────────────────────────────────────────────

async function loadFaqs() {
  const faqs = await apiGet('/content/faqs');
  const container = document.getElementById('faqs-list');
  container.textContent = '';

  if (!faqs.length) {
    const p = document.createElement('p');
    p.className = 'empty';
    p.textContent = 'No FAQs found';
    container.appendChild(p);
    return;
  }

  faqs.forEach(f => {
    const item = createFaqItem(f);
    container.appendChild(item);
  });
}

function createFaqItem(f) {
  const item = document.createElement('div');
  item.className = 'faq-item';

  const header = document.createElement('div');
  header.className = 'faq-item-header';

  const content = document.createElement('div');

  const question = document.createElement('div');
  question.className = 'faq-question';
  question.textContent = f.question;
  content.appendChild(question);

  const answer = document.createElement('div');
  answer.className = 'faq-answer';
  answer.textContent = f.answer;
  content.appendChild(answer);

  const category = document.createElement('div');
  category.className = 'faq-category';
  category.textContent = f.category;
  content.appendChild(category);

  header.appendChild(content);

  const actions = document.createElement('div');
  actions.className = 'action-btns';

  const editBtn = document.createElement('button');
  editBtn.className = 'action-btn';
  editBtn.title = 'Edit';
  editBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>';
  editBtn.onclick = () => editFaq(f.id);
  actions.appendChild(editBtn);

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'action-btn delete';
  deleteBtn.title = 'Delete';
  deleteBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3,6 5,6 21,6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>';
  deleteBtn.onclick = () => deleteFaq(f.id);
  actions.appendChild(deleteBtn);

  header.appendChild(actions);
  item.appendChild(header);

  return item;
}

document.getElementById('faq-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = document.getElementById('faq-id').value;
  const data = {
    question: document.getElementById('faq-question').value,
    answer: document.getElementById('faq-answer').value,
    category: document.getElementById('faq-category').value
  };

  if (id) {
    await apiPut(`/content/faqs/${id}`, data);
  } else {
    await apiPost('/content/faqs', data);
  }

  closeModal('faq-modal');
  loadFaqs();
});

async function editFaq(id) {
  const faqs = await apiGet('/content/faqs');
  const f = faqs.find(item => item.id === id);
  if (!f) return;

  document.getElementById('faq-id').value = f.id;
  document.getElementById('faq-question').value = f.question;
  document.getElementById('faq-answer').value = f.answer;
  document.getElementById('faq-category').value = f.category;

  document.getElementById('faq-modal-title').textContent = 'Edit FAQ';
  openModal('faq-modal');
}

async function deleteFaq(id) {
  if (!confirm('Are you sure you want to delete this FAQ?')) return;
  await apiDelete(`/content/faqs/${id}`);
  loadFaqs();
}

// ─── Agents ────────────────────────────────────────────────────────────────

async function loadAgents() {
  const agents = await apiGet('/content/agents');
  const container = document.getElementById('agents-list');
  container.textContent = '';

  if (!agents.length) {
    const p = document.createElement('p');
    p.className = 'empty';
    p.textContent = 'No agents found';
    container.appendChild(p);
    return;
  }

  agents.forEach(a => {
    const card = createAgentCard(a);
    container.appendChild(card);
  });
}

function createAgentCard(a) {
  const card = document.createElement('div');
  card.className = 'card';

  const header = document.createElement('div');
  header.className = 'card-header';

  const img = document.createElement('img');
  img.src = a.image || 'https://via.placeholder.com/48';
  img.alt = a.name;
  img.className = 'card-avatar';
  header.appendChild(img);

  const info = document.createElement('div');
  info.className = 'card-info';
  const h4 = document.createElement('h4');
  h4.textContent = a.name;
  info.appendChild(h4);
  const p = document.createElement('p');
  p.textContent = a.title;
  info.appendChild(p);
  header.appendChild(info);

  card.appendChild(header);

  const content = document.createElement('div');
  content.className = 'card-content';

  const emailP = document.createElement('p');
  emailP.innerHTML = `<strong>Email:</strong> ${escapeHtml(a.email)}`;
  content.appendChild(emailP);

  const phoneP = document.createElement('p');
  phoneP.innerHTML = `<strong>Phone:</strong> ${escapeHtml(a.phone)}`;
  content.appendChild(phoneP);

  if (a.bio) {
    const bioP = document.createElement('p');
    bioP.style.marginTop = '8px';
    bioP.textContent = a.bio;
    content.appendChild(bioP);
  }

  card.appendChild(content);

  const footer = document.createElement('div');
  footer.className = 'card-footer';

  const meta = document.createElement('div');
  meta.className = 'card-meta';
  footer.appendChild(meta);

  const actions = document.createElement('div');
  actions.className = 'action-btns';

  const editBtn = document.createElement('button');
  editBtn.className = 'action-btn';
  editBtn.title = 'Edit';
  editBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>';
  editBtn.onclick = () => editAgent(a.id);
  actions.appendChild(editBtn);

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'action-btn delete';
  deleteBtn.title = 'Delete';
  deleteBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3,6 5,6 21,6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>';
  deleteBtn.onclick = () => deleteAgent(a.id);
  actions.appendChild(deleteBtn);

  footer.appendChild(actions);
  card.appendChild(footer);

  return card;
}

document.getElementById('agent-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = document.getElementById('agent-id').value;
  const data = {
    name: document.getElementById('agent-name').value,
    title: document.getElementById('agent-title').value,
    email: document.getElementById('agent-email').value,
    phone: document.getElementById('agent-phone').value,
    bio: document.getElementById('agent-bio').value,
    image: document.getElementById('agent-image').value
  };

  if (id) {
    await apiPut(`/content/agents/${id}`, data);
  } else {
    await apiPost('/content/agents', data);
  }

  closeModal('agent-modal');
  loadAgents();
});

async function editAgent(id) {
  const agents = await apiGet('/content/agents');
  const a = agents.find(item => item.id === id);
  if (!a) return;

  document.getElementById('agent-id').value = a.id;
  document.getElementById('agent-name').value = a.name;
  document.getElementById('agent-title').value = a.title;
  document.getElementById('agent-email').value = a.email;
  document.getElementById('agent-phone').value = a.phone;
  document.getElementById('agent-bio').value = a.bio || '';
  document.getElementById('agent-image').value = a.image || '';

  document.getElementById('agent-modal-title').textContent = 'Edit Agent';
  openModal('agent-modal');
}

async function deleteAgent(id) {
  if (!confirm('Are you sure you want to delete this agent?')) return;
  await apiDelete(`/content/agents/${id}`);
  loadAgents();
}

// ─── Analytics ─────────────────────────────────────────────────────────────

async function loadAnalytics() {
  try {
    const analytics = await apiGet('/settings/analytics');

    // Price statistics
    if (analytics.priceStats) {
      const { min_price, max_price, avg_price, total_value } = analytics.priceStats;
      document.getElementById('analytics-total-value').textContent =
        `$${Number(total_value || 0).toLocaleString()}`;
      document.getElementById('analytics-avg-price').textContent =
        `$${Number(avg_price || 0).toLocaleString()}`;
      document.getElementById('analytics-price-range').textContent =
        `$${Number(min_price || 0).toLocaleString()} - $${Number(max_price || 0).toLocaleString()}`;
    }

    // Conversion rate
    if (analytics.inquiryByStatus) {
      const total = analytics.inquiryByStatus.reduce((sum, s) => sum + s.count, 0);
      const closed = analytics.inquiryByStatus.find(s => s.status === 'closed');
      const rate = total > 0 ? Math.round((closed?.count || 0) / total * 100) : 0;
      document.getElementById('analytics-conversion').textContent = `${rate}%`;
    }

    // Property by type chart
    renderBarChart('chart-property-type', analytics.propertyByType || [], 'type');

    // Property by status chart
    renderBarChart('chart-property-status', analytics.propertyByStatus || [], 'status');

    // Inquiry status chart
    renderBarChart('chart-inquiry-status', analytics.inquiryByStatus || [], 'status');

    // Top properties
    renderTopProperties(analytics.topProperties || []);

    // Activity log
    await loadActivityLog();
  } catch (err) {
    console.error('Failed to load analytics:', err);
  }
}

function renderBarChart(containerId, data, labelKey) {
  const container = document.getElementById(containerId);
  container.textContent = '';

  if (!data.length) {
    const p = document.createElement('p');
    p.className = 'empty';
    p.textContent = 'No data available';
    container.appendChild(p);
    return;
  }

  const maxCount = Math.max(...data.map(d => d.count));

  data.forEach(item => {
    const row = document.createElement('div');
    row.className = 'chart-row';

    const label = document.createElement('span');
    label.className = 'chart-label';
    label.textContent = item[labelKey] || 'Unknown';
    row.appendChild(label);

    const barContainer = document.createElement('div');
    barContainer.className = 'chart-bar-container';

    const bar = document.createElement('div');
    bar.className = 'chart-bar';
    bar.style.width = `${(item.count / maxCount) * 100}%`;
    barContainer.appendChild(bar);
    row.appendChild(barContainer);

    const count = document.createElement('span');
    count.className = 'chart-count';
    count.textContent = item.count;
    row.appendChild(count);

    container.appendChild(row);
  });
}

function renderTopProperties(properties) {
  const tbody = document.getElementById('top-properties-list');
  tbody.textContent = '';

  if (!properties.length) {
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.colSpan = 3;
    td.className = 'empty';
    td.textContent = 'No data available';
    tr.appendChild(td);
    tbody.appendChild(tr);
    return;
  }

  properties.forEach(p => {
    const tr = document.createElement('tr');

    const tdTitle = document.createElement('td');
    tdTitle.textContent = p.title;
    tr.appendChild(tdTitle);

    const tdPrice = document.createElement('td');
    tdPrice.textContent = p.price || '-';
    tr.appendChild(tdPrice);

    const tdCount = document.createElement('td');
    const badge = document.createElement('span');
    badge.className = 'count-badge';
    badge.textContent = p.inquiry_count;
    tdCount.appendChild(badge);
    tr.appendChild(tdCount);

    tbody.appendChild(tr);
  });
}

async function loadActivityLog() {
  try {
    const activities = await apiGet('/settings/activity?limit=20');
    const tbody = document.getElementById('activity-log-list');
    tbody.textContent = '';

    if (!activities.length) {
      const tr = document.createElement('tr');
      const td = document.createElement('td');
      td.colSpan = 4;
      td.className = 'empty';
      td.textContent = 'No recent activity';
      tr.appendChild(td);
      tbody.appendChild(tr);
      return;
    }

    activities.forEach(a => {
      const tr = document.createElement('tr');

      const tdUser = document.createElement('td');
      tdUser.textContent = a.user_name || 'System';
      tr.appendChild(tdUser);

      const tdAction = document.createElement('td');
      tdAction.textContent = a.action;
      tr.appendChild(tdAction);

      const tdEntity = document.createElement('td');
      tdEntity.textContent = a.entity_type ? `${a.entity_type} #${a.entity_id}` : '-';
      tr.appendChild(tdEntity);

      const tdDate = document.createElement('td');
      tdDate.textContent = formatDate(a.created_at);
      tr.appendChild(tdDate);

      tbody.appendChild(tr);
    });
  } catch (err) {
    console.error('Failed to load activity log:', err);
  }
}

function exportData(type) {
  window.open(`${API_URL}/settings/export/${type}?token=${authToken}`, '_blank');
}

// ─── Settings ──────────────────────────────────────────────────────────────

async function loadSettings() {
  try {
    const settings = await apiGet('/settings');

    // General settings
    if (settings['site-name']) document.getElementById('setting-site-name').value = settings['site-name'];
    if (settings['email']) document.getElementById('setting-email').value = settings['email'];
    if (settings['phone']) document.getElementById('setting-phone').value = settings['phone'];
    if (settings['whatsapp']) document.getElementById('setting-whatsapp').value = settings['whatsapp'];
    if (settings['address']) document.getElementById('setting-address').value = settings['address'];

    // Social links
    if (settings['facebook']) document.getElementById('setting-facebook').value = settings['facebook'];
    if (settings['instagram']) document.getElementById('setting-instagram').value = settings['instagram'];
    if (settings['linkedin']) document.getElementById('setting-linkedin').value = settings['linkedin'];
    if (settings['youtube']) document.getElementById('setting-youtube').value = settings['youtube'];

    // Currency settings
    if (settings['currency']) document.getElementById('setting-currency').value = settings['currency'];
    if (settings['exchange-rate']) document.getElementById('setting-exchange-rate').value = settings['exchange-rate'];
    if (settings['show-both-currencies']) {
      document.getElementById('setting-show-both-currencies').checked = settings['show-both-currencies'] === 'true';
    }

    // SEO settings
    if (settings['meta-title']) document.getElementById('setting-meta-title').value = settings['meta-title'];
    if (settings['meta-description']) document.getElementById('setting-meta-description').value = settings['meta-description'];
    if (settings['keywords']) document.getElementById('setting-keywords').value = settings['keywords'];
  } catch (err) {
    console.error('Failed to load settings:', err);
  }
}

document.getElementById('settings-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  await apiPut('/settings', {
    'site-name': document.getElementById('setting-site-name').value,
    'email': document.getElementById('setting-email').value,
    'phone': document.getElementById('setting-phone').value,
    'whatsapp': document.getElementById('setting-whatsapp').value,
    'address': document.getElementById('setting-address').value
  });
  alert('Settings saved successfully!');
});

document.getElementById('social-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  await apiPut('/settings', {
    'facebook': document.getElementById('setting-facebook').value,
    'instagram': document.getElementById('setting-instagram').value,
    'linkedin': document.getElementById('setting-linkedin').value,
    'youtube': document.getElementById('setting-youtube').value
  });
  alert('Social links saved successfully!');
});

document.getElementById('currency-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  await apiPut('/settings', {
    'currency': document.getElementById('setting-currency').value,
    'exchange-rate': document.getElementById('setting-exchange-rate').value,
    'show-both-currencies': document.getElementById('setting-show-both-currencies').checked.toString()
  });
  alert('Currency settings saved successfully!');
});

document.getElementById('seo-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  await apiPut('/settings', {
    'meta-title': document.getElementById('setting-meta-title').value,
    'meta-description': document.getElementById('setting-meta-description').value,
    'keywords': document.getElementById('setting-keywords').value
  });
  alert('SEO settings saved successfully!');
});

// Initialize
checkAuth();
