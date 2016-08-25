export default {
    init: function () {
        var contSliders = $('.WQSlider');
        if (contSliders.length) {
            contSliders.each(function (i, e) {
                var contenedor = $(e);

                var ClaseDeElementos = contenedor.data('wqsliderelements') ? contenedor.data('wqsliderelements') : 'articuloLoop';

                var articulos = contenedor.find('.' + ClaseDeElementos);

                var cantidadElementos = contenedor.data('wqslidercantidad') ? parseInt(contenedor.data('wqslidercantidad')) : 3;
                /*
                 Comprobamos si sobresalen
                 */
                if ((e.offsetHeight < e.scrollHeight) || (e.offsetWidth < e.scrollWidth)) {
                    // your element have overflow
                    //e.style.background = "orange";
                } else {
                    //your element don't have overflow
                    //e.style.background = "blue";
                    return;
                }

                var creado = true;

                if (!contenedor.find('.flechasNavegacion').length) {
                    /*
                     Iniciamos las flechas y seteamos como creado el slider
                     */
                    contenedor.append('<div class="flechasNavegacion flechaAnterior"></div><div class="flechasNavegacion flechaSiguiente"></div>');
                    contenedor.append('<div class="WQSlider--bloqueContenedor"><div class="WQSlider--bloqueMovimiento"></div></div>');
                    creado = false;
                }

                var siguiente = contenedor.find('.flechaSiguiente');
                var anterior = contenedor.find('.flechaAnterior');
                var bloqueMovimiento = contenedor.find('.WQSlider--bloqueMovimiento');
                var margenAnterior = 0;

                if (!creado) {
                    /*
                     Iniciamos el slider
                     */
                    bloqueMovimiento.append(articulos);
                } else {
                    /*
                     Reseteamos el slider
                     */
                    bloqueMovimiento.stop().css({
                        'margin-left': 0
                    });
                    anterior.off('click');
                    siguiente.off('click');
                }

                var elementoActual = articulos.first();
                var ultimoElemento = articulos.last();

                anterior.on('click', function () {
                    var siguienteElemento = elementoActual.prev();
                    if (siguienteElemento.length) {
                        moverASiguienteElemento(siguienteElemento);
                    }
                });
                siguiente.on('click', function () {
                    var siguienteElemento = elementoActual.next();
                    if (siguienteElemento.length && siguienteElemento.nextAll().eq(( cantidadElementos - 2 )).length) {
                        moverASiguienteElemento(siguienteElemento);
                    }
                });
                function moverASiguienteElemento(siguienteElemento) {
                    var margen = -siguienteElemento.position().left;

                    /*
                     Limitamos movimiento
                     */
                    var ancho_maximo = ultimoElemento.position().left + ultimoElemento.outerWidth();
                    var anchoBloque = bloqueMovimiento.outerWidth();

                    if (anchoBloque > ancho_maximo) {
                        if (margen < margenAnterior) {
                            return;
                        }
                    }
                    margenAnterior = margen;
                    elementoActual = siguienteElemento;

                    bloqueMovimiento.stop().animate({
                        'margin-left': margen
                    });
                }
            });
        }
    }
}