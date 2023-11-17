document.addEventListener('DOMContentLoaded', () => {
    const partiesContainer = document.getElementById('parties-container');
    const addPartyForm = document.getElementById('add-party-form');

    const fetchAndRenderParties = async () => {
        try {
            const response = await fetch('https://fsa-crud-2aa9294fe819.herokuapp.com/api/2109-CPU-RM-WEB-PT/parties');
            const data = await response.json();

            partiesContainer.innerHTML = '<h2>Parties</h2>';
            data.data.forEach(party => {
                const partyElement = document.createElement('div');
                partyElement.innerHTML = `
                    <p>Name: ${party.name}</p>
                    <p>Date: ${party.date}</p>
                    <p>Time: ${party.time}</p>
                    <p>Location: ${party.location}</p>
                    <p>Description: ${party.description}</p>
                    <button onclick="deleteParty(${party.id})">Delete</button>
                    <hr>
                `;
                partiesContainer.appendChild(partyElement);
            });
        } catch (error) {
            console.error('Error fetching parties:', error);
        }
    };

    const addNewParty = async (event) => {
        event.preventDefault();

        const partyName = document.getElementById('partyName').value;
        const partyDate = document.getElementById('partyDate').value;
        const partyTime = document.getElementById('partyTime').value;
        const partyLocation = document.getElementById('partyLocation').value;
        const partyDescription = document.getElementById('partyDescription').value;

        try {
            await fetch('https://fsa-crud-2aa9294fe819.herokuapp.com/api/2109-CPU-RM-WEB-PT/parties', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: partyName,
                    date: partyDate,
                    time: partyTime,
                    location: partyLocation,
                    description: partyDescription,
                }),
            });

            fetchAndRenderParties();

            addPartyForm.reset();
        } catch (error) {
            console.error('Error adding party:', error);
        }
    };

    window.deleteParty = async (partyId) => {
        try {
            await fetch(`https://fsa-crud-2aa9294fe819.herokuapp.com/api/2109-CPU-RM-WEB-PT/parties/${partyId}`, {
                method: 'DELETE',
            });

            fetchAndRenderParties();
        } catch (error) {
            console.error('Error deleting party:', error);
        }
    };

    addPartyForm.addEventListener('submit', addNewParty);

    fetchAndRenderParties();
});