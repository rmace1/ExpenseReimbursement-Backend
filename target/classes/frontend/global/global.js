var domain = "http://localhost:9000";

async function logout(){
    let response = await fetch(domain + "/api/session", {
        method: "DELETE"
    })

    window.location.href = domain;
}