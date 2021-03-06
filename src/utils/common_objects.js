export const Options = {
    title: {
        display: true,
        fontSize: 24,
    },
    legend: {
        display: true,
    },
    scales: {
        xAxes: [
            {
                scaleLabel: {
                    display: true,
                    labelString: 'Quarter',
                }
            }
        ],
        yAxes: [
            {
                scaleLabel: {
                    display: true,
                }
            }
        ]
    }
};

export const Annotation = {
    type: 'line',
    mode: 'horizontal',
    scaleID: 'y-axis-0',
    value: 0,
    borderColor: 'rgb(75, 192, 192)',
    borderWidth: 2,
    label: {
        enabled: true,
    }
};
