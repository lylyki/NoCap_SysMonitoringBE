//запсутить папку на линкусе и в cmd написать npm install
//потом npm start
const os = require('os');
// подключение express
const si = require('systeminformation');
const psList = require('ps-list');
const express = require("express");
// создаем объект приложения
const app = express();
/* (async () => {
    console.log(await psList());
    //=> [{pid: 3213, name: 'node', cmd: 'node test.js', ppid: 1, uid: 501, cpu: 0.1, memory: 1.5}, …]
})(); */
// определяем обработчик для маршрута "/"
app.get("/", async(request, response)=>{
    const proclist = await psList();
    // отправляем ответ
    response.send(`Processes: ${proclist}<br>os type:  ${os.type()}<br>${os.platform()}<br>1: ${os.arch()}<br>2: ${os.cpus()}<br>3: ${os.endianness()}<br>4: ${os.freemem()}<br>6: ${os.homedir()}<br>7: ${os.hostname()}<br>8: ${os.loadavg()}<br>9: ${os.networkInterfaces()}<br>10: ${os.release()}<br>12: ${os.tmpdir()}<br>13: ${os.totalmem()}<br>14: ${os.type()}<br>15: ${os.uptime()}<br>16: ${os.userInfo()}<br>17: ${os.version()}`);
	
}); 

app.set("view engine", "hbs");
 
app.use("/contact", async(request, response)=>{
   const CL = await si.currentLoad();
   const FL = await si.fullLoad();
   const Mem = await si.mem();
   console.log(Mem);
    const proclist = await psList();
    //console.log(proclist)
    response.render("contact.hbs" , {
        proc: proclist,
        load: FL,
        mem: Mem
       //{ pid: 0, ppid: 0, name: '[System Process]' },
    });
});

// начинаем прослушивать подключения на 3000 порту
app.listen(8000);