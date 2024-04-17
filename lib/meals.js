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

  // 이미 DB에 form input 사진관련 데이터 및 경로코드 반영으로 오류 지속됨
  // SQlite 사용, node initdb.js 라는 터미널 명령어로 만들어진 meals.db를 삭제 + .next 파일 삭제후,
  // 다시 vscode 끄고 열어서 node initdb.js 라는 터미널 명령어로  meals.db 새로 만들어 초기화하면
  // 하단의 수정된 경로코드로 오류 없이 잘 작동

  
  // meal.image = `/images/$(fileName)`; -> 오타수정: 괄호종류 )대신 }
  meal.image = `/images/${fileName}`;

  db.prepare(`INSERT INTO meals (creator, creator_email, title, summary, instructions, image, slug) 
              VALUES (@creator, @creator_email, @title, @summary, @instructions, @image, @slug)`).run(meal);
}