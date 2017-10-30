<?php
// Incluir todos los archivos php de la carpeta actual

foreach (glob(__DIR__ . DIRECTORY_SEPARATOR . 'abstract' . DIRECTORY_SEPARATOR . "*.php") as $filename) {
    require_once $filename;
}
foreach (glob(__DIR__ . DIRECTORY_SEPARATOR . "*.php") as $filename) {
    require_once $filename;
}

foreach (glob(__DIR__ . DIRECTORY_SEPARATOR . 'opciones' . DIRECTORY_SEPARATOR . "*.php") as $filename) {
    require_once $filename;
}
