<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Carbon\Carbon;

Carbon::setLocale('vi');
class RatingManageController extends Controller
{
    protected $host;

    public function __construct()
    {
        $this->host = 'http://127.0.0.1:3000/';
    }
    public function index()
    {   $data = json_decode(Http::get($this->host.'api/dashboardRating'));
        $all = $data->all;
        $waiting = $data->waiting;
        $approved = $data->approved;
        $spam = $data->spam; 
        $products = $data->products;
        return view('product.rating',compact('all','waiting','approved','spam','products'));
    }

    public function loadListRating()
    {
        $output = '';
        $arrId = [];
        $data = json_decode(Http::get($this->host . 'api/getAllRating'));
        $ratings = $data->result;
        $count = $data->count;
        $remaining = $count - count($ratings);

        // $arrProd = [];

        // foreach ($data->total as $key => $value) {
        //     $arrProd[] = $value->product;
        // }
        // $arrProd = array_unique($arrProd,SORT_REGULAR);
        $output .= '       <div class="row mb-4">
        <div class="col-lg-3 col-sm-12">
        <select class="form-select select-filter-rating-prod" aria-label="Default select example">
            <option value="all" selected>--Tất cả--</option>
            <option value="waiting">Đang chờ duyệt</option>
            <option value="approved">Đã được duyệt</option>
            <option value="spam">Đã bị spam</option>
        </select>
    </div>
       <div class="col-lg-3 col-sm-12">
           <select disabled class="form-select select-action-rating-prod" aria-label="Default select example">
               <option value="" selected>--Chọn hành động--</option>
               <option value="delete">Xóa các đánh giá</option>
               <option value="approve">Duyệt đánh giá</option>
               <option value="spam">Spam</option>
               <option value="unspam">Bỏ spam</option>
           </select>
       </div>
       <div class="col-lg-2 col-sm-12">
           <button type="button" class="btn btn-success fw-bold btn-apply-action-rating">Áp dụng</button>
       </div>
   </div>';
        if (count($ratings) > 0) {
            foreach ($ratings as $key => $row) {
                $arrId[] = $row->id;
                if ($row->status == 2) {
                    $stt = '<i class="fas fa-check-circle text-success"></i> <em class="text-success">Đã được duyệt !</em>';
                } elseif ($row->status == 1) {
                    $stt = '<i class="		fas fa-clock text-primary"></i> <em class="text-primary">Đang chờ duyệt !</em>';
                } elseif ($row->status == 3) {
                    $stt = '<i class="		fas fa-minus-circle text-danger"></i> <em class="text-danger">Đã bị spam !</em>';
                }

                $output .= '      <div data-stars="' . $row->num_star . '" data-id="' . $row->id . '" style="border-radius: 10px;" class="p-2 row mb-2 row-rating-box-of-customer shadow">
       <div class="col-lg-1 text-left box-image-custom-rating"><span class="bg-danger name-customer-rating">' . ucwords(mb_substr($row->customer->name, 0, 1)) . '</span></div>
       <div class="col-lg-11 content-custom-rating">
           <b>' . $row->customer->name . '</b> <span> ' . $stt . '</span><br>
           <i class="fas fa-star star-light mr-1 main_star_' . $row->id . '"></i>
           <i class="fas fa-star star-light mr-1 main_star_' . $row->id . '"></i>
           <i class="fas fa-star star-light mr-1 main_star_' . $row->id . '"></i>
           <i class="fas fa-star star-light mr-1 main_star_' . $row->id . '"></i>
           <i class="fas fa-star star-light mr-1 main_star_' . $row->id . '"></i>
           <div><strong>Đã nhận xét </strong> ' . $row->content_review . '. <strong>trong sản phẩm</strong> ' . $row->product->name . ' <strong>khoảng ' . Carbon::parse($row->created_at)->diffForHumans() . '</strong></div>
      
       </div>
   </div>';
            }
            $idmin = (count($arrId) > 0) ? min($arrId) : "";
            if ($count > 10) {
                $output .= ' <div class="row box-btn-view-more-rating">
                                    <div class="col-lg-12 mt-2 text-center">
                                    <button data-idmin="' . $idmin . '" type="button" class="btn btn-primary btn-viewmore-rating-admin">Xem thêm <strong>' . $remaining . '</strong> bài đánh giá</button>
                                    </div>
                                  </div>';
            }
        } else {
        }

        return response()->json($output);
    }

    public function actionRating(Request $request)
    {
        $data = json_decode(Http::post($this->host . 'api/actionRating', $request->all()));
        return response()->json($data);
    }


    public function viewMoreRating($id = null)
    {
        $output = '';
        $arrId = [];
        $data = json_decode(Http::get($this->host . 'api/viewMoreRating/' . $id));
        $ratings = $data->result;
        $count = $data->count;
        $remaining = $count - count($ratings);
        foreach ($ratings as $key => $row) {
            $arrId[] = $row->id;
            if ($row->status == 2) {
                $stt = '<i class="fas fa-check-circle text-success"></i> <em class="text-success">Đã được duyệt !</em>';
            } elseif ($row->status == 1) {
                $stt = '<i class="		fas fa-clock text-primary"></i> <em class="text-primary">Đang chờ duyệt !</em>';
            } elseif ($row->status == 3) {
                $stt = '<i class="		fas fa-minus-circle text-danger"></i> <em class="text-danger">Đã bị spam !</em>';
            }

            $output .= '      <div data-stars="' . $row->num_star . '" data-id="' . $row->id . '" style="border-radius: 10px;" class="p-2 row mb-2 row-rating-box-of-customer shadow">
<div class="col-lg-1 text-left box-image-custom-rating"><span class="bg-danger name-customer-rating">' . ucwords(mb_substr($row->customer->name, 0, 1)) . '</span></div>
<div class="col-lg-11 content-custom-rating">
<b>' . $row->customer->name . '</b> <span> ' . $stt . '</span><br>
<i class="fas fa-star star-light mr-1 main_star_' . $row->id . '"></i>
<i class="fas fa-star star-light mr-1 main_star_' . $row->id . '"></i>
<i class="fas fa-star star-light mr-1 main_star_' . $row->id . '"></i>
<i class="fas fa-star star-light mr-1 main_star_' . $row->id . '"></i>
<i class="fas fa-star star-light mr-1 main_star_' . $row->id . '"></i>
<div><strong>Đã nhận xét </strong> ' . $row->content_review . '. <strong>trong sản phẩm</strong> ' . $row->product->name . ' <strong>khoảng ' . Carbon::parse($row->created_at)->diffForHumans() . '</strong></div>

</div>
</div>';
        }
        $idmin = (count($arrId) > 0) ? min($arrId) : "";
        if ($count > 10) {
            $output .= ' <div class="row box-btn-view-more-rating">
                         <div class="col-lg-12 mt-2 text-center">
                         <button data-idmin="' . $idmin . '" type="button" class="btn btn-primary btn-viewmore-rating-admin">Xem thêm <strong>' . $remaining . '</strong> bài đánh giá</button>
                         </div>
                       </div>';
        }
        return response()->json($output);
    }

    public function viewMoreRatingWhenReload($id =null)
    {
        $output = '';
        $arrId = [];
        $data = json_decode(Http::get($this->host . 'api/viewMoreRatingWhenReload/' . $id));
        $ratings = $data->result;
        $count = $data->count;
        $remaining = $count - count($ratings);
        $output .= '       <div class="row mb-4">
        <div class="col-lg-3 col-sm-12">
        <select class="form-select select-filter-rating-prod" aria-label="Default select example">
            <option value="all">--Tất cả--</option>
            <option value="waiting">Đang chờ duyệt</option>
            <option value="approved">Đã được duyệt</option>
            <option value="spam">Đã bị spam</option>
        </select>
    </div>
       <div class="col-lg-3 col-sm-12">
           <select disabled class="form-select select-action-rating-prod" aria-label="Default select example">
               <option value="" selected>--Chọn hành động--</option>
               <option value="delete">Xóa các đánh giá</option>
               <option value="approve">Duyệt đánh giá</option>
               <option value="spam">Spam</option>
               <option value="unspam">Bỏ spam</option>
           </select>
       </div>
       <div class="col-lg-2 col-sm-12">
           <button type="button" class="btn btn-success fw-bold btn-apply-action-rating">Áp dụng</button>
       </div>
   </div>';
        foreach ($ratings as $key => $row) {
            $arrId[] = $row->id;
            if ($row->status == 2) {
                $stt = '<i class="fas fa-check-circle text-success"></i> <em class="text-success">Đã được duyệt !</em>';
            } elseif ($row->status == 1) {
                $stt = '<i class="		fas fa-clock text-primary"></i> <em class="text-primary">Đang chờ duyệt !</em>';
            } elseif ($row->status == 3) {
                $stt = '<i class="		fas fa-minus-circle text-danger"></i> <em class="text-danger">Đã bị spam !</em>';
            }

            $output .= '      <div data-stars="' . $row->num_star . '" data-id="' . $row->id . '" style="border-radius: 10px;" class="p-2 row mb-2 row-rating-box-of-customer shadow">
<div class="col-lg-1 text-left box-image-custom-rating"><span class="bg-danger name-customer-rating">' . ucwords(mb_substr($row->customer->name, 0, 1)) . '</span></div>
<div class="col-lg-11 content-custom-rating">
<b>' . $row->customer->name . '</b> <span> ' . $stt . '</span><br>
<i class="fas fa-star star-light mr-1 main_star_' . $row->id . '"></i>
<i class="fas fa-star star-light mr-1 main_star_' . $row->id . '"></i>
<i class="fas fa-star star-light mr-1 main_star_' . $row->id . '"></i>
<i class="fas fa-star star-light mr-1 main_star_' . $row->id . '"></i>
<i class="fas fa-star star-light mr-1 main_star_' . $row->id . '"></i>
<div><strong>Đã nhận xét </strong> ' . $row->content_review . '. <strong>trong sản phẩm</strong> ' . $row->product->name . ' <strong>khoảng ' . Carbon::parse($row->created_at)->diffForHumans() . '</strong></div>

</div>
</div>';
        }
        $idmin = (count($arrId) > 0) ? min($arrId) : "";
        if ($data->countMin > 10) {
            $output .= ' <div class="row box-btn-view-more-rating">
                         <div class="col-lg-12 mt-2 text-center">
                         <button data-idmin="' . $idmin . '" type="button" class="btn btn-primary btn-viewmore-rating-admin">Xem thêm <strong>' . $remaining . '</strong> bài đánh giá</button>
                         </div>
                       </div>';
        }
        return response()->json($output);
    }

    public function filterRatingByStatus($sortby = null)
    {
          $sortby = ($sortby == null) ? 'all' : $sortby;
          $sortby = ($sortby == 'null') ? 'all' : $sortby;
          $data = json_decode(Http::get($this->host.'api/filterRatingByStatus/'.$sortby));
          $output = '';
          $arrId = [];
          $ratings = $data->result;
          $count = $data->count;
          $remaining = $count - count($ratings);
  
          // $arrProd = [];
  
          // foreach ($data->total as $key => $value) {
          //     $arrProd[] = $value->product;
          // }
          // $arrProd = array_unique($arrProd,SORT_REGULAR);
          $output .= '       <div class="row mb-4">
          <div class="col-lg-3 col-sm-12">
          <select class="form-select select-filter-rating-prod" aria-label="Default select example">
              <option value="all">--Tất cả--</option>
              <option value="waiting">Đang chờ duyệt</option>
              <option value="approved">Đã được duyệt</option>
              <option value="spam">Đã bị spam</option>
          </select>
      </div>
         <div class="col-lg-3 col-sm-12">
             <select disabled class="form-select select-action-rating-prod" aria-label="Default select example">
                 <option value="" selected>--Chọn hành động--</option>
                 <option value="delete">Xóa các đánh giá</option>
                 <option value="approve">Duyệt đánh giá</option>
                 <option value="spam">Spam</option>
                 <option value="unspam">Bỏ spam</option>
             </select>
         </div>
         <div class="col-lg-2 col-sm-12">
             <button type="button" class="btn btn-success fw-bold btn-apply-action-rating">Áp dụng</button>
         </div>
     </div>';
          if (count($ratings) > 0) {
              foreach ($ratings as $key => $row) {
                  $arrId[] = $row->id;
                  if ($row->status == 2) {
                      $stt = '<i class="fas fa-check-circle text-success"></i> <em class="text-success">Đã được duyệt !</em>';
                  } elseif ($row->status == 1) {
                      $stt = '<i class="		fas fa-clock text-primary"></i> <em class="text-primary">Đang chờ duyệt !</em>';
                  } elseif ($row->status == 3) {
                      $stt = '<i class="		fas fa-minus-circle text-danger"></i> <em class="text-danger">Đã bị spam !</em>';
                  }
  
                  $output .= '      <div data-stars="' . $row->num_star . '" data-id="' . $row->id . '" style="border-radius: 10px;" class="p-2 row mb-2 row-rating-box-of-customer shadow">
         <div class="col-lg-1 text-left box-image-custom-rating"><span class="bg-danger name-customer-rating">' . ucwords(mb_substr($row->customer->name, 0, 1)) . '</span></div>
         <div class="col-lg-11 content-custom-rating">
             <b>' . $row->customer->name . '</b> <span> ' . $stt . '</span><br>
             <i class="fas fa-star star-light mr-1 main_star_' . $row->id . '"></i>
             <i class="fas fa-star star-light mr-1 main_star_' . $row->id . '"></i>
             <i class="fas fa-star star-light mr-1 main_star_' . $row->id . '"></i>
             <i class="fas fa-star star-light mr-1 main_star_' . $row->id . '"></i>
             <i class="fas fa-star star-light mr-1 main_star_' . $row->id . '"></i>
             <div><strong>Đã nhận xét </strong> ' . $row->content_review . '. <strong>trong sản phẩm</strong> ' . $row->product->name . ' <strong>khoảng ' . Carbon::parse($row->created_at)->diffForHumans() . '</strong></div>

         </div>
     </div>';
              }
              $idmin = (count($arrId) > 0) ? min($arrId) : "";
              if ($count > 10) {
                  $output .= ' <div class="row box-btn-view-more-rating-by-filter">
                                      <div class="col-lg-12 mt-2 text-center">
                                      <button data-idmin="' . $idmin . '" type="button" class="btn btn-primary btn-viewmore-rating-admin-by-filter">Xem thêm <strong>' . $remaining . '</strong> bài đánh giá</button>
                                      </div>
                                    </div>';
              }
          } else {
            $output .= '<b>Không có dòng nào ! </b>';
          }
  
          return response()->json($output);
    }

    public function viewMoreFilterRating($sortby = null ,$id = null)
    {
        $output = '';
        $arrId = [];
        $sortby = ($sortby == null) ? 'all' : $sortby;
        $sortby = ($sortby == 'null') ? 'all' : $sortby;
        $data = json_decode(Http::get($this->host.'api/viewmoreRatingByFilter/'.$sortby.'/'.$id));
        $ratings = $data->result;
        $count = $data->count;
        $remaining = $count - count($ratings);
        foreach ($ratings as $key => $row) {
            $arrId[] = $row->id;
            if ($row->status == 2) {
                $stt = '<i class="fas fa-check-circle text-success"></i> <em class="text-success">Đã được duyệt !</em>';
            } elseif ($row->status == 1) {
                $stt = '<i class="		fas fa-clock text-primary"></i> <em class="text-primary">Đang chờ duyệt !</em>';
            } elseif ($row->status == 3) {
                $stt = '<i class="		fas fa-minus-circle text-danger"></i> <em class="text-danger">Đã bị spam !</em>';
            }

            $output .= '      <div data-stars="' . $row->num_star . '" data-id="' . $row->id . '" style="border-radius: 10px;" class="p-2 row mb-2 row-rating-box-of-customer shadow">
<div class="col-lg-1 text-left box-image-custom-rating"><span class="bg-danger name-customer-rating">' . ucwords(mb_substr($row->customer->name, 0, 1)) . '</span></div>
<div class="col-lg-11 content-custom-rating">
<b>' . $row->customer->name . '</b> <span> ' . $stt . '</span><br>
<i class="fas fa-star star-light mr-1 main_star_' . $row->id . '"></i>
<i class="fas fa-star star-light mr-1 main_star_' . $row->id . '"></i>
<i class="fas fa-star star-light mr-1 main_star_' . $row->id . '"></i>
<i class="fas fa-star star-light mr-1 main_star_' . $row->id . '"></i>
<i class="fas fa-star star-light mr-1 main_star_' . $row->id . '"></i>
<div><strong>Đã nhận xét </strong> ' . $row->content_review . '. <strong>trong sản phẩm</strong> ' . $row->product->name . ' <strong>khoảng ' . Carbon::parse($row->created_at)->diffForHumans() . '</strong></div>

</div>
</div>';
        }
        $idmin = (count($arrId) > 0) ? min($arrId) : "";
        if ($count > 10) {
            $output .= ' <div class="row box-btn-view-more-rating-by-filter">
                         <div class="col-lg-12 mt-2 text-center">
                         <button data-stt="'.$sortby.'" data-idmin="' . $idmin . '" type="button" class="btn btn-primary btn-viewmore-rating-admin-by-filter">Xem thêm <strong>' . $remaining . '</strong> bài đánh giá</button>
                         </div>
                       </div>';
        }
        return response()->json($output);
    }
    public function viewMoreRatingByFilterWhenReload($sortby = null , $id= null)
    {
        $output = '';
        $arrId = [];
        $sortby = ($sortby == null) ? 'all' : $sortby;
        $sortby = ($sortby == 'null') ? 'all' : $sortby;
        $data = json_decode(Http::get($this->host.'api/viewMoreRatingByFilterWhenReload/'.$sortby.'/'.$id));
        $ratings = $data->result;
        $count = $data->count;
        $remaining = $count - count($ratings);
        $output .= '       <div class="row mb-4">
        <div class="col-lg-3 col-sm-12">
        <select class="form-select select-filter-rating-prod" aria-label="Default select example">
            <option value="all">--Tất cả--</option>
            <option value="waiting">Đang chờ duyệt</option>
            <option value="approved">Đã được duyệt</option>
            <option value="spam">Đã bị spam</option>
        </select>
    </div>
       <div class="col-lg-3 col-sm-12">
           <select disabled class="form-select select-action-rating-prod" aria-label="Default select example">
               <option value="" selected>--Chọn hành động--</option>
               <option value="delete">Xóa các đánh giá</option>
               <option value="approve">Duyệt đánh giá</option>
               <option value="spam">Spam</option>
               <option value="unspam">Bỏ spam</option>
           </select>
       </div>
       <div class="col-lg-2 col-sm-12">
           <button type="button" class="btn btn-success fw-bold btn-apply-action-rating">Áp dụng</button>
       </div>
   </div>';
        if(count($ratings) > 0){
            foreach ($ratings as $key => $row) {
                $arrId[] = $row->id;
                if ($row->status == 2) {
                    $stt = '<i class="fas fa-check-circle text-success"></i> <em class="text-success">Đã được duyệt !</em>';
                } elseif ($row->status == 1) {
                    $stt = '<i class="		fas fa-clock text-primary"></i> <em class="text-primary">Đang chờ duyệt !</em>';
                } elseif ($row->status == 3) {
                    $stt = '<i class="		fas fa-minus-circle text-danger"></i> <em class="text-danger">Đã bị spam !</em>';
                }
    
                $output .= '      <div data-stars="' . $row->num_star . '" data-id="' . $row->id . '" style="border-radius: 10px;" class="p-2 row mb-2 row-rating-box-of-customer shadow">
    <div class="col-lg-1 text-left box-image-custom-rating"><span class="bg-danger name-customer-rating">' . ucwords(mb_substr($row->customer->name, 0, 1)) . '</span></div>
    <div class="col-lg-11 content-custom-rating">
    <b>' . $row->customer->name . '</b> <span> ' . $stt . '</span><br>
    <i class="fas fa-star star-light mr-1 main_star_' . $row->id . '"></i>
    <i class="fas fa-star star-light mr-1 main_star_' . $row->id . '"></i>
    <i class="fas fa-star star-light mr-1 main_star_' . $row->id . '"></i>
    <i class="fas fa-star star-light mr-1 main_star_' . $row->id . '"></i>
    <i class="fas fa-star star-light mr-1 main_star_' . $row->id . '"></i>
    <div><strong>Đã nhận xét </strong> ' . $row->content_review . '. <strong>trong sản phẩm</strong> ' . $row->product->name . ' <strong>khoảng ' . Carbon::parse($row->created_at)->diffForHumans() . '</strong></div>

    </div>
    </div>';
            }
            $idmin = (count($arrId) > 0) ? min($arrId) : "";
            if ($data->countMin > 10) {
                $output .= ' <div class="row box-btn-view-more-rating-by-filter">
                             <div class="col-lg-12 mt-2 text-center">
                             <button data-stt="'.$sortby.'" data-idmin="' . $idmin . '" type="button" class="btn btn-primary btn-viewmore-rating-admin-by-filter">Xem thêm <strong>' . $remaining . '</strong> bài đánh giá</button>
                             </div>
                           </div>';
            }
        }else{
            $output .= '<b>Không có dòng nào ! </b>';
        }
        return response()->json($output);
    }
}
