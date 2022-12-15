const NodeMediaServer = require('node-media-server');
const express = require("express");
const { PrismaClient } = require('@prisma/client');

const app = express();
const config = {
     rtmp: {
          port: 1935,
          chunk_size: 60000,
          gop_cache: true,
          ping: 30,
          ping_timeout: 60
     },
     http: {
          port: 8000,
          allow_origin: '*'
     }
};

var nms = new NodeMediaServer(config)


const { live } = new PrismaClient;
app.get("/get-live-stream-list", async (req, res) => {
    await live.findFirst({
          where: {
               status: "active"
          }
     })
     .then((data)=>{
          const resData = {
               meta:{
                    success:true,
                    message:"Fetch Success!",
                    devMessage:""
               },
               body:data
          }
          res.json(resData);
     })
});


// PORT
const PORT = 9090;

app.listen(PORT, () => {
     nms.run();
     console.log(`Server is running on PORT: ${PORT}`);
});

