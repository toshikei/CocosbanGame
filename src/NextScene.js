var NextLayer = cc.Layer.extend({
    ctor: function() {
        this._super();

        var size = cc.director.getWinSize();
        var label = cc.LabelTTF.create("GAME ", "Arial", 50);
        label.setPosition(size.width / 2, size.height * 4 / 5);
        this.addChild(label, 4);
      }
    });
var NextScene = cc.Scene.extend({
    onEnter: function() {
        this._super();

        var backgroundLayer = new cc.LayerColor(new cc.Color(0, 200, 140, 128));
        var layer1 = new ThirdLayer();
        this.addChild(layer1);

    }
});
