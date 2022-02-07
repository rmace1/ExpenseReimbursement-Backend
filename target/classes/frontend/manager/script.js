window.onload = async () => {
    let response = await fetch(domain + "/api/session");
    let result = await response.json();
    console.log("window onload script");
    console.log(result.object);
    if(!result.successful || result.object.role != "MANAGER"){
        window.location.href = `../`;

    }
    /* let formData = new FormData;
    formData.append('userId', `${result.object.id}`);

    console.log(`User ID: ${result.object.id}`);

    response = await fetch(domain + `/reimbursements`)
    result = await response.json();
    console.log("window onload post fetch");
    console.log(result); */

    sortListRecent();
}

async function sortListDenied(){
    let filterElem1 = document.getElementById("recent");
    filterElem1.style.backgroundColor = 'initial';
    filterElem1.style.color = 'initial';

    let filterElem2 = document.getElementById("pending");
    filterElem2.style.backgroundColor = 'initial';
    filterElem2.style.color = 'initial';

    let filterElem3 = document.getElementById("approved");
    filterElem3.style.backgroundColor = 'initial';
    filterElem3.style.color = 'initial';
    
    let filterElem4 = document.getElementById("denied");
    filterElem4.style.backgroundColor = '#23CE6B';
    filterElem4.style.color = '#020122';


    console.log('sorting denied list now');
    let response = await fetch(domain + `/reimbursements`)
    let result = await response.json();

    let list = result.object;
    let sortedList = [];

    list.forEach(element => {
        if(element.status == 'DENIED'){
            sortedList.push(element);
        }
    })

    sortedList.sort((a,b) => {
        if(a.submittedDate > b.submittedDate){
            return -1;
        }else if(a.submittedDate < b.submittedDate) {
            return 1;
        }else {
            if(a.id < b.id){
                return 1;
            }else {
                return -1;
            }
        }
    });
    
    populateTable(sortedList);

    /* list.sort((a,b) => {
        if(a.submittedDate > b.submittedDate){
            return -1;
        }else if(a.submittedDate < b.submittedDate) {
            return 1;
        }else {
            if(a.id < b.id){
                return 1;
            }else {
                return -1;
            }
        }
    });

    return list; */
}

async function sortListApproved(){
    console.log('sorting approved list now');
    let filterElem1 = document.getElementById("recent");
    filterElem1.style.backgroundColor = 'initial';
    filterElem1.style.color = 'initial';

    let filterElem2 = document.getElementById("pending");
    filterElem2.style.backgroundColor = 'initial';
    filterElem2.style.color = 'initial';

    let filterElem3 = document.getElementById("approved");
    filterElem3.style.backgroundColor = '#23CE6B';
    filterElem3.style.color = '#020122';
    
    let filterElem4 = document.getElementById("denied");
    filterElem4.style.backgroundColor = 'initial';
    filterElem4.style.color = 'initial';

    let response = await fetch(domain + `/reimbursements`)
    let result = await response.json();

    let list = result.object;
    let sortedList = [];

    list.forEach(element => {
        if(element.status == 'APPROVED'){
            sortedList.push(element);
        }
    })

    sortedList.sort((a,b) => {
        if(a.submittedDate > b.submittedDate){
            return -1;
        }else if(a.submittedDate < b.submittedDate) {
            return 1;
        }else {
            if(a.id < b.id){
                return 1;
            }else {
                return -1;
            }
        }
    });
    
    populateTable(sortedList);
}

async function sortListPending(){
    console.log('sorting pending list now');
    let filterElem1 = document.getElementById("recent");
    filterElem1.style.backgroundColor = 'initial';
    filterElem1.style.color = 'initial';

    let filterElem2 = document.getElementById("pending");
    filterElem2.style.backgroundColor = '#23CE6B';
    filterElem2.style.color = '#020122';

    let filterElem3 = document.getElementById("approved");
    filterElem3.style.backgroundColor = 'initial';
    filterElem3.style.color = 'initial';
    
    let filterElem4 = document.getElementById("denied");
    filterElem4.style.backgroundColor = 'initial';
    filterElem4.style.color = 'initial';


    let response = await fetch(domain + `/reimbursements`)
    let result = await response.json();

    let list = result.object;
    let sortedList = [];

    list.forEach(element => {
        if(element.status == 'PENDING'){
            sortedList.push(element);
        }
    })

    sortedList.sort((a,b) => {
        if(a.submittedDate > b.submittedDate){
            return -1;
        }else if(a.submittedDate < b.submittedDate) {
            return 1;
        }else {
            if(a.id < b.id){
                return 1;
            }else {
                return -1;
            }
        }
    });
    
    populateTable(sortedList);
}

async function sortListRecent(){
    console.log('sorting recent list now');
    let filterElem1 = document.getElementById("recent");
    filterElem1.style.backgroundColor = '#23CE6B';
    filterElem1.style.color = '#020122';

    let filterElem2 = document.getElementById("pending");
    filterElem2.style.backgroundColor = 'initial';
    filterElem2.style.color = 'initial';

    let filterElem3 = document.getElementById("approved");
    filterElem3.style.backgroundColor = 'initial';
    filterElem3.style.color = 'initial';
    
    let filterElem4 = document.getElementById("denied");
    filterElem4.style.backgroundColor = 'initial';
    filterElem4.style.color = 'initial';

    console.log("before fetch");
    let response = await fetch(domain + `/reimbursements`)
    let result = await response.json();
    console.log("after fetch");
    console.log(result);
    let list = result.object;
    list.sort((a,b) => {
        if(a.submittedDate > b.submittedDate){
            return -1;
        }else if(a.submittedDate < b.submittedDate) {
            return 1;
        }else {
            if(a.id < b.id){
                return 1;
            }else {
                return -1;
            }
        }
    });

    populateTable(list);
}

function populateTable(list){
    console.log('populating list now');
    console.log(list);

    let tableBodyElem = document.getElementById("table-body");
    tableBodyElem.replaceChildren("");


    list.forEach(element => {
        
    let rowElem = document.createElement("tr");
    rowElem.innerHTML = `
    <td scope="row" class="id" class="id">
    ${element.id}
    </td>
    <td scope="row" class="amount">
        $${element.amount}
    </td>
    <td scope="row" class="submitted">
        ${element.submittedDate}
    </td>
    <td scope="row" class="resolved">
        ${element.resolvedDate}
    </td>
    <td scope="row" class="description">
        ${element.description}
    </td>
    <td scope="row" class="resolver">
        ${element.authorName}
    </td>
    <td scope="row" class="resolver">
        ${element.resolverName}
    </td>
    <td scope="row" class="status">
        ${element.status}
    </td>
    <td scope="row" class="type">
         ${element.type}
    </td>
    <td scope="row" class="details">
    <button type="button" class="btn details-btn btn-info" data-bs-toggle="modal" data-bs-target="#staticBackdrop" 
    id="details-btn-${element.id}" onclick="populateModal(event)">
    Details
    </button>
    </td>`

    let tBodyElem = document.getElementById("table-body");
    tBodyElem.append(rowElem);

});

}


async function populateModal(e){
    let detailBtn = e.target;
    let ticketId = detailBtn.id.slice("detail-btn-".length + 1, detailBtn.length);
    console.log("populate modal function");
    let response = await fetch(domain + `/reimbursements/${ticketId}`);
    let result = await response.json();
    console.log("modal result fetch");
    console.log(result);

    let modalTitleElem = document.getElementById("staticBackdropLabel");
    modalTitleElem.textContent = `Reimbursement Ticket: ${ticketId}`;

    let modalReciept = result.object.reciept;

    let modalContentElem = document.getElementById("modal-body-context");
    modalContentElem.innerHTML = `
    <img src="../IMG_1082.jpeg" alt="" id="modal-image">
    <p>
        Amount: $${result.object.amount}
    </p>
    <p>
        Submitted Date: ${result.object.submittedDate}
    </p>
    <p>
        Resolved Date: ${result.object.resolvedDate}
    </p>
    <p>
        Description: ${result.object.description}
    </p>
    <p>
        Reciept Image is shown if available
    </p>
    <p>
        Submitted By: ${result.object.authorName}
    </p>
    <p>
        Resolved By: ${result.object.resolverName}
    </p>
    <p>
        Status: ${result.object.status}
    </p>
    <p>
        Type: ${result.object.type}
    </p>`;

    document.getElementById("modal-image").src = "data:image/jpeg;base64," + modalReciept;

}

async function resolveTicket(e, approved){
    let modalElem = document.getElementById("staticBackdropLabel");
    let ticketId = modalElem.innerText.slice("Reimbursement Ticket: ".length, modalElem.innerText.length);
    console.log(modalElem);

    let formData = new FormData;
    
    let response = await fetch(domain + "/api/session");
    let result = await response.json();

    if(approved){
        formData.append("approved", "yes");
    }

    let resolverId = result.object.id;
    formData.append("resolverId", `${resolverId}`);
    console.log("ticket id: " + ticketId);
    
    response = await fetch(domain + `/reimbursements/${ticketId}`, {
        method: "PUT",
        body: formData
    })
    result = await response.json();

    window.location.href = "./"
}