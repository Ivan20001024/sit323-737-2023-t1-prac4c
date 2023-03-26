const express =require("express");
const app = express();
const passport = require('passport');
const jwtwebtoken = require('jsonwebtoken');
require('./passport')(passport);

const add=(n1,n2)=>{
    return n1+n2;
}

const minus=(n1,n2)=>{
    return n1-n2;
}

const multi=(n1,n2)=>{
    return n1*n2;
}

const div=(n1,n2)=>{
    if (n2 == 0) {
        throw new Error("can not be divided by zero");
      }
    return n1/n2;
}

app.post('/authen', (req, res) => {
    const user = {name: 'Yifan_Chen', id: '2000'};
    const token = jwtwebtoken.sign(user, '001024', { expiresIn: '30m' });
    res.json({ token });
  });

app.get("/cal",passport.authenticate('jwt', { session: false }), (req,res)=>{ 
try{
    console.log('Successfully passed Jwt_Payload is:', req.user);
    const act = req.query.act;
    const n1=parseFloat(req.query.n1);
    const n2 = parseFloat(req.query.n2);
    
if(isNaN(n1)){
    throw new Error("n1 incorrectly defined");
}
if(isNaN(n2)){
    throw new Error("n2 incorrectly defined"); 
}

let result;
if (act =="add"){
    result = add(n1,n2);
}
else if (act =="minus"){
    result =minus(n1,n2);
}
else if (act =="multi"){
    result =multi(n1,n2);
}
else if (act =="div"){
    result =div(n1,n2);
}
else{
    throw new Error("What you entered is not one of the four rules of arithmetic");
}

res.status(200).json({statuscode:200, data:result});
} catch(error){
    console.error(error)
    res.status(500).json({statuscode:500,msg:error.toString()})
}
});

app.listen(3000,()=>{ 
    console.log('Server id listening on port 3000');

})