<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;

class CateController extends Controller
{
    public function __construct(){
        $this->host = 'http://127.0.0.1:3000';
    }
    public function index(){
        $urlCate=$this->host.'/category';
        $allCate = Http::get($this->host.'/api/allCate',['token'=>session()->get('token'),]);
        $products = json_decode(Http::get($this->host.'/api/products1',['token'=>session()->get('token'),]));
        $allCate =  json_decode($allCate,true);
        return view('cate.index', compact('allCate','products','urlCate'));
    }
}