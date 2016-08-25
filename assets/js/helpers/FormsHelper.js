/**
 * Helper para formularios
 */
import $ from 'jquery';

var HelperForms = {
  check_formularios(formulario){
    var ok = true;
    var inputs = formulario.find('input:not(".no_obligatorio"),select:not(".no_obligatorio"),textarea:not(".no_obligatorio")');

    inputs.each(function (i, e) {
      if ($(e).val() == '' || $(e).val() == undefined) {
        $(e).addClass('con_error');
        ok = false;
      } else {
        $(e).removeClass('con_error');
      }
    });
    if (!ok) {
      alert('Completa todos los campos del formulario marcados');
      return ok;
    }
    var numeros = formulario.find('[type="number"]');
    if (numeros.length) {
      /*SON NUMEROS?*/
      numeros.each(function (i, e) {
        if (isNaN($(e).val())) {
          $(e).addClass('con_error');
          ok = false;
        } else {
          $(e).removeClass('con_error');
        }
      });
      if (!ok) {
        alert('Los campos marcados en rojo deben de ser numéricos');
        return ok;
      }
    }
    /*MAILS------------------------------------*/
    var mails = formulario.find('[type="email"]');
    mails.each(function (i, e) {
      if (!HelperForms.isValidEmailAddress($(e).val())) {
        $(e).addClass('con_error');
        ok = false;
      } else {
        $(e).removeClass('con_error');
      }
    });
    if (!ok) {
      alert('Escribe un correo electrónico válido');
      return ok;
    }
    /*SIZE----------------------------*/
    var size = formulario.find('[size]');
    size.each(function (i, e) {
      if ($(e).val().length != $(e).attr('size')) {
        $(e).addClass('con_error');
        ok = false;
      } else {
        $(e).removeClass('con_error');
      }
    });
    if (!ok) {
      alert('Los campos requeridos no tienen el tamaño necesario para continuar');
      return ok;
    }
    return ok;
  },
  isValidEmailAddress(emailAddress) {
    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(emailAddress);
  }
};

export default HelperForms;
