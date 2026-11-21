document.documentElement.classList.add('has-site-nav');

if (!document.querySelector('main[id="main-content"]') && document.querySelector('main')) {
  document.querySelector('main').id = 'main-content';
}

if (!document.querySelector('.skip-link')) {
  const skip = document.createElement('a');
  skip.className = 'skip-link';
  skip.href = '#main-content';
  skip.textContent = 'Skip to content';
  document.body.prepend(skip);
}
