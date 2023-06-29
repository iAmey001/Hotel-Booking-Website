Check these things before running the project

1. db_config.php in Admin Folder

[.] Database file is present in the DATABASE folder, you just need to import it in phpmyadmin.
[.] Check the database name, localhost, user name and password.



2. essentials.php in Admin Folder

[.] define('SITE_URL','http://127.0.0.1/hotelbooking/')
  
  -> change the above url accordingly, if your project folder name is changed from "hotelbooking" to something else.

[.] define('UPLOAD_IMAGE_PATH',$_SERVER['DOCUMENT_ROOT'].'/hotelbooking/images/')

  -> change the above url accordingly, if your folder name is changed from "hotelbooking" to something else.

[.] define('SENDGRID_API_KEY',"PASTE YOUR API KEY GENERATED FROM SENDGRID WEBSITE")
[.] define('SENDGRID_EMAIL',"PUT YOUR EMAIL")
[.] define('SENDGRID_NAME',"ANY NAME")
 
  -> Create an account on sendgrid and generate the API key and just simply paste it in above lines



3. hotelbooking/inc/paytm/config_paytm.php

[.] Go to paytm business webiste and login with your account 
    & on dashboard of paytm you will find "Developer settings" -> "api keys".
    Get your api keys from there and change it in file "config_paytm.php"

  define('PAYTM_ENVIRONMENT', 'TEST'); // PROD
	define('PAYTM_MERCHANT_KEY', 'PASTE YOUR MERCHANT KEY'); //Change this constant's value with Merchant key received from Paytm.
	define('PAYTM_MERCHANT_MID', 'PASTE YOUR MERCHANT MID'); //Change this constant's value with MID (Merchant ID) received from Paytm.
	define('PAYTM_MERCHANT_WEBSITE', 'WEBSTAGING'); //Change this constant's value with Website name received from Paytm.
	define('INDUSTRY_TYPE_ID', 'Retail'); // Change this constant with website industry type given by paytm
	define('CHANNEL_ID', 'WEB'); // Change this constant with website channel id given by paytm
	
[.] Change the below constant with callback url accrodingly -> but dont change the file pay_resonse.php

	define('CALLBACK_URL', 'http://localhost/hotelbooking/pay_response.php'); 
