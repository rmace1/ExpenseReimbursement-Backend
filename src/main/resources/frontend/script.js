
async function login(e){
    e.preventDefault();
    console.log("login function.");
    //grab input elements from the document (username and password)
    let userNameElem = document.getElementById("userName");
    let passwordElem = document.getElementById("password");
    let formElem = document.getElementById("form-login");


    //send info to /api/login via fetch
    let response = await fetch(domain + "/api/session", {
        method: "POST",
        body: JSON.stringify({
            userName: userNameElem.value,
            password: passwordElem.value
        })
    });

    console.log(response);
    console.log("response");

    let result = await response.json();



    console.log(result);
    console.log("result");

    //redirects windows to specified url
    if(result.successful){
        console.log("Login Successful");
        window.location.href = `./${result.object.role.toLowerCase()}`;
    } else {
        window.alert("Incorrect username/password.");
    }

    

}

async function checkSession(e){
    e.preventDefault();
    console.log("check session")
    let response = await fetch(domain + "/api/session");

    let result = await response.json();

    console.log(result);
    console.log(`ID:${result.object.id}`);

}

async function resetPassword(){
    let userNameElem = document.getElementById("userName");
    console.log(userNameElem.value);
    if(userNameElem.value == ""){
        window.alert("Username must be filled to reset password.");
    }

    let formData = new FormData;
    formData.append("userName",`${userNameElem.value}`);

    let response = await fetch(domain + `/users`, {
        method: "PATCH",
        body: formData
    });

    let result = await response.json();

    window.location.href = "./";
    window.alert("An email has been sent to the email on file if one exists.");

    console.log(result);

}