import React, { useState, useEffect, useRef } from 'react';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.min.css';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '../ui/button';

interface CroppedImageProps {
  selectedImage: string;
  setShowModal: (s: boolean) => void;
  onSave: (file: File) => void;
}

const CroppedImage: React.FC<CroppedImageProps> = ({ selectedImage, onSave, setShowModal }) => {
  const [croppedImg, setCroppedImg] = useState<string>('');
  console.log(croppedImg)
  const imageElement = useRef<HTMLImageElement | null>(null);
  const cropper = useRef<Cropper | null>(null);

  useEffect(() => {
    if (imageElement.current) {
      cropper.current = new Cropper(imageElement.current, {
        aspectRatio: 1,
        viewMode: 1,
        dragMode: 'move',
        cropBoxMovable: false,
        cropBoxResizable: false,
        toggleDragModeOnDblclick: false,
        zoomable: true,
        scalable: false,
        guides: false,
        background: false,
        crop: () => {
          if (cropper.current) {
            const canvas = cropper.current.getCroppedCanvas({
              width: 200,
              height: 200
            });
            canvas.toBlob(
              (blob) => {
                if (blob) {
                  const imageURL = URL.createObjectURL(blob);
                  setCroppedImg(imageURL);
                }
              },
              'image/png',
              1
            );
          }
        },
      });
    }
    return () => {
      if (cropper.current) {
        cropper.current.destroy();
        cropper.current = null;
      }
    };
  }, [selectedImage]);

  const handleSave = () => {
    if (cropper.current) {
      const canvas = cropper.current.getCroppedCanvas({
        width: 200,
        height: 200
      });
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const fileType = blob.type.split('/')[1];
            const allowedTypes = ['png', 'jpg', 'jpeg', 'gif'];

            if (allowedTypes.includes(fileType)) {
              const fileName = `profile-pic-${uuidv4()}.${fileType}`;
              const file = new File([blob], fileName, {
                type: blob.type,
              });
              onSave(file);
              setShowModal(false);
            } else {
              console.error('Unsupported file type');
              alert('Unsupported file type. Please select a valid image.');
            }
          } else {
            console.error('Failed to create Blob from canvas');
          }
        },
        'image/png',
        1
      );
      cropper.current.destroy();
      cropper.current = null;
    }
  };

  return (
    <div className="flex flex-col  items-center ">
      <div className='w-full justify-end flex items-end  bg-neutral-800/90 h-full '>
        <Button
          className="lg:mr-2 mt-2 mb-2 mr-20 "
          onClick={handleSave}
        >
          Done
        </Button>
      </div>
      <div className="relative  w-[500px] h-[300px]    bg-neutral-600/90">

        <img
          ref={imageElement}
          src={selectedImage}
          className="max-w-full max-h-full object-contain"
          alt="Source"
          crossOrigin="anonymous"
        />
      </div>
      <style >{`
        .cropper-view-box,
        .cropper-face {
          border-radius: 50%;
        }
        .cropper-view-box {
          box-shadow: 0 0 0 1px #39f;
          outline: 0;
        }
        .cropper-face {
          background-color: inherit !important;
        }
        .cropper-dashed,
        .cropper-point {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default CroppedImage;
