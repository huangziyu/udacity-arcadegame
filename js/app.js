'use strict';

var gamestatus = 0;

// 角色的类
var Character = function(x, y, sprite) {
    this.x = x;
    this.y = y;
     this.sprite = sprite;
};

// 此为游戏必须的函数，用来在屏幕上画出角色
Character.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Enemy = function(x,y,speed) {
    var enemy = Object.create(Enemy.prototype);

     //调用 Character 设置 enemy 的属性
     Character.call(enemy, x, y, 'images/enemy-bug.png');

     enemy.speed = Math.floor(Math.random()*100+100);
    return enemy;
};

// 继承 Character 类
Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy;

/*
// 这是我们的玩家要躲避的敌人
var Enemy = function(x,y) {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多
    this.x = x;
    this.y = y;
    this.speed = Math.floor(Math.random()*100+100);
    // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
*/

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    this.x = this.x + this.speed*dt;
    // 敌人横穿屏幕的实现
    if (this.x>500) {
        this.x=0;
    }
};

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player = function(x,y){
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
};
// 用于更新玩家位置的函数
// 检测玩家是否到达水域
Player.prototype.update = function(){
    // 若玩家到达水域便重设玩家位置并且提示游戏胜利
    if (this.y<0) {
        gamestatus = 1;
        this.reset();
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    //若游戏状态为1则显示胜利动画
    if (gamestatus === 1) {
        ctx.font = 'bold 50px h';
        ctx.fillStyle = 'gold';
        ctx.fillText('SUCCESS',200,400);
    }
};

Player.prototype.handleInput = function(key){
    if(key === 'left' && this.x > 0){
        this.x -= 101;
    }
    if(key === 'up' && this.y > 0){
        this.y -= 83;
    }
    if(key === 'right' && this.x < 400){
        this.x += 101;
    }
    if(key === 'down' && this.y < 400){
        this.y += 83;}
};

// 用于重设玩家位置的函数
Player.prototype.reset = function(){
    this.x = 200;
    this.y = 400;
};
// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面

var enemy1 = new Enemy(0, 60);//第一行的敌人
var enemy2 = new Enemy(0, 145);//第二行的敌人
var enemy3 = new Enemy(0, 225);//第三行的敌人

var allEnemies = [enemy1, enemy2, enemy3];

var player = new Player(200, 400);



// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
