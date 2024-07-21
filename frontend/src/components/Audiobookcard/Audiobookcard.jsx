import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Audiobookcard = ({data}) =>{
console.log(data);
    return(
<>
    <Link to={`/audiobook/${data._id}`}>
        <div>
            <div>
            <img src={data.coverImage} alt="img" className="h-[50vh] w-[50vh]"/>
            </div>
            <h3 className="text-center mt-2">{data.title} by {data.author}</h3>
        </div>
    </Link>
</>
)
}
export default Audiobookcard;