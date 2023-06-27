var a= document.getElementById("input_a");
var b= document.getElementById("input_b");
var c= document.getElementById("input_c");

var Ts= document.getElementById("input_Ts");
var OS= document.getElementById("input_OS");
var poloescala= document.getElementById("input_polo");

var Ro=0;
var Wn=0;
var k=0;

var polo=0;
var alfa1=0;
var alfa2=0;
var alfa3=0;

var kp=0;
var Ti=0;
var Td=0;

var kd=0;
var ki=0;

var boton=document.getElementById("boton");
var botonayuda=document.getElementById("botonayuda");

var r=document.getElementById("resultado");
var r2=document.getElementById("ayuda");

var Tp=0;
var Ganancia=0.0;

var expression="";
var aux=0;
var ayudav=0;
var r=document.getElementById("resultado");
var im=document.getElementById("imagen_res");


function ayuda()
{
    if(ayudav==1)
    {
        ayudav=0;
        r2.innerHTML="";

    }
    else
    {
        ayudav=ayudav+1;
        r2.innerHTML="Este programa diseña un controlador PID para la planta de segundo orden ingresada, utilizando los parametros de tiempo de estabilizacion y maximo sobrepico como referencia, el diseño se realiza por modelo de referencia, por lo cual se debe agregar un tercer polo al sistema deseado, por lo cual el programa solicita que tan alejado se requiere el polo extra, si no se tiene conocimiento del tema se puede dejar en el 10 que trae por defecto, este debera funcionar sin problemas para la mayoria de sistemas";
    }
}

  function draw() {
    try {

      a.value=parseFloat(a.value);
      b.value=parseFloat(b.value);
      c.value=parseFloat(c.value);

      Ts.value=parseFloat(Ts.value);
      OS.value=parseFloat(OS.value);
      poloescala.value=parseFloat(poloescala.value);

      k= a.value/c.value;
      Wn= Math.sqrt(c.value);
      Ro=b.value/(2*Wn);
      b0=Math.log((OS.value)/(100));
      rod=(-b0)/(Math.sqrt((Math.PI*Math.PI+b0*b0)))
  
      if (Ts.value > 0 && OS.value>0)
      {
          console.log(OS.value);


              w=(4/(rod*Ts.value));
              polo=rod*w*poloescala.valueAsNumber;

          w2=w*w;
          s=2*w*rod;

          alfa1=s+polo;
          alfa2=w2+s*polo;
          alfa3=w2*polo;



          kp=(alfa2-c.value)/a.value;
          Ti=(a.value*kp)/alfa3;
          Td=(alfa1-b.value)/(a.value*kp);

          ki=kp/Ti;
          kd=kp*Td;

          r.innerHTML="El diseño calculado es: "+"<br/>"+"Kp= "+ kp.toFixed(4) +"<br/>"+"    Ki= "+ ki.toFixed(4) +"<br/>"+"Kd= "+ kd.toFixed(4) ;
      }
      else
      {   
        console.log("ERROR");

      
      }


    
  }
    catch (err) {
      console.error(err)
      alert(err)
    }
  }
botonayuda.addEventListener("click",ayuda);
boton.addEventListener("click",draw);