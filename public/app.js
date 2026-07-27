async function loadStatus() {
  const res = await fetch('/api/status');
  const data = await res.json();

//   console.log(data);

  // Insert into HTML
  document.getElementById('status').textContent = data.status;
  document.getElementById('time').textContent = data.time;
}

loadStatus();
