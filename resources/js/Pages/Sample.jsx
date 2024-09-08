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

    const [gptMessages, setGptMessage] = useState([]);

    const API_URL = "http://localhost/api/chat-gpt";

    const callChatGptButton = async() => {
        try {
            const response = await axios.get(API_URL);
            setGptMessage(response.data.content);
        } catch {
            setGptMessage("error");
        }
    };
    
    return (
        <>  
            <Head title="Welcome" />
            <div className="bg-gray-50 min-h-screen dark:bg-black dark:text-black/50 flex flex-col items-center">
                <InputLabel className=" top-0 text-[50px]">Test</InputLabel>
                <div className="selection:bg-[#FF2D20] w-full">
                    <TextInput className="mt-10 w-2/3"></TextInput>
                </div>
                <div className="selection:bg-[#FF2D20] w-full">
                    <Button className="mt-10 text-black bg-white" onClick={callChatGptButton}>submit</Button>
                </div>

                
                    {gptMessages.map((gptMessage) => {
                        return (
                            <div className="selection:bg-[#FF2D20] w-full" key={gptMessage.id}>
                                <InputLabel className="mt-10 text-black bg-white" children={gptMessage.name}></InputLabel>
                            </div>
                        );
                    })}
            </div>
        </>
    );
}