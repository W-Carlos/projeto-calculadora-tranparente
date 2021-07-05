'use strict';

/*Pegando os numeros para exibir no display*/
const display = document.getElementById('display')
const numeros = document.querySelectorAll('[id*=tecla]')//vai pegar todos os elementos que tenham tecla no id.
const operadores = document.querySelectorAll('[id*=operador]')

let novoNumero = true
let operador;
let numeroAnterior;

const operacoaPendente = () => operador !== undefined

const calcular = () => {
    if(operacoaPendente()){
        const numeroAtual = parseFloat(display.textContent.replace(',','.'))//replace faz uma troca
        novoNumero = true
        const resultado = eval (`${numeroAnterior}${operador}${numeroAtual}`)
        atualizarDisplay(resultado)

        /*if (operador == '+') {
            atualizarDisplay(numeroAnterior + numeroAtual)
        } else if (operador == '-') {
            atualizarDisplay(numeroAnterior - numeroAtual)
        } else if (operador == '*') {
            atualizarDisplay(numeroAnterior * numeroAtual)
        } else if (operador == '/') {
            atualizarDisplay(numeroAnterior / numeroAtual)
        }*/
    }
}

const atualizarDisplay = (texto) => {
    if (novoNumero) {
        display.textContent = texto.toLocaleString('BR')//toLocaleString: Vai trazer o simbolo de decimal usado no Brasil
        novoNumero = false;
    } else {
        display.textContent += texto.toLocaleString('BR')
    } 
}

//Metodo para mandar os numeros para o display
const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent)
//Cria um evento para cada um dos numeros
numeros.forEach (numero => 
        numero.addEventListener('click', inserirNumero)
    )

//Inserindo os operadores
const selecionarOperador = (evento) => {
    if(!novoNumero) {
        calcular()
        novoNumero = true
        operador = evento.target.textContent
        numeroAnterior = parseFloat(display.textContent.replace(',','.')) 
    }
    
}
operadores.forEach (operador => operador.addEventListener('click', selecionarOperador))

/*Botão de igual*/
const ativarIgual = () => {
    calcular()
    operador = undefined
}
document.getElementById('igual').addEventListener('click', ativarIgual)

/*Botão apagar display*/
const limparDisplay = () => display.textContent = ''
document.getElementById('limparDisplay').addEventListener('click', limparDisplay)

/*Botão para limpar calculo */
const limparCalculo = () => {
    limparDisplay()
    operador = undefined
    novoNumero = true
    numeroAnterior = undefined
}
document.getElementById('limparCalculo').addEventListener('click', limparCalculo)

/*Botão backspace */
//slice irá remover ultimo numero
const removerUltimoNumero = () => display.textContent = display.textContent.slice(0, -1)
document.getElementById('backspace').addEventListener('click', removerUltimoNumero)

/*Botão inverter sinal */
//* -1 irá inverter o sinal.
const inverterSinal = () => {
    novoNumero = true
    atualizarDisplay(display.textContent * -1)
}
document.getElementById('inverter').addEventListener('click', inverterSinal)

/*Botão decimal */

const existeDecimal = () => display.textContent.indexOf(',') !== -1
const existeValor = () => display.textContent.length > 0
const inserirDecimal = () => {
    if(!existeDecimal()){
        //vai colocar 0 antes da virgula caso não tenha número
        if(existeValor()){
            atualizarDisplay(',')
        } else {
            atualizarDisplay('0,')
        }         
    }
}
document.getElementById('decimal').addEventListener('click', inserirDecimal)

/*Fazendo um mapa do teclado */
const mapaTeclado = {
    '0'         : 'tecla0',
    '1'         : 'tecla1',
    '2'         : 'tecla2',
    '3'         : 'tecla3',
    '4'         : 'tecla4',
    '5'         : 'tecla5',
    '6'         : 'tecla6',
    '7'         : 'tecla7',
    '8'         : 'tecla8',
    '9'         : 'tecla9',
    '/'         : 'operadorDividir',
    '*'         : 'operadorMultiplicar',
    '-'         : 'operadorSubtrair',
    '+'         : 'operadorAdicionar',
    '='         : 'igual',
    'Enter'     : 'igual',
    'Backspace' : 'backspace',
    'c'         : 'limparDisplay',
    'Escape'    : 'limparCalculo',
    ','         : 'decimal'
}

const mapearTeclado = (evento) => {
    const tecla = evento.key

    //Vai verificar se o objeto mapaTeclado tem a precionada
    const teclaPermitida = () => Object.keys(mapaTeclado).indexOf(tecla) !== -1
    if(teclaPermitida())

    document.getElementById(mapaTeclado[tecla]).click()
   
}
document.addEventListener('keydown', mapearTeclado)