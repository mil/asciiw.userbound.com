var api_key = "dbe04f1b8655b92d";
var default_zipcode = 24060;

function two_dimensional_array_to_string(array) {
  var ret = "";
  _.times(array.length, function(n) {
    _.times(array[0].length, function(m) {
      ret = ret + array[n][m];
    });
    ret = ret + "\n";
  });
  return ret;
}

function display_weather(json) {
  console.log(json);

  var x = 0;
  setInterval(function() {
    $("body textarea").val(
      two_dimensional_array_to_string(frames.raining[x])
    );
    if (x == 0) { x = 1; } else { x = 0 }
  }, 200);
}

function get_weather(zip_code) {
  $.getJSON("http://api.wunderground.com/api/" + api_key + "/conditions/q/" + zip_code + ".json", function(data) {
    display_weather(data);
  });
}
window.onload = function() { };
