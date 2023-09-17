
import styled from 'styled-components';

export default function LegendField(props){
   return (
        <Legend>
            <div style={{backgroundColor: `${props.color}`, width: "20px", height: "20px", display: "inline-block", marginTop: "20px"}}></div>
            <span> {props.label} </span>
        </Legend>
   ) 
} 
const Legend = styled.div` 
    width: 300px;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-items: baseline;
    gap: 20px;
`