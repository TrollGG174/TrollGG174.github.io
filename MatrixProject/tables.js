let np1;
let mp1;
let np2;
let mp2;
let np3;
let mp3;
let data = [];
let arrSIZE = [];
let arrRES = [];
let splitArr = [];
let helpArr = [];
let countR = 0;
let countO = 0;
function Complete(){
    let mat1 = document.querySelector('#matrix1');
    let mat2 = document.querySelector('#matrix2');
    let value = true //условие появления кнопки, true - появиться, false - нет 
    let btn = document.createElement('button');//создаём нашу кнопку'
    let oldBut = document.getElementById("mybut");
    btn.setAttribute("id", "solutionbut");
    btn.setAttribute("onClick", "LesGo();");
    let textInBtn = document.createTextNode('Посчитать');//создаем текст для кнопки
    oldBut.setAttribute("style", "display:none");

    btn.appendChild(textInBtn);//добавляем текст в кнопку

    if(value){//в зависимости от условия добавляем кнопку в документ
        document.body.appendChild(btn);
    } 
    np1 = document.Param.n1.value;
    mp1 = document.Param.m1.value;
    np2 = document.Param.n2.value;
    mp2 = document.Param.m2.value;
    if(np1 > 20 || mp1 > 20 || np2 > 20 || mp2 > 20){
        alert('Максимальное значение: 20');
        if(np1 > 20)
            np1 = 20;
        if(mp1 > 20)
            mp1 = 20;
        if(np2 > 20)
            np2 = 20;
        if(mp2 > 20)
            mp2 = 20;
    }

    if(np1 < 1 || mp1 < 1 || np2 < 1 || mp2 < 1){
        alert('Минимальное значение: 1');
        if(np1 < 1)
            np1 = 1;
        if(mp1 < 1)
            mp1 = 1;
        if(np2 < 1)
            np2 = 1;
        if(mp2 < 1)
            mp2 = 1;
    }
    arrSIZE[0] = np1;
    arrSIZE[1] = mp1;
    arrSIZE[2] = np2;
    arrSIZE[3] = mp2;
    data[0] = np1;
    data[1] = mp1;
    data[2] = np2;
    data[3] = mp2;
    if (document.getElementById('readytable')) {
        $('table').remove();
    }

    if(mp1 == np2){
        np3 = np1;
        mp3 = mp2;
        createTable(mat1, np1, mp1);
        createTable(mat2, np2, mp2);
    }
    else
        alert("Чумба одумайся, ты хочешь посчитать кривую матрицу!!!");
    
    function createTable(parent, row, col)
    {
        let table = document.createElement('table');
        table.setAttribute("id", "readytable");

        for (let i = 0; i < row; i++ )
        {
            let tr = document.createElement('tr');
            for (let j = 0; j < col; j++)
            {
                let input = document.createElement('input');
                input.className = "tabledata";
                input.type = "number";
                tr.appendChild(input);
            }
            table.appendChild(tr);
        }
        parent.appendChild(table);
    }

    let intab = document.getElementsByClassName('tabledata');
    let mas1 = [];
    let mas2 = [];
    for (let i = 0; i < intab.length; i++)
    {
        intab[i].addEventListener('blur', function func(){
            let input = this;
            data[i + 4] = intab[i].value;
        });
    }
}