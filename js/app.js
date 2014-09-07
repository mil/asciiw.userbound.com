var api_key = "dbe04f1b8655b92d";
var default_zipcode = 78758;
var old_text = "";
var timer;
var weather_conditions = {
  "light rain" : { title : "Lightly Raining in ", frame : slides.raining },
  "rain" : { title : "Raining in ", frame : slides.raining },
  "cloud" : { title : "Cloudy in ", frame : slides.cloudy },
  "clear" : { title : "All Clear in ", frame : slides.clear },
  "overcast" : { title : "Overcast in ", frame : slides.cloudy },
  "sun" : { title : "Sunny in ", frame : slides.cloudy },
  "snow" : { title : "Snowing in ", frame : slides.snowing }
};

function error(message) {
  clear_timer();
  console.log(message);
  $("body textarea").val(message);
}

function fade_in(zepto_selector) {
  zepto_selector.animate({ "opacity" : 100 }, 300, "linear");
}

function warn(message) {
  console.log("Warning: " + message);
}

function switch_zip() {
  var new_zip = $("#location input").val().replace(" ", "");
  if (new_zip.match(/\d{5}/)) {
    var parts = window.location.href.split("/");
    var now = parts[parts.length -1].match(/\d+/);
    if (now && now.length > 0) { parts.pop(); }
    console.log(parts.join("/") + "/" + new_zip);
    window.location.href = parts.join("/") + "/" + new_zip;
  } else { warn("Invalid Zipcode!"); }
}

function install_event_handlers() {
  $("body").on('click', function(e) {
    console.log(e.target);
    if ($(e.target).attr("id") != "location" && !$(e.target).is("input")) {
      $("#location").html(old_text);
    }
  });
  $("#location").on('click', function() {
    if ($("#location").has("input").length == 0) {
      old_text = $("#location").html();
      $("#location").html("<input type='text' placeholder='Enter ZIP'></input><a href='#'>Go</a>");
      $("#location input").focus();
      install_event_handlers();
    } else {
    }
  });
  $("#location a").on('click', function() { switch_zip(); return false; });
  $(document).on('keypress', function(e) { if (e.keyCode == 13) { switch_zip(); } });
}

function timenow(){
  var now= new Date(), ampm= 'AM',
  h= now.getHours(), m= now.getMinutes(), s= now.getSeconds();
  if(h>= 12){ if(h>12)h-= 12; ampm= 'PM'; }
    if(h<10) h= '0'+h;
      if(m<10) m= '0'+m;
        if(s<10) s= '0'+s;
          return now.toLocaleDateString()+' '+h+':'+m+':'+s+' '+ampm;
}

function animate_weather(slides_hash) {
  var x = 0;
  timer = setInterval(function() {
    $("body textarea").val(slides_hash.frames[x].join("\n"));
    x = x + 1;
    if (x == slides_hash.frames.length) { x = 0; }
  }, slides_hash.interval);
}
function clear_timer() { clearInterval(timer); }

function display_weather(zip, data) {
  var frame = null,
  location = data.display_location.full;
  city     = data.display_location.city;

  for (condition in weather_conditions) {
    if (data.weather.toLowerCase().match(condition)) {
      $("h2").html(weather_conditions[condition].title + city);
      frame = weather_conditions[condition].frame;
    }
  }
  if (!frame) {
    error("Unsupported Weather Status '" + data.weather + "'\nPlease submit a bug, patch, or report!");
    return;
  }

  $("#location").html(location + " - " + zip);
  $("#details").html(data.temp_f + "&deg;F | " + data.wind_mph + "MPH Wind | " + data.wind_string );
  $("#date").html(timenow());
  fade_in($("#location"));
  fade_in($("h2"));
  fade_in($("#details"));
  fade_in($("#date"));
  animate_weather(frame);
}

function get_weather(zip_code) {
  $.ajax({
    url : "http://api.wunderground.com/api/" + api_key + "/conditions/q/" + zip_code + ".json", 
    dataType : "jsonp",
    success : function(data) { display_weather(zip_code, data.current_observation); },
    error : function(data) { error("Either\n You're not connected to the Internets\nor Wunderground is down buddy"); },
    timeout: 3000
  });
}
window.onload = function() { 
  install_event_handlers();
  var parts = window.location.href.split("/");
  var matches = parts[parts.length -1].match(/\d{5}/);
  get_weather(matches && matches[0] ? matches[0] : default_zipcode);
};
