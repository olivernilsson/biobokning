async function testLogin(){
 
  // credentials we want to login with
  let login = new Login({
    email: 'abcabc@hotmail.com',
    password: 'Abcabcabc1'
  });
 
  // try to login
  console.log(await login.save());
 
}
 
async function testCheckLogin(){
  console.log(await Login.find());
}
 
async function testLogout(){
  let loginObj = new Login();
  console.log(await loginObj.delete());
}

async function start(){
  //await testLogin();
  await testCheckLogin();
}

start();

//testLogout();
