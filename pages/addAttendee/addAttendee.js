
import { API_URL,FETCH_NO_API_ERROR } from "../../settings.js"
import { handleHttpErrors, makeOptions, encode } from "../../utils.js"

//Add id to this URL to get a single event
const URL = `${API_URL}/attendee`

export async function initAddAttendee(match) {
 document.querySelector("#btn-submit-attendee").onclick = addAttendee 
}

async function addAttendee(evt){
    evt.preventDefault()    
    const username = document.querySelector("#username").value  
    const email = document.querySelector("#email").value  
    const phoneNumber = document.querySelector("#phone").value  
   
    const user = {username, email, phoneNumber}
    const options = {
        method: "POST",
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
     }
     
   
    try{
    await fetch(URL,options).then(handleHttpErrors)
    } catch (err){
        document.querySelector("#status").innerText = err.message
    }
    document.querySelector("#form").reset()
    document.querySelector("#status").innerText = "New user added"
}
