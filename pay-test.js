const customToggle = document.querySelector('.paypal-custom-toggle');
const customForm = document.querySelector('#paypal-custom-form');
const customAmount = document.querySelector('#paypal-custom-amount');
const customStatus = document.querySelector('#paypal-custom-status');

if (customToggle && customForm && customAmount && customStatus) {
  customToggle.addEventListener('click', () => {
    const willOpen = customForm.hidden;
    customForm.hidden = !willOpen;
    customToggle.setAttribute('aria-expanded', String(willOpen));
    customToggle.closest('.paypal-donation-card')?.classList.toggle('custom-open', willOpen);
    requestAnimationFrame(() => window.scrollTo(0, 0));

    if (!willOpen) customToggle.focus();
  });

  customAmount.addEventListener('input', () => {
    customStatus.textContent = '';
  });

  customForm.addEventListener('submit', event => {
    event.preventDefault();
    const amount = Number(customAmount.value);

    if (!Number.isFinite(amount) || amount < 0.01 || amount > 1000) {
      customStatus.textContent = 'Enter an amount between $0.01 and $1,000 CAD.';
      customAmount.focus();
      return;
    }

    const roundedAmount = Math.round(amount * 100) / 100;
    window.location.assign(`https://paypal.me/mmashraf9/${roundedAmount}CAD`);
  });
}
