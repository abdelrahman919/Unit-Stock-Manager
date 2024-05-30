// let drugList = ["1a",'2a','3a','4a','5b','6b','7b','8b','9c','10c','11c','12c','13','14','15']

const resultBox = document.querySelector(".result-box")
const inputBox = document.getElementById("input-box")
const selectedBox = document.querySelector(".selected-box")
const dateInput = document.getElementById("date")

const drugsUrl = "http://localhost:8081/drugs"
const itemsUrl = "http://localhost:8081/items"
async function fetchData(url) {
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
}

let drugList = []
let medCounter = {}
let groupedItems = {}
let selectedDrugs = new Set()
async function getMedList(){
    drugList = await fetchData(drugsUrl)
} 

function drugToString(drug){
    return `${drug.name}(${drug.type})`
}

function findDrugCounterObject(drug){
    return medCounter.find(mc => {
        return JSON.stringify(mc.drug)  === JSON.stringify(drug)
    })
}

function drugCounterString(drugCounterObj){
    return `${drugCounterObj.drug.name}: ${drugCounterObj.counter}`
}

function getSelectedMedsCounter(){
    let selectedMedsCounter = []
    selectedDrugs.forEach(drug =>{
        selectedMedsCounter.push(findDrugCounterObject(drug))
    })
    return selectedMedsCounter
}


getMedList().then(()=>{
    medCounter = drugList.map(drug =>({
        drug: {
            name: drug.name,
            type: drug.type
        },
        counter: 0
    }))
})

inputBox.onkeyup = function(){
    let result = []
    let input = inputBox.value
    if (input.length) {
        result = drugList.filter(drug => 
            (drug.name.toLowerCase()
            + drug.type.toLowerCase())
            .includes(input.toLowerCase()));
    }
    display(result)
}

function display(results) {
    resultBox.innerHTML = "";
    if(!results.length){
        return
    }
    const resultList = document.createElement("ul");
    results.forEach(drug => {
        const listElement = document.createElement("li");
        listElement.textContent = drugToString(drug) ;
        resultList.appendChild(listElement);
    });
    resultBox.appendChild(resultList);
}

function findDrug(drugString){
    return drugList.find(drug =>{
        return drugToString(drug)===(drugString)
    })
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
    //Only update drugs counter if it's already added 
    if (groupedItems[drugType].includes(drugName)) {
        ulElement.querySelectorAll("li")
        .forEach(element =>{
            if (element.textContent.includes(drugName)) {
                element.textContent = drugCounterString(drugCounterObj)
            }
        })
        return
    }
        //Add new drug to its corresponding group 
        groupedItems[drugType].push(drugName)
        selectedDrugs.add(drug)
        const listElement = document.createElement("li")
        listElement.textContent = drugCounterString(drugCounterObj)
        listElement.classList.add("selected-item")
        ulElement.appendChild(listElement)
        selectedBox.appendChild(ulElement)
    
}

function displayGroupedItems(drugCounterObj){
    const drug = drugCounterObj.drug
    const drugType = drug.type
    let ulElement
    //IF new type
    if (!groupedItems[drugType]) {
        //create new ul for the new group
        ulElement = createNewGroup(drug)
        
    }else{
        //get the ul respresenting the group
        ulElement = selectedBox.querySelector(`.${drugType}`)
    }
    updateDrugGroup(ulElement, drugCounterObj)

}

resultBox.addEventListener("click", function(event){
    const element = event.target.textContent
    const drug = findDrug(element) 
    const dco = findDrugCounterObject(drug)
    dco.counter ++
    console.log(dco);
    // console.log(medCounter);
    displayGroupedItems(dco)
    inputBox.value = ''
    display([])   

})

async function submitItems(){
    const date = dateInput.value
    console.log(JSON.stringify({
        saveDate: date,
        drugCounterList: getSelectedMedsCounter()
    }));
    // await fetch(drugsUrl,{
    //     method:"POST",
    //     headers:{'Content-Type': 'application/json'},
    //     body: JSON.stringify({
    //         saveDate: date,
    //         drugCounterList: medCounter
    //     })
    // })
}


