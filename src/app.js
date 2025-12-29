const express = require("express");
const app = express();
// const auth = require("./middleware/authMiddleware");
// const requiredRole = require("./middleware/roleMiddleware");

//middleware
app.use(express.json());

//routes
app.get("/", (req,res)=>{
    res.json({status : "ok"})
});

//temporary testing route
// app.get("/protected", auth, (req, res) => {
//     res.json({message: "You accessed a protected route"});
// });

// app.get("/admin-only", auth, requiredRole("admin"), (req,res)=>{
//     res.json({message: "Welcome admin"})
// })

app.use("/auth", require("./routes/authRoutes"))

app.use("/assets", require("./routes/assetRoutes"));

app.use("/loans", require("./routes/loanRoutes"));

module.exports=app;