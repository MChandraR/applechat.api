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
    const resss = (await sql`SELECT SUBSTR(user_id,2) AS user_id FROM users ORDER BY user_id DESC LIMIT 1`).rows;
    res.send({
        "message" : ress,
        "data" : resss
    });
});

express.post("/login",async (req,res)=>{
    try{
        const body = req.body;
        const result = (await sql`SELECT*FROM users WHERE username=${body.username} AND password=${body.password} LIMIT 1`);
        if(result.rowCount){
            res.send({
                "status" : result.rowCount ? "sukses" : "gagal",
                "message" : result.rowCount ? "Berhasil login !" : "Username atau password salah !",
                "user_id" : result.user_id,
                "email" : result.email,
                "username" : result.username
            });
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
        const body = req.body;
        const user_id = (await sql`SELECT SUBSTR(user_id,2) AS user_id FROM users ORDER BY user_id DESC LIMIT 1`).rows;
        let userID = user_id.length ? user_id[0].user_id : "0";
        let newID = ("00000000000" + (parseInt(userID) + 1)).slice(-9);
        newID = "U" + newID;
        const regist = await sql`INSERT INTO users VALUES(${newID}, ${body.username}, ${body.password}, ${body.email}, user);`;
        res.send({
            "id " : newID,
            "message" : regist
        });
    }catch(e){
        res.send({
            "status" : "error",
            "message" : e
        });
    }
});


