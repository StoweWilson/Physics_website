const canvas = document.getElementById('userGraphCanvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    ctx.moveTo(e.offsetX, e.offsetY);
});

canvas.addEventListener('mouseup', () => {isDrawing = false; });

canvas.addEventListener('mousemove', (e) => {
    if(isDrawing){
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    }
});

document.getElementById('submitDrawing').addEventListener('click', () =>{
    const userGraphData = canvas.toDataUrl();
    sendGraphData(userGraphData);
});

function sendGraphData(graphData){
    fetch('/submitGraph', {
        method: 'POST',
        body: JSON.stringify({graphData: graphData}),
        headers: {'Content-Type': 'applicatioin/json'}
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
    });
}

function compareGraphs(userGraphData, aiGraphData) {
    let error =0;

    for(let i = 0; i < userGraphData.length; i++) {
        const userPoint = userGraphData[i];
        const aiPoint = aiGraphData[i];

        error += Math.pow(userPoint.x - aiPoint.x,2) + Math.pow(userPoint.y - aiPoint.y,2);
    }

    const rmse = Math.squrt(error / userGraphData.length);
    return rmse;
}
