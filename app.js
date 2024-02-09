const express=require('express')
const ejs=require('ejs')
const app=express()
const path=require('path')
const qr=require('qr-image')
const fs=require('fs')
const uuid=require('uuid')
app.set("view engine","ejs")
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/',(req,res)=>{
    res.render("enterURL",{});
})
app.post('/getQR',async (req,res)=>{
    //note it should be same as name of the form field if i give a there it should be a here
    let url=req.body.qrCodeInput;
    let uniqueid=uuid.v4();
    var img_svg=qr.image(url);
    img_svg.pipe(fs.createWriteStream(path.join(__dirname, `/uploads/${uniqueid}.png`)))
    res.render("showQR",{imgurl:`uploads/${uniqueid}.png`});
})
PORT=process.env.PORT||3000;
app.listen(PORT,(req,res)=>{
    console.log('server started a port 3000')
})
