const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longBt = document.querySelector('.app__card-button--longo')
const appImage = document.querySelector('.app__image')
const appTitle = document.querySelector('.app__title')
const alternarMusica = document.getElementById('alternar-musica')
const buttonContexto = document.querySelectorAll('.app__card-button')
const startPauseBt = document.getElementById('start-pause')
const timer = document.getElementById('timer')
const iniciarOuPausarBtn = document.querySelector('#start-pause span')
const iniciarOuPausarIcone = document.querySelector('.app__card-primary-button-icon')

const musica = new Audio('src/sons/luna-rise-part-one.mp3')
const audioPlay = new Audio('src/sons/play.wav');
const audioPausa = new Audio('src/sons/pause.mp3');
const audioTempoFinalizado = new Audio('src/sons/beep.mp3')

musica.loop = true;
const timeFoco = 1500;
const timeCurto = 300;
const timeLong = 900;
let tempoDecorridoEmSegundos = 1500
let intervaloId = null

focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = timeFoco
    alterarContexto('foco')
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = timeCurto
    alterarContexto('descanso-curto')
})

longBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = timeLong
    alterarContexto('descanso-longo')
})

function alterarContexto(contexto) {
    mostrarTempo()
    html.setAttribute('data-contexto', contexto )
    appImage.setAttribute('src', `src/imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            appTitle.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case "descanso-curto":
            appTitle.innerHTML = `
            Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>
            ` 
            break;
        case "descanso-longo":
            appTitle.innerHTML = `
            Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>
            `
        default:
            break;
    }
}

buttonContexto.forEach(button => {
    button.addEventListener('click', function() {
        buttonContexto.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
    });
});

alternarMusica.addEventListener('change', () => {
    if (musica.paused){
        musica.play()
    } else {
        musica.pause()
    }
})

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0){
        audioTempoFinalizado.play()
        musica.pause()   
        zerar()
        alert('Tempo finalizado!')
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if(intervaloId){
        audioPausa.play()   /
        zerar()
        return
    }
    audioPlay.play()   
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarBtn.textContent = 'Pausar'
    iniciarOuPausarIcone.setAttribute('src', 'src/imagens/pause.png')
}

function zerar() {
    clearInterval(intervaloId) 
    iniciarOuPausarBtn.textContent = 'Começar'
    iniciarOuPausarIcone.setAttribute('src', 'src/imagens/play.png')
    intervaloId = null
}

function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    timer.innerHTML = `${tempoFormatado}`
}

mostrarTempo()