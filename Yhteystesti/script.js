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
        $('#data tbody').empty();
        let sp = searcParameters();
        $.get({
            url: `http://127.0.0.1:3002/car?${sp}`,
            success: (result) => {
                showResultInTable(result);
                console.log(result);

            }
            
        }).fail(function (err) {
            console.log("Vituiks meni " + err);
        })
    }

    // bindataan click-event
    $('#searchBtn').click(() => {
        fetch();
        console.log("toimiiko seartchbtn");
    });

    // otetaan kaikki autonlisäysformin elementit yhteen muuttujaan
    let allFields = $([])
        .add($('#carBrand'))
        .add($('#carModel'))
        .add($('#carYear'))
        .add($('#carTransmission'))
        .add($('#carAircondition'))
        .add($('#carColour'))
        .add($('#carPicture'));

    // luodaan autonlisäysdialogi
    let dialog = $('#addCarDialog').dialog({
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
            addCar(param);
            // } 
        }
        );

    // tekee post-kutsun palvelimelle ja vastauksen saatuaan jatkaa
    addCar = (param) => {
        $.post("http://127.0.0.1:3002/Car", param)
            .fail(function (data) {
                $('#addStatus').css("color", "red").text("Lisäämisessä tapahtui virhe: " + data.responseJSON.error).show();
            })
            .then((data) => {
                showAddCarStat(data);
                $('#addCarDialog').dialog("close");
                fetch();
            });
    }
    updateCar = () => {
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
    showAddCarStat = (data) => {
        if (data.status == 'ok') {
            $('#addStatus').css("color", "green").text("Auton lisääminen onnistui").show().fadeOut(2000);
                
        } else {
            $('#addStatus').css("color", "red").text("Lisäämisessä tapahtui virhe: " + data.status_text).show().fadeOut(2000);
                
        }
    }

    // avataan autonlisäysdialogi jos sitä ei ole jo avattu
    $('#addCarBtn').click(() => {
        const isOpen = $('#addCarDialog').dialog("isOpen");
        if (!isOpen) {
            $('#addCarDialog').dialog("open");
        }
    });
    
});


// tarkistaa onko dialogin kentät täytetty ja näyttää varoitukset jos ei
validateAddCar = (form) => {
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
    if ($('#id').val().trim() != '') {
        let id = $('#id').val().trim();
        str += `id=${id}`;
    }
    if ($('#brand').val().trim() != '') {
        let brand = $('#brand').val().trim();
        if (str !== '') {
            str += '&';
        }
        str += `brand=${brand}`;
    }
   
    return str;
}

// tyhjentää data-tablen ja tuo haun tuloksen tableen
showResultInTable = (result) => {
    $('#data tbody').empty();
    result.forEach(element => {
        let trstr = "<tr><td>" + element.id + "</td>\n";
        trstr += "<td>" + element.brand + "</td>\n";
        trstr += "<td>" + element.model + "</td>\n";
        trstr += "<td>" + element.year + "</td>\n";
        trstr += "<td>" + element.transmission + "</td>\n";
        trstr += "<td>" + element.aircondition + "</td>\n";
        trstr += "<td>" + element.colour + "</td>\n";
        trstr += "<td>" + element.picture + "</td>\n";
        trstr += `<td><button onclick="deleteCar(${element.id});" class="deleteBtn">Poista</button></td>`;

        $('#data tbody').append(trstr);
    });
    
}

updateCar = (avain) => {
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
}



function disableBtn() {
    addCustSubmit.disabled = true;
    updateBtn.disabled = false;
    
}


deleteCar = (id) => {
    $.ajax({
        url: "http://localhost:3002/Car/" + id,
        type: 'DELETE',
        success: () => {
            fetch();
        }
    }).fail(function (err) {
        console.log("Error " + err);
    })

}