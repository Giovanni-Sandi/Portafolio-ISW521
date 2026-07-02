/*
const numeros =[40,34,5,8,100,6];

console.log(numeros.sort((a,b) => a - b));


//imperativo
const dobleImp = [];
for (let i = 0; i < numeros.length; i++) {
dobleImp.push(numeros[i]*2);
}

//declarativo
const dobleDec = numeros.map(n => n*2);

Los que mutan son push, splice y pop, y los que no map y spread

const estudiantes = [
    {nombre: "Ana", carnet: 2024001},
    {nombre: "Luis", carnet: 2024002},
];


const nombres = estudiantes.map(e => `${e.nombre} (${e.carnet})`.toUpperCase());
console.log(nombres);

const estudiantes = [
{ nombre: "Ana", promedio: 85),
 {nombre: "Luis", promedio: 67},
 {nombre: "Sara", promedio: 91}

];

const aprobados = estudiantes.filter(e => e.promedio >= 70);
console.log(aprobados);

*/