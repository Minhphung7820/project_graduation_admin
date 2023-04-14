<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;

class InfoController extends Controller
{
    public function __construct()
    {
        $this->host = 'http://127.0.0.1:3000';
    }
    public function infoShop(){
        $urlImage = $this->host.'/logos';
        $infos = Http::get($this->host.'/api/infoShop',[
            'token'=>session()->get('token'),
        ]);
        $infos =  json_decode($infos,true);
        return view('info.index', compact('infos','urlImage'));
    }
}
