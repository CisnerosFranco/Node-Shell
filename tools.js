const fs = require('fs');
const path = require('path');
const dir = 'Docs';

const tools = {
    fileExists: (file) => {
        let documents = fs.readdirSync(dir);
        return documents.indexOf(file) != -1;
    },
    readFile: (filename) => {
        let url = path.join(dir, filename);
        return fs.readFileSync(url, 'UTF-8');
    },

    readDirectory: () => {
        let ret = `
                    ===============================
                    YOURS DOCUMENTS
                    ===============================`;
        let documents = fs.readdirSync(dir, 'utf-8');
        documents.forEach(elem => {
            ret += '\n\t\t    > ' + elem;
        })
        return ret;
    },

    writeFile: (filename, content) => {
        let url = path.join(dir, filename);
        return fs.writeFileSync(url, content);
    },

    appendData: (filename, content) => {
        let url = path.join(dir, filename);
        fs.appendFileSync(url, content);
    },
    deleteFile: (filename) => {
        let url = path.join(dir, filename);
        fs.unlinkSync(url);
    }

}

module.exports = tools;








