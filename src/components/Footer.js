import React from "react";
import styled from "styled-components";
import ShareIcon from '@mui/icons-material/Share';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
export default function Footer() {

    return(
        <StyledFooter>
            <Column>
                <h4>About</h4>
                <a>About Finance Tracker</a>
                <a>Accessibilty</a>
                <a>Customer Reviews</a>
                <a>Terms and Conditions</a>
            </Column>
            <Column>
                <h4>Our Services</h4>
                <a>Consulting</a>
                <a>Open an account</a>
                <a>Portfolio Management</a>
                <a>Budget Planner</a>
                <a>Income/Expenses Tracker</a>
            </Column>
            <Column>
                <h4>Become a part of us</h4>
                <a>Leave us your resume</a>
                <a>Refer a friend</a>
                <a>Contact our HR</a>
                <a>Visit our LinkenIn Page</a>
                <a>Come meet us!</a>
            </Column>
            <Column>
                <h4>Customer Support</h4>
                <a>Leave a message</a>
                <a>Call us</a>
                <a>Visit our office</a>
                <a>Find us on any social platform</a>
            </Column>
            <Column>
                <h4>Get social with us</h4>
                <a><ShareIcon/> Share our page</a>
                <a><LinkedInIcon/> Get on board on Linkedin</a>
                <a><FacebookIcon/> Find us on Facebook</a>
                <a><TwitterIcon/> Follow us on Twitter</a>
                <a><YouTubeIcon/> ...And don't forget to subscribe!</a>
            </Column>
        </StyledFooter>
    )
}

const StyledFooter = styled.footer`
    width: 100%;
    padding: 50px;
    color : #fff;
    display : flex;
    flex-flow: row wrap;
    justify-content: space-between;
    gap: 20px;
    @media (max-width: 768px) {
        flex-direction : column;
        background-color :#2F40A2;
    }

`
const Column = styled.div`
    display: flex;
    flex-direction : column;
`