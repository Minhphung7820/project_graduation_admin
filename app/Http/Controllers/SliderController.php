<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;

class SliderController extends Controller
{
    public function __construct()
    {
        $this->host = 'http://127.0.0.1:3000';
    }
    public function allSlider(){
        $urlImage = $this->host . '/sliders';
        $slider = Http::get($this->host.'/api/sliders',[
            'token'=>session()->get('token'),
        ]);
        $trash = Http::get($this->host.'/api/allSliderTrash',[
            'token'=>session()->get('token'),
        ]);
        $allSlider =  json_decode($slider,true);
        $allTrash=json_decode($trash,true);
        return view('slider.index', compact('urlImage','allSlider','allTrash'));
    }
}
