import '/player.css?v=123';

let audioElement;

function initPlayer() {
  if (!audioElement) {
    audioElement = document.getElementById('player');

    if (!audioElement) {
      return null;
    }

    audioElement.addEventListener('error', () => {
      console.error('Audio playback error:', audioElement.error);
    });

    audioElement.addEventListener('loadeddata', () => {
      console.log('Audio data loaded for:', audioElement.currentSrc);
    });

    audioElement.addEventListener('play', () => {
      console.log('Playback started.');
    });

    audioElement.addEventListener('pause', () => {
      console.log('Playback paused.');
    });

    window.player = audioElement;
  }

  return audioElement;
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPlayer, { once: true });
} else {
  initPlayer();
}

export function getPlayer() {
  return audioElement || initPlayer();
}

export { audioElement as player };
