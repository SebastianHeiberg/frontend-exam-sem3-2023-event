//import "https://unpkg.com/navigo"  //Will create the global Navigo object used below
import "./navigo_EditedByLars.js"  //Will create the global Navigo, with a few changes, object used below
//import "./navigo.min.js"  //Will create the global Navigo object used below

import {
  setActiveLink, adjustForMissingHash, renderTemplate, loadHtml
} from "./utils.js"

import { initAllEvents } from "./pages/allEvents/allEvents.js"
import { initAddEvent } from "./pages/addEvent/addEvent.js"
import { initFindEditEvent } from "./pages/findEditEvent/findEditEvent.js";
import { initAddAttendee } from "./pages/addAttendee/addAttendee.js";
import { initSignUpEvent } from "./pages/signupEvent/signupEvent.js";
import { initMyEvents } from "./pages/myEvents/myEvents.js";
import { initLogin, logout } from "./pages/login/login.js";

window.addEventListener("load", async () => {

  const templateAllEvents = await loadHtml("./pages/allEvents/allEvents.html")
  const templateAddEvent = await loadHtml("./pages/addEvent/addEvent.html")
  const templateFindEditEvent = await loadHtml("./pages/findEditEvent/findEditEvent.html")
  const templateNotFound = await loadHtml("./pages/notFound/notFound.html")
  const templateAddAttendee = await loadHtml("./pages/addAttendee/addAttendee.html")
  const templateSignUpEvent = await loadHtml("./pages/signupEvent/signupEvent.html")
  const templateMyEvents = await loadHtml("./pages/myEvents/myEvents.html")
  const templateLogin = await loadHtml("./pages/login/login.html")
  
  adjustForMissingHash()

  const router = new Navigo("/", { hash: true });
  //Not especially nice, BUT MEANT to simplify things. Make the router global so it can be accessed from all js-files
  window.router = router

  router
    .hooks({
      before(done, match) {
        setActiveLink("menu", match.url)
        done()
      }
    })
    .on({
      //For very simple "templates", you can just insert your HTML directly like below
      "/": () => document.getElementById("content").innerHTML = `
        <h2>Welcome to the future of free events!</h2>
     `,
      "/events": () => {
        renderTemplate(templateAllEvents, "content")
        initAllEvents()
      },
      "/find-edit-event": (match) => {
        renderTemplate(templateFindEditEvent, "content")
        initFindEditEvent()
      },
      "/myEvents": (match) => {
        renderTemplate(templateMyEvents, "content")
        initMyEvents()
      },
      "/add-attendee": (match) => {
        renderTemplate(templateAddAttendee, "content")
        initAddAttendee()
      },
      "/signupEvent": (match) => {
        renderTemplate(templateSignUpEvent, "content")
        initSignUpEvent() 
      },
      "/login": (match) => {
        renderTemplate(templateLogin, "content")
        initLogin() 
      },"/logout": () => {
        renderTemplate(templateLogin, "content")
        logout()
      },
      "/add-event": (match) => {
        renderTemplate(templateAddEvent, "content")
        initAddEvent()
      }
    })
    .notFound(() => {
      renderTemplate(templateNotFound, "content")
    })
    .resolve()
});


window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
  alert('Error: ' + errorMsg + ' Script: ' + url + ' Line: ' + lineNumber
    + ' Column: ' + column + ' StackTrace: ' + errorObj);
}


