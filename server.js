const express = require("express")();
const { json } = require("express");
const {createServer} = require("http");
const {sql} = require("@vercel/postgres");


express.use(json());
const server = createServer(express);

server.listen(3000, ()=>{
    console.log("Ready!");
});

express.get("/test",async (req,res)=>{
    const ress = sql`SELECT*FROM data;`;
    res.send({
        "message" : ress
    });
});


