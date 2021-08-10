const containerGame = document.querySelector("#game")

let contador = 0

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
                // por enquando pode ser aqui mas o ideal era colcoar em uma funçao separado
                const celulaSelecionada = buscaFilho(colunaSelecionada,'jogador1','jogador2')
                trocaJogador(contador,celulaSelecionada)

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
        console.log(elemento.classList.contains(classJogador1))

        if(!elemento.classList.contains(classJogador1) && !elemento.classList.contains(classJogador2)){
            return elemento
        }
        //popup erro ?
    }
}

const trocaJogador = (num,elemento) =>{
    if(num%2===0){
        elemento.classList.add('jogador1')
        contador++
    }else{
        elemento.classList.add('jogador2')
        contador++
    }
}

function reseteJogo (elemento) {
    
    const alvo = document.querySelector(`#${elemento}`)
    
    alvo.remove()
}


tabulacao(containerGame)

