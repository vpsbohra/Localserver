import React from 'react';
import GetToKnow from './GetToKnow';
import PlayFulSection from './PlayFulSection';
import MeetCharacter1 from './MeetCharacter1';
import MeetCharacter2 from './MeetCharacter2';
import KidzeConnectBring from './KidzeConnectBring';
import Footer from './Footer';
import Plans from './Plans';
import FrequentlyAskedQuestions from './FrequentlyAskedQuestions';
import Header from './Header';

export default function Home() {
    return(
        <>
        <Header />
        <GetToKnow />
        <PlayFulSection />
        <MeetCharacter1 />
        <MeetCharacter2 />
        <KidzeConnectBring />
        <Plans />
        <FrequentlyAskedQuestions />
        <Footer />
        </>
    )
}