/**
 * charts.js defines utility methods for drawing charts.
 * @author Harry Dulaney
 * @since  3.0.0
 */

'use strict';

function drawSkillCharts() {
    drawJavaSkillChart();
    //drawNextSkillChart();
    //drawNextSkillChartEtc();

}

function drawJavaSkillChart() {
    const options = {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        borderAlign: 'center'
    }
    const javaSkillConfig = {
        labels: ['Java',
            // 'JavaScript/TypeScript',
            // 'Spring',
            // 'Angular',
            // 'SQL',
            // 'Web Development'
        ],
        datasets: [{
            label: 'Years',
            data: [3, 1],
            backgroundColor: [
                'rgba(255,0,0,0.38)',
                'rgb(54, 162, 235,0)',
            ],
            hoverOffset: 4
        }]
    };

    const ctx = document.getElementById('skill-chart');
    const image = new Image();
    image.src = 'https://raw.githubusercontent.com/HarryDulaney/HarryDulaney.github.io/master/assets/icon/icons-java-48.png';
    image.style.width = '5px';
    image.style.height = 'auto';
    const plugin = {
        id: 'custom_canvas_background_image',
        beforeDraw: (chart) => {
            if (image.complete) {
                const ctx = chart.ctx;
                const {top, left, width, height} = chart.chartArea;
                const x = left + width / 2 - image.width / 2;
                const y = top + height / 2 - image.height / 2;
                ctx.drawImage(image, x, y);
            } else {
                image.onload = () => chart.draw();
            }
        }
    }
    const javaChart = new Chart(ctx, {
        type: 'doughnut',
        data: javaSkillConfig,
        options: options,
    })
}


export default drawSkillCharts;