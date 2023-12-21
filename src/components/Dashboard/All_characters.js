import React, { useState } from "react";
import KidsNav from "../../navbar/kidzNav";
import Stany from "../../images/Character/Character1.png";
import Stefy from "../../images/Character/Character2.png";
import Booboo from "../../images/Character/Character4.png";
import Balam from "../../images/Character/Balam.png";
import Giovanni from "../../images/Character/Character3.png";
import Kaplnga from "../../images/Character/Kaplnga.png";
import Cindy from "../../images/Character/Cindy.png";
import Songa from "../../images/Character/Songa.png";
import Gregory from "../../images/Character/Gregory.png";
import Filoo from "../../images/Character/Filoo.png";
import Karima from "../../images/Character/Karima.png";
import Martin from "../../images/Character/Martin.png";
import Mom from "../../images/Character/Mom.png";
import Dad from "../../images/Character/Dad.png";
import Stock from "../../images/Character/Stock.png";
import Rodrigo from "../../images/Character/Rodrigo.png";
import Stock2 from "../../images/Character/Stock2.png";
import Bradford from "../../images/Character/Bradford.png";
import Thomas from "../../images/Character/Thomas.png";
import Simon from "../../images/Character/Simon.png";
import Phil from "../../images/Character/Phil.png";
import Sherif from "../../images/Character/Sherif.png";
import Isaac from "../../images/Character/Isaac.png";
import David from "../../images/Character/David.png";
import Stany2 from "../../images/Character/Stanylg.png";
import Stefy2 from "../../images/Character/Stefyf.png";
import Booboo2 from "../../images/Character/Booboof.png";
import Balam2 from "../../images/Character/Balumf.png";
import Giovanni2 from "../../images/Character/Giovannif.png";
import Kaplnga2 from "../../images/Character/Kapingaf.png";
import Cindy2 from "../../images/Character/Cindyf.png";
import Songa2 from "../../images/Character/Songaf.png";
import Gregory2 from "../../images/Character/Gregoryf.png";
import Filoo2 from "../../images/Character/Filoof.png";
import Karima2 from "../../images/Character/Karimaf.png";
import Martin2 from "../../images/Character/Martinf.png";
import Mom2 from "../../images/Character/Momf.png";
import Dad2 from "../../images/Character/Dadf.png";
import Stock21 from "../../images/Character/Stockf.png";
import Rodrigo2 from "../../images/Character/Rodrigof.png";
import Stock22 from "../../images/Character/Mrs_Stock.png";
import Bradford2 from "../../images/Character/Bradfordf.png";
import Thomas2 from "../../images/Character/Thomasf.png";
import Simon2 from "../../images/Character/Simonf.png";
import Phil2 from "../../images/Character/Philf.png";
import Sherif2 from "../../images/Character/Sherifff.png";
import Isaac2 from "../../images/Character/Isaacf.png";
import David2 from "../../images/Character/MrsDavidf.png";
import stany_1 from "../../images/Character/stany(1).png";
import stany_2 from "../../images/Character/stany(2).png";
import stany_3 from "../../images/Character/stany(3).png";
import stany_4 from "../../images/Character/stany(4).png";
import stefy_1 from "../../images/Character/stefy(1).png";
import stefy_2 from "../../images/Character/stefy(2).png";
import stefy_3 from "../../images/Character/stefy(3).png";
import stefy_4 from "../../images/Character/stefy(4).png";
import stefy_5 from "../../images/Character/stefy(5).png";
import stefy_6 from "../../images/Character/stefy(6).png";
import Rectangle_82 from "../../images/Character/Rectangle_82.png";
import { Link } from "react-router-dom";
import Selected_character from "./Selected_character";
import { useNavigate } from "react-router-dom"
import { Button } from "react-bootstrap";
export default function All_characters() {

    const characters = [
        {
            name: "Stany",
            image: Stany,
            imagetoken: Stany2,

            description: "Stany is an 11-year-old boy who loves adventure and sports. He enjoys spending time outdoors and trying new things. He is brave and confident, but sometimes he can be stubborn and reluctant to admit his mistakes. He also tends to forget things easily. He has brown hair and plays the guitar very well. He often brings his guitar with him wherever he goes.",
            sliderImages: [stany_1, stany_2, stany_3, stany_4],
        },
        {
            name: "Stefy",
            image: Stefy,
            imagetoken: Stefy2,

            description: "Stephy is a 13-year-old girl with a creative and curious mind. She loves drawing, reading, and solving puzzles. She is very protective of her little brother Stany, whom she often helps with his homework and adventures. She can sometimes be a bit of a perfectionist and get frustrated when things do not go her way. She has blonde hair and a pretty face. She dresses very simply, preferring comfort over fashion. She is an outstanding pianist who can play classical and modern songs with ease.",
            sliderImages: [stefy_1, stefy_2, stefy_4, stefy_5, stefy_6],
        },
        {
            name: "Booboo",
            image: Booboo,
            imagetoken: Booboo2,

            description: "Stany and Stephy's dog, a very friendly golden retriever, playful and greedy. He loves playing ball and cuddling his owners. When he sleeps, he always has one eye open. He is not very big but has a lot of energy.",
            sliderImages: [Rectangle_82, Rectangle_82, Rectangle_82, Rectangle_82, Rectangle_82],
        },
        {
            name: "Balum Balum",
            image: Balam,
            imagetoken: Balam2,

            description: "A boisterous, proud child who likes to annoy others and does not always behave well. KidzConnect kids learn from his mistakes how not to behave. However, he has a good heart and can be very kind when he wants to be. He has black hair and is very tall for his 13 years. He likes to walk around with a wooden truncheon. He has bad breath and a loud voice.",
            sliderImages: [Rectangle_82, Rectangle_82, Rectangle_82, Rectangle_82, Rectangle_82],
        },
        {
            name: "Giovanni",
            image: Giovanni,
            imagetoken: Giovanni2,

            description: "A schoolmate of Stephy and Stany: he is Italian and never stops eating. He always has pizza with him, in his schoolbag or even in his pockets sometimes. And chocolates too... He is really overweight. His main fault is gluttony; he does not want to make the effort to eat less and lose weight. He loves to roll around Connectville on his rollerblades; he just goes for it, goes for it and goes for it. He is 13 years old.",
            sliderImages: [Rectangle_82, Rectangle_82, Rectangle_82, Rectangle_82, Rectangle_82],
        },
        {
            name: "Kapinga",
            image: Kaplnga,
            imagetoken: Kaplnga2,

            description: "A new student in Stephy's class from a foreign country. She's very shy and has trouble fitting in at first, but with the help of Stany and Stephy, she eventually finds her place in the school. She always has tips and solutions for every situation. She is 13 years old, of normal height, and of African descent.",
            sliderImages: [Rectangle_82, Rectangle_82, Rectangle_82, Rectangle_82, Rectangle_82],
        },
        {
            name: "Cindy",
            image: Cindy,
            imagetoken: Cindy2,

            description: "A friend of Stephy's who loves fashion and art. She's always on the lookout for the latest trends and knows how to create unique and original looks. She is the only one who is always changing her style. She eats very little to stay very slim, because her dream is to be a professional model one day... She's 13 and has long, curly black hair. She's very pretty and dresses very elegantly, always wearing her favorite KDZCO brand. She also wears light make-up and small jewels. She always has her phone or tablet in hand. She sings very well but swims very badly",
            sliderImages: [Rectangle_82, Rectangle_82, Rectangle_82, Rectangle_82, Rectangle_82],
        },
        {
            name: "Dr.Songa",
            image: Songa,
            imagetoken: Songa2,

            description: "Stany and Stephy's family doctor, a caring and competent man who has been looking after the family's health for many years. He is bald, with side-parted hair and a graying moustache. He is 60 years old and wears a white coat and a stethoscope. He is friendly and gentle with his patients.",
            sliderImages: [Rectangle_82, Rectangle_82, Rectangle_82, Rectangle_82, Rectangle_82],
        },
        {
            name: "Gregory",
            image: Gregory,
            imagetoken: Gregory2,

            description: "A schoolmate of Stany and Stephy. He is a very funny and creative boy. He is always ready to help his friends and find original solutions to their problems. He is always running around and very fast. So, he is always out of breath. He is 11 years old and blond. He still wears overalls and glasses. He has a cheerful personality and a big smile.",
            sliderImages: [Rectangle_82, Rectangle_82, Rectangle_82, Rectangle_82, Rectangle_82],
        },
        {
            name: "Filoo",
            image: Filoo,
            imagetoken: Filoo2,

            description: "Madame Karima's cat, often seen basking in the sun and being pampered by local children. He is a bit lazy but very affectionate. He is very close to Booboo and likes to follow him around. As soon as he sees someone running, he has to follow him and stick close to him.",
            sliderImages: [Rectangle_82, Rectangle_82, Rectangle_82, Rectangle_82, Rectangle_82],
        },
        {
            name: "Karima",
            image: Karima,
            imagetoken: Karima2,

            description: "Stany and Stephy's neighbor, a caring woman always ready to help others. She is also known for her delicious recipes and her gift for sewing. She works as a volunteer at the local library. She is Moroccan and 50 years old.",
            sliderImages: [Rectangle_82, Rectangle_82, Rectangle_82, Rectangle_82, Rectangle_82],
        },
        {
            name: "Mr.Martin",
            image: Martin,
            imagetoken: Martin2,

            description: "The language teacher. He is very friendly with children and often plays with them. He is corpulent and walks very slowly. He always wears colorful Hawaiian shirts. He is 30 years old. He speaks several languages.",
            sliderImages: [Rectangle_82, Rectangle_82, Rectangle_82, Rectangle_82, Rectangle_82],
        },
        {
            name: "Mom",
            image: Mom,
            imagetoken: Mom2,

            description: "A journalist with Connectville International Television, she is blonde and particularly pretty, with a tan. She is 40 years old and has a busy schedule. She is close to her children but often has a lot of work to do. She tries to balance her career and family life.",
            sliderImages: [Rectangle_82, Rectangle_82, Rectangle_82, Rectangle_82, Rectangle_82],
        },
        {
            name: "Dad",
            image: Dad,
            imagetoken: Dad2,

            description: "An engineer in a construction company, he is 45 years old but looks young and very dynamic. He has brown hair and a warm smile. He is very close to his children and loves to spend time with them.",
            sliderImages: [Rectangle_82, Rectangle_82, Rectangle_82, Rectangle_82, Rectangle_82],
        },
        {
            name: "Mr. Stock",
            image: Stock,
            imagetoken: Stock21,

            description: "Stany and Stephy's 70-something neighbors. They're grumpy and always complaining about the noise and the children's activities. Children learn from their mistakes how not to behave with others. Mr. Stock often threatens youngsters and pets with his cane, encouraged by Mrs. Stock. Mr Stock still has his cane in hand. Their hair, beard and moustache are as white as snow. They're inseparable.",
            sliderImages: [Rectangle_82, Rectangle_82, Rectangle_82, Rectangle_82, Rectangle_82],
        },
        {
            name: "Rodrigo",
            image: Rodrigo,
            imagetoken: Rodrigo2,

            description: "He is Stany and Stéfy's big brother. He has a great imagination but does not always obey his parents. He is tall and always has a catapult in his pocket. Whenever he is upset, his catapult comes in handy to exact his revenge.",
            sliderImages: [Rectangle_82, Rectangle_82, Rectangle_82, Rectangle_82, Rectangle_82],
        },
        {
            name: "Mrs. Stock",
            image: Stock2,
            imagetoken: Stock22,

            description: "Stany and Stephy's 70-something neighbors. They're grumpy and always complaining about the noise and the children's activities. Children learn from their mistakes how not to behave with others. Mr. Stock often threatens youngsters and pets with his cane, encouraged by Mrs. Stock. Mr Stock still has his cane in hand. Their hair, beard and moustache are as white as snow. They're inseparable.",
            sliderImages: [Rectangle_82, Rectangle_82, Rectangle_82, Rectangle_82, Rectangle_82],
        },
        {
            name: "Mr.Bradford",
            image: Bradford,
            imagetoken: Bradford2,

            description: "description",
            sliderImages: [Rectangle_82, Rectangle_82, Rectangle_82, Rectangle_82, Rectangle_82],
        },
        {
            name: "Thomas",
            image: Thomas,
            imagetoken: Thomas2,

            description: "A friend of Stany's who is passionate about astronomy. He has a telescope at home and enjoys stargazing at night. He is also very good at science and sometimes helps Stany with his scientific projects. He carries his compass with him wherever he goes. His biggest flaw: he loves to defy danger and has a tendency to influence his classmates. He is 11 years old and of normal height. He's always dressed like an adult and loves to wear suits and ties. Several of his teeth have fallen out.",
            sliderImages: [Rectangle_82, Rectangle_82, Rectangle_82, Rectangle_82, Rectangle_82],
        },
        {
            name: "Mrs. Simon",
            image: Simon,
            imagetoken: Simon2,

            description: "The history and geography teacher at Stany and Stephy's school, a patient and understanding teacher who always encourages her pupils to give their best. She is 40 years old.`}><div className='kidz_profile_popupsr_content",
            sliderImages: [Rectangle_82, Rectangle_82, Rectangle_82, Rectangle_82, Rectangle_82],
        },
        {
            name: "Uncle Phil",
            image: Phil,
            imagetoken: Phil2,

            description: "Stany and Stephy's maternal uncle, who is a great traveler and tells fascinating stories about his adventures around the world. He's always ready to share his knowledge and encourage children's curiosity. A brilliant entrepreneur and a wealthy man, he studied physics and computer science at the country's top university. He's a bon vivant who never shies away from a good glass of wine. He's 42, blond with a moustache and glasses.",
            sliderImages: [Rectangle_82, Rectangle_82, Rectangle_82, Rectangle_82, Rectangle_82],
        },
        {
            name: "Sheriff",
            image: Sherif,
            imagetoken: Sherif2,

            description: "description",
            sliderImages: [Rectangle_82, Rectangle_82, Rectangle_82, Rectangle_82, Rectangle_82],
        },
        {
            name: "Mr. Isaac",
            image: Isaac,
            imagetoken: Isaac2,

            description: "Stany's sports teacher. He's a former professional basketball player who helps Stany hone his skills on the court. He is also a good listener and gives good advice to his students. He is very athletic and 55 years old.",
            sliderImages: [Rectangle_82, Rectangle_82, Rectangle_82, Rectangle_82, Rectangle_82],
        },
        {
            name: "Mrs. David",
            image: David,
            imagetoken: David2,

            description: "The science teacher. She is very thin and severe. She never jokes, especially not with children. She is 43 years old and has a sour expression on her face. Her glasses rarely leave her side. She is not very popular with students and their parents.",
            sliderImages: [Rectangle_82, Rectangle_82, Rectangle_82, Rectangle_82, Rectangle_82],
        },
    ];

    return (
        <>
            <div className="kidzdashboard">
                <div className="container-fluid display-table">
                    <KidsNav />
                    <div className="main-content">
                        <div className="page_ttl">
                            <div className='kidz_allcharacters_Sr'>
                                <div className='kidz_profile_popupsr_inner'>
                                    {characters.map((character) => (
                                        <Link
                                            to={`/selectedcharacter?imagetoken=${character.imagetoken}&charname=${character.name}&description=${encodeURIComponent(character.description)}&sliderImages=${character.sliderImages.join(",")}`}
                                        >
                                            <div className="kidz_profile_popupsr_content">
                                                <img src={character.image} alt="Selected Image" className="modal-image" />
                                                <h3>{character.name}</h3>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}