const containerGame = document.querySelector("#game")
const instrucao = document.querySelector('.instru')
const btnMostrarDica = document.querySelector('#btnTelaInstrucao')

let contador = 0



const mostrarDica = () =>{
    const telaInstrucao = document.querySelector('.telaInstrucao')
    telaInstrucao.setAttribute('style','display:block;')
}

const sumirDica = () =>{
    const telaInstrucao = document.querySelector('.telaInstrucao')
    telaInstrucao.setAttribute('style','display:none;')
}


instrucao.addEventListener('click',()=>{
    mostrarDica()
})
btnMostrarDica.addEventListener('click',()=>{
    sumirDica()
})



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
        condicaoDeVitoria(posicao,todasPosicoesJogadas,transformaJogador(contador))
        trocaJogador(celulaSelecionada)
        if(contador%2!==0 ){ //&& bot ligaod
            //bot()
        }
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
                if(contador<42){
                    jogar(colunaSelecionada) 
                }else{
                    //console.log('chama tela Empate')
                    criaTelaVitoria('empate')
                    reseteJogo()
                    contador = 0
                }
                       
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
    contador = 0
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
let interruptor = true 
const condicaoDeVitoria = (posicao, posicaojogada,jogador) =>{

    const arrayPosicao = posicaojogada

    const arrayLB = criaArrayVitorioso(posicao,1,0)
    const arrayLE = criaArrayVitorioso(posicao,0,-1)
    const arrayLD = criaArrayVitorioso(posicao,0,1)
    const arrayTv1 = criaArrayVitorioso(posicao,1,1)
    const arrayTva = criaArrayVitorioso(posicao,-1,-1)
    const arraytv2 = criaArrayVitorioso(posicao,1,-1)
    const arrayTv2a = criaArrayVitorioso(posicao,-1,1)
    const arrayLinha1 = posicaoMeio(posicao,0,1)
    const arrayLinha2 = posicaoMeio(posicao,0,-1)
    const arrayVertical1 = posicaoMeio(posicao,-1,-1)
    const arrayVertical1a = posicaoMeio(posicao,1,1)
    const arrayVertical2 = posicaoMeio(posicao,1,-1)
    const arrayVertical2a = posicaoMeio(posicao,-1,1)

    const arrayTotal = [arrayLB,arrayLE,arrayLD,arrayTv1,arrayTva,arraytv2,arrayTv2a,arrayLinha1,arrayLinha2,
        arrayVertical1,arrayVertical1a,arrayVertical2,arrayVertical2a]


    arrayTotal.forEach(item =>{
        const arrayvitoria = item
        const resultado = validarVitoria(arrayvitoria, arrayPosicao)
        if(resultado){
            placar(jogador)
            if(interruptor){

                criaTelaVitoria(jogador)           
                reseteJogo()

                interruptor=false
            }
        }
    })

    interruptor = true
}

const bot = (ligado) =>{
    const colunas = document.querySelectorAll('.coluna')
    const filhos =[]
    colunas.forEach(item =>{
        const elemento = item.firstChild

        if(!elemento.classList.contains('jogador1') && !elemento.classList.contains('jogador2')){
            filhos.push(elemento)
            
        }
    })

    const numberRandom = Math.floor(Math.random() * (((filhos.length-1) - 0 )+ 1)) + 0

    const elemento = filhos[numberRandom]
    elemento.click()
}


const criaTelaVitoria = (jogador) =>{
   
    const alvo = document.querySelector('.container-geral')

    

    const telaVitoria = document.createElement('div')
    const textoVitoria = document.createElement('h2')
    const divImagem = document.createElement('div')


    textoVitoria.setAttribute('id', 'textoVitoria')
    textoVitoria.innerText = 'Vit??ria!!'
    divImagem.setAttribute('id','divImagem')
    telaVitoria.setAttribute('id', 'telaVitoria')

    if(jogador === 'jogador1'){
        telaVitoria.classList.add('telaJogador1')
        divImagem.classList.add('imgJogador1')

    }else if (jogador === 'jogador2'){
        telaVitoria.classList.add('telaJogador2')
        divImagem.classList.add('imgJogador2')
    }else{
        telaVitoria.classList.add('telaEmpate')
        textoVitoria.innerText = 'Empate!'
        divImagem.classList.add('imgEmpate')
    }

    telaVitoria.appendChild(textoVitoria)
    telaVitoria.appendChild(divImagem)

    alvo.appendChild(telaVitoria)

    telaVitoria.addEventListener('click', () => {
        telaVitoria.remove()
    })

}


const buttonResetar = document.querySelector('#bntMenu')
buttonResetar.addEventListener("click", (e) => {
    let spanPlacarJogador1 = document.querySelector(".placar-jogador-um")
    let spanPlacarJogador2 = document.querySelector(".placar-jogador-dois")
    spanPlacarJogador1.innerText = 0
    spanPlacarJogador2.innerText = 0
    reseteJogo()
})

const posicaoMeio = (posicao,lin,col) =>{

    const arrayVitoria = []
    const position = posicao.split(':')
    let linha = Number(position[0])
    let coluna = Number(position[1])
    arrayVitoria.push(posicao)

   arrayVitoria.push(`${linha+lin}:${coluna+col}`)

    for(let contador = 0; contador<2; contador++){

        if(lin>0){
            linha-=1
        }else if (lin<0){
            linha+=1
        }

        if(col>0){
            coluna-=1
        }else if (col<0){
            coluna+=1
        }

        arrayVitoria.push(`${linha}:${coluna}`)
    }

    return arrayVitoria

}

tabulacao(containerGame)

