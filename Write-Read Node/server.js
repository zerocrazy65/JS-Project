const fs = require('fs');
const http = require('http');

const hostname = 'localhost';
const port = 3001;
var onserver;

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(onserver);
    res.end(); 
  });

let readMsg = () => {
    return new Promise((resolve,reject) => {
        fs.readFile('cloth1.json','utf8', (err, data) => {
            if (err) 
                reject(err);
            else
                onserver = data;
                resolve(data); 
        });
    })
}

let editJson = (data) => { 
    const stock = {
        item1: 2,
        item2: 3,
        item3: 5,
        item4: 2,
        item5: 5,
        item6: 8,
        item7: 1,
        item8: 9,
        item9: 0
    }
    var jsonData = JSON.parse(data);
    var keys = Object.keys(jsonData);
    var writeData;
    return new Promise((resolve, reject) => {
        for(let i = 0; i < keys.length; i++){
            jsonData[keys[i]].stock = stock[keys[i]];
        }
        writeData = JSON.stringify(jsonData);
        resolve(writeData);
    })
}

let writeMsg = (JSONUpdate) =>{
    return new Promise((resolve, reject) => {
        fs.writeFile('new_cloth.json', JSONUpdate , (err) => {
            if (err) 
                reject(err);
            else
                resolve("saved!")
        });
    })
}

readMsg().then(editJson).then(writeMsg).then((out) => console.log(out));;

server.listen(port, hostname, () => {
console.log(`Server running at   http://${hostname}:${port}/`);
});