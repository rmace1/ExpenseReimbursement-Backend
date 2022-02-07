window.onload = async () => {
    let response = await fetch(domain + "/api/session");
    let result = await response.json();
    console.log("window onload script");

    console.log(response);
    console.log(result);
    if(!result.successful || result.object.role != "EMPLOYEE"){
        window.location.href = `../`;

    }
}


async function createTicket(e){
    e.preventDefault();
    let formElem = e.target;
    console.log(formElem);

    let descriptionElem = document.getElementById("description");
    let amount = document.getElementById("amount").value;
    let type = document.querySelector('input[name="type-radial"]:checked').value;

    let response = await fetch(domain + "/api/session");
    let result = await response.json();

    console.log(descriptionElem.value);
    console.log(amount);
    console.log(type);
    

    let formData = new FormData(formElem);
    formData.append("author",`${result.object.id}`);
    formData.append("description", descriptionElem.value);
    formData.append("amount", amount);
    formData.append("type", type);

    console.log(formData);
    response = await fetch(domain + "/reimbursements", {
        method: "POST",
        body: formData
    })

    result = await response.json();

    if(result.successful){
        window.location.href = `../employee`;
    }
    console.log(result.successful);
}

function backToList(){
   window.location.href = `../employee`;
}

