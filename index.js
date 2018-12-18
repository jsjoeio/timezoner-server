require('dotenv').config()

module.exports = (req, res) => {
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
};