require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')
const cors = require('cors')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors())

app.get('/', (req, res) => res.send("Hey! You're not supposed to be here! 😱"))

app.post('/api/bitly/', (req, res) => {
  const longUrl = req.body.long_url
  const options = {
    headers: {
      Authorization: `Bearer ${process.env.BITLY_TOKEN}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    timeout: 1500
  }
  axios
    .post(
      'https://api-ssl.bitly.com/v4/shorten',
      {
        group_guid: process.env.BITLY_GROUP_GUID,
        domain: 'bit.ly',
        long_url: longUrl
      },
      options
    )
    .then(function(response) {
      res.send(response.data.link)
    })
    .catch(function(error) {
      console.log(error)
    })
})

app.listen(3000, () => console.log('timezoner-server listening on port 3000!'))
