const fullUrl = document.querySelector('#fullUrl');
const shortButton = document.querySelector('#shortButton');
const outputUrl = document.querySelector('#outputUrl');
const copyButton = document.querySelector('#copyButton');
const resultContainer = document.querySelector('.short-result');

// const baseURL = 'http://localhost:8000';

copyButton.addEventListener('click', (e) => {
  navigator.clipboard.writeText(outputUrl.innerHTML);
  alert('url copied');
});

shortButton.addEventListener('click', (e) => {
  e.preventDefault();
  const _fullUrl = fullUrl.value;
  if (_fullUrl && _fullUrl != '') {
    fetch(`/short`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: _fullUrl,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.status == 'success') {
          resultContainer.classList.add('visible');
          outputUrl.innerHTML = data.url;
        } else {
          alert('something went wrong! try again later');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    alert('Please enter a url');
  }
});
