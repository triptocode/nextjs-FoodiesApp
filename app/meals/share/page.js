// import ImagePicker from '@/components/meals/image-picker';
// import classes from './page.module.css';

// export default function ShareMealPage() {
//   return (
//     <>
//       <header className={classes.header}>
//         <h1>
//           Share your <span className={classes.highlight}>favorite meal</span>
//         </h1>
//         <p>Or any other meal you feel needs sharing!</p>
//       </header>
//       <main className={classes.main}>
//         <form className={classes.form}>
//           <div className={classes.row}>
//             <p>
//               <label htmlFor="name">Your name</label>
//               <input type="text" id="name" name="name" required />
//             </p>
//             <p>
//               <label htmlFor="email">Your email</label>
//               <input type="email" id="email" name="email" required />
//             </p>
//           </div>
//           <p>
//             <label htmlFor="title">Title</label>
//             <input type="text" id="title" name="title" required />
//           </p>
//           <p>
//             <label htmlFor="summary">Short Summary</label>
//             <input type="text" id="summary" name="summary" required />
//           </p>
//           <p>
//             <label htmlFor="instructions">Instructions</label>
//             <textarea
//               id="instructions"
//               name="instructions"
//               rows="10"
//               required
//             ></textarea>
//           </p>
//           <ImagePicker />
//           <p className={classes.actions}>
//             <button type="submit">Share Meal</button>
//           </p>
//         </form>
//       </main>
//     </>
//   );
// }




// ------------ 2.  preview 사진까지 된것을 이제 submit시 저장하여 반영되게 하기 --------- // 
import ImagePicker from '@/components/meals/image-picker';
import classes from './page.module.css';
// import {shareMeal} from '@lib/actions'; <- 오류 https://nextjs.org/docs/messages/module-not-found: 아래경로와 차이는?@뒤에 /
import { shareMeal } from '@/lib/actions';
import MealsFormSubmit from '@/components/meals/meals-form-submit';

export default function ShareMealPage() {

  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={classes.main}>


      {/* <form action="URL">  // Where to send the form-data when the form is submitted.</form> */}
        <form className={classes.form} action={shareMeal} >
          <div className={classes.row}>
            <p> 
              {/* label htmlFor 와 input id 키워드가 동일해야 마우스로 글자 라벨 클릭시 input도 같이 잡힘 */}
              <label htmlFor="name">Your name</label>
              <input type="text" id="name" name="username" required />
            </p>
            <p>
              <label htmlFor="email">Your email</label>
              <input type="email" id="email" name="email" required />
            </p>
          </div>
          <p>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" required />
          </p>
          <p>
            <label htmlFor="summary">Short Summary</label>
            <input type="text" id="summary" name="summary" required />
          </p>
          <p>
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              rows="10"
              required
            ></textarea>
          </p>
          <ImagePicker lable="Your image" name="image"/>
          <p className={classes.actions}>
            {/* <button type="submit">Share Meal</button> */}
            <MealsFormSubmit/>
          </p>
        </form>
      </main>
    </>
  );
}