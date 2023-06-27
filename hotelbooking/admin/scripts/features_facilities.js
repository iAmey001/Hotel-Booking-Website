let feature_s_form = document.getElementById('feature_s_form');
let facility_s_form = document.getElementById('facility_s_form');

feature_s_form.addEventListener('submit',function(e){
  e.preventDefault();
  add_feature();
});

function add_feature()
{
  let data = new FormData();
  data.append('name',feature_s_form.elements['feature_name'].value);
  data.append('add_feature','');

  let xhr = new XMLHttpRequest();
  xhr.open("POST","ajax/features_facilities.php",true);

  xhr.onload = function(){
    var myModal = document.getElementById('feature-s');
    var modal = bootstrap.Modal.getInstance(myModal);
    modal.hide();

    if(this.responseText == 1){
      alert('success','New feature added!');
      feature_s_form.elements['feature_name'].value='';
      get_features();
    }
    else{
      alert('error','Server Down!');
    }
  }

  xhr.send(data);
}

function get_features()
{
  let xhr = new XMLHttpRequest();
  xhr.open("POST","ajax/features_facilities.php",true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  xhr.onload = function(){
    document.getElementById('features-data').innerHTML = this.responseText;
  }

  xhr.send('get_features');
}

function rem_feature(val)
{
  let xhr = new XMLHttpRequest();
  xhr.open("POST","ajax/features_facilities.php",true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  xhr.onload = function(){
    if(this.responseText==1){
      alert('success','Feature removed!');
      get_features();
    }
    else if(this.responseText == 'room_added'){
      alert('error','Feature is added in room!');
    }
    else{
      alert('error','Server down!');
    }
  }

  xhr.send('rem_feature='+val);
}

facility_s_form.addEventListener('submit',function(e){
  e.preventDefault();
  add_facility();
});

function add_facility()
{
  let data = new FormData();
  data.append('name',facility_s_form.elements['facility_name'].value);
  data.append('icon',facility_s_form.elements['facility_icon'].files[0]);
  data.append('desc',facility_s_form.elements['facility_desc'].value);
  data.append('add_facility','');

  let xhr = new XMLHttpRequest();
  xhr.open("POST","ajax/features_facilities.php",true);

  xhr.onload = function(){
    var myModal = document.getElementById('facility-s');
    var modal = bootstrap.Modal.getInstance(myModal);
    modal.hide();

    if(this.responseText == 'inv_img'){
      alert('error','Only SVG images are allowed!');
    }
    else if(this.responseText == 'inv_size'){
      alert('error','Image should be less than 1MB!');
    }
    else if(this.responseText == 'upd_failed'){
      alert('error','Image upload failed. Server Down!');
    }
    else{
      alert('success','New facility added!');
      facility_s_form.reset();
      get_facilities();
    }
  }

  xhr.send(data);
}

function get_facilities()
{
  let xhr = new XMLHttpRequest();
  xhr.open("POST","ajax/features_facilities.php",true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  xhr.onload = function(){
    document.getElementById('facilities-data').innerHTML = this.responseText;
  }

  xhr.send('get_facilities');
}

function rem_facility(val)
{
  let xhr = new XMLHttpRequest();
  xhr.open("POST","ajax/features_facilities.php",true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  xhr.onload = function(){
    if(this.responseText==1){
      alert('success','Facility removed!');
      get_facilities();
    }
    else if(this.responseText == 'room_added'){
      alert('error','Facility is added in room!');
    }
    else{
      alert('error','Server down!');
    }
  }

  xhr.send('rem_facility='+val);
}

window.onload = function(){
  get_features();
  get_facilities();
}
