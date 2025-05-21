const backendUrl = 'http://172.83.14.144'; // Ganti dengan alamat backend Anda

document.getElementById('loginBtn').addEventListener('click', async () => {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const status = document.getElementById('status');
  status.textContent = 'Logging in...';

  try {
    const res = await fetch(`${backendUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Login gagal');

    await chrome.storage.local.set({ token: data.token });

    status.textContent = 'Login berhasil!';
    showApps(data.token);
  } catch (err) {
    status.textContent = err.message;
  }
});

async function showApps(token) {
  document.getElementById('appSection').style.display = 'block';
  const appList = document.getElementById('appList');
  appList.innerHTML = 'Memuat aplikasi...';

  try {
    const res = await fetch(`${backendUrl}/api/apps`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const apps = await res.json();
    if (!res.ok) throw new Error('Gagal mengambil aplikasi');

    appList.innerHTML = '';
    apps.forEach(app => {
      const li = document.createElement('li');
      li.textContent = app.name;
      li.addEventListener('click', () => injectCookie(app));
      appList.appendChild(li);
    });
  } catch {
    appList.innerHTML = 'Gagal memuat aplikasi';
  }
}

function injectCookie(app) {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    const tabId = tabs[0].id;
    chrome.scripting.executeScript({
      target: { tabId },
      func: (cookieString) => {
        cookieString.split(';').forEach(cookie => {
          document.cookie = cookie.trim() + '; path=/';
        });
      },
      args: [app.cookie]
    }, () => alert(`Cookie untuk ${app.name} sudah disuntikkan!`));
  });
}
