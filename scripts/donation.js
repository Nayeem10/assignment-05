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
