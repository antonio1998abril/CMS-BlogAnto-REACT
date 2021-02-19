import React from 'react'
import './Rating.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar} from '@fortawesome/free-solid-svg-icons'


let rate = 0;
function Rating({props}) {

    if(props.numReviews){
        rate = 100 - (props.rating / props.numReviews * 20)
    }else{
        rate = 100 - (props.rating * 20)
    }

    const style_star = {
        clipPath: props.rating === 0 ? `inset(0 100% 0 0)` : `inset(0 ${rate}% 0 0)`
    }
    return (
    <div className="rating">
        <div className="star">
         
            <i className="colorstar"><FontAwesomeIcon icon={faStar} /></i>
            <i className="colorstar"><FontAwesomeIcon icon={faStar} /></i>
            <i className="colorstar"><FontAwesomeIcon icon={faStar} /></i>
            <i className="colorstar"><FontAwesomeIcon icon={faStar} /></i>
            <i className="colorstar"><FontAwesomeIcon icon={faStar} /></i>

            <div className="star-1" style={style_star}>
           
                <i><FontAwesomeIcon icon={faStar} /></i>
                <i><FontAwesomeIcon icon={faStar} /></i>
                <i><FontAwesomeIcon icon={faStar} /></i>
                <i><FontAwesomeIcon icon={faStar} /></i>
                <i><FontAwesomeIcon icon={faStar} /></i>
            </div>
        </div>
    </div>
    )
}

export default Rating
