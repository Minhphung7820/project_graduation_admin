@extends('layout.layout')
@section('title',$data->titlePosts)
@section('main')
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
<link href="https://unpkg.com/@yaireo/tagify/dist/tagify.css" rel="stylesheet" type="text/css" />
<style>
    input:not(input[type="file"]),
    select {
        height: 41px !important;
    }

    /* #preview-image-before-upload{
        margin-top: 30px;
    } */
    .btn-ac-posts {
        width: 200px;
        height: 50px;
    }

    @media only screen and (max-width: 768px) {

        /* For mobile phones: */
        .btn-ac-posts {
            width: 100%;
            height: 50px;
            margin-bottom: 20px;
        }
    }
    #all-prod-in-edit-posts > tr>td{
        padding: 0;
        margin: 0;
    }
</style>
<div style="border-radius:15px ;" class="row shadow m-4 bg-white pt-4 pl-2 pr-2 pb-4">
    <div class="col-lg-12">
        <div class="row">
            <div class="col-lg-12 mb-4">
                <div class="h3">Chỉnh sửa tin "{!! $data->titlePosts !!}"</div>
            </div>
        </div>
        <form id="form-update-posts" enctype="multipart/form-data">
            <!--  -->
            <div class="row">
                <div class="col-lg-6 col-sm-12 mb-2">
                    <div class="mb-3">
                        <label for="" class="form-label">Tiêu đề <span style="color: red;font-weight:bold;">*</span></label>
                        <input type="hidden" name="author" value="<?= session()->get('name') ?>">
                        <input type="hidden" name="token" value="<?= session()->get('token') ?>">
                        <input type="hidden" name="id" value="{{ $data->id }}">
                        <input onkeyup="ChangeToSlugPosts(this)" value="{!! $data->titlePosts !!}" name="title" type="text" placeholder="Nhập tiêu đề" class="form-control">
                        <div class="invalid-feedback title">
                            Please provide a valid city.
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="" class="form-label">Slug <span style="color: red;font-weight:bold;">*</span></label>
                        <input onkeyup="ChangeToSlugPosts(this)" value="{!! $data->slugPosts !!}" name="slug" placeholder="Nhập tiêu đề không dấu" type="text" class="form-control" id="slugPostInput">
                        <div class="invalid-feedback slug">
                            Please provide a valid city.
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="summary-add-posts" class="form-label">Tóm tắt <span style="color: red;font-weight:bold;">*</span></label>
                        <textarea class="form-control" name="summary" placeholder="Nhập tóm tắt" id="summary-add-posts" style="height: 300px;resize:none;">{!! $data->summaryPosts !!}</textarea>
                        <div class="invalid-feedback summary">
                            Please provide a valid city.
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Chuyên mục <span style="color: red;font-weight:bold;">*</span></label>
                        <select name="cate" id="" class="form-control">
                            @foreach($allCate as $row)
                            <option value="{{ $row->id }}" {{ $show = ($data->cate_posts->id == $row->id) ? 'selected' : '' }}>{{ $row->nameCatePosts }}</option>
                            @endforeach
                        </select>
                        <div class="invalid-feedback cate">
                            Please provide a valid city.
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Trạng thái</label>
                        <select name="status" id="" class="form-control">
                            <option value="1" {{$show = ($data->statusPosts == 1) ? 'selected' : '' }}>Lưu hành</option>
                            <option value="2" {{$show = ($data->statusPosts != 1) ? 'selected' : '' }}>Ngừng lưu hành</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-6 col-sm-12 mb-2">
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Từ khóa</label>
                        <input type="text" name="tags" value="{{ $tags }}" placeholder="Nhập vào từ khóa tìm kiếm" class="form-control" id="tags-edit-posts" aria-describedby="emailHelp">
                    </div>
                    <img src="<?php echo ($data->imagePosts == null) ? 'https://vnpi-hcm.vn/wp-content/uploads/2018/01/no-image-800x600.png' : 'http://127.0.0.1:3000/images/posts/' . $data->imagePosts ?>" id="preview-image-before-upload" class="img-fluid" alt="..." width="100%" height="200px">
                    @if($data->imagePosts != null)
                    <button data-id="{{ $data->id }}" data-token="<?= session()->get('token') ?>" type="button" class="btn btn-danger btn-delete-image mt-2 mb-2">Xóa ảnh bìa hiện tại</button>

                    @endif
                    <div class="mb-3">
                        <label for="input-image-posts" class="form-label">Chọn ảnh bìa khác</label>
                        <input class="form-control" type="file" name="file-image" id="input-image-posts">
                    </div>
                    @if(count($prods) > 0)
                    <button type="button" class="btn btn-success btn-add-prod-in-edit-posts" data-bs-toggle="modal" data-bs-target="#modal-edit-posts-in-edit-posts">Có {{ count($prods) }} sản phẩm được chọn</button>
                    @else
                    <button type="button" class="btn btn-danger btn-add-prod-in-edit-posts" data-bs-toggle="modal" data-bs-target="#modal-edit-posts-in-edit-posts">+ Các sản phẩm liên quan đến bài viết</button>
                    @endif
                    <!--  -->
                    <div class="modal fade" id="modal-edit-posts-in-edit-posts" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div class="modal-dialog modal-xl">
                            <div class="modal-content">
                                <div class="modal-body">
                                    <div class="row">
                                        <div class="col-lg-6 col-sm-12">
                                            <div class="table-responsive">
                                                <table class="table p-0">
                                                    <tbody id="all-prod-in-edit-posts">
                                                        @foreach($pro_col_1 as $item)
                                                        <tr>
                                                            <td><input type="checkbox" id="prod-edit-of-{{ $item->id }}" value="{{ $item->id }}" class="input-check-prod-in-edit-posts" name="prod[]" {{$show = (in_array($item->id,$prods)) ? 'checked' : ''}}></td>
                                                            <td class="fw-bold"><label for="prod-edit-of-{{ $item->id }}">{!! $item->name !!}</label></td>
                                                        </tr>
                                                        @endforeach
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div class="col-lg-6 col-sm-12">
                                            <div class="table-responsive">
                                                <table class="table p-0">
                                                    <tbody id="all-prod-in-edit-posts">
                                                        @foreach($pro_col_2 as $item)
                                                        <tr>
                                                            <td><input type="checkbox" id="prod-edit-of-{{ $item->id }}" value="{{ $item->id }}" class="input-check-prod-in-edit-posts" name="prod[]" {{$show = (in_array($item->id,$prods)) ? 'checked' : ''}}></td>
                                                            <td class="fw-bold"><label for="prod-edit-of-{{ $item->id }}">{!! $item->name !!}</label></td>
                                                        </tr>
                                                        @endforeach
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-success fw-bold" data-bs-dismiss="modal">OK</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--  -->
                </div>
                <div class="col-lg-12">
                    <div class="mb-3">
                        <label for="summary-add-posts" class="form-label">Nội dung <span style="color: red;font-weight:bold;">*</span></label>
                        <textarea class="form-control" placeholder="" name="content" id="content-add-posts" style="height: 100px">{!! $data->contentPosts  !!}</textarea>
                        <div class="invalid-feedback content">
                            Please provide a valid city.
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-6 m-auto text-center">
                    <button type="submit" class="btn btn-success btn-ac-posts">[<i class="	fas fa-save"></i>] Cập nhật bài viết</button> <button onclick="window.location.href='/posts'" type="button" class="btn btn-danger btn-ac-posts"><i class="	fas fa-times"></i> Hủy bỏ</button>
                </div>
            </div>
            <!--  -->
        </form>
    </div>
</div>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
<script src="https://unpkg.com/@yaireo/tagify"></script>
<script src="https://unpkg.com/@yaireo/tagify@3.1.0/dist/tagify.polyfills.min.js"></script>
<script src="{{ asset('ckeditor/ckeditor.js') }}"></script>
<script>
    function AjaxSetup() {
        return $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
    }
    var input = document.querySelector('input[id=tags-edit-posts]');
    new Tagify(input)
</script>
<script>
    CKEDITOR.replace('content-add-posts', {
        height: 500,
    });
</script>
<script src="{{ asset('admin/posts.js') }}"></script>
@endsection