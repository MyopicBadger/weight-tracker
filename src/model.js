import moment from "moment";
import Vue from 'vue'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import 'chart.js';
import feather from 'feather-icons'

var app = new Vue({
    el: '#mainpage',
    data: {
        historic: [],
        myChart: { destroy: function () { console.log('calling fake destroy') } },
        mode: 'all time',
        newEntryValue: "",
        chartUnit: 'month'
    },
    methods: {
        loadSave: function (startDate) {
            var endpoint = './history.json'
            var fetchConfig = { method: 'GET' }
            if (startDate) {
                endpoint = './historyByDate.json'
                fetchConfig = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ startDate: startDate.format('YYYY-MM-DD') }),
                }
            }
            return fetch(endpoint, fetchConfig).then(
                (response) => {
                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' + response.status);
                        return;
                    }
                    response.json().then((data) => {
                        this.historic = data;
                    });
                }).catch(function (err) {
                    console.log('Fetch Error :-S', err);
                });
        },
        createChart: function (chartId, chartData) {
            console.log("Chart created")
            const ctx = document.getElementById(chartId);
            this.myChart = new Chart(ctx, {
                type: chartData.type,
                data: chartData.data,
                options: chartData.options,
            });
        },
        setChartFilter: function (startDate) {
            this.loadSave(startDate)
        },
        setChartMonth: function (event) {
            this.mode = 'this month'
            this.chartUnit = "day"
            this.setChartFilter(moment().date(1))
        },
        setChartYear: function (event) {
            this.mode = 'this year'
            this.chartUnit = 'month'
            this.setChartFilter(moment().dayOfYear(1))
        },
        setChartAll: function (event) {
            this.mode = 'all time'
            this.chartUnit = 'month'
            this.loadSave();
        },
        postNewValue: function () {
            console.log("Fired", this.newEntryValue)
            var endpoint = './newEntry'
            var fetchConfig = {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ date: moment().format("YYYY-MM-DD"), weight: Number.parseFloat(this.newEntryValue).toFixed(1)}),
            }
            fetch(endpoint, fetchConfig).then(
                (response) => {
                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' + response.status);
                        return;
                    }
                    this.loadSave()
                }).catch(function (err) {
                    console.log('Fetch Error :-S', err);
                });
        }
    },
    computed: {
        historicMoments: function () {
            return this.historic.map(a => {
                return { t: moment(a.x).toDate(), y: a.y };
            })
        },
        chartConfig: function () {
            return {
                type: 'line',
                data: {
                    datasets: [{
                        label: 'Weight',
                        fill: false,
                        data: this.historicMoments,
                    }]
                },
                options: {
                    scales: {
                        xAxes: [{
                            type: 'time',
                            time: {
                                unit: this.chartUnit,
                                suggestedMin: moment('2017-03-15'),
                                suggestedMax: moment(),
                            }
                        }],
                        yAxes: [{
                            ticks: {
                                suggestedMin: 100,
                                suggestedMax: 120
                            }
                        }]
                    }
                }
            }
        }
    },
    watch: {
        chartConfig: function () {
            console.log("Redrawing")
            this.myChart.destroy()
            this.createChart('myChart', this.chartConfig);
        }
    },

    mounted: function () {
        feather.replace()
        this.loadSave();
        //this.createChart('myChart', this.chartConfig);
    }
});