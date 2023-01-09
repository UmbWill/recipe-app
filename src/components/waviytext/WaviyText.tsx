import React from 'react';

import './waviytext.css';

export default function WaviyText(props : any){
    const text = props.text.split(/(\s+)/);

    return(
        <div className="waviy">
            {
                text.map((item: string, index:number) =>(
                    <span key={index} style={{ "--i": index} as React.CSSProperties} >{item}</span>  
                ))
            }
        </div>
   );
}