var makeItRain = function() {
  //clear out everything
  $('.rain').empty();

  var increment = 0;
  var drops = "";
  var backDrops = "";

  while (increment < 100) {
    //couple random numbers to use for various randomizations
    //random number between 98 and 1
    var randPos = (Math.floor(Math.random() * (98 - 1 + 1) + 1));
    //random number between 5 and 2
    var randSp = (Math.floor(Math.random() * (5 - 2 + 1) + 2));
    var randoDura = (Math.floor(Math.random() * 3 + 2)) * 0.5;
    //increment
    increment += randSp;
    //add in a new raindrop with various randomizations to certain CSS properties
    drops += '<div class="drop" style="left: ' + increment + '%; bottom: ' + (randSp + randSp - 1 + 100) + '%; animation-delay: 0.' + randPos + 's; animation-duration: ' + randoDura + 's; filter: hue-rotate(' + (Math.floor(Math.random()*80+1-40)) + 'deg);"><div class="stem" style="animation-delay: 0.' + randPos + 's; animation-duration: 0.5' + randPos + 's;"></div><div class="splat" style="animation-delay: 0.' + randPos + 's; animation-duration: 2.0' + randPos + 's;"></div></div>';
    //backDrops += '<div class="drop" style="right: ' + increment + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 2.0' + 's;"><div class="stem" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div><div class="splat" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 2.0' + randoHundo + 's;"></div></div>';
  }

  $('.rain.front-row').append(drops);
  $('.rain.back-row').append(backDrops);
}

makeItRain();