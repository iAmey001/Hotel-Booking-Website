<?php 

  require('admin/inc/essentials.php');

  session_start();
  session_destroy();
  redirect('index.php');

?>