import { API_URL} from "../../settings.js"
import { encode, handleHttpErrors, makeOptions } from "../../utils.js"


//Add id to this URL to get a single event
const URL = `${API_URL}/event/`

export function initFindEditEvent(){
  document.querySelector("#btn-fetch-event").onclick = getEvent
  document.querySelector("#btn-delete-event").onclick = deleteEvent
  document.querySelector("#btn-submit-edited-event").onclick = editEvent
}

async function getEvent () {
    const event_id = document.querySelector("#event-id-input").value
    const options = makeOptions("GET",null,false)
    const safeId = encode(event_id)
    try{
    const event = await fetch(URL+safeId,options).then(handleHttpErrors).then( event => {

        document.querySelector("#event-id").value = event.id  
        document.querySelector("#event-name").value = encode(event.name)  
        document.querySelector("#event-description").value = encode(event.description)  
        document.querySelector("#event-date").value = event.date
        document.querySelector("#event-capacity").value = event.capacity

    })} catch (err) {
        document.querySelector("#status").innerText = err.message
    }
    document.querySelector("#status").innerText = ""
}
    

    async function deleteEvent(){
        const id = encode(document.querySelector("#event-id").value)
        const options = makeOptions("DELETE",null,true)
        try{
        await fetch(URL+id,options).then(handleHttpErrors)
    } catch (err) {
        document.querySelector("#status").innerText = err.message
    }
    
    document.querySelector("#status").innerText = "Event deleted"
    document.querySelector("#event-id").value = "" 
        document.querySelector("#event-name").value = ""  
        document.querySelector("#event-description").value = ""  
        document.querySelector("#event-date").value = ""
        document.querySelector("#event-capacity").value = ""
    }
    

    async function editEvent () {

        const id = document.querySelector("#event-id").value
        const description = document.querySelector("#event-description").value  
        const capacity = document.querySelector("#event-capacity").value
        const date = document.querySelector("#event-date").value
        const name = document.querySelector("#event-name").value

        const event = {id,description,capacity,date,name}
        const options = makeOptions('PUT',event)
        try{
            await fetch(URL+id, options).then(handleHttpErrors).then( event => {

                document.querySelector("#event-id").value = event.id  
                document.querySelector("#event-name").value = encode(event.name)  
                document.querySelector("#event-description").value = encode(event.description)  
                document.querySelector("#event-date").value = event.date
                document.querySelector("#event-capacity").value = event.capacity
        
            })
        }catch (err){
            document.querySelector("#status").innerText = err.message
        }

        document.querySelector("#status").innerText = "Event updated"


    }