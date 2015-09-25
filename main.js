var getNextFriday = function(d) {
  d = new Date();
  var day = d.getDay(),
  diff = d.getDate() - day + (day > 5 ? (5+7) : 5); // adjust when day is friday

  if ( day >= 5  && (
      (d.getHours() == 11 &&  d.getMinutes() > 30) || d.getHours() > 11
    )) {
    diff += 7;
  }

  result = new Date(d.setDate(diff));
  result.setHours(11);
  result.setMinutes(30);
  result.setSeconds(0);
  return result;
}

var getNextFridayTimestamp = function() {
  return Math.floor(getNextFriday().getTime() / 1000 );
}

var getTimeString = function( seconds ) {
  var d = Math.floor( seconds / 60 / 60 / 24)
  var h = Math.floor( seconds / 60 / 60 % 24);
  var m = Math.floor( seconds / 60 % 60 );
  var s = Math.floor( seconds % 60 );
  var result = '';

  if (d > 0 )
    result += d + " dager, ";

  if (h > 0)
    result += h + " timer, ";

  if (h > 0 || m > 0)
    result += m + " minutter og ";

  result += s + " sekunder";
  return result;
}

var getRemainingTime = function(target) {
  return target -  Math.floor(new Date().getTime() / 1000) ;
}

var updateTimeContainer = function() {
  var remainingTime = getRemainingTime( nextFriday );
  if (remainingTime <= 0) {
    nextFriday = getNextFridayTimestamp();
  }
  jQuery('#countdown').find('h1').text( getTimeString( remainingTime ) );
}

var konamiCode = function() {

}


var nextFriday = getNextFriday(Date.now()); // Mon Nov 08 2010
console.log(nextFriday);
var nextFriday = Math.floor( nextFriday.getTime() / 1000 ); // Convert to timestamp


(function($) {
  $(document).on('ready', function() {

    updateTimeContainer();
    setInterval(updateTimeContainer, 20);
  });
})(jQuery);

var kkeys = [], konami = "38,38,40,40,37,39,37,39,66,65,13";
$(document).keydown(konamiTrigger);

function konamiTrigger(e) {
  kkeys.push( e.keyCode );
  console.log(kkeys.toString());
  if ( kkeys.toString().indexOf( konami ) >= 0 ){
    $(document).unbind('keydown',arguments.callee);
    $.getScript('http://www.cornify.com/js/cornify.js',function(){
      cornify_add();
      $(document).keydown(cornify_add);
    });
  }
}
