let dataA;
let dataArr;
let dataB = []; 
let aSize;
let countt = 0;
let res = [];
function LesGo(){
    dataA = window.Array(data);
    dataA = dataA[0];
    dataArr = window.Array(arrSIZE);
    if(dataA.length == (np1*mp1 + np2*mp2 + 4)){
        console.log(dataA);
        console.log(np1*mp1 + np2*mp2 + 5);
        dataB = dataA;
        aSize = dataArr[0];
        dataB[dataA.length] = 'null';
        let oldBut = document.getElementById("solutionbut");
        oldBut.setAttribute("style", "display:none");
        Endfunc();
    }
    else{
        console.log(dataA.length);
        console.log(np1*mp1 + np2*mp2 + 4);
        alert("Введите все параметры перед нажатием на кнопку!");
    }        
}

function fillResArr(){
    let matres = document.querySelector('#matrixres');
    for(let i = 0; i < arrRES.length; i++){
        helpArr = arrRES[i].split(' ');
        helpArr = helpArr.slice(0, mp3);
        splitArr = splitArr.concat(helpArr);
    }
    createResTable(matres, np3, mp3);
}

function createResTable(parent, row, col){
        let table = document.createElement('table');
        table.setAttribute("id", "restable");

        for (let i = 0; i < row; i++ )
        {
            let tr = document.createElement('tr');
            for (let j = 0; j < col; j++)
            {
                let td = document.createElement('td');
                td.innerHTML = splitArr[countO];
                countO++;
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }
        parent.appendChild(table);
    data = [];
    let value = true;
    let RelBtn = document.createElement('button');
    RelBtn.setAttribute("id", "refreshbut");
    RelBtn.setAttribute("onClick", "location.reload();");
    let textInBtn = document.createTextNode('Очистить');
    RelBtn.appendChild(textInBtn);//добавляем текст в кнопку
    if(value){//в зависимости от условия добавляем кнопку в документ
        document.body.appendChild(RelBtn);
    } 
}
