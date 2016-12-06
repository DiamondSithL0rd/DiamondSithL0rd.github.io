var C = {
  "game": {
    "width":320,
    "height":568
  },
  "bg": {
    "width":320,
    "height":568,
    "xspeed":0,
    "yspeed":700,
    "file":"assets/background.jpeg"
  },
  "p":{
    "file": "assets/dodgedolan.png",
    "width":64,
    "height": 64,
    "frames": 2,
    "startx": 160,
    "starty": 500,
    "speed": 5
  },
"d": {
  "file":"assets/smiley.png",
  "width": 64,
  "height": 64,
  "startx": 160,
  "starty": -32,
  "speed": 15
  }
}

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
    this.load.image("bg",C.bg.file)
    this.load.spritesheet("dodgedolan",C.p.file,C.p.width,C.p.height,C.p.frames)
    this.load.spritesheet("smiley",C.d.file,C.d.width,C.d.height,C.d.frames)
  }
  create() {
    console.log("Loaded")
    this.state.start("Play")
  }
}

class Play {
  create(){
     console.log("Entered Play State ");
    
     this.bg = this.add.tileSprite(0,0,C.bg.width,C.bg.height,"bg");
     this.bg.autoScroll(C.bg.xspeed,C.bg.yspeed);

     this.player = this.add.sprite(C.p.startx,C.p.starty,"dodgedolan");
     this.player.anchor.set(0.5,0.5);
     this.player.smoothed = false;
     this.player.scale.set(1);

     this.dodge = this.add.sprite(C.d.startx,C.d.starty,"smiley");
     this.dodge.anchor.set(0.5,0.5);
     this.dodge.smoothed = false;
     this.dodge.scale.set(1);

     this.cursors = this.input.keyboard.createCursorKeys();
  }
  update(){
    if (this.cursors.left.isDown){
      this.player.x -= C.p.speed;
    }
    if (this.cursors.right.isDown) {
      this.player.x += C.p.speed;
    }
   if (this.dodge.y > this.game.height){
     this.dodge.y = C.d.starty;
     let px = (C.d.width * this.dodge.scale.x) / 2;
     let max = C.game.width - px
     this.dodge.x = randInt(px,max);
  }
  if (checkCollision(this.player, this.dodge)) {
    restart();
  }
  if (this.player.x > C.game.width) {
   this.player.x = C.game.width;
  }
  else if (this.player.x < 0){
    this.player.x = 0
  }
  this.dodge.y += C.d.speed;
  }
  render(){
    game.debug.text("x: " + this.dodge.x + ",y:" + this.dodge.y, 4, 16);
  }

}
var game = new Phaser.Game(C.game.width,C.game.height);
game.state.add("Boot",Boot);
game.state.add("Load",Load);
game.state.add("Play",Play);
game.state.start("Boot");

function restart() {
  game.state.start("Boot");
}

function randInt(min,max){
  return Math.floor(Math.random() * (max - min) + min);
}

function checkCollision(spriteA, spriteB) {

  var boundsA = spriteA.getBounds();
  var boundsB = spriteB.getBounds();

  return Phaser.Rectangle.intersects(boundsA, boundsB);
}
