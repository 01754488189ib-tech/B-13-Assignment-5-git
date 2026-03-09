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

