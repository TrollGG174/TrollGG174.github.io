<p>Главная страница</p>
<?php foreach ($smth as $key => $value): ?>
    <h2><p><?php echo $value['title']; ?></p></h2>
    <p><?php echo $value['smthtext']; ?></p>
    <hr>
<?php  endforeach; ?>