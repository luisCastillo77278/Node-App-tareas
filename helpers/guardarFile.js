const fs = require('fs');

// variable global
const archivo = './db/data.json';

const guardarDB = (data) => {


    fs.writeFileSync(archivo, JSON.stringify(data));
};

const leertDB = () => {
    if (!fs.existsSync(archivo)) {
        return null;
    }


    const info = fs.readFileSync(archivo, { encoding: 'utf-8' });
    console.log(info);

    return JSON.parse(info);
};


module.exports = {
    guardarDB,
    leertDB
};