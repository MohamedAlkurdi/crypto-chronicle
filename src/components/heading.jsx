export default function Heading({title}){

    return(
        <div className="heading w-full flex items-center justify-center my-40">
        <div className=" w-fit flex items-center justify-center relative before:absolute before:bg-secondary before:bottom-0 before:left-0 before:h-full before:w-full before:origin-left before:scale-x-[0.25] hover:before:scale-x-100 before:transition-transform before:ease-in-out before:duration-500">
            <span className="relative text-main text-6xl overflow-hidden px-4 capitalize">{title}</span>
        </div>
        </div>
    )

}