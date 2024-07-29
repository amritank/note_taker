const notes = require("express").Router();
const fs = require("fs");

// GET api call - Read from db.json file and send the response if no error
notes.get("/", (req, res) => {

    fs.readFile("./db/db.json", 'utf8', (error, data) => {
        if (error) {
            const response = {
                status: 'Failed',
                code: 500,
                body: error,
            };
            res.status(500).json(response);
        } else {
            if (data) {
                res.status(200).json(JSON.parse(data));
            } else {
                res.status(200).json([]);
            }
        }
    });
});

// POST api call implementation
notes.post("/", (req, res) => {
    const { id, title, text } = req.body;
    if (id && title && text) {

        fs.readFile("./db/db.json", 'utf8', (error, data) => {
            if (error) {
                console.log("Error while reading the file: ", error);
                const response = {
                    status: 'Failed',
                    code: 500,
                    body: error,
                };
                return res.status(500).json(response);
            }


            let op = [];
            if (data) {
                op = JSON.parse(data);
            }

            const newData = {
                id: id,
                title: title,
                text: text
            }
            op.push(newData);
            fs.writeFile("./db/db.json", JSON.stringify(op), (err) => {
                if (err) {
                    console.log("Error while writing the file: ", err);
                    const response = {
                        status: 'Failed',
                        code: 500,
                        body: err,
                    };
                    res.status(500).json(response);
                } else {
                    const response = {
                        status: 'Success',
                        code: 200,
                        body: newData,
                    };
                    res.status(200).json(response);
                }
            });

        });
    } else {
        const err = "Error while processing the post request: ";
        console.log(err);
        const response = {
            status: 'Failed',
            code: 500,
            body: err,
        };
        res.status(500).json(response);
    }
});

// DELETE api implementation.
notes.delete("/:post_id", (req, res) => {
    console.log(req.params);
    const { post_id } = req.params;
    if (post_id) {
        const op = fs.readFile("./db/db.json", 'utf8', (error, data) => {
            if (error) {
                if (error) {
                    console.log("Error while reading the file: ", error);
                    const response = {
                        status: 'Failed',
                        code: 500,
                        body: error,
                    };
                    return res.status(500).json(response);
                }
            }

            let op = [];
            if (data) {
                op = JSON.parse(data);
            }
            console.log("Entries before delete: ", op);

            for (const [idx, ele] of op.entries()) {
                if (ele.id == post_id) {
                    op.splice(idx, 1);
                    break;
                }
            }

            console.log("Entries post delete: ", op);
            fs.writeFile("./db/db.json", JSON.stringify(op), (err) => {

                if (err) {
                    console.log("Error while writing the file: ", err)
                    const response = {
                        status: 'Failed',
                        code: 500,
                        body: err,
                    };
                    res.status(500).json(response);
                } else {
                    const response = {
                        status: 'Success',
                        code: 200,
                        body: "Entry deleted!",
                    };
                    res.status(200).json(response);
                }
            });

        });
    } else {
        const err = "Error while processing the delete request: ";
        console.log(err);
        const response = {
            status: 'Failed',
            code: 500,
            body: err,
        };
        res.status(500).json(response);
    }

});

module.exports = notes;