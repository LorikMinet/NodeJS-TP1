const express = require('express')
const app = express()
const port = 3000

const requestCount = {}

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}]: ${req.path}`);
  next();
});

app.use((req, res, next) => {
  requestCount[req.path] = (requestCount[req.path] || 0) + 1;
  next();
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/welcome', (req, res) => {
  res.send("Bienvenue sur le TP 1 du cours d'architecture logicielle")
})

app.get('/secret', (req, res) => {
  res.status(401).send("Vous ne possédez pas les droits pour accéder à ma page secrète")
})

app.get('/error', (req, res) => {
  res.status(500).json({message: "Erreur de erreur"})
})

app.get('/img', (req, res) => {
  res.sendFile(__dirname + "/img/image.jpg")
})

app.get('/redirectMe', (req, res) => {
  res.redirect("https://www.iut-littoral.fr/")
})

app.get('/users/:name', (req, res) => {
  res.send("Bienvenue sur la page de " + req.params.name)
})

app.get('/somme', (req, res) => {
  let a = parseInt(req.query.a);
  let b = parseInt(req.query.b);
  res.send(`Somme de ${a} + ${b} = ${a + b}`)
})

app.get('/metrics', (req, res) => {
  const metric = {
    status: "healthy",
    requestsCount: requestCount,
    uptime: Math.floor(process.uptime())
  }
  res.send('<pre>' + JSON.stringify(metric, null, 2) + '</pre>')
})

app.use((req, res, next) => {
  res.status(404).send("Cette page n'existe pas!")
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})