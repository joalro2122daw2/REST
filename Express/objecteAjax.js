///////////////////////////////
//
// CONSTRUEIX UN OBJECTE javascript ANOMENAT ObjecteAjax Y 
// ASSIGNA UN OBJECTE XMLHttpRequest A LA SEVA PROPIETAT objecte 
//
///////////////////////////////////
//
function ObjeteAjax () {
    //Crear un objete XMLHttpRequest i assignar-lo a la variable
    let nuevoajax=creaObjeteAjax();
    //Assignar el XMLHttpRequest com una propietat de l'objecte
    this.objete=nuevoajax;
    }

    
///////////////////////////////
//
// CREA UN OBJECTE XMLHttpRequest I EL RETORNA
//
/////////////////////////////////////
//
function creaObjeteAjax () { 
    var obj; //variable que recogirà l'objecte
    if (window.XMLHttpRequest) { //codi per a la majoria dels navegadors
       obj=new XMLHttpRequest();
       }
    else { //per a IE 5 y IE 6
       obj=new ActiveXObject(Microsoft.XMLHTTP);
       }
       return obj;
    }