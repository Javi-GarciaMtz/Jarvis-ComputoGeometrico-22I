
function ejecutarJarvis() {
    $.ajax({
        type: "POST",
        url: 'php/main.php',
        data: $(this).serialize(),
        success: function(response)
        {
            var jsonData = JSON.parse(response);

            // user is logged in successfully in the back-end
            // let's redirect
            if (jsonData.success == "1")
            {
                borrarConvex();
                acomodar(jsonData);
                localStorage.setItem('jsonDatos', JSON.stringify( jsonData ) );
                localStorage.setItem('paso', 0);
                // dibujarConvex( jsonData );
            }
            else
            {
                alert('No se pudo calcular la Convex Full');
            }
       }
   });
}

function dibujar() {

    var jsonDatos = JSON.parse( localStorage.getItem('jsonDatos') );
    var paso = localStorage.getItem('paso');

    dibujarPasos(jsonDatos, paso);
}

