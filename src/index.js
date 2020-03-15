const DOGGOS_URL = 'http://localhost:3000/pups'

// fetching
const getPups = () => {
    return fetch(DOGGOS_URL)
    .then(resp => resp.json())
},

getOneDoggo = id => {
    return fetch(DOGGOS_URL + `/${id}`)
    .then(resp => resp.json())
},

toggleGoodPup = (id,newVal) => {
    const options = {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            isGoodPup: newVal
        })
    }
    return fetch(DOGGOS_URL + `/${id}`, options)
    .then(resp => resp.json())
}

// functionality
const toggleFilterPups = event => {
    const filterPupsBtn = document.getElementById('good-dog-filter')
    if (filterPupsBtn.innerText.includes('OFF')) {
        filterPupsBtn.innerText = 'Filter good pups: on'
        updatePupBar()
    } else {
        filterPupsBtn.innerText = 'Filter good pups: off'
        updatePupBar()
    }
}

    addDoggosToDogBar = pups => {
    fetch(DOGGOS_URL)
    .then(resp => resp.json())
    .then(res => {
        document.getElementById('dog-bar').innerHTML = '';
        for (let i = 0; i < res.length; i++) createDoggoButton(res[i])
    })
},
    createDoggoButton = pup => {
        let dogBar = document.getElementById('dog-bar')
        let pupSpan = document.createElement('span')
        pupSpan.innerText = pup.name
        pupSpan.dataset.id = pup.id 
        pupSpan.addEventListener('click', onDoggoSpanClick)
        dogBar.appendChild(pupSpan)
    },

    onDoggoSpanClick = event => {
        getOneDoggo(event.target.dataset.id)
        .then(addDoggoToPage)
    },

    addDoggoToPage = pup => {
        const pupInfo = document.getElementById('dog-info')
        pupInfo.innerHTML = ''
        const pupImg = document.createElement('img')
        pupImg.src = pup.image
        const pupName = document.createElement('h3')
        pupName.innerText = pup.name
        const pupBtn = document.createElement('btn')
        pupBtn.innerText = pup.isGoodDog ? 'Good pup!' : 'Bad pup!'
        pupBtn.dataset.id = pup.id
        pupBtn.addEventListener('click', onGoodPupBtnClick)
        pupInfo.append(pupImg, pupName, pupBtn)
    },

    onGoodPupBtnClick = event => {
        let newVal;
        if (event.target.innerText.includes('Good')){
            event.target.innerText = 'Bad pup!'
            newVal = false
        } else {
        event.target.innerText = 'Good pup!'
        newVal = true
        }
        toggleGoodPup(event.target.dataset.id, newVal).then(updatePupBar)
    },

    updatePupBar = () => {
        const filterPupsBtn = document.getElementById('good-dog-filter')
        if (filterPupsBtn.innerText.includes('OFF')){
            getPups().then(pupsArr => addDoggosToDogBar(pupsArr))
        } else {
            getPups().then(pupsArr => addDoggosToDogBar(pupsArr, true))
        }
    }
    
    init = event => {
        const filterPupsBtn = document.getElementById('good-dog-filter')
        filterPupsBtn.addEventListener("click", toggleFilterPups)
        getPups()
        .then(addDoggosToDogBar)      
        // addDoggosToDogBar(),
        // createDoggoButton(),
        // addDoggoToPage()
    };

document.addEventListener('DOMContentLoaded', init)



// document.addEventListener("DOMContentLoaded", init)

// function init(e){
//   const filterDogsButton = document.querySelector("#good-dog-filter")
//   filterDogsButton.addEventListener("click", toggleFilterDogs)
//   getDogs().then(addAllDogsToDogBar)
// }

// function toggleFilterDogs(e){
//   const filterDogsButton = document.querySelector("#good-dog-filter")
//   if (filterDogsButton.innerText.includes("OFF")){
//     filterDogsButton.innerText = "Filter good dogs: ON"
//     updateDogBar()
//   } else {
//     filterDogsButton.innerText = "Filter good dogs: OFF"
//     updateDogBar()
//   }
// }

// function addAllDogsToDogBar(dogArray, filter = false){
//   const dogBar = document.querySelector("#dog-bar")
//   dogBar.innerHTML = ""
//   if (filter) {
//     dogArray.filter(dog => dog.isGoodDog).forEach(addDogSpantoDogBar)
//   } else {
//     dogArray.forEach(addDogSpantoDogBar)
//   }
// }

// function addDogSpantoDogBar(dog){
//   const dogBar = document.querySelector("#dog-bar")
//   const dogSpan = document.createElement("span")
//   dogSpan.innerText = dog.name
//   dogSpan.dataset.id = dog.id

//   dogSpan.addEventListener("click", onDogSpanClick)

//   dogBar.append(dogSpan)
// }

// function onDogSpanClick(e){
//   getSingleDog(e.target.dataset.id)
//     .then(addDogInfoToPage)
// }

// function addDogInfoToPage(dog){
//   const dogInfo = document.querySelector("#dog-info")
//   dogInfo.innerHTML = ""
//   const dogImg = document.createElement("img")
//   dogImg.src = dog.image

//   const dogTitle = document.createElement("h2")
//   dogTitle.innerText = dog.name

//   const dogButton = document.createElement("button")
//   dogButton.innerText = dog.isGoodDog ? "Good Dog!" : "Bad Dog!"
//   dogButton.dataset.id = dog.id
//   dogButton.addEventListener("click", onGoodDogButtonClick)

//   dogInfo.append(dogImg, dogTitle, dogButton)
// }

// function onGoodDogButtonClick(e){
//   let newValue;
//   if (e.target.innerText.includes("Good")){
//     e.target.innerText = "Bad Dog"
//     newValue = false
//   } else {
//     e.target.innerText = "Good Dog"
//     newValue = true
//   }
//   toggleGoodDog(e.target.dataset.id, newValue).then(updateDogBar)
// }

// function updateDogBar(){
//   const filterDogsButton = document.querySelector("#good-dog-filter")
//   if (filterDogsButton.innerText.includes("OFF")){
//     getDogs().then(dogArray => addAllDogsToDogBar(dogArray))
//   } else {
//     getDogs().then(dogArray => addAllDogsToDogBar(dogArray, true))
//   }
// }

// // fetches:

// const baseURL = "http://localhost:3000/pups"

// function getDogs(){
//   return fetch(baseURL)
//     .then(r => r.json())
// }

// function getSingleDog(id){
//   return fetch(baseURL + `/${id}`)
//     .then(r => r.json() )
// }

// function toggleGoodDog(id, newValue){
//   const options = {
//     method: "PATCH",
//     headers: {
//       "content-type": "application/json"
//     },
//     body: JSON.stringify({
//       isGoodDog: newValue
//     })
//   }
//   return fetch(baseURL + `/${id}`, options)
//     .then(r => r.json())
// }