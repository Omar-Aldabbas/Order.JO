

export const AnswerCard = (options) => {

    return (
        <div className="bg-mute rounded-xl p-4 hover:shadow-inner text-center w-full h-full">
            <h3 className="font-semibold text-lg text-foreground"> {options.title}</h3>
            <img src={options.img} alt={options.alt} className="w-full min-h-[60%]"/>
            <p className="text-foreground">{options.text}</p>
        </div>
    )
}