import {useEffect, useState} from "react";
import {TrashIcon} from "@/Components/Icons";

export function ImagesPreview({images, onClickListener}) {

    const [imageNumber, setImageNumber] = useState(0)

    const [imageFrames, setImageFrame] = useState([])

    useEffect(() => {

        if (images.length !== 0) {
            const reader = new FileReader()
            reader.onload = (e) => {

                const img = (
                    <div className="relative" key={imageNumber} onClick={(e) => onClickListener(imageNumber)}>
                        <div className="image-preview--cover flex justify-center items-center"><TrashIcon /></div>
                        <img className="image-preview--img"
                             src={e.target.result}
                             alt={`Image number ${imageNumber + 1} for product`}
                             />
                    </div>
                )

                if (imageNumber < images.length - 1) {
                    const newNumber = imageNumber + 1
                    setImageNumber(newNumber)
                }

                const newArray = [...imageFrames, img]
                setImageFrame(newArray)

            }
            reader.readAsDataURL(images[imageNumber])
        }
    }, [imageNumber, images])

    return (
        <div className="grid grid-cols-4 gap-2">
            {imageFrames.map(image => image)}
        </div>
    )
}
