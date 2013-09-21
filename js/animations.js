var width  = 100, height = 100;
  
// Images
var frames = {
  raining: [
    [
      " .______,                  ____,         ".split(""),
      "( .  - . )____,  .-------,(     )        ".split(""),
      " (_.___._.) ,  )(   ,  ,  ) ___)         ".split(""),
      "     (__._,_,__) (_,__._,__)             ".split(""),
      "        |          |                     ".split(""),
      "        .        |             |         ".split(""),
      "   |                     |               ".split(""),
      "     .     |     .    .    |             ".split(""),
      "        |                            |   ".split(""),
      "                          .     |        ".split(""),
      "   | .        |       |    |             ".split(""),
      "     |                               |   ".split("")
    ],
    [
      "        .______,                  ____,  ".split(""),
      "       ( .  - . )____,  .-------,(     ) ".split(""),
      "        (_.___._.) ,  )(   ,  ,  ) ___)  ".split(""),
      "            (__._,_,__) (_,__._,__)      ".split(""),
      "        .        |             |         ".split(""),
      "   |                     |               ".split(""),
      "     .     |     .    .    |             ".split(""),
      "        |                            |   ".split(""),
      "        .        |             |         ".split(""),
      "   |                     |               ".split(""),
      "     .     |     .    .    |             ".split(""),
      "        |                            |   ".split("")
    ]    
  ],
  cloudy : [
  ],
  snowing : [
  ],
  sunny : [
  ]
};

// Background
var background = [];
_.times(width, function(n) {
  background.push([]);
  _.times (height, function(m) {
    background[n][m] = ' ';
  });
});

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

function run() {
  //setInterval(function() { animate_frame(); }, 1000);

  //weather("rain");
  //*/
  var x = 0
  setInterval(function() {
    $("body textarea").val(two_dimensional_array_to_string(frames.raining[x]));
    if (x == 0) { x = 1; } else { x = 0 }
  }, 200);


}
//window.onload = function() { };
