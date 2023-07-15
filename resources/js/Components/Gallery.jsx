import {useState} from "react";

export function Gallery({images = []}) {
    const [currentImage, setCurrentImage] = useState(images[0] ?? {})

    const onMouseOverListener = (image) => {
        setCurrentImage(image)
    }

    return (
        <div className="grid grid-cols-4 gap-4 max-h-full">
            <div className="col-span-1 px-4 flex flex-col items-center overflow-y-auto gap-2 h-fit snap-y">
                {images?.map(image => <img
                    className={"flex-none border-2 border-slate-600 aspect-square object-contain bg-white w-1/2 snap-normal snap-start"}
                    key={image.id} src={image.url} onMouseOver={(e) => onMouseOverListener(image)}/>)}
            </div>
            <div className={"col-span-3 bg-orange h-fit max-h-min"}><img
                className={"border-2 border-slate-600 aspect-square object-contain bg-white min-w-full"}
                src={currentImage.url} alt=""/></div>
        </div>
    )
}
