<?php
/**
 * Class GafaObject
 */

namespace Wisquimas;

abstract
class WisquimasObject implements InterfaceModel
{
    /**
     * @var int
     */
    public $ID;
    public $title = '';
    public $link = '';
    /**
     * Postype del objeto
     */
    const PostType = '';

    /**
     * Array con instancias singletonas
     *
     * @var array
     */
    protected static $Instances = array();

    protected
    function __construct($id = 0)
    {
        $this->ID = $id;
        $this->title = get_the_title($this->ID);
        $this->link = get_permalink($this->ID);

        $clase = get_called_class();
        $opciones = $clase::GetOptions();
        if ($opciones) {
            $meta = get_post_meta($this->ID);
            foreach ($opciones as $opcion) {
                $this->CleanOption($opcion);
                if (empty($opcion['propiedad'])) {
                    return;
                };
                $nameOpcion = $opcion['propiedad'];
                if (isset($meta[ $opcion['meta_slug'] ])) {
                    /*
                     * Si existe la meta etiqueta
                     */
                    $this->$nameOpcion = null;
                    if ($opcion['meta_slug']) {
                        /*
                         * Si se da un meta slug
                         */
                        $this->$nameOpcion = $opcion['reset'] === true && is_array($meta[ $opcion['meta_slug'] ]) ? reset($meta[ $opcion['meta_slug'] ]) : $meta[ $opcion['meta_slug'] ];
                    }
                } else {
                    $this->$nameOpcion = null;
                }
                if ($opcion['customFunction']) {
                    /*
                     * Si se da una funcion custom
                     */
                    $funcion = $opcion['customFunction'];
                    $this->$nameOpcion = $funcion($this, $nameOpcion);
                }
            }
        }
    }

    /**
     * Recibe funciones para filtrar con contenido
     *
     * @return \Closure
     */
    final static protected function FuncionHtml()
    {
        return function ($clase, $propiedad) {
            return apply_filters('the_content', $clase->$propiedad);
        };
    }

    /**
     * Recibe el link del objeto
     *
     * @return \Closure
     */
    final static protected
    function FuncionLink()
    {
        return function ($clase, $propiedad) {
            return get_permalink($clase->ID);
        };
    }

    /**
     * Recibe html del contenido del post
     *
     * @return \Closure
     */
    final static protected function FuncionContenido()
    {
        return function ($clase, $propiedad) {
            return apply_filters('the_content', get_post_field('post_content', $clase->ID));
        };
    }


    /**
     * Recibe funciones de imagenes
     *
     * @return \Closure
     */
    final static protected function FuncionImagen()
    {
        return function ($clase, $propiedad) {
            return _processed_value($clase->$propiedad, 'image_media');
        };
    }

    /**
     * Recibe un loop de imagenes
     *
     * @return \Closure
     */
    final static protected function FuncionImagenes()
    {
        return function ($clase, $propiedad) {
            $data = array();
            foreach ((array)$clase->$propiedad as $elemento) {
                $data[] = _processed_value($elemento, 'image_media');
            }

            return $data;
        };
    }

    /**
     * Devuelve un grupo Limpio de MF
     *
     * @param string $grupo
     *
     * @return \Closure
     */
    final public static function FuncionDeGrupo($grupo = '')
    {
        return function ($clase, $propiedad) use ($grupo) {
            $groupMf = get_group($grupo, $clase->ID);
            static::LimpiarGrupo($groupMf);

            return $groupMf;
        };
    }

    /**
     * Limpia los grupos MF
     *
     * @param array $grupo
     */
    final public static function LimpiarGrupo(array &$grupo = array())
    {
        if ($grupo) {
            foreach ($grupo as &$propiedad) {
                foreach ($propiedad as &$valor) {
                    $valor = reset($valor);
                }
            }
        }
    }

    /**
     * Setea las opciones por defecto del constructor
     *
     * @param array $options
     */
    final private
    function CleanOption(&$options = array())
    {
        $args = array(
            'propiedad'      => null,
            'meta_slug'      => null,
            'reset'          => true,
            'customFunction' => null,
        );
        $options = array_merge($args, $options);
    }

    /**
     * Nos permite almacenar singletones
     *
     * @param int $id
     *
     * @return static
     */
    final static public
    function InstanceCached($id = 0)
    {
        $clase = get_called_class();
        $Instancias = $clase::$Instances;
        if (!isset($Instancias[ $id ])) {
            $Instancias[ $id ] = new $clase($id);
            $clase::$Instances = $Instancias;
        }

        return $Instancias[ $id ];
    }

    /**
     * Instancia el ultimo elemento de un posttype
     *
     * Util para paneles de configuracion
     *
     * @return static
     */
    final static public function InstanceCachedLast()
    {
        $postType = static::PostType;

        return static::InstanceCached(get_last_post($postType));
    }

    /**
     * Instancia la clase
     *
     * @param int $id
     *
     * @return static
     */
    final static public
    function Instance($id = 0)
    {
        $clase = get_called_class();

        return new $clase($id);
    }

    /**
     * Trae todos los posts del tipo
     *
     * @param array $options Sobreescribe las opciones por defecto
     *
     * @param bool  $objectsInstanced
     *
     * @return static[]
     */
    final static public
    function Get($options = array(), $objectsInstanced = false)
    {
        $options = is_array($options) ? $options : array();
        $clase = get_called_class();
        $args = array(
            'post_type'      => $clase::PostType,
            'fields'         => 'ids',
            'posts_per_page' => -1,
        );
        $args = array_merge($args, $options);

        $elementos = get_posts($args);

        if ($objectsInstanced) {
            /**
             * @var $clase GafaObject
             */
            $clase = get_called_class();
            $elementos = array_map(function ($id) use ($clase) {
                return $clase::Instance($id);
            }, $elementos);
        }

        return $elementos;
    }
}