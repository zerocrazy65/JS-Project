const express = require('express');
const app = express();
const fs = require('fs');
const hostname = 'localhost';
const port = 3000;
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const multer = require('multer');
const path = require('path');
const mysql = require('mysql');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'public/img/');
    },

    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const imageFilter = (req, file, cb) => {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

// ใส่ค่าตามที่เราตั้งไว้ใน mysql
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "34261043",
    database: "zero_company",
})

con.connect(err => {
    if (err) throw (err);
    else {
        console.log("MySQL connected");
    }
})

const queryDB = (sql) => {
    return new Promise((resolve, reject) => {
        // query method
        con.query(sql, (err, result, fields) => {
            if (err) reject(err);
            else
                resolve(result)
        })
    })
}

app.post('/regisDB', async(req, res) => {
    const { username, password, email } = req.body
    await queryDB(
        `INSERT INTO users (username, password, email, avatar) ` +
        `VALUES ('${username}', '${password}', '${email}', 'avatar.png')`
    )
    return res.redirect('login.html')
})

//ทำให้สมบูรณ์
app.post('/profilepic', (req, res) => {
    const upload = multer({ storage, fileFilter: imageFilter }).single('avatar')

    upload(req, res, async(err) => {
        if (req.fileValidationError) {
            return res.send(req.fileValidationError)
        } else if (!req.file) {
            return res.send('Please select an image to upload')
        } else if (err instanceof multer.MulterError) {
            return res.send(err)
        } else if (err) {
            return res.send(err)
        }

        res.cookie('img', req.file.filename)
        await updateImg(req.cookies.username, req.file.filename)
        return res.redirect('feed.html')
    })
})

const updateImg = async(username, filen) => {
    const result = await queryDB(`UPDATE users SET avatar = '${filen}' WHERE username = '${username}'`)
    console.log(result)
}

//ทำให้สมบูรณ์
app.get('/logout', (req, res) => {
    res.clearCookie('username')
    res.clearCookie('img')
    return res.redirect('login.html');
})

//ทำให้สมบูรณ์
app.get('/readPost', async(req, res) => {
    const result = await queryDB('SELECT * FROM posts')
    res.setHeader('Content-Type', 'application/json')
    res.json(result)
})

//ทำให้สมบูรณ์
app.post('/writePost', async(req, res) => {
    const { user, message } = req.body
    const result = await queryDB(
        `INSERT INTO posts (user, message) ` +
        `VALUES ('${user}', '${message}')`
    )
    if (result.affectedRows > 0) {
        const posts = await queryDB('SELECT * FROM posts')
        res.setHeader('Content-Type', 'application/json')
        res.status(201).json(posts)
    }
})

//ทำให้สมบูรณ์
app.post('/checkLogin', async(req, res) => {
    // ถ้าเช็คแล้ว username และ password ถูกต้อง
    // return res.redirect('feed.html');
    // ถ้าเช็คแล้ว username และ password ไม่ถูกต้อง
    // return res.redirect('login.html?error=1')
    const { username, password } = req.body
    const result = await queryDB(`SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`)
    if (result.length <= 0) {
        return res.redirect('login.html?error=1')
    }
    const data = result[0]
    res.cookie('username', data.username)
    res.cookie('img', data.avatar)
    return res.redirect('feed.html')
})


app.listen(port, hostname, () => {
    console.log(`Server running at   http://${hostname}:${port}/register.html`);
});