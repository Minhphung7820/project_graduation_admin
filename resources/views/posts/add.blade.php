@extends('layout.layout')
@section('title','Thêm bài viết mới')
@section('main')
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
<link href="https://unpkg.com/@yaireo/tagify/dist/tagify.css" rel="stylesheet" type="text/css" />
<style>
    input:not(input[type="file"]),
    select {
        height: 41px !important;
    }

    input[type="checkbox"] {
        height: 5px !important;
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

    #all-prod-in-posts>tr>td {
        padding: 0;
        margin: 0;
    }
</style>
<div style="border-radius:15px ;" class="row shadow m-4 bg-white pt-4 pl-2 pr-2 pb-4">
    <div class="col-lg-12">
        <div class="row">
            <div class="col-lg-12 mb-4">
                <div class="h3">+ Tạo mới bài viết</div>
            </div>
        </div>
        <form id="form-add-posts" enctype="multipart/form-data">
            <!--  -->
            <div class="row">
                <div class="col-lg-6 col-sm-12 mb-2">
                    <div class="mb-3">
                        <label for="" class="form-label">Tiêu đề <span style="color: red;font-weight:bold;">*</span></label>
                        <input type="hidden" name="author" value="<?= session()->get('name') ?>">
                        <input type="hidden" name="token" value="<?= session()->get('token') ?>">
                        <input onkeyup="ChangeToSlugPosts(this)" name="title" type="text" placeholder="Nhập tiêu đề" class="form-control">
                        <div class="invalid-feedback title">
                            Please provide a valid city.
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="" class="form-label">Slug <span style="color: red;font-weight:bold;">*</span></label>
                        <input onkeyup="ChangeToSlugPosts(this)" name="slug" placeholder="Nhập tiêu đề không dấu" type="text" class="form-control" id="slugPostInput">
                        <div class="invalid-feedback slug">
                            Please provide a valid city.
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="summary-add-posts" class="form-label">Tóm tắt <span style="color: red;font-weight:bold;">*</span></label>
                        <textarea class="form-control" name="summary" placeholder="Nhập tóm tắt" id="summary-add-posts" style="height: 300px;resize:none;"></textarea>
                        <div class="invalid-feedback summary">
                            Please provide a valid city.
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Chuyên mục <span style="color: red;font-weight:bold;">*</span></label>
                        <select name="cate" id="" class="form-control">
                            <option value="" selected>--Chọn chuyên mục--</option>
                            @foreach($allCate as $row)
                            <option value="{{ $row->id }}">{{ $row->nameCatePosts }}</option>
                            @endforeach
                        </select>
                        <div class="invalid-feedback cate">
                            Please provide a valid city.
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Trạng thái</label>
                        <select name="status" id="" class="form-control">
                            <option value="1">Lưu hành</option>
                            <option value="2">Ngừng lưu hành</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-6 col-sm-12 mb-2">
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Từ khóa</label>
                        <input type="text" name="tags" placeholder="Nhập vào từ khóa tìm kiếm" class="form-control" id="tags-add-posts" aria-describedby="emailHelp">
                    </div>
                    <img src="https://vnpi-hcm.vn/wp-content/uploads/2018/01/no-image-800x600.png" id="preview-image-before-upload" class="img-fluid" alt="..." width="100%" height="200px">
                    <div class="mb-3">
                        <label for="input-image-posts" class="form-label">Chọn ảnh bìa bài viết</label>
                        <input class="form-control" type="file" name="file-image" id="input-image-posts">
                    </div>
                    <button type="button" class="btn btn-danger btn-add-prod-in-add-posts" data-bs-toggle="modal" data-bs-target="#modal-add-prod-in-posts">+ Các sản phẩm liên quan đến bài viết</button>
                    <!--  -->
                    <div class="modal fade" id="modal-add-prod-in-posts" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div class="modal-dialog modal-xl">
                            <div class="modal-content">
                                <div class="modal-body">
                                    <div class="row">
                                        <div class="col-lg-6 col-sm-12">
                                            <div class="table-responsive">
                                                <table class="table p-0">
                                                    <tbody id="all-prod-in-posts">
                                                        @foreach($pro_col_1 as $item)
                                                        <tr>
                                                            <td><input type="checkbox" id="prod-of-{{ $item->id }}" value="{{ $item->id }}" class="input-check-prod-in-posts" name="prod[]"></td>
                                                            <td class="fw-bold"><label for="prod-of-{{ $item->id }}">{!! $item->name !!}</label></td>
                                                        </tr>
                                                        @endforeach
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div class="col-lg-6 col-sm-12">
                                            <div class="table-responsive">
                                                <table class="table p-0">
                                                    <tbody id="all-prod-in-posts">
                                                        @foreach($pro_col_2 as $item)
                                                        <tr>
                                                            <td><input type="checkbox" id="prod-of-{{ $item->id }}" value="{{ $item->id }}" class="input-check-prod-in-posts" name="prod[]"></td>
                                                            <td class="fw-bold"><label for="prod-of-{{ $item->id }}">{!! $item->name !!}</label></td>
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
                        <textarea class="form-control" placeholder="" name="content" id="content-add-posts" style="height: 100px"></textarea>
                        <div class="invalid-feedback content">
                            Please provide a valid city.
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-6 m-auto text-center">
                    <button type="submit" class="btn btn-success btn-ac-posts">[<i class="	fas fa-save"></i>] Lưu bài viết</button> <button onclick="window.location.href='/posts'" type="button" class="btn btn-danger btn-ac-posts"><i class="	fas fa-times"></i> Hủy bỏ</button>
                </div>
            </div>
            <!--  -->
        </form>
    </div>
</div>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
<script src="https://unpkg.com/@yaireo/tagify"></script>
<script src="https://unpkg.com/@yaireo/tagify@3.1.0/dist/tagify.polyfills.min.js"></script>
<script src="ckeditor/ckeditor.js"></script>
<script>
    function AjaxSetup() {
        return $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
    }
    var input = document.querySelector('input[id=tags-add-posts]');
    new Tagify(input)
</script>
<script>
    CKEDITOR.replace('content-add-posts', {
        height: 500,
    });
</script>
<script src="{{ asset('admin/posts.js') }}"></script>
@endsection