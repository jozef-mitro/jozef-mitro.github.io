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

function calculateMissing(totals) {
    const missing = {};

    for (let i = 0; i < goals.length; i++) {
        const goal = goals[i];
        const total = totals[goal.CodeName] ? totals[goal.CodeName].Quantity : 0;
        const goalQuantity = parseInt(goal.Goal, 10);
        const missingQuantity = goalQuantity - total;

        if (missingQuantity > 0) {
            missing[goal.CodeName] = {};
            missing[goal.CodeName]["Name"] = goal.Name;
            missing[goal.CodeName]["Quantity"] = missingQuantity;
        }
    }

    return missing;
}

function calculateFactoryOrders(totals) {
    const factoryOrders = {};

    for (let i = 0; i < goals.length; i++) {
        const goal = goals[i];
        const total = totals[goal.CodeName] ? totals[goal.CodeName].Quantity : 0;
        const goalQuantity = parseInt(goal.Goal, 10);
        const missingQuantity = goalQuantity - total;

        if (missingQuantity > 0 && goal.Source === "Factory") {
            factoryOrders[goal.CodeName] = {};
            factoryOrders[goal.CodeName]["Name"] = goal.Name;
            factoryOrders[goal.CodeName]["Quantity"] = missingQuantity;
        }
    }

    return factoryOrders;
}

function calculateMPFBaccaeOrders(totals) {
    const mpfOrders = {};

    for (let i = 0; i < goals.length; i++) {
        const goal = goals[i];
        const total = totals[goal.CodeName] ? totals[goal.CodeName].Quantity : 0;
        const goalQuantity = parseInt(goal.Goal, 10);
        const missingQuantity = goalQuantity - total;

        if (missingQuantity > 0 && goal.Source === "MPF Baccae") {
            mpfOrders[goal.CodeName] = {};
            mpfOrders[goal.CodeName]["Name"] = goal.Name;
            mpfOrders[goal.CodeName]["Quantity"] = Math.ceil(missingQuantity / 9);
        }
    }

    return mpfOrders;
}

function calculateMPFPatridiaOrders(totals) {
    const mpfOrders = {};

    for (let i = 0; i < goals.length; i++) {
        const goal = goals[i];
        const total = totals[goal.CodeName] ? totals[goal.CodeName].Quantity : 0;
        const goalQuantity = parseInt(goal.Goal, 10);
        const missingQuantity = goalQuantity - total;

        if (missingQuantity > 0 && goal.Source === "MPF Patridia") {
            mpfOrders[goal.CodeName] = {};
            mpfOrders[goal.CodeName]["Name"] = goal.Name;
            mpfOrders[goal.CodeName]["Quantity"] = Math.ceil(missingQuantity / 9);
        }
    }

    return mpfOrders;
}

function calculateRefineryOrders(totals) {
    const refineryOrders = {};
    let additionalBmats = 0;
    let additionalEmats = 0;
    let additionalRmats = 0;
    let additionalHemats = 0;
    
    for (let i = 0; i < goals.length; i++) {
        const goal = goals[i];
        const total = totals[goal.CodeName] ? totals[goal.CodeName].Quantity : 0;
        const goalQuantity = parseInt(goal.Goal, 10);
        const missingQuantity = goalQuantity - total;
        const bmatCost = parseInt(goal.BMAT, 10) || 0;
        const ematCost = parseInt(goal.EMAT, 10) || 0;
        const rmatCost = parseInt(goal.RMAT, 10) || 0;
        const hematCost = parseInt(goal.HEMAT, 10) || 0;

        if (goal.Source === "Factory") {    
            additionalBmats += missingQuantity * bmatCost;
            additionalEmats += missingQuantity * ematCost;
            additionalRmats += missingQuantity * rmatCost;
            additionalHemats += missingQuantity * hematCost;
        } else if (goal.Source === "MPF Baccae" || goal.source === "MPF Patridia") {
            additionalBmats += Math.ceil(missingQuantity/9) * bmatCost;
            additionalEmats += Math.ceil(missingQuantity/9) * ematCost;
            additionalRmats += Math.ceil(missingQuantity/9) * rmatCost;
            additionalHemats += Math.ceil(missingQuantity/9) * hematCost;
        }
    }

    console.log(additionalBmats);
    console.log(additionalEmats);
    console.log(additionalRmats);
    console.log(additionalHemats);

    for (let i = 0; i < goals.length; i++) {
        const goal = goals[i];

        if (goal.Source === "Refinery") {
            console.log(goal);
            const total = totals[goal.CodeName] ? totals[goal.CodeName].Quantity : 0;
            const goalQuantity = parseInt(goal.Goal, 10);
            let missingQuantity = goalQuantity - total;
            console.log(missingQuantity);

            switch (goal.CodeName) {
                case "Cloth":
                    missingQuantity += Math.ceil(additionalBmats/100);
                    break;
                case "Explosive":
                    missingQuantity += Math.ceil(additionalEmats/20);
                    break;
                case "Wood":
                    missingQuantity += Math.ceil(additionalRmats/20);
                    break;
                case "HeavyExplosive":
                    missingQuantity += Math.ceil(additionalHemats/30);
                    break;
            }
    
            if (missingQuantity > 0) {
                refineryOrders[goal.CodeName] = {};
                refineryOrders[goal.CodeName]["Name"] = goal.Name;
                refineryOrders[goal.CodeName]["Quantity"] = missingQuantity;
            }
        }
    }

    return refineryOrders;
}

document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInput');
    const fileContent = document.getElementById('fileContent');

    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
            const data = tsvToJson(event.target.result);
            const totals = calculateTotals(data);

            // Write totals to the DOM, sorted by quantity, one per line
            // const sortedTotals = Object.values(totals).sort((a, b) => b.Quantity - a.Quantity);
            // fileContent.innerHTML = sortedTotals.map((item) => `${item.Name}: ${item.Quantity}`).join('<br />');
            // fileContent.innerHTML += '<br /><br />';

            const missing = calculateMissing(totals);
            const sortedMissing = Object.values(missing).sort((a, b) => b.Quantity - a.Quantity);
            fileContent.innerHTML += sortedMissing.map((item) => `${item.Name}: ${item.Quantity}`).join('<br />');
            
            // Factory goals 
            const factoryOrders = calculateFactoryOrders(totals);
            const sortedFactoryOrders = Object.values(factoryOrders).sort((a, b) => b.Quantity - a.Quantity);
            
            fileContent.innerHTML += '<h2>Factory Orders (Crates)</h2>';
            fileContent.innerHTML += sortedFactoryOrders.map((item) => `${item.Name}: ${item.Quantity}`).join('<br />');

            // MPF goals
            // Baccae
            const mpfBaccaeOrders = calculateMPFBaccaeOrders(totals);
            const sortedMPFBaccaeOrders = Object.values(mpfBaccaeOrders).sort((a, b) => b.Quantity - a.Quantity);
            fileContent.innerHTML += '<h2>MPF Baccae Orders (Queues)</h2>';
            fileContent.innerHTML += sortedMPFBaccaeOrders.map((item) => `${item.Name}: ${item.Quantity}`).join('<br />');
            // Patridia
            const mpfPatridiaOrders = calculateMPFPatridiaOrders(totals);
            const sortedMPFPatridiaOrders = Object.values(mpfPatridiaOrders).sort((a, b) => b.Quantity - a.Quantity);
            fileContent.innerHTML += '<h2>MPF Patridia Orders (Queues)</h2>';
            fileContent.innerHTML += sortedMPFPatridiaOrders.map((item) => `${item.Name}: ${item.Quantity}`).join('<br />');

            // Refinery Goals
            const refineryOrders = calculateRefineryOrders(totals, factoryOrders, mpfBaccaeOrders, mpfPatridiaOrders);
            const sortedRefineryOrders = Object.values(refineryOrders).sort((a, b) => b.Quantity - a.Quantity);
            fileContent.innerHTML += '<h2>Refinery Orders (Queues)</h2>';
            fileContent.innerHTML += sortedRefineryOrders.map((item) => `${item.Name}: ${item.Quantity}`).join('<br />');
        };

        reader.readAsText(file);
    });
});