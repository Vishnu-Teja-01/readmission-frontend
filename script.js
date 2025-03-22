// Mobile menu toggle
document.querySelector('.hamburger').addEventListener('click', () => {
    document.querySelector('.nav-list').classList.toggle('active');
});

// Navigation function
function navigateTo(page) {
    window.location.href = page;
}

// Calculate days since joining from date
function calculateDaysSinceJoining(joiningDate) {
    const today = new Date('2025-03-21');
    const join = new Date(joiningDate);
    const diffTime = today - join;
    const days = Math.max(0, Math.floor(diffTime / (1000 * 60 * 60 * 24)));
    if (days > 365) {
        console.warn(`Unrealistic days since joining (${days} days). Capping at 365 days.`);
        return 365;
    }
    return days;
}

// Function to validate blood pressure
function validateBloodPressure(bp) {
    const bpPattern = /^\d+\/\d+$/; // e.g., "120/80"
    if (!bpPattern.test(bp)) {
        return { valid: false, message: 'Please enter blood pressure in the format "systolic/diastolic" (e.g., 120/80).' };
    }

    const [systolic, diastolic] = bp.split('/').map(Number);
    if (systolic < 70 || systolic > 200) {
        return { valid: false, message: 'Systolic blood pressure must be between 70 and 200 mmHg.' };
    }
    if (diastolic < 40 || diastolic > 120) {
        return { valid: false, message: 'Diastolic blood pressure must be between 40 and 120 mmHg.' };
    }
    if (systolic <= diastolic) {
        return { valid: false, message: 'Systolic blood pressure must be greater than diastolic blood pressure.' };
    }

    return { valid: true };
}

// Patient Data Form
if (document.getElementById('patientForm')) {
    document.getElementById('patientForm').addEventListener('submit', (e) => {
        e.preventDefault();

        // Validate blood pressure
        const bloodPressure = document.getElementById('bloodPressure').value;
        const bpValidation = validateBloodPressure(bloodPressure);
        if (!bpValidation.valid) {
            alert(bpValidation.message);
            return;
        }

        const patientData = {
            id: document.getElementById('patientId').value,
            name: document.getElementById('name').value,
            joiningDate: document.getElementById('joiningDate').value,
            bloodPressure: bloodPressure,
            condition: document.getElementById('condition').value,
            age: parseInt(document.getElementById('age').value),
            chronicDiseaseCount: parseInt(document.getElementById('chronicDiseaseCount').value) || 0,
            lengthOfStay: parseInt(document.getElementById('lengthOfStay').value) || 0,
            emergencyVisit: parseInt(document.getElementById('emergencyVisit').value) || 0,
            inpatientVisit: parseInt(document.getElementById('inpatientVisit').value) || 0,
            outpatientVisit: parseInt(document.getElementById('outpatientVisit').value) || 0,
            bmi: parseFloat(document.getElementById('bmi').value) || 0,
            heartRate: parseFloat(document.getElementById('heartRate').value) || 0,
            respiratoryRate: parseFloat(document.getElementById('respiratoryRate').value) || 0,
            temperature: parseFloat(document.getElementById('temperature').value) || 0,
            hemoglobin: parseFloat(document.getElementById('hemoglobin').value) || 0,
            serumSodium: parseFloat(document.getElementById('serumSodium').value) || 0,
            serumCreatinine: parseFloat(document.getElementById('serumCreatinine').value) || 0,
            bnp: parseFloat(document.getElementById('bnp').value) || 0,
            ntProbnp: parseFloat(document.getElementById('ntProbnp').value) || 0,
            cardiacTroponin: parseFloat(document.getElementById('cardiacTroponin').value) || 0,
            aceInhibitors: parseInt(document.getElementById('aceInhibitors').value) || 0,
            arbs: parseInt(document.getElementById('arbs').value) || 0,
            betaBlockers: parseInt(document.getElementById('betaBlockers').value) || 0,
            diuretics: parseInt(document.getElementById('diuretics').value) || 0,
            totalMedicine: parseInt(document.getElementById('totalMedicine').value) || 0,
            dischargeDisposition: document.getElementById('dischargeDisposition').value,
            gender: document.getElementById('gender').value,
            race: document.getElementById('race').value,
            diabetesMellitus: document.getElementById('diabetesMellitus').value,
            chronicKidneyDisease: document.getElementById('chronicKidneyDisease').value,
            anemia: document.getElementById('anemia').value,
            depression: document.getElementById('depression').value,
            copd: document.getElementById('copd').value
        };

        let patients = JSON.parse(localStorage.getItem('patients') || '[]');
        const existingIndex = patients.findIndex(p => p.id === patientData.id);
        if (existingIndex !== -1) {
            patients[existingIndex] = patientData;
        } else {
            patients.push(patientData);
        }
        localStorage.setItem('patients', JSON.stringify(patients));

        const saveMessage = document.getElementById('saveMessage');
        saveMessage.style.display = 'block';
        setTimeout(() => saveMessage.style.display = 'none', 3000);

        document.getElementById('patientForm').reset();
    });
}

// Risk Assessment Form
if (document.getElementById('riskForm')) {
    // Populate patient select dropdown
    const patientSelect = document.getElementById('patientSelect');
    let patients = JSON.parse(localStorage.getItem('patients') || '[]');
    patients.forEach(patient => {
        const option = document.createElement('option');
        option.value = patient.id;
        option.textContent = `${patient.name} (${patient.id})`;
        patientSelect.appendChild(option);
    });

    document.getElementById('riskForm').addEventListener('submit', async (e) => {
        e.preventDefault();

        // Collect form data
        const formData = {
            name: document.getElementById('name').value,
            age: parseInt(document.getElementById('age').value),
            joiningDate: document.getElementById('joiningDate').value,
            condition: document.getElementById('condition').value,
            bloodPressure: document.getElementById('bloodPressure').value,
            chronicDiseaseCount: parseInt(document.getElementById('chronicDiseaseCount').value) || 0,
            lengthOfStay: parseInt(document.getElementById('lengthOfStay').value) || 0,
            emergencyVisit: parseInt(document.getElementById('emergencyVisit').value) || 0,
            inpatientVisit: parseInt(document.getElementById('inpatientVisit').value) || 0,
            outpatientVisit: parseInt(document.getElementById('outpatientVisit').value) || 0,
            bmi: parseFloat(document.getElementById('bmi').value) || 0,
            heartRate: parseFloat(document.getElementById('heartRate').value) || 0,
            respiratoryRate: parseFloat(document.getElementById('respiratoryRate').value) || 0,
            temperature: parseFloat(document.getElementById('temperature').value) || 0,
            hemoglobin: parseFloat(document.getElementById('hemoglobin').value) || 0,
            serumSodium: parseFloat(document.getElementById('serumSodium').value) || 0,
            serumCreatinine: parseFloat(document.getElementById('serumCreatinine').value) || 0,
            bnp: parseFloat(document.getElementById('bnp').value) || 0,
            ntProbnp: parseFloat(document.getElementById('ntProbnp').value) || 0,
            cardiacTroponin: parseFloat(document.getElementById('cardiacTroponin').value) || 0,
            aceInhibitors: parseInt(document.getElementById('aceInhibitors').value) || 0,
            arbs: parseInt(document.getElementById('arbs').value) || 0,
            betaBlockers: parseInt(document.getElementById('betaBlockers').value) || 0,
            diuretics: parseInt(document.getElementById('diuretics').value) || 0,
            totalMedicine: parseInt(document.getElementById('totalMedicine').value) || 0,
            dischargeDisposition: document.getElementById('dischargeDisposition').value,
            gender: document.getElementById('gender').value,
            race: document.getElementById('race').value,
            diabetesMellitus: document.getElementById('diabetesMellitus').value,
            chronicKidneyDisease: document.getElementById('chronicKidneyDisease').value,
            anemia: document.getElementById('anemia').value,
            depression: document.getElementById('depression').value,
            copd: document.getElementById('copd').value
        };

        // Validate inputs
        if (!formData.name || isNaN(formData.age) || !formData.joiningDate || !formData.condition || !formData.bloodPressure) {
            alert('Please fill in all required fields correctly.');
            return;
        }

        // Validate blood pressure
        const bpValidation = validateBloodPressure(formData.bloodPressure);
        if (!bpValidation.valid) {
            alert(bpValidation.message);
            return;
        }

        try {
            // Send data to Flask backend
            const response = await fetch('http://localhost:5000/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const prediction = await response.json();

            // Update Result
            const result = document.getElementById('riskResult');
            result.style.display = 'block';
            document.getElementById('riskScore').innerHTML = `Risk Level: <strong>${prediction.riskLevel}</strong> (Probability: ${prediction.probability.toFixed(2)})`;
            document.getElementById('featureImportance').innerHTML = `
                <p><span>Age:</span> ${prediction.features.Age}</p>
                <p><span>Condition:</span> ${prediction.features.Condition}</p>
                <p><span>Days Since Joining:</span> ${prediction.features.DaysSinceJoining} (${prediction.daysSinceJoining} days)</p>
                <p><span>Blood Pressure:</span> ${prediction.features.BloodPressure}</p>
            `;
            document.getElementById('recommendation').innerHTML = prediction.riskLevel === 'High' 
                ? 'Recommendation: Immediate follow-up care required.' 
                : prediction.riskLevel === 'Moderate' 
                ? 'Recommendation: Schedule follow-up within 7 days.' 
                : 'Recommendation: Monitor and follow standard care guidelines.';

            // Update Gauge
            const needle = document.getElementById('gaugeNeedle');
            const angle = (prediction.probability * 180) - 90;
            needle.style.transform = `translateX(-50%) rotate(${angle}deg)`;

            // Add to History
            const historyList = document.getElementById('historyList');
            const timestamp = new Date().toLocaleString();
            const listItem = document.createElement('li');
            listItem.textContent = `${timestamp} - Risk: ${prediction.riskLevel} (Prob: ${prediction.probability.toFixed(2)}, Name: ${formData.name}, Age: ${formData.age}, Condition: ${formData.condition}, Days: ${prediction.daysSinceJoining}, BP: ${formData.bloodPressure})`;
            historyList.insertBefore(listItem, historyList.firstChild);
        } catch (error) {
            console.error('Error predicting risk:', error);
            alert('An error occurred while predicting the risk. Please try again.');
        }
    });
}

// Retrieve Patient Data
function retrievePatientData() {
    const patientId = document.getElementById('patientSelect').value;
    if (!patientId) return;

    const patients = JSON.parse(localStorage.getItem('patients') || '[]');
    const patient = patients.find(p => p.id === patientId);
    if (patient) {
        document.getElementById('name').value = patient.name;
        document.getElementById('age').value = patient.age;
        document.getElementById('joiningDate').value = patient.joiningDate;
        document.getElementById('condition').value = patient.condition;
        document.getElementById('bloodPressure').value = patient.bloodPressure;
        document.getElementById('chronicDiseaseCount').value = patient.chronicDiseaseCount || 0;
        document.getElementById('lengthOfStay').value = patient.lengthOfStay || 0;
        document.getElementById('emergencyVisit').value = patient.emergencyVisit || 0;
        document.getElementById('inpatientVisit').value = patient.inpatientVisit || 0;
        document.getElementById('outpatientVisit').value = patient.outpatientVisit || 0;
        document.getElementById('bmi').value = patient.bmi || 0;
        document.getElementById('heartRate').value = patient.heartRate || 0;
        document.getElementById('respiratoryRate').value = patient.respiratoryRate || 0;
        document.getElementById('temperature').value = patient.temperature || 0;
        document.getElementById('hemoglobin').value = patient.hemoglobin || 0;
        document.getElementById('serumSodium').value = patient.serumSodium || 0;
        document.getElementById('serumCreatinine').value = patient.serumCreatinine || 0;
        document.getElementById('bnp').value = patient.bnp || 0;
        document.getElementById('ntProbnp').value = patient.ntProbnp || 0;
        document.getElementById('cardiacTroponin').value = patient.cardiacTroponin || 0;
        document.getElementById('aceInhibitors').value = patient.aceInhibitors || 0;
        document.getElementById('arbs').value = patient.arbs || 0;
        document.getElementById('betaBlockers').value = patient.betaBlockers || 0;
        document.getElementById('diuretics').value = patient.diuretics || 0;
        document.getElementById('totalMedicine').value = patient.totalMedicine || 0;
        document.getElementById('dischargeDisposition').value = patient.dischargeDisposition || 'Home';
        document.getElementById('gender').value = patient.gender || 'Male';
        document.getElementById('race').value = patient.race || 'White';
        document.getElementById('diabetesMellitus').value = patient.diabetesMellitus || 'DM';
        document.getElementById('chronicKidneyDisease').value = patient.chronicKidneyDisease || 'CKD';
        document.getElementById('anemia').value = patient.anemia || 'Anemia';
        document.getElementById('depression').value = patient.depression || 'Depression';
        document.getElementById('copd').value = patient.copd || 'COPD';
    }
}

// Download Report
function downloadReport() {
    const result = document.getElementById('riskResult').innerHTML;
    const blob = new Blob([`<html><body><h1>Risk Assessment Report</h1>${result}</body></html>`], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'Risk_Assessment_Report.pdf';
    link.click();
}

// Clear History
function clearHistory() {
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = '';
}

// Provider Form
if (document.getElementById('providerForm')) {
    document.getElementById('providerForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const providerMessage = document.getElementById('providerMessage');
        providerMessage.style.display = 'block';
        setTimeout(() => providerMessage.style.display = 'none', 3000);
        document.getElementById('providerForm').reset();
    });
}

// Contact Form
if (document.getElementById('contactForm')) {
    document.getElementById('contactForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const contactMessage = document.getElementById('contactMessage');
        contactMessage.style.display = 'block';
        setTimeout(() => contactMessage.style.display = 'none', 3000);
        document.getElementById('contactForm').reset();
    });
}

// Accordion for Resources and Caregivers
if (document.querySelector('.accordion')) {
    document.querySelectorAll('.accordion-item h3').forEach(item => {
        item.addEventListener('click', () => {
            const content = item.nextElementSibling;
            const isOpen = content.style.display === 'block';
            document.querySelectorAll('.accordion-content').forEach(c => c.style.display = 'none');
            document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));
            if (!isOpen) {
                content.style.display = 'block';
                item.parentElement.classList.add('active');
            }
        });
    });
}

// Risk Assessment Form
if (document.getElementById('riskForm')) {
    // Populate patient select dropdown
    const patientSelect = document.getElementById('patientSelect');
    let patients = JSON.parse(localStorage.getItem('patients') || '[]');
    patients.forEach(patient => {
        const option = document.createElement('option');
        option.value = patient.id;
        option.textContent = `${patient.name} (${patient.id})`;
        patientSelect.appendChild(option);
    });

    document.getElementById('riskForm').addEventListener('submit', async (e) => {
        e.preventDefault();

        // Collect form data
        const formData = {
            name: document.getElementById('name').value,
            age: parseInt(document.getElementById('age').value),
            joiningDate: document.getElementById('joiningDate').value,
            condition: document.getElementById('condition').value,
            bloodPressure: document.getElementById('bloodPressure').value,
            chronicDiseaseCount: parseInt(document.getElementById('chronicDiseaseCount').value) || 0,
            lengthOfStay: parseInt(document.getElementById('lengthOfStay').value) || 0,
            emergencyVisit: parseInt(document.getElementById('emergencyVisit').value) || 0,
            inpatientVisit: parseInt(document.getElementById('inpatientVisit').value) || 0,
            outpatientVisit: parseInt(document.getElementById('outpatientVisit').value) || 0,
            bmi: parseFloat(document.getElementById('bmi').value) || 0,
            heartRate: parseFloat(document.getElementById('heartRate').value) || 0,
            respiratoryRate: parseFloat(document.getElementById('respiratoryRate').value) || 0,
            temperature: parseFloat(document.getElementById('temperature').value) || 0,
            hemoglobin: parseFloat(document.getElementById('hemoglobin').value) || 0,
            serumSodium: parseFloat(document.getElementById('serumSodium').value) || 0,
            serumCreatinine: parseFloat(document.getElementById('serumCreatinine').value) || 0,
            bnp: parseFloat(document.getElementById('bnp').value) || 0,
            ntProbnp: parseFloat(document.getElementById('ntProbnp').value) || 0,
            cardiacTroponin: parseFloat(document.getElementById('cardiacTroponin').value) || 0,
            aceInhibitors: parseInt(document.getElementById('aceInhibitors').value) || 0,
            arbs: parseInt(document.getElementById('arbs').value) || 0,
            betaBlockers: parseInt(document.getElementById('betaBlockers').value) || 0,
            diuretics: parseInt(document.getElementById('diuretics').value) || 0,
            totalMedicine: parseInt(document.getElementById('totalMedicine').value) || 0,
            dischargeDisposition: document.getElementById('dischargeDisposition').value,
            gender: document.getElementById('gender').value,
            race: document.getElementById('race').value,
            diabetesMellitus: document.getElementById('diabetesMellitus').value,
            chronicKidneyDisease: document.getElementById('chronicKidneyDisease').value,
            anemia: document.getElementById('anemia').value,
            depression: document.getElementById('depression').value,
            copd: document.getElementById('copd').value
        };

        // Validate inputs
        if (!formData.name || isNaN(formData.age) || !formData.joiningDate || !formData.condition || !formData.bloodPressure) {
            alert('Please fill in all required fields correctly.');
            return;
        }

        // Validate blood pressure
        const bpValidation = validateBloodPressure(formData.bloodPressure);
        if (!bpValidation.valid) {
            alert(bpValidation.message);
            return;
        }

        try {
            // Send data to Flask backend
            const response = await fetch('http://localhost:5000/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            // Check if the response is OK
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'An error occurred while predicting the risk.');
            }

            const prediction = await response.json();

            // Update Result
            const result = document.getElementById('riskResult');
            result.style.display = 'block';
            document.getElementById('riskScore').innerHTML = `Risk Level: <strong>${prediction.riskLevel}</strong> (Probability: ${prediction.probability.toFixed(2)})`;
            document.getElementById('featureImportance').innerHTML = `
                <p><span>Age:</span> ${prediction.features.Age}</p>
                <p><span>Condition:</span> ${prediction.features.Condition}</p>
                <p><span>Days Since Joining:</span> ${prediction.features.DaysSinceJoining} (${prediction.daysSinceJoining} days)</p>
                <p><span>Blood Pressure:</span> ${prediction.features.BloodPressure}</p>
            `;
            document.getElementById('recommendation').innerHTML = prediction.riskLevel === 'High' 
                ? 'Recommendation: Immediate follow-up care required.' 
                : prediction.riskLevel === 'Moderate' 
                ? 'Recommendation: Schedule follow-up within 7 days.' 
                : 'Recommendation: Monitor and follow standard care guidelines.';

            // Update Gauge
            const needle = document.getElementById('gaugeNeedle');
            const angle = (prediction.probability * 180) - 90;
            needle.style.transform = `translateX(-50%) rotate(${angle}deg)`;

            // Add to History
            const historyList = document.getElementById('historyList');
            const timestamp = new Date().toLocaleString();
            const listItem = document.createElement('li');
            listItem.textContent = `${timestamp} - Risk: ${prediction.riskLevel} (Prob: ${prediction.probability.toFixed(2)}, Name: ${formData.name}, Age: ${formData.age}, Condition: ${formData.condition}, Days: ${prediction.daysSinceJoining}, BP: ${formData.bloodPressure})`;
            historyList.insertBefore(listItem, historyList.firstChild);
        } catch (error) {
            console.error('Error predicting risk:', error);
            alert(error.message || 'An error occurred while predicting the risk. Please try again.');
        }
    });
}