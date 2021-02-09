//alert("JS");
//var res = prompt("Main window","default value");

/*
let	<name>    ->
var <name>	  ->
const <name>  ->
<name>		  ->
*/
//for(const i = 0; i<5; i++){console.log(i)}
var a = prompt("Введите коэффициент при x^2",);
var b = prompt("Введите коэффициент при x",);
var c = prompt("Введите коэффициент при числе",); 
alert("Дискриминант " + (b*b-4*a*c));
if((b*b-4*a*c) < 0){
	alert("Первый корень уравнения " + -b/ 2*a + " + " + ((Math.sqrt(Math.abs(b*b-4*a*c))/ 2*a + "i")));
	alert("Второй корень уравнения " + -b/ 2*a + " - " + ((Math.sqrt(Math.abs(b*b-4*a*c))/ 2*a + "i")));
}
else{
	alert("Первый корень уравнения " + (-b + Math.sqrt(b*b-4*a*c))/ 2*a);
	alert("Второй корень уравнения " + (-b - Math.sqrt(b*b-4*a*c))/ 2*a);
}

//analog-clock js добавить время последовательно за секундной стрелкой (ДЗ)
//https://github.com/YannMjl/Analog-Clock-JS
//создать свой гитхаб githib.io создать