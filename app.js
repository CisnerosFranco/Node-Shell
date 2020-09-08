const readline = require('readline');
const tools = require('./tools');
const { Dir } = require('fs');

const options = `    Comandos:  q = salir,  sa = guardar como
    ------------------------------------------------------------`

const pantalla = `
                =======================\n
                Editor de texto.\n
                =======================\n

                Elige una opción ?\n
                1 Crear nuevo documento\n
                2 Abrir documento\n
                3 Cerrar editor\n
                ========================\n>`




let rl = readline.createInterface(process.stdin, process.stdout);
main();

function main() {
    clearScreen();
    rl.question(pantalla, resp => {
        console.log('> selecionaste: ' + resp)
        switch (resp.trim()) {
            case '1':
                create();
                break;

            case '2':
                showDir();
                break;

            case '3':
                rl.close();
                break;

            default:
                main();
        }
    })
}


function create() {
    clearScreen();
    let file = '';
    console.log(options);
    rl.on('line', input => {
        switch (input.trim()) {
            case 'sa':
                saveAs(file);
                break;

            case 'q':
                rl.removeAllListeners('line'); //removemos el listener de line 
                main();
                break;

            default:
                file += `${input.trim()}\n`; //guardamos lo escrito por consola
        }
    })
}

function showDir(message) {
    clearScreen();
    if(message) {
        console.log('\n' + message);
    }
    console.log(`\n\tnombre del archivo para escribir ó 'b' para volver\n`)
    console.log(tools.readDirectory() + '\n\t');
    rl.on('line', input => {
        let file = input.trim();
        rl.removeAllListeners('line');
        if (file === 'b') {
            main();
        }
        else {
            open(file)
        }
    })
}

function open(file) {
    
    clearScreen();
    let content = '';
    if (!tools.fileExists(file)) {
        showDir('\t** no se encontro el archivo indicado: ' + file)
    }
    else {
        console.log(`\t\n s = guardar,  d = eliminar archivo,  b = volver\n`)
        console.log(tools.readFile(file))

        rl.on('line', input => {
            if (input.trim().toLocaleLowerCase() === 's') {
                save(file, content)
            }
            if (input.trim().toLocaleLowerCase() === 'd') {
                rl.removeAllListeners('line');
                deleteFile(file);
            }
            else if (input.trim().toLocaleLowerCase() === 'b') {
                rl.removeAllListeners('line');
                showDir();
            }
            else {
                content += input + '\n';
            }
        })
    }


}

function clearScreen() {
    process.stdout.write('\033c');
}

function deleteFile(file) {
    tools.deleteFile(file);
    showDir('\t** archivo eliminado exitosamente');
}

function save(file, data) {
    tools.appendData(file, data)
    rl.removeAllListeners('line');
    showDir('\t** archivo guardado exitosamente');
}

function saveAs(data, mssge) {
    if (mssge) {
        console.log(mssge);
    }
    rl.question('**file name: ', name => {
        let file = name.trim();
        if (tools.fileExists(file)) {
            saveAs(data, '\t ya existe un archivo con ese nombre');
        }
        else {
            tools.writeFile(file, data);
            rl.removeAllListeners('line');
            main();
        }
    })

}