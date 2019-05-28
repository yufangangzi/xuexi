let express = require('express')

let app = express()

app.get('/user', (req,res) => {
  res.json({name: 'zfpx'})
})
app.listen(3001)