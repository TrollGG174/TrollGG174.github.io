<?php

namespace app\models;

use app\core\Model;

class MainModel extends Model
{
   public function getSmth()
   {
        return $this->db->showRow('SELECT title,smthtext FROM smth');
   }
}

?>