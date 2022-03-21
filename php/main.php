<?php

require_once 'punto.php';
require_once 'jarvis.php';

$minDec = 0;
$maxDec = 99;
$min = 0;
$max = 15;

$arrayPuntos = array();
for($i=0; $i<20; $i++) {
    $randomDec = random_int( $minDec, $maxDec ) * .01;
    $random = random_int( $min, $max );
    $x = $random + $randomDec;

    $randomDec = random_int( $minDec, $maxDec ) * .01;
    $random = random_int( $min, $max );
    $y = $random + $randomDec;

    array_push($arrayPuntos, new Punto($x,  $y));
}

// ---------------- Primera Prueba ---------------------
// $punto1 = new Punto(3,3);
// $punto2 = new Punto(2,1);
// $punto3 = new Punto(2,3);
// $punto4 = new Punto(3,2);
// $punto5 = new Punto(1, 4);
// $punto6 = new Punto(4, 1);
// $arrayPuntos = array($punto1, $punto2, $punto3, $punto4, $punto5, $punto6);
// ---------------- Primera Prueba ---------------------

// ---------------- Segunda Prueba ---------------------
// $punto1 = new Punto(7.45 , 9.2); // ---
// $punto2 = new Punto(2.3 , 4.3); // ---
// $punto3 = new Punto(10.1 , 3.4);
// $punto4 = new Punto(1.1 , 1.1);
// $punto5 = new Punto(3.6 , 4.55); // ---
// $punto6 = new Punto(12.3 , 7.8); // ---
// $punto7 = new Punto(8.99 , 4.5); // ---
// $punto8 = new Punto(16.36 , 3.44); // ---
// $punto9 = new Punto(10.10 , 9.99); // ---
// $punto10 = new Punto(3.34 , 6.66); // ---
// $arrayPuntos = array($punto1, $punto2, $punto3, $punto4, $punto5, $punto6, $punto7, $punto8, $punto9, $punto10);
// $punto1 = new Punto(1.34 , 2.45); // ---
// $punto2 = new Punto(1.45 , 1.98); // ---
// $punto3 = new Punto(3.45 , 6.21);
// $punto4 = new Punto(7.12 , 9.98);
// $punto5 = new Punto(11.34 , 18.453); // ---
// $punto6 = new Punto(1.001 , 1.998); // ---
// $punto7 = new Punto(5.432 , 7.32); // ---
// $punto8 = new Punto(8.43 , 2.34); // ---
// $punto9 = new Punto(5.32 , 8.94); // ---
// $punto10 = new Punto(6.66 , 7.77); // ---
// array_push($arrayPuntos, $punto1, $punto2, $punto3, $punto4, $punto5, $punto6, $punto7, $punto8, $punto9, $punto10);
// ---------------- Primera Prueba ---------------------

$jarvisAlgoritmo = new JarvisAlgoritmo($arrayPuntos);
$jarvisAlgoritmo->convexFull();

$data = array(
    'success' => 1,
    'code' => 200,
    'status' => 'success',
    'puntos' => $jarvisAlgoritmo->getPuntosJson(),
    'convexFull' => $jarvisAlgoritmo->getPuntosJsonConvexFull()
);

echo json_encode( $data );

?>