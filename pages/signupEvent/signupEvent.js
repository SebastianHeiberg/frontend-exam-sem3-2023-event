import { API_URL } from "../../settings.js"
import { handleHttpErrors, makeOptions, sanitizeStringWithTableRows } from "../../utils.js"

 const URL = API_URL + "/event"


export async function initSignUpEvent() {
    loadAllEvents()
    document.querySelector("#table-rows").onclick = makeReservation

}

async function loadAllEvents() {

const options = makeOptions("GET",null,true)

const events = await fetch(URL,options).then(handleHttpErrors)

const tablerows = events.map(event => `
<tr>
    <td>${event.id}</td>
    <td>${event.name}</td>
    <td>${event.date.substring(0, 10)}</td>
    <td>${event.description}</td>
    <td>${event.ticketsLeft}</td>
    <td><button id="btn_${event.id}" type="button"  class="btn btn-sm btn-primary">Book ticket</button></td></tr>
</tr>`).join("")

document.querySelector("#table-rows").innerHTML = sanitizeStringWithTableRows(tablerows)

}


async function makeReservation(evt){
    const target = evt.target
    const parts = target.id.split("_");
    if(parts[0] === 'btn'){
    
    const id = parts[1]    
     
    const reserveurl = API_URL + `/attendeeEvent/${id}`
    const options = {
        method: "POST",
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + localStorage.getItem("token")
        }}
     
    try{ 
        const newBooking = await fetch(reserveurl,options).then(handleHttpErrors)
        document.querySelector("#status").innerText = "booking made"
        loadAllEvents()

    }catch(err){
        document.querySelector("#status").innerText = err.message
    }
}

}
