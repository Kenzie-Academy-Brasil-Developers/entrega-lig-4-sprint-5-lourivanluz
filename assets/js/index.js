const containerGame = document.querySelector("#game")

let contador = 0

const transformaJogador = (num) =>{
    if(num%2===0){
        return'jogador1'
    }
    return 'jogador2'

}

const jogar = (elemento) =>{
    const celulaSelecionada = buscaFilho(elemento,'jogador1','jogador2')

    if(celulaSelecionada!== undefined){
        const posicao = celulaSelecionada.getAttribute('block')

       const todasPosicoesJogadas = posicaoJogador(posicao,transformaJogador(contador))
       condicaoDeVitoria(posicao,todasPosicoesJogadas)
        trocaJogador(celulaSelecionada)
    }
}


const tabulacao = (table) => {

    for (let i = 0; i < 7; i++) {
        let coluna = document.createElement("div");
        coluna.classList.add("coluna", "coluna"+i);

        for (let j = 0; j < 6; j++) {
            let linha = document.createElement("div");
            linha.classList.add("linha");
            linha.setAttribute("block", j+":"+i)

            linha.addEventListener("click", (e) => {
                const colunaSelecionada = e.target.parentElement
                jogar(colunaSelecionada)        
            })
            coluna.appendChild(linha);
        }
        table.appendChild(coluna);
    }    
}

const buscaFilho = (elemento,classe1,classe2) =>{
    const filhos = [...elemento.children]
    for(let index = filhos.length-1; index>=0; index--){
        const elemento = filhos[index]
        const classJogador1 = classe1
        const classJogador2 = classe2
        

        if(!elemento.classList.contains(classJogador1) && !elemento.classList.contains(classJogador2)){
            return elemento
            
        }
        //popup erro ?
    }
}

const trocaJogador = (elemento) =>{

    const jogador = transformaJogador(contador)
    elemento.classList.add(jogador)
    contador++
}

const posicaoJogador = (posicao,jogador) => {

    let arrayPosicao = []
    arrayPosicao.push(posicao)

    let elementosJogador = document.querySelectorAll('.'+jogador)

    for (let i = 0; i < elementosJogador.length; i++) {
        let posicao = elementosJogador[i].getAttribute("block")
        arrayPosicao.push(posicao)
    }

    return arrayPosicao
}



function reseteJogo () {
  
    const alvo = document.querySelector('#game')
    alvo.remove()
    criaAlvo()
}

function criaAlvo() {
    const paiDoGame = document.querySelector('#pai-do-game')
    const game = document.createElement('div')
    game.setAttribute('id', 'game')
    game.classList.add('container-game')
    paiDoGame.appendChild(game)
    tabulacao(game)
}

const placar = (jogadorVencedor) => {

    let spanPlacarJogador1 = document.querySelector(".placar-jogador-um")
    let spanPlacarJogador2 = document.querySelector(".placar-jogador-dois")

    let placarJogador1 = spanPlacarJogador1.innerText
    let placarJogador2 = spanPlacarJogador2.innerText

    if (jogadorVencedor === 'jogador1') {
        placarJogador1++
        spanPlacarJogador1.innerText = placarJogador1
    }

    if (jogadorVencedor === "jogador2") {
        placarJogador2++
        spanPlacarJogador2.innerText = placarJogador2
    }
}


const criaArrayVitorioso = (posicao,nLinha=0,nColuna=0) =>{
    const arrayVitoria = []
    arrayVitoria.push(posicao)
    const position = posicao.split(':')
    let linha = Number(position[0])
    let coluna = Number(position[1])

    for(let contador = 0; contador<3; contador++){

        if(nLinha>0){
            linha+=1
        }else if (nLinha<0){
            linha-=1
        }

        if(nColuna>0){
            coluna+=1
        }else if (nColuna<0){
            coluna-=1
        }
        arrayVitoria.push(linha+':'+coluna)
    }
    return arrayVitoria
}
tabulacao(containerGame)

const validarVitoria = (arrayVitoria, arrayPosicao) => {

    let result = false
    let arrResult = []

    arrayPosicao.filter((el) => {
        if(el === arrayVitoria[0]) {
            arrResult.push(el)
        }
    
        if (el === arrayVitoria[1]) {
            arrResult.push(el)
        }
    
        if(el === arrayVitoria[2]) {
            arrResult.push(el)
        }
    
        if (el === arrayVitoria[3]) {
            arrResult.push(el)
        }
    })

    if(arrResult.length === 4) {
        result = true
    }
    return result
}

const condicaoDeVitoria = (posicao, posicaojogada) =>{

    const arrayPosicao = posicaojogada

    const arrayLB = criaArrayVitorioso(posicao,1,0)
    const arrayLE = criaArrayVitorioso(posicao,0,-1)
    const arrayLD = criaArrayVitorioso(posicao,0,1)
    const arrayTv1 = criaArrayVitorioso(posicao,1,1)
    const arrayTva = criaArrayVitorioso(posicao,-1,-1)
    const arraytv2 = criaArrayVitorioso(posicao,1,-1)
    const arrayTv2a = criaArrayVitorioso(posicao,-1,1)

    const arrayTotal = [arrayLB,arrayLE,arrayLD,arrayTv1,arrayTva,arraytv2,arrayTv2a]


    arrayTotal.forEach(item =>{
        const arrayvitoria = item
        const resultado = validarVitoria(arrayvitoria, arrayPosicao)
        if(resultado){
            console.log('vencedor')
            //cria tela de vencedor
        }
    })
}

/* function telasVitoriaEmpate(condicao) {
    const main = document.querySelector('main')
    const telaGrande = document.createElement('div')
    const telaAviso = document.createElement('div')
    telaAviso.setAttribute('id', 'aviso')
    telaGrande.setAttribute('id', 'telaGrande')
    main.appendChild(telaGrande)
    telaGrande.appendChild(telaAviso)

    if (condicao) {
        telaAviso.appendChild(vitoria())
    } else {
        telaAviso.appendChild(derrota())
    }
}
telasVitoriaEmpate(false)

function vitoria() {
    const vitoria = document.createElement('div')
    vitoria.setAttribute('id', 'vitoria')
    vitoria.innerHTML = '<span class="txtVitoria"> Você Venceu!! </span>'
    return vitoria
}
function derrota() {
    const derrota = document.createElement('div')
    derrota.setAttribute('id', 'derrota')
    derrota.innerHTML = '<span class="txtDerrota"> Você Perdeu! </span>'
    return derrota
} */