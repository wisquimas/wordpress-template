import $ from 'jquery';

export default function (elemento, altura, velocidad, padre, direccion, solo_valor) {
    if (!elemento) return alert('No has seleccionado ningun elemento para test_Offset');

    if (!altura) altura = 0;
    if (!velocidad) velocidad = 1;
    if (!padre) padre = elemento.parent();
    if (!direccion) direccion = 'top';

    var topPadre = padre.offset().top - $(window).scrollTop();
    var posNino = 0;

    if (isNaN(altura)) {
        switch (direccion) {
            case 'left':
                posNino = padre.outerWidth() * (parseInt(altura) / 100);
                break;
            default:
                posNino = padre.outerHeight() * (parseInt(altura) / 100);
                break;
        }
    } else {
        posNino = altura;
    }
    var topEle = (topPadre * velocidad) + posNino;

    if (solo_valor) {
        return parseInt(topEle);
    }
    $(elemento).css(direccion, topEle);
}