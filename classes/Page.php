<?php

namespace TresCielos;

class Page extends GafaObject
{
    const PostType = 'page';

    public $contenido = '';

    /**
     * Seteamos las opciones
     *
     * array(
     * 'propiedad'      => 'settings_logo', //Propiedad interna
     * 'meta_slug'      => 'settings_logo', //meta slug referencia de la db
     * 'customFunction' => static::FuncionImagen(), //Funcion callback
     * ),
     *
     * @return array
     */
    static public
    function GetOptions()
    {
        return array(
            array(
                'propiedad'      => 'contenido', //Propiedad interna
                'customFunction' => static::FuncionContenido(), //Funcion callback
            ),
        );
    }
}
