const page = document.body.dataset.page || '';

const navItems = [
  ['home', 'Home', 'index.html'],
  ['meet', 'Meet Mohamed', 'meet-mohamed.html'],
  ['priorities', 'Priorities', 'priorities-1.html'],
  ['ward', 'Ward 9', 'ward-9.html'],
  ['vote', 'Vote', 'vote.html'],
  ['involved', 'Get Involved', 'get-involved.html'],
  ['contact', 'Contact', 'contact.html']
];

const headerRoot = document.querySelector('#site-header');
if (headerRoot) {
  const navLinks = navItems.map(([key, label, href]) => {
    const current = page === key || (page === 'priorities-alt' && key === 'priorities');
    return `<a href="${href}"${current ? ' aria-current="page"' : ''}>${label}</a>`;
  }).join('');

  headerRoot.innerHTML = `
    <header class="site-header" id="top">
      <div class="container nav-wrap">
        <a class="logo-link" href="index.html" aria-label="Mohamed Askalany campaign homepage">
          <img src="images/Askalany Logo.webp" alt="Mohamed Askalany for Kitchener Ward 9" width="640" height="214">
        </a>
        <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Open menu">
          <span></span><span></span><span></span>
        </button>
        <nav id="site-nav" class="site-nav" aria-label="Primary navigation">
          ${navLinks}
          <a class="btn btn-sm btn-primary" href="donate.html"${page === 'donate' ? ' aria-current="page"' : ''}>Donate</a>
        </nav>
      </div>
    </header>`;
}

const footerRoot = document.querySelector('#site-footer');
if (footerRoot) {
  footerRoot.innerHTML = `
    <footer class="site-footer">
      <div class="container footer-grid">
        <div>
          <a href="index.html" aria-label="Home"><img class="footer-logo" src="images/Askalany Logo.webp" alt="Mohamed Askalany for Kitchener Ward 9"></a>
          <p>Diplomatic governance. Fiscal precision. Unyielding advocacy for Ward 9.</p>
        </div>
        <div>
          <h3>Campaign</h3>
          <a href="meet-mohamed.html">Meet Mohamed</a>
          <a href="priorities-1.html">Priorities</a>
          <a href="ward-9.html">Ward 9</a>
          <a href="vote.html">Vote</a>
        </div>
        <div>
          <h3>Take part</h3>
          <a href="get-involved.html">Volunteer</a>
          <a href="get-involved.html#sign">Request a sign</a>
          <a href="donate.html">Donate</a>
          <a href="contact.html">Contact</a>
        </div>
        <div>
          <h3>Connect</h3>
          <a href="mailto:mo@voteaskalany.ca">mo@voteaskalany.ca</a>
          <a href="https://voteaskalany.ca/">voteaskalany.ca</a>
        </div>
      </div>
      <div class="container footer-bottom">
        <p>Authorized by the Mohamed Askalany campaign.</p>
        <p>© 2026 Mohamed Askalany Campaign</p>
      </div>
    </footer>`;
}

const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('#site-nav');
if (toggle && nav) {
  const closeMenu = () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
  };

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Open menu' : 'Close menu');
    nav.classList.toggle('open');
  });

  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav.classList.contains('open')) {
      closeMenu();
      toggle.focus();
    }
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1100) closeMenu();
  });
}
