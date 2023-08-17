/*Opções*/
const inputRadio = document.querySelectorAll('input[name=option]');
const game = document.querySelector('.game');
const boasvindas = document.querySelector('.boas-vindas');

/*Placar*/
var vitoria = 0;
var derrota = 0;
var empate = 0;

/* Ativa o botão ao selecionar opção */
inputRadio.forEach((elem) => {
    elem.addEventListener("change", function(event) {
        buttonJogar.disabled = false;
    });
});

/*Botões*/
const buttonStart = document.querySelector('.start');
const buttonJogar = document.querySelector('.jogar');
const buttonReiniciar = document.querySelectorAll('.reiniciar');

/*Iniciar jogo*/
buttonStart.addEventListener('click', function() {
    boasvindas.style.display = 'none';
    game.style.display = 'block';
})


buttonJogar.disabled = true;

/* Itens do jogo */
const adversario = document.querySelector('.adversario span');
var jokenpo = ['👊', '✋', '✌️'];
const resultado = document.querySelector('.resultado p')

const icons = document.querySelectorAll('input[name="option"]');
const iconEscolhido = document.querySelector('.foto div');
icons.forEach(function(icon) {
    
    icon.addEventListener('click', function() {
        const iconSpan = icon.nextElementSibling.innerText;
        iconEscolhido.innerText = iconSpan;
        
            document.querySelector('#som-select').cloneNode().play();
            document.querySelector('.escolha-adv').innerText = '?';
            resultado.innerText = '';
        
            game.classList.remove('ganhou');
            game.classList.remove('perdeu');
            game.classList.remove('empatou');
        
    })
    
})


/* Countdown */
function countdown() {
    game.classList.remove('ganhou');
    game.classList.remove('perdeu');
    game.classList.remove('empatou');
    document.querySelector('.escolha-adv').innerText = '?';
    resultado.innerText = '';
    
    setTimeout(() => {
        resultado.innerText = "Jo";
    }, 500)
    
    setTimeout(() => {
        resultado.innerText = "Ken";
    }, 1000)
    
    setTimeout(() => {
        resultado.innerText = "Pô";
    }, 1500)
    
    setTimeout(() => {
        comparar();
    }, 2000)
}

function comparar() {
    
    const inputValor = document.querySelector('input[name="option"]:checked').value;
    var jokenpoArray = jokenpo[Math.floor(Math.random() * jokenpo.length)];

    /*Empate*/
    function initEmpate() {
        placarEmpate = empate++; 
        resultado.innerText = 'Empate 😕'; 
        document.querySelector('.empate').innerText = placarEmpate + 1; 
        
        document.querySelector('.escolha-adv').innerText = jokenpoArray;
        document.querySelector('#som-derrota').play();
        game.classList.add('empatou');
        
    }
    
    /*Derrota*/
    function initDerrota() {
        var placarDerrota = derrota++; 
        resultado.innerText = 'Derrota 😥'; 
        document.querySelector('.derrota').innerText = placarDerrota + 1; 
        
        document.querySelector('.escolha-adv').innerText = jokenpoArray;
        document.querySelector('#som-derrota').play();
        game.classList.add('perdeu');
    }
    
    /*Vitoria*/
    function initVitoria() {
        var placarVitoria = vitoria++; 
        resultado.innerText = 'Vitoria 😆'; 
        document.querySelector('.vitoria').innerText = placarVitoria + 1; 
        
        document.querySelector('.escolha-adv').innerText = jokenpoArray;
        document.querySelector('#som-vitoria').play();
        game.classList.add('ganhou');

    }
    
    /* Fim de jogo */
    function gameOver() {
        document.querySelector('.game-over').classList.add('visible');
    }
    function endGame() {
        document.querySelector('.endgame').classList.add('visible');
    }
    function gameEmpate() {
        document.querySelector('.game-empate').classList.add('visible');
    }
    

    /* IFs */
    if(inputValor === 'pedra' && jokenpoArray === '👊' || inputValor === 'papel' && jokenpoArray === '✋' || inputValor === 'tesoura' && jokenpoArray === '✌️') { 
        initEmpate();
    } else if(inputValor === 'pedra' && jokenpoArray === '✋' || inputValor === 'papel' && jokenpoArray === '✌️' || inputValor === 'tesoura' && jokenpoArray === '👊'){
        initDerrota();   
    } else if(inputValor === 'pedra' && jokenpoArray === '✌️' || inputValor === 'papel' && jokenpoArray === '👊' || inputValor === 'tesoura' && jokenpoArray === '✋') {
        initVitoria(); 
    }
     
    if(vitoria > 2) {
        endGame();
    } else if (empate > 2) {
        gameEmpate();
    } else if (derrota > 2) {
        gameOver();   
    }
     
} 

function reiniciar() {
    vitoria = 0;
    derrota = 0;
    empate = 0;
    
    document.querySelector('.vitoria').innerText = 0;
    document.querySelector('.derrota').innerText = 0;
    document.querySelector('.empate').innerText = 0;
    
    inputRadio.forEach((elem) => {
        elem.checked = false;
    });
    
    buttonJogar.disabled = true;
    
    document.querySelector('.game-over').classList.remove('visible');
    document.querySelector('.endgame').classList.remove('visible');
    document.querySelector('.game-empate').classList.remove('visible');
    
    game.classList.remove('ganhou');
    game.classList.remove('perdeu');
    game.classList.remove('empatou');
    
    resultado.innerText = '';
    document.querySelector('.escolha-adv').innerText = '?';
    iconEscolhido.innerText = '';

}    

buttonJogar.addEventListener('click', countdown);
buttonReiniciar.forEach((btn) => {
    btn.addEventListener('click', reiniciar);
})