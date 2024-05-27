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

async function getMedList(){
    return fetchData("http://localhost:8081/drugs");
}

// A map to keep track of each item's selection counter
const itemCounters = {};


let meds; // Declare meds as a global variable

async function initializeList() {
    meds = await getMedList(); // Assign the value of meds in initializeList
    meds.forEach(med => {
        
        itemCounters[med.name] = 0;
    
    });
}


// Function to create and display the filtered list
function displayList(filteredItems) {
    const container = document.getElementById('list-container');
    
    // Clear the container before adding items
    container.innerHTML = '';
    
    // Hide the container if there are no filtered items
    if (filteredItems.length === 0) {
        container.classList.add('hidden');
        return;
    }
    
    // Show the container if there are filtered items
    container.classList.remove('hidden');
    
    filteredItems.forEach(item => {
        // Create a new div element for each item
        const itemElement = document.createElement('div');
        
        // Set the text and class for styling
        itemElement.textContent = `${item.name} (${item.type})`;
        itemElement.classList.add('list-item');
        
// Add a click event listener to handle item selection
itemElement.addEventListener('click', () => {
    const selectedItemName = item.name; // Retrieve the name of the selected item
    itemCounters[selectedItemName] += 1; // Increment the counter
    updateSelectedItems(); // Update the displayed selected items
    document.getElementById('search-input').value = ''; // Clear the search input
    container.classList.add('hidden'); // Hide the list container
});

        
        // Append the item to the container
        container.appendChild(itemElement);
    });
}

// Function to handle the search input
async function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    
    // Hide the list if the search term is empty
    if (searchTerm === '') {
        document.getElementById('list-container').classList.add('hidden');
        return;
    }

    const meds = await getMedList();
    const filteredItems = meds.filter(med => med.name.toLowerCase().includes(searchTerm));
    displayList(filteredItems);
}

// Function to update and display the selected items with their counters, grouped by type
function updateSelectedItems() {
    const container = document.getElementById('selected-items-container');
    
    // Clear the container before adding items
    container.innerHTML = '';
    
    // Group selected items by type
    const groupedItems = {};
    Object.keys(itemCounters).forEach(item => {
        if (itemCounters[item] > 0) {
            const itemType = meds.find(med => med.name === item).type;
            if (!groupedItems[itemType]) {
                groupedItems[itemType] = [];
            }
            groupedItems[itemType].push({ name: item, count: itemCounters[item] });
        }
    });
    
    // Display the grouped items
    Object.keys(groupedItems).forEach(type => {
        // Create a header for the type
        const typeHeader = document.createElement('div');
        typeHeader.textContent = type;
        typeHeader.classList.add('type-header');
        container.appendChild(typeHeader);
        
        // Create and append items under the type
        groupedItems[type].forEach(item => {
            const selectedItemElement = document.createElement('div');
            selectedItemElement.textContent = `${item.name}: ${item.count}`;
            selectedItemElement.classList.add('selected-item');
            container.appendChild(selectedItemElement);
        });
    });
}

// Add event listener to the search input to handle typing
document.getElementById('search-input').addEventListener('input', handleSearch);

// The index of the currently focused item in the search results
let focusedItemIndex = -1;

// Function to handle keyboard navigation and selection
function handleKeyboardEvent(event) {
    const container = document.getElementById('list-container');
    const items = container.querySelectorAll('.list-item');

    if (event.key === 'ArrowDown') {
        // Move focus down
        focusedItemIndex = Math.min(focusedItemIndex + 1, items.length - 1);
        updateFocus();
        event.preventDefault(); // Prevent page scrolling
    } else if (event.key === 'ArrowUp') {
        // Move focus up
        focusedItemIndex = Math.max(focusedItemIndex - 1, 0);
        updateFocus();
        event.preventDefault(); // Prevent page scrolling
    } else if (event.key === 'Enter') {
        // Select the focused item
        if (focusedItemIndex !== -1) {
            const selectedItem = items[focusedItemIndex];
            const selectedItemText = selectedItem.textContent;
            itemCounters[selectedItemText] += 1; // Increment the counter
            updateSelectedItems(); // Update the displayed selected items
            document.getElementById('search-input').value = ''; // Clear the search input
            container.classList.add('hidden'); // Hide the list container
            focusedItemIndex = -1; // Reset the focused item index
        }
    }
}

// Function to update the focus state of search results
function updateFocus() {
    const container = document.getElementById('list-container');
    const items = container.querySelectorAll('.list-item');

    items.forEach((item, index) => {
        if (index === focusedItemIndex) {
            item.classList.add('focused');
        } else {
            item.classList.remove('focused');
        }
    });
}

// Add event listeners for keyboard navigation and selection
document.addEventListener('keydown', handleKeyboardEvent);

// Function to send a POST request with selected items and date
function submitData() {
    const dateInput = document.getElementById('date-input').value;
    const url = `http://localhost:8081/items?date=${dateInput}`;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(itemCounters)
    };

    fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to submit data');
            }
            console.log('Data submitted successfully');
            // You can add further actions here if needed
        })
        .catch(error => {
            console.error('Error submitting data:', error.message);
        });
}



// Function to handle keyboard navigation within the search results
// Function to handle keyboard navigation within the search results
function handleSearchKeyboardEvent(event) {
const container = document.getElementById('list-container');
const items = container.querySelectorAll('.list-item');

if (event.key === 'Enter') {
const selectedItem = container.querySelector('.list-item:hover');
if (selectedItem) {
    const selectedItemText = selectedItem.textContent;
    itemCounters[selectedItemText] += 1; // Increment the counter
    updateSelectedItems(); // Update the displayed selected items
    document.getElementById('search-input').value = ''; // Clear the search input
    container.innerHTML = ''; // Clear the list container
    container.classList.add('hidden'); // Hide the list container
    document.getElementById('search-input').focus(); // Return focus to search input
    event.preventDefault(); // Prevent form submission
}
}
}

// Add event listener for keyboard navigation within search results
document.getElementById('list-container').addEventListener('keydown', handleSearchKeyboardEvent);

// Function to update and display the selected items with their counters, grouped by type
function updateSelectedItems() {
const container = document.getElementById('selected-items-container');

// Clear the container before adding items
container.innerHTML = '';

// Group selected items by type
const groupedItems = {};
Object.keys(itemCounters).forEach(item => {
if (itemCounters[item] > 0) {
    const itemType = meds.find(med => med.name === item).type;
    if (!groupedItems[itemType]) {
        groupedItems[itemType] = [];
    }
    groupedItems[itemType].push({ name: item, count: itemCounters[item] });
}
});

// Display the grouped items
Object.keys(groupedItems).forEach(type => {
// Create a header for the type
const typeHeader = document.createElement('div');
typeHeader.textContent = type;
typeHeader.classList.add('type-header');
container.appendChild(typeHeader);

// Create and append items under the type
groupedItems[type].forEach(item => {
    const selectedItemElement = document.createElement('div');
    selectedItemElement.textContent = `${item.name}: ${item.count}`;
    selectedItemElement.classList.add('selected-item');
    container.appendChild(selectedItemElement);
});
});
}




// Function to update the focus state of search results
function updateFocus() {
    const container = document.getElementById('list-container');
    const items = container.querySelectorAll('.list-item');

    items.forEach((item, index) => {
        if (index === focusedItemIndex) {
            item.classList.add('focused');
            item.focus(); // Ensure the item is focused
        } else {
            item.classList.remove('focused');
        }
    });
}

// Add event listener for keyboard navigation within search results
document.getElementById('list-container').addEventListener('keydown', handleSearchKeyboardEvent);


async function submitItems(){
    console.log(itemCounters)

        await fetch('http://localhost:8081/items', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        // body: JSON.stringify(itemCounters)
        body: (itemCounters)
    })
}





// Initialize the list of medicines
initializeList();