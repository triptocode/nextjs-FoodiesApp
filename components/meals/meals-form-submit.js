'use client';

import { useFormStatus } from 'react-dom';

export default function MealsFormSubmit(){

    const {pending} = useFormStatus();


    //  disabled = {true} 이면 버튼 비활성화인데 pending값이 삼항연산자로 true : false 일때 각각 나올 문자는 아래와 같다. 
    
    return(
             <button disabled = {pending}>
                {pending ? "Submitting...": "Share Meal"}
            </button>
    );
  
}