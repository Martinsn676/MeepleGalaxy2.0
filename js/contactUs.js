
function checkInput(target,req,neg){
    const messageField = target.querySelector(".message")
    const input = target.querySelector("#input").value
    if(req==="email"){
        if((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input))){
            messageField.innerText = "";
            return (true);
        }else{
            messageField.innerText = `${neg}`
            return (false);
        }
    }else if(req==="twoWords"){
        if(input.includes(" ")){
            const [firstName, lastName] = input.split(" ");
s
            if(firstName.length>1 && lastName.length>1){
                messageField.innerText = "";
                return (true);
            }  
        }
        messageField.innerText = `Please write your full name`
        return (false);
    }else if(input.length>req-1){
        messageField.innerText = "";
        return (true);
    }else{
        messageField.innerText = `${neg} (${input.length}/${req})`
        return (false);
    }
}

const emailFieldContainer = document.querySelector("#emailFieldContainer")
emailFieldContainer.addEventListener("keyup",()=>checkInput(emailFieldContainer,"email","Please write a valid e-mail"))

const nameContainer = document.querySelector("#nameContainer")
nameContainer.addEventListener("keyup",()=>checkInput(nameContainer,5,"Please write your full name"));

const subjectContainer = document.querySelector("#subjectContainer")
subjectContainer.addEventListener("keyup",()=>checkInput(subjectContainer,15,"Minimum 15 letters"));

const messageContainer = document.querySelector("#messageContainer")
messageContainer.addEventListener("keyup",()=>checkInput(messageContainer,25,"Minimum 25 letters"));


const submitButton = document.querySelector("#submitButton")
submitButton.addEventListener("click",()=>{
    if(checkInput(emailFieldContainer,"email","Please write a valid e-mail") &
    checkInput(nameContainer,5,"Please write your full name") &
    checkInput(subjectContainer,15,"Please write a longer subject")&
    checkInput(messageContainer,25,"Please write a longer message")){
        console.log("submit")
    }else{
        messages = document.querySelectorAll(".message")
        messages.forEach(element => {
            element.classList.add("rough")
        });
    }
});