import { API_URL } from "../../settings.js"
import { handleHttpErrors, makeOptions, sanitizeStringWithTableRows } from "../../utils.js"

 const URL = API_URL + "/event"


export async function initAllEvents() {
    loadAllEvents()
    document.querySelector("#btn-submit-search").onclick = search
}

async function loadAllEvents() {

const options = makeOptions("GET",null,false)

const events = await fetch(URL,options).then(handleHttpErrors)

const tablerows = events.map(event => `
<tr>
    <td>${event.id}</td>
    <td>${event.name}</td>
    <td>${event.date.substring(0, 10)}</td>
    <td>${event.description}</td>
    <td>${event.ticketsLeft}</td>
</tr>`).join("")

document.querySelector("#table-rows").innerHTML = sanitizeStringWithTableRows(tablerows)

}

async function search(evt) {
    evt.preventDefault()
    const options = makeOptions("GET",null,false)
    const title = document.querySelector("#title").value
    const events = await fetch(URL+`/title/${title}`,options).then(handleHttpErrors)
    
    const tablerows = events.map(event => `
    <tr>
        <td>${event.id}</td>
        <td>${event.name}</td>
        <td>${event.date.substring(0, 10)}</td>
        <td>${event.description}</td>
        <td>${event.ticketsLeft}</td>
    </tr>`).join("")
    
    document.querySelector("#table-rows").innerHTML = sanitizeStringWithTableRows(tablerows)
    

}
