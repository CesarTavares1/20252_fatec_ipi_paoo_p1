require('dotenv').config()
const axios =require('axios')
const {PROTOCOLO_BASICO, URL_GEO, URL_CURRENT, APPID_WEATHER, Q, LIMIT} = process.env

function coordenadas(){
    let url =`${PROTOCOLO_BASICO}://${URL_GEO}?q=${Q}&limit=${LIMIT}&appid=${APPID_WEATHER}`
    let i=0;
    axios.get(url).then((resposta) => {
        resposta.data.forEach((cidade, i) => {
            if(!cidade.local_names || cidade.local_names.pt ===undefined){
                return;
            }
            else{
                console.log("================================")
                console.log("Cidade: " + cidade.local_names?.pt)
                console.log("Latitude: " + cidade.lat)
                console.log("Longitude: " + cidade.lon)
                condicoes(cidade.local_names.pt, cidade.lat, cidade.lon)
            }
        });
    }).catch((err) => {
        console.log(err)
    })
}

async function condicoes(cidade, LAT, LON) {
    let url = `${PROTOCOLO_BASICO}://${URL_CURRENT}?lat=${LAT}&lon=${LON}&appid=${APPID_WEATHER}&units=metric&lang=pt`
    try {
        const resposta = await axios.get(url)

        console.log("\nCidade: "+cidade)
        console.log("Sensação térmica: " + resposta.data.main.feels_like)
        console.log("Descrição: " + resposta.data.weather[0].description)
    } catch(err) {
        console.log(err)
    }
}

coordenadas()