<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use OpenAI\Laravel\Facades\OpenAI;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class PostChatGptController extends Controller
{
    private const fixedMessage = 'の○×問題を3問出してください。json形式で、中身はidとquestionとExplanationとanswerで。answerは、○の場合：true、×の場合:falseで。json以外のメッセージとマークアップは不要です。理解できない場合は、';

    public function chat(Request $request): JsonResponse 
    {
        $validator = Validator::make($request->all(), ['inputText' => 'required']);
        if ($validator->fails()) {
            return response()->json(
                [
                    [
                        'id' => 1,
                        'question' => 'error'
                    ]
                ],
                200,
                [],
                JSON_UNESCAPED_UNICODE
            );
        }
        
        $result = OpenAI::chat()->create([
            'model' => 'gpt-4-o',
            'messages' => [
                [
                    'role' => 'user',
                    'content' => $request->inputText.self::fixedMessage
                ]
            ]
        ]);

        return response()->json(
            json_decode($result->choices[0]->message->content),
            200,
            [],
            JSON_UNESCAPED_UNICODE
        );
    }
}
