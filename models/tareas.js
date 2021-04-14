// const Tarea = require('./tarea.js');

const Tarea = require("./tarea");

class Tareas {

    constructor() {
        this.__listado = {};
    }

    get listadoArr() {
        const litado = [];

        Object.keys(this.__listado).forEach((key) => {
            const tarea = this.__listado[key];
            litado.push(tarea);
        });
        return litado;
    }

    cargarTareasFromArr(tareas = []) {
        tareas.forEach((tarea) => {
            this.__listado[tarea.id] = tarea;

        });
    }

    borrarTarea( id = ''){
        if(this.__listado[id]){
            delete this.__listado[id];
        }
    }

    toggleCompletar(  ids = [] ){
        
        // recivo todos los ids
        // barremos y determinamos cuales estan en el array
        // si estan su valor lo ponemos en true y los que no en false
        ids.forEach( (id)=>{
            const tarea = this.__listado[id];
            if ( !tarea.completadoEn ){
                tarea.completadoEn = new Date().toISOString();
            }
        });
        
        this.listadoArr.forEach( (tarea)=>{

            if(!ids.includes(tarea.id)){
                const tareas = this.__listado[tarea.id];
                tareas.completadoEn = null;
            }
        })
    }

    crearTarea(desc) {
        const tarea = new Tarea(desc);
        this.__listado[tarea.id] = tarea;
    }

    listadoCompleto() {
        // this.listadoArr.forEach pudimos usar esta otra manera
        Object.values(this.__listado).forEach((tarea, index) => {
            const i = `${index + 1}`.green;
            const estado = (tarea.completadoEn) ?
                `completada`.green : `pendiente`.red;
            console.log(`${i.green} ${ tarea.desc } ${'::'.blue} ${estado}`);
        });
    }

    listarPendientesCompletadas(pendientes = true) {
        let i = 0;
        this.listadoArr.forEach( (tarea) => {
            if (pendientes){
                if (tarea.completadoEn){
                    i += 1;
                    console.log(`${(i + '.').green} ${ tarea.desc } ${'::'.blue} ${tarea.completadoEn.green}`);  
                }  
            } else{
                if (!tarea.completadoEn){
                    i += 1;
                    console.log(`${(i + '.').green} ${ tarea.desc } ${'::'.blue} ${`pendiente`.red}`);  
                }
            }
            
        });
    }
}

module.exports = Tareas;