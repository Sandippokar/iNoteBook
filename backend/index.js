const connectToMongo = require('./db');
const express = require('express')

connectToMongo();
const app = express()
const port = 5000

app.use(express.json())

//available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


app.get('/', (req, res) => {
  res.send('Hello Sandip!')
})

app.listen(port, () => {
  console.log(`iNotebook backend listening on port http://localhost:${port}`)
})