const fullname = document.getElementById("fullname");
const email = document.getElementById("email");
const passward = document.getElementById("passward");
const createbtn = document.querySelector(".createbutton");
const nameproblem = document.getElementById("nameproblem")
const emailproblem = document.getElementById("emailproblem")
const passwardproblem = document.getElementById("passwardproblem")
nameproblem.innerText = "";
emailproblem.innerText = "";
passwardproblem.innerText = "";

function storedata() {
    const formdata = {
        Name: fullname.value.trim(),
        email: email.value.trim(),
        passward: passward.value.trim()
    }

    let alldata = JSON.parse(localStorage.getItem("formdata")) || [];
    alldata.push(formdata);
    localStorage.setItem("formdata" , JSON.stringify(alldata));
}

createbtn.addEventListener("click",() => {
    if(!problems()) return;
    storedata();
});

function problems() {
    nameproblem.innerText = "";
    emailproblem.innerText = "";
    passwardproblem.innerText = "";

    if(fullname.value.trim() === "" && email.value.trim() === "" && passward.value.trim() === "") {
        nameproblem.innerText = "name is required";
        emailproblem.innerText = "email is required";
        passwardproblem.innerText = "passward is required";
        return false;
    }

    if(fullname.value.trim() === "" && email.value.trim() === "") {
        nameproblem.innerText = "name is required";
        emailproblem.innerText = "email is required";
        return false;
    }

    if(email.value.trim() === "" && passward.value.trim() === "") {
        emailproblem.innerText = "email is required";
        passwardproblem.innerText = "passward is required";
        return false;
    }

    if(fullname.value.trim() === "" && passward.value.trim() === "") {
        nameproblem.innerText = "name is required";
        passwardproblem.innerText = "passward is required";
        return false;
    }

    if(fullname.value.trim() === "") {
        nameproblem.innerText = "name is required";
        return false;
    } else if(fullname.value.trim().split(" ").length < 2) {
        nameproblem.innerText = "full name is required";
        return false;
    }
    if(email.value.trim() === "") {
        emailproblem.innerText = "email is required";
        return false;
    }else if(!email.value.trim().endsWith("@gmail.com")) {
        emailproblem.innerText = "email is not valid";
        return false;
    } else if(emailcheck()) {
        emailproblem.innerText = "email is already exists";
        return false;
    }
    if(passward.value.trim() === "") {
        passwardproblem.innerText = "passward is required";
        return false;
    }else if(passward.value.trim().split("").length < 8 || !hasuppercase(passward.value.trim()) || !haslowercase(passward.value.trim())|| !haddigit(passward.value.trim())) {
        passwardproblem.innerText = "passward should contain 1 Uppercase,1 lowercase,1 digit & Alphabet";
        return false;
    }

    return true;
};

function hasuppercase(str) {
    return /[A-Z]/.test(str);
};

function haslowercase(str) {
    return /[a-z]/.test(str);
};

function haddigit(str) {
    return /[0-9]/.test(str);
};

function emailcheck() {
    let allData = JSON.parse(localStorage.getItem("formdata")) || [];

    return allData.some(
        item => item.email === email.value.trim()
    );
};

fullname.addEventListener("focus", () => {
    nameproblem.innerText = "";
});

email.addEventListener("focus", () => {
    emailproblem.innerText = "";
});

passward.addEventListener("focus", () => {
    passwardproblem.innerText = "";
});