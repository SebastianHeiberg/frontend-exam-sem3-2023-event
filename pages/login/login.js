import { API_URL,FETCH_NO_API_ERROR } from "../../settings.js"
import { handleHttpErrors, makeOptions, encode } from "../../utils.js"

//Add id to this URL to get a single event
const URL = `${API_URL}/auth/login`

export async function initLogin(match) {
 document.querySelector("#btn-submit-login").onclick = submitLogin 
}

async function submitLogin(evt){
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
    //alt der skal gemmes
    localStorage.setItem("user", response.username)
    localStorage.setItem("token", response.token)
    localStorage.setItem("roles", response.roles)

    login()


    } catch (err){
        document.querySelector("#status").innerText = err.message
    }
    document.querySelector("#form").reset()
    window.router.navigate("")
}

export function login(){
    //kun admin
    if(localStorage.roles.includes('ADMIN')){
    document.querySelector("#for-admin-event").style.display="block"
    document.querySelector("#allevents-link").style.display="block"                        
    }
    //kun user
    if(localStorage.roles.includes('USER')){
        document.querySelector("#for-user-event").style.display="block"
        document.querySelector("#allevents-link").style.display="none"                        
        }
    //altid vises
    document.querySelector("#logout-link").style.display="block"        

    //skal ikke vises
    document.querySelector("#signup-link").style.display="none"                
    document.querySelector("#login-link").style.display="none"                

}

export function resetBar(){

    //kun admin
    document.querySelector("#for-admin-event").style.display="none"        
    
    //kun user
        document.querySelector("#for-user-event").style.display="none"        
        
    //altid vises
    document.querySelector("#logout-link").style.display="none"        

    //skal ikke vises
    document.querySelector("#signup-link").style.display="block"                
    document.querySelector("#allevents-link").style.display="block"                
    document.querySelector("#login-link").style.display="block"        

}
export function logout(){
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    localStorage.removeItem("roles")

    resetBar()

    window.router.navigate("")



}
