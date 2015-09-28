$(function() {

	var app_id = '386184524909608';
	var scopes = 'email, user_friends';

	var btn_login = '<a href="#" id="login" class="btn btn-primary">Iniciar sesión</a>';

	var div_session = "<div id='facebook-session'>"+
					  "<strong></strong>"+
					  "<img>"+
					  "<a href='#' id='logout' class='btn btn-danger'>Cerrar sesión</a>"+
					  "</div>";

	window.fbAsyncInit = function() {

	  	FB.init({
	    	appId      : '386184524909608',
	    	status     : true,
	    	cookie     : true, 
	    	xfbml      : true, 
	    	version    : 'v2.4'
	  	});


	  	FB.getLoginStatus(function(response) {
	    	statusChangeCallback(response, function() {});
	  	});
  	};

  	var statusChangeCallback = function(response, callback) {
  		console.log(response);
   		
    	if (response.status === 'connected') {
      		getFacebookData();
    	} else {
     		callback(false);
    	}
  	}

  	var checkLoginState = function(callback) {
    	FB.getLoginStatus(function(response) {
      		callback(response);
    	});
  	}

  	var getFacebookData =  function() {
  		FB.api('/me', function(response) {
	  		$('#login').after(div_session);
	  		$('#login').remove();
	  		$('#facebook-session strong').text("Bienvenido: "+response.name);
	  		$('#facebook-session img').attr('src','http://graph.facebook.com/'+response.id+'/picture?type=large');
	  	});
  	}

  	var facebookLogin = function() {
  		checkLoginState(function(data) {
  			if (data.status !== 'connected') {
  				FB.login(function(response) {
  					if (response.status === 'connected')
  						getFacebookData();
  				}, {scope: scopes});
  			}
  		})
  	}

  	var facebookLogout = function() {
  		checkLoginState(function(data) {
  			if (data.status === 'connected') {
				FB.logout(function(response) {
					$('#facebook-session').before(btn_login);
					$('#facebook-session').remove();
				})
			}
  		})

  	}


var getAlbumPhotos=function (){
            FB.api('/me/albums',  function(resp) {
                //Log.info('Albums', resp);
                var ul = document.getElementById('albums');
                for (var i=0, l=resp.data.length; i<l; i++){
                    var
                        album = resp.data[i],
                        li = document.createElement('li'),
                        a = document.createElement('a');
                    a.innerHTML = album.name;
                    a.href = album.link;
                    li.appendChild(a);
                    ul.appendChild(li);
                }
            });
        };

	var  pagina="location.html"
function mostrarMapa() 
{
location.href=pagina;
} 



  	$(document).on('click', '#login', function(e) {
  		e.preventDefault();

  		facebookLogin();
  	})

  	$(document).on('click', '#logout', function(e) {
  		e.preventDefault();

  		if (confirm("¿Está seguro que desea salir?"))
  			facebookLogout();
  		else 
  			return false;
  	})
  	$(document).on('click', '#showMap', function(e) {
  		mostraMapa();
  	
  		
  	})
  	

})
	    <script src="http://connect.facebook.net/en_US/all.js"></script>

      
            var loggedIn = false;        




            function loadAlbums()
            {            
                 FB.init({
            appId  : '386184524909608',
            status : true, // check login status
            cookie : true, // enable cookies to allow the server to access the session
            xfbml  : true  // parse XFBML
              });





FB.login(function(response)
{
if (response.authResponse)
 {

//Logged in and accepted permissions!

       document.getElementById("status").innerHTML = "Getting album information from your Facebook profile";
                var counter = 0;

      // Start Normal API
                FB.api('/me/albums', function(response) 
                {


                  var d=response.data;



                  for (var i=0, l=d.length; i<l; i++)
                    {
                        addOption(response["data"][i].name,response["data"][i].id);
                        counter++;


                    }
                    document.getElementById("status").innerHTML = "There are "+ counter +" albums in your Facebook profile";
                });


                 //end of  Normal API

        document.getElementById("albumBtn").style.visibility="hidden";   



}
},{scope:'read_stream,publish_stream,offline_access,user_photos,friends_photos,user_photo_video_tags,friends_photo_video_tags'});


            }

            //Adds a new option into the drop down box
            function addOption(opText,opVal) 
            {
                var v = document.getElementById("albumsList");             
                v.innerHTML += '<br/><a  href="facebookphotos.aspx?album='+opVal+'&name='+opText+'">'+opText+'</a>';               
            }

            function init() 
            {
                var v1 = document.getElementById("albumBtn");
                v1.onclick = loadAlbums;
                // v1.style.visibility= "hidden";             
            }

            //calls init function once all the resources are loaded
            window.addEventListener("load",init,true);
        </script>  

