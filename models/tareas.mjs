import { Tarea } from "./tarea.mjs";
import colors from 'colors';

class Tareas {
    _listado = {};

    get listadoArr(){
        const listado = [];
        Object.keys(this._listado).forEach(key => listado.push( this._listado[key]));

        return listado;
    }

    constructor(){
        this._listado = {};
    }

    llenarListadoBD( tareas = [] ){
        tareas.forEach( tarea => {
            this._listado[ tarea.id ] = tarea;
        });
    };

    crearTarea(desc = ''){
        const tarea = new Tarea(desc);
        this._listado[ tarea.id ] = tarea;
    };

    listadoCompleto(){
        // 1. En verde
        // Completada: Verde
        // Pendiente: Rojo

        // 1. Alma :: Completada | Pendiente
        console.log('\n');
        this.listadoArr.forEach( (tarea, i) => {
            const idx = `${i+1}`.green;
            const mensaje = `\t${idx}. ${ tarea.desc } :: ${ tarea.completadoen !== null ? 'Completada'.green : 'Pendiente'.red }`;

            console.log(mensaje);
        });
        console.log('\n');        
    }

    listadoPendientesCompletadas( completado = true ){
        let contador = 0;
        console.log('\n');
        this.listadoArr.forEach( (tarea) => {
            const estado = ( tarea.completadoen === null ? 'Pendiente'.red : 'Compleado'.green)
            if(completado){
                if(tarea.completadoen){
                    const idx = `${ contador += 1 }`.green;
                    const mensaje = `\t${idx}${'.'.green} ${tarea.desc} :: ${ estado }`;
                    console.log(mensaje);
                }
            }else{
                if(!tarea.completadoen){
                    const idx = `${ contador += 1 }`.green;
                    const mensaje = `\t${idx} ${'.'.green} ${tarea.desc} :: ${ estado }`;
                    console.log(mensaje);
                }
            }
        });
        console.log('\n');
    };

    actualizarEstadoTarea( ids = [] ){
        ids.forEach( id => {
            const tarea = this._listado[id];
            if( !tarea.completadoen ){
                tarea.completadoen = new Date().toISOString();
            }
        });

        this.listadoArr.forEach( tarea => {
            if( !ids.includes( tarea.id ) ){
                this._listado[tarea.id].completadoen = null;
            }
        });
    };

    eliminarTarea( id ){
        if(id){
            delete this._listado[id];
        }
    }
}

export {Tareas};