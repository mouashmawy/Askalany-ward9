const presetButtons = [...document.querySelectorAll('.paypal-preset')];
const customToggle = document.querySelector('.paypal-custom-toggle');
const customForm = document.querySelector('#paypal-custom-form');
const customAmount = document.querySelector('#paypal-custom-amount');
const customStatus = document.querySelector('#paypal-custom-status');
const paymentAction = document.querySelector('#paypal-payment-action');
const selectionStatus = document.querySelector('#paypal-selection-status');
const payButton = document.querySelector('#paypal-pay-button');

if (customToggle && customForm && customAmount && customStatus && paymentAction && selectionStatus && payButton) {
  const formatAmount = amount => Number.isInteger(amount) ? String(amount) : amount.toFixed(2).replace(/0+$/, '').replace(/\.$/, '');

  const clearPayment = () => {
    payButton.removeAttribute('href');
    payButton.setAttribute('aria-disabled', 'true');
    payButton.firstChild.textContent = 'Pay with PayPal ';
    selectionStatus.textContent = 'Choose an amount to activate the PayPal button.';
  };

  const selectAmount = amount => {
    const cleanAmount = Math.round(amount * 100) / 100;
    const displayAmount = formatAmount(cleanAmount);
    payButton.href = `https://paypal.me/StarPub/${displayAmount}CAD`;
    payButton.setAttribute('aria-disabled', 'false');
    payButton.firstChild.textContent = `Pay $${displayAmount} CAD with PayPal `;
    selectionStatus.textContent = `$${displayAmount} CAD selected.`;
  };

  const closeCustom = () => {
    customForm.hidden = true;
    customToggle.hidden = false;
    customToggle.setAttribute('aria-expanded', 'false');
    customStatus.textContent = '';
  };

  presetButtons.forEach(button => {
    button.addEventListener('click', () => {
      closeCustom();
      presetButtons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      selectAmount(Number(button.dataset.amount));
    });
  });

  customToggle.addEventListener('click', () => {
    presetButtons.forEach(button => button.setAttribute('aria-pressed', 'false'));
    customToggle.hidden = true;
    customForm.hidden = false;
    customToggle.setAttribute('aria-expanded', 'true');
    clearPayment();
    customAmount.focus({ preventScroll: true });
  });

  customAmount.addEventListener('input', () => {
    const amount = Number(customAmount.value);
    customStatus.textContent = '';

    if (!customAmount.value) {
      clearPayment();
      return;
    }

    if (!Number.isFinite(amount) || amount < 0.01 || amount > 1000) {
      customStatus.textContent = 'Enter an amount between $0.01 and $1,000 CAD.';
      clearPayment();
      return;
    }

    selectAmount(amount);
  });

  customForm.addEventListener('submit', event => event.preventDefault());

  payButton.addEventListener('click', event => {
    if (payButton.getAttribute('aria-disabled') === 'true') event.preventDefault();
  });
}
