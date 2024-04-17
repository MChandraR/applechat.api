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
    const ress = (await sql`SELECT*FROM users;`).rows;
    res.send({
        "message" : ress.rows
    });
});

express.post("/login",async (req,res)=>{
    try{
        const result = await sql`SELECT*FROM users`;
        if(result.length > 0){
            
        }else{
            res.send({
                "status" : "error",
                "message" : "username atau password salah !"
            });
        }
    }catch(e){
        res.send({
            "status" : "error",
            "message" : e
        });
    }
});

express.post("/register",async (req,res)=>{
    try{
        const user_id = (await sql`SELECT SUBSTR(user_id,2) AS user_id FROM users ORDER BY user_id DESC LIMIT 1`).rows;
        let newID = "00000000000" + (parseInt.user_id);
    }catch(e){

    }
});


