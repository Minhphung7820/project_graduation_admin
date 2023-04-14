<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class PostsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $allPosts = Http::get('http://127.0.0.1:3000/api/allPosts', ['token' => session()->get('token')]);
        $allTrash = Http::get('http://127.0.0.1:3000/api/loadTrashPosts', ['token' => session()->get('token')]);
        $allPosts = json_decode($allPosts);
        $allTrash = json_decode($allTrash);
        return view('posts.posts', compact('allPosts', 'allTrash'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $allCate =  json_decode(Http::get('http://127.0.0.1:3000/api/allCategoriesPosts', ['token' => session()->get('token')]));
        $allProd = json_decode(Http::get('http://127.0.0.1:3000/api/allProdInEditBlog', ['token' => session()->get('token')]));
        $pro_col_1 = [];
        $pro_col_2 = [];
        $oneCol = ceil(count($allProd) / 2);
        foreach ($allProd as $key => $value) {
            if ($key + 1 <= $oneCol) {
                $pro_col_1[] = $value;
            } elseif ($key + 1 > $oneCol) {
                $pro_col_2[] = $value;
            }
        }
        return view('posts.add', compact('allCate', 'pro_col_1','pro_col_2'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($slugCate, $slugTitle)
    {
        $datas = json_decode(Http::post('http://127.0.0.1:3000/api/detailPosts', [
            'token' => session()->get('token'),
            'slug_cate' => $slugCate,
            'slug_title' => $slugTitle
        ]));
        $allCate =  json_decode(Http::get('http://127.0.0.1:3000/api/allCategoriesPosts', [
            'token' => session()->get('token')
        ]));
        if ($datas->status == 404) {
            return abort(404);
        }
        $allProd = json_decode(Http::get('http://127.0.0.1:3000/api/allProdInEditBlog', ['token' => session()->get('token')]));
        $data  = $datas->msg;
        $tagsA = [];
        foreach ($data->tags as $key => $value) {
            $tagsA[] = $value->nameTagBlog;
        }
        $tags = implode(',',$tagsA);
        $prods = [];
        foreach ($datas->prods as $key => $value) {
               $prods[] = $value->id;
        }
        $pro_col_1 = [];
        $pro_col_2 = [];
        $oneCol = ceil(count($allProd) / 2);
        foreach ($allProd as $key => $value) {
            if ($key + 1 <= $oneCol) {
                $pro_col_1[] = $value;
            } elseif ($key + 1 > $oneCol) {
                $pro_col_2[] = $value;
            }
        }
        return view('posts.edit_posts', compact('data', 'allCate','pro_col_1','pro_col_2','prods','tags'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
