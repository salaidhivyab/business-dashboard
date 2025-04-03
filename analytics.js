document.addEventListener('DOMContentLoaded', function() {
    // Initialize all charts
    initSalesChart();
    initProductsChart();
    initCustomersChart();
    initRevenueChart();
    
    // Theme change handler
    const themeToggler = document.querySelector(".theme-toggler");
    if (themeToggler) {
        themeToggler.addEventListener('click', updateChartThemes);
    }
});

// Sales Performance Chart (Line Chart)
function initSalesChart() {
    const ctx = document.getElementById('salesChart').getContext('2d');
    window.salesChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [{
                label: 'Monthly Sales',
                data: [12500, 19000, 15300, 17800, 21200, 19500, 23100],
                borderColor: '#7f96ff',
                backgroundColor: 'rgba(127, 150, 255, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }]
        },
        options: getChartOptions('Sales (₹)')
    });
}

// Top Products Chart (Bar Chart)
function initProductsChart() {
    const ctx = document.getElementById('productsChart').getContext('2d');
    window.productsChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Vermicompost', 'NPK Fertilizer', 'Rose Food', 'Seedlings', 'Garden Tools'],
            datasets: [{
                label: 'Units Sold',
                data: [125, 98, 76, 58, 42],
                backgroundColor: [
                    'rgba(127, 150, 255, 0.7)',
                    'rgba(239, 118, 122, 0.7)',
                    'rgba(35, 240, 199, 0.7)',
                    'rgba(255, 227, 71, 0.7)',
                    'rgba(132, 129, 200, 0.7)'
                ],
                borderColor: [
                    '#7f96ff',
                    '#ef767a',
                    '#23f0c7',
                    '#ffe347',
                    '#8481c8'
                ],
                borderWidth: 1
            }]
        },
        options: getChartOptions('Units')
    });
}

// Customer Demographics Chart (Doughnut Chart)
function initCustomersChart() {
    const ctx = document.getElementById('customersChart').getContext('2d');
    window.customersChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Farmers', 'Retailers', 'Wholesalers', 'Home Gardeners'],
            datasets: [{
                data: [35, 25, 20, 20],
                backgroundColor: [
                    '#7f96ff',
                    '#ef767a',
                    '#23f0c7',
                    '#ffe347'
                ],
                borderWidth: 0
            }]
        },
        options: {
            ...getChartOptions(''),
            cutout: '70%',
            plugins: {
                legend: {
                    position: 'right'
                }
            }
        }
    });
}

// Revenue Trends Chart (Line Chart)
function initRevenueChart() {
    const ctx = document.getElementById('revenueChart').getContext('2d');
    window.revenueChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Q1', 'Q2', 'Q3', 'Q4'],
            datasets: [
                {
                    label: '2022',
                    data: [45000, 48000, 52000, 61000],
                    borderColor: '#8481c8',
                    borderWidth: 2,
                    borderDash: [5, 5],
                    tension: 0.1
                },
                {
                    label: '2023',
                    data: [52000, 57000, 63000, 72000],
                    borderColor: '#7f96ff',
                    backgroundColor: 'rgba(127, 150, 255, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                }
            ]
        },
        options: getChartOptions('Revenue (₹)')
    });
}

// Common chart options
function getChartOptions(title) {
    return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: title,
                font: {
                    size: 14
                }
            },
            legend: {
                position: 'top',
                labels: {
                    usePointStyle: true,
                    pointStyle: 'circle'
                }
            },
            tooltip: {
                mode: 'index',
                intersect: false
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(0, 0, 0, 0.05)'
                }
            },
            x: {
                grid: {
                    display: false
                }
            }
        }
    };
}

// Update chart themes when toggling dark mode
function updateChartThemes() {
    const isDark = document.body.classList.contains('dark-theme-variables');
    const gridColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)';
    const textColor = isDark ? '#edeffd' : '#363949';

    const charts = [
        window.salesChart,
        window.productsChart,
        window.customersChart,
        window.revenueChart
    ];

    charts.forEach(chart => {
        if (chart) {
            chart.options.scales.y.grid.color = gridColor;
            chart.options.scales.x.grid.color = gridColor;
            chart.options.plugins.title.color = textColor;
            chart.options.plugins.legend.labels.color = textColor;
            chart.update();
        }
    });
}