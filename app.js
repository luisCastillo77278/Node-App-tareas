// Importaciones de terceros
require('colors');

const { guardarDB, leertDB } = require('./helpers/guardarFile');
// Importaciones nuestras
const {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    listadoTareasCompletar
} = require('./helpers/inquirer');
const Tareas = require('./models/tareas');


const main = async() => {
    let opcion = '';
    const tareas = new Tareas();

    const tareasDB = leertDB();

    if (tareasDB.length > 0) {
        tareas.cargarTareasFromArr(tareasDB);
    }

    do {
        opcion = await inquirerMenu();
        switch (opcion) {
            case '1':
                const desc = await leerInput('Ingrese la tarea -> ');
                tareas.crearTarea(desc);
                break;
            case '2':
                tareas.listadoCompleto();
                break;
            case '3':
                tareas.listarPendientesCompletadas(true);
                break;
            case '4':
                tareas.listarPendientesCompletadas(false);
                break;
            case '5':
                const ids = await listadoTareasCompletar( tareas.listadoArr);
                console.log( ids );
                tareas.toggleCompletar( ids );
                break;
            case '6':
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if ( id !== '0'){
                    const ok = await confirmar(`¿Esta seguro?`);
                    if ( ok ){
                        tareas.borrarTarea( id );
                        console.log('Tarea borrada'.yellow);
                    }
                }
                break;
            default:
                break;
        }

        guardarDB(tareas.listadoArr);

        await pausa();

    }
    while (opcion !== '0');

}

main();