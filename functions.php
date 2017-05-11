<?php
if (isset($_POST['ajax_gafa'])) {
    require_once('procesos/ajax.php');
};

/*CLASES*/
require_once('classes/inicio.php');

/**
 * Recoge page id by path
 *
 * @param string $slug
 *
 * @return int
 */
function get_pageGafa($slug = '')
{
    $pagina = get_page_by_path($slug);
    $paginaId = 0;
    if ($pagina) {
        $paginaId = $pagina->ID;
    } else if (!is_admin()) {
        die('No hay una página: ' . $slug);
    };

    return $paginaId;
}

/**
 * Devuelve post ID del ultimo post del tipo
 *
 * @param bool $post_type
 *
 * @return mixed
 */
function get_last_post($post_type = false)
{
    if (!$post_type) {
        return null;
    };

    $last = get_posts(array(
        'post_type'      => $post_type,
        'posts_per_page' => 1,
        'fields'         => 'ids',
    ));

    if (!$last && !is_admin()) {
        die('No hay opciones de: ' . $post_type);
    };

    return reset($last);
}

;


function compatible($string = '')
{
    $c = array(
        '',
        '-moz-',
        '-ms-',
        '-o-',
        '-webkit-',
    );
    foreach ($c as $x) {
        echo $x . $string;
    };
}

;
/*FUNCIONES CON POSTS*/
if (!function_exists('crear')) {
    function crear($post_type = false, $usuario = false, $fecha = false)
    {
        if (!$post_type) {
            return null;
        };
        if (!$usuario) {
            global $current_user;
            $usuario = $current_user->ID;
        };
        $post_nuevo = array(
            'post_title'  => '',
            'post_status' => 'publish',
            'post_author' => $usuario,
            'post_type'   => $post_type,
        );
        if ($fecha) {
            $post_nuevo['post_date'] = $fecha;
        };

        return wp_insert_post($post_nuevo);
    }

    ;
};
if (!function_exists('actualizar_nombre')) {
    function actualizar_nombre($id_post = false, $nombre = false)
    {
        if (!$id_post || !$nombre) {
            return null;
        };

        return wp_update_post(array(
            'post_title' => $nombre,
            'ID'         => $id_post,
        ));
    }

    ;
};
if (!function_exists('actualizar_status')) {
    function actualizar_status($id_post = false, $post_status = false)
    {
        if (!$id_post || !$post_status) {
            return null;
        };

        return wp_update_post(array(
            'post_status' => $post_status,
            'ID'          => $id_post,
        ));
    }

    ;
};
if (!function_exists('actualizar_fecha')) {
    function actualizar_fecha($id_post = false, $fecha = false)
    {
        if (!$id_post || !$fecha) {
            return null;
        };

        return wp_update_post(array(
            'post_date' => $fecha,
            'ID'        => $id_post,
        ));
    }

    ;
};
if (!function_exists('actualizar_contenido')) {
    function actualizar_contenido($id_post = false, $txt = false)
    {
        if (!$id_post || !$txt) {
            return null;
        };

        return wp_update_post(array(
            'post_content' => $txt,
            'ID'           => $id_post,
        ));
    }

    ;
};
if (!function_exists('eliminar')) {
    function eliminar($id_post = false)
    {
        if (!$id_post) {
            return null;
        };

        return wp_delete_post($id_post, true);
    }

    ;
};