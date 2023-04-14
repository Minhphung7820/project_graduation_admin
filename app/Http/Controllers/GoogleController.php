<?php

namespace App\Http\Controllers;
use Laravel\Socialite\Facades\Socialite;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\DB;

class GoogleController extends Controller
{
    public function redirect()
    {
        return Socialite::driver('google')->redirect();
    }

    public function callbackGoogle()
    {
        try {
            
            $google_user = Socialite::driver('google')->stateless()->user();
            $google_id = $google_user->getId();
            $email = $google_user->getEmail();
            $image = $google_user->getAvatar();
            $name = $google_user->getName();
            $check =json_decode(Http::post('http://127.0.0.1:3000/api/checkUserLogin',[
                    'email'=>$email,
                    'image'=>$image,
                    'name'=>$name,
            ]),true);
            if($check['check']==true){
                Session::put('name',$name);
                Session::put('image',$image);
                Session::put('token',$check['token']);
                return redirect('/products');
            }else{
                return redirect('/login');
            }

        } catch (Exception $e) {
            dd($e->getMessage());
        }
    }
}
