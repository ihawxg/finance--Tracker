import styles from "./styles/about_us.module.css"
import Form from './ContactForm';
import styled from 'styled-components';
import { StyledPage } from './HistoryPage';
import analytics from './imgs/analytics.png';
import beHero from './imgs/beHero.png';
import goal from './imgs/goal.png';
import money from './imgs/money.png';
import monthly from './imgs/monthly.png';
import success from './imgs/success.png';

export default function AboutUsPage(){
    return (
        <div className="mt-minus">
            <Form />
            <h1 className={styles.greetings}>Welcome to Finance Tracker</h1>
            <div className={styles.separator}>
                <div className={styles.curve}>
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
                    </svg>
                </div>
            </div>

            {/* <div className={styles.someContent}>
                <img className={styles.graphShow} src="./graph_show.png"/>
                <span className={styles.salesText}>
                    When you use Finance Tracker you get the best use of your time by checking everything in one place. 
                    You get the most accurate graphs, charts and predictions about your future income.
                    You can start achieving more by earning more with your current budget.
                </span>
                
            </div> */}

            <StyledPage>

            <InfoBox>
                <StyledImg src={money} />
                <Heading>All your finances in one place</Heading>
                <Text>Connect all your bank accounts, wallets, track cash and import data!</Text>
            </InfoBox>  
            <InfoBox>
                <StyledImg src={analytics} />
                <Heading>Track your spending</Heading> 
                <Text>Keep track and analyze all transactions immediately and conveniently through an array of charts and filters</Text>
            </InfoBox>  
            <InfoBox>
                <StyledImg src={goal} />
                <Heading>Set up goals</Heading>
                <Text>Track and follow what matters to you. Save for important things and reach your goals quicker than ever</Text>
            </InfoBox>    
            <InfoBox>
                <StyledImg src={monthly} />
                <Heading>Budget your money</Heading>
                <Text>Make the right financial decisions by setting up budgets upfront</Text>
            </InfoBox>    
            <InfoBox>
                <StyledImg src={success} />
                <Text>Build healthy financial habits and take control of exessive and unnecessary expenses</Text>
            </InfoBox>
            <InfoBox>
                <StyledImg src={beHero} />
                <Text>Hop on board and become your own financial superhero! Sign up now!</Text>
            </InfoBox>    
               
            </StyledPage>

            <div className={styles.separator}>
                <div className={styles.reverseCurve}>
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
                    </svg>
                </div>
            </div>

            <div className={styles.restContent}></div>
        </div>
    );
}

const InfoBox = styled.div`
    margin: 10px auto;
    width: 80%;
    height: 350px;
    border-bottom: 1px solid rgba(0,0,0,.2);
    &:first-child {
        margin-top: 50px;
    }
    &:last-child{
        border : none;
    }
`
const StyledImg = styled.img`
    width: 170px;
    margin: 30px;
`
const Heading = styled.h4`
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 600;
    color : rgba(0,0,0,.8);
    margin-bottom: 10px;
`
const Text = styled.div`
    color : #707070;
    letter-spacing: 1px;
    line-height: 2em;
`