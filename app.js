var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var nodemailer = require('nodemailer');




app.use(bodyparser.urlencoded({'extended':'true'})); 

app.get('/', function(req, res){
    res.sendFile(__dirname+"/app.html");
})

app.get('/sendmail', function (req,res){
    res.send("/app.html")
})

app.post("/sendmail",function (req,res){
    mailgonder(req.body["email"],req.body["isimsoyisim"],req.body["mesaj"])
})


app.listen(8080);


function mailgonder(kullaniciMail, kullaniciIsım, kullaniciMesaj){
    const sirket_maili = "sirketmaili@gmail.com"
    const sifre = "sifre123"



    var transfer = nodemailer.createTransfer({
        service:"gmail", //kullanılacak servis
        auth:{//gönderilecek mailin bilgileri
            user:sirket_maili,
            pass:sifre
        }
    });

    var mail = {
        from:sirket_maili,
        to:sirket_maili,
        subject:`Isim Soyisim: ${kullaniciIsım}\nGönderen Mail: ${kullaniciMail} \nMesaj: ${kullaniciMesaj}`,
        text:muster_mesaji  
    };

    transfer.sendMail(mail,function(error){
        if(error){
            console.log(error);
        }else{console.log("Mail gönderildi")}

    })

}
    