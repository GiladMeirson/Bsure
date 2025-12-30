const Status = {
  new: "חדש",
  procsess: "בתהליך",
  sold: "סגור",
};

const StringToConfig = {
  indexUrl: `https://giladmeirson.github.io/Bsure/temp1/`,
};

$(document).ready(() => {
  const user = {
    From: document.referrer,
    Url: document.URL,
    isMobile: isUserMobile(),
    EnterAt: new Date().getTime(),
  };
  $("#BtnSend1").on("click", (e) => {
    e.preventDefault();
    sendLead(1);
  });

  $("#BtnSend2").on("click", (e) => {
    e.preventDefault();
    sendLead(2);
  });
});

const sendLead = (flag) => {
  if (flag == 1) {
    const name = $("#customerNameIN").val();
    const phone = $("#mobileNumberIN").val();
    const id = $("#customerID").val();
    const birthdateNumber = new Date($("#birthDateIN").val()).getTime();
    const isConfirmTermsOfUse =
      document.getElementById("termsServiceIN1").checked;
    const from = document.referrer == "" ? "direct" : document.referrer;
    const device = isUserMobile() ? "mobile" : "desktop";
    const status = Status.new;
    const form =
      document.URL.includes("index") || document.URL == StringToConfig.indexUrl
        ? "index"
        : document.URL.includes("insurenceCase")
        ? "insurenceCase"
        : document.URL.includes("loanVsPension")
        ? "loanVsPension"
        : document.URL.includes("Mort&&gage")
        ? "Mortgage"
        : document.URL.includes("MortgageCycle")
        ? "MortgageCycle"
        : document.URL.includes("PensionFund")
        ? "PensionFund"
        : "???";

    const Lead = {
      name: name,
      phone: phone,
      id: id,
      birthdateNumber: isNaN(birthdateNumber) ? "לא ידוע" : birthdateNumber,
      from: from,
      device: device,
      status: status,
      form: form,
    };
    if (form.includes("loanVsPension")) {
      Lead.loanAmount = $("#loanAmountIN").val();
      Lead.pensionAmount = $("#pensionAmountIN").val();
    }
    //console.log(Lead);
    if (name == "") {
      Swal.fire({
        icon: "error",
        title: "..רגע",
        text: "לא הזנתם את שמכם, כדי לשלוח בקשה יש להשלים את השם המלא שלכם.",
      });
      return;
    }
    if (phone == "" || !validatePhoneNumber(phone)) {
      Swal.fire({
        icon: "error",
        title: "..רגע",
        text: "כדי שנוכל לחזור אליכם יש להזין מספר טלפון תקין.",
      });
      return;
    }
    if (!isConfirmTermsOfUse) {
      Swal.fire({
        icon: "error",
        title: "..רגע",
        text: "עליכם להסכים לתנאי השימוש באתר, ללא הסכמה לא נוכל להמשיך בתהליך.",
      });
      return;
    }

    SendLeadToEmail(Lead);
  } else if (flag == 2) {
    const name = $("#customerNameIN2").val();
    const phone = $("#mobileNumberIN2").val();
    const id = $("#customerID2").val();
    const birthdateNumber = new Date($("#birthDateIN2").val()).getTime();
    const isConfirmTermsOfUse =
      document.getElementById("termsServiceIN2").checked;
    const from = document.referrer;
    const device = isUserMobile() ? "mobile" : "desktop";
    const status = Status.new;
    const form =
      document.URL.includes("index") ||
      document.URL == "https://giladmeirson.github.io/Bsure/temp1/"
        ? "index"
        : document.URL.includes("insurenceCase")
        ? "insurenceCase"
        : document.URL.includes("loanVsPension")
        ? "loanVsPension"
        : document.URL.includes("Mortgage")
        ? "Mortgage"
        : document.URL.includes("MortgageCycle")
        ? "MortgageCycle"
        : document.URL.includes("PensionFund")
        ? "PensionFund"
        : "???";
    const Lead = {
      name: name,
      phone: phone,
      id: id,
      birthdateNumber: isNaN(birthdateNumber) ? "לא ידוע" : birthdateNumber,
      from: from,
      device: device,
      status: status,
      form: form,
    };
    if (name == "") {
      Swal.fire({
        icon: "error",
        title: "שגיאה",
        text: "לא הזנתם את שמכם, כדי לשלוח בקשה יש להשלים את השם המלא שלכם.",
      });
      return;
    }
    if (phone == "" || !validatePhoneNumber(phone)) {
      Swal.fire({
        icon: "error",
        title: "שגיאה",
        text: "כדי שנוכל לחזור אליכם יש להזין מספר טלפון תקין.",
      });
      return;
    }
    if (!isConfirmTermsOfUse) {
      Swal.fire({
        icon: "error",
        title: "שגיאה",
        text: "עליכם להסכים לתנאי השימוש באתר, ללא הסכמה לא נוכל להמשיך בתהליך.",
      });
      return;
    }
    SendLeadToEmail(Lead);
  }

  Swal.fire({
    icon: "success",
    title: "נשלח",
    text: "פרטייך נשלחו בהצלחה , נציגנו יחזרו אלייך.",
  }).then(() => {
    $("#customerNameIN2").val("");
    $("#mobileNumberIN2").val("");
    $("#customerID2").val("");
    document.getElementById("birthDateIN2").type = "text";
    $("#birthDateIN2").val("");

    $("#customerNameIN").val("");
    $("#mobileNumberIN").val("");
    $("#customerID").val("");
    document.getElementById("birthDateIN").type = "text";
    $("#birthDateIN").val("");
  });
};

// EmailJS Configuration - Replace with your actual keys
const EMAILJS_CONFIG = {
  SERVICE_ID: "service_3940eae",
  TEMPLATE_ID: "template_18cfge7",
  PUBLIC_KEY: "RJrkE6TAhsK7OeupI",
};

/**
 * Send lead information to email using EmailJS
 * @param {Object} lead - Lead object containing customer information
 */
const SendLeadToEmail = (lead) => {
  emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);

  const templateParams = {
    customer_name: lead.name,
    customer_phone: lead.phone,
    customer_id: lead.id,
    birthdate:
      lead.birthdateNumber !== "לא ידוע"
        ? new Date(lead.birthdateNumber).toLocaleDateString("he-IL")
        : "לא ידוע",
    from_source: lead.from,
    device_type: lead.device,
    status: lead.status,
    form_type: lead.form,
    loan_amount: lead.loanAmount || "N/A",
    pension_amount: lead.pensionAmount || "N/A",
    submission_date: new Date().toLocaleString("he-IL"),
  };

  // Send email using EmailJS
  emailjs
    .send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, templateParams)
    .then((response) => {
      console.log("Email sent successfully!", response.status, response.text);
    })
    .catch((error) => {
      console.error("Failed to send email:", error);
    });
};

/////////////////////////////////helplers
function validatePhoneNumber(phoneNumber) {
  // Define the regex pattern
  var pattern = /^05[0-9][0-9]{7}$/;
  // Test the input phoneNumber against the pattern
  return pattern.test(phoneNumber);
}

function isUserMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}


