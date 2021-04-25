import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faStar} from '@fortawesome/free-solid-svg-icons'


function NewRaiting() {
    const [rating, setRating] = useState(0)

    var getraitng= rating;
    this.props.onSelect(getraitng);
    return (
        <div className="reviews">
                        <input type="radio" name="rate" id="rd-5" onChange={() => setRating(5)} />
                        <label htmlFor="rd-5"><i><FontAwesomeIcon icon={faStar} /></i></label>
    
                        <input type="radio" name="rate" id="rd-4" onChange={() => setRating(4)} />
                        <label htmlFor="rd-4"><i><FontAwesomeIcon icon={faStar} /></i></label>
    
                        <input type="radio" name="rate" id="rd-3" onChange={() => setRating(3)} />
                        <label htmlFor="rd-3" ><i><FontAwesomeIcon icon={faStar} /></i></label>
    
                        <input type="radio" name="rate" id="rd-2" onChange={() => setRating(2)} />
                        <label htmlFor="rd-2" ><i><FontAwesomeIcon icon={faStar} /></i></label>
    
                        <input type="radio" name="rate" id="rd-1" onChange={() => setRating(1)} />
                        <label htmlFor="rd-1" ><i><FontAwesomeIcon icon={faStar} /></i></label>
        </div>
    )
}

export default NewRaiting
