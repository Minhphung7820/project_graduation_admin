@extends('layout.layout')
@section('title','Quản lý thông tin shop')
@section('main')
<?php
use Carbon\Carbon;
Carbon::setLocale('vi');
?>
<link rel="stylesheet" href="admin/assets/css/styles.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
<style>
  img {
    max-width: 100%;
  }

  #introShopView {
    max-height: 300px;
    overflow: auto;
  }

  .label-file-img {
    border-radius: 50%;
    display: block;
    width: 200px;
    cursor: pointer;
    position: relative;
    margin: 0 auto;
  }

  .label-file-img:hover .upload-icon {
    display: block;
  }

  .label-file-img:hover .image-wrapper {
    opacity: 0.4;
    border: 3px solid gray;
  }

  .upload-icon {
    display: none;
    width: 50px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    transition: all 1s;
  }

  .image-wrapper {
    width: 200px;
    height: 200px;
    border-radius: 100%;
    margin-bottom: 40px;
    background: rgb(235, 235, 235);
    overflow: hidden;
  }

  .image-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .file-input {
    display: none;
  }
  .text-center{
    text-align: center !important;
  }
  #result_img_desc img{
    width: 100%;
    height: 200px;
  }
  #result_img_desc button{
    border: none;
    background: none
  }
  #result_img_desc i{
    width: 20px;
    height: 20px;
  }
  .img-desc-control{
    position: relative;
  }
  .iconDel{
    position: absolute;
    top: -13px;
    right: -9px;
  }
  .lable_files{
    width: 100%;
    border: 1px dashed  #000;
    opacity: 0.3;
  }
  .lable_files:hover{
    cursor: pointer;
    opacity: 1;
  }
  .lable_files:hover svg{
    color:black;
  }
 .lable_files svg{
    margin: 0 auto;
    margin-top: 25px;
    margin-bottom: 25px;
 }
 .title2{
  margin-top: 20px;
 }
</style>
<section class="signin-section">
  <div class="container-fluid">
    <!-- ========== title-wrapper start ========== -->
    <div class="title-wrapper pt-30">
      <div class="row align-items-center">
        <div class="col-md-6">
          <div class="title mb-30">
            <h2>Thông tin T&N </h2>
          </div>
        </div>
        <!-- end col -->
     
        <!-- end col -->
      </div>
      <!-- end row -->
    </div>
    <!-- ========== title-wrapper end ========== -->
    @if(!empty($infos))
    @foreach($infos as $info)
    <div class="row g-0 auth-row">
      <div class="col-lg-4">
        <div class="row">
        <div class="auth-cover-wrapper bg-primary-100">
          <div class="auth-cover">
            <div class="title text-center">
              <h2 class="text-primary mb-10">Chỉnh sửa logo</h2>
              <p class="text-medium">
                Nhấp vào ảnh để thay đổi logo!
              </p>
            </div>
            <div class="row d-flex justify-content-center">
              <div class="containerLogo">
                <label for="image" class="label-file-img">
              <img class="upload-icon" src="{{$urlImage}}/image-Icon/172525_plus_icon.png">
                  <div class="image-wrapper">
                    <img id="image-logo" class="image"
                      src="<?php echo ($info['logo'] != null) ? $urlImage.'/'.$info['logo'] : $urlImage.'/image-Icon/no-image-logo.jpg' ?>">
                  </div>
                </label>
                <form action="" id="form-update-logo" class="d-flex justify-content-center"
                  enctype="multipart/form-data">
                  <input type="hidden" name="id" value="{{$info['id']}}">
                  <input type="hidden" name="author" value="<?= session()->get('name') ?>">
                  <input type="hidden" name="token" value="<?= session()->get('token') ?>">
                  <button type="submit" id="btn-update"
                    class="file-upload btn-update d-none main-btn btn-sm success-btn rounded-md btn-hover"><i
                      class="fas fa-share-square"></i> Cập nhật</button>
                  <input id="image" type="file" name="file" onchange="changeFileLogo(this)" class="file-input">
                </form>
              </div>
            </div>
          </div>
        </div>
        </div>
        <div class="row">
        <div class="input-style ">
          <hr>
          <label for="files" class="fw-bold mb-3 ">Thêm ảnh mô tả: </label>
            <label for="files" class="fw-bold mb-3 lable_files">
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-plus-lg d-flex justify-content-center" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
              </svg>
            </label>
            <div class="input-group">
              <form class="form-upload-imgDesc" action="">
                <input type="hidden" name="id" value="{{$info['id']}}">
                <input type="file" class="form-control d-none" id="files" name="files" aria-describedby="inputGroupFileAddon04" aria-label="Upload" multiple>
              </form>
            </div>
        </div>
        </div>
        <p class="title text-center title2 fw-bold">*Album ảnh*</p>
        <div class="row" id="result_img_desc">         
          <?php
          $img = explode(',',$info['img_desc']);
          foreach($img as $img_desc)
          echo ($img_desc==null)?'':'
          <div class="col-lg-6 pt-4 '.$img_desc.'">
            <div class="img-desc-control">
              <div class="iconDel">
                <button class="btn_del_img" data-id="'.$info['id'].'" data-src="'.$img_desc.'">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                </svg>
              </button>
              </div>
               <img src="'.$urlImage."/".$img_desc.'" alt="">
            </div>
          </div>'
          ?>
        </div>
      </div>
      <!-- end col -->
      <div class="col-lg-8">
        <div class="signin-wrapper">
          <div class="form-wrapper">
            <h4 class="mb-15 text-center">Cập nhật thông tin T&N</h4>
            <p class="text-sm mb-25 text-center">
              Nhập thông tin nhấn "Enter" để cập nhật thay đổi!
            </p>
            <form id="form-edit-info" data-id="{{$info['id']}}">
            <input type="hidden" name="author" value="<?= session()->get('name') ?>">
            <input type="hidden" name="token" value="<?= session()->get('token') ?>">
              <input class="inputInfo" type="hidden" name="id" value="{{$info['id']}}">
              <div class="row">
                <div class="col-lg-6 col-sm-12">
                  <div class="input-style-1">
                    <label for="" class="fw-bold">Tên shop*</label>
                    <input id="nameShop" class="inputInfo" type="text" name="shopName" value="{{$info['shopName']}}"
                      placeholder="Tên shop" />
                  </div>
                </div>
                <div class="col-lg-6 col-sm-12">
                  <div class="input-style-2">
                    <label for="" class="fw-bold">Email*</label>
                    <input class="inputInfo" type="text" id="email" name="email" value="{{$info['email']}}"
                      placeholder="Email liên hệ" />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-6 col-sm-12">
                  <div class="input-style-2">
                    <label for="" class="fw-bold">Hotline*</label>
                    <input class="inputInfo" type="text" name="phoneNumber" value="{{$info['phoneNumber']}}"
                      placeholder="Số điện thoại" />
                  </div>
                </div>
                <div class="col-lg-6 col-sm-12">
                  <div class="input-style-2">
                    <label for="" class="fw-bold">Địa chỉ*</label>
                      <input class="inputInfo" type="text" name="address" value="{{$info['address']}}"
                      placeholder="Địa chỉ" />
                  </div>
                </div>
              </div>
              <div class="input-style-3 ">
                <label for="" class="fw-bold mb-3">Giới thiệu*</label>
                <hr>
                <div id="introShopView">
                  {!!$info['introShop']!!}
                </div>
                <div id="ckeditorControl">
                  <textarea name="introShop" placeholder="Giới thiệu shop">
                      {{$info['introShop']}}
                      </textarea>
                </div>
              </div>
              <div class="d-flex justify-content-center">
                <button type="button" id="btnEdit" class="main-btn primary-btn btn-sm rounded-md btn-hover"><i
                    class="fas fa-edit"></i> Nhấp vào thay đổi giới thiệu</button>
                <button type="submit" id="btnUpdate" class="main-btn success-btn btn-sm rounded-md btn-hover"><i
                    class="fas fa-share-square"></i> Cập nhật</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <!-- end col -->
    </div>
    <!-- end row -->
    @endforeach
    @else
    <!-- ========== title-wrapper end ========== -->
    <div class="row g-0 auth-row">
      <div class="col-lg-4">
        <div class="auth-cover-wrapper bg-primary-100">
          <div class="auth-cover">
            <div class="title">
              <h2 class="text-primary mb-10">Chỉnh sửa logo</h2>
              <p class="text-medium">
                Nhấp vào ảnh để thay đổi logo!
              </p>
            </div>
            <div class="row d-flex justify-content-center">
              <div class="containerLogo">
                <label for="image" class="label-file-img">
                  <img class="upload-icon" src="{{$urlImage}}/image-Icon/172525_plus_icon.png">
                  <div class="image-wrapper">
                    <img id="image-logo" class="image" src="{{$urlImage}}/image-Icon/no-image-logo.jpg?>">
                  </div>
                </label>
                <form action="" id="form-update-logo" class="d-flex justify-content-center"
                  enctype="multipart/form-data">
                  <input type="hidden" name="id" value="">
                  <input type="hidden" name="author" value="<?= session()->get('name') ?>">
                  <input type="hidden" name="token" value="<?= session()->get('token') ?>">
                  <button type="submit" id="btn-update"
                    class="file-upload btn-update d-none main-btn success-btn rounded-md btn-hover"><i
                      class="fas fa-share-square"></i> Cập nhật</button>
                  <input id="image" type="file" name="file" onchange="changeFileLogo(this)" class="file-input">
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- end col -->
      <div class="col-lg-8">
        <div class="signin-wrapper">
          <div class="form-wrapper">
            <h4 class="mb-15">Cập nhật thông tin</h4>
            <p class="text-sm mb-25">
              ( Nhập thông tin nhấp "Enter" để cập nhật dữ liệu! )
            </p>
            <form id="form-edit-info" data-id="">
            <input type="hidden" name="author" value="<?= session()->get('name') ?>">
            <input type="hidden" name="token" value="<?= session()->get('token') ?>">
              <input class="inputInfo" type="hidden" name="" value="">
              <div class="row">
                <div class="col-lg-6 col-sm-12">
                  <div class="input-style-1">
                    <label for="" class="fw-bold">Tên shop*</label>
                    <input id="nameShop" class="inputInfo" type="text" name="shopName" value=""
                      placeholder="Tên shop" />
                  </div>
                </div>
                <div class="col-lg-6 col-sm-12">
                  <div class="input-style-2">
                    <label for="" class="fw-bold">Hotline*</label>
                    <input class="inputInfo" type="text" name="phoneNumber" value="" placeholder="Số điện thoại" />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-6 col-sm-12">
                  <div class="input-style-2">
                    <label for="" class="fw-bold">Email*</label>
                    <input class="inputInfo" type="text" id="email" name="email" value="" placeholder="Email liên hệ" />
                  </div>
                </div>
                <div class="col-lg-6 col-sm-12">
                  <div class="input-style-2">
                    <label for="" class="fw-bold">Địa chỉ*</label>
                    <input class="inputInfo" type="text" name="address" value="" placeholder="Địa chỉ" />
                  </div>
                </div>
              </div>
              <div class="input-style-3 ">
                <label for="" class="fw-bold mb-3">Giới thiệu*</label>
                <hr>
                <div id="introShopView">
                </div>
                <div id="ckeditorControl">
                  <textarea name="introShop" placeholder="Giới thiệu shop"></textarea>
                </div>
              </div>
              <div class="d-flex justify-content-center">
                <button type="button" id="btnEdit" class="main-btn btn-sm primary-btn rounded-md btn-hover"><i
                    class="fas fa-edit"></i> Nhấp vào để thêm giới thiệu</button>
                <button type="submit" id="btnUpdate" class="main-btn btn-sm success-btn rounded-md btn-hover"><i
                    class="fas fa-share-square"></i> Cập nhật</button>
              </div>
            </form>

          </div>
        </div>
      </div>
      <!-- end col -->
    </div>
    <!-- end row -->
    @endif
  </div>
</section>
<script src="admin/jquery-3.6.1.min.js"></script>
<script src="admin/info.js"></script>
<script src="ckeditor/ckeditor.js"></script>
<script>
    CKEDITOR.replace('introShop', {
  extraPlugins: 'easyimage',
    cloudServices_tokenUrl: 'https://example.com/cs-token-endpoint',
    cloudServices_uploadUrl: 'https://your-organization-id.cke-cs.com/easyimage/upload/'
  });
</script>
<script>
  function AjaxSetup() {
    return $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });
  }
</script> 
@endsection