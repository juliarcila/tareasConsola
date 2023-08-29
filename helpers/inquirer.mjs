import inquirer from 'inquirer';
import colors from 'colors';
const preguntas = [ 
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1.'.green} Crear Tarea`,
            },
            {
                value: '2',
                name: `${'2.'.green} Listar Tareas`,
            },
            {
                value: '3',
                name: `${'3.'.green} Listar Tareas Completadas`,
            },
            {
                value: '4',
                name: `${'4.'.green} Listar Tareas Pendientes`,
            },
            {
                value: '5',
                name: `${'5.'.green} Completar Tarea(s)`,
            },
            {
                value: '6',
                name: `${'6.'.green} Eliminar Tarea(s)`,
            },
            {
                value: '0',
                name: `${'7.'.green} Salir`,
            }
        ]
    }
];

const inquirerMenu = async() => {
    console.clear();
    console.log('==========================='.green);
    console.log('  Seleccione una opcion'.green);
    console.log('===========================\n'.green);

    const { opcion } = await inquirer.prompt(preguntas);
    return opcion;
};

const listadoParaBorrar = async( tareas = [] ) => {
    console.clear();
    console.log('==========================='.green);
    console.log('  Seleccione una opcion'.green);
    console.log('===========================\n'.green);

    const choices = tareas.map( (tarea, i) => {
        const idx = `${ i+1 }`.green;
        return {
            value: tarea.id,
            name: `${idx}. ${tarea.desc}`
        };
    })

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'
    });

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: '¿Que tarea desea borrar?',
            choices,
        }
    ];

    const {id} = await inquirer.prompt(preguntas);
    return id;
};


const pausa = async() => {
    const pregunta = [
        {
            type: 'input',
            name: 'pausa',
            message: `Presione ${ "ENTER".red } para continuar `,
        }
    ];

    await inquirer.prompt(pregunta);
};

const confirmar = async( mensaje ) => {
    const pregunta = [
        {
            type: 'confirm',
            name: 'ok',
            message: mensaje,
        }
    ]

    const ok = await inquirer.prompt(pregunta);
    return ok;
};

const mostrarListadoChecklist = async( tareas = [] ) => {

    const choices = tareas.map( (tarea, i) => {
        const idx = `${ i+1 }`.green;
        return {
            value: tarea.id,
            name: `${ idx } ${ tarea.desc }`,
            checked: (tarea.completadoen) ? true : false
        }
    })

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ];

    const ids = await inquirer.prompt(pregunta);
    return ids;
};


const leerInput = async( mensaje ) => {
    const pregunta = [
        {
            type: 'input',
            name: 'desc',
            message: mensaje,

            validate( value ){
                if(value.length === 0){
                    return 'Por favor ingrese un valor';
                }

                return true;
            }
        }
    ];
    
    const {desc} = await inquirer.prompt( pregunta );
    return desc;
}

export { inquirerMenu, pausa, leerInput, listadoParaBorrar, confirmar, mostrarListadoChecklist };