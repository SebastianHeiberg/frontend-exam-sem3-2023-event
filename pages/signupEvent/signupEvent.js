import { API_URL } from "../../settings.js"
import { handleHttpErrors, makeOptions, sanitizeStringWithTableRows } from "../../utils.js"

 const URL = API_URL + "/event"


export async function initSignUpEvent() {
    loadAllEvents()
    document.querySelector("#table-rows").onclick = setupBookingModal
    document.querySelector("#btn-book").onclick = makeReservation

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
    <td>Not many</td>
    <td><button id="btn_${event.id}" type="button"  class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#booking-modal">Book ticket</button></td></tr>
</tr>`).join("")

document.querySelector("#table-rows").innerHTML = sanitizeStringWithTableRows(tablerows)

}

async function setupBookingModal(evt) {
    const target = evt.target
    const parts = target.id.split("_");
    const id = parts[1]
    document.querySelector("#modal-event-id").value = id
}

async function makeReservation(evt){
    evt.preventDefault()    
    const username = document.querySelector("#event-username").value
    const id = document.querySelector("#modal-event-id").value
     
    const reserveurl = API_URL + `/attendeeEvent/${username}/${id}`
    const options = {
        method: "POST",
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        }}
     
    try{ 
        const newBooking = await fetch(reserveurl,options).then(handleHttpErrors)
        document.querySelector("#status").innerText = "booking made"
        document.querySelector("#event-username").value = ""

    }catch(err){
        document.querySelector("#status").innerText = err.message
    }


}
