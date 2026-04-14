window.toggleSidebar = function () {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');
  const hamburger = document.getElementById('hamburger');
  sidebar.classList.toggle('open');
  overlay.classList.toggle('open');
  hamburger.classList.toggle('open');
};

window.closeSidebar = function () {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('overlay').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
};

document.addEventListener('DOMContentLoaded', function () {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.sidebar-nav a'); 

  navLinks.forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  const revealEls = document.querySelectorAll('.reveal');

  function checkReveal() {
    revealEls.forEach(function (el) {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) {
        el.classList.add('visible');
      }
    });
  }

  window.addEventListener('scroll', checkReveal);
  checkReveal();

  const skillFills = document.querySelectorAll('.skill-fill');
  if (skillFills.length > 0) {
    setTimeout(function () {
      skillFills.forEach(function (bar) {
        bar.style.width = bar.dataset.level + '%';
      });
    }, 500);
  }

  window.showNotification = function (msg) {
    const notif = document.createElement('div');
    notif.className = 'notification';
    notif.textContent = msg;
    document.body.appendChild(notif);

    setTimeout(function () { notif.classList.add('show'); }, 50);
    setTimeout(function () {
      notif.classList.remove('show');
      setTimeout(function () { notif.remove(); }, 400);
    }, 3500);
  };

  const yearEls = document.querySelectorAll('.current-year');
  yearEls.forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  const navItems = document.querySelectorAll('.sidebar-nav a');
  navItems.forEach(function (item) {
    item.addEventListener('mouseenter', function () {
      this.style.letterSpacing = '1px'; 
    });
    item.addEventListener('mouseleave', function () {
      this.style.letterSpacing = '0.5px';
    });
  });
});