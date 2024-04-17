'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import classes from './image-picker.module.css';

export default function ImagePicker({ label, name }) {

  const imageInput = useRef();
  const [pickedImage, setPickedImage] = useState();

  function handlePickClick() {
    imageInput.current.click();
  }

  // 첫번째 파일 인식하는 이벤트 
  function handleImageChange(event){
    const file = event.target.files[0];

    if(!file){
      return;
    }

    const fileReader = new FileReader;

    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };

    fileReader.readAsDataURL(file);
  }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>

      <div className={classes.controls}>
        {/* 사진 미리보기 - 시작 */}
        <div className={classes.preview}>
            {!pickedImage && <p> No image picked yet.</p>}
            {pickedImage &&(
              <Image
                src={pickedImage}
                alt="The image selected by the user"
                fill
              />
            )} 
        </div>
      {/* 사진 미리보기 - 종료 */}

          <input
            className={classes.input}
            type="file"
            id={name}
            accept="image/png, image/jpeg"
            name={name}
            ref={imageInput}
            onChange={handleImageChange} // 사진 미리보기 박스 관련 함수
          />

          <button
            className={classes.button}
            type="button"
            onClick={handlePickClick}
          >
            Pick an Image
          </button>
      </div>

  </div>
  );
}