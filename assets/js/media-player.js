// Site-wide bottom-right media player.
// Uses YouTube's official IFrame Player API (not scraping) to play the
// configured playlist. Off by default on a first visit — nothing plays
// until the user clicks the play button (also required by browser
// autoplay policy). Shuffle is on by default, and a random track is
// cued (not played) on load so there's always something ready to go.
//
// The on/off toggle state persists across page navigation via
// sessionStorage ('mpPlaying'): if playback was on when you left a page,
// the next page picks a new random track and resumes playing it
// automatically; if it was off, the next page stays off too.
//
// Because this is a static multi-page site (no client-side router), the
// player object itself is re-created fresh on every page load — only the
// on/off state carries over, not the exact track or playback position.
(function () {
  var PLAYLIST_ID = 'OLAK5uy_lXpyPT8gtHJAul5Yq7_igPNeR2FpiUBRo';
  var player = null;
  var isPlaying = false;
  var shuffleOn = true;
  var repeatOn = false;
  var muted = false;

  var playIcon = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
  var pauseIcon = '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14"/><rect x="14" y="5" width="4" height="14"/></svg>';

  window.onYouTubeIframeAPIReady = function () {
    var host = document.getElementById('ytPlayerHost');
    if (!host) return;
    player = new YT.Player('ytPlayerHost', {
      height: '1',
      width: '1',
      playerVars: {
        listType: 'playlist',
        list: PLAYLIST_ID,
        autoplay: 0,
        controls: 0
      },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange
      }
    });
  };

  function onPlayerReady(e) {
    e.target.setVolume(40);

    var shouldResume = sessionStorage.getItem('mpPlaying') === 'true';

    if (shouldResume) {
      // Browsers block unmuted autoplay without a fresh user gesture on
      // this page, so start muted (muted autoplay is always allowed),
      // call playVideo() directly against the playlist already set in
      // playerVars, then poll the player's real state until playback has
      // actually begun before unmuting. Note: setShuffle() is NOT called
      // here before playVideo() — doing so reorders the playlist and was
      // triggering a brief internal re-cue that interrupted playback right
      // as it started (title would flash then stop). It's applied only
      // once playback is confirmed stable.
      e.target.mute();
      e.target.playVideo();
      var tries = 0;
      var poll = setInterval(function () {
        tries++;
        var state = e.target.getPlayerState ? e.target.getPlayerState() : null;
        if (state === YT.PlayerState.PLAYING) {
          clearInterval(poll);
          if (!muted) e.target.unMute();
          e.target.setShuffle(true);
        } else if (tries > 25) {
          clearInterval(poll);
        }
      }, 200);
    } else {
      // Not resuming — safe to enable shuffle up front since nothing is
      // playing yet — then cue a random track from the playlist so
      // there's something ready to go without actually playing it.
      e.target.setShuffle(true);
      setTimeout(function () {
        var list = e.target.getPlaylist ? e.target.getPlaylist() : null;
        var len = list && list.length ? list.length : 1;
        var randomIndex = Math.floor(Math.random() * len);
        e.target.cuePlaylist({ listType: 'playlist', list: PLAYLIST_ID, index: randomIndex });
      }, 500);
    }
  }

  function updateNowPlaying() {
    var label = document.getElementById('mpNowPlaying');
    if (!label || !player || !player.getVideoData) return;
    var data = player.getVideoData();
    if (!data || !data.title) return;
    label.textContent = data.author ? (data.title + ' — ' + data.author) : data.title;
    label.title = label.textContent;
  }

  function clearNowPlaying() {
    var label = document.getElementById('mpNowPlaying');
    if (!label) return;
    label.textContent = '';
    label.title = '';
  }

  function onPlayerStateChange(e) {
    var playBtn = document.getElementById('mpPlayBtn');
    if (playBtn) {
      if (e.data === YT.PlayerState.PLAYING) {
        isPlaying = true;
        playBtn.innerHTML = pauseIcon;
        sessionStorage.setItem('mpPlaying', 'true');
      } else if (e.data === YT.PlayerState.PAUSED || e.data === YT.PlayerState.ENDED) {
        isPlaying = false;
        playBtn.innerHTML = playIcon;
        sessionStorage.setItem('mpPlaying', 'false');
        clearNowPlaying();
      }
    }
    // Only show the title/artist while actually playing — stays blank
    // the rest of the time, including while a track is cued but off.
    if (e.data === YT.PlayerState.PLAYING) {
      updateNowPlaying();
    } else if (e.data === YT.PlayerState.CUED) {
      clearNowPlaying();
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    if (!document.getElementById('ytPlayerHost')) return;

    var tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(tag);

    var playBtn = document.getElementById('mpPlayBtn');
    var prevBtn = document.getElementById('mpPrevBtn');
    var nextBtn = document.getElementById('mpNextBtn');
    var stopBtn = document.getElementById('mpStopBtn');
    var shuffleBtn = document.getElementById('mpShuffleBtn');
    var repeatBtn = document.getElementById('mpRepeatBtn');
    var muteBtn = document.getElementById('mpMuteBtn');
    var volumeSlider = document.getElementById('mpVolume');

    if (shuffleBtn) shuffleBtn.classList.add('mp-active');

    playBtn.addEventListener('click', function () {
      if (!player || !player.playVideo) return;
      if (isPlaying) player.pauseVideo();
      else player.playVideo();
    });

    prevBtn.addEventListener('click', function () {
      player && player.previousVideo && player.previousVideo();
    });

    nextBtn.addEventListener('click', function () {
      player && player.nextVideo && player.nextVideo();
    });

    stopBtn.addEventListener('click', function () {
      player && player.stopVideo && player.stopVideo();
      isPlaying = false;
      playBtn.innerHTML = playIcon;
      sessionStorage.setItem('mpPlaying', 'false');
      clearNowPlaying();
    });

    shuffleBtn.addEventListener('click', function () {
      shuffleOn = !shuffleOn;
      shuffleBtn.classList.toggle('mp-active', shuffleOn);
      player && player.setShuffle && player.setShuffle(shuffleOn);
    });

    repeatBtn.addEventListener('click', function () {
      repeatOn = !repeatOn;
      repeatBtn.classList.toggle('mp-active', repeatOn);
      player && player.setLoop && player.setLoop(repeatOn);
    });

    muteBtn.addEventListener('click', function () {
      muted = !muted;
      if (player) {
        if (muted) player.mute();
        else player.unMute();
      }
      muteBtn.classList.toggle('mp-active', muted);
    });

    volumeSlider.addEventListener('input', function () {
      if (player && player.setVolume) player.setVolume(volumeSlider.value);
    });

    // Browsers can keep a page (and its audio) alive in the back/forward
    // cache when you navigate away, which would otherwise let it keep
    // playing underneath the new page's own player. Pause it explicitly
    // whenever this page is being left.
    window.addEventListener('pagehide', function () {
      if (player && player.pauseVideo) player.pauseVideo();
    });
  });
})();
