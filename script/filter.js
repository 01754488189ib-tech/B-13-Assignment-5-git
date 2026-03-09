const filterTap = (status) => {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            let issues = data.data;
            if (status !== 'all') {
                issues = issues.filter(issue => issue.status.toLowerCase() === status.toLowerCase());
            }
            displayIssues(issues);
        });
};

const displayIssues = (words) => {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";

    document.getElementById('totalStatus').innerText = words.length;

    words.forEach(word => {
        const card = document.createElement("div");

        const borderColor = word.status === 'open' ? 'border-green-500' : 'border-purple-500';

        card.className = `shadow-md rounded-lg border-r-5 border-t-5 ${borderColor} p-5 mb-5`;

        const borderClass = word.status === 'open' ? 'border-green-500' : 'border-purple-500';
        

        card.innerHTML = `
            
        `;
        wordContainer.appendChild(card);
    });
};

filterTap('all');