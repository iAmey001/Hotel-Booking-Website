function get_users()
{
  let xhr = new XMLHttpRequest();
  xhr.open("POST","ajax/users.php",true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  xhr.onload = function(){
    document.getElementById('users-data').innerHTML = this.responseText;
  }

  xhr.send('get_users');
}


function toggle_status(id,val)
{
  let xhr = new XMLHttpRequest();
  xhr.open("POST","ajax/users.php",true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  xhr.onload = function(){
    if(this.responseText==1){
      alert('success','Status toggled!');
      get_users();
    }
    else{
      alert('success','Server Down!');
    }
  }

  xhr.send('toggle_status='+id+'&value='+val);
}

function remove_user(user_id)
{
  if(confirm("Are you sure, you want to remove this user?"))
  {
    let data = new FormData();
    data.append('user_id',user_id);
    data.append('remove_user','');

    let xhr = new XMLHttpRequest();
    xhr.open("POST","ajax/users.php",true);

    xhr.onload = function()
    {
      if(this.responseText == 1){
        alert('success','User Removed!');
        get_users();
      }
      else{
        alert('error','User removal failed!');
      }
    }
    xhr.send(data);
  }
}

function search_user(username){
  let xhr = new XMLHttpRequest();
  xhr.open("POST","ajax/users.php",true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  xhr.onload = function(){
    document.getElementById('users-data').innerHTML = this.responseText;
  }

  xhr.send('search_user&name='+username);
}

window.onload = function(){
  get_users();
}