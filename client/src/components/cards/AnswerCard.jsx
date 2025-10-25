

export const AnswerCard = (options) => {

    return (
        <div className="bg-mute rounded-xl p-4 hover:shadow-inner text-center w-full h-full text-secondary flex flex-col gap-4 justify-center items-center hover:bg-mute/50 transition duration-200">
            <h3 className="font-semibold text-lg"> {options.title}</h3>
            { options.img && <img src={options.img} alt={options.alt} className="w-24 max-h-34"/>}
            <p className="font-semibold">{options.text}</p>
        </div>
    )
}