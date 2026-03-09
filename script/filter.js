const removeActive = () => {
    const active = document.querySelectorAll(".lesson-btn");
    active.forEach(btn => btn.classList.remove("active"));
}

const filterTap = (status) => {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            removeActive();
            const clickBtn = document.getElementById(`tab-${status}`);
            clickBtn.classList.add('active');


            let issues = data.data;
            if (status !== 'all') {
                issues = issues.filter(issue => issue.status.toLowerCase() === status.toLowerCase());
            }
            displayIssues(issues);
        });
};

const handleDelete = async(id) => {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayWordDetails(data.data);
};

// {
//     "id": 2,
//     "title": "Add dark mode support",
//     "description": "Users are requesting a dark mode option. This would improve accessibility and user experience.",
//     "status": "open",
//     "labels": [
//         "enhancement",
//         "good first issue"
//     ],
//     "priority": "medium",
//     "author": "sarah_dev",
//     "assignee": "",
//     "createdAt": "2024-01-14T14:20:00Z",
//     "updatedAt": "2024-01-16T09:15:00Z"
// }

// {
//     "id": 1,
//     "title": "Fix navigation menu on mobile devices",
//     "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
//     "status": "open",
//     "labels": [
//         "bug",
//         "help wanted"
//     ],
//     "priority": "high",
//     "author": "john_doe",
//     "assignee": "jane_smith",
//     "createdAt": "2024-01-15T10:30:00Z",
//     "updatedAt": "2024-01-15T10:30:00Z"
// }

const displayWordDetails = (word) => {
    console.log(word);
    const detailsBox = document.getElementById("details-container");
    detailsBox.innerHTML = `
        <h2  class="font-bold text-3xl">${word.title}</h2>
                <br>
                <div class="flex gap-7">
                    <button class="${word.status === 'open' ? 'bg-green-500' : 'bg-purple-500'} btn text-white h-6 px-3 rounded-full shadow-lg">
                        ${word.status === 'open' ? 'Opened' : 'Closed'}
                    </button>
                    <li class="text-gray-500">Opened by ${word.author}</li>
                    <li class="text-gray-500">${word.createdAt}</li>
                </div>
                <br>
                <div class="flex flex-nowrap gap-2 w-full overflow-x-auto">
                    ${word.labels.map(label => {
                const labelColors = {
                    'bug': 'bg-[#EF444440] text-error-content',
                    'documentation': 'bg-[#4A00FF40]',
                    'duplicate': 'bg-[#A855F740] text-secondary-content',
                    'enhancement': 'bg-[#BBF7D040] text-accent-content',
                    'good first issue': 'bg-[#9CA3AF40] text-accent-content',
                    'help wanted': 'bg-[#FDE68A40] text-info-content'
                };
                const colorClass = labelColors[label.toLowerCase()] || 'bg-neutral text-neutral-content';
                return `<span class="px-3 py-1 rounded-full font-bold text-xs uppercase shadow-sm ${colorClass}">${label}</span>`;
            }).join('')}
                </div>
                <br>
                <br>
                <p class="text-gray-500">${word.description}</p>
                <br>
                <div class="w-11/12 bg-[#F8FAFC] flex gap-[20%] p-5 rounded-lg">
                    <div class="">
                        <p class="text-gray-500">Assignee:</p>
                        <h2 class="font-bold text-xl">${word.assignee}</h2>
                    </div>
                    <div class="">
                        <p class="text-gray-500">Priority:</p>
                        <button onclick="handleDelete(${word.id})" class="btn h-6 rounded-full px-3 text-error-content ${word.priority === 'high' ? 'bg-[#FEECEC] text-error-content' :
                word.priority === 'medium' ? 'bg-[#FFF6D1] text-warning-content' :
                    'bg-[#EEEFF2] text-base-600-content'}">${word.priority.toUpperCase()}</button>
                    </div>
                </div>
            </div>
            <div class="modal-action">
                <form method="dialog">
                    <button class="btn btn-primary rounded-full">Close</button>
                </form>
    `;
    document.getElementById("word_modal").showModal();
}

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
            <div class="flex flex-col rounded-lg w-full relative h-full bg-white shadow-sm p-5 ${borderClass}">
            
                <div class="flex items-center justify-between">
                    <button>
                        <img src="assets/${word.status === 'open' ? 'open-Status.png' : 'Closed- Status .png'}"
                        alt="${word.status}">
                    </button>

                    <button onclick="handleDelete(${word.id})" class="btn h-6 rounded-full px-3 text-error-content ${word.priority === 'high' ? 'bg-[#FEECEC] text-error-content' :
                word.priority === 'medium' ? 'bg-[#FFF6D1] text-warning-content' :
                    'bg-[#EEEFF2] text-base-600-content'}">${word.priority.toUpperCase()}</button>
                </div>
                <br>
                <h2 class="text-xl font-medium">${word.title}</h2>
                <br>
                <p class="text-gray-500">${word.description}</p>
                <br>

                <div class="flex flex-nowrap gap-2 w-full overflow-x-auto">
                    ${word.labels.map(label => {
                const labelColors = {
                    'bug': 'bg-[#EF444440] text-error-content',
                    'documentation': 'bg-[#4A00FF40]',
                    'duplicate': 'bg-[#A855F740] text-secondary-content',
                    'enhancement': 'bg-[#BBF7D040] text-accent-content',
                    'good first issue': 'bg-[#9CA3AF40] text-accent-content',
                    'help wanted': 'bg-[#FDE68A40] text-info-content'
                };
                const colorClass = labelColors[label.toLowerCase()] || 'bg-neutral text-neutral-content';
                return `<span class="px-3 py-1 rounded-full font-bold text-xs uppercase shadow-sm ${colorClass}">${label}</span>`;
            }).join('')}
                </div>

                <div class="flex items-center my-4">
                    <div class="flex-grow border-t border-gray-300"></div>
                </div>
                <div class="flex justify-between">
                    <div>
                        <p class="text-xs text-gray-500">Author: ${word.author}</p>
                        <p class="text-xs text-gray-500">Assignee: ${word.assignee}</p>
                    </div>
                    <div class="text-right">
                        <p class="text-[10px] text-gray-400">Created: ${word.createdAt}</p>
                        <p class="text-[10px] text-gray-400">Updated: ${word.updatedAt}</p>
                    </div>
                </div>
            </div>
        `;
        wordContainer.appendChild(card);
    });
};

filterTap('all');