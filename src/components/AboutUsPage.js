import styles from "../styles/about_us.module.css"


export default function AboutUsPage(){
    return (
        <div className="mt-minus">
            <h1 className={styles.greetings}>Welcome to Finance Tracker</h1>
            <div className={styles.separator}>
                <div className={styles.curve}>
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
                    </svg>
                </div>
            </div>

            <div className={styles.someContent}>
                <img className={styles.graphShow} src="./graph_show.png"/>
                <span className={styles.salesText}>
                    When you use Finance Tracker you get the best use of your time by checking everything in one place. 
                    You get the most accurate graphs, charts and predictions about your future income.
                    You can start achieving more by earning more with your current budget.
                </span>
                
            </div>

            <div className={styles.separator}>
                <div className={styles.reverseCurve}>
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
                    </svg>
                </div>
            </div>

            <div className={styles.restContent}>

            </div>
            
        </div>
    );
}