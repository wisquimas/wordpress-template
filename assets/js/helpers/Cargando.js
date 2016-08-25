var Cargando = {
  iniciar: function (id) {
    if (id) {
      if ($('#' + id).length < 1) {
        $('body').append('<div id="' + id + '" class="cover" style="display:none;"></div>');
        $('#' + id).fadeIn();
      }
    } else {
      if ($('#cargando').length < 1) {
        $('body').append('<div id="cargando" class="cover" style="display:none;"></div>');
        $('#cargando').fadeIn();
      }
    }
  },
  borrar: function (id) {
    if (id) {
      if ($('#' + id).length >= 0) {
        $('#' + id).fadeOut('fast', function () {
          $('#' + id).remove();
        });
      }
    } else {
      if ($('#cargando').length >= 0) {
        $('#cargando').fadeOut('fast', function () {
          $('#cargando').remove();
        });
      }
    }
  }
};
export default Cargando;
