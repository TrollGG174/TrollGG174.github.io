let a = prompt("Введите коэффициент при x^2",);
let b = prompt("Введите коэффициент при x",);
let c = prompt("Введите коэффициент при числе",); 
alert("Дискриминант " + (b*b-4*a*c));
if((b*b-4*a*c) < 0){
	alert("Первый корень уравнения " + -b/ 2*a + " + " + ((Math.sqrt(Math.abs(b*b-4*a*c))/ 2*a + "i")));
	alert("Второй корень уравнения " + -b/ 2*a + " - " + ((Math.sqrt(Math.abs(b*b-4*a*c))/ 2*a + "i")));
}
else if((b*b-4*a*c) == 0){
	alert("Корень уравнения " + (-b)/ 2*a);
}
else{
	alert("Первый корень уравнения " + (-b + Math.sqrt(b*b-4*a*c))/ 2*a);
	alert("Второй корень уравнения " + (-b - Math.sqrt(b*b-4*a*c))/ 2*a);
}