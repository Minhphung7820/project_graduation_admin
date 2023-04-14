@extends('layout.layout')
@section('title','Quản lý thể loại')
@section('main')
<?php

use Carbon\Carbon;

Carbon::setLocale('vi');
?>
<meta name="csrf-token" content="{{ csrf_token() }}">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
<link href="https://cdnjs.cloudflare.com/ajax/libs/x-editable/1.5.0/jquery-editable/css/jquery-editable.css"
    rel="stylesheet" />

<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs5/dt-1.13.1/fc-4.2.1/r-2.4.0/sb-1.4.0/sl-1.5.0/datatables.min.css"/>
 
<script type="text/javascript" src="https://cdn.datatables.net/v/bs5/dt-1.13.1/fc-4.2.1/r-2.4.0/sb-1.4.0/sl-1.5.0/datatables.min.js"></script>
<script>$.fn.poshytip = { defaults: null }</script>
<script
    src="https://cdnjs.cloudflare.com/ajax/libs/x-editable/1.5.0/jquery-editable/js/jquery-editable-poshytip.min.js"></script>


<style>
    div.dataTables_wrapper{
        width:98%;
        margin:0px auto;
    }
    #resultAllCate>tr>.td-imgControl div {
        width: 100px;
        height: 100px;
    }

    .table tbody tr:first-child>* {
        padding-top: 10px !important;
    }

    #resultAllCate>tr>.td-imgControl div label>img {
        width: 100px;
        height: 100px;
        border: 1px dotted #000;
    }

    #resultAllCate>tr>.td-imgControl div label:hover {
        cursor: pointer;
        transform: scale(1.02);
    }

    #resultAllCate>tr>.td-imgControl {
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
        right: 28%;
    }

    .btnCancel {
        border: none;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: red;
        position: absolute;
        top: 50%;
        right: 28%;
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

    .image-cate img {
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
        width: 300px;
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
        margin-top: 6px;
        box-trash-cate-modal padding-right: 35px !important;
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

    .select_Override {
        height: 40px;
    }
</style>
<div class="row">
    <div class="col-lg-12 mb-4">
        <div class="d-flex justify-content-between pl-5 ml-5">
            <button type="button" class="btn btn-md mt-3 btn-primary" data-bs-toggle="modal"
                data-bs-target="#box-add-cate-modal"><i class="fas fa-plus-circle"></i> Thêm thể loại
            </button>
        </div>
    </div>
    <!--  -->
    <!--  -->
    <div class="modal fade" id="box-add-cate-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-md">
            <div class="modal-content mb-3">
                <form class="form-add-cate" enctype="multipart/form-data">
                    @csrf
                    <input type="hidden" name="author" value="<?= session()->get('name') ?>">
                    <input type="hidden" name="token" value="<?= session()->get('token') ?>">
                    <div class="modal-header">
                        <h5 class="modal-title text-center" id="staticBackdropLabel">Thêm thể loại mới</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true"></span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-floating mb-3">
                            <textarea class="form-control" name="name" placeholder="Nhập tên thể loại..."
                                id="nameCate"></textarea>
                                <label for="floatingTextarea fw-bold">Tên thể loại</label>
                        </div>
                        <div class="form-group image-cate mb-3">
                            <img class="d-flex justify-content-center"
                                src="{{$urlCate}}/noimage/no-image-available.png"
                                id="fileCateAdd" alt="No image available">
                        </div>
                        <div class="form-group">
                            <label class="fw-bold" for="">Ảnh đại diện</label>
                            <div class="input-group mb-3">
                                <input type="file" class="form-control" name="fileCate" id="submit-file-cate"
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
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-sm btn-danger" data-bs-dismiss="modal"><i
                                class="fas fa-times"></i> &nbsp; Đóng</button>
                        <button type="submit" id="btnAddCate" class="btn btn-sm btn-success"><i
                                class="far fa-save"></i>&nbsp;Thêm
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<div class="row">
    <div class="table-responsive">
        <form action="" class="form-delete-multiple">
            <input type="hidden" name="author" value="<?= session()->get('name') ?>">
            <input type="hidden" name="token" value="<?= session()->get('token') ?>">
            <table class="table data-bs-table display" style="width:100%" id="cateTable">
                <thead>
                    <tr>
                        <th>Tên</th>
                        <th>Ảnh đại diện</th>
                        <th>Số lượng SP</th>
                        <th>Trạng thái</th>
                        <th>Nổi bật</th>
                        <th>Thời gian</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody id="resultAllCate">
                <input id="hiddenToken" type="hidden" name="token" value="{{ session()->get('token') }}">
                    @if($allCate)
                    @foreach($allCate as $cate)
                    <tr>
                        <input type="hidden" name="action" value="delete">
        </form>
        <td id="tdControl" class="col-md-12 update upName-{{$cate['id']}}" data-pk="{{$cate['id']}}" validate="{{$cate['name']}}"
            data-name="name" data-type="text">
            {{$cate['name']}}
        </td>
        <td class="td-imgControl">
            <div>
                <label for="inputUpdate{{$cate['id']}}">
                    <img for="inputUpdate{{$cate['id']}}" class="imgPreview{{$cate['id']}}"
                        src="<?php echo ($cate['image']!= null) ? $urlCate.'/'.$cate['image'] : '{{$urlCate}}/category/noimage/no-image-available.png' ?>"
                        alt="Ảnh">
                </label>
            </div>
            <form class="form-update-image" data-id="{{$cate['id']}}" enctype="multipart/form-data">
                <input type="hidden" name="id" value="{{$cate['id']}}">
                <input type="hidden" name="token" value="{{ session()->get('token') }}">
                <input type="file" name="file" class="inputUpdate{{$cate['id']}} d-none" id="inputUpdate{{$cate['id']}}"
                    onchange="chooseImageupdate(this,{{$cate['id']}})">
                <button type="submit" class="btnSuccess d-none" id="success{{$cate['id']}}"><i class="fas fa-check"></i>
                </button>
            </form>
            <br>
            <button type="button" class="btnCancel d-none" id="cancel{{$cate['id']}}"><i class="fas fa-times"></i>
            </button>

        </td>
        <td>
            {{count($cate['product'])}}
        </td>
        <td>
            <div class="form-check form-switch">
                <form class="form-update-status">
                    <input class="form-check-input switches" type="checkbox" id="flexSwitchCheckChecked"
                        data-fpid="{{$cate['id']}}" <?php echo ($cate['status']==1)?'checked':'' ?>>
                </form>
            </div>
        </td>
        <td>
            <input class="form-check-input inputActive" data-id="{{$cate['id']}}" type="radio" <?php echo($cate['active']==1?'checked':'') ?> name="flexRadioDefault" id="flexRadioDefault1">
        </td>
        <td>
            <?php
                $now = Carbon::now();
                $updatedAt = $cate['updated_at'];
                $updatedAt = Carbon::parse($updatedAt);
                echo $updatedAt->diffForHumans(Carbon::now());
                
            ?>
        </td>
        <td>
            <button type="button" class="btn btn-sm btn-danger deleteCate" data-id="{{$cate['id']}}"><i
                    class="fas fa-trash"></i> Xóa</button>
            <button type="button" class="btn btn-sm btn-primary" id="modalUpdate" data-id="{{$cate['id']}}"
                data-bs-toggle="modal" data-bs-target="#box-edit-cate-modal{{$cate['id']}}"><i
                    class="fas fa-edit"></i>
                Sửa</button>
        </td>
    </div>
    </tr>
    <!-- end form check action multiple delete -->
  <div class="modal fade" id="box-edit-cate-modal{{$cate['id']}}" data-bs-backdrop="static"data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form class="form-edit-cate" data-id="{{$cate['id']}}" enctype="multipart/form-data">
                        <input type="hidden" name="author" value="<?= session()->get('name') ?>">
                        <input type="hidden" name="token" value="<?= session()->get('token') ?>">    
                        <div class="modal-header mb-3">
                        <h5 class="modal-title text-center" id="staticBackdropLabel">Cập nhật <p class="text-overflow">
                                "{{$cate['name']}}"</p>
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true"></span>
                        </button>
                    </div>

                    <div class="modal-body mb-3">
                        <div class="form-floating mb-3">
                            <input type="hidden" name="id" value="{{$cate['id']}}">
                            <textarea data-id="{{$cate['id']}}" id="titleEditCate{{$cate['id']}}"
                                class="form-control" name="name" placeholder="Nhập tên thể loại..."
                                id="titleSlider">{{$cate['name']}}</textarea>
                            <label for="floatingTextarea fw-bold">Tên thể loại</label>
                        </div>
                        <div class="form-group image-cate">
                            <img class="d-flex justify-content-center" style="margin-bottom: 20px;"
                                id="fileCateEdit{{$cate['id']}}"
                                src="<?php echo ($cate['image'] != null) ? $urlCate.'/'.$cate['image'] : $urlCate.'/noimage/no-image-available.png' ?>"
                                alt="image">
                        </div>
                        <div class="form-group mt-3">
                            <label class="fw-bold mb-1" for="">Ảnh đại diện</label>
                            <div class="input-group mb-3">
                                <input class="form-control fileImageEdit" type="file" id="imageEdit{{$cate['id']}}"
                                    name="fileupdate" data-id="{{$cate['id']}}">
                            </div>
                        </div>
                    </div>

                    <div class="modal-footer mb-3">
                        <button type="button" class="btn btn-sm btn-secondary" data-bs-dismiss="modal"><i
                                class="fas fa-times"></i>&nbsp; Đóng</button>
                        <button type="submit" class="btn btn-sm btn-success" data-idnum="{{$cate['id']}}"><i
                                class="fas fa-save"></i>&nbsp;Cập nhật</button>
</div>
                </form>
            </div>
        </div>
    </div>
    @endforeach
    @else
    <p>Dữ liệu trống</p>
    @endif
    </tbody>
    </table>
</div>
</div>
</div>
<script src="admin/cate.js"></script>
<script>
    function AjaxSetup() {
        return $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
    }
    $('#cateTable').dataTable({
        pageLength : 4,
        lengthMenu: [[2,5, 10, 20], [2,5,10,20]]
        });
        $('#sliderTable2').dataTable({
            pageLength : 4,
            lengthMenu: [[2,5, 10, 20], [2,5,10,20]]
        });
    // $(document).ready(function () {
        
    // });

</script>


@endsection
