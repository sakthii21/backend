import { Hono } from 'hono'
import { Context } from 'hono/jsx';
import {bearerAuth}from'hono/bearer-auth';
import { cors } from 'hono/cors'
import { numberNanoId } from './utils';

type user={
  user_id: number,
  username: string,
  password: string,
  Age: number,
};

type bmi={
  bmi_id: number,
  user_id: number,
  weight: number,
  height: number,
  bmivalue: number, 
}
type category={
  category_id: number,
  bmi_id: number,
  category: string
}



type suggestionstb = {
  sug_id: number;
  suggestions:string;
  category_id: number;
  FitnessActivities: string;
  NutritionDiet: string;
  Duration: string;
  Remedies: string;
  Donts: string;
  image: string;
};

type Healthqueries={
  hlth_id:number,
  user_id:number,
  problem:string,
  advices:string,
  image1:string
}
type Bindings={
  DB : D1Database;
  AUTH_TOKEN: string;
  
}
const app = new Hono<{Bindings:Bindings}>();

app.use(
  '/*',
  cors({
    origin: 'https://localhost:5175',
    allowMethods: ['POST', 'GET', 'OPTIONS']
}))
app.on('all','/*',async(c,next)=>{
  const applyAuth = bearerAuth({token:c.env.AUTH_TOKEN})
  return applyAuth(c,next);
})




app.post('/user', async (c) =>{
  const {  username, password, Age}:user  = await c.req.json()
  
  const{ success }=await c.env.DB.prepare (`INSERT INTO user( user_id, username, password, Age) values(?,?,?,?);`).bind(numberNanoId(),username,password,Age).run()
  if(success){
    return c.text('Login successful');
  }
  else{
    return c.text('Login failed');}
  });

  app.get('/user/get-all',async(c)=>{
    const pros=await c.env.DB.prepare(`SELECT *FROM user;`).all()
    return c.json(pros)
  });
//sql-get by id
app.get('/user-get/:id',async(c)=>{
  const t_id = await c.req.param('id');
  const pros=await c.env.DB.prepare(`SELECT *FROM user where user_id = ?;`).bind(t_id).run();
  return c.json(pros)
});

app.post('/post-bmi', async (c) => {
  const { weight, height, bmivalue }: bmi = await c.req.json();

  const { success } = await c.env.DB.prepare(`
    INSERT INTO bmi(user_id, bmi_id, weight, height, bmivalue)
    VALUES (?, ?, ?, ?, ?);
  `).bind(numberNanoId(), numberNanoId(), weight, height, bmivalue).run();

  if (success) {
    return c.text('BMI record created successfully');
  } else {
    return c.text('Failed to create BMI record');
  }
});

  app.get('/bmi/get-all',async(c)=>{
    const pros=await c.env.DB.prepare(`SELECT *FROM bmi;`).all()
    return c.json(pros)
  });

  app.get('/bmi-get/:id',async(c)=>{
    const t_id = await c.req.param('id');
    const pros=await c.env.DB.prepare(`SELECT *FROM bmi where bmi_id = ?;`).bind(t_id).run();
    return c.json(pros)
  });
app.post('/category/post',async(c)=>{
  const { category_id, bmi_id,category}:category  = await c.req.json()
  
  const{ success }=await c.env.DB.prepare (`INSERT INTO category( category_id,bmi_id,category) values(?,?,?);`).bind(category_id,bmi_id,category).run()
  if(success){
    return c.text('category successful');
  }
  else{
    return c.text(' failed');}
  });

  app.get('/category/get-all',async(c)=>{
    const pros=await c.env.DB.prepare(`SELECT *FROM category;`).all()
    return c.json(pros)
  });
app.get('/category/get/:id',async(c)=>{
  const t_id = await c.req.param('id');
  const pros=await c.env.DB.prepare(`SELECT *FROM category where category_id =?;`).bind(t_id).run();
  return c.json(pros)
});

  app.post('/suggestion/new',async(c)=>{
    const {suggestions, category_id, FitnessActivities, NutritionDiet, Duration, Remedies, Donts, image}:suggestionstb  = await c.req.json()

   
  
    const{ success }=await c.env.DB.prepare (`INSERT INTO suggestionstb(sug_id,suggestions category_id,FitnessActivities, NutritionDiet,Duration,Remedies,Donts,
      image) values(?,?,?,?,?,?,?,?,?);`).bind(numberNanoId(),suggestions ,category_id, JSON.stringify(FitnessActivities),NutritionDiet,Duration,Remedies,Donts,image).run()
    if(success){
      return c.text('posted successful');
    }
    else{
      return c.text('failed');}
    });

    app.get('/suggestion/get-all',async(c)=>{
      const pros=await c.env.DB.prepare(`SELECT *FROM suggestionstb;`).all()
      return c.json(pros)
    });
   /* app.get('/suggestion/get/:id',async(c)=>{
      const t_id = await c.req.param('id');
      const pros =  await c.env.DB.prepare(`SELECT *FROM suggestionstb where sug_id =?;`).bind(t_id).run();

      return c.json(pros)
    });  */ 
    app.get('/suggestion/get/:id',async(c)=>{
      const t_id = await c.req.param('id');
      const pros=await c.env.DB.prepare(`SELECT *FROM suggestionstb where category_id =?;`).bind(t_id).run();
      return c.json(pros)
    });

 app.post('/hlth/new',async(c)=>{
  const{user_id,problem,advices,image1}:Healthqueries= await c.req.json()
      const{success}=await c.env.DB.prepare(`INSERT INTO Healthqueries(hlth_id,user_id,problem,advices,image1) values(?,?,?,?,?);`).bind(numberNanoId(),user_id,problem,advices,image1).run()
  if(success){
    return c.text('successfully');
  }
  else{
    return c.text('failed');
  }
  });
  app.get('/hlth/get-all',async(c)=>{
    const pros=await c.env.DB.prepare(`SELECT *FROM Healthqueries;`).all()
    return c.json(pros)
  });
 app.get('/hlth/get/:id', async(c)=>{
  const t_id = await c.req.param('id');
   const pros=await c.env.DB.prepare(`SELECT *FROM Healthqueries where hlth_id=?;`).bind(t_id).run();
   return c.json(pros)
 });
 
export default app;
