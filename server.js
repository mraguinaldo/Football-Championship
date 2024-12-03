const app = require('./src/app.js')

const PORT = 8000

const showMessage = () => {
  console.log(`O servidor esta rodando na porta http://localhost:${PORT}`)
}
app.listen(PORT, showMessage)
