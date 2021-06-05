<?php

namespace app\core;

use app\core\Database;

abstract class Model
{
    public $db;

    public function __construct()
    {
        $this->db = new Database;
    }
}

?>