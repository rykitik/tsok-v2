document.addEventListener('DOMContentLoaded', function() {
    const loader = document.getElementById('loader');
    loader.style.display = 'flex';
    console.log('start')
    window.addEventListener('load', function() {
        loader.style.display = 'none';
        console.log('stop')
    });
  });