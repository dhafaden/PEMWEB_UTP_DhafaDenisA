document.addEventListener('DOMContentLoaded', function () {

  const form = document.getElementById('contactForm');

  const inputs = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');
  inputs.forEach(function (input) {
    input.addEventListener('input', function () {
      this.closest('.form-group').classList.remove('has-error');
    });
  });

  const msgInput = document.getElementById('cf-message');
  const charCount = document.getElementById('charCount');
  if (msgInput && charCount) {
    msgInput.addEventListener('input', function () {
      const len = this.value.length;
      charCount.textContent = len + ' karakter';
      charCount.style.color = len > 450 ? 'var(--highlight)' : 'rgba(255,243,236,0.4)';
    });
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      let valid = true;

      const fields = [
        {
          id: 'cf-name', fgId: 'fg-name',
          validate: function (v) { return v.trim().length >= 2; },
          msg: 'Nama minimal 2 karakter.'
        },
        {
          id: 'cf-email', fgId: 'fg-email',
          validate: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); },
          msg: 'Masukkan email yang valid.'
        },
        {
          id: 'cf-subject', fgId: 'fg-subject',
          validate: function (v) { return v.trim().length > 0; },
          msg: 'Subjek tidak boleh kosong.'
        },
        {
          id: 'cf-message', fgId: 'fg-message',
          validate: function (v) { return v.trim().length >= 10; },
          msg: 'Pesan minimal 10 karakter.'
        }
      ];

      fields.forEach(function (f) {
        const input = document.getElementById(f.id); 
        const fg = document.getElementById(f.fgId);
        const errEl = fg.querySelector('.err-msg');

        if (!f.validate(input.value)) {
          fg.classList.add('has-error');
          if (errEl) errEl.textContent = f.msg;
          valid = false;
        } else {
          fg.classList.remove('has-error');
        }
      });

      const radioChecked = document.querySelector('input[name="jenis"]:checked');
      const radioFg = document.getElementById('fg-jenis');
      if (!radioChecked) {
        if (radioFg) radioFg.classList.add('has-error');
        valid = false;
      } else {
        if (radioFg) radioFg.classList.remove('has-error');
      }

      if (valid) {

        const successEl = document.getElementById('formSuccess');
        if (successEl) {
          successEl.style.display = 'block'; 
          successEl.innerHTML = '&#10003; Pesan berhasil terkirim! Terima kasih, <strong>' +
            document.getElementById('cf-name').value + '</strong>. Saya akan segera membalas. &#127881;';
        }

        form.reset();

        setTimeout(function () {
          if (successEl) successEl.style.display = 'none';
        }, 5000);

        showNotification('Pesan terkirim! Terima kasih 🎉');
      } else {

        const firstError = document.querySelector('.has-error');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        showNotification('Mohon lengkapi form dengan benar.');
      }
    });
  }
});
