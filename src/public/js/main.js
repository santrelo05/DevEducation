function Registro(){
    var name = document.getElementById("inputName").value;
    var pass = document.getElementById("inputPass").value;
    
    var data = { name,pass};
    fetch('/registro', {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json'
        }
    }).then(res =>{
        res.json()
    })
    .catch(error => {
        console.error('Error:', error)
    })
    .then(response => {
        console.log('Success:', response)
    });
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
