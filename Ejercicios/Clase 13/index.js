/*
const persona = {nombre: "pepe", edad: 50};
const { edad:anos = 18} = persona;
console.log(anos)

function sumarTodo(... numeros){
    return numeros.reduce((acum,n)=> acum + n, 0);
}

console.log(sumarTodo(1,2,3));
console.log(sumarTodo(5,10,15,20));

--const original = {nombre: "Equipo"}

const respuesta = {data: {usuario: null}};
const nombre = respuesta?.data?.usuario?.nombre;

cosnt descuento = 0;

conosle.log(descuento || 10) ;
console.log(descuento ?? 10);

const nombre = "";
conosle.log(nombre || "invitado") ;
console.log(nombre ?? "invitado");



import {sumar, restar} from "./operadores.js";

console.log(sumar(5,5));
console.log(restar(5,3));



import {Perro} from "./Perro.js";

const perro = new Perro ("Firulais", "Mamifero", "Golden", 7);

console.log(perro.ladrar());
console.log(perro.comer());
*/

class CuentaBancaria {
    constructor(saldoInicial) {
        this._saldo = saldoInicial;

    }

    get saldo() {
        return this._saldo;

    }
    set saldo (valor){
        if( valor < 0) throw new Error("Saldo no puede ser negativo");
        this._saldo = valor;
    }
}

const cuenta = new CuentaBancaria(1000);
cuenta.saldo = saldo ;
console.log(cuenta.saldo);