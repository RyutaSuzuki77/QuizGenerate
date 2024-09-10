<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use OpenAI\Laravel\Facades\OpenAI;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Http;

class PostChatGptController extends Controller
{
    public function index()
    {
        $messages = [
            'role' => 'user',
            "content" => '今日の東京の天気は？'
        ];
        $result = OpenAI::chat()->create([
            'model' => 'gpt-3.5-turbo',
            'messages' => [
                [
                    'role' => 'user',
                    'content' => '今日の東京の天気は？'
                ]
            ]
        ]);

        // Log::Info($result['choice'][0]['text']);

        return response()->json(
            [
                'content' => [
                    [
                        'id' => 1,
                        'name' => 'test'
                    ],
                    [
                        'id' => 2,
                        'name' => $result->choices[0]->message->content
                    ]
                ]
            ],
            200,
            [],
            JSON_UNESCAPED_UNICODE
        );
    }
}
