import moment from "moment";

var app = new Vue({
    el: '#mainpage',
    data: {
        historic: [],
    },
    methods: {
        loadSave: function () {
            fetch('./history.json')
                .then(
                    function (response) {
                        if (response.status !== 200) {
                            console.log('Looks like there was a problem. Status Code: ' +
                                response.status);
                            return;
                        }

                        // Examine the text in the response
                        response.json().then(function (data) {
                            this.data.historic = data;
                            this.createChart('myChart', this.chartConfig);
                        });
                        
                    }
                )
                .catch(function (err) {
                    console.log('Fetch Error :-S', err);
                });

        },
        createChart: function (chartId, chartData) {
            const ctx = document.getElementById(chartId);
            const myChart = new Chart(ctx, {
                type: chartData.type,
                data: chartData.data,
                options: chartData.options,
            });
        }

    },
    computed: {
        historicMoments: function() {
            this.historic.map(x => {
                return moment(x);
            })
        },
        chartConfig: function () {
            return {
                type: 'line',
                data: this.historicMoments,
                options: {
                    responsive: true,
                }
            }
        }
    },
    mounted: function () {
        this.loadSave();
        this.createChart('myChart', this.chartConfig);
    }
});