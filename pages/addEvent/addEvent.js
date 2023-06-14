
import { API_URL,FETCH_NO_API_ERROR } from "../../settings.js"
import { handleHttpErrors, makeOptions, encode } from "../../utils.js"

//Add id to this URL to get a single event
const URL = `${API_URL}/event`

export async function initAddEvent(match) {
 document.querySelector("#btn-submit-event").onclick = addEvent 
}

async function addEvent(evt){
    evt.preventDefault()    
    const name = document.querySelector("#name-event").value  
    const date = document.querySelector("#date-event").value  
    const description = document.querySelector("#description-event").value  
    const capacity = document.querySelector("#capacity-event").value  
    const event = {name, date, description, capacity}

    const options = {
        method: "POST",
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(event)
     }
     
   
    try{
    await fetch(URL,options).then(handleHttpErrors)
    } catch (err){
        document.querySelector("#status").innerText = err.message
    }
    document.querySelector("#form").reset()
    document.querySelector("#status").innerText = "New event added"
}
