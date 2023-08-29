import { v4 as uuidv4 } from 'uuid';

class Tarea {
    id = '';
    desc = '';
    completadoen = null;

    constructor( desc ){
        this.desc = desc;
        this.id = uuidv4();
        this.completadoen = null;
    }
}

export { Tarea };