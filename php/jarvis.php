<?php

class JarvisAlgoritmo {

    private $puntos;
    private $puntosConvexFull = array();

    public function __construct($puntos) {
        $this->puntos = $puntos;
    }

    public function orientacion($p, $q, $r) {
        $val = ($q->getY() - $p->getY()) * ($r->getX() - $q->getX()) -
            ($q->getX() - $p->getX()) * ($r->getY() - $q->getY());

        if( $val == 0 ){
            return 0;
        }

        return ($val > 0) ? 1 : 2;
    }

    public function convexFull() {

        // Se encuentra el punto más a la izquierda
        $izq = 0;
        for($i=0; $i<count($this->puntos); $i++) {
            if( $this->puntos[$i]->getX() < $this->puntos[$izq]->getX() ) {
                $izq = $i;
            }
        }

        // Se comienza desde el punto más a la izquierda, y se sigue moviéndose en sentido contrario a las agujas del reloj
        // hasta llegar de nuevo al punto de partida. Este ciclo ejecuta O(h)
        // veces donde h es el número de puntos en el resultado o la salida.
        $p = $izq;
        $q = 0;

        // var_dump($this->puntos);
        // var_dump($izq);
        // die();

        do {

            // Agregamos el punto inicial
            array_push($this->puntosConvexFull, $this->puntos[$p]);

            // Busca un punto 'q' tal que la orientación(p, q, x)
            // es en sentido antihorario para todos los puntos 'x'. La idea
            // es para realizar un seguimiento del último punto visitado en el sentido
            // contrario a las agujas del reloj en q. Si cualquier punto 'i' es más contrario
            // a las manecillas del reloj que q, entonces actualice q.

            $q = ($p+1) % count($this->puntos) ;

            for($i=0; $i<count($this->puntos); $i++) {
                // Si i es más en el sentido contrario a las agujas del reloj que el q actual, entonces
                // actualizar q
                if( $this->orientacion( $this->puntos[$p], $this->puntos[$i], $this->puntos[$q] ) == 2 ) {
                    $q = $i;
                }
            }

            // Ahora q es lo mas antihorario con respecto a p
            // Establecer p como q para la próxima iteración, de modo que q se agregue a
            // resultado 'casco'
            $p = $q;

        } while ($p != $izq);

        // var_dump($this->puntosConvexFull);
        // die();

    }

    public function getPuntosJson() {
        $arrayJson = array();
        foreach ($this->puntos as $punto) {
            array_push($arrayJson, $punto->getJsonArray());
        }
        return $arrayJson;
    }

    public function getPuntosJsonConvexFull() {

        $puntosOrdenados = array($this->puntosConvexFull[0]);

        for($i=count($this->puntosConvexFull)-1; $i>0 ; $i--){
            array_push($puntosOrdenados, $this->puntosConvexFull[$i]);
        }

        $arrayJson = array();
        foreach ($puntosOrdenados as $punto) {
            array_push($arrayJson, $punto->getJsonArray());
        }
        return $arrayJson;
    }

}


?>