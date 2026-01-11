const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(express.static("public"));

function gerarSenha(tamanho = 10){
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%";
    let senha = "";
    for(let i=0;i<tamanho;i++){
        senha += chars[Math.floor(Math.random()*chars.length)];
    }
    return senha;
}

app.post("/enviar", async (req,res)=>{
    const { email } = req.body;
    const senha = gerarSenha(10);

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "joaoprior61@gmail.com",
            pass: "hgmopyeckoxcupdf"
        }
    });

    try{
        await transporter.sendMail({
            from: "joaoprior61@gmail.com",
            to: email,
            subject: "Sua senha de acesso",
            text: `Olá! Sua senha é: ${senha}`
        });

        res.json({mensagem: "Senha enviada com sucesso!"});
    }catch(err){
        console.error(err);
        res.json({mensagem: "Erro ao enviar email"});
    }
});

app.listen(3000, ()=>{
    console.log("Servidor rodando em http://localhost:3000");
});
