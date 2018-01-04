GlowScript 2.6
//launchring.py
//by daniel pauly
//import vpython
//from visual.graph import *
//esse programa simula movimento de projéteis na gravidade da superfície da terra.
//this program simulates projectile motion on earths superficial gravity.
//--------------------------------------------------
// Scene attributes and objects
//--------------------------------------------------
scene.width= 800
scene.height= 600
scene.x=0
scene.y=150
scene.autoscale=0
scene.range= vec(120,120,120)
scene.center = vec(0,40,0)
ball = sphere(pos=vec(0,2,0), radius=2, color=color.red)
ground = cylinder(pos=vec(0,-2,0),radius=100,axis=(0,2,0))
posalvo1 = vec(50,50,0)
posalvo2 = vec(50,18,0)
posalvo3 = vec(50,50,50)
posalvo4 = vec(-80,50,-20)
posalvo5 = vec(0,70,-50)
posalvo6 = vec(10,80,0)
posalvo7 = vec(0,8,-50)
posalvo8 = vec(-200,-50,50)
print ("O objetivo é acertar dentro do anel.")
qualalvo = input("Qual alvo devo mostrar(1, 2, 3, 4, 5, 6 ou 7)? ")
if (qualalvo == 1){
    alvo1 = ring(pos=posalvo1, axis=(0,1,0), radius=20, thickness=2)
    label(pos=vec(50,0,0),text='50m')
    label(pos=vec(0,50,0),text='50m')
    label(pos=vec(0,0,50),text='50m')
}
if (qualalvo == 2){
    alvo2 = ring(pos=posalvo2, axis=vec(1,0,0), radius=15, thickness=2)
}
if (qualalvo == 3){
    alvo3 = ring(pos=posalvo3, axis=vec(0.5,0,0.5), radius=15, thickness=2)
}
if (qualalvo == 4){
    alvo4 = ring(pos=posalvo4, axis=vec(0,1,0), radius=20, thickness=2)
}
if (qualalvo == 5){
    alvo5 = ring(pos=posalvo5, axis=vec(0,0,1), radius=10, thickness=2)
}
if (qualalvo == 6){
    alvo6 = ring(pos=posalvo6, axis=vec(0,1,0), radius=5, thickness=2)
}
if (qualalvo == 7){
    alvo7 = ring(pos=posalvo7, axis=vec(0,0,1), radius=5, thickness=2)
}
//if qualalvo == 8:
//    alvo8 = ring(pos=posalvo8, axis=vec(0.7,0.4,-0.25), radius=8, thickness=2)
//    print ("afaste o zoom com o mouse para ver melhor o alvo")
if ( 1<=qualalvo<=7){

} else {
    print("o alvo que você escolheu não existe, escolha entre 1 e 7.")
}

//eixos & path
xline=curve(pos=(vec(-100,0,0),vec(100,0,0)))
label(pos=vec(100,0,0), text='x')
zline=curve(pos=(vec(0,0,-100),vec(0,0,100)))
label(pos=vec(0,0,100), text='z')
yline=curve(pos=(vec(0,0,0),vec(0,100,0)))
label(pos=vec(0,100,0), text='y')
x50=curve(pos=(vec(-50,0,0),vec(50,0,0)))
label(pos=vec(50,0,0), text='50m')
z50=curve(pos=(vec(0,0,-50),vec(0,0,50)))
label(pos=vec(0,0,50), text='50m')
y50=curve(pos=(vec(0,0,0),vec(0,50,0)))
label(pos=vec(0,50,0), text='50m')
path=curve( color=color.yellow)

//------------------------------------------------
// dynamical variables
//------------------------------------------------
    gravity= 9.8                                        //m/s**2
    m=1                                                 //kg
//PARAMETROS DE LANCAMENTO
    velocity = input("Entre com a velocidade (m/s): ")  //m/s
    angle = input("Entre com o ângulo de inclinação: ") //degrees
    teta = input("Entre com o ângulo de rotação: ")     //degrees
    angle,teta = angle *(pi/180),teta*(pi/180)          //radians
    hmax=0                       //variavel de controle de altura
//sin= opp/hyp   cos= adj/hyp
    velocityY= velocity*sin(angle)
    velocityXZ= velocity*cos(angle)
    velocityZ= velocityXZ*sin(teta)
    velocityX= velocityXZ*cos(teta)
    v= vec(velocityX,velocityY,velocityZ)
    pointer = arrow(pos=(ball.pos), axis=v,color=color.yellow)
    seconds = 0
    dt= .01
//------------------------------------------------
// Main Program
//------------------------------------------------
    Finished= False
    while (not Finished){
         rate(100)   //no more than 100/sec
         seconds += dt
         //position equation:  y(t) = y0 + v0*t + .5*a*t**2
         //velocity: vy=v0y-a*t
         ballY = 2 + velocityY*seconds - .5*gravity*seconds**2
         //define altura maxima:
         while (hmax< ballY:){
             hmax= ballY
         }
         ballX = velocityX*seconds
         ballZ = velocityZ*seconds
         ball.pos=vec(ballX,ballY,ballZ)
         path.append(pos=vec(ballX,ballY,ballZ))
         v.y= velocityY - gravity*seconds
         pointer.pos=ball.pos
         pointer.axis=v
     }
//------------------------------------------------
// graphics & conclusion
//------------------------------------------------
         if (scene.mouse.events){
            pause()
        }
         if (ballY -2 <= 0){
            Finished = True
            print ("tempo de voo: " +str(seconds) + "s")
            print ("altura máxima: %0.2f m" % (hmax))
            print ("viajou %0.2f m em x" % (ballX))
            print ("viajou %0.2f m em z" % (ballZ))
        }
        //if qualalvo ==8 and ballY<= -60:
            //Finished = True
            //print "tempo de voo: " +str(seconds) + "s"
            //print "altura maxima: " +str(hmax)+ "m"
            //print "viajou " +str(ballX) +"m em x"
            //print "viajou " +str(ballZ) +"m em z"