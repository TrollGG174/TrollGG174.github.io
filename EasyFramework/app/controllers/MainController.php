<?php

namespace app\controllers;

use app\core\Controller;

class MainController extends Controller
{

    public function indexAction()
    {
        $query = $this->model->getSmth();
        $vars = [
            'smth' => $query,
        ];
        $this->view->render('Главная страница', $vars);
    }

}

?>