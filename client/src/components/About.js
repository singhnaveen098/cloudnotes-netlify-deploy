import React from 'react'
import c from '../Langicons/c.png'
import cpp from '../Langicons/c++.png'
import css from '../Langicons/css.png'
import html from '../Langicons/html.png'
import java from '../Langicons/java.png'
import js from '../Langicons/js.png'
import nodejs from '../Langicons/nodejs.png'
import python from '../Langicons/python.png'
import react from '../Langicons/react.png'
function About() {
    return (
        <>
            <div className=' border-gray-300 shadow-lg border-2 text-center my-16 p-4 rounded-xl'>
                <h1 className='text-2xl font-bold mb-4'>About Me</h1>
                <p className=' text-lg w-3/4 mx-auto'>Hello, I am Naveen Negi a web and app developer specializing in data structure, algorithims and MERN stack. I have hands-on experience in building web app and mobile apps currently learning ML. Feel free to contact me: </p>
                <span className='text-lg font-bold'><a href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=singh.naveen098@gmail.com" rel="noreferrer" target="_blank" className='hover:text-black'>singh.naveen098@gmail.com</a></span>
                <h1 className='text-2xl font-bold my-16'>Languages</h1>
                <div className='flex flex-wrap justify-between'>
                    <div className='flex-col p-10 mx-auto'>
                        <img src={c} alt="c" className='h-36'/>
                        <h2 className='font-bold'>C</h2>
                    </div>
                    <div className='flex-col p-10 mx-auto'>
                        <img src={cpp} alt="c" className='h-36'/>
                        <h2 className='font-bold'>C++</h2>
                    </div>
                    <div className='flex-col p-10 mx-auto'>
                        <img src={css} alt="c" className='h-36'/>
                        <h2 className='font-bold'>Css 3</h2>
                    </div>
                    <div className='flex-col p-10 mx-auto'>
                        <img src={html} alt="c" className='h-36'/>
                        <h2 className='font-bold'>Html 5</h2>
                    </div>
                    <div className='flex-col p-10 mx-auto'>
                        <img src={java} alt="c" className='h-36'/>
                        <h2 className='font-bold'>Java</h2>
                    </div>
                    <div className='flex-col p-10 mx-auto'>
                        <img src={js} alt="c" className='h-36'/>
                        <h2 className='font-bold'>Javascript</h2>
                    </div>
                    <div className='flex-col p-10 mx-auto'>
                        <img src={nodejs} alt="c" className='h-36'/>
                        <h2 className='font-bold'>Nodejs</h2>
                    </div>
                    <div className='flex-col p-10 mx-auto'>
                        <img src={python} alt="c" className='h-36'/>
                        <h2 className='font-bold'>Python</h2>
                    </div>
                    <div className='flex-col p-10 mx-auto'>
                        <img src={react} alt="c" className='h-36'/>
                        <h2 className='font-bold'>React js/Native</h2>
                    </div>
                </div>
            </div>
        </>
    )
}

export default About
