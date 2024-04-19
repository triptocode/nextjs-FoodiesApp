'use server';

import {redirect} from 'next/navigation';
import {saveMeal} from './meals';
import { revalidatePath } from 'next/cache';

function isInvalidText(text){
    return !text || text.trim()==="";
}


export async function shareMeal(formData){

    const meal = {
        creator: formData.get('username'),
        creator_email: formData.get('email'),
        title: formData.get('title'),
        summary: formData.get('summary'),
        instructions: formData.get('instructions'),
        image: formData.get('image'),
    };


    if(
        isInvalidText(meal.creator)||
        isInvalidText(meal.creator_email)||!meal.creator_email.includes('@')||
        isInvalidText(meal.title)||
        isInvalidText(meal.summary)||
        isInvalidText(meal.instructions)||
        meal.image.size ===0 || !meal.image
    ){
        return {
            message: 'invalid input'  // 에러조건에 해당되면, 에러페이지전환 대신,  message 변수에 담긴 문구를 화면에 리턴
        }
        // throw new Error('Invalid Input'); // 에러 조건에 해당하면, 에러페이지로 연결~ throw Error 작성안하면 이미지 안넣고 input만 있어도 grid화면으로 넘어감.  Throw 넣으면 에러화면을 보여줌
    }

    // console.log(meal);
    await saveMeal(meal);
    revalidatePath('/meals');  // npm run build - npm start  // 전체는 유효성검사하려면 ('/')
    redirect('/meals'); // meals 그리드 화면으로 ~

  }