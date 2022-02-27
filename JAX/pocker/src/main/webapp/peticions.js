/*
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
            console.log("Bona tarda");
        }
    });
    xhr.open("GET", "localhost:8080/pocker_war_exploded/api/pocker/donamcinc");
    xhr.send();
*/

    /*
 * programa que carrega un XML utilitzant AJAX
 * @author sergi.grau@fje.edu
 * @version 1.0
 * date 23.01.2017
 * format del document UTF-8
 *
 * CHANGELOG
 * 23.01.2017
 * - programa que carrega un XML utilitzant AJAX
 *
 * NOTES
 * ORIGEN
 * Desenvolupament en entorn client. Escola del clot
 */

    window.onload=function () {
        var xhr;
        //document.getElementById("mostrarDades").onclick = function () { cridarAJAX('E02_llegirXML.xml'); };
         cridarAJAX("localhost:8080/pocker_war_exploded/api/pocker/donamcinc");

        function cridarAJAX(url) {
            xhr = new XMLHttpRequest();

            if (!xhr) {
                alert('problemes amb XHR');
                return false;
            }
            xhr.onreadystatechange = rebreDades;
            //xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.open('GET', url, true); // el 3r paràmetre indica que és asíncron
            xhr.send();
        }

        function rebreDades() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    var xmlDoc= xhr.responseText;
                    console.log(xmlDoc);
                } else {
                    console.log('problemes amb l\'AJAX');
                }
            }
        }
    };



