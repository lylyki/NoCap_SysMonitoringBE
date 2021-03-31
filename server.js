const express = require("express");
const si = require('systeminformation');
const psList = require("ps-list");
// создаем объект приложения
const app = express();

app.use(function (req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
})

app.get("/", (req,res) => {
    res.send("stroka");
})
app.get("/getStats", async(req, res) => {
   const processes = await psList();
   const FL = await si.fullLoad();
   const Mem = await si.mem();
   const Network = await si.networkStats();
   const OS = await si.osInfo();
    res.json({
        processes: processes,
        cpuLoad: FL,
        totalMem: Mem.total,
        usedMem: Mem.used,
        networkSpeed: Network,
        OS: OS
    })
})

app.listen(8000);