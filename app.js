const express = require("express");
const app = express();
const port = 3000;
const {
    isValid,
    openAttestationVerifiers,
    verificationBuilder,
} = require("@govtechsg/oa-verify");

const bodyParser = require("body-parser");
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router.post("/verifyvaccination", (request, response) => {
    const verify = verificationBuilder(openAttestationVerifiers, {
        network: "ropsten",
    });
    verify(request.body).then((fragments) => {
        if (isValid(fragments)) {
            response.status(200).send({ response: "Vaccination Status is valid" })
        }
        else{
            response.status(400).send({ response: "Vaccination Status not valid" })
        }
    });
});
app.use("/", router);
app.listen(port)

