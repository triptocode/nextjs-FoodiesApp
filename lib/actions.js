'use server';

import {redirect} from 'next/navigation';
import {saveMeal} from './meals';

export async function shareMeal(formData){

    const meal = {

        creator: formData.get('username'),
        creator_email: formData.get('email'),
        title: formData.get('title'),
        summary: formData.get('summary'),
        instructions: formData.get('instructions'),
        image: formData.get('image'),

    };

    // console.log(meal);

    await saveMeal(meal);
    redirect('/meals');

  }