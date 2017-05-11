import $ from 'jquery';
import Cargando from './Cargando'

const AjaxHelpers = {
    ajax_GF: null,
    plantillaUrl: null,
    init(){
        this.plantillaUrl = gafacore ? gafacore.plantilla : null;
    },
    /**
     * Automaticamente imprime un ajax en un recipiente
     * @param data Esto se manda asi: {funcion:'',attr:''}
     * @param recipiente Selector donde queremos poner la info
     * @param callback
     * @constructor
     */
    AjaxEnRecipiente: function do_proceso(data, recipiente, callback) {
        let AjaxHelper = this;
        Cargando.iniciar();
        recipiente = $(recipiente);
        data.ajax_gafa = true;

        if (AjaxHelper.ajax_GF) AjaxHelper.ajax_GF.abort();
        AjaxHelper.ajax_GF = $.post(AjaxHelper.plantillaUrl + '/procesos/do_action.php', data).done(function (d) {
            let info = JSON.parse(d);
            if (!info || !info.ok) {
                alert(info.mensaje);
                return;
            }
            recipiente.html(info.data);

            if (callback) callback();
        }).always(function () {
            Cargando.borrar();
        });
    },
    /**
     * Automaticamente imprime un ajax en un recipiente
     * @param data Esto se manda asi: {funcion:'',attr:''}
     * @param callback
     * @param proceso Aca definiremos si queremos correr un nuevo proceso
     * @constructor
     */
    RequestAjax: function (data, callback, proceso) {
        let AjaxHelper = this;
        Cargando.iniciar();
        data.ajax_gafa = true;

        if (AjaxHelper.ajax_GF) AjaxHelper.ajax_GF.abort();
        AjaxHelper.ajax_GF = $.post(AjaxHelper.plantillaUrl + '/procesos/do_action.php', data).done(function (d) {
            let info = JSON.parse(d);
            if (!info || !info.ok) {
                alert(info.mensaje);
                return null;
            } else {
                if (info.mensaje) {
                    alert(info.mensaje, 'mensaje')
                }
                if (proceso) {
                    AjaxHelper.AjaxEnRecipiente(proceso[0], proceso[1], callback);
                } else if (callback) {
                    callback(info.data);
                }
            }
        }).always(function () {
            Cargando.borrar();
        });
    },
    AppendHtml: function (recipiente, data, callback, proceso) {
        let AjaxHelper = this;
        Cargando.iniciar();
        recipiente = $(recipiente);
        data.ajax_gafa = true;

        AjaxHelper.ajax_GF = $.post(AjaxHelper.plantillaUrl + '/procesos/do_action.php', data).done(function (d) {
            let info = JSON.parse(d);
            if (!info || !info.ok) {
                alert(info.mensaje);
                return;
            }
            recipiente.append(info.data);

            if (callback) callback();
        }).always(function () {
            Cargando.borrar();
        });
    }
};

export default AjaxHelpers;