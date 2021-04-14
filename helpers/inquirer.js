// https://www.youtube.com/playlist?list=PL_WGMLcL4jzVY1y-SutA3N_PCNCAG7Y46
const inquirer = require('inquirer');
require('colors');

const preguntas = [{
    type: 'list',
    name: 'opcion',
    message: '¿Que desea hace?',
    choices: [{
        value: '1',
        name: `${'1.'.green } Crear tarea`
    }, {
        value: '2',
        name: `${'2.'.green} Listar tareas`
    }, {
        value: '3',
        name: `${'3.'.green} Listar tareas completas`
    }, {
        value: '4',
        name: `${'4.'.green} Listar tareas pendientes`
    }, {
        value: '5',
        name: `${'5.'.green} Completar tarea(s)`
    }, {
        value: '6',
        name: `${'6.'.green} Borrar tarea`
    }, {
        value: '0',
        name: `${'0.'.green} Salir`
    }]
}];

const inquirerMenu = async() => {
    console.clear();
    console.log('=========================='.green);
    console.log('   Seccione una opción  '.white);
    console.log('==========================\n'.green);

    const { opcion } = await inquirer.prompt(preguntas);
    return opcion;
};

const pausa = async() => {
    const question = [{
        type: 'input',
        name: 'pausa',
        message: `Presione ${ 'ENTER'.green} para continuar`
    }];

    console.log('\n');

    await inquirer.prompt(question);
};

const leerInput = async(message) => {
    const questions = [{
        type: 'input',
        name: 'desc',
        message,
        validate(value) {
            if (value.length === 0) {
                return 'Porfavor ingrese un valor';
            }

            return true;
        }
    }];

    const { desc } = await inquirer.prompt(questions);
    return desc;
};

const listadoTareasBorrar = async(tarea = []) => {
 
    const choices = tarea.map( (t, idx)=>{
        const i = `${idx + 1}.`.green;
        return {
            value: t.id,
            name: `${i} ${t.desc}`
        };
    });

    choices.unshift({
        value: '0',
        name: '0.'.green+' cancelar'
    });

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }

    ]
    const { id } = await inquirer.prompt( preguntas );
    return id;
};

const listadoTareasCompletar = async ( tarea = []) =>{
    
    const choices = tarea.map( (t, idx)=>{
        const i = `${idx + 1}.`.green;
        return {
            value: t.id,
            name: `${i} ${t.desc}`,
            checked: (t.completadoEn)? true : false,
        };
    });

    const preguntas = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices
        }

    ]
    const { ids } = await inquirer.prompt( preguntas );
    return ids;
    // return id;
}

const confirmar = async (message) =>{
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt( question );
    return ok;
};
   


module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    listadoTareasCompletar
};