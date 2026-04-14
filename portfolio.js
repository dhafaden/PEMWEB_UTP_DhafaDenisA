document.addEventListener('DOMContentLoaded', function () {

  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {

      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');

      const cat = this.dataset.filter;

      projectCards.forEach(function (card) {
        if (cat === 'all' || card.dataset.cat === cat) {
          card.classList.remove('hidden');

          card.style.animation = 'none';
          card.offsetHeight;
          card.style.animation = '';
        } else {
          card.classList.add('hidden');
        }
      });

      const visible = document.querySelectorAll('.project-card:not(.hidden)').length;
      showNotification('Menampilkan ' + visible + ' project');
    });
  });

  const counterEl = document.getElementById('projectCount');
  if (counterEl) {
    counterEl.textContent = projectCards.length;
  }
});
