
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
  return { result, count };
}


//Questa funzione si occupa di gestire tutto quello che è contenuto all'interno del div container.
function displayJobs(job, restartContainer) {
  //Selezioniamo il div container, lo svuotiamo e aggiungiame dello stile differente per poi ospitare la nostra lista di risultati
  let divContainer = document.querySelector("div");
  divContainer.innerHTML = "";
  divContainer.style.padding = "20px 20px";
  divContainer.style.height = "100%";

  //Creiamo il nuovo div che andrà a contenere la lista di risultati, il bottone per tornare indietro e il numero di ricerche ottenuto
  let newDiv = document.createElement("div");
  //Tasto per tornare indietro
  let i = document.createElement("i");
  i.classList.add("restart");
  i.classList.add("fas");
  i.classList.add("fa-arrow-left");
  i.classList.add("restart");
  i.addEventListener("click", ()=>{
    divContainer.innerHTML = "";
    divContainer.innerHTML = restartContainer;
    divContainer.style = "";
    mainFunction();
  })
  newDiv.appendChild(i);

  //Numero di ricerche trovate
  let count = document.createElement("span");
  count.classList.add("count");
  count.innerText = "Found: " + job.count;
  newDiv.appendChild(count);

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
    newDiv.appendChild(ul);
    divContainer.appendChild(newDiv);
  }else{
    //Se la ricerca non ha prodotto risultati aggiungiamo una classe al div creato inizialmente, aggiungiamo un icona con un testo  e colleghiamo tutto al div contenitore.
    newDiv.classList.add("notFound");
    let i = document.createElement("i");
    i.classList.add("fas");
    i.classList.add("fa-solid");
    i.classList.add("fa-heart-crack");
    i.style.color = "#198754";
    let p =document.createElement("p");
    p.innerText = "Search not found!";
    newDiv.appendChild(i);
    newDiv.appendChild(p);
    divContainer.appendChild(newDiv);
  }
}


//Questa funzione crea grazie ad una classe bootstramp uno spinner che verrà visualizzato prima di caricare i risultati della ricerca.
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
  let restart = document.querySelector("div").innerHTML;//una copia della struttura HTML all'interno del div container,ci servirà in caso volessimo tornare indietro dopo una ricerca.
  loadingJob();  
  setTimeout(function() {                                         
    let job = jobSearch(position, location);
    displayJobs(job, restart);
  }, 2000);
}

/*--------------- mainFunction ------------------*/

function mainFunction(){
  let button = document.querySelector("button");
  button.addEventListener("click", action);

  //raccogliamo tutti gli input in un insieme di nodi con querySelector
  let inputs = document.querySelectorAll("input");
  inputs.forEach((input ,i) => {
    input.addEventListener("keydown", (event)=>{
      if(event.key == "Enter"){
        if( i===0 )inputs[i+1].focus();
        else action();
      }
    })

  })
}

/*----------------- animazioni create grazie alla libreria Anime.js ---------------------*/

let title = document.getElementById("title");
let animationTitle = anime({
  targets: title,
  translateY: [0, 10],
  opacity: [0, 1],
  duration: 1500,
  easing: 'easeInCubic',
});

let subtitle = document.getElementById("subtitle");
let animationSubtitle = anime({
  targets: subtitle,
  scale: [2,1],
  easing: "easeInElastic",
  duration: 1500,
})

let label = document.getElementsByTagName("label");
let animationLabel = anime({
  targets: label,
  opacity:[-0.5 ,1],
  duration: 20000,
})

let itemAnimation = document.getElementsByClassName("animate");
let animationItem = anime({
  targets: itemAnimation,
  opacity:[-0.5 ,1],
  duration: 8000,
})



window.onload = mainFunction();