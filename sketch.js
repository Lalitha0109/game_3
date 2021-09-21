

var gameState=1;
var bg;
var helicopter,helicopter_img;
var start;
var scientist,sci_img;
var ground;
var plantsGroup;
var restart,restart_img;
var END;
var dead_img;
var distance=1000;
var count=0;
var num=0;
var level2,level2_img;



function preload(){
   backgroundStory=loadImage("background_story.png");
   background_level1=loadImage("bg2.png");
   helicopter_img=loadAnimation("aeroplane.png","aeroplane.png","aeroplane.png","blast.png");
   tiger_animation=loadAnimation("Tiger animation1.png","Tiger animation 2.png","Tiger animation 3.png");
   sci_img=loadAnimation("girl1.png","gril2.png","girl3.png","girl4.png");
   sci_img2=loadAnimation("girl4.png");
   sci_stand=loadAnimation("girl1.png");
   plant1 = loadImage("plant1.png");
  plant2 = loadImage("plant2.png");
  plant3 = loadImage("plant3.png");
  plant4 = loadImage("plant4.png");
  start_img=loadImage("start.png");
  restart_img=loadImage("restart.png");
  dead_img=loadAnimation("girl_dead.png");
  bridge_img=loadImage("bridge.png");
  pillar1_img=loadImage("pillar1.png");
  pillar2_img=loadImage("pillar2.png");
  pillar3_img=loadImage("pillar3.png");
  pillar4_img=loadImage("pillar4.png");
  pillar5_img=loadImage("pillar5.png");
  lava_img=loadImage("lava.png");
  level2_img=loadImage("level2_background.png");
 
   
}


function setup() {
   createCanvas(displayWidth,displayHeight);
   bg=createSprite(displayWidth/2,displayHeight/2,800,40);
   bg.addImage(backgroundStory);
   bg.scale=2;
   helicopter=createSprite(displayWidth/4,displayHeight/3,20,20);
   helicopter.addAnimation("helicopter",helicopter_img);
   helicopter.scale=0.5;
   start=createSprite(displayWidth-200,displayHeight-200,50,50);
   start.addImage(start_img);
   scientist=createSprite(displayWidth/4,displayHeight-200,50,50);
   scientist.addAnimation("run",sci_img);
   scientist.addAnimation("jump",sci_img2);
   scientist.addAnimation("stand",sci_stand);
   scientist.debug=true;
   scientist.setCollider("rectangle",0,0,120,280);
   ground=createSprite(displayWidth/2,displayHeight-15,displayWidth,50);
   ground.visible=false;
   restart=createSprite(displayWidth/2,displayHeight/2,30,30);
   restart.addImage(restart_img);
   restart.visible=false;
   
   plantsGroup = createGroup();
   pillarsGroup = createGroup();
   
   

}

function draw() {
   background(180);
   scientist.collide(ground);
   scientist.collide(pillarsGroup);

   if(keyDown("space")) {
      scientist.velocityY = -12;
     scientist.changeAnimation("jump",sci_img2);
  }
  
  scientist.velocityY = scientist.velocityY + 0.8;
   
   
   if(gameState===1){
      if (mousePressedOver(start)){
         gameState=2;
   
         
      }
      scientist.visible=false;
      bg.addImage(backgroundStory);
      bg.scale=2;
      bg.velocityX=0;
      bg.x=displayWidth/2;
      bg.y=displayHeight/2;
      start.visible=true;
      restart.visible=false;
      
   }
   
   if (gameState===2){
      

      scientist.changeAnimation("run",sci_img);
      bg.addImage(background_level1);
      bg.scale=0.9;
      //bg.x=displayWidth/3;
      bg.velocityX=-5;
      helicopter.visible=false;
      start.visible=false;
      scientist.visible=true;
      if(bg.x<-50){
         bg.x=displayWidth/2+200;
      }
      if(plantsGroup.isTouching(scientist)){
         //gameState = END;
      }
     distance=distance-(count*100);
     spawnPlants();
      ground.depth=scientist.depth;
      if(count===2){
         scientist.velocityY = 0
        plantsGroup.setLifetimeEach(0);
        plantsGroup.setVelocityXEach(0);
        bg.velocityX=0;
        level2=createSprite(displayWidth-300,displayHeight/2,50,50);
        level2.visible=false; 
         }
         
         if (mousePressedOver(level2)){
            gameState=3;
            spawnPillars();
            scientist.x=100;
            scientist.y=50;
            scientist.changeAnimation("stand",sci_stand);
            ground2=createSprite(displayWidth/6,displayHeight-300,400,100);
            lake=createSprite(displayWidth/2,displayHeight-100,displayWidth,50);
            
            plantsGroup.destroyEach();
         }
   }
   
      
   if(gameState===3){

    bg.addImage(level2_img);
    bg.x=camera.position.x;
    lake.x=camera.position.x;
    
      
     camera.position.x=scientist.x;
     camera.position.y=scientist.y;

     scientist.changeAnimation("run",sci_img);

     
     scientist.collide(ground2);
     
     

      level2.visible=false;
      
      
      
      //lake.visible=false;

      if(lake.isTouching(scientist)){
         gameState=END;
      }
     
      
      
     scientist.collide(pillarsGroup);

     if(keyDown(RIGHT_ARROW)){
        scientist.x=scientist.x+10;

     }
     if(keyDown(LEFT_ARROW)){
      scientist.y=scientist.y+10;

   }
   }
   
   
   if (gameState === END) {
      
      scientist.changeAnimation("dead",dead_img);
      restart.visible=true;
      ground.velocityX = 0;
      scientist.velocityY = 0
     plantsGroup.setLifetimeEach(-1);
     plantsGroup.setVelocityXEach(0);
     bg.velocityX=0;
    
   }
   
   if (mousePressedOver(restart)){
      reset();
   }
   
   drawSprites();
   text("Distance:"+distance,displayWidth-200,20);
  
     
   }
   function spawnPlants(){
      if (frameCount % 300 === 0){
        var plant = createSprite(displayWidth+100,displayHeight-120,10,40);
        plant.velocityX = -4;
        
         //generate random plants
         var rand = Math.round(random(1,3));
         switch(rand) {
           case 1: plant.addImage(plant1);
           
                   break;
           case 2: plant.addImage(plant3);
                   break;
           case 3: plant.addImage(plant4);
                   break;

           default: break;
         }
         count=count+1;
        
         //assign scale and lifetime to the plant           
         plant.scale = 0.5;
         plant.lifetime =displayWidth/4;
        
        //add each plant to the group
         plantsGroup.add(plant);
      }
     }
     function reset(){
      
      gameState=1;
      plantsGroup.destroyEach();
      pillarsGroup.destroyEach();
      



   }
   function spawnPillars(){
      for(var i=1;i<=13;i++){
         var pillar = createSprite(i*random(200,500),displayHeight-170,10,40);
        
         //generate random plants
         var rand = Math.round(random(1,5));
         switch(rand) {
           case 1: pillar.addImage(pillar1_img);
                   break;
           case 2: pillar.addImage(pillar2_img);
                   break;
           case 3: pillar.addImage(pillar3_img);
                   break;
           case 4: pillar.addImage(pillar4_img);
                   break;
           case 5: pillar.addImage(pillar5_img);
                   break;

           default: break;
         }
         pillar.scale = 0.9;
         //add each plant to the group
         pillarsGroup.add(pillar);
         //pillar.depth=lava.depth+1;
         

      }
        
      
        
        
         
        
        
         
      }


   
   
    