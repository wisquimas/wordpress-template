<!doctype html>
<html lang="es">
<!--
 __    __  ____  _____  ___   __ __  ____  ___ ___   ____  _____
|  T__T  Tl    j/ ___/ /   \ |  T  Tl    j|   T   T /    T/ ___/
|  |  |  | |  T(   \_ Y     Y|  |  | |  T | _   _ |Y  o  (   \_
|  |  |  | |  | \__  T|  Q  ||  |  | |  | |  \_/  ||     |\__  T
l  `  '  ! |  | /  \ ||     ||  :  | |  | |   |   ||  _  |/  \ |
 \      /  j  l \    |l     |l     | j  l |   |   ||  |  |\    |
  \_/\_/  |____j \___j \__,_j \__,_j|____jl___j___jl__j__j \___j
 Desarrollado por: wisquimas@gmail.com
-->
<head>
    <meta charset="utf-8"/>
    <title><?php wp_title(); ?></title>
    <link rel="icon" href=""/>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <!-- Meta SEO -->
    <!-- Meta Facebook -->
    <?php
    etiquetas_og();
    ?>
    <!--suppress HtmlUnknownTarget -->
    <link type="text/css" rel="stylesheet" href="<?php plantilla(); ?>/style.css"/>
    <!--suppress HtmlUnknownTarget -->
    <link type="text/css" rel="stylesheet" href="<?php assets(); ?>/css/dev.css"/>
    <!--suppress HtmlUnknownTarget -->
    <link type="text/css" rel="stylesheet" href="<?php assets(); ?>/css/template.css"/>
    <!--suppress HtmlUnknownTarget -->
    <link type="text/css" rel="stylesheet" href="<?php assets(); ?>/css/templateResponsive.css"/>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>

    <?php require_once("assets/js/gafaCore.php"); ?>

    <!--suppress HtmlUnknownTarget -->
    <link rel="stylesheet" href="<?php assets(); ?>/fancybox/source/jquery.fancybox.css?v=2.1.5" type="text/css"
          media="screen"/>
    <!--suppress HtmlUnknownTarget -->
    <script type="text/javascript" src="<?php assets(); ?>/fancybox/source/jquery.fancybox.pack.js?v=2.1.5"></script>

    <!-- Comienza WP Head -->
    <?php wp_head(); ?>
    <!-- Google Analytics -->
</head>
<body <?php body_class("normal"); ?>>