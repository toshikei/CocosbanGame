// 磯野君のやつ（テスト用）
var gameclearLayer = cc.Layer.extend({
    ctor: function() {
        this._super();
        var size = cc.director.getWinSize();

        var label = cc.LabelTTF.create("Game Clear!!", "Arial", 50);
        label.setPosition(size.width / 2, size.height * 3 / 6);
        this.addChild(label, 1);
        gameoverText = cc.LabelTTF.create("Next Stage!!", "Arial", 32);
        this.addChild(gameoverText);
        gameoverText.setPosition(size.width / 2, size.height * 2 / 6);
        // タップイベントリスナーを登録する
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded
        }, this);
        return true;
    },
    onTouchBegan: function(touch, event) {
        return true;
    },
    onTouchMoved: function(touch, event) {},
    onTouchEnded: function(touch, event) {
        cc.director.runScene(new gameScene());
        if(stage  == 1){
          ClearCount = 2;
        level = [
          [1, 1, 1, 1, 1, 1, 1],
          [1, 1, 0, 0, 0, 0, 1],
          [1, 1, 3, 0, 2, 0, 1],
          [1, 0, 0, 4, 0, 0, 1],
          [1, 0, 3, 1, 2, 0, 1],
          [1, 0, 0, 1, 1, 1, 1],
          [1, 1, 1, 1, 1, 1, 1]
        ];
        init_map = [            // 初期化マップ配列
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 0, 0, 0, 1],
            [1, 1, 3, 0, 2, 0, 1],
            [1, 0, 0, 4, 0, 0, 1],
            [1, 0, 3, 1, 2, 0, 1],
            [1, 0, 0, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1]
          ];
        } else if(stage  == 2){
          ClearCount = 4;
          level = [     // 2つ目のマップ
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 2, 0, 0, 1],
            [1, 1, 0, 0, 3, 0, 1],
            [1, 0, 0, 4, 0, 0, 1],
            [1, 0, 3, 1, 0, 0, 1],
            [1, 0, 2, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1]
          ];
          init_map = [ // 2つ目のマップの初期化配列
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 2, 0, 0, 1],
            [1, 1, 0, 0, 3, 0, 1],
            [1, 0, 0, 4, 0, 0, 1],
            [1, 0, 3, 1, 0, 0, 1],
            [1, 0, 2, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1]
          ];
        }
      },

});


/* var gc = cc.TransitionFadeDown.create(0.5, new gameScene());
cc.director.runScene(gc); */

var gameclear = cc.Scene.extend({
    onEnter: function() {
        this._super();

        // 背景レイヤーをその場で作る
        var backgroundLayer = new cc.LayerColor(new cc.Color(140, 200, 140, 128));
        this.addChild(backgroundLayer);
        //ラベルとタップイベント取得
        var layer3 = new gameclearLayer();
        this.addChild(layer3);
    }
});
