
const jobs = [
  { title: "Marketing Intern", location: "US, NY, New York" },
  {
    title: "Customer Service - Cloud Video Production",
    location: "NZ, Auckland",
  },
  {
    title: "Commissioning Machinery Assistant (CMA)",
    location: "US, IA, Wever",
  },
  {
    title: "Account Executive - Washington DC",
    location: "US, DC, Washington",
  },
  { title: "Bill Review Manager", location: "US, FL, Fort Worth" },
  { title: "Accounting Clerk", location: "US, MD," },
  { title: "Head of Content (m/f)", location: "DE, BE, Berlin" },
  {
    title: "Lead Guest Service Specialist",
    location: "US, CA, San Francisco",
  },
  { title: "HP BSM SME", location: "US, FL, Pensacola" },
  {
    title: "Customer Service Associate - Part Time",
    location: "US, AZ, Phoenix",
  },
  {
    title: "ASP.net Developer Job opportunity at United States,New Jersey",
    location: "US, NJ, Jersey City",
  },
  {
    title: "Talent Sourcer (6 months fixed-term contract)",
    location: "GB, LND, London",
  },
  {
    title: "Applications Developer, Digital",
    location: "US, CT, Stamford",
  },
  { title: "Installers", location: "US, FL, Orlando" },
  { title: "Account Executive - Sydney", location: "AU, NSW, Sydney" },
  {
    title: "VP of Sales - Vault Dragon",
    location: "SG, 01, Singapore",
  },
  { title: "Hands-On QA Leader", location: "IL, Tel Aviv, Israel" },
  {
    title: "Southend-on-Sea Traineeships Under NAS 16-18 Year Olds Only",
    location: "GB, SOS, Southend-on-Sea",
  },
  { title: "Visual Designer", location: "US, NY, New York" },
  {
    title: "Process Controls Engineer - DCS PLC MS Office - PA",
    location: "US, PA, USA Northeast",
  },
  { title: "Marketing Assistant", location: "US, TX, Austin" },
  { title: "Front End Developer", location: "NZ, N, Auckland" },
  { title: "Engagement Manager", location: "AE," },
  {
    title: "Vice President, Sales and Sponsorship (Businessfriend.com)",
    location: "US, CA, Carlsbad",
  },
  { title: "Customer Service", location: "GB, LND, London" },
  { title: "H1B SPONSOR FOR L1/L2/OPT", location: "US, NY, New York" },
  { title: "Marketing Exec", location: "SG," },
  {
    title: "HAAD/DHA Licensed Doctors Opening in UAE",
    location: "AE, AZ, Abudhabi",
  },
  {
    title: "Talent Management Process Manager",
    location: "US, MO, St. Louis",
  },
  { title: "Customer Service Associate", location: "CA, ON, Toronto" },
  {
    title: "Customer Service Technical Specialist",
    location: "US, MA, Waltham",
  },
  { title: "Software Applications Specialist", location: "US, KS," },
  { title: "Craftsman Associate", location: "US, WA, Everett" },
  { title: "Completion Engineer", location: "US, CA, San Ramon" },
  { title: "I Want To Work At Karmarama", location: "GB, LND," },
  {
    title: "English Teacher Abroad",
    location: "US, NY, Saint Bonaventure",
  },
]



//Funzione di ricerca all'interno del nostro array di oggetti fornito
function jobSearch(position, location) {
  let result = [];
  let count = 0;
  for (let job of jobs) {
    let jobPosition = job.title.toLowerCase();
    let jobLocation = job.location.toLowerCase();
    if (jobPosition.includes(position.toLowerCase()) && jobLocation.includes(location.toLowerCase())) {
      result.push({
        title: job.title,
        location: job.location,
      });
      count++;
    }

  }
  return { result, count };//il risultato sarà un oggetto con un array di oggetti e una variabile che contiene il numero di ricerche andate a buon fine
}



function displayJobs(job) {
  //Selezioniamo il div container, lo svuotiamo e aggiungiame dello stile differente per poi ospitare la nostra lista di risultati
  let divContainer = document.querySelector("div");
  divContainer.innerHTML = "";
  divContainer.style.padding = "20px 20px";
  divContainer.style.height = "100%";

  //Creiamo il nuovo div che andrà a contenere la lista di risultati, il bottone per tornare indietro e il numero di ricerche ottenuto
  let newDiv = document.createElement("div");
  let a = document.createElement("a");
  a.href = "index.html";
  a.classList.add("restart");
  a.innerHTML = "<i class='fa-solid fa-arrow-left'></i>";
  let count = document.createElement("span");
  count.classList.add("count");
  count.innerText = "Found: " + job.count;


  //Qui andiamo a creare la nostra lista di risultati grazie alle classi bootstramp verificando prima se la ricerca a prodotto risultati
  if(job.count != 0){
    let ul = document.createElement("ul");
    ul.classList.add("list-group");
    for (let i = 0; i < job.count; i++) {
      let li = document.createElement("li");
      li.classList.add("list-group-item");
      let h2 = document.createElement("h2");
      h2.innerText = job.result[i].title;
      let span = document.createElement("span");
      span.innerText = job.result[i].location;
      li.appendChild(h2);
      li.appendChild(span);
      ul.appendChild(li);
    }
    //Creata la nostra lista la andiamo a collegare al nostro div contenitore

    newDiv.appendChild(ul);
    divContainer.appendChild(newDiv);
  }else{
    //Se la ricerca non ha prodotto risultati aggiungiamo una classe al div creato inizialmente e colleghiamo tutto al div contenitore

    newDiv.classList.add("notFound");
    let i = document.createElement("i");
    i.innerHTML = "<i class='fa-solid fa-heart-crack'></i>";
    let heart = i.querySelector("i");
    heart.classList.add("colorI");
    let p =document.createElement("p");
    p.innerText = "Search not found!";
    newDiv.appendChild(i);
    newDiv.appendChild(p);
    divContainer.appendChild(newDiv);
  }
  newDiv.appendChild(a);
  newDiv.appendChild(count);
}





//Questa funzione crea grazie ad una classe bootstramp uno spinner che verrà visualizzato prima di caricare la lista di risultati
function loadingJob(){
  let divContainer = document.querySelector("div");
  divContainer.innerHTML = "";
  let spinner = document.createElement("div");
  spinner.classList.add("spinner-grow");
  spinner.classList.add("text-success");
  divContainer.appendChild(spinner);
}




//questa funzione richiama tutte le altre e si occupa di ricevere i parametri inseriti dall'utente
function action(){
  let position = document.getElementById("floatingPosition").value;
  let location = document.getElementById("floatingLocation").value;
  loadingJob();
  setTimeout(function() {
    let job = jobSearch(position, location);
    displayJobs(job);
  }, 2000);
}





/*--------------- mainFunction ------------------*/
function mainFunction(){
  let button = document.querySelector("button");
  //Aggiungiamo un evento al bottone che andrà a prendere il valore degli input e a richiamare gradualmente le fostre funzioni
  button.addEventListener("click", action);


  //raccogliamo tutti gli input in un insieme di nodi con querySelector
  let inputs = document.querySelectorAll("input");

  /* Tramite il forEach andiamo ad iterare l'insime di nodi e per ogni nodo richiamiamo una funzione di callback che aggiunge un listener
  che a sua volta chiamera una funzione di callback che verra esegutita se si preme("keypress") ed andrà a verificare se il tasto premuto corrisponde all'invio
  all'interno della condizione verifichiamo se l'indice su qui è stato attivato il listener corrisponde allo 0 quindi il primo
  tramite la funzione focus() andremo a selezionare l'altro input.
  se la condizione non viene soddisfatta richiamo la funzione active() */

  inputs.forEach((input ,i) => {
    input.addEventListener("keydown", (event)=>{
      if(event.key == "Enter"){
        if( i===0 )inputs[i+1].focus();
        else action();
      }
    })

  })
  //Metodo con for
  /* for(let i=0; i<inputs.length;i++){
    let input = inputs[i];
    input.addEventListener("keydown", (event)=>{
      if(event.key === "Enter"){
        if(i===0)inputs[i+1].focus();
        else action();
      }
    })
  } */
}





/*----------------- animazioni create grazie alla libreria Anime.js ---------------------*/

let title = document.getElementById("title");
let animationTitle = anime({
  targets: title,
  translateY: [0, 10],
  opacity: [0, 1],
  duration: 1000,
  easing: 'easeInCubic',
});


let subtitle = document.getElementById("subtitle");
let animationSubtitle = anime({
  targets: subtitle,
  scale: [1.3,1],
  duration: 1500,
})



let label = document.getElementsByTagName("label");
let animationLabel = anime({
  targets: label,
  opacity:[-0.5 ,1],
  duration: 15000,
})


let itemAnimation = document.getElementsByClassName("animate");
console.log(itemAnimation);
let animationItem = anime({
  targets: itemAnimation,
  opacity:[-0.5 ,1],
  duration: 6000,
})







window.onload = mainFunction();