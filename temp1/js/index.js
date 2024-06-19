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
               
        let str = `Pension fund home page Loan against pension fund Mortgage recycling Mortgage Inspection of the insurance portfolio You will come back to me no more unnecessary payments, only smart solutions. The first step to your security on the Internet. Contact us today for a free consultation! Fill in your details and you will talk to a B-shore representative. Contact us today for a free consultation! Smart insurance solutions Save money and get the best coverage. We know that insurance can be an expensive business. Therefore, we offer you smart insurance solutions that will allow you to save money and get the best coverage. Maximum exercise of your rights Professional insurance portfolio review. We offer you a professional insurance portfolio review service, which will allow you to make sure you are getting the best coverage. Our team of experts will examine your insurance portfolio and provide you with a solution that is suitable for you. Is your future important to you? Want to ensure yourself and your family the best financial security? We are here to help you plan your insurance correctly, to suit your needs and desires. Our team of experts will accompany you throughout the entire process, explain the various options and help you choose the most suitable insurance for you. Peace of mind: personalized insurances for every need. We believe that everyone needs personalized insurance that will fit their needs and budget. We are available for any question or request. Contact us today and a representative will get back to you as soon as possible. We are here to help you secure your future! Leave your details and we will get back to you I have read the terms of use Send details for a free consultation Insurance is the most important investment you will make in your life. Do not compromise your security - choose us! Our products: offer pension and financial products with the best service. Loan against a pension fund, mortgage recycling, mortgages, checking an insurance portfolio, interested in hearing more? Leave your details and we will get back to you soon. I have read the terms of use Submit Who are we? Your personal advice for financial success Your partners for financial security Here at B-Shore, we are committed to providing you with the most professional and advanced financial and pension services. Our team of experts includes experienced consultants with broad knowledge and a deep understanding of the financial field, who make every effort to adapt the most appropriate solutions to your personal and business needs. We accompany our clients at every stage, from initial financial advice to comprehensive pension planning, with the aim of ensuring a secure and stable financial future. Come be part of our family and enjoy the peace of mind that comes with intelligent and personalized financial planning. Thousands of satisfied customers the best service we are here 24/7 at the best price contact us I needed a loan against my pension fund, but I didn't know where to start. B-shore provided me with all the information I needed, helped me throughout the process, and were available for any questions. The staff was kind, professional and patient, and managed to facilitate a complex and complicated process. In the end, I got the loan I needed in a short time and without much bureaucracy. Yoram Levy After many years in which I didn't really pay attention to my insurance portfolio, I realized that it was time to put things in order. I contacted Bi-Shor and received excellent service. The staff was patient and professional, and explained everything I needed to know in a clear and simple way. I received excellent recommendations on improving my portfolio, and now feel much more confident about my financial future. Shirley Ben-David Before purchasing an apartment, I wanted to check all my options regarding a mortgage. B-shore helped me understand all my options, and according to my needs, found the most suitable mortgage route for me. The staff was kind, available and attentive, and did everything necessary to help me make the best decision for me. I strongly recommend anyone who buys an apartment to use the services of B-Shore. Itzik Ezra When I contacted Bi-Shor I wanted to check my insurance portfolio, pensions, mortgages and more. I received professional and courteous service, a comprehensive snapshot of all my financial assets, along with recommendations on how to improve the portfolio. I was particularly impressed by the personal attitude and support throughout the entire process. The staff was available for any question, explained everything clearly and simply, and helped me make informed decisions about my financial future. Michal Avraham Before entering into the process of refinancing a mortgage, I wanted to understand all my options. B-shore did a great job! I received price quotes from them from several different banks, with a detailed explanation of each route. Thanks to their professional service, I was able to find the best offer for me and save thousands of shekels a year. Noa Mittalman I needed a loan against my pension fund, but I didn't know where to start. B-shore provided me with all the information I needed, helped me throughout the process, and were available for any questions. The staff was kind, professional and patient, and managed to facilitate a complex and complicated process. In the end, I got the loan I needed in a short time and without much bureaucracy. Yoram Levy After many years in which I didn't really pay attention to my insurance portfolio, I realized that it was time to put things in order. I contacted Bi-Shor and received excellent service. The staff was patient and professional, and explained everything I needed to know in a clear and simple way. I received excellent recommendations on improving my portfolio, and now feel much more confident about my financial future. Shirley Ben-David Before purchasing an apartment, I wanted to check all my options regarding a mortgage. B-shore helped me understand all my options, and according to my needs, found the most suitable mortgage route for me. The staff was kind, available and attentive, and did everything necessary to help me make the best decision for me. I strongly recommend anyone who buys an apartment to use the services of B-Shore. Itzik Ezra When I contacted Bi-Shor I wanted to check my insurance portfolio, pensions, mortgages and more. I received professional and courteous service, a comprehensive snapshot of all my financial assets, along with recommendations on how to improve the portfolio. I was particularly impressed by the personal attitude and support throughout the entire process. The staff was available for any question, explained everything clearly and simply, and helped me make informed decisions about my financial future. Michal Aver`

        textToVoice('Speech is enabled');
        setTimeout(()=>{
            window.speechSynthesis.cancel();
            textToVoice(str);
        },1250)
    }
    else{
        window.speechSynthesis.cancel();
        textToVoice('Speech is disabled');
        setTimeout(()=>{
            window.speechSynthesis.cancel();
        },1250)

    }
    speakFlag = !speakFlag;

}


function speak(text,cb) {
    var msg = new SpeechSynthesisUtterance();
    msg.text = text;
    //msg.lang = 'he-IL';
    //console.log(msg.text);
    msg.volume = 1;
    msg.onend = cb;
    window.speechSynthesis.speak(msg);
}
const textToVoice=(text)=>{
    var synth = window.speechSynthesis;

        var utterThis = new SpeechSynthesisUtterance(text);
        synth.speak(utterThis);
}
