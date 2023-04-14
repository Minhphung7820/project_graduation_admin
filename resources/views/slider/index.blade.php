@extends('layout.layout')
@section('title','Quản lý Slider')
@section('main')
<?php

use Carbon\Carbon;

Carbon::setLocale('vi');
?>
<meta name="csrf-token" content="{{ csrf_token() }}">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
<link href="https://cdnjs.cloudflare.com/ajax/libs/x-editable/1.5.0/jquery-editable/css/jquery-editable.css"
    rel="stylesheet" />
<script type="text/javascript"
    src="https://cdn.datatables.net/v/bs5/dt-1.13.1/af-2.5.1/b-2.3.2/cr-1.6.1/date-1.2.0/kt-2.8.0/r-2.4.0/rg-1.3.0/rr-1.3.1/sb-1.4.0/sp-2.1.0/sl-1.5.0/sr-1.2.0/datatables.min.js"></script>
<script>$.fn.poshytip = { defaults: null }</script>
<script
    src="https://cdnjs.cloudflare.com/ajax/libs/x-editable/1.5.0/jquery-editable/js/jquery-editable-poshytip.min.js"></script>


<style>
    #resultAllSlider>tr>.td-imgControl div {
        width: 220px;
        height: 100px;
    }
    .table tbody tr:first-child>* {
        padding-top: 10px !important;
    }
    #resultAllSlider>tr>.td-imgControl div label>img {
        width: 220px;
        height: 100px;
        border: 1px dotted #000;
    }
    #resultAllSlider>tr>.td-imgControl div label:hover {
        cursor: pointer;
        transform: scale(1.02);
    }
    #resultAllSlider>tr>.td-imgControl {
        position: relative;
    }
    .labelControl {
        visibility: hidden;
    }
    .btnSuccess {
        border: none;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: #04AA6D;
        position: absolute;
        top: 20%;
        right: 17%;
    }
    .btnCancel {
        border: none;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: red;
        position: absolute;
        top: 50%;
        right: 17%;
    }
    .btnSuccess i {
        color: #fff;
    }
    .btnCancel i {
        color: #fff;
    }
    .td-imgControl>label {
        position: absolute;
        bottom: 82%;
        left: 65%;
        opacity: 0.9;
        padding: 3px 20px;
        cursor: pointer;
        color: #4a6cf7;
    }
    .image-slider img {
        margin: 0 auto;
        width: 300px;
        height: 170px;
        border-radius: 5px;
    }
    .button-cover {
        height: 100px;
        margin: 20px;
        background-color: #fff;
        box-shadow: 0 10px 20px -8px #c5d6d6;
        border-radius: 4px;
    }
    .text-center {
        text-align: center !important;
    }
    #tdControl {
        width: 400px;
    }
    #tdOverride {
        width: 350px !important;
    }
    .text-overflow {
        white-space: nowrap;
        max-width: 400px;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .editable-container {
        background-color: orange;
    }
    .editable-submit {
        border: none;
        padding: 10px 14px;
        color: #fff;
        font-weight: bold;
        background-color: #04AA6D;
    }
    .editable-cancel {
        border: none;
        padding: 10px 9px;
        color: #fff;
        font-weight: 0.7;
        background-color: red;
    }
    .editable-clear-x {
        font-size: 20px;
        width: 30px;
        height: 30px;
        margin-top: -11px;
        margin-left: 20px;
    }
    .editable-cancel:hover {
        opacity: 0.7;
        color: #4a6cf7;
    }
    .editable-submit:hover {
        opacity: 0.7;
        color: #4a6cf7;
    }
    .editable-input>input {
        padding: 11px 11px;
        margin-top: 6px;box-trash-slider-modal
        padding-right: 35px !important;
    }
    .editable-buttons {
        margin-top: 10px;
    }
    .editable-container.editable-inline {
        margin-top: 20px;
    }
    .zoom {
        animation: mymove 3s;
    }
    @keyframes mymove {
        0% {
            transform: scale(1.0);
            -webkit-transform: scale(1.0);
        }

        25% {
            transform: scale(1.05);
            -webkit-transform: scale(1.05);
        }
    }

    #thControl {
        width: 300px !important;
    }

    .imgControl_Ovr {
        width: 200px !important;
    }

    .imgPreviewTrash {
        width: 200px;
        height: 100px;
    }
    .select_Override{
        height: 40px;
    }
</style>
<div class="row">
    <div class="col-lg-12 mb-4">
    <div class="d-flex justify-content-between pl-5 ml-5">
        <button type="button" class="btn btn-md mt-3 btn-primary" data-bs-toggle="modal"
            data-bs-target="#box-add-slider-modal"><i class="fas fa-plus-circle"></i> Thêm slider
        </button>
        <button type="button" class="btn btn-md mt-3 btn-secondary pr-5 mr-5" data-bs-toggle="modal"
                data-bs-target="#box-trash-slider-modal"><i class="fas fa-trash"></i> Thùng rác (<span>
                    <?php echo count($allTrash) ?>)
                </span>
        </button>
        </div>
    </div>
    <!--  -->
    <!--  -->
<div class="modal fade" id="box-add-slider-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable modal-md">
        <div class="modal-content mb-3">
            <form class="form-add-slider" enctype="multipart/form-data">
                @csrf
                <input type="hidden" name="author" value="<?= session()->get('name') ?>">
                <input type="hidden" name="token" value="<?= session()->get('token') ?>">
                <div class="modal-header">
                    <h5 class="modal-title text-center" id="staticBackdropLabel">Thêm slider mới</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true"></span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-floating mb-3">
                        <textarea class="form-control" name="name" placeholder="Nhập tiêu đề slider"
                            id="titleSlider"></textarea>
                        <label for="floatingTextarea fw-bold">Tiêu đề</label>
                    </div>
                    <div class="form-group image-slider mb-3">
                        <img class="d-flex justify-content-center"
                            src="{{$urlImage}}/noimage/no-image-available.png"
                            id="fileSliderAdd" alt="No image available">
                    </div>
                    <div class="form-group">
                        <label class="fw-bold" for="">Ảnh</label>
                        <div class="input-group mb-3">
                            <input type="file" class="form-control" name="fileSlider" id="submit-file-slider"
                                onchange="chooseFileAdd(this)" aria-describedby="inputGroupFileAddon01">
                        </div>
                    </div>
                    <div class="form-group m-3">
                        <label class="fw-bold" for="">Trạng thái: &nbsp;</label>
                        <div class="form-check form-check-inline">
                            <input type="radio" class="form-check-input status_D" name="status" value='1'>
                            <label class="form-check-label" for="exampleInputPassword1">Hiện</label>
                            <div class="form-check form-check-inline">
                                <input type="radio" class="form-check-input status_T" name="status" value='0'>
                                <label class="form-check-label" for="exampleInputPassword1">Ẩn</label>
                            </div>
                        </div>
                    </div>
                    <div class="form-group mb-3">
                        <label for="exampleInputEmail1" class="form-label fw-bold">Đường dẫn đến
                            sự kiện</label>
                        <input type="text" class="form-control" name="href" id="hrefSliderAdd"
                            placeholder="Nhập đường dẫn tới sự kiện" aria-describedby="emailHelp">
                    </div>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-sm btn-danger" data-bs-dismiss="modal"><i
                            class="fas fa-times"></i> &nbsp; Đóng</button>
                    <button type="submit" id="btnAddSlider" class="btn btn-sm btn-success"><i
                            class="far fa-save"></i>&nbsp;Thêm
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
       


    <div class="modal fade" id="box-trash-slider-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-xl">
            <div class="modal-content mb-3">
                @csrf
                <div class="modal-header">
                    <h5 class="modal-title text-center" id="staticBackdropLabel">Thùng rác</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true"></span>
                    </button>
                </div>
                @if(!empty($allTrash))
                <form class="form-action-trash" action="">
                    <input type="hidden" name="author" value="<?= session()->get('name') ?>">
                    <input type="hidden" name="token" value="<?= session()->get('token') ?>">
                    <div class="col-lg-6 d-flex pt-3 pl-5">
                        <div>
                            <select class="form-select form-select-sm text-center select_Override" aria-label=".form-select-sm example"
                                name="action">
                                <option selected>---Hành động---</option>
                                <option value="restore">Khôi phục</option>
                                <option value="detroy">Xóa vĩnh viễn</option>
                            </select>
                        </div>
                        <div>
                            <button type="submit" class="btn btn-primary btn-submit-action px-3" disabled="disabled">Áp
                                dụng</button>
                        </div>
                    </div>
                    <table class="table mb-5">
                        <thead>
                            <tr>
                                <th><input type="checkbox" id="checkbox-all-trash"></th>
                                <th>Tiêu đề</th>
                                <th>Ảnh</th>
                                <th>Thời gian</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody id="resultAllSlider">
                            @foreach($allTrash as $trash)
                            <tr>
                                <td><input type="checkbox" class="checkIDsTrash" name="checkIDsTrash[]"
                                        value="{{$trash['id']}}"></td>
                            </form>
                <td id="tdControl" class="col-md-12" validate="{{$trash['name']}}" data-name="name"
                    data-type="text" data-pk="{{ $trash['id']}}">
                    {{$trash['name']}}
                </td>
                <td class="td-imgControl">
                    <div>
                        <label for="inputUpdate{{$trash['id']}}">
                            <img for="inputUpdate{{$trash['id']}}" class="imgPreview{{$trash['id']}}"
                                src="<?php echo ($trash['image'] != null) ? $urlImage.'/'.$trash['image'] : $urlImage.'/noimage/no-image-available.png' ?>"
                            alt="Ảnh">
                        </label>
                    </div>

                <td>
                    <?php
                        $now = Carbon::now();
                        $updatedAt = $trash['updated_at'];
                        $updatedAt = Carbon::parse($updatedAt);
                        echo $updatedAt->diffForHumans(Carbon::now());  
                    ?>
                </td>
                <td>
                    <div class="btnControl">
                        <button type="button" class="btn btn-sm btn-danger btnDetroy" data-id="{{$trash['id']}}">
                            <i class="fas fa-ban"></i> Xóa</button>
                        <button type="button" class="btn btn-sm btn-primary btnRestore" data-id="{{$trash['id']}}">
                            <i class="fas fa-sync-alt"></i>
                            Khôi phục</button>
                    </div>
                </td>
            </div>
            </tr>
            <!-- end form check action multiple delete -->
            @endforeach
            </tbody>
            </table>
       @else
       <h3 class="text-center p-5">Thùng rác trống</h3>
       @endif
        </div>
    </div>
</div>
</div>

<div class="row">
    <div class="table-responsive">
        <form action="" class="form-delete-multiple">
        <input type="hidden" name="author" value="<?= session()->get('name') ?>">
        <input type="hidden" name="token" value="<?= session()->get('token') ?>">
            <input type="hidden" name="action" value="delete">
            <div class="col-lg-6">
                <button type="submit" id="btnToTrash"
                    class="main-btn btn-sm danger-btn square-btn btn-hover d-none mb-3"><i
                    class="fas fa-trash-restore-alt"></i> Chuyển vào thùng rác
                </button>
            </div>
            <table class="table data-bs-table" id="sliderTable">
                <thead>
                    <tr>
                        <th><input type="checkbox" id="checkbox-all"></th>
                        <th>Tiêu đề</th>
                        <th>Ảnh</th>
                        <th>Liên kết</th>
                        <th>Trạng thái</th>
                        <th>Thời gian</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody id="resultAllSlider">
                    <input id="hiddenToken" type="hidden" name="token" value="{{ session()->get('token') }}">
                    @foreach($allSlider as $slider)
                    <tr>
                        <input type="hidden" name="action" value="delete">
                    <td>
                        <input type="checkbox" class="checkIDs" name="checkIDs[]" value="{{$slider['id']}}">
                    </td>
                    </form>
                    <td id="tdControl" class="col-md-12 update upName-{{$slider['id']}}" data-pk="{{$slider['id']}}" validate="{{$slider['name']}}" data-name="name" data-type="text">
                        {{$slider['name']}}
                    </td>
                    <td class="td-imgControl">
                        <div>
                            <label for="inputUpdate{{$slider['id']}}">
                                <img for="inputUpdate{{$slider['id']}}" class="imgPreview{{$slider['id']}}"
                                    src="<?php echo ($slider['image'] != null) ? $urlImage.'/'.$slider['image'] : $urlImage.'/noimage/no-image-available.png' ?>"
                                alt="Ảnh">
                            </label>
                        </div>
                        <form class="form-update-image" data-id="{{$slider['id']}}" enctype="multipart/form-data">
                            <input type="hidden" name="id" value="{{$slider['id']}}">
                            <input type="hidden" name="token" value="{{ session()->get('token') }}">
                            <input type="file" name="file" class="inputUpdate{{$slider['id']}} d-none" id="inputUpdate{{$slider['id']}}"
                                onchange="chooseImageupdate(this,{{$slider['id']}})">
                            <button type="submit" class="btnSuccess d-none" id="success{{$slider['id']}}"><i
                                class="fas fa-check"></i>
                            </button>
                        </form>
                        <button type="button" class="btnCancel d-none" id="cancel{{$slider['id']}}"><i
                                class="fas fa-times"></i>
                        </button>

                    </td>
                    <td class="update" validate="{{$slider['href']}}" data-name="href" data-type="text" data-pk="{{$slider['id']}}">
                        {{$slider['href']}}
                    </td>
                    <td>
                        <div class="form-check form-switch">
                            <form class="form-update-status">
                                <input class="form-check-input switches" type="checkbox" id="flexSwitchCheckChecked"
                                data-fpid="{{$slider['id']}}" <?php echo ($slider['status']==1)?'checked':'' ?>>
                            </form>
                        </div>
                    </td>
                    <td>
                        <?php
                        $now = Carbon::now();
                        $updatedAt = $slider['updated_at'];
                        $updatedAt = Carbon::parse($updatedAt);
                        echo $updatedAt->diffForHumans(Carbon::now());
                        
                    ?>
                    </td>
                    <td>
                        <button type="button" class="btn btn-sm btn-danger deleteSlider" data-id="{{$slider['id']}}"><i
                                class="fas fa-trash"></i> Xóa</button>
                        <button type="button" class="btn btn-sm btn-primary" id="modalUpdate" data-id="{{$slider['id']}}"
                            data-bs-toggle="modal" data-bs-target="#box-edit-slider-modal{{$slider['id']}}"><i
                                class="fas fa-edit"></i>
                            Sửa</button>
                    </td>
    </div>
    </tr>
    <!-- end form check action multiple delete -->
    <div class="modal fade" id="box-edit-slider-modal{{$slider['id']}}" data-bs-backdrop="static"
        data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form class="form-edit-slider" data-id="{{$slider['id']}}" enctype="multipart/form-data">
                        <input type="hidden" name="author" value="<?= session()->get('name') ?>">
                        <input type="hidden" name="token" value="<?= session()->get('token') ?>">    
                        <div class="modal-header mb-3">
                        <h5 class="modal-title text-center" id="staticBackdropLabel">Cập nhật <p class="text-overflow">
                                "{{$slider['name']}}"</p>
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true"></span>
                        </button>
                    </div>

                    <div class="modal-body mb-3">
                        <div class="form-floating mb-3">
                            <input type="hidden" name="id" value="{{$slider['id']}}">
                            <textarea data-id="{{$slider['id']}}" id="titleEditSlider{{$slider['id']}}"
                                class="form-control" name="name" placeholder="Nhập tiêu đề slider"
                                id="titleSlider">{{$slider['name']}}</textarea>
                            <label for="floatingTextarea fw-bold">Tiêu đề</label>
                        </div>
                        <div class="form-group image-slider">
                            <img class="d-flex justify-content-center" style="margin-bottom: 20px;"
                                id="fileSliderEdit{{$slider['id']}}"
                                src="<?php echo ($slider['image'] != null) ? $urlImage.'/'.$slider['image'] : $urlImage.'/noimage/no-image-available.png' ?>"
                                alt="image">
                        </div>
                        <div class="form-group mt-3">
                            <label class="fw-bold mb-1" for="">Ảnh</label>
                            <div class="input-group mb-3">
                                <input class="form-control fileImageEdit" type="file" id="imageEdit{{$slider['id']}}"
                                    name="fileupdate" data-id="{{$slider['id']}}">
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label fw-bold">Đường dẫn đến
                                sự kiện</label>
                            <input type="text" class="form-control hrefEdit{{$slider['id']}}" name="href" id="exampleInputEmail1"
                                value="{{$slider['href']}}" placeholder="Nhập đường dẫn tới sự kiện"
                                aria-describedby="emailHelp">
                        </div>
                    </div>

                    <div class="modal-footer mb-3">
                        <button type="button" class="btn btn-sm btn-secondary" data-bs-dismiss="modal"><i
                                class="fas fa-times"></i>&nbsp; Đóng</button>
                        <button type="submit" class="btn btn-sm btn-success" data-idnum="{{$slider['id']}}"><i
                                class="fas fa-save"></i>&nbsp;Cập nhật
                            slider</button>
                    </div>
               
            </div>
        </div>
    </div>
    @endforeach
    </tbody>
    </table>
</div>
</div>
</div>
<script src="admin/slider.js"></script>
<script>
    function AjaxSetup() {
        return $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
    }

    $(document).ready(function () {
        $('#sliderTable').dataTable({
        });
        $('#sliderTable2').dataTable({
        });
    });
</script>


@endsection