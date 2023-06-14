import { API_URL } from "../../settings.js"
import { handleHttpErrors, makeOptions, sanitizeStringWithTableRows } from "../../utils.js"

 const URL = API_URL + "/event"


export async function initMyEvents() {
    document.querySelector("#btn-fetch-my-events").onclick = loadMyEvents
    document.querySelector("#table-rows").onclick = setupCancelModal
    document.querySelector("#btn-cancel-ticket").onclick = canselBooking

}

async function loadMyEvents() {

const options = makeOptions("GET",null,true)
const username = document.querySelector("#my-username").value
const reservationsurl = API_URL + `/attendeeEvent/${username}`

try{
const events = await fetch(reservationsurl,options).then(handleHttpErrors)

const tablerows = events.map(event => `
<tr>
    <td>${event.id}</td>
    <td>${event.name}</td>
    <td>${event.date.substring(0, 10)}</td>
    <td>${event.description}</td>
    <td><button id="btn_${event.id}" type="button"  class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#cancel-modal">Cancel your ticket</button></td></tr>
</tr>`).join("")

document.querySelector("#table-rows").innerHTML = sanitizeStringWithTableRows(tablerows)
} catch (err) {
    document.querySelector("#status").innerText = err.message
}
document.querySelector("#status").innerText = ""

}


async function setupCancelModal(evt) {
    const target = evt.target
    const parts = target.id.split("_");
    const id = parts[1]
    const username = document.querySelector("#my-username").value
    document.querySelector("#event-id").value = id
    document.querySelector("#attendece-username").value = username
    document.querySelector("#keep-ticket").textContent = "Keep ticket"

}


async function canselBooking(evt){
    evt.preventDefault()
    const username = document.querySelector("#event-id").value
    const eventId = document.querySelector("#attendece-username").value    

    const reservationsurl = API_URL + `/attendeeEvent/${eventId}/${username}`
    const options = {
        method: "Delete",
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        }}
     
    try{ 
        const newBooking = await fetch(reservationsurl,options).then(handleHttpErrors)
        document.querySelector("#modal-status").innerText = "Booking cancelled"
        loadMyEvents()
        document.querySelector("#keep-ticket").textContent = "Close"


    }catch(err){
        document.querySelector("#modal-status").innerText = err.message
    }


}