$(document).ready(function(){
  var KEY = {
    UP: 38,
    DOWN: 40,
    W: 87,
    S: 83
  }
  var pingpong = {};
  pingpong.pressedKeys = [];
  
  pingpong.ball = {
    speed: 5,
    x: 150,
    y: 100,
    directionX: 1,
    directionY: 1
  };
  
  pingpong.score = {
    scoreA: 0,  // score for player A
    scoreB: 0   // score for player B
  };
  
  if(pingpong.score.scoreB != 10 || pingpong.score.scoreA != 10){
  $(function(){
    // set interval to call gameloop every 30 milliseconds
    pingpong.timer = setInterval(gameloop,30);
    // mark down what key is down and up into an array called "pressedKeys"
    $(document).keydown(function(e){
      pingpong.pressedKeys[e.which] = true;
    });
    $(document).keyup(function(e){
      pingpong.pressedKeys[e.which] = false;
    });
  });
  
  function gameloop() {
    movePaddles();
    moveBall();
  }
  
  function movePaddles() {
    var playgroundHeight = parseInt($("#playground").height());
    // use our custom timer to continuously check if a key is pressed.
    if(pingpong.pressedKeys[KEY.UP]){ // arrow-up
      // move the paddle B up 5 pixels
      var top = parseInt($("#paddleB").css("top"));
      if(top > 0){
        $("#paddleB").css("top",top-5);
      }
    }
    if(pingpong.pressedKeys[KEY.DOWN]){ // arrow-down
      // move the paddle B down 5 pixels
      var top = parseInt($("#paddleB").css("top"));
      if(top < 130){
        $("#paddleB").css("top",top+5);
      }
    }
    if(pingpong.pressedKeys[KEY.W]){ // w
      // move the paddle A up 5 pixels
      var top = parseInt($("#paddleA").css("top"));
      if(top > 0){
        $("#paddleA").css("top",top-5);
      }
    }
    if(pingpong.pressedKeys[KEY.S]){ // s
      // move the paddle A down 5 pixels
      var top = parseInt($("#paddleA").css("top"));
      if(top < 130){
        $("#paddleA").css("top",top+5);
      }
    }
  }
  
  function moveBall() {
    
    // reference useful variables
    var playgroundHeight = parseInt($("#playground").height());
    var playgroundWidth = parseInt($("#playground").width());
    var ball = pingpong.ball;
    // check playground boundary
    // check bottom edge
    if (ball.y + ball.speed*ball.directionY > playgroundHeight)
    {
      ball.directionY = -1;
    }
    // check top edge
    if (ball.y + ball.speed*ball.directionY < 0)
    {
      ball.directionY = 1;
    }
    // check right edge
    if(pingpong.score.scoreA < 10){
      if (ball.x +ball.speed*ball.directionX > playgroundWidth)
      {
        // player B lost.
        pingpong.score.scoreA++;
        $("#scoreA").html(pingpong.score.scoreA);
        // reset the ball;
        ball.x = 250;
        ball.y = 100;
        $("#ball").css({
          "left": ball.x,
          "top" : ball.y
        });
        ball.directionX = -1;
      }
    }else{
      ball.x = 150;
      ball.y = 100;
      $("#ball").css({
        "left": ball.x,
        "top" : ball.y
      });
    }
    // check left edge
    if(pingpong.score.scoreB < 10){
      if (ball.x  + ball.speed*ball.directionX < 0)
      {
        // player A lost.
        pingpong.score.scoreB++;
        $("#scoreB").html(pingpong.score.scoreB);
        // reset the ball;
        ball.x = 150;
        ball.y = 100;
        $("#ball").css({
          "left": ball.x,
          "top" : ball.y
        });
        ball.directionX = 1;
      }
    }else{
      ball.x = 150;
      ball.y = 100;
      $("#ball").css({
        "left": ball.x,
        "top" : ball.y
      });
    }

    ball.x += ball.speed * ball.directionX;
    ball.y += ball.speed * ball.directionY;
    // check moving paddle here, later.
    // check left paddle
    var paddleAX = parseInt($("#paddleA").css("left"))+parseInt($("#paddleA").css("width"));
    var paddleAYBottom = parseInt($("#paddleA").css("top"))+parseInt($("#paddleA").css("height"));
    var paddleAYTop = parseInt($("#paddleA").css("top"));
    if (ball.x + ball.speed*ball.directionX < paddleAX)
    {
      if (ball.y + ball.speed*ball.directionY <= paddleAYBottom && ball.y + ball.speed*ball.directionY >= paddleAYTop)
      {
        ball.directionX = 1;
      }
    }
    // check right paddle
    var paddleBX = parseInt($("#paddleB").css("left"));
    var paddleBYBottom = parseInt($("#paddleB").css("top"))+parseInt($("#paddleB").css("height"));
    var paddleBYTop = parseInt($("#paddleB").css("top"));
    if (ball.x + ball.speed*ball.directionX >= paddleBX)
    {
      if (ball.y + ball.speed*ball.directionY <= paddleBYBottom && ball.y + ball.speed*ball.directionY >= paddleBYTop)
      {
        ball.directionX = -1;
      }
    }
    // actually move the ball with speed and direction
    $("#ball").css({
      "left" : ball.x,
      "top" : ball.y
    });
    
  }
  }   
           
  //console.logs any keydown pressed
  $(document).keydown(function(e){
    console.log(e.which);
  });

});