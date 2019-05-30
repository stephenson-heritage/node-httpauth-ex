const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const debug = require("debug")("express:server");
const bodyParser = require("body-parser");
const app = express();
//const dbLayer = require("./config/db");
//const fetch = require("node-fetch");
const cors = require("cors");

const port = 9000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/inc", express.static(path.join(__dirname, "inc")));

app.use(cors());

app.get("/getUser", async (req, res) => {
	if (!req.headers.authorization) {
		return res.status(403).json({ error: "credentials missing!" });
	} else {
		let up = req.headers.authorization.split(" ")[1];
		up = Buffer.from(up, "base64").toString();
		up = up.split(":");
		const user = up[0];
		const pass = up[1];
		let data = { username: user };
		res.json(data);
	}
});

app.listen(port, function() {
	//dbLayer.init();
	debug("WebAPI Forwarder " + port + "!");
});
