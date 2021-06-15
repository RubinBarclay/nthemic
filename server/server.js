const express = require('express')
const cors = require('cors')
const SpotifyWebApi = require('spotify-web-api-node')

const app = express()

// Middleware
app.use(express.json())
app.use(cors())

app.post('/login', (req, res) => {
  const code = req.body.code
  const spotifyApi = new SpotifyWebApi({
    redirectUri: 'http://localhost:3000',
    clientId: '11c9d0da629948fb87a800307b571162',
    clientSecret: 'e4196ec60b9641db89a329ce6541f60b'
  })

  spotifyApi.authorizationCodeGrant(code)
    .then(data => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      })
    })
    .catch(() => {
      res.sendStatus(400)
    })
})

app.post('/refresh', (req, res) => {
  const refreshToken = req.body.refreshToken
  const spotifyApi = new SpotifyWebApi({
    redirectUri: 'http://localhost:3000',
    clientId: '11c9d0da629948fb87a800307b571162',
    clientSecret: 'e4196ec60b9641db89a329ce6541f60b',
    refreshToken
  })   

  // clientId, clientSecret and refreshToken has been set on the api object previous to this call.
  spotifyApi.refreshAccessToken()
    .then(data => {
      res.json({
        accessToken: data.body.access_token,
        expiresIn: data.body.expires_in
      })
    })
    .catch(() => {
      res.sendStatus(400)
    }
  );
})

app.listen(4000)
