# encoding: utf-8
#launchring.py
#by daniel pauly
#import vpython
#this program simulates projectile motion on earth's superficial gravity
#--------------------------------------------------
# Scene attributes and objects
#--------------------------------------------------
scene.width= 800
scene.height= 600
scene.x=0
scene.y=150
scene.autoscale=0
scene.range= (120,120,120)
scene.center = (0,40,0)
ball = sphere(pos=(0,2,0), radius=2, color=color.red)
ground = cylinder(pos=(0,-2,0),radius=100,axis=(0,2,0))
posalvo1 = vector(50,50,0)
posalvo2 = vector(50,18,0)
posalvo3 = vector(50,50,50)
posalvo4 = vector(-80,50,-20)
posalvo5 = vector(0,70,-50)
posalvo6 = vector(10,80,0)
posalvo7 = vector(0,8,-50)
posalvo8 = vector(-200,-50,50)
print "O objetivo é acertar dentro do anel."
qualalvo = input("Qual alvo devo mostrar(1, 2, 3, 4, 5, 6 ou 7)? ")
if qualalvo == 1:
    alvo1 = ring(pos=posalvo1, axis=(0,1,0), radius=20, thickness=2)
    label(pos=(50,0,0),text='50m')
    label(pos=(0,50,0),text='50m')
    label(pos=(0,0,50),text='50m')
if qualalvo == 2:
    alvo2 = ring(pos=posalvo2, axis=(1,0,0), radius=15, thickness=2)
if qualalvo == 3:
    alvo3 = ring(pos=posalvo3, axis=(0.5,0,0.5), radius=15, thickness=2)
if qualalvo == 4:
    alvo4 = ring(pos=posalvo4, axis=(0,1,0), radius=20, thickness=2)
if qualalvo == 5:
    alvo5 = ring(pos=posalvo5, axis=(0,0,1), radius=10, thickness=2)
if qualalvo == 6:
    alvo6 = ring(pos=posalvo6, axis=(0,1,0), radius=5, thickness=2)
if qualalvo == 7:
    alvo7 = ring(pos=posalvo7, axis=(0,0,1), radius=5, thickness=2)
#if qualalvo == 8:
#    alvo8 = ring(pos=posalvo8, axis=(0.7,0.4,-0.25), radius=8, thickness=2)
#    print ("afaste o zoom com o mouse para ver melhor o alvo")
if not 1<=qualalvo<=7:
    print("o alvo que você escolheu não existe, escolha entre 1 e 7.")
#eixos & path
xline=curve(pos=((-100,0,0),(100,0,0)))
label(pos=(100,0,0), text='x')
zline=curve(pos=((0,0,-100),(0,0,100)))
label(pos=(0,0,100), text='z')
yline=curve(pos=((0,0,0),(0,100,0)))
label(pos=(0,100,0), text='y')
x50=curve(pos=((-50,0,0),(50,0,0)))
label(pos=(50,0,0), text='50m')
z50=curve(pos=((0,0,-50),(0,0,50)))
label(pos=(0,0,50), text='50m')
y50=curve(pos=((0,0,0),(0,50,0)))
label(pos=(0,50,0), text='50m')
path=curve( color=color.yellow)
#to pause when mouse clicked
def pause():
    while True:
        rate(100)
        if scene.mouse.events:
            m = scene.mouse.getevent()
            if m.click == 'left': return
        elif scene.kb.keys:
            k = scene.kb.getkey()
            return
#------------------------------------------------
# dynamical variables
#------------------------------------------------
def main():
    gravity= 9.8                                        #m/s**2
    m=1                                                 #kg
#PARAMETROS DE LANCAMENTO
    velocity = input("Entre com a velocidade (m/s): ")  #m/s
    angle = input("Entre com o ângulo de inclinação: ") #degrees
    teta = input("Entre com o ângulo de rotação: ")     #degrees
    angle,teta = angle *(pi/180),teta*(pi/180)          #radians
    hmax=0                       #variavel de controle de altura
#sin= opp/hyp   cos= adj/hyp
    velocityY= velocity*sin(angle)
    velocityXZ= velocity*cos(angle)
    velocityZ= velocityXZ*sin(teta)
    velocityX= velocityXZ*cos(teta)
    v= vector(velocityX,velocityY,velocityZ)
    pointer = arrow(pos=(ball.pos), axis=v,color=color.yellow)
    seconds = 0
    dt= .01
#------------------------------------------------
# Main Program
#------------------------------------------------
    Finished= False
    while not Finished:
         rate(100)   #no more than 100/sec
         seconds += dt
         #position equation:  y(t) = y0 + v0*t + .5*a*t**2
         #velocity: vy=v0y-a*t
         ballY = 2 + velocityY*seconds - .5*gravity*seconds**2
         #define altura maxima:
         while hmax< ballY:
             hmax= ballY
         ballX = velocityX*seconds
         ballZ = velocityZ*seconds
         ball.pos=vector(ballX,ballY,ballZ)
         path.append(pos=(ballX,ballY,ballZ))
         v.y= velocityY - gravity*seconds
         pointer.pos=ball.pos
         pointer.axis=v
#------------------------------------------------
# graphics & conclusion
#------------------------------------------------
         if scene.mouse.events:
            pause()
         if ballY -2 <= 0:
            Finished = True
            print "tempo de voo: " +str(seconds) + "s"
            print "altura máxima: %0.2f m" % (hmax)
            #print "viajou %0.2f m em x" % (ballX)
            #print "viajou %0.2f m em z" % (ballZ)
        #if qualalvo ==8 and ballY<= -60:
            #Finished = True
            #print "tempo de voo: " +str(seconds) + "s"
            #print "altura maxima: " +str(hmax)+ "m"
            #print "viajou " +str(ballX) +"m em x"
            #print "viajou " +str(ballZ) +"m em z"
main()
