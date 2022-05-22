function othername() {
    var email = document.getElementById("email").value;
    sessionStorage.setItem("email", email);
    var password = document.getElementById("password").value;
    sessionStorage.setItem("password", password);   
    if (email === "user@gmail.com") {
     userredirect();
    } else {
     parentredirect();
    }
   
    
}

function userredirect()
{
  location.replace("userindex.html")
}

function parentredirect()
{
  location.replace("parentindex.html")
}