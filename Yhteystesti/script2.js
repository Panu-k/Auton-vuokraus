$().ready(() => {
    //let astys = {};

    // haetaan asiakastyypit
    $.get({
        url: "http://127.0.0.1:3002/Types",
        success: (result) => {
            astys = result;
            result.forEach((r) => {
                let optstr = `<option value="${r.Avain}">${r.Lyhenne + " " + r.Selite}</option>`;
                $('#custType').append(optstr);
                $('#custCustType').append(optstr);
            });
        }
    });

    // haetaan data
    fetch = () => {
        $('#data2 tbody').empty();
        let sp = searcParameters();
        $.get({
            url: `http://127.0.0.1:3002/customer?${sp}`,
            success: (result) => {
                showResultInTable(result);
                console.log(result);

            }
            
        }).fail(function (err) {
            console.log("Vituiks meni " + err);
        })
    }

    // bindataan click-event
    $('#searchBtn2').click(() => {
        fetch();
        console.log("toimiiko seartchbtn2");
    });



    // otetaan kaikki asiakkaanlisäysformin elementit yhteen muuttujaan
    let allFields = $([])
        .add($('#customerName'))
        .add($('#customerCity'))
        .add($('#customerZipcode'))
        .add($('#customerEmail'))
        .add($('#customerPassword'));
        

    // luodaan asiakkaanlisäysdialogi
    let dialog = $('#addCustomerDialog').dialog({
        autoOpen: false,
        modal: true,
        resizable: false,
        minWidth: 400,
        width: 'auto',
        close: function () {
            form[0].reset();
            allFields.removeClass("ui-state-error");
        }
    });

    /*let dialog2 = $('#updateCustDialog').dialog({
        autoOpen: false,
        modal: true,
        resizable: false,
        minWidth: 400,
        width: 'auto',
        close: function () {
            form[0].reset();
            allFields.removeClass("ui-state-error");
        }
    }); */ 

    /*$(function() {
        $(".updateCustDialog").dialog({
            autoOpen : false,
            modal : true,
            resizable : false,
            minWidth : 400,
            width : 'auto'
            
        }); */

    // luodaan formi
    let form = dialog.find("form")
        .on("submit", (event) => {
            event.preventDefault();
            //if (validateAddCust(form)) {
            let param = dialog.find("form").serialize();
            addCustomer(param);
            // } 
        }
        );

    // tekee post-kutsun palvelimelle ja vastauksen saatuaan jatkaa
    addCustomer = (param) => {
        $.post("http://127.0.0.1:3002/Customer", param)
            .fail(function (data) {
                $('#addStatus').css("color", "red").text("Lisäämisessä tapahtui virhe: " + data.responseJSON.error).show();
            })
            .then((data) => {
                showAddCustomerStat(data);
                $('#addCustomerDialog').dialog("close");
                fetch();
            });
    }
    updateCustomer = () => {
        //var str = $(".form2").serialize();
        console.log("perkele");
        $.ajax({
            url: "http://localhost:3002/Customer/" + req.params.id,
            type: 'PUT',
        success: () => {
            fetch();
        }
    }).fail(function (err) {
        console.log("Error " + err);
    })
    
}

    // näyttää lisäyksen onnistumisen tai epäonnistumisen
    showAddCustomerStat = (data) => {
        if (data.status == 'ok') {
            $('#addStatus').css("color", "green").text("Asiakkaan lisääminen onnistui")
                .show().fadeOut(2000);
        } else {
            $('#addStatus').css("color", "red").text("Lisäämisessä tapahtui virhe: " + data.status_text).show();
        }
    }

    // avataan asiakkaanlisäysdialogi jos sitä ei ole jo avattu
    $('#addCustBtn').click(() => {
        const isOpen = $('#addCustomerDialog').dialog("isOpen");
        if (!isOpen) {
            $('#addCustomerDialog').dialog("open");
        }
    });
    
});


// tarkistaa onko dialogin kentät täytetty ja näyttää varoitukset jos ei
validateAddCustomer = (form) => {
    let inputs = form.find('input');
    let valid = true;
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value == '') {
            inputs[i].classList.toggle("ui-state-error", true);
            valid = false;
        } else {
            inputs[i].classList.toggle("ui-state-error", false);
        }
    }
    if (form.find('select')[0].value === 'empty') {
        form.find('select')[0].classList.toggle("ui-state-error", true);
        valid = false;
    } else {
        form.find('select')[0].classList.toggle("ui-state-error", false);
    }
    if (valid) {
        $('#warning').hide();
        return true;
    }
    $('#warning').show();
    return false;
}

// palauttaa hakuparametri-stringin jos kentät eivät ole tyhjiä
searcParameters = () => {
    let str = '';
    if ($('#custid').val().trim() != '') {
        let custid = $('#custid').val().trim();
        str += `custid=${custid}`;
    }
    if ($('#nimi').val().trim() != '') {
        let nimi = $('#nimi').val().trim();
        if (str !== '') {
            str += '&';
        }
        str += `nimi=${nimi}`;
    }
   
    return str;
    
}

// tyhjentää data-tablen ja tuo haun tuloksen tableen
showResultInTable = (result) => {
    $('#data2 tbody').empty();
    result.forEach(element => {
        let trstr = "<tr><td>" + element.id + "</td>\n";
        trstr += "<td>" + element.name + "</td>\n";
        trstr += "<td>" + element.city + "</td>\n";
        trstr += "<td>" + element.zipcode + "</td>\n";
        trstr += "<td>" + element.email + "</td>\n";
        trstr += "<td>" + element.password + "</td>\n";
        
        trstr += `<td><button onclick="deleteCustomer(${element.id});" class="deleteBtn">Poista</button></td>`;

        $('#data2 tbody').append(trstr);
    });
    
}

/* updateCustomer = (avain) => {
    //$('#addCustDialog').dialog("open");
    //$('#custName').val($("#custName").val() + avain);
    $('#addCustDialog').dialog("open");
    $('#custCustType').val($("#custCustType").val() + avain);
    
}
updateCustomer2 = (avain) => {
    $('#avain').val($("#avain").val() + "Asiakas avain = " + avain);
    $.get({
        url: "http://127.0.0.1:3002/Customer/" + avain,
        success: (result) => {
            console.log(result)
            
        }
    }).fail(function (err) {
        console.log("Error " + err);
    })
    
}
updateCustomer3 = (avain) => {
    $('#custPostNbr').val($("#custPostNbr").val() + avain);
}
updateCustomer4 = (avain) => {
    $('#custName').val($("#custName").val() + avain);
}
updateCustomer5 = (avain) => {
    $('#custPostOff').val($("#custPostOff").val() + avain);
}
updateCustomer6 = (avain) => {
    $('#custAddress').val($("#custAddress").val() + avain);
} */



function disableBtn() {
    addCustSubmit.disabled = true;
    updateBtn.disabled = false;
    
}


deleteCustomer = (id) => {
    $.ajax({
        url: "http://localhost:3002/Customer/" + id,
        type: 'DELETE',
        success: () => {
            fetch();
        }
    }).fail(function (err) {
        console.log("Error " + err);
    })

}