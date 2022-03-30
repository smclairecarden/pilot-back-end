import axios from 'axios'

function getLocation(req, res) {
  // console.log('THIS IS WHAT NAME IS', req.params.name)
  axios.get(`https://dev.virtualearth.net/REST/v1/Imagery/Map/AerialWithLabels/landmark=Lake Tahoe?mapSize=500,400&key=AhLV0AjsXLmRnBcUmR_zMIa1ap6jxunRi_AS4k4Jguxg6cxbMIx5FI9tMUK56-iM`)
  .then(apiResponse => {
    res.send(apiResponse.data)
    console.log('Loooooooookkkkkkkk', apiResponse.data)
  })
}

getLocation()