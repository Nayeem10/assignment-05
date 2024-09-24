tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                lexend: ["Lexend", "sans-serif"],
            },
            colors: {
                parrot: "#B4F461",
                "dark-0": "#111111B3",

            }
        }
    }
}

function toggle(sectionID1, sectionID2) {
    document.getElementById(sectionID1).classList.add('hidden');
    document.getElementById(sectionID2).classList.remove('hidden');
}

document.getElementById('button-container').addEventListener('click', function (event) {
    const clickedButton = event.target;
    if (clickedButton.tagName !== 'BUTTON') {
        return;
    }
    const childs = document.getElementById('button-container').children;
    for (const child of childs) {
        child.classList.remove('bg-parrot', 'hover:bg-[#92e12c]');
    }
    clickedButton.classList.add('bg-parrot', 'hover:bg-[#92e12c]');

    clickedButton === childs[0] ? toggle('history', 'donations') : toggle('donations', 'history');
})

document.getElementById('donate-noakhali').addEventListener('click', calculateDonation);
document.getElementById('donate-feni').addEventListener('click', calculateDonation);
document.getElementById('donate-quota').addEventListener('click', calculateDonation);

function convert(donatedAmount) {
    for(const alpha of donatedAmount){
        if(alpha < '0' || alpha > '9') return 0; 
    }
    const amount = parseFloat(donatedAmount);
    if (isNaN(amount) || amount <= 0) return 0;
    return amount;
}

function calculateDonation(event) {
    const clickedButton = event.target;
    const parentSection = clickedButton.parentElement;
    const previousDonations = parentSection.children[0].children[1].innerText;
    const donatedAmount = parentSection.children[3].value;
    const amount = convert(donatedAmount);

    const currentBalance = document.getElementById('current-balance');
    const balance = convert(currentBalance.innerText);
    parentSection.children[3].value = '';
    if (!amount || balance < amount) {
        alert('Invalid Donation Amount');
        return;
    }
    parentSection.children[0].children[1].innerText = parseFloat(previousDonations) + amount;
    currentBalance.innerText = balance - amount;

    let historyDetails = amount + ' Taka is Donated for ';

    if (clickedButton.id === 'donate-feni') {
        historyDetails += 'Flood Relief in Feni, Bangladesh';
    }else if (clickedButton.id === 'donate-noakhali') {
        historyDetails += 'Flood Relief in Noakhali, Bangladesh';
    }else if(clickedButton.id === 'donate-quota'){
        historyDetails += 'Aid for Injured in the Quota Movement, Bangladesh'
    }

    const newHistory = document.createElement('div');
    const header = document.createElement('h2');
    header.innerText = historyDetails;
    const para = document.createElement('p');
    para.innerText = 'Date: ' + new Date();

    header.classList.add('text-xl', 'font-bold', 'my-5');
    para.classList.add('font-[300]', 'text-dark-0', 'mb-5');
    newHistory.appendChild(header);
    newHistory.appendChild(para);
    newHistory.classList.add('border', 'p-6', 'rounded-xl', 'shadow-xl')
    document.getElementById('history').appendChild(newHistory);

    const modal = document.getElementById('my-modal');
    modal.showModal();
}