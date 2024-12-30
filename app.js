const express = require("express"); 
const app = express();
const mongoose = require("mongoose");
const path = require("path")
const ejsMate = require("ejs-mate");
const Complaint = require("./models/complaint.js");
const Report = require("./models/report.js");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema,reportSchema}=require("./schema.js");
const bodyParser = require('body-parser');
const session = require("express-session");
const flash = require("connect-flash");

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.engine('ejs',ejsMate);
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.json());

const sessionOptions = {
  secret:"mysupersecretstring",
  resave:false,
  saveUninitialized:true,
  cookie:{
    expires:Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge:  7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOptions));
app.use(flash());

app.use((req,res,next)=>{
  res.locals.success = req.flash("success");
  next();
});

const MONGO_URL = "mongodb://127.0.0.1:27017/SafePune";

main().then(()=>{
  console.log("connected to DB");
  })
  .catch((err)=>{
    console.log(err);
  });
  async function main()
  {
    await mongoose.connect(MONGO_URL);
  }


app.get("/test",(req,res)=>{
  res.send("Test successful");
})
// Routes
app.get("/",wrapAsync(async(req,res)=>{
  res.render("pages/index.ejs");
}));

app.get('/about-us',wrapAsync(async(req, res) => {
  res.render("pages/about-us.ejs");
}));

app.get('/online-complaint',wrapAsync(async(req, res) => {
  res.render("pages/online-complaint.ejs");
}));

app.get('/report-us',wrapAsync(async(req, res) => {
  res.render("pages/report-us.ejs");
}));

app.get('/control-room',wrapAsync(async(req, res) => {
  res.render("pages/control-room.ejs");
}));

app.get('/traffic-branch',wrapAsync(async(req, res) => {
  res.render("pages/traffic-branch.ejs");
}));

app.get('/head-quarter',wrapAsync(async(req, res) => {
  res.render("pages/head-quarter.ejs");
}));

const validateListing = (req,res,next)=>{
    if(!req.body.listing)
    {
      throw new ExpressError(400,"Send Valid Data!");
    }
    let {error} = listingSchema.validate(req.body);
    if(error)
    {
      let errMsg = error.details.map((el)=>el.message).join(",");
      throw new ExpressError(400,errMsg);
    }
    else
    {
      next();
    }
}

const validateReport= (req,res,next)=>{
  
    if(!req.body.report)
    {
      throw new ExpressError(400,"Send Valid Data!");
    }
    let {error} = reportSchema.validate(req.body);
    if(error)
    {
      let errMsg = error.details.map((el)=>el.message).join(",");
      throw new ExpressError(400,errMsg);
    }
    else
    {
      next();
    }
}

app.post("/online-complaint",validateListing, wrapAsync(async (req,res,next)=>{
    const newListing = new Complaint (req.body.listing);
    await newListing.save();
    req.flash("success","Complaint Is Filed!");
    res.redirect("/");
  })
);

app.post("/report-us",validateReport,wrapAsync(async (req,res)=>{
  const newReport = new Report (req.body.report);
  await newReport.save();
  req.flash("success","Review Is Added!");
  res.redirect("/");
}));

app.all("*",(req,res,next)=>{
  next(new ExpressError(404,"Page Not Found!"));
});

app.use((err,req,res,next)=>
{
  let {statusCode=500,message="Something went wrong!"} = err;
  res.status(statusCode),res.render("error.ejs",{message});
});

app.listen(8080 , ()=>
{
  console.log("Server is listening to port 8080");
});

