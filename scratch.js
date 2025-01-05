// Elements
const canvas = document.getElementById("scratch");
const context = canvas.getContext("2d");
const valuesContainer = document.getElementById("valuesContainer");
const resultMessage = document.getElementById("resultMessage");

// Initialize scratch area
const init = () => {
    context.fillStyle = "rgb(255, 255, 9)";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.lineJoin = "round";
    context.lineWidth = 20;
    context.strokeStyle = "rgb(255, 255, 9)";
    context.strokeRect(0, 0, canvas.width, canvas.height);
    canvas.style.borderRadius = "10px";
    canvas.style.boxShadow = "0 0 30px rgba(255, 128, 1, 0.8), 0 0 50px rgb(238, 255, 0)";
    
    // Add text to canvas
    context.globalCompositeOperation = "source-over";
    context.fillStyle = "black";
    context.font = "20px Arial";
    context.textAlign = "center";
    wrapText(context, "Scratch off to get points", canvas.width / 2, canvas.height / 2, canvas.width - 20, 25);
};

// Function to wrap text
const wrapText = (context, text, x, y, maxWidth, lineHeight) => {
    const words = text.split(' ');
    let line = '';
    for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = context.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
            context.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
        } else {
            line = testLine;
        }
    }
    context.fillText(line, x, y);
};

// Canvas scratch functionality
let isDragged = false;
const scratch = (x, y) => {
    context.globalCompositeOperation = "destination-out";
    context.beginPath();
    context.arc(x, y, 12, 0, 2 * Math.PI);
    context.fill();
};

// Get exact x and y position on canvas
const getXY = (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = (e.pageX || e.touches[0].pageX) - rect.left;
    const y = (e.pageY || e.touches[0].pageY) - rect.top;
    return { x, y };
};

// Event listeners for scratch functionality
["mousedown", "touchstart"].forEach((event) => {
    canvas.addEventListener(event, (e) => {
        isDragged = true;
        const { x, y } = getXY(e);
        scratch(x, y);
    });
});
["mousemove", "touchmove"].forEach((event) => {
    canvas.addEventListener(event, (e) => {
        if (isDragged) {
            e.preventDefault();
            const { x, y } = getXY(e);
            scratch(x, y);
        }
    });
});
["mouseup", "touchend", "mouseleave"].forEach((event) => {
    canvas.addEventListener(event, () => {
        isDragged = false;
    });
});

window.onload = init;
