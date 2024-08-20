function tsvToJson(tsv) {
    const lines = tsv.split('\n');
    const headers = lines[0].split('\t');
    const result = [];

    for (let i = 1; i < lines.length; i++) {
        const obj = {};
        const currentline = lines[i].split('\t');

        for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
        }

        result.push(obj);
    }

    return result;
}

function calculateTotals(data) {
    const totals = {};

    for (let i = 0; i < data.length; i++) {
        const item = data[i];

        if (!totals[item.CodeName]) {
            totals[item.CodeName] = {};
            totals[item.CodeName]["Name"] = item.Name;
            totals[item.CodeName]["Quantity"] = 0;
        }

        let quantity = parseInt(item.Quantity, 10);

        if (item["Crated?"] === "true" && item["Per Crate"] === "3") {
            quantity *= 3;
        }

        totals[item.CodeName]["Quantity"] += quantity;
    }

    return totals;
}

document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInput');
    const fileContent = document.getElementById('fileContent');

    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
            const data = tsvToJson(event.target.result);
            console.log(data);
            const totals = calculateTotals(data);
            
            // Write totals to the DOM, sorted by quantity, one per line
            const sortedTotals = Object.values(totals).sort((a, b) => b.Quantity - a.Quantity);
            fileContent.innerHTML = sortedTotals.map((item) => `${item.Name}: ${item.Quantity}`).join('<br />');
        };

        reader.readAsText(file);
    });
});