require('dotenv').config()
const axios =require('axios')
const {PROTOCOLO_BASICO, URL_GEO, URL_CURRENT, APPID_WEATHER, Q, LIMIT} = process.env

function coordenadas(){
    let url =`${PROTOCOLO_BASICO}://${URL_GEO}?q=${Q}&limit=${LIMIT}&appid=${APPID_WEATHER}`
    axios.get(url).then((resposta) => {
        console.log(resposta.data)
    }).catch((err) => {
        console.log(err)
    })
}