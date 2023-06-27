<?php 

  require('../inc/db_config.php');
  require('../inc/essentials.php');
  date_default_timezone_set("Asia/Kolkata");
  adminLogin();

  if(isset($_POST['get_bookings']))
  {
    $frm_data = filteration($_POST);

    $limit = 2;
    $page = $frm_data['page'];
    $start = ($page-1) * $limit;

    $query = "SELECT bo.*, bd.* FROM `booking_order` bo
      INNER JOIN `booking_details` bd ON bo.booking_id = bd.booking_id
      WHERE ((bo.booking_status='booked' AND bo.arrival=1) 
      OR (bo.booking_status='cancelled' AND bo.refund=1)
      OR (bo.booking_status='payment failed')) 
      AND (bo.order_id LIKE ? OR bd.phonenum LIKE ? OR bd.user_name LIKE ?) 
      ORDER BY bo.booking_id DESC";

    $res = select($query,["%$frm_data[search]%","%$frm_data[search]%","%$frm_data[search]%"],'sss');
    
    $limit_query = $query ." LIMIT $start,$limit";
    $limit_res = select($limit_query,["%$frm_data[search]%","%$frm_data[search]%","%$frm_data[search]%"],'sss');

    $total_rows = mysqli_num_rows($res);

    if($total_rows==0){
      $output = json_encode(["table_data"=>"<b>No Data Found!</b>", "pagination"=>'']);
      echo $output;
      exit;
    }

    $i=$start+1;
    $table_data = "";

    while($data = mysqli_fetch_assoc($limit_res))
    {
      $date = date("d-m-Y",strtotime($data['datentime']));
      $checkin = date("d-m-Y",strtotime($data['check_in']));
      $checkout = date("d-m-Y",strtotime($data['check_out']));

      if($data['booking_status']=='booked'){
        $status_bg = 'bg-success';
      }
      else if($data['booking_status']=='cancelled'){
        $status_bg = 'bg-danger';
      }
      else{
        $status_bg = 'bg-warning text-dark';
      }
      
      $table_data .="
        <tr>
          <td>$i</td>
          <td>
            <span class='badge bg-primary'>
              Order ID: $data[order_id]
            </span>
            <br>
            <b>Name:</b> $data[user_name]
            <br>
            <b>Phone No:</b> $data[phonenum]
          </td>
          <td>
            <b>Room:</b> $data[room_name]
            <br>
            <b>Price:</b> ₹$data[price]
          </td>
          <td>
            <b>Amount:</b> ₹$data[trans_amt]
            <br>
            <b>Date:</b> $date
          </td>
          <td>
            <span class='badge $status_bg'>$data[booking_status]</span>
          </td>
          <td>
            <button type='button' onclick='download($data[booking_id])' class='btn btn-outline-success btn-sm fw-bold shadow-none'>
              <i class='bi bi-file-earmark-arrow-down-fill'></i>
            </button>
          </td>
        </tr>
      ";

      $i++;
    }

    $pagination = "";

    if($total_rows>$limit)
    {
      $total_pages = ceil($total_rows/$limit); 

      if($page!=1){
        $pagination .="<li class='page-item'>
          <button onclick='change_page(1)' class='page-link shadow-none'>First</button>
        </li>";
      }

      $disabled = ($page==1) ? "disabled" : "";
      $prev= $page-1;
      $pagination .="<li class='page-item $disabled'>
        <button onclick='change_page($prev)' class='page-link shadow-none'>Prev</button>
      </li>";


      $disabled = ($page==$total_pages) ? "disabled" : "";
      $next = $page+1;
      $pagination .="<li class='page-item $disabled'>
        <button onclick='change_page($next)' class='page-link shadow-none'>Next</button>
      </li>";

      if($page!=$total_pages){
        $pagination .="<li class='page-item'>
          <button onclick='change_page($total_pages)' class='page-link shadow-none'>Last</button>
        </li>";
      }

    }

    $output = json_encode(["table_data"=>$table_data,"pagination"=>$pagination]);

    echo $output;
  }

?>