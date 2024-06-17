const Status ={
    new:'חדש',
    procsess:'בתהליך',
    sold:'סגור'
}

let speakFlag = true;

const StringToConfig = {
    indexUrl : `https://giladmeirson.github.io/Bsure/temp1/`,
}

const BesureEmail = `besure360@gmail.com`;

$(document).ready(()=>{
        const user = {
        From:document.referrer,
        Url:document.URL,
        isMobile:isUserMobile(),
        EnterAt:new Date().getTime()       
        }
    Post(Views_RefString,user);
    $('#BtnSend1').on('click',(e)=>{
        e.preventDefault();
        sendLead(1);
    })

    $('#BtnSend2').on('click',(e)=>{
        e.preventDefault();
        sendLead(2);
    })

    disableService();
})



const sendLead=(flag)=>{

    //example 
    // name:'שולה שולה',
    // birthdateNumber:new Date().getTime(),
    // phone:'054-2122453',
    // device:'mobile',
    // from:document.referrer,
    // id:'032442342',
    // callMeAt:new Date().getTime(),
    // status:Status.new,


    //id
    if (flag==1) {
        const name =$('#customerNameIN').val();
        const phone=$('#mobileNumberIN').val(); 
        const id = $('#customerID').val();
        const birthdateNumber = new Date($('#birthDateIN').val()).getTime();
        const isConfirmTermsOfUse = document.getElementById('termsServiceIN1').checked;
        const from = document.referrer==''?'direct':document.referrer;
        const device = isUserMobile()?'mobile':'desktop';
        const status = Status.new;
        const form = (document.URL.includes('index')||document.URL==StringToConfig.indexUrl) ?'index':document.URL.includes('insurenceCase')?'insurenceCase':document.URL.includes('loanVsPension')?'loanVsPension':document.URL.includes('Mort&&gage')?'Mortgage':document.URL.includes('MortgageCycle')?'MortgageCycle':document.URL.includes('PensionFund')?'PensionFund':'???';
        

        const Lead = {
            name:name,
            phone:phone,
            id:id,
            birthdateNumber: isNaN(birthdateNumber)?'לא ידוע':birthdateNumber,
            from:from,
            device:device,
            status:status,
            form:form,

        }
        if (form.includes('loanVsPension')) {
            Lead.loanAmount = $('#loanAmountIN').val();
            Lead.pensionAmount =$('#pensionAmountIN').val();
        }
        //console.log(Lead);
        if (name == '') {
            Swal.fire({
                icon: "error",
                title: "..רגע",
                text: "לא הזנתם את שמכם, כדי לשלוח בקשה יש להשלים את השם המלא שלכם.",
            });
            return
        }
        if (phone=='' || !validatePhoneNumber(phone)) {
            Swal.fire({
                icon: "error",
                title: "..רגע",
                text: "כדי שנוכל לחזור אליכם יש להזין מספר טלפון תקין.",
            });
            return
        }
        if (!isConfirmTermsOfUse) {
            Swal.fire({
                icon: "error",
                title: "..רגע",
                text: "עליכם להסכים לתנאי השימוש באתר, ללא הסכמה לא נוכל להמשיך בתהליך.",
            });
            return
        }
     

        Post(Leads_RefString,Lead);
        SendLeadToEmail(Lead);


    }
    else if (flag==2) {
        const name =$('#customerNameIN2').val();
        const phone=$('#mobileNumberIN2').val(); 
        const id = $('#customerID2').val();
        const birthdateNumber = new Date($('#birthDateIN2').val()).getTime();
        const isConfirmTermsOfUse = document.getElementById('termsServiceIN2').checked;
        const from = document.referrer;
        const device = isUserMobile()?'mobile':'desktop';
        const status = Status.new;
        const form = (document.URL.includes('index')||document.URL=='https://giladmeirson.github.io/Bsure/temp1/') ?'index':document.URL.includes('insurenceCase')?'insurenceCase':document.URL.includes('loanVsPension')?'loanVsPension':document.URL.includes('Mortgage')?'Mortgage':document.URL.includes('MortgageCycle')?'MortgageCycle':document.URL.includes('PensionFund')?'PensionFund':'???';
        const Lead = {
            name:name,
            phone:phone,
            id:id,
            birthdateNumber: isNaN(birthdateNumber)?'לא ידוע':birthdateNumber,
            from:from,
            device:device,
            status:status,
            form:form,
            
        }
        //console.log(Lead);
        if (name == '') {
            Swal.fire({
                icon: "error",
                title: "שגיאה",
                text: "לא הזנתם את שמכם, כדי לשלוח בקשה יש להשלים את השם המלא שלכם.",
            });
            return
        }
        if (phone=='' || !validatePhoneNumber(phone)) {
            Swal.fire({
                icon: "error",
                title: "שגיאה",
                text: "כדי שנוכל לחזור אליכם יש להזין מספר טלפון תקין.",
            });
            return
        }
        if (!isConfirmTermsOfUse) {
            Swal.fire({
                icon: "error",
                title: "שגיאה",
                text: "עליכם להסכים לתנאי השימוש באתר, ללא הסכמה לא נוכל להמשיך בתהליך.",
            });
            return
        }
        Post(Leads_RefString,Lead);
        SendLeadToEmail(Lead);

    }

    Swal.fire({
        icon:'success',
        title:'נשלח',
        text:'פרטייך נשלחו בהצלחה , נציגנו יחזרו אלייך.'
    }).then(()=>{
        $('#customerNameIN2').val('');
        $('#mobileNumberIN2').val(''); 
        $('#customerID2').val('');
        document.getElementById('birthDateIN2').type='text'
        $('#birthDateIN2').val('');

        $('#customerNameIN').val('');
        $('#mobileNumberIN').val(''); 
        $('#customerID').val('');
        document.getElementById('birthDateIN').type='text'
        $('#birthDateIN').val('')
    })

    
}

const SendLeadToEmail = (lead) =>{
    const space = ' ';
    const lineBreak = '<br>';


    let str = `<div style="text-align: center;" dir="rtl">`
    str += `<h1>היי אביצח יש לך ליד חדש</h1> ${lineBreak}`;
    str+=`להלן הפרטים של הליד: ${lineBreak}`;
    str+=`<p style="font-size:18px;">
    שם מלא: ${lead.name} ${lineBreak}
    מס טלפון: ${lead.phone} ${lineBreak}
    מעוניין ב: ${lead.form} ${lineBreak}${lineBreak}
    היכנס לדף הניהול שלך כדי לראות את שאר הפרטים
    </p>
    <a style="font-size:22px;"  href="https://giladmeirson.github.io/manageAvitzah/manage/pages/manageIndex.html" >לעבור לדף ניהול לחץ כאן</a>
    <p>סוף הודעה.</p>`;
    str+=`</div>`
    sendEmail(BesureEmail,'אביצח יש לך ליד חדש',str);

 

}


function sendEmail(To,Subject,Body) {




    Email.send({
        SecureToken:'9512cd3e-b42e-4791-8bb0-7294b2bc2dfb',
        To: To,
        From: "gilad.meirson@gmail.com",
        Subject: Subject,
        Body:Body,
    }).then(
       
    );

  



}









/////////////////////////////////helplers
function validatePhoneNumber(phoneNumber) {
    // Define the regex pattern
    var pattern = /^05[0-9][0-9]{7}$/;
    // Test the input phoneNumber against the pattern
    return pattern.test(phoneNumber);
}








const disableService=()=>{
    const img = document.createElement('img');
    img.src = `./img/disability.png`;
    if (innerWidth>=450) {
        img.style.width='5%';
        //img.style.height='100%';
        img.style.position='fixed';
        img.style.top='9%';
        img.style.right='0.5%';
        img.style.zIndex='100';
        img.style.cursor='pointer';
    }
    else{
        img.style.width='12%';
        //img.style.height='100%';
        img.style.position='fixed';
        img.style.top='9%';
        img.style.right='1.5%';
        img.style.zIndex='100';
        img.style.cursor='pointer';

    }

    img.onclick=speakingDisable
    document.body.appendChild(img);


}


function speakingDisable(){

    if (speakFlag) {
        let strToRead = document.body.textContent;
        while(strToRead.includes('\n')){
            strToRead = strToRead.replace('\n',' ');
        }
        let charToStart= strToRead.indexOf('Q');
        strToRead = strToRead.slice(0,charToStart);
        //console.log(strToRead);
        speak(strToRead,()=>{
            
        });
    }
    else{
        window.speechSynthesis.cancel();
    }
    speakFlag = !speakFlag;

}


function speak(text,cb) {
    var msg = new SpeechSynthesisUtterance();
    msg.text = text;
    msg.volume = 1;
    msg.onend = cb;
    window.speechSynthesis.speak(msg);
}