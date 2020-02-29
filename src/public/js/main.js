


function Registro(){
    var name = document.getElementById("inputName").value;
    var pass = document.getElementById("inputPass").value;
    
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/registro", true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function (ree) { 
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log(xhr.responseText);  
        }
    }
    xhr.send(JSON.stringify({
        name,
        pass
    }));
      
}
