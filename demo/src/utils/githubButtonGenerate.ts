export function githubButtonGenerate() {
  const script = document.createElement('script');
  script.id = 'github-button';
  script.src = 'https://buttons.github.io/buttons.js';
  document.body.appendChild(script);
}
