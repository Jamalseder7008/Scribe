import express from "express";
const app = express();
const path = require('path');
const port = process.env.PORT || 3000; 
const bodyParser = require('body-parser');
const submissions = [];
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: false}) )

app.get('/', serveIndex);
app.get( '/contact.html' , serveContact );

app.post( '/contact/send' , contactHandler );
app.get('/submissions', serveSubmissions);


function serveIndex(request, response){
    response.sendFile('index.html', {root: __dirname});
}

function serveContact( request , response ){
    response.sendFile( 'contact.html' , { root: __dirname });
} 

function contactHandler( request , response ){
    submissions.push(request.body);
    response.redirect( '/' );
} 

function serveSubmissions( request, response){
    response.json(submissions);
}
   

app.listen(port);
console.log(`Server is running on port ${port}...`);