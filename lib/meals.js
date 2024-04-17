// import sql from 'better-sqlite3';

// const db = sql('meals.db');

// export async function getMeals() {
//   await new Promise((resolve) => setTimeout(resolve, 3000));

//   // throw new Error('Loading meals failed');
//   return db.prepare('SELECT * FROM meals').all();
// }

// export function getMeal(){
//   return db.prepare('SELECT * FROM meals WEHRE slug =?').get(slug)
// }


// ------------------(2)  26 storing -uploaded images and data --------------

import sql from 'better-sqlite3';

// preview 사진저장을 위한 saveMeal()함수와 함께 하단 3개의 import 추가 
import fs from 'node:fs';
import slugify from 'slugify';
import xss from 'xss';


const db = sql('meals.db');

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  // throw new Error('Loading meals failed');
  return db.prepare('SELECT * FROM meals').all();
}

export function getMeal(){
  return db.prepare('SELECT * FROM meals WEHRE slug =?').get(slug)
}


// preview 사진 DB에 저장 관련 함수 
export async function saveMeal(meal){

  meal.slug = slugify(meal.title, {lower:true});
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split('.').pop();
  const fileName = `${meal.slug}.${extension}`;

  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await meal.image.arrayBuffer();

  stream.write(Buffer.from(bufferedImage) , (error) => {
    if (error){
      throw new Error('Saving image failed');
    }
  });

  // meal.image = `/images/$(fileName)`; -> 오류: 괄호종류 )대신 }
  meal.image = `/images/${fileName}`;

  db.prepare(`INSERT INTO meals (creator, creator_email, title, summary, instructions, image, slug) 
              VALUES (@creator, @creator_email, @title, @summary, @instructions, @image, @slug)`).run(meal);
}