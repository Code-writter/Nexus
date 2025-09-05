import OptionInputTile from "./layout/OptionInputTile"

export default function PollContent({
    type,
    options,
    selectOptionIndex,
    onOptionSelect,
    rating, 
    onRatingChange,
    userResponse,
    onResponseChange
}){
    switch(type){
        case "single-option" :
        case "opinion" : 
            return(
                <>
                    {
                        options.map((option, index) => (
                            <OptionInputTile 
                                key={option._id}
                                isSelected={selectOptionIndex === index}
                                label={option.optionText || ""}
                                onSelect={() => {}}

                            />
                        ))
                    }
                </>
            )

        default : 
            return null
    }
}