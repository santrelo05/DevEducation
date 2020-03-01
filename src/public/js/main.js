


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
