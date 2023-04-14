@extends('layout.layout')
@section('title','Quản lý chuyên mục')
@section('main')
<?php

use Carbon\Carbon;

Carbon::setLocale('vi');
?>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.6/cropper.css" target="_blank" rel="nofollow" integrity="sha256-jKV9n9bkk/CTP8zbtEtnKaKf+ehRovOYeKoyfthwbC8=" crossorigin="anonymous" />
<link href="//cdnjs.cloudflare.com/ajax/libs/x-editable/1.5.0/jquery-editable/css/jquery-editable.css" rel="stylesheet"/>
<style>
    .td-title-cate-posts>a {
        text-decoration: none;
    }

    @media only screen and (max-width: 768px) {

        /* For mobile phones: */
        .btn-action-with-cate-posts {
            width: 100%;
            height: 50px;
            margin-bottom: 10px;
        }


    }

    .cropper-crop-box,
    .cropper-view-box {
        border-radius: 50%;
    }

    .cropper-view-box {
        box-shadow: 0 0 0 1px #39f;
        outline: 0;
    }

    .preview-logo-cate-posts {
        overflow: hidden;
        width: 250px;
        height: 250px;
        margin: 0px 10px 10px 10px;
        border-radius: 50%;
        border: 1px solid red;
    }
    .editable-input > input{
        height: 40px;
    }
    .editable-submit{
        background-color: #198754 !important;
        width:50px;
        height: 40px;
        outline: none;
        border: none;
        color: white;
        font-weight: bold;
    }
    .editable-cancel{
        background-color: #dc3545 !important;
        width:70px;
        height: 40px;
        outline: none;
        border: none;
        color: white;
        font-weight: bold;
    }
</style>
<div style="border-radius:15px ;" class="row shadow m-4 bg-white pt-4 pl-2 pr-2 pb-4">
    <div class="col-lg-12 mb-4">
        <button type="button" class="btn btn-primary btn-action-with-cate-posts" data-bs-toggle="modal" data-bs-target="#modal-add-cate-posts">+ Tạo chuyên mục mới</button>

        <!--  -->
        <div class="modal fade" id="modal-add-cate-posts" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <form id="form-add-categories-posts" enctype="multipart/form-data">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">+ Thêm chuyên mục mới</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="mb-3">
                                <input type="hidden" name="token" value="{{ session()->get('token') }}">
                                <label for="" class="form-label">Tên chuyên mục <span style="color: red;font-weight:bold;">(*)</span></label>
                                <input onkeyup="ChangeToSlugCatePosts(this)" name="nameCatePosts" type="text" class="form-control">
                                <div class="invalid-feedback nameCatePosts">
                                    Please provide a valid city.
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="slugCatePostInput" class="form-label">Slug <span style="color: red;font-weight:bold;">(*)</span></label>
                                <input onkeyup="ChangeToSlugCatePosts(this)" name="slugCatePosts" type="text" class="form-control" id="slugCatePostInput">
                                <div class="invalid-feedback slugCatePosts">
                                    Please provide a valid city.
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-12 text-center mb-4">
                                    <img style="border-radius: 50%;" id="preview-image-cate-posts-before-update" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png" class="img-thumbnail" alt="..." width="200px" height="200px">
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="" class="form-label">Logo đại diện nếu có</label>
                                <input class="form-control" type="file" id="input-upload-logo-cate-post">
                                <input type="hidden" name="logo" id="base64-logo-cate-posts">
                            </div>
                            <div class="mb-3">
                                <label for="" class="form-label">Ghi chú</label>
                                <textarea name="noteCatePosts" id="" class="form-control" style="resize: none;" cols="30" rows="10"></textarea>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                            <button type="submit" class="btn btn-primary">Lưu chuyên mục</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <!--  -->
        <!--  -->
        <div class="modal fade" id="modal-crop-image-logo-cate-posts" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Chỉnh sửa ảnh</h5>
                    </div>
                    <div class="modal-body">
                        <div class="img-logo-cate-posts-container">
                            <div class="row">
                                <div class="col-lg-8">
                                    <img id="image_logo_cate-posts" src="https://avatars0.githubusercontent.com/u/3456749" width="100%" height="100%">
                                </div>
                                <div class="col-lg-4">
                                    <div class="preview-logo-cate-posts"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" id="btn-crop-image-logo-cate-posts" class="btn btn-primary"><i class="			fas fa-crop-alt"></i> Cắt ảnh</button>
                    </div>
                </div>
            </div>
        </div>
        <!--  -->
    </div>
    <div class="col-lg-12">
        <div class="table-responsive">
            <table id="table-cate-posts" class="table">
                <thead>
                    <tr>
                        <th>Tên</th>
                        <th>Ảnh/Logo</th>
                        <th>Thời gian</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($allCatePosts as $item)
                    <tr>
                        <td class="td-title-cate-posts"><a data-id="{{ $item->id }}" class="c-{{ $item->id }}" href="" id="a-change-fast-name-cate-posts{{ $item->id }}" data-name="nameCatePosts" data-type="text" data-pk="{{ $item->id }}" data-url="http://127.0.0.1:3000/api/changeNameFastCatePosts" data-value="{!! $item->nameCatePosts !!}" data-title="{!! $item->nameCatePosts !!}">{!! $item->nameCatePosts !!} </a><strong> ({{ count($item->posts) }})</strong></td>
                        <td><img style="border-radius: 50%;" src="<?php echo ($item->logo == null) ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png' : 'http://127.0.0.1:3000/images/cate-posts/' . $item->logo ?>" alt="" width="80px" height="80px"></td>
                        <td class="fw-bold"><?php echo Carbon::parse($item->created_at)->diffForHumans() ?></td>
                        <td>
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal-update-cate-posts{{ $item->id }}"><i class="	fa fa-cogs"></i> </button>

                            <!--  -->
                            <div class="modal fade" id="modal-update-cate-posts{{ $item->id }}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <form id="form-update-categories-posts" enctype="multipart/form-data">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                <div class="mb-3">
                                                    <input type="hidden" name="token" value="{{ session()->get('token') }}">
                                                    <input type="hidden" name="id" value="{{ $item->id }}">
                                                    <label for="" class="form-label">Tên chuyên mục <span style="color: red;font-weight:bold;">(*)</span></label>
                                                    <input data-id="{{ $item->id }}" onkeyup="ChangeToSlugCatePostsEdit(this)" value="{{ $item->nameCatePosts }}" name="nameCatePostsEdit" type="text" class="form-control nameCatePostsEdit{{ $item->id }}">
                                                    <div class="invalid-feedback nameCatePostsEdit{{ $item->id }}">
                                                        Please provide a valid city.
                                                    </div>
                                                </div>
                                                <div class="mb-3">
                                                    <label for="slugCatePostInput" class="form-label">Slug <span style="color: red;font-weight:bold;">(*)</span></label>
                                                    <input data-id="{{ $item->id }}" onkeyup="ChangeToSlugCatePostsEdit(this)" value="{{ $item->slugCatePost }}" name="slugCatePostsEdit" type="text" class="form-control slugCatePostsEdit{{ $item->id }}" id="slugCatePostInputEdit{{ $item->id }}">
                                                    <div class="invalid-feedback slugCatePostsEdit{{ $item->id }}">
                                                        Please provide a valid city.
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-lg-12 text-center mb-4">
                                                        <img style="border-radius: 50%;" id="preview-image-cate-posts-before-update-edit-{{ $item->id }}" src="<?php echo ($item->logo == null) ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png' : 'http://127.0.0.1:3000/images/cate-posts/' . $item->logo ?>" class="img-thumbnail" alt="..." width="200px" height="200px">
                                                    </div>
                                                </div>
                                                <div class="mb-3">
                                                    <label for="" class="form-label">Logo đại diện nếu có</label>
                                                    <input data-id="{{ $item->id }}" class="form-control input-upload-logo-cate-post-edit" type="file" id="input-upload-logo-cate-post-edit-{{ $item->id }}">
                                                    <input type="hidden" name="logo" id="base64-logo-cate-posts-edit-{{ $item->id }}">
                                                </div>
                                                <div class="mb-3">
                                                    <label for="" class="form-label">Ghi chú</label>
                                                    <textarea name="noteCatePostsEdit" id="" class="form-control" style="resize: none;" cols="30" rows="10">{!! $item->der  !!}</textarea>
                                                </div>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-danger" data-bs-dismiss="modal"><i class="	fas fa-times"></i> Đóng</button>
                                                <button data-id="{{ $item->id }}" type="button" class="btn btn-danger btn-delete-cate-posts">Xóa chuyên mục này</button>
                                                <button type="submit" class="btn btn-primary">Lưu thay đổi</button>
                                            </div>
                                        </form>
                                    </div>

                                </div>
                            </div>
                            <!--  -->
                            <!--  -->
                            <div class="modal fade modal-crop-image-logo-cate-posts-edit" data-id="{{ $item->id }}" id="modal-crop-image-logo-cate-posts-edit-{{ $item->id }}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                <div class="modal-dialog modal-xl">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="staticBackdropLabel">Chỉnh sửa ảnh</h5>
                                        </div>
                                        <div class="modal-body">
                                            <div class="img-logo-cate-posts-container">
                                                <div class="row">
                                                    <div class="col-lg-8">
                                                        <img id="image_logo_cate-posts-edit-{{ $item->id }}" src="https://avatars0.githubusercontent.com/u/3456749" width="100%" height="100%">
                                                    </div>
                                                    <div class="col-lg-4">
                                                        <div class="preview-logo-cate-posts-edit-{{ $item->id }}"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" data-id="{{ $item->id }}" id="btn-crop-image-logo-cate-posts-edit-{{ $item->id }}" class="btn btn-primary btn-crop-image-logo-cate-posts-edit"><i class="			fas fa-crop-alt"></i> Cắt ảnh</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!--  -->
                        </td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
</div>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
<script type="text/javascript" src="https://cdn.datatables.net/v/bs5/dt-1.13.1/datatables.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.6/cropper.js" integrity="sha256-CgvH7sz3tHhkiVKh05kSUgG97YtzYNnWt6OXcmYzqHY=" crossorigin="anonymous"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/x-editable/1.5.0/jquery-editable/js/jquery-editable-poshytip.min.js"></script>
<script>
    function AjaxSetup() {
        return $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
    }
    $(document).ready(function() {
        $('#table-cate-posts').DataTable();
    });
</script>
<script src="{{ asset('admin/catePosts.js') }}"></script>
@endsection