import $ from 'jquery';

var IniciarWeb = {
    iniciada: false,
    init: function () {
        /*
         Acciones
         */
        $('window').resize(()=> {
            IniciarWeb.configurar_Web();
        });
        /*
         Funciones
         */
        IniciarWeb.configurar_Web();
        IniciarWeb.link_actual();
        IniciarWeb.iniciada = true;
    },
    configurar_Web: function () {

    },
    link_actual: function () {
        var url = document.location.href;
        $('[href="' + url + '"]').addClass('link_actual');
    }
};

export default IniciarWeb;