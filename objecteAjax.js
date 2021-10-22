//Creamos un nuevo objeto javascript llamado ObjetoAjax
//función constructora.
function ObjetoAjax () {
    //recogemos el objeto XMLHttpRequest en una variable
    var nuevoajax=creaObjetoAjax();
    //devolvemos el XMLHttpRequest como una propiedad del objeto.
    this.objeto=nuevoajax;
    }

    
//Función para crear el objeto XMLHpptRequest.
function creaObjetoAjax () { 
    var obj; //variable que recogerá el objeto
    if (window.XMLHttpRequest) { //código para mayoría de navegadores
       obj=new XMLHttpRequest();
       }
    else { //para IE 5 y IE 6
       obj=new ActiveXObject(Microsoft.XMLHTTP);
       }
       return obj; //devolvemos objeto
    }