var size;
var level;

var stage = 1;
var ClearCount = 2;

var level = [
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 0, 0, 0, 0, 1],
  [1, 1, 3, 0, 2, 0, 1],
  [1, 0, 0, 4, 0, 0, 1],
  [1, 0, 3, 1, 2, 0, 1],
  [1, 0, 0, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1]
];
init_map = [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 1, 0, 0, 0, 0, 1],
        [1, 1, 3, 0, 2, 0, 1],
        [1, 0, 0, 4, 0, 0, 1],
        [1, 0, 3, 1, 2, 0, 1],
        [1, 0, 0, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1]
      ];


var playerPosition; //マップ内のプレイやの位置(ｘ、ｙ)を保持する
var playerSprite; //プレイヤーのスプライト
var cratesArray = []; //配置した木箱のスプライトを配列に保持する
var ddown = 0; // 穴
var audioEngine;

var startTouch;
var endTouch;
var swipeTolerance = 10;//スワイプかを判断する閾値

var audioEngine = cc.audioEngine;


var gameScene = cc.Scene.extend({
  onEnter: function() {
    this._super();

    var layer0 = new gameLayer();
    layer0.init();

    if (!audioEngine.isMusicPlaying()) {
    audioEngine.playMusic(res.bgm, true);
  }
    this.addChild(layer0);

  }
});

var gameLayer = cc.Layer.extend({
  init: function() {
    this._super();
    //スプライトフレームのキャッシュオブジェクトを作成する
    cache = cc.spriteFrameCache;
    //スプライトフレームのデータを読み込む
    cache.addSpriteFrames(res.spritesheet1_plist);
    var backgroundSprite = cc.Sprite.create(cache.getSpriteFrame("background.png"));
    //アンチエイリアス処理を止める
    backgroundSprite.getTexture().setAliasTexParameters();

    backgroundSprite.setPosition(240, 160);
    //スプライトがとても小さいので拡大する
    backgroundSprite.setScale(5);
    this.addChild(backgroundSprite);

    var levelSprite = cc.Sprite.create(cache.getSpriteFrame("level.png"));
    levelSprite.setPosition(240, 110);
    levelSprite.setScale(5);
    this.addChild(levelSprite);

    for (i = 0; i < 7; i++) {　　　　　　
      cratesArray[i] = [];　 //配列オブジェクトの生成
      for (j = 0; j < 7; j++) {
        switch (level[i][j]) {
          case 4:
          case 6:
            playerSprite = cc.Sprite.create(cache.getSpriteFrame("player.png"));
            playerSprite.setPosition(165 + 25 * j, 185 - 25 * i);
            playerSprite.setScale(5);
            this.addChild(playerSprite);
            playerPosition = {
              x: j,
              y: i
            };　　　　　　　　　　　　
            cratesArray[i][j] = null;　 //playerがいるので、その場所には木箱はないのでnullを代入する
            break;
          case 3:
          case 5:
            var crateSprite = cc.Sprite.create(cache.getSpriteFrame("crate.png"));
            crateSprite.setPosition(165 + 25 * j, 185 - 25 * i);
            crateSprite.setScale(5);
            this.addChild(crateSprite);
            cratesArray[i][j] = crateSprite;//(i,j)の位置にcrateSpriteを入れる

            break;
          default:
            cratesArray[i][j] = null;//木箱のコード以外の場合は、その場所に木箱がない値としてnullを代入する

            break;
        }
      }
    }
    //return true;
    cc.eventManager.addListener(listener, this);
  },
});

var listener = cc.EventListener.create({
event: cc.EventListener.TOUCH_ONE_BY_ONE,
swallowTouches: true,
onTouchBegan:function (touch,event) {
startTouch = touch.getLocation();
return true;
},
onTouchEnded:function(touch, event){
endTouch = touch.getLocation();
swipeDirection();
}
});
//スワイプ方向を検出する処理
function swipeDirection(){


    var distX = endTouch.x - startTouch.x ;
    var distY = endTouch.y - startTouch.y ;
    if(Math.abs(distX)+Math.abs(distY)>swipeTolerance){
        if(Math.abs(distX)>Math.abs(distY)){
            if(distX>0){//右方向移動
              //playerSprite.setPosition(playerSprite.getPosition().x+25,playerSprite.getPosition().y);
                move(1,0);
            }
            else{//左方向移動
              //playerSprite.setPosition(playerSprite.getPosition().x-25,playerSprite.getPosition().y);
                move(-1,0);
            }
        }
        else{
        //  console.log("endTouch.y "+endTouch.y );
        //  console.log("startTouch.y "+startTouch.y );
        //  console.log("distY "+ distY );
            if(distY>0){ //上方向移動
            //  playerSprite.setPosition(playerSprite.getPosition().x,playerSprite.getPosition().y+25);
               console.log("上 move(0,-1) distY "+ distY );
              move(0,-1);

            }
            else{ //下方向移動
              //playerSprite.setPosition(playerSprite.getPosition().x,playerSprite.getPosition().y-25);
              console.log("下 move(0,1) distY "+ distY );
              move(0,1);
            }
        }
    }
}
function move(deltaX,deltaY){
  switch(level[playerPosition.y+deltaY][playerPosition.x+deltaX]){
    case 0:
    case 2:
        level[playerPosition.y][playerPosition.x]-=4;
        playerPosition.x+=deltaX;
        playerPosition.y+=deltaY;
        level[playerPosition.y][playerPosition.x]+=4;
        playerSprite.setPosition(165+25*playerPosition.x,185-25*playerPosition.y);
    break;
    case 3:
    case 5:
    // 木箱を置くところ（level[playerPosition.y+deltaY*2][playerPosition.x+deltaX*2]）が0、または2であるとき
    // 0=床　2=穴
        if(level[playerPosition.y+deltaY*2][playerPosition.x+deltaX*2]==0 ||
           level[playerPosition.y+deltaY*2][playerPosition.x+deltaX*2]==2){
            level[playerPosition.y][playerPosition.x]-=4;
            playerPosition.x+=deltaX;
            playerPosition.y+=deltaY;
            level[playerPosition.y][playerPosition.x]+=1; //木箱の位置にプレイヤー
            playerSprite.setPosition(165+25*playerPosition.x,185-25*playerPosition.y);
            level[playerPosition.y+deltaY][playerPosition.x+deltaX]+=3;//木箱(3)の移動先

            var movingCrate = cratesArray[playerPosition.y][playerPosition.x];
            movingCrate.setPosition(movingCrate.getPosition().x+25*deltaX,movingCrate.
            getPosition().y-25*deltaY);
            cratesArray[playerPosition.y+deltaY][playerPosition.x+deltaX]=movingCrate;
            cratesArray[playerPosition.y][playerPosition.x]=null;
        }
        break;
    }
    complete_check()      //クリアの確認
}
    function resets(){
      for (var i = 0; i < 7; i++){
        for (var j = 0; j < 7; j++){
          switch (level[i][j]) {
            case 4:
            case 6:
              playerSprite.setPosition(165 + 25 * j, 185 - 25 * i);
              playerPosition = {
                x: j,
                y: i
              };
              break;
            case 3:
            case 5:
              var crateSprite = cratesArray[i][j];
              crateSprite.setPosition(165 + 25 * j, 185 - 25 * i);
              break;
            default:
              break;
          }
        }
      }
    }
    function complete_check(){
  var game_f = 0;
  for (var i = 0; i < 7; i++) {
    for (var j = 0; j < 7; j++) {
      if (level[i][j] == 5) game_f +=1;
    }
  }
  console.log(gameclear);
  // game_fがClearCountと同じであれば
  if (game_f == ClearCount){
    stage = stage + 1;
    if (audioEngine.isMusicPlaying()) {
      audioEngine.stopMusic();
    }
    //gameclearへ移動
    //cc.director.runScene(new gameclear());
    // gameclearへ移動しながら、シャッターみたいに上から画面が比較的ゆっくり変わる
    var gc = cc.TransitionFadeDown.create(1, new gameclear());
    cc.director.runScene(gc);
    if(stage == 4){
      stage = 1;
  }
}
}
