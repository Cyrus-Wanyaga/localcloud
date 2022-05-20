export default function handler(req, res) {
    if (req.method === 'POST') {
        const pathName = req.body.path
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "path": pathName
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:4000/directories/getDirectories", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result)
                res.status(200).send(result)
            })
            .catch(error => console.log('error', error));
    } else {
        res.status(500).json({statusMessage: "Send a POST request"})
    }
}