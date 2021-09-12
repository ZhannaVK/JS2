const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.static('.'));
app.use(express.json());

app.get('/catalogData', (req, res) => {
    const data = fs.readFile('./catalog.json', 'utf8', (err, data) => {
        if (err) {
            throw new Error(err);
        }
        res.send(data);
    });
});

app.get('/getCart', (req, res) => {
    const data = fs.readFile('./cart.json', 'utf8', (err, data) => {
        if (err) {
            throw new Error(err);
        }
        res.send(data);
    });
});

app.post('/addToCart', (req, res) => {
    const reqData = JSON.stringify(req.body);
    fs.readFile('./cart.json', 'utf-8', (err, data) => {
        if (err) {
            throw new Error(err);
        }
        fs.writeFile('./cart.json', reqData, (err) => {
            if (err) {
                throw new Error(err);
            }
            res.send(JSON.stringify({ status: 200, response: 'Data saved' }));
        })
    })
});


app.delete('/deleteFromBasket/:id', (req, res) => {
    const id = +req.params.id.slice(1);
    let product = req.body;
    let find = product.find(item => item.id_product === id);
    if (find.quantity > 1) {
        find.quantity--;
    } else {
        product.splice(product.indexOf(find), 1);
    };
    fs.writeFile('./cart.json', JSON.stringify(product), (err) => {
        if (err) {
            throw new Error(err);
        }
    });
    res.send(JSON.stringify(product));
})


app.listen(3000, () => {
    console.log('server is running on port 3000!');
});