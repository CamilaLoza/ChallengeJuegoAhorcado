// Antes de ejecutar Javascript espera que toda la página se dibuje
document.addEventListener('DOMContentLoaded', function () {

    
     
   
     
    // funcion para mostrar las letras
    // tiene que recibir el listado de letras a mostrar

    // por defecto indicamos que muestre el teclado querty
    mostrarLetrasTeclado(abecedario);
    document.getElementById("teclado").hidden = true;
    document.getElementById('adivinado').style.display = 'none';
    document.getElementById("adivinado").hidden = true;
    // función que recibe la pulsación de la tecla
    // tanto del teclado fisico como del teclado dibujado en la pantalla

     

});

function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
}

var listaPalabras = ["gigante","terrorifico","cabeza","ojos","peludo","espantoso","verde","azul","violeta","dientes","amarillo","malvado","pesadilla","oscuridad","miedo","lengua","susto","hambriento"];
const abecedario = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
var palabraElegida = "";
var letrasAdivinadas = "";
var letrasFaltantes = "";
var letrasApretadas = "";
var errores = 0;

function mostrarLetrasTeclado (listadoLetras){
    function teclaPulsada(e) {
        const tecla=this.innerText.toLocaleUpperCase();
        if (palabraElegida.indexOf(tecla)==-1)
        {
            const monstruo=document.getElementById("monstruo");
            errores++;
            
            monstruo.src = "img/monstruo" + errores + ".jpg";

        }
        else
        {
            while (letrasFaltantes.indexOf(tecla)>=0) {
                letrasAdivinadas = setCharAt(letrasAdivinadas,letrasFaltantes.indexOf(tecla),tecla);
                letrasFaltantes = setCharAt(letrasFaltantes,letrasFaltantes.indexOf(tecla)," ");
            }

        }
        letrasApretadas = letrasApretadas + tecla;
        if (errores == 7){
            document.getElementById("teclado").hidden = true;
            letrasAdivinadas = palabraElegida;
            mostrarLetras(letrasAdivinadas);
            setTimeout(function() { alert("Perdiste!"); }, 100);
        }else
        {            
            if (letrasAdivinadas == palabraElegida)
            {
                document.getElementById("teclado").hidden = true;
                setTimeout(function() { alert("Ganaste!"); }, 100);
                mostrarLetras(letrasAdivinadas);
            }
            else
            { 
                mostrarLetrasTeclado(abecedario);
                mostrarLetras(letrasAdivinadas);
            }
        }
        
       
    }
    const idLetras=document.getElementById("letras");
    idLetras.innerHTML="";
    // añadimos las letras
    listadoLetras.split('').map(el => {
        let span=document.createElement("span");
        if (letrasApretadas.indexOf(el) == -1)
            span.addEventListener("click", teclaPulsada);
        else
            span.className="teclaapretada";
        span.innerText=el.toLocaleUpperCase();
        idLetras.appendChild(span);
    });
}
function mostrarLetras (listadoLetras){
    const idLetra=document.getElementById("letra");
    idLetra.innerHTML="";
        // añadimos las letras
        listadoLetras.split('').map(el => {
            let span=document.createElement("span");
            span.innerText=el;
            idLetra.appendChild(span);
        });
}

function nuevojuego() {
    document.getElementById("teclado").hidden = false;
    document.getElementById('adivinado').style.display = 'inline-block';
    document.getElementById("adivinado").hidden = false;
    document.getElementById("boton2").hidden = true;
    document.getElementById("boton3").hidden = false;
    errores = 0;
    palabraElegida = devolverPalabraAleatoria();
    letrasFaltantes = palabraElegida;
    letrasAdivinadas = palabraElegida.replace(/./g," ");
    letrasApretadas = "";
    monstruo.src = "img/ahorcado.jpg";
    mostrarLetras(letrasAdivinadas);
    mostrarLetrasTeclado(abecedario);
}

function abandonar() {
    document.getElementById("teclado").hidden = true;
    document.getElementById('adivinado').style.display = 'none';
    document.getElementById("adivinado").hidden = true;
    document.getElementById("boton2").hidden = false;
    document.getElementById("boton3").hidden = true;
    errores = 0;
    palabraElegida = "";
    letrasFaltantes = "";
    letrasAdivinadas = "";
    letrasApretadas = "";
    monstruo.src = "img/ahorcado.jpg";
}

function nuevapalabra() {
    var palabranueva = prompt("Escriba la palabra que quieras agregar al ahorcado");
    if (palabranueva != null)
    {
        if (!/^[A-Za-z]*$/.test(palabranueva) || palabranueva.length < 2)
            alert("Sólo puedes escribir una palabra y sin acentos");
        else
            listaPalabras.push(palabranueva);
    }

}

function devolverPalabraAleatoria()
{
    return listaPalabras[(Math.floor(Math.random() * listaPalabras.length))].toLocaleUpperCase();
}