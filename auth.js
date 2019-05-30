module.exports = (req, res, next) => {
	const auth = { isAuth: false };
	if (req) {
		if (req.headers.authorization) {
			let up = req.headers.authorization.split(" ")[1];
			up = Buffer.from(up, "base64").toString();
			up = up.split(":");
			const user = up[0];
			const pass = up[1];
			let data = { username: user };
			if (user == "bob" && pass == "password") {
				auth.isAuth = true;
				auth.user = user;
			}
		}

		req.auth = auth;
		next();
	}
};
