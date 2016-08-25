import jQuery from 'jquery';

var body = jQuery('body');

/*ERRROR GAFA--------------------------------------------------------------------*/
var elementoErrorGF = '.gafa-mensaje,.gafa-error';
var errorGafa = function (texto, clase) {
  clearTimeout(timer);
  jQuery(elementoErrorGF).remove();
  switch (clase) {
    case 'inicio':
      if (jQuery(elementoErrorGF).length == 0) {
        body.prepend('<div class="gafa-mensaje" style="top:0"><h1>Procesando...</h1></div>');
      }
      break;
    case 'fijo':
      if (jQuery(elementoErrorGF).length == 0) {
        body.prepend('<div class="gafa-mensaje" style="top:0"><h1>Notificación</h1>' + texto + '</div>');
      }
      break;
    case 'conexion':
      return;
      body.prepend('<div class="gafa-error"><h1>Error de conexión</h1>Lo sentimos, algo hicimos mal. Inténtalo en 15 minutos.</div>');
      funcionElementoError();
      break;
    default:
      var classe = clase;
      if (clase == undefined || clase == '') {
        classe = 'error';
      }
      if (classe == 'error') {
        texto = '<h1>¡Alerta!</h1>' + texto;
      } else {
        texto = '<h1>Notificación</h1>' + texto;
      }
      body.prepend('<div class="gafa-' + classe + '">' + texto + '</div>');
      funcionElementoError();
      break;
  }
};
alert = errorGafa;
var timer;
var funcionElementoError = function () {
  if (jQuery(elementoErrorGF).length != 0) {
    jQuery(elementoErrorGF).animate({top: 0}, 500);
    jQuery(elementoErrorGF).attr('title', 'Elimina este mensaje');
    timer = setTimeout(function () {
      if (jQuery(elementoErrorGF).length != 0) {
        jQuery(elementoErrorGF).fadeOut('fast', function () {
          jQuery(elementoErrorGF).remove();
        });
      }
    }, 8000);
  }
};
jQuery(document).ready(function () {
  body.on('click', elementoErrorGF, function () {
    jQuery(elementoErrorGF).fadeOut('slow', function () {
      jQuery(elementoErrorGF).remove();
      clearTimeout(timer);
    });
  });
});
/*ERRROR GAFA FIN--------------------------------------------------------------------*/
