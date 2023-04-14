<?php

use App\Http\Controllers\CatePostsController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\GoogleController;
use App\Http\Controllers\PostsController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\brandController;
use App\Http\Controllers\CateController;
use App\Http\Controllers\SliderController;
use App\Http\Controllers\InfoController;
use App\Http\Controllers\billControllers;
use App\Http\Controllers\SizeController;

use App\Http\Controllers\RatingManageController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [UserController::class,'login']);
Route::middleware(['CheckLogin'])->group(function () {
    Route::get('/dashboard', [billControllers::class,'Chart']);
    Route::get('/logout', [UserController::class,'logout']);
    Route::get('/products', [ProductsController::class,'index']);
    Route::get('/brands', [brandController::class,'index']);
    Route::get('/cate', [CateController::class,'index']);
    Route::get('/users', [UserController::class,'index']);
    Route::get('/size', [SizeController::class,'index']);
    Route::get('/posts', [PostsController::class,'index']);
    Route::get('/categories-posts',[CatePostsController::class,'index']);
    Route::get('/add-posts',[PostsController::class,'create']);
    Route::get('/edit-posts/{cate?}/{title?}.html',[PostsController::class,'show']);
    Route::get('/sliders',[SliderController::class,'allSlider']);
    Route::get('/infoShop',[InfoController::class,'infoShop']);
    //=======================================================
    Route::get('/bills',[billControllers::class,'index']);
    // ======================================================
    Route::get('/rating',[RatingManageController::class,'index']);
    Route::post('/actionRating',[RatingManageController::class,'actionRating']);
    Route::get('/loadListRating',[RatingManageController::class,'loadListRating']);
    Route::get('/viewMoreRating/{id?}',[RatingManageController::class,'viewMoreRating']);
    Route::get('/viewMoreRatingWhenReload/{id?}',[RatingManageController::class,'viewMoreRatingWhenReload']);
    Route::get('/filterRatingByStatus/{sortby?}',[RatingManageController::class,"filterRatingByStatus"]);
    Route::get('/viewMoreFilterRating/{pr?}/{pr_2?}',[RatingManageController::class,'viewMoreFilterRating']);
    Route::get('/viewMoreRatingByFilterWhenReload/{id?}/{is?}',[RatingManageController::class,'viewMoreRatingByFilterWhenReload']);


});
Route::get('/login', [UserController::class,'login']);
Route::get('auth/google', [GoogleController::class, 'redirect'])->name('google-auth');
Route::get('auth/google/call-back', [GoogleController::class, 'callbackGoogle']);
