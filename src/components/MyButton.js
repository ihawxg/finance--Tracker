export default function MyButton(props){
    
    return (
        <button onClick={() => props.handleClick(props.cat, props.position)}> Remove </button>
    );
}