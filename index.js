const containerGame = document.querySelector("#game")


const tabulacao = (table) => {

    for (let i = 0; i < 7; i++) {
        let coluna = document.createElement("div");
        coluna.classList.add("coluna", "coluna"+i);

        for (let j = 0; j < 6; j++) {
            let linha = document.createElement("div");
            linha.classList.add("linha");
            linha.setAttribute("block", j+":"+i)

            linha.addEventListener("click", (e) => {
                console.dir(e.target.parentElement)
            })
            coluna.appendChild(linha);
        }

        table.appendChild(coluna);
    }    
}

tabulacao(containerGame)