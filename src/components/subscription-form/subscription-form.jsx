import React from 'react';
import styled, { withTheme } from 'styled-components';

import { media } from '../../utils/css-utils';
import Button from '../common/button';

const SubscriptionFormContainer = styled.section`
    background-image: url(subscribtion-form-bg.jpg);
    background-size: cover;
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 6em 2em;
    ${media.desktop`padding: 10em 2em;`}
`;

const Header = styled.h2`
    text-align: center;
    margin: 0;
    margin-bottom: .615rem; /* 16px */
    font-family: 'Rubik', sans-serif;
    font-weight: bold;
    color: #fff;
    font-size: 2.6em;
    ${media.tablet`
        font-size: 4.8em;
    `}
`;

const SubHeader = styled.p`
    text-align: center;
    margin: 0;
    margin-bottom: 2.86rem; /* 40px */
    font-family: 'Oxygen', sans-serif;
    color: #fff;
    font-size: 1.4em;
    ${media.tablet`
        font-size: 2.4em;
    `}
`;

const FormWrapper = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    ${media.tablet`
        width: auto;
        flex-direction: row;
    `}
`;

const Input = styled.input`
    font-family: 'Oxygen', sans-serif;
    font-size: 2.4em;
    box-sizing: border-box;
    width: 100%;
    padding: .83em 1.25em;
    color: #ccc;
    margin-bottom: 1rem; /* 24px */
    ${media.tablet`
        width: 350px;
        margin-right: .625rem; /* 15px */
        margin-bottom: 0;
    `}
`;

const SubscriptionForm = withTheme(({ theme }) => (
    <SubscriptionFormContainer>
        <Header>Be informed about the coolest meetups</Header>
        <SubHeader>Get Webpurples latest news straight to your inbox. Enter your email address below:</SubHeader>
        <FormWrapper>
            <Input type="text" placeholder="Enter your email" />
            <Button defaultSheme={'#fff'} hoverColor={theme.vividPurple}>Subscribe</Button>
        </FormWrapper>
    </SubscriptionFormContainer>
));

export default SubscriptionForm;

