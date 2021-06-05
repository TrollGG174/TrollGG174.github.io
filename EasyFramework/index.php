<?php

use app\core\Router;
require __DIR__ . '/vendor/autoload.php';
define('ROOT', __DIR__);
define('APP', __DIR__ . '/app');
define('MODELS', 'app\models\\');
define('ERROR', __DIR__ . '/public/404.php');
define('ROUTES', __DIR__ . '/config/easyroutes.php');
define('SECURITY', __DIR__ . '/config//');
define('DATABASE', __DIR__ . '/config/easydb.php');

ini_set('display_errors', 1);
error_reporting(E_ALL);

function debug($var)
{
    echo '<pre>';
    var_dump($var);
    echo '</pre>';
    exit;
}

/*spl_autoload_register(function ($class) 
{
    $way = ROOT . '/' . str_replace('\\','/', $class . '.php');
    if(file_exists($way))
        require_once $way;
});*/

//require __DIR__ . '/vendor/autoload.php';

session_start();

$router = new Router;
$router -> initRoute();//*/

?>