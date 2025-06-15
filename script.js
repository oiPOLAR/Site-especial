document.addEventListener('DOMContentLoaded', function () {
  const lockScreen = document.getElementById('lockScreen');
  const mainSite = document.getElementById('mainSite');
  const passwordInput = document.getElementById('passwordInput');
  const errorMessage = document.getElementById('errorMessage');
  const lockImage = document.getElementById('lockImage');

  // Mostrar o site principal após desbloquear
  function showMainSite() {
    mainSite.classList.remove('hidden');
    mainSite.style.opacity = '1';
    initializeSite(); // Inicia os elementos do site
  }

  // Função de verificação de senha
  const checkPassword = document.getElementById('checkPassword'); // Declara aqui
  checkPassword.addEventListener('click', verifyPassword);
  passwordInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') verifyPassword();
  });

  function verifyPassword() {
    const password = passwordInput.value.trim().toLowerCase();

    if (password === 'rafaella') {
      // Senha correta - remover bloqueio e mostrar site
      lockScreen.style.opacity = '0';
      setTimeout(() => {
        lockScreen.remove();
        showMainSite();
      }, 300);

    } else if (password === 'iloveyou') {
      // SEGREDO - toca áudio e mantém imagem até ele terminar
      const secretAudio = new Audio('/segredo19012013/audio.mp3');
      passwordInput.disabled = true;
      checkPassword.disabled = true;

      lockImage.src = 'https://i.imgur.com/RnlmFMy.gif';  // Imagem secreta

      secretAudio.play();

      secretAudio.addEventListener('ended', () => {
        lockImage.src = 'https://i.imgur.com/D2erEpY.png'; 
        passwordInput.disabled = false;
        checkPassword.disabled = false;
        passwordInput.focus();
      });

      secretAudio.addEventListener('error', () => {
        lockImage.src = 'https://i.imgur.com/D2erEpY.png'; 
        passwordInput.disabled = false;
        checkPassword.disabled = false;
        passwordInput.focus();
      });

    } else {
      // Senha incorreta - luz vermelha + erro
      lockImage.src = 'https://i.imgur.com/FdwzK0h.png'; 
      lockScreen.classList.add('leon-red');
      errorMessage.classList.remove('hidden');
      passwordInput.classList.add('border-red-400');
      passwordInput.select();

      setTimeout => {
        lockScreen.classList.remove('leon-red');
        lockImage.src = 'https://i.imgur.com/D2erEpY.png'; 
      };
    }
  }

  // Inicializa o site principal (player de música, etc)
  function initializeSite() {
    const audio = document.getElementById('audioPlayer');
    const playButton = document.getElementById('play-button');
    const icon = playButton.querySelector('i');
    const progressBar = document.querySelector('.progress');
    const songTitle = document.getElementById('song-title');

    const songs = [
      { title: '1-Sem vc...', src: 'music/musica1.mp3' },
      { title: '2-Vemm pra cá!!', src: 'music/musica2.mp3' },
      { title: '3-A mina mais gata...', src: 'music/musica3.mp3' },
      { title: '4-Igual vc não a...', src: 'music/musica4.mp3' },
      { title: '5- HIHIHI :3...', src: 'music/musica5.mp3' },
    ];

    let currentSongIndex = 0;

    function updateSongInfo() {
      const currentSong = songs[currentSongIndex];
      songTitle.textContent = currentSong.title;
      audio.src = currentSong.src;
      audio.load();
    }

    updateSongInfo();
    audio.play(); // 🔊 MÚSICA COMEÇA AUTOMATICAMENTE AO DESBLOQUEAR

    playButton.addEventListener('click', function () {
      if (audio.paused) {
        audio.play();
        icon.classList.remove('ri-play-fill');
        icon.classList.add('ri-pause-fill');
      } else {
        audio.pause();
        icon.classList.remove('ri-pause-fill');
        icon.classList.add('ri-play-fill');
      }
    });

    audio.addEventListener('timeupdate', function () {
      const percent = (audio.currentTime / audio.duration) * 100;
      progressBar.style.width = `${percent}%`;
    });

    document.querySelector('.ri-skip-forward-fill').addEventListener('click', function () {
      currentSongIndex = (currentSongIndex + 1) % songs.length;
      updateSongInfo();
      audio.play();
    });

    document.querySelector('.ri-skip-back-fill').addEventListener('click', function () {
      currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
      updateSongInfo();
      audio.play();
    });

    audio.addEventListener('ended', function () {
      currentSongIndex = (currentSongIndex + 1) % songs.length;
      updateSongInfo();
      audio.play();
    });
  }
});