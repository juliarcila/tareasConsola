import fs from 'fs';

const path = './db/datos.json';

const guardarArchivo = ( data ) => {
    fs.writeFileSync( path, JSON.stringify(data));
};

const leerDB = () => {
    if( !fs.existsSync( path ) ){
        return null;
    }

    const info = fs.readFileSync(path, { encoding: 'utf-8' });
    return JSON.parse(info);
}

export { guardarArchivo,
leerDB };