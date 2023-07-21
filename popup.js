document.addEventListener('DOMContentLoaded', function () {
  const saveButton = document.getElementById('saveButton');

  saveButton.addEventListener('click', function () {
    const baseURL = document.getElementById('baseURL').value;
    const redirectURL = document.getElementById('redirectURL').value;

    if (baseURL && redirectURL) {
      chrome.storage.sync.set({ baseURL, redirectURL }, function () {
        alert('Settings saved!');
      });
    } else {
      alert('Please fill in both Base URL and Redirect URL.');
    }
  });
});
