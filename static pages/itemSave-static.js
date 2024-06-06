// let drugList = ["1a",'2a','3a','4a','5b','6b','7b','8b','9c','10c','11c','12c','13','14','15']

const resultBox = document.querySelector(".result-box")
const inputBox = document.getElementById("input-box")
const selectedBox = document.querySelector(".selected-box")
const dateInput = document.getElementById("date")

const drugsUrl = "http://localhost:8081/drugs"
const itemsUrl = "http://localhost:8081/items"

//Fetches drugList from back-end 

/* async function fetchData(url) {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
} */


let drugList = []
let medCounter = {}
let groupedItems = {}

//Reads drugList from local file *STATIC*
function getMedList(){ 
    fetch('drugList.json')
    .then(response => {
        return response.json(); 
    })
    .then(data => {
        // Step 3: Use the parsed data
        data.forEach(drug => {
            drugList.push(drug)
        });
        return drugList
    })
    .then(drugList => {
        medCounter = drugList.map(drug =>({
            drug: {
                name: drug.name,
                type: drug.type
            },
            counter: 0
        }))
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });

} 


//Use if u want to read dataList from server *BACK-END*
/* getMedList().then(()=>{
    medCounter = drugList.map(drug =>({
        drug: {
            name: drug.name,
            type: drug.type
        },
        counter: 0
    }))
}) */


//String formatting to display in Li elements
function drugToString(drug){
    return `${drug.name}(${drug.type})`
}

//Finds drugCounterObject with drug as input 
function findDrugCounterObject(drug){
    return medCounter.find(mc => {
        return JSON.stringify(mc.drug)  === JSON.stringify(drug)
    })
}

//String formatting for display in html 
function drugCounterString(drugCounterObj){
    return `${drugCounterObj.drug.name}: ${drugCounterObj.counter}`
}

//Finds drug object in drugList based on its string representation
//Use explained in line 302
function findDrug(drugString){
    return drugList.find(drug =>{
        return drugToString(drug)===(drugString)
    })
}



getMedList()



//action listener for search bar 
//triggers search and displaying results 
inputBox.onkeyup = function(){
    let result = []
    let input = inputBox.value
    if (input.length) {
        //If the input matches any drug's name or type
        //it's added to the result array
        result = drugList.filter(drug => 
            (drug.name.toLowerCase()
            + drug.type.toLowerCase())
            .includes(input.toLowerCase()));
    }

    //result array is then displayed on the page
    display(result)
}

function display(results) {
    resultBox.innerHTML = "";
    if(!results.length){
        return
    }
    //Create ul to hold all results 
    const resultList = document.createElement("ul");
    //Each result is displayed in created Li element
    results.forEach(drug => {
        const listElement = document.createElement("li");
        listElement.textContent = drugToString(drug) ;
        resultList.appendChild(listElement);
    });
    resultBox.appendChild(resultList);
}


////////////////////////////////////
function removeAndResetCount(liElem){
    liElem.remove()
    const drugCountToRemove = liElem.drugCounterObj
    const drugToRemove = drugCountToRemove.drug
    const indexToRemove = groupedItems[drugToRemove.type].indexOf(drugToRemove)
    groupedItems[drugToRemove.type].splice(indexToRemove)
    if (!groupedItems[drugToRemove.type].length) {
        document.querySelector(`.${drugToRemove.type}`).remove()
    }
    drugCountToRemove.counter = 0
}
function increment(event) {
    const liElem = event.target.closest(".selected-item")
    const drugCounterObj = liElem.drugCounterObj
    drugCounterObj.counter ++
    setLiDrugCountText(liElem)
}

function decrement(event){
    const liElem = event.target.closest(".selected-item")
    const drugCounterObj = liElem.drugCounterObj
    drugCounterObj.counter
    drugCounterObj.counter --
    if (drugCounterObj.counter === 0) {
        removeAndResetCount(liElem)
        return
    }
    setLiDrugCountText(liElem)

}

function deleteLi(event){
    const liElem = event.target.closest(".selected-item")
    removeAndResetCount(liElem)
    
}



//Create the increment, decrement and delete buttons
//for each li element with selected drug
function createLiButtonDiv(){
    const divElement = document.createElement("div")
    divElement.classList.add("item-buttons-div")
    const buttonNum = 3
    let buttonList = []
    for (let index = 0; index < buttonNum; index++) {
        const button = document.createElement("button")
        buttonList.push(button)
        divElement.appendChild(button)
    }
    const incrementButton = buttonList[0]
    const decrementButton = buttonList[1]
    const deleteButton = buttonList[2]
    incrementButton.classList.add("increment-button")
    decrementButton.classList.add("decrement-button")
    deleteButton.classList.add("delete-button")
    incrementButton.addEventListener("click", function(event){increment(event)})
    decrementButton.addEventListener("click", function(event){decrement(event)})
    deleteButton.addEventListener("click", function(event){deleteLi(event)})
    return divElement
}

function getLiText(li){
    const span = li.querySelector(".item-drug-info")
    return span.textContent
}

function setLiDrugCountText(li){
    const drugCounterObj = li.drugCounterObj
    const span = li.querySelector(".item-drug-info")
    span.textContent = drugCounterString(drugCounterObj)
}


//Create new li for each drug selected and bind the drugCounter to it 
function createNewLiElement(drugCounterObj) {
    const listElement = document.createElement("li")
    const drugInfoSpan = document.createElement("span")
    drugInfoSpan.classList.add("item-drug-info")
    listElement.classList.add("selected-item")
    listElement.drugCounterObj = drugCounterObj   
    drugInfoSpan.textContent = drugCounterString(drugCounterObj)
    const divElem = createLiButtonDiv()
    listElement.appendChild(drugInfoSpan)
    listElement.appendChild(divElem)

    return listElement
}

//Create new ul for the group
function createNewGroup(drug){
    const drugType = drug.type
    groupedItems[drugType] = []
    const ulElement = document.createElement("ul")
    ulElement.textContent = drugType

    //each ul has class with the same name as drug type 
    ulElement.classList.add(drugType)
    return ulElement
}


function updateDrugGroup(ulElement, drugCounterObj){
    const drug = drugCounterObj.drug
    const drugName = drug.name
    const drugType = drug.type
    //Update Only the counter display if drug is already added 
    if (groupedItems[drugType].includes(drugName)) {
        ulElement.querySelectorAll("li")
        .forEach(li =>{
            if (getLiText(li).includes(drugName)) {
                setLiDrugCountText(li, drugCounterObj)
            }
        })
        return
    }
        //Add new drug to its corresponding group 
        groupedItems[drugType].push(drugName)
        const listElement = createNewLiElement(drugCounterObj)
        ulElement.appendChild(listElement)
        selectedBox.appendChild(ulElement)
    
}


function displayGroupedItems(drugCounterObj){
    const drug = drugCounterObj.drug
    const drugType = drug.type
    let ulElement
    //IF new type
    if (!groupedItems[drugType] 
        || !groupedItems[drugType].length) {
        //create new ul for the new group
        ulElement = createNewGroup(drug)
        
    }else{
        //get the ul respresenting the group
        ulElement = selectedBox.querySelector(`.${drugType}`)
    }
    updateDrugGroup(ulElement, drugCounterObj)

}

//Event listener for when any of the search results is clicked
resultBox.addEventListener("click", function(event){
    const drugString = event.target.textContent
    //Drug is fetched from li as string so we use this method
    //to optain the object it self from drugList
    const drug = findDrug(drugString) 
    const dco = findDrugCounterObject(drug)
    dco.counter ++
    //Display drug with it's corresponding type
    displayGroupedItems(dco)
    //reset the search bar and resutl list
    inputBox.value = ''
    display([])   

})


//Submit items to the server *BACK-END*
/* async function submitItems(){

    let drugCounters = []
    document.querySelectorAll(".selected-item").forEach(li =>{
        drugCounters.push(li.drugCounterObj)
    })
    console.log(JSON.stringify(drugCounters));
    const date = dateInput.value
    const response = await fetch(itemsUrl, {
        method:'POST',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify({
            saveDate: date,
            drugCounterList: drugCounters
        })

    })
    console.log(JSON.stringify({
            saveDate: date,
            drugCounterList: drugCounters
        }));

        console.log(response.status);
    if (response.status !== 201) {
        alert("An error has occured ")
        return
    }
    

    alert("Item save successfully")
    location.reload()

} */

function submitItems(){
    alert("يستا بقولك البيج ستاتك بتسبمت ايه ")
}


