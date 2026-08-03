// async function loadStatus() {
//   const res = await fetch('/api/status');
//   const data = await res.json();

// //   console.log(data);

//   // Insert into HTML
//   document.getElementById('status').textContent = data.status;
//   document.getElementById('time').textContent = data.time;
// }

// loadStatus();

import Plyr from 'plyr';
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



// (No need to import CSS here if you load it via <link>)

let player;

function initPlayer() {
  const audioElement = document.getElementById('player');
  if (!audioElement) return;

  player = new Plyr(audioElement, {
    controls: ['play', 'progress', 'current-time', 'duration', 'mute', 'volume'],
  });

  window.player = player;
  return player;
}

function setPlayerSource(url) {
  if (!player || !url) return;

  const streamUrl = url.startsWith('http://') && window.location.protocol === 'https:'
    ? url.replace('http://', 'https://')
    : url;

  const sourceType = streamUrl.endsWith('.m3u8')
    ? 'application/x-mpegURL'
    : streamUrl.endsWith('.ogg')
      ? 'audio/ogg'
      : 'audio/mpeg';

  player.source = {
    type: 'audio',
    title: 'Radio station',
    sources: [{ src: streamUrl, type: sourceType }],
  };

  player.play().catch(() => {
    console.warn('Playback was blocked until the user interacts with the page.');
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPlayer, { once: true });
} else {
  initPlayer();
}

export { player };
loadHosts();



function loadGenrelist(){

const list = 
   { heavy_metal: "Heavy",
     trash_metal: "Trash",
      death_metal: "Death",
       grind: "Grind",
       metalcore: "Metalcore",
       deathcore: "Deathcore"

     }

const genreSelect = document.getElementById('radio-options-genre');
const select = document.getElementById('radio-options-genre')
select.innerHTML = '';
for (const [k, v] of Object.entries(list)) {
    // console.log(`${k}: ${v}`);

    

    const option = document.createElement('option');
            option.value = k;
            // console.log(k)
            option.textContent = `${v}`;
            genreSelect.appendChild(option);






}





};

loadGenrelist();