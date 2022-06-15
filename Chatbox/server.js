var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var http = require('http').Server(app);

var fs = require('fs');

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))


// read from file to user
//ทำให้สมบูรณ์
app.get('/inmsg', async (req, res) => {
  readMsg().then((out)=> res.json(out));
});

//from user, write data to file
//ทำให้สมบูรณ์
app.post('/outmsg', async (req, res) => {
      const outMsg = req.body;
      let msg_read = await readMsg();
      let msg_update = await updateMsg(outMsg,msg_read);
      let msg_write = await writeMsg(msg_update);
      const msg_client = msg_write;
      res.json(msg_client);
})

// read json data from file
//ทำให้สมบูรณ์
const readMsg = () => {
  return new Promise((resolve,reject) => {
      fs.readFile('log.json','utf8',(err,data) =>{
        if(err)
          reject(err);
        else 
          resolve(data);
      });
  })
} 

// update json data
//ทำให้สมบูรณ์
const updateMsg = (new_msg, data1) => {
  return new Promise((resolve,reject) => { 
      var msgData = JSON.parse(data1);
      //java
      var msgArray = msgData.dataMsg;
      msgArray.push(new_msg);
      var msgJson = JSON.stringify(msgData);
      resolve(msgJson);
  });
}

// write json data to file
//ทำให้สมบูรณ์
const writeMsg = (data) => {
  return new Promise((resolve,reject) => {
    fs.writeFile('log.json',data,(err)=>{
      if(err)
        reject(err);
      else
        resolve("saved");
    });
})};

var server = http.listen(3001, () => {
  console.log('server is running on port http://localhost:'+ server.address().port);
});