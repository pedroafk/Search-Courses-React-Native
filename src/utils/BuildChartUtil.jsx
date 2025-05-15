export function buildChartData(data) {
    const labels = [];
    const counts = [];

    data.forEach(item => {
        const key = item['title'];
        const count = item['count'];
        const shortLabel = key.split(' ').slice(0, 4).join(' ');
        labels.push(shortLabel);
        counts.push(count);
    });

    return {
        labels,
        datasets: [
            {
                label: 'Contagem de cliques',
                data: counts,
                backgroundColor: 'rgba(255, 71, 87, 0.8)',
                borderColor: 'rgba(255, 71, 87, 1)',
                borderWidth: 1,
            }
        ],
    };
};