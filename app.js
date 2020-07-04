const express = require('express');
const app = express();

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get("/about", (req, res) => {
    res.render("about")
})
app.listen(5000, () => {
    console.log("Server up and running at Port 5000...")
})