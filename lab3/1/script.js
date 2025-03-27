function validateForm() {    
    let regisnum = document.getElementById("regisnum").value.trim();
    let prefix = document.getElementById("prefix").value;
    let name = document.getElementById("name").value.trim();
    let surname = document.getElementById("surname").value.trim();
    let location = document.getElementById("location").value.trim();
    let canton = document.getElementById("canton").value.trim();
    let district = document.getElementById("district").value.trim();
    let province = document.getElementById("province").value;
    let postcode = document.getElementById("postcode").value.trim();


    if (!regisnum || regisnum.length !== 13 || isNaN(regisnum)) {
        alert("กรุณากรอกหมายเลขบัตรประชาชนให้ถูกต้อง และครบทั้ง 13 หลัก");
        return;
    }

    if (prefix === "กรุณาเลือกคำนำหน้า") {
        alert("กรุณาเลือกคำนำหน้าชื่อ");
        return;
    }

    if (!name) {
        alert("กรุณากรอกชื่อ");
        return;
    }

    if (!surname) {
        alert("กรุณากรอกนามสกุล");
        return;
    }

    if (!location) {
        alert("กรุณากรอกที่อยู่");
        return;
    }

    if (!canton) {
        alert("กรุณากรอกตำบล/แขวง");
        return;
    }

    if (!district) {
        alert("กรุณากรอกอำเภอ/เขต");
        return;
    }

    if (province === "กรุณาเลือกจังหวัดที่อยู่") {
        alert("กรุณาเลือกจังหวัด");
        return;
    }

    if (!postcode || postcode.length !== 5 || isNaN(postcode)) {
        alert("กรุณากรอกรหัสไปรษณีย์ให้ถูกต้อง ครบ 5 หลัก)");
        return;
    }
}
