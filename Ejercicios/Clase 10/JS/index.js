//console.log("Hola");

//Var

/*if (true) {
  var edad = 25;
}
console.log(edad);

//let
if (true) {
    let puntos = 100;
    console.log(puntos);
}
console.log(puntos); // This will throw an error because 'puntos' is not defined outside the block

//const
const PI = 3.14159;
PI = 3.14; // This will throw an error because 'PI' is a constant and cannot be reassigned

const user = {id:1};
user.id = 2; // This is allowed because we are modifying the property of the object, not reassigning the constant itself
console.log(user.id); // This will print 2


//v8
const v8 = require('v8');

miVariable = {
    nombre: "Jose",
    version: 2026
} 

const tamano = v8.serialize(miVariable).length; 
console.log(`El tamano de la variable es: ${tamano} bytes`);
*/

//readline

/*
const v8 = require('v8');

const readline = require('readline/promises');
const { stdin: input, stdout: output } = require('process');

const rl =  readline.createInterface({ input, output });

async function iniciar() {
    const nombre = await rl.question('Digite su nombre: ');
    if (validarDatos(nombre)) {
        console.log(`Nombre digitado es: ${nombre}`);
    }else {
        console.log("El nombre solo debe contener letras");
    }
    rl.close();
}

function validarDatos(nombre) {
    const expresion = /^[a-zA-Z]+$/; // Solo permite letras
    const nombreValidado = expresion.test(nombre);
    if (nombreValidado) {
        return true;
    }else {
        return false;
    }
}

iniciar();
*/

/*

const readline = require('readline/promises');
const { stdin: input, stdout: output } = require('process');

const rl = readline.createInterface({ input, output });

async function iniciar() {
    const edad = parseInt(await rl.question('Digite su edad: '));

    let estado;

    if (edad < 13) {
        estado = "Niño";
    } else if (edad < 18) {
        estado = "Joven";
    } else {
        estado = "Adulto";
    }

    console.log(`Estado: ${estado}`);

    rl.close();
}

iniciar();

*/

/*
let edad = 85;

let estado = edad < 13 ? "Niño" : edad < 18 ? "Joven" : "Adulto";

console.log(Categoria);
*/
/*
case 1:
            console.log("Enero");
            break;
        case 2:
            console.log("Febrero");
            break;
        case 3:
            console.log("Marzo");
            break;
        case 4:
            console.log("Abril");
            break;
        case 5:
            console.log("Mayo");
            break;
        case 6:
            console.log("Junio");
            break;
        case 7:
            console.log("Julio");
            break;
        case 8:
            console.log("Agosto");
            break;
        case 9:
            console.log("Septiembre");
            break;
        case 10:
            console.log("Octubre");
            break;
        case 11:
            console.log("Noviembre");
            break;
        case 12:
            console.log("Diciembre");
            break;
        default:
            console.log("Mes no válido");

*/