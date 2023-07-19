import {useEffect, useState} from "react";

export default function SingleImagePreview({image = null, onClickListener = (image) => {}}) {

    const [img, setImg] = useState(null)

    useEffect(() => {
        if (image !== null) {
            const reader = new FileReader()
            reader.onload = (e) => {
                const img = <img src={e.target.result} onClick={(e) => {onClickListener(image)}}/>
                setImg(img)
            }
            reader.readAsDataURL(image)
        } else {
            setImg(null)
        }
    }, [image])

    return (
        <div>
            {img}
        </div>
    )
}
