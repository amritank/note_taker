const notes = require("express").Router();
const fs = require("fs");

// get call - Read from db.json file and send the response if no error
notes.get("/", (req, res) => {
    fs.readFile("./db/db.json", 'utf8', (error, data) => {
        if (error) {
            res.json("Error while reading file: ", error);
        } else {
            if (data) {
                res.json(JSON.parse(data));
            } else {
                res.json([]);
            }
        }
    });
});

notes.post("/", (req, res) => {
    const { id, title, text } = req.body;
    if (id && title && text) {
        const op = fs.readFile("./db/db.json", 'utf8', (error, data) => {
            if (error) {
                //TODO: How to handle this in the front end
                throw new Error("Failed to read file: ", error);
                // response = {
                //     status: 'Failed',
                //     code: 500,
                //     body: error,
                // };
                // res.json(response);
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
                let response;
                if (err) {
                    response = {
                        status: 'Failed',
                        code: 500,
                        body: err,
                    };
                } else {
                    response = {
                        status: 'Success',
                        code: 200,
                        body: newData,
                    };
                }
                res.json(response);
            });

        });
    } else {
        res.json("Error while updating the data");
    }
});

notes.delete("/:post_id", (req, res) => {
    console.log(req.params);
    const { post_id } = req.params;

    if (post_id) {
        const op = fs.readFile("./db/db.json", 'utf8', (error, data) => {
            if (error) {
                //TODO: How to handle this in the front end
                throw new Error("Failed to read file: ", error);
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
                let response;
                if (err) {
                    response = {
                        status: 'Failed',
                        code: 500,
                        body: err,
                    };
                } else {
                    response = {
                        status: 'Success',
                        code: 200,
                        body: "Entry deleted!",
                    };
                }
                res.json(response);
            });


        });
    } else {
        res.json("Error while delete the post");
    }

});

module.exports = notes;