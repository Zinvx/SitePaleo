var express = require('express')
var router = express.Router()
const {MongoClient} = require("mongodb");
const crypto = require("crypto");
const client = new MongoClient("mongodb+srv://ziongabriel:2qsMLvimx3OqxhZo@cluster0.2spxoha.mongodb.net/?retryWrites=true&w=majority")

const getHashedPassword = (password) => {
    const sha256 = crypto.createHash("sha256");
    const hash = sha256.update(password).digest("base64");
    return hash;
  };
  

  router.get("/", function (req, res, next) {
    const user = global.authTokens[req.cookies["AuthToken"]];
  
    res.render("register", {
      user,
    });
  });
  
  router.post("/", (req, res) => {
    const { email, username, password, confirmPassword } = req.body;
  
    const user = global.authTokens[req.cookies["AuthToken"]];
  
    if (
      password === confirmPassword ||
      username !== "" ||
      email !== "" ||
      password !== "" ||
      confirmPassword !== ""
    ) {
      checkUser(client, email).then(async (checked) => {
        if (checked) {
          res.render("register", {
            reg: "Usuário existente",
            user,
          });
        } else {
          const hashedPassword = getHashedPassword(password);
  
          await register(client, email, username, hashedPassword);
  
          res.render("login", {
            log: "Cadastro finalizado",
            user,
          });
        }
      });
    } else {
      res.render("register", {
        user,
      });
    }
  });
  
  async function register(client, email, username, hashedPassword) {
    try {
      await client.connect();
      await client.db("auth").collection("users").insertOne({
        username: username,
        email: email,
        password: hashedPassword,
        verified: false,
      });
      console.log(`Novo usuário`);
    } finally {
      await client.close();
    }
  }
  
  async function checkUser(client, email) {
    try {
      await client.connect();
      const result = await client.db("auth").collection("users").findOne({
        email: email,
      });
      if (result !== null) {
        console.log("email existente");
        return true;
      } else {
        console.log("email inexistente");
        return false;
      }
    } finally {
      await client.close();
    }
  }
  
  module.exports = router;