gamenew Phaser.Game(320,568);
class Boot {
  preload() {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
  }
  create() {
    this.state.start("Load");
  }
}

class Load {
  preload() {
    console.log("Loading...")
  }
  create() {
    console.log("Loaded");
  }
}
game.state.add("Boot",Boot);
game.state.add("Load",Load);
game.state.start("Boot");
