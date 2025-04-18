function exportTableToCSV() {
    var table = document.getElementById("dataTable");
    var csv = [];
    var headers = [];
    var rows = table.querySelectorAll("tr");
    
    // Extract headers (skip "Actions" and "Recurring")
    var headerCells = rows[0].querySelectorAll("th");
    for (var i = 0; i < headerCells.length; i++) {
        var headerText = headerCells[i].innerText.trim();
        if (headerText !== "Actions" && headerText !== "Recurring") {
            headers.push(headerText);
        }
    }
    csv.push(headers.join(","));
    
    // Extract rows (skip "Actions" and "Recurring" columns)
    for (var i = 1; i < rows.length; i++) {
        var row = [];
        var cols = rows[i].querySelectorAll("td");
        
        for (var j = 0; j < cols.length; j++) {
            var colText = cols[j].innerText.trim();
            
            // Skip "Actions" and "Recurring" columns
            var headerText = headerCells[j]?.innerText.trim();
            if (headerText === "Actions" || headerText === "Recurring") {
                continue;
            }
            
            // Fix currency symbol (replace â‚¹ with ₹)
            if (headerText === "Amount") {
                colText = colText.replace(/â‚¹/g, "₹");
            }
            
            row.push(colText);
        }
        
        csv.push(row.join(","));
    }
    
    // Trigger download
    var blob = new Blob([csv.join("\n")], { type: "text/csv" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "budget_data.csv";
    a.click();

    // Debug: Log the CSV content to console
    console.log("Generated CSV:", csv.join("\n"));
    
    // Trigger download
    downloadCSV(csv.join("\n"), "budget_data.csv");
}

function downloadCSV(csv, filename) {
    var blob = new Blob([csv], { type: "text/csv" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url); // Clean up
}
