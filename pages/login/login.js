import { API_URL,FETCH_NO_API_ERROR } from "../../settings.js"
import { handleHttpErrors, makeOptions, encode } from "../../utils.js"

//Add id to this URL to get a single event
const URL = `${API_URL}/auth/login`

export async function initLogin(match) {
 document.querySelector("#btn-submit-login").onclick = addAttendee 
}

async function addAttendee(evt){
    evt.preventDefault()    
    const username = document.querySelector("#username").value  
    const password = document.querySelector("#password").value  
   
    const user = {username, password}
    const options = {
        method: "POST",
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
     }
     
   
    try{
    const response = await fetch(URL,options).then(handleHttpErrors)
    localStorage.setItem("user", response.username)
    localStorage.setItem("token", response.token)
    localStorage.setItem("roles", response.roles)
    } catch (err){
        document.querySelector("#status").innerText = err.message
    }
    document.querySelector("#form").reset()
    window.router.navigate("")
}

export function logout(){
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    localStorage.removeItem("roles")
    window.router.navigate("")
}
