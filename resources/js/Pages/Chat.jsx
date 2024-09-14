import DangerButton from '@/Components/DangerButton';
import InputLabel from '@/Components/InputLabel';
import NavLink from '@/Components/NavLink';
import TextInput from '@/Components/TextInput';
import React, { useEffect, useState } from "react";
import { Button } from '@headlessui/react';
import { Link, Head } from '@inertiajs/react';
import axios from "axios";
import { Input } from 'postcss';

export default function Sample() {

    const [inputText, setInputText] = useState('');
    const [gptMessages, setGptMessage] = useState([]);

    const API_URL = "http://localhost/api/chat-gpt";

    const handleInputTextChange = (event) => {
        setInputText(event.target.value);
    };

    const callChatGptButton = async() => {
        try {
            const response = await axios.post(API_URL, {
                'inputText': inputText
            });
            
            setGptMessage(response.data);
        } catch {
            setGptMessage("error");
        }
    };
    
    return (
        <>  
            <Head title="Chat" />
            <div className="bg-gray-50 min-h-screen dark:bg-black dark:text-black/50 flex flex-col items-center">
                <InputLabel className=" top-0 text-[50px]">Test</InputLabel>
                <div className="w-full">
                    <TextInput className="mt-10 w-2/3" onChange={handleInputTextChange}></TextInput>
                </div>
                <div className="w-full">
                    <Button className="mt-10 text-black bg-white" onClick={callChatGptButton}>submit</Button>
                </div>

                {gptMessages.map((gptMessage) => {
                    return (
                        <div className="w-full" key={gptMessage.id}>
                            <InputLabel className="mt-10 text-black bg-white" children={gptMessage.question}></InputLabel>
                            <Button className="mt-3 text-black bg-white">○</Button>
                            <Button className="mt-3 text-black bg-white ml-10">×</Button>
                        </div>
                    );
                })}
            </div>
        </>
    );
}