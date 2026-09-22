document.querySelector('#copy-email').addEventListener('click', async () => {
  const status = document.querySelector('#copy-status');
  try {
    await navigator.clipboard.writeText('mo@voteaskalany.ca');
    status.textContent = 'Email address copied.';
  } catch {
    status.textContent = 'Please select and copy the email address above.';
  }
});
