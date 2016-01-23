function set_cookie ( cookie_name, cookie_value, lifespan_in_days, valid_domain )
{
  var domain_string = valid_domain ? ("; domain=" + valid_domain) : '' ;
  document.cookie = cookie_name + "=" + encodeURIComponent( cookie_value ) +
      "; max-age=" + 60 * 60 * 24 * lifespan_in_days +
      "; path=/" + domain_string ;
}

function get_cookie ( cookie_name )
{
  var cookie_string = document.cookie ;
  if (cookie_string.length !== 0) {
    var cookie_value = cookie_string.match ( '(^|;)[\s]*' + cookie_name + '=([^;]*)' );
    return decodeURIComponent ( cookie_value[2] ) ;
  }
  return '' ;
}

function refresh() {
  $.get("/players.php", function(data) {
    if (data == "offline") {
      $("#status").text("Server is offline");
    } else {
      var d = JSON.parse(data);
      $("#status").attr("title", "Online Players: " + d.online + "/" + d.max);
      $("#status").attr("data-original-title", "Online Players: " + d.online + "/" + d.max);
    }
  });
}
setInterval(refresh, 15000);
refresh();
