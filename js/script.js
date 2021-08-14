const text_form = document.getElementById("f_text").value;


document.getElementById("btn_back").addEventListener('click', function () {
    document.getElementById("f_text").value = text_form;
}, false);

document.getElementById("btn1").addEventListener('click', function () {
    var r = new RegExp("\x27+", "g");
    const str1 = document.getElementById("f_text").value;
    str1.replace(r, "2");
    document.getElementById("f_text").value = str1.replace(r, "\x22");
}, false);

document.getElementById("btn2").addEventListener('click', function () {
    var r = /\B\x27/g;
    const str1 = document.getElementById("f_text").value;
    document.getElementById("f_text").value = str1.replace(r, "\x22");

}, false);

document.getElementById("btn_sub").addEventListener('click', function () {
    var errorYes = false;
    var errorMes = "";
    const fieldName = document.getElementById("f_name").value.trim();
    if ((/[^A-Za-z]/.test(fieldName)) || (fieldName === "")) {
        document.querySelector('.valid_name').style.borderColor = "red";
        errorYes = true;
        errorMes = "В имени могут быть только буквы.\n";
    } else {
        document.querySelector('.valid_name').style.borderColor = "black";
        document.getElementById("f_name").value = fieldName;
    }


    //Телефон имеет вид +7(000)000-0000.
    {
        const FieldPhone = document.getElementById("f_tel").value.trim();
        let reg = /\+7\(?\d{3}\)?\d{3}\-\d{4}/;
        if (!reg.exec(FieldPhone)) {
            document.querySelector('.valid_phone').style.borderColor = "red";
            errorYes = true;
            errorMes += "Телефон должен быть написан в виде +7(000)000-0000.\n";
        } else {
            document.querySelector('.valid_phone').style.borderColor = "black";
        }
    }

    {
        const FieldEmail = document.getElementById("f_mail").value.trim();
        let reg = /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/;
        if (!reg.exec(FieldEmail)) {
            document.querySelector('.valid_mail').style.borderColor = "red";
            errorYes = true;
            errorMes += "E-mail имеет вид mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru";
        } else {
            document.querySelector('.valid_mail').style.borderColor = "black";
        }
    }
    if (errorYes) { alert(errorMes) }

}, false);