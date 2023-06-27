<?php 

  require('../inc/db_config.php');
  require('../inc/essentials.php');
  adminLogin();


  if(isset($_POST['add_image']))
  {
    $img_r = uploadImage($_FILES['picture'],CAROUSEL_FOLDER);

    if($img_r == 'inv_img'){
      echo $img_r;
    }
    else if($img_r == 'inv_size'){
      echo $img_r;
    }
    else if($img_r == 'upd_failed'){
      echo $img_r;
    }
    else{
      $q = "INSERT INTO `carousel`(`image`) VALUES (?)";
      $values = [$img_r];
      $res = insert($q,$values,'s');
      echo $res;
    }
  }

  if(isset($_POST['get_carousel']))
  {
    $res = selectAll('carousel');

    while($row = mysqli_fetch_assoc($res))
    {
      $path = CAROUSEL_IMG_PATH;
      echo <<<data
        <div class="col-md-4 mb-3">
          <div class="card bg-dark text-white">
            <img src="$path$row[image]" class="card-img">
            <div class="card-img-overlay text-end">
              <button type="button" onclick="rem_image($row[sr_no])" class="btn btn-danger btn-sm shadow-none">
                <i class="bi bi-trash"></i> Delete
              </button>
            </div>
          </div>
        </div>
      data;
    }
  }

  if(isset($_POST['rem_image']))
  {
    $frm_data = filteration($_POST);
    $values = [$frm_data['rem_image']];

    $pre_q = "SELECT * FROM `carousel` WHERE `sr_no`=?";
    $res = select($pre_q,$values,'i');
    $img = mysqli_fetch_assoc($res);

    if(deleteImage($img['image'],CAROUSEL_FOLDER)){
      $q = "DELETE FROM `carousel` WHERE `sr_no`=?";
      $res = delete($q,$values,'i');
      echo $res;
    }
    else{
      echo 0;
    }

  }

?>