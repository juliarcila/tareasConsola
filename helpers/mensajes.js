

require('colors');


const mostrarMenu = () => {

    const promesa = new Promise( resolve => {
        console.clear();
        console.log("======================================".red);
        console.log("Seleccione una opción".rainbow);
        console.log("======================================\n".red);

        console.log(`${ "1.".red } Crear Tarea`);
        console.log(`${ "2.".red } Listar Tareas`);
        console.log(`${ "3.".red } Listar Tareas Completadas`);
        console.log(`${ "4.".red } Listar Tareas Pendientes`);
        console.log(`${ "5.".red } Completar Tarea(s)`);
        console.log(`${ "6.".red } Borrar Tarea(s)`);
        console.log(`${ "0.".red } Salir\n`);

        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        readline.question('Ingrese una opción ', (opcion) => {
            readline.close();
            resolve(opcion);
        })
    });

    return promesa;
};


const pausa = () => {

    return new Promise( resolve => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout,
        });
    
        readline.question(`Presione ${ "ENTER".red } para continuar `, () => {
            readline.close();
            resolve();
        });
    });
};

module.exports = {
    mostrarMenu,
    pausa
};