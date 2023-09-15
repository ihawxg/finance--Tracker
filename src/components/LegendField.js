import styles from './styles/total_box.module.css';

export default function LegendField(props){
   return (
        <div style={styles.legendCollection}>
            <div style={{backgroundColor: `${props.color}`, width: "20px", height: "20px", display: "inline-block", marginTop: "20px"}}></div>
            <span> {props.label} </span>
        </div>
   ) 
}