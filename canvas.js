var colour;
var strokeValue;

function colourValue() {
    colour = document.getElementById("colour").options[document.getElementById("colour").selectedIndex].value;
}

function onStrokeValue() {
    strokeValue = document.getElementById("strokeValue").options[document.getElementById("strokeValue").selectedIndex].value;
}

window.addEventListener('load', () => {
    
    colour = document.getElementById("colour").options[document.getElementById("colour").selectedIndex].value;
    strokeValue = document.getElementById("strokeValue").options[document.getElementById("strokeValue").selectedIndex].value;

    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext("2d"); 
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;  
    
    let painting = false;

    function startPosition(e) {
        painting = true;
        draw(e);
    }

    function finishedPosition() {
        painting = false;
        ctx.beginPath();
    }

    
    function draw(e) {
        if(!painting) return;
        ctx.lineWidth = strokeValue;
        ctx.lineCap = "round";
        ctx.strokeStyle = colour;

        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY);
    }

    document.body.addEventListener("touchstart", function (e) {
        if (e.target == canvas) {
          e.preventDefault();
          painting = false;
          ctx.beginPath();
        }
      }, {passive : false });
      document.body.addEventListener("touchend", function (e) {
        if (e.target == canvas) {
          e.preventDefault();
          painting = true;
          draw(e);
        }
      }, {passive : false });
      document.body.addEventListener("touchmove", function (e) {
        if (e.target == canvas) {
          e.preventDefault();
          if(!painting) return;
          ctx.lineWidth = strokeValue;
          ctx.lineCap = "round";
          ctx.strokeStyle = colour;

          ctx.lineTo(e.clientX, e.clientY);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(e.clientX, e.clientY);
        }
      }, {passive : false });

    canvas.addEventListener("mousedown", startPosition);
    canvas.addEventListener("mouseup", finishedPosition);
    canvas.addEventListener("mousemove", draw);
    
})