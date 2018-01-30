/** 
TODO
*/
//initial setup
var playerIdent='';
var cpuIdent='';
var turnDelay=1000;
var playerTurn=true;
var playertestflag=false;
var gamestate={
  '1':'',
  '2':'',
  '3':'',
  '4':'',
  '5':'',
  '6':'',
  '7':'',
  '8':'',
  '9':'',
  'cpu':[],
  'player':[],
  'empty':['1','2','3','4','5','6','7','8','9']
};
var winstates=[
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['1', '5', '9'],
  ['3', '5', '7'],
  ['1', '4', '7'],
  ['2', '5', '8'],
  ['3', '6', '9']
];

var corners =[1,3,7,9];

//reset state stays clean
var turns=0;
//listener - case where player chooses X
$('#identX').click(function(){
  playerIdent='X';
  cpuIdent='O';
  playerTurn=true;
  console.log('the game is starting, you will play '+playerIdent+' and I will play '+cpuIdent);
  $('#msg')[0].innerHTML= "<p>it's your turn</p>";
  $('#overlay').slideUp();
});
//case where player chooses O
$('#identO').click(function(){
  playerIdent='O';
  cpuIdent='X';
  playerTurn=false;
  console.log('the game is starting, you will play '+playerIdent+' and I will play '+cpuIdent);
  $('#msg')[0].innerHTML= "<p>it's my turn</p>";
  $('#overlay').slideUp();
  
  //insert turn function for cpu to take first turn as X;
  setTimeout(function(){cpuTurn();}, turnDelay);
});

//listener for player interaction on the 9 .spots
$('.spot').click(function(event){
  //...if it's your turn...
  if(playerTurn===true){
    //grab the spot you clicked
    var spot=String(($(this)[0].attributes.id.value));
    
    //update gamestate for AI
    if(gamestate[spot]===''){
      gamestate[spot]=playerIdent;
      
      gamestate.player.push(spot);
      gamestate.empty.splice(gamestate.empty.indexOf(spot),1);
      //mark the spot you chose in the DOM
      $('#'+spot)[0].innerHTML='<p>'+playerIdent+'</p>';
      //end your turn
      console.log('you have chosen '+spot);
      playerTurn=!playerTurn;
      turns++;
      $('#msg')[0].innerHTML= "<p>it's my turn</p>";
      //insert CPU turn function
      setTimeout(function(){cpuTurn();}, turnDelay);
    }
  }    
});
///***AI FUNCTIONS***
//check for win function
function checkWin(checkAgainst){
 //strategy: forEach the winstates and check if either the player or the cpu has all of the points in a given winstate, if a player or CPU has TWO points in a given winstate, checkWin returns the third point in the winstate for a block or a victory
  //console.log('checking wins against ' + checkAgainst);
  
  //{console.log('turn: '+turns+' checkwin running with '+checkAgainst);}
  var counter=0;
  var winmove='';
  var foundwin=false;
  if(playertestflag=true){console.log('testing for player win on turn: '+turns);}
  winstates.forEach(function(test){
    if(playertestflag=true){console.log('testing: '+test);}
    counter=0;
    var moveArr=[];
    //console.log('checking: '+test);
    for(var i=0;i<checkAgainst.length;i++){
       // console.log('I am comparing '+test+'with '+checkAgainst[i]);
      if(playertestflag=true){console.log('checking:'+checkAgainst[i]);}
      if (test.indexOf(checkAgainst[i])>-1){
        if(playertestflag=true){console.log('found match: '+checkAgainst[i]);}
       // console.log(checkAgainst[i]+ ' is a part of '+test);
        
        counter++;
        
        if(playertestflag=true){console.log('found match: '+checkAgainst[i]+'count: '+counter);}
        if(counter>1){
         // console.log('i found a potential winning move and am checking if it is available');
          if(playertestflag=true){console.log('I am running checkavl against'+test);}
          if((checkavl(test).length>0)){
            moveArr=checkavl(test);
            if(playertestflag=true){console.log('writing to moveArr '+ moveArr+' with length: '+moveArr.length);}
          }
          //console.log('potential winmove, still looking for third: '+moveArr);
          //console.log('checkwin found a potential match on winstate: '+test+' match value: '+checkAgainst[i]+' counter: '+counter+' moveArr: '+moveArr);
        }
      }
      else{
        if(counter>1){
          //console.log('checkwin found a potential winning move: '+checkAgainst[i]);
        }
      }
      if(counter==2){
        //console.log('move here to win or block: ' + moveArr);
        if(foundwin===false){
          if( moveArr[0]!==undefined){
            winmove=moveArr[0];
          
            console.log('winmove has been written as:' +winmove);
            console.log('wrote undefined')
          }
        }
      }
      if (counter==3){
       // console.log('Win! - this is running - the next line should be true');
        winmove=true;
       // console.log(winmove);
        foundwin=true;
        
      }    }
    
  });
  
  if(turns>3){
   // console.log('turn: '+turns+' checkwin returning'+winmove);
  }
  console.log('did I find a win?'+foundwin);
  console.log('I will return'+winmove)
  return winmove;  
}
//function to find adjacent corners
function getadj(val){
  //console.log('getadj is running with:'+val);
  if(val[0]==='1'){return [3,7];}
  if(val[0]==='3'){return [1,9];}
  if(val[0]==='7'){return [9,1];}
  if(val[0]==='9'){return [7,3];}
}
//function to find diagonal opposite corners
function getopp(val){
  //console.log('getopp is running with: '+val);
  if(val[0]=='1'){return 9;}
  if(val[0]=='3'){return 7;}
  if(val[0]=='7'){return 3;}
  if(val[0]=='9'){return 1;}
}
//function to check if a list of moves is available and replace them with a new list of moves.
function checkavl(arr){
  //console.log('chackavl is running with:'+arr);
  
  var tmp=[];
  arr.forEach(function(val){
    if (gamestate[val]===''){
      // console.log('checkavl is comparing a winstate term: '+val+' with a gamestate term');
      // console.log(gamestate);
      tmp.push(val);
    }
    
  });
  //if more than 2 are available, check if an adjacent side is taken and return the better choice if the default first choice is a bad move
  
  
  // console.log('checkavl is returning:' +tmp);
  return tmp;
}
//function to check if the side next to a corner is occupied
function cornerElim(tmp){
  // console.log('cornerElim is running with: '+tmp);
    //adjacent to 1
    if(tmp[0]===3&&tmp[1]===7){
      if(gamestate[2]===playerIdent){
        tmp=[7];
      }
    }
    //adjacent to 3
    if(tmp[0]===1&&tmp[1]===9){
      //console.log(gamestate[2])
      if(gamestate[2]===playerIdent){
        tmp=[9];
      }
    }
    //adjacent to 7
    if(tmp[0]===9&&tmp[1]===1){
      if(gamestate[8]===playerIdent){
        tmp=[1];
      }
    }
    //adjascent to 9
    if(tmp[0]===7&&tmp[1]===3){
      if(gamestate[8]===playerIdent){
        tmp=[3];
      }
    }
    // bug fix for when the AI is attempting 3 corners and chooses the incorrect corner.
    // choosing between 3 and 9
    if(tmp[0]===3&&tmp[1]===9){
      // console.log('clever player has tricked me into check 1');
      if(gamestate[2]===playerIdent){
        tmp=[9];
      }
    }
    // choosing between 1 and 7
    if(tmp[0]===1&&tmp[1]===7){
      // console.log('clever player has tricked me into check 2');
      if(gamestate[2]===playerIdent){
        tmp=[7];
      }
    }
    // choosing between 1 and 3
    if(tmp[0]===1&&tmp[1]===3){
      
      // console.log('clever player has tricked me into check 3');
      if(gamestate[4]===playerIdent){
        tmp=[3];
      }
    }
    // choosing between 7 and 9
    if(tmp[0]===7&&tmp[1]===9){
      
      //console.log('clever player has tricked me into check 4');
      if(gamestate[4]===playerIdent){
        tmp=[9];
      }
    }
    return tmp;
  }
//cpu turn function
function cpuTurn(){
  //check for win
  console.log('Checking if player won');
  var playervictory=checkWin(gamestate.player);
  console.log('beginning of cpu turn: '+turns+' playervictory: '+playervictory);
  console.log(gamestate);
  if(playervictory===true){
    losetie();
  }
  if(gamestate.empty.length===0){
    $('#msg')[0].innerHTML='TIE!!!';
    losetie();
  }
  
  var selection=0;
  
  //first round - check if this is first turn
  if(turns===0){
    //Pick a random corner
    selection=corners[Math.floor(Math.random() * corners.length)];     
  }
  //player went first
  if(turns===1){ 
    /* below code was enabling a win state
    //check if player took center
    if(gamestate[5]===''){
      selection=5;
    }
    //if the opponent took center
    else{
      corners =[1,3,7,9];
      selection=corners[Math.floor(Math.random() * corners.length)];
    }
    */
    var taken;
    corners.forEach(function(corner){
      if (gamestate[corner] !== ''){
        taken = corner;
      }
    })
    console.log('the player has chosen ' + taken);
    selection = getopp([taken]);
    
    
    
    
  }
  //player is O, turn=2
  if(turns==2){
    //console.log('cpu is active');
    //player went in the middle (take opposite corner from the move in move 0)
    if(gamestate[5]==='O'){
      selection=getopp(gamestate.cpu);
    }
    //player did not go in the middle (take an available adjacent corner)
    else{
      //function to get available adjacent corners
      var options=getadj(gamestate.cpu);
      //function check if an array is available and remove non available spaces
      options=checkavl(options);
      if(options.length>1){
    //console.log('before cornerElim: '+options);
    options=cornerElim(options);
    //console.log('after cornerElim: '+options);
  }
      selection=options[0];
      //console.log(selection);
    }
  }
  //Player is X, turn 3
  console.log('code test 1');
  if (turns>=3){
    console.log('code test 2');
    //console.log ('checking if I can win the game');
    var wincpu=checkWin(gamestate.cpu);
    //console.log('the result of my check If I can win is '+ wincpu);
    console.log ('checking if player can win the game');
    var winplayer=checkWin(gamestate.player);
    console.log(winplayer);
    //console.log('the result of my check If you can win is '+ winplayer);
    //var lose=checkWin(gamestate.player);
    if(wincpu){
      console.log ('I am winning the game');
      selection=wincpu;
    }
    else if(winplayer){
      
      playertestflag=true;
      console.log('I am blocking a player win');
      selection=winplayer;
      playertestflag=false;
    }
    else{
      console.log('I dont know what to do so taking a corner');
      //console.log('choosing between: '+checkavl(corners));
      selection=(checkavl(corners));
      if (selection.length===0){
      console.log('all corners are taken');
        if (gamestate[5]===''){
        //console.log('taking the middle');
          selection=5;
        }
        else{
          console.log('the corners and middle are taken, taking a random side, this game is probably a tie');
          selection=(checkavl([1,2,3,4,5,6,7,8,9])[0]);
        }
      }
      selection=cornerElim(selection);
    }
    if(selection===undefined){
      console.log('no good moves');
      selection=(checkavl([1,2,3,4,5,6,7,8,9])[0]);
    }    
      
  }
    
  //update gamestate and DOM
  if(selection.length>1){
    console.log('fixing a weird choice')
    selection=selection[0];
  }
  console.log('I chose: '+ selection);
  console.log(gamestate);
  gamestate[selection]=cpuIdent;
  gamestate.cpu.push(String(selection));
  gamestate.empty.splice(gamestate.empty.indexOf(String(selection)),1);
  $('#'+selection)[0].innerHTML='<p>'+cpuIdent+'</p>';
  //end turn
  playerTurn=true;
  turns++;
  var cpuvictory=false;
  cpuvictory=checkWin(gamestate.cpu);
  console.log('beginning of player turn: '+turns+'cpuvictory: '+cpuvictory);
  console.log(gamestate);
  if(cpuvictory===true){
    $('#msg')[0].innerHTML='YOU LOSE!!!';
    losetie();
  }
  if(gamestate.empty.length===0){
    $('#msg')[0].innerHTML='TIE!!!';
    losetie();
  }
    
    $('#msg')[0].innerHTML= "<p>it's your turn</p>";
  //check for win
}
//reset listener
$('#reset').click(function(){
  //console.log('reset');
  
  //reset gamestate and DOM
  gameover();
  //reset idents
  playerIdent='';
  cpuIdent='';
  //slideDown overlay
  $('#overlay').slideDown();
});
//reset function
function gameover(){
  //clear the DOM elements
  $('.spot').each(function(){
    this.innerHTML='<p></p>';
  });
  winmove=false;
  gamestate={
  '1':'',
  '2':'',
  '3':'',
  '4':'',
  '5':'',
  '6':'',
  '7':'',
  '8':'',
  '9':'',
  'cpu':[],
  'player':[],
  'empty':['1','2','3','4','5','6','7','8','9']
};
  console.log ('game over');
  //reset turns
  turns=0;
  //reset ident
}
function losetie (){
  
    setTimeout(function(){
      gameover();
      if (playerIdent==='X'){
        playerTurn=true;
        
        $('#msg')[0].innerHTML= "<p>it's your turn</p>";
      }
      else{
        playerTurn=false;
        cpuTurn();
        
    $('#msg')[0].innerHTML= "<p>it's my turn</p>";
      }
    }, turnDelay);
}