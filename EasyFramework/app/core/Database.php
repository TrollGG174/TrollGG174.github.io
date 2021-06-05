<?php

namespace app\core;

use PDO;

class Database
{

    protected $db;

    public function __construct()
    {
        $set = require DATABASE;
        $this->db = new PDO('mysql:host='.$set['host'].';dbname='.$set['dbname'], $set['user'], $set['pass']);
    }

    public function query($sql, $vars = [])
    {
        $request =  $this->db->prepare($sql);
        if(!empty($vars))
        {
            foreach($vars as $key => $value)
            {
                $request->bindValue(':'.$key, $value);
            }
        }
        $request->execute();
        return $request;
    }

    public function showRow($sql, $vars = [])
    {
        return $this->query($sql, $vars)->fetchAll(PDO::FETCH_ASSOC);
    }

    public function showColumn($sql, $vars = [])
    {
        return $this->query($sql, $vars)->fetchColumn();
    }
}



?>