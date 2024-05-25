let patients = [];

// Function to add a new patient
function addPatient() {
    const id = document.getElementById('patient_id').value;
    const name = document.getElementById('patientName').value;
    const age = document.getElementById('patientAge').value;
    const amount = document.getElementById('amount').value;
    const date = document.getElementById('date').value;
    const procedure=document.getElementById("procedure").value; 
    const patient = { id, name, age,procedure, amount, date };
    
    patients.push(patient);
    displayPatients();
    document.getElementById('patientForm').reset();
}

// Function to display patients in the list
function displayPatients() {
    const patientList = document.getElementById('patientList');
    patientList.innerHTML = '';
    patients.forEach((patient, index) => {
        const listItem = document.createElement('div');
        listItem.innerHTML = `
            <p><strong>Patient ID:</strong> ${patient.id}</p>
            <p><strong>Name:</strong> ${patient.name}</p>
            <p><strong>Age:</strong> ${patient.age}</p>
            <p><strong>Amount:</strong> ${patient.amount}</p>
            <p><strong>Amount:</strong> ${patient.procedure}</p>
            <p><strong>Date:</strong> ${patient.date}</p>
            <button onclick="editPatient(${index})">Edit</button>
            <button onclick="deletePatient(${index})">Delete</button>
        `;
        patientList.appendChild(listItem);
    });w
}

// Function to delete a patient
function deletePatient(index) {
    patients.splice(index, 1);
    displayPatients();
}

// Function to edit a patient
function editPatient(index) {
    const patient = patients[index];
    const newID = prompt('Enter new patient ID:', patient.id);
    const newName = prompt('Enter new name:', patient.name);
    const newprocedure = prompt('Enter new procedure:', patient.procedure);
    const newAge = prompt('Enter new age:', patient.age);
    const newAmount = prompt('Enter new amount:', patient.amount);
    const newDate = prompt('Enter new date:', patient.date);
    if (newID !== null && newName !== null && newAge !== null && newAmount !== null && newDate !== null) {
        patients[index] = { id: newID, name: newName, age: newAge, amount: newAmount, date: newDate };
        displayPatients();
    }
}

// Function to download patient information in text format
function downloadPatientInfo() {
    let textContent = 'Patient Information:\n\n';
    patients.forEach(patient => {
        textContent += `Patient ID: ${patient.id}\n`;
        textContent += `Name: ${patient.name}\n`;
        textContent += `procedure: ${patient.procedure}\n`;
        textContent += `Age: ${patient.age}\n`;
        textContent += `Amount: ${patient.amount}\n`;
        textContent += `Date: ${patient.date}\n\n`;
    });

    // Create a Blob containing the text content
    const blob = new Blob([textContent], { type: 'text/plain' });

    // Create a temporary anchor element
    const a = document.createElement('a');

    // Set the anchor element's href attribute to the Blob object URL
    a.href = window.URL.createObjectURL(blob);

    // Set the anchor element's download attribute to specify the filename
    a.download = 'patient_info.txt';

    // Append the anchor element to the document body
    document.body.appendChild(a);

    // Programmatically trigger a click event on the anchor element
    a.click();

    // Remove the anchor element from the document body
    document.body.removeChild(a);
}