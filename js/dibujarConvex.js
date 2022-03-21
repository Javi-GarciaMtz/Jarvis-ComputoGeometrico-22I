
function borrarConvex() {
    localStorage.setItem('paso', 0);
    var canvas = document.getElementById('canvasHTML');
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 1000, 1000);
}

function acomodar(jsonData) {
    var arrayPuntos = jsonData['puntos'];
    var arrayConvexFull = jsonData['convexFull'];
    var i;

    for(i=0; i<arrayConvexFull.length; i++)
        arrayConvexFull[i].yValue = arrayConvexFull[i].yValue * -1;

    for(i=0; i<arrayPuntos.length; i++)
        arrayPuntos[i].yValue = arrayPuntos[i].yValue * -1;

    var min=arrayPuntos[0].yValue;
    for(i=1; i<arrayPuntos.length; i++){
        if( arrayPuntos[i].yValue < min ) {
            min = arrayPuntos[i].yValue;
        }
    }

    if(min<0)
        min = min * -1;

    for(i=0; i<arrayConvexFull.length; i++)
        arrayConvexFull[i].yValue = arrayConvexFull[i].yValue + min;

    for(i=0; i<arrayPuntos.length; i++)
        arrayPuntos[i].yValue = arrayPuntos[i].yValue + min;
}

function dibujarTodaConvex(ctx,arrayPuntos, arrayConvexFull, paso) {
    var i;
    var trasladar = 40;
    var suma = 0;

    ctx.clearRect(0, 0, 1000, 1000);
    ctx.strokeStyle = "#D79134";
    for(i=0; i<arrayConvexFull.length; i++) {
        if(i == arrayConvexFull.length-1) {
            ctx.beginPath();
            ctx.moveTo( (arrayConvexFull[i].xValue + suma) * trasladar, (arrayConvexFull[i].yValue + suma) * trasladar );
            ctx.lineTo( (arrayConvexFull[0].xValue + suma) * trasladar, (arrayConvexFull[0].yValue + suma) * trasladar );
            ctx.stroke();
        } else {
            ctx.setLineDash([]);
            ctx.beginPath();
            ctx.moveTo( (arrayConvexFull[i].xValue + suma) * trasladar, (arrayConvexFull[i].yValue + suma) * trasladar );
            ctx.lineTo( (arrayConvexFull[i+1].xValue + suma) * trasladar, (arrayConvexFull[i+1].yValue + suma) * trasladar );
            ctx.stroke();
        }
    }

    // Dibujamos los puntos
    var pointSize = 6; // Cambia el tamaño del punto
    ctx.fillStyle = "#DF9025"; // Color
    for(i=0; i<arrayPuntos.length; i++) {
        ctx.beginPath(); // Iniciar trazo
        ctx.arc( (arrayPuntos[i].xValue + suma) * trasladar , (arrayPuntos[i].yValue + suma) * trasladar, pointSize, 0, Math.PI * 2, true); // Dibujar un punto usando la funcion arc
        ctx.fill(); // Terminar trazo
    }

    ctx.fillStyle = "#000000"; // Color
    for(i=0; i<arrayConvexFull.length; i++) {
        ctx.beginPath(); // Iniciar trazo
        ctx.arc( (arrayConvexFull[i].xValue + suma) * trasladar , (arrayConvexFull[i].yValue + suma) * trasladar, pointSize, 0, Math.PI * 2, true); // Dibujar un punto usando la funcion arc
        ctx.fill(); // Terminar trazo
    }
}

function dibujarPorPasos(ctx, arrayPuntos, arrayConvexFull, paso) {
    var i;
    var trasladar = 40;
    var suma = 0;

    // Borrar lineas primero
    ctx.clearRect(0, 0, 1000, 1000);

    // Dibujar lineas del punto paso a los demás
    ctx.strokeStyle = "#C4C4C4";
    ctx.lineWidth = 2;
    for(i=0; i<arrayPuntos.length; i++) {
        // ctx.setLineDash([4, 14]);
        ctx.beginPath();
        ctx.moveTo( (arrayConvexFull[paso].xValue + suma) * trasladar, (arrayConvexFull[paso].yValue + suma) * trasladar );
        ctx.lineTo((arrayPuntos[i].xValue + suma) * trasladar, (arrayPuntos[i].yValue + suma) * trasladar);
        ctx.stroke();
    }

    ctx.strokeStyle = "#D79134";
    ctx.lineWidth = 3;
    // Dibujar lineas que ya pasaron y son de la convex
    for(i=0; i<paso+1; i++) {

        if(i == arrayConvexFull.length-1) {
            // ctx.setLineDash([]);
            ctx.beginPath();
            ctx.moveTo( (arrayConvexFull[i].xValue + suma) * trasladar, (arrayConvexFull[i].yValue + suma) * trasladar );
            ctx.lineTo( (arrayConvexFull[0].xValue + suma) * trasladar, (arrayConvexFull[0].yValue + suma) * trasladar );
            ctx.stroke();
        } else {
            ctx.setLineDash([]);
            ctx.beginPath();
            ctx.moveTo( (arrayConvexFull[i].xValue + suma) * trasladar, (arrayConvexFull[i].yValue + suma) * trasladar );
            ctx.lineTo( (arrayConvexFull[i+1].xValue + suma) * trasladar, (arrayConvexFull[i+1].yValue + suma) * trasladar );
            ctx.stroke();
        }

    }

    // Dibujamos los puntos
    var pointSize = 6; // Cambia el tamaño del punto
    ctx.fillStyle = "#DF9025"; // Color
    for(i=0; i<arrayPuntos.length; i++) {
        ctx.beginPath(); // Iniciar trazo
        ctx.arc( (arrayPuntos[i].xValue + suma) * trasladar , (arrayPuntos[i].yValue + suma) * trasladar, pointSize, 0, Math.PI * 2, true); // Dibujar un punto usando la funcion arc
        ctx.fill(); // Terminar trazo
    }

    ctx.fillStyle = "#000000"; // Color
    for(i=0; i<paso+1; i++) {

        ctx.font="12pt Verdana";
        ctx.fillStyle = "black";
        ctx.fillText(i.toString(), ((arrayConvexFull[i].xValue + suma) * trasladar)+5 , ((arrayConvexFull[i].yValue + suma) * trasladar)+5 );

        ctx.beginPath(); // Iniciar trazo
        ctx.arc( (arrayConvexFull[i].xValue + suma) * trasladar , (arrayConvexFull[i].yValue + suma) * trasladar, pointSize, 0, Math.PI * 2, true); // Dibujar un punto usando la funcion arc
        ctx.fill(); // Terminar trazo
    }

    paso++;
    localStorage.setItem('paso', paso);
}

function dibujarPasos(jsonData, paso) {

    paso = parseInt(paso, 10);


    var canvas = document.getElementById('canvasHTML');
    var arrayPuntos = jsonData['puntos'];
    var arrayConvexFull = jsonData['convexFull'];

    if (canvas.getContext) {

        var ctx = canvas.getContext('2d');

        if(paso >= arrayConvexFull.length) {
            dibujarTodaConvex(ctx, arrayPuntos, arrayConvexFull, paso);
        } else {
            dibujarPorPasos(ctx, arrayPuntos, arrayConvexFull, paso);
        }

    }

}
