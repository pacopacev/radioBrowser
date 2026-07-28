// async function loadStatus() {
//   const res = await fetch('/api/status');
//   const data = await res.json();

// //   console.log(data);

//   // Insert into HTML
//   document.getElementById('status').textContent = data.status;
//   document.getElementById('time').textContent = data.time;
// }

// loadStatus();


async function loadHosts() {

const res = await fetch('/api/host');
const data = await res.json();

// console.log(data.result.all);
const select = document.getElementById('radio-options-server');

  // Clear existing options
  select.innerHTML = '';

  // Add new options
  data.result.all.forEach(host => {
    const option = document.createElement('option');
    option.value = host;
    option.textContent = host;
    select.appendChild(option);
  });
}

loadHosts();
