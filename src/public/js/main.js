function Registro(){
    var name = document.getElementById("inputName").value;
    var pass = document.getElementById("inputPass").value;
    var last = document.getElementById("inputLastName").value;
    var correo = document.getElementById("inputCorreo").value;
    var nick = document.getElementById("inputNick").value;

    var valiDatos = validarDatosRegistro(name,pass,last,correo,nick);
    var data = { name,pass,last,correo,nick};

    if (valiDatos == true){
        fetch('/registro', {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers:{
            'Content-Type': 'application/json'
            }
       
         })
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            if(myJson=="nick"){
                var nic = document.getElementById("inputNick");
                nic.classList.remove("is-valid");
                nic.classList.add("is-invalid");
                alert("usuario ya en uso");
            }else{
                alert('registro creado');
            }
        })
        .catch(error => {
            console.error('Error:', error)
        });
        
    }
}

function validarDatosRegistro(name,pass,last,correo,nick){
    var nam =  document.getElementById("inputName");
    var pas = document.getElementById("inputPass");
    var las = document.getElementById("inputLastName");
    var corre = document.getElementById("inputCorreo");
    var nic = document.getElementById("inputNick");
    var cont = 0;
    var end = false;
    if(name == ""){
        nam.classList.remove("is-valid");
        nam.classList.add("is-invalid");
        cont++;
    }else{
        nam.classList.remove("is-invalid");
        nam.classList.add("is-valid");
    }

    if(pass == ""){
        pas.classList.remove("is-valid");
        pas.classList.add("is-invalid");
        cont++;
    }else{
        pas.classList.remove("is-invalid");
        pas.classList.add("is-valid");
    }

    if(last == ""){
        las.classList.remove("is-valid");
        las.classList.add("is-invalid");
        cont++;
    }else{
        las.classList.remove("is-invalid");
        las.classList.add("is-valid");
    }

    if(correo == ""){
        cont++;
        corre.classList.remove("is-valid");
        corre.classList.add("is-invalid");
    }else{
        corre.classList.remove("is-invalid");
        corre.classList.add("is-valid");
    }
    if(nick == ""){
        cont++;
        nic.classList.remove("is-valid");
        nic.classList.add("is-invalid");
    }else{
        nic.classList.remove("is-invalid");
        nic.classList.add("is-valid");
    }

    if(cont == 0){
        end = true;
    }

    return end;
}

function tab(hide,show){
    var tab1= document.getElementById(hide);
    var tab2 = document.getElementById(show);
    var s1 = document.getElementById("tab1");
    var s2 = document.getElementById("tab2");

    tab1.classList.remove("active");
    tab1.classList.remove("show");
    tab2.classList.add("active");
    tab2.classList.add("show");
    s1.classList.toggle("active");
    s2.classList.toggle("active");    
}
