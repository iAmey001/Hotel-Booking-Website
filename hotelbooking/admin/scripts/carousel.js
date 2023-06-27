
let carousel_s_form = document.getElementById('carousel_s_form');
let carousel_picture_inp = document.getElementById('carousel_picture_inp');


carousel_s_form.addEventListener('submit',function(e){
  e.preventDefault();
  add_image();
});

function add_image()
{
  let data = new FormData();
  data.append('picture',carousel_picture_inp.files[0]);
  data.append('add_image','');

  let xhr = new XMLHttpRequest();
  xhr.open("POST","ajax/carousel_crud.php",true);

  xhr.onload = function(){
    var myModal = document.getElementById('carousel-s');
    var modal = bootstrap.Modal.getInstance(myModal);
    modal.hide();

    if(this.responseText == 'inv_img'){
      alert('error','Only JPG and PNG images are allowed!');
    }
    else if(this.responseText == 'inv_size'){
      alert('error','Image should be less than 2MB!');
    }
    else if(this.responseText == 'upd_failed'){
      alert('error','Image upload failed. Server Down!');
    }
    else{
      alert('success','New image added!');
      carousel_picture_inp.value='';
      get_carousel();
    }
  }

  xhr.send(data);
}

function get_carousel()
{
  let xhr = new XMLHttpRequest();
  xhr.open("POST","ajax/carousel_crud.php",true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  xhr.onload = function(){
    document.getElementById('carousel-data').innerHTML = this.responseText;
  }

  xhr.send('get_carousel');
}

function rem_image(val)
{
  let xhr = new XMLHttpRequest();
  xhr.open("POST","ajax/carousel_crud.php",true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  xhr.onload = function(){
    if(this.responseText==1){
      alert('success','Image removed!');
      get_carousel();
    }
    else{
      alert('error','Server down!');
    }
  }

  xhr.send('rem_image='+val);
}

window.onload = function(){
  get_carousel();
}
