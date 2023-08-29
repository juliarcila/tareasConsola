import colors from 'colors';
import { inquirerMenu, leerInput, pausa, listadoParaBorrar, confirmar, mostrarListadoChecklist } from './helpers/inquirer.mjs';
import { Tarea } from './models/tarea.mjs';
import { Tareas } from './models/tareas.mjs';
import { guardarArchivo, leerDB } from './helpers/guardarArchivo.mjs';

 
const main = async() => {
    let opt = '';
    const tareas = new Tareas();

    const tareasBD = leerDB();
    
    if(tareasBD){
      tareas.llenarListadoBD(tareasBD);
    }

    do {
      opt =  await inquirerMenu();

      switch ( opt ) {
        case '1': 
          const tarea = await leerInput('Tarea:');
          tareas.crearTarea( tarea );
          break;
        case '2':
          tareas.listadoCompleto();
          break;
        case '3':
          tareas.listadoPendientesCompletadas(true);
          break;
        case '4':
          tareas.listadoPendientesCompletadas(false);
          break;
        case '5':
          const {ids} =  await mostrarListadoChecklist(tareas.listadoArr);
          tareas.actualizarEstadoTarea(ids);
          break;
        case '6': //Listar tareas para borrar (Se pueden hacer utilizando el inquirer)
          const id = await listadoParaBorrar(tareas.listadoArr);
          if(id !== '0'){
            const {ok} = await confirmar('¿Esta seguro?');
            if(ok){
              tareas.eliminarTarea(id);
              console.log('Tarea Borrada'.rainbow);
            }
          }
          break;
      }

      guardarArchivo( tareas.listadoArr );
      
      await pausa();

     
    }while( opt !== '0')
}
 
main();