'use strict'

// Asenna ensin mysql driver 
// npm install mysql
// mysql asennettu.. testataan committia


var mysql = require('mysql');
let nodemailer = require('nodemailer');

var connection = mysql.createConnection({
  host: 'localhost',
  port: 3307,
  user: 'root',
  password: '',
  database: 'auto_vuokraus'

});


module.exports =
{
  fetchTypes: function (req, res) {
    connection.query('SELECT model FROM autot', function (error, results, fields) {
      if (error) {
        console.log("Virhe haettaessa dataa asiakas-taulusta: " + error);
        res.status(500);
        res.json({ "status": "ei toiminut" });

      }
      else {
        //console.log("Data = " + JSON.stringify(results));
        res.json(results);
      }
    });

  },

  fetchCars: function (req, res) {

    var sql = 'SELECT id, brand, model, year, transmission, aircondition, colour, picture, price from autot where 1 = 1';
    if (req.query.id != null)
      sql = sql + " and id like '" + req.query.id + "%'";
    if (req.query.brand != null)
      sql = sql + " and brand like '" + req.query.brand + "%'";

    connection.query(sql, function (error, results, fields) {
      if (error) {
        console.log("Virhe ladattaessa dataa autot taulusta" + error);
        res.status(500);
        res.json({ "status": "ei toiminut" });
      }
      else {

        console.log("Data = " + JSON.stringify(results));
        console.log("Body = " + JSON.stringify(req.body));
        console.log("Params = " + JSON.stringify(req.query));
        res.json(results);
        console.log(sql);

      }
    });

  },

  fetchNewestCars: function (req, res) {

    var sql = 'SELECT id, brand, model, year, transmission, aircondition, colour, picture, price from autot where 1 = 1 LIMIT 4';

    connection.query(sql, function (error, results, fields) {
      if (error) {
        console.log("Virhe ladattaessa dataa autot taulusta" + error);
        res.status(500);
        res.json({ "status": "ei toiminut" });
      }
      else {
        //console.log("Data = " + JSON.stringify(results));
        //console.log("Body = " + JSON.stringify(req.body));
        //console.log("Params = " + JSON.stringify(req.query));
        res.json(results);

      }
    });

  },

  fetchOneCar: function (req, res) {
    var sql = "SELECT id, brand, model, year, transmission, aircondition, colour, picture, price from autot where `id`='" + req.params.id + "'";

    connection.query(sql, function (error, results) {
      if (error) {
        console.log("Virhe haettaessa autoa: " + error);
        res.status(400);
        res.send({ "status": "Luultavasti id:llä ei löydy autoa", "error": error });
      }
      else {
        //console.log("Body = " + JSON.stringify(req.body));
        res.json(results);
      }

    });

  },

  fetchOneCustomer: function (req, res) {
    var sql = "SELECT id, name, city, zipcode, email, password from customer where `id`='" + req.params.id + "'";

    connection.query(sql, function (error, results) {
      if (error) {
        console.log("Virhe haettaessa asiakasta: " + error);
        res.status(400);
        res.send({ "status": "Luultavasti id:llä ei löydy asiakasta", "error": error });
      }
      else {
        console.log("Body = " + JSON.stringify(req.body));
        res.json(results);
      }

    });

  },

  fetchOneCustomer2: function (req, res) {
    //var sql = "SELECT id, name, city, zipcode, email, password from customer where name like '" + req.params.nimi + "%" + "'";
    //var sql = "SELECT id, name, city, zipcode, email, password from customer where name like '" + "' '"pa%"';

    connection.query(sql, function (error, results) {
      if (error) {
        console.log("Virhe haettaessa asiakasta: " + error);
        res.status(400);
        res.send({ "status": "Luultavasti id:llä ei löydy asiakasta", "error": error });
      }
      else {
        console.log("Body = " + JSON.stringify(req.body));
        res.json(results);
      }

    });

  },



  createCars: function (req, res) {
    if (req.body.carBrand == "" || req.body.carBrand == undefined) {
      res.status(400);
      res.send({ "status": "NOT OK", "error": "Brand  puuttuu" });
    } else if (req.body.carModel == "" || req.body.carModel == undefined) {
      res.status(400);
      res.send({ "status": "NOT OK", "error": "Model puuttuu" });
    } else if (req.body.carYear == "" || req.body.carYear == undefined) {
      res.status(400);
      res.send({ "status": "NOT OK", "error": "Year puuttuu" });
    } else if (req.body.carTransmission == "" || req.body.carTransmission == undefined) {
      res.status(400);
      res.send({ "status": "NOT OK", "error": "Transmission puuttuu" });
    } else if (req.body.carAircondition == "" || req.body.carAircondition == undefined) {
      res.status(400);
      res.send({ "status": "NOT OK", "error": "AirCondition puuttuu" });
    } else if (req.body.carColour == "" || req.body.carColour == undefined) {
      res.status(400);
      res.send({ "status": "NOT OK", "error": "Colour puuttuu" });
    }
    else {

      var sql = "INSERT INTO autot (Brand, Model, Year, Transmission, AirCondition, Colour) VALUES ('";
      sql += req.body.carBrand + "', '" + req.body.carModel + "', '" + req.body.carYear + "', '" + req.body.carTransmission
      sql += "', '" + req.body.carAircondition + "', '" + req.body.carColour + "')";

      connection.query(sql, function (error, results, fields) {
        if (error) {
          console.log("Virhe lisättäessä asiakasta: " + error);
          res.status(500);
          res.send({ "status": "Jokin kenttä on tyhjä tai syötit vääränlaista dataa", "error": error, "response": null });
        }
        else {

          res.send({ "status": "ok", "error": "" });
        }

      });
    }

  },

  update: function (req, res) {
    console.log("Body = " + JSON.stringify(req.body));
    var sql = 'UPDATE asiakas SET NIMI ="' + req.body.nimi + '", OSOITE="' + req.body.osoite + '", POSTINRO="' + req.body.postinro + '", POSTITMP="' + req.body.postitmp + '", ASTY_AVAIN="' + req.body.asty_avain + '", WHERE AVAIN="' + req.params.id + "'";
    connection.query(sql);

  },

  deleteCar: function (req, res) {

    var sql = "DELETE FROM `autot` WHERE `id`='" + req.params.id + "'";

    connection.query(sql, function (error, results) {
      if (error) {
        console.log("Virhe poistettaessa autoa" + error);
        res.status(400);
        res.json({ "status": "ei toiminut" });
      }
      else {
        //console.log("body = " + JSON.stringify(req.body));
        //console.log("Params = " + JSON.stringify(req.params));
        console.log(sql);
        res.json(results);
      }

    });
  },

  deleteCustomer: function (req, res) {

    var sql = "DELETE FROM `customer` WHERE `id`='" + req.params.id + "'";

    connection.query(sql, function (error, results) {
      if (error) {
        console.log("Virhe poistettaessa asiakasta" + error);
        res.status(400);
        res.json({ "status": "ei toiminut" });
      }
      else {
        //console.log("body = " + JSON.stringify(req.body));
        //console.log("Params = " + JSON.stringify(req.params));
        console.log(sql);
        res.json(results);
      }

    });
  },

  fetchCustomers: function (req, res) {

    var sql = 'SELECT id, name, city, zipcode, email, password from customer where 1 = 1';
  
      if (req.query.custid != null)
      sql = sql + " and id like '" + req.query.custid + "%'";
    if (req.query.nimi != null)
      sql = sql + " and name like '" + req.query.nimi + "%'";


    connection.query(sql, function (error, results, fields) {
      if (error) {
        console.log("Virhe ladattaessa dataa asiakas taulusta" + error);
        res.status(500);
        res.json({ "status": "ei toiminut" });
      }
      else {
        console.log("Data = " + JSON.stringify(results));
        console.log("Body = " + JSON.stringify(req.body));
        console.log("Params = " + JSON.stringify(req.query));
        res.json(results);
        console.log(sql);

      }
    });

  },

  logout: function (req, res) {
    req.session.destroy();
  },

  loginget: function (req, res) {
    //console.log(req.session)
    if (req.session.user) {
      res.send({ loggedIn: true, user: req.session.user })
    }
    else {
      res.send({ loggedIn: false })
    }
  },

  login: function (req, res) {
    const Name = req.body.Name;
    const Password = req.body.Password;
    connection.query('SELECT id, Name, Password, Email from customer where Name = ? AND Password = ?',
      [Name, Password],
      (err, result) => {
        if (err) {
          res.send({ err: err })
        }
        if (result.length > 0) {
          req.session.user = result
          console.log(req.session)
          console.log(req.session.user)
          res.send(result)
        }
        else {
          res.status(400);
          res.send({ message: "Väärä käyttäjä tunnus tai salasana" })
        }
      });

  },

  createCustomers: function (req, res) {

    if (req.body.customerName == "" || req.body.customerName == undefined) {
      res.status(400);
      res.send({ "status": "NOT OK", "error": "Nimi  puuttuu" });
    } else if (req.body.customerPassword == "" || req.body.customerPassword == undefined) {
      res.status(400);
      res.send({ "status": "NOT OK", "error": "Salasana puuttuu" });
    } else if (req.body.customerCity == "" || req.body.customerCity == undefined) {
      res.status(400);
      res.send({ "status": "NOT OK", "error": "Kaupunki puuttuu" });
    } else if (req.body.customerZipcode == "" || req.body.customerZipcode == undefined) {
      res.status(400);
      res.send({ "status": "NOT OK", "error": "Zipcode puuttuu" });
    } else if (req.body.customerEmail == "" || req.body.customerEmail == undefined) {
      res.status(400);
      res.send({ "status": "NOT OK", "error": "Email puuttuu" });
    }
    else {
      var sql = "INSERT INTO customer (Name, City, Zipcode, Email, Password) VALUES ('";
      sql += req.body.customerName + "', '" + req.body.customerCity + "', '" + req.body.customerZipcode + "', '" + req.body.customerEmail
      sql += "', '" + req.body.customerPassword + "')";

      connection.query(sql, function (error, results, fields) {
        if (error) {
          console.log("Virhe lisättäessä asiakasta: " + error);
          res.status(500);
          res.send({ "status": "Jokin kenttä on tyhjä tai syötit vääränlaista dataa", "error": error, "response": null });
        }
        else {
          res.send({ "status": "ok", "error": "" });
        }

      });
    }

  },

  //'" + req.body.kokonaishinta + "',

  /*
  } else if (req.body.kokonaishinta == "" || req.body.kokonaishinta == undefined) {
      console.log("perkele")
      res.status(400);
      res.send({ "status": "NOT OK", "error": "Asiakasid puuttuu" });

      */

  createbooking: function (req, res) {
    if (req.body.reactnoutopaiva == "" || req.body.reactnoutopaiva == undefined) {
      res.status(400);
      res.send({ "status": "NOT OK", "error": "Noutpäivä puuttuu" });
    } else if (req.body.reactpalautuspaiva == "" || req.body.reactpalautuspaiva == undefined) {
      res.status(400);
      res.send({ "status": "NOT OK", "error": "Palautuspäivä puuttuu" });
    } else if (req.body.hintayhteensa == "" || req.body.hintayhteensa == undefined) {
      console.log("hintayhteensä ei vissiin toiminut")
      res.status(400);
      res.send({ "status": "NOT OK", "error": "Asiakasid puuttuu" });
    } else if (req.body.asiakasid == "" || req.body.asiakasid == undefined) {
      res.status(400);
      res.send({ "status": "NOT OK", "error": "Asiakasid puuttuu" });
    }
    else if (req.body.selectedCar == "" || req.body.selectedCar == undefined) {
      res.status(400);
      res.send({ "status": "NOT OK", "error": "autoid puuttuu" });
    }
    else {
      var sql = "INSERT INTO booking (From_DT_Time, Ret_DT_Time, Price, Customer_id, autot_id) VALUES ('";
      sql += req.body.reactnoutopaiva + "', '" + req.body.reactpalautuspaiva + "', '" + req.body.hintayhteensa + "', '" + req.body.asiakasid + "', '" + req.body.selectedCar + "')";

      connection.query(sql, function (error, results, fields) {
        if (error) {
          console.log("Virhe lisättäessä varausta: " + error);
          res.status(500);
          res.send({ "status": "Jokin kenttä on tyhjä tai syötit vääränlaista dataa", "error": error, "response": null });
        }
        else {

          res.send({ "status": "ok", "error": "" });
        }

      });
    }

  },
  
  getbooking: function (req, res) {

    var sql = "SELECT id, from_dt_time, ret_dt_time, price , autot_id from booking where `customer_id`='" + req.query.id + "'";

    connection.query(sql, function (error, results) {
      if (error) {
        console.log("Virhe haettaessa autoa: " + error);
        res.status(400);
        res.send({ "status": "Luultavasti id:llä ei löydy autoa", "error": error });
      }
      else {
        console.log("Params = " + JSON.stringify(req.query))
        console.log("Body = " + JSON.stringify(req.body));
        console.log("Data = " + JSON.stringify(results));
        res.json(results);
      }

    });
  },

  fetchcardates: function (req, res) {
    var sql = "SELECT From_DT_Time, Ret_DT_Time from booking where `autot_id`='" + req.params.id + "'";

    connection.query(sql, function (error, results) {
      if (error) {
        console.log("Virhe haettaessa autoa: " + error);
        res.status(400);
        res.send({ "status": "Luultavasti id:llä ei löydy autoa", "error": error });
      }
      else {
        console.log("Body = " + JSON.stringify(req.body));
        console.log("Data = " + JSON.stringify(results));
        res.json(results);
      }

    });

  },

  sendemail: function (req, res) {
    //var vastaanottaja = req.body.sahkoposti;
    if (req.body.sahkoposti == "" || req.body.sahkoposti == undefined) {
      res.status(400);
      res.send({ "status": "NOT OK", "error": "Sahkoposti puuttuu" });
    } else if (req.body.asiakasnimi == "" || req.body.asiakasnimi == undefined) {
      res.status(400);
      res.send({ "status": "NOT OK", "error": "Asiakasnimi puuttuu" });
    }
    else {
      console.log(req.body.sahkoposti);
      console.log(req.body.asiakasnimi);

      const transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com",
        port: 587,
        secure: false,
        auth: {
          user: "jan.peltoniemi@hotmail.com",
          pass: ""
        }
      });

      var mail = {
        from: "jan.peltoniemi@hotmail.com",
        to: "jan.peltoniemi@gmail.com",
        message: "Lasku",
        text: "Testi testi vaan"
      }

      transporter.sendMail(mail, (err, data) => {
        if (err) {
          res.json({
            status: 'fail'
          })
        } else {
          res.json({
            status: 'success'
          })
        }
      })


    }
  }

}