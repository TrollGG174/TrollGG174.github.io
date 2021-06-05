<?php

namespace app\controllers;

use app\core\Controller;

class EasyController extends Controller
{

    public function wayAction()
    {
        $this->view->render('Страница пути');
    }

}

?>