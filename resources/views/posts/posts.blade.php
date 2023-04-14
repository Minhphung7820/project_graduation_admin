<?php

use Carbon\Carbon;

Carbon::setLocale('vi');
?>
@extends('layout.layout')
@section('title','Quản lý bài viết')
@section('main')
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
<style>
    #tbody-posts>tr>td {
        padding: 10px;
    }

    /* .td-image-posts > div >img{
    border-radius: 10px;
} */
    /* .td-time-posts {
        font-weight: bold;
    } */

    .td-status-posts {
        font-weight: bold;
    }

    .td-title-posts {
        font-weight: 500;
        color: #4a6cf7;
        /* text-decoration: underline; */
    }


    #table-posts>thead>tr>th {
        text-align: center;
    }

    /*  */
    .tags a[class="tags_a"] {
        display: inline-block;
        height: 21px;
        margin: 0 10px 0 0;
        padding: 0 7px 0 14px;
        white-space: nowrap;
        position: relative;
        background: -moz-linear-gradient(top, #fed970 0%, #febc4a 100%);
        background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #fed970), color-stop(100%, #febc4a));
        background: -webkit-linear-gradient(top, #fed970 0%, #febc4a 100%);
        background: -o-linear-gradient(top, #fed970 0%, #febc4a 100%);
        background: linear-gradient(to bottom, #fed970 0%, #febc4a 100%);
        background-color: #FEC95B;
        color: #963;
        font: bold 11px/21px Arial, Tahoma, sans-serif;
        text-decoration: none;
        text-shadow: 0 1px rgba(255, 255, 255, 0.4);
        border-top: 1px solid #EDB14A;
        border-bottom: 1px solid #CE922E;
        border-right: 1px solid #DCA03B;
        border-radius: 1px 3px 3px 1px;
        box-shadow: inset 0 1px #FEE395, 0 1px 2px rgba(0, 0, 0, 0.21);
    }

    a[class="tags_a"]:before {
        content: '';
        position: absolute;
        top: 5px;
        left: -6px;
        width: 10px;
        height: 10px;
        background: -moz-linear-gradient(45deg, #fed970 0%, #febc4a 100%);
        background: -webkit-gradient(linear, left bottom, right top, color-stop(0%, #fed970), color-stop(100%, #febc4a));
        background: -webkit-linear-gradient(-45deg, #fed970 0%, #febc4a 100%);
        background: -o-linear-gradient(45deg, #fed970 0%, #febc4a 100%);
        background: linear-gradient(135deg, #fed970 0%, #febc4a 100%);
        background-color: #FEC95B;
        border-left: 1px solid #EDB14A;
        border-bottom: 1px solid #CE922E;
        border-radius: 0 0 0 2px;
        box-shadow: inset 1px 0 #FEDB7C, 0 2px 2px -2px rgba(0, 0, 0, 0.33);
    }

    a[class="tags_a"]:before {
        -webkit-transform: scale(1, 1.5) rotate(45deg);
        -moz-transform: scale(1, 1.5) rotate(45deg);
        -ms-transform: scale(1, 1.5) rotate(45deg);
        transform: scale(1, 1.5) rotate(45deg);
    }

    a[class="tags_a"]:after {
        content: '';
        position: absolute;
        top: 7px;
        left: 1px;
        width: 5px;
        height: 5px;
        background: #FFF;
        border-radius: 4px;
        border: 1px solid #DCA03B;
        box-shadow: 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 1px 1px rgba(0, 0, 0, 0.21);
    }

    .tags a[class="tags_a"]:hover {
        color: #FFF;
        text-shadow: -1px -1px 0 rgba(153, 102, 51, 0.3);
    }

    .btn-action-when-checkbox-in-trash {
        display: none;
    }

    /*  */
    /*  */
    @media only screen and (max-width: 768px) {

        /* For mobile phones: */
        .btn-ac-posts-all {
            width: 100%;
            height: 50px;
            margin-bottom: 10px;
        }

        .btn-action-when-checkbox-in-trash {
            width: 100%;
            height: 50px;
            margin-bottom: 10px;
        }

        .btn-action-posts-in-list {
            width: 100%;
            height: 50px;
            margin-bottom: 10px;
        }
        .em-note-th-post{
            display: none;
        }
    }

    .box-content-quick-view-posts>p>img {
        width: 100% !important;
        height: 100% !important;
    }

    /*  */
    .btn-move-more-item-ton-trash {
        display: none;
    }

    .btn-action-in-trash {
        background: none;
        border: none;
    }

    .btn-action-in-trash:hover {
        background: none !important;
    }

    .td-title-posts,
    .btn-change-fast-status-posts {
        cursor: pointer;
    }

    .td-title-posts>a {
        text-decoration: none;
    }

    .form-change-title-posts-fast,
    .btn-submit-update-fast-title {
        display: none;
    }

    .textarea-update-fast-title {
        padding: 0 !important;
    }

    .textarea-update-fast-title::-webkit-scrollbar {
        display: none;
    }
</style>
<div style="border-radius:15px ;" class="row shadow m-4 bg-white pt-4 pl-2 pr-2 pb-4">
    <div class="col-lg-12 mb-4">
        <button onclick="window.location.href='/add-posts'" type="button" class="btn btn-primary btn-ac-posts-all">+ Tạo bài viết mới</button>
        <button type="button" class="btn btn-warning btn-ac-posts-all" data-bs-toggle="modal" data-bs-target="#modal-trash-posts">Thùng rác bài viết <span class="badge bg-danger">{{ $show = (count($allTrash) > 0) ? count($allTrash) : '' }}</span></button>
        <button type="button" class="btn btn-danger btn-ac-posts-all btn-move-more-item-ton-trash">Chuyển <span id="count-item-move-to-trash"></span> mục vào thùng rác</button>
        <!--  -->
        <div class="modal fade" id="modal-trash-posts" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel"><i class="	fas fa-trash-alt"></i> Thùng rác bài viết</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-lg-12 mb-2">
                                <button type="button" class="btn btn-success btn-action-when-checkbox-in-trash btn-restore-many-posts-trash"><i class="	fas fa-redo-alt"></i> Khôi phục <span class="count-item-checkked-in-trash"></span> mục đã đánh dấu</button>
                                <button type="button" class="btn btn-danger btn-action-when-checkbox-in-trash btn-force-delete-many-posts-trash"><i class="	fas fa-times "></i> Xóa vĩnh viễn <span class="count-item-checkked-in-trash"></span> mục đã đánh dấu</button>
                            </div>
                        </div>
                        @if(count($allTrash) > 0)
                        <em style="color:red ;">(Chú ý: Các bài viết trong đây sẽ tự động xóa sau 30 ngày !)</em>
                        <div class="table-responsive">
                            <table id="table-trash-posts" class="table">
                                <thead>
                                    <tr>
                                        <th class="text-center"><input type="checkbox" id="check-all-trash-posts"></th>
                                        <th class="text-center">Ảnh</th>
                                        <th class="text-center">Tiêu đề</th>
                                        <th class="text-center">Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach($allTrash as $trash)
                                    <tr>
                                        <td class="text-center"><input data-id="{{ $trash->id }}" type="checkbox" class="check-each-posts-in-trash"></td>
                                        <td class="text-center"><img style="border-radius: 10px;" src="<?php echo ($trash->imagePosts == null) ? 'https://vnpi-hcm.vn/wp-content/uploads/2018/01/no-image-800x600.png' : 'http://127.0.0.1:3000/images/posts/' . $trash->imagePosts ?>" alt="" width="100px" height="60px"></td>
                                        <td>{{ $trash->titlePosts }}</td>
                                        <td class="text-center">
                                            <div class="btn-group" role="group" aria-label="Basic example">
                                                <button data-id="{{ $trash->id }}" type="button" class="btn btn-primary btn-action-in-trash text-success btn-restore-single-posts-trash"><i class="	fas fa-redo-alt"></i></button>
                                                <button data-id="{{ $trash->id }}" type="button" class="btn btn-primary btn-action-in-trash text-danger btn-force-delete-single-posts-trash"><i class="	fas fa-times "></i></button>
                                            </div>
                                        </td>
                                    </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>
                        @else
                        <div class="h4">Không có bài viết nào trong thùng rác !</div>
                        @endif
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Đóng</button>
                        <!-- <button type="button" class="btn btn-primary">Understood</button> -->
                    </div>
                </div>
            </div>
        </div>
        <!--  -->
    </div>
    <div class="col-lg-12">
        @if(count($allPosts) > 0)
        <!--  -->
        <div class="table-responsive">
            <table id="table-posts" class="table table-posts">
                <thead>
                    <tr>
                        <th><input type="checkbox" id="checkbox-all-posts"></th>
                        <th><i class="	fas fa-image"></i></th>
                        <th>Tiêu đề <em class="em-note-th-post" style="font-weight: 10;">(Double click để sửa nhanh)</em></th>
                        <th><i class="fas fa-clock"></i></th>
                        <th><i class="	far fa-meh-rolling-eyes"></i></th>
                        <th><i class="	fas fa-th-large"></i></th>
                        <th><i class="fas fa-user-secret"></i></th>
                        <th><i class="	fas fa-tags"></i></th>
                        <th><i class="fa fa-cogs"></i></th>
                    </tr>
                </thead>
                <tbody id="tbody-posts">
                    @foreach($allPosts as $item)
                    <tr>
                        <td><input data-id="{{ $item->id }}" type="checkbox" class="checkbox-each-posts"></td>
                        <td>
                            <div><img style="border-radius: 10px;" src="<?php echo ($item->imagePosts == null) ? 'https://vnpi-hcm.vn/wp-content/uploads/2018/01/no-image-800x600.png' : 'http://127.0.0.1:3000/images/posts/' . $item->imagePosts ?>" alt="" width="100px" height="60px"></div>
                        </td>
                        <td data-id="{{ $item->id }}" class="td-title-posts"><a class="a-{{ $item->id }}" href="">{!! $item->titlePosts !!}</a>
                            <input type="hidden" id="title-current-posts{{ $item->id }}" class="title-current-posts" value="{!! $item->titlePosts !!}">
                            <div id="form-change-title-posts-fast{{ $item->id }}" class="form-floating form-change-title-posts-fast">
                                <textarea data-id="{{ $item->id }}" id="textarea-update-fast-title-{{ $item->id }}" style="overflow:auto;resize:none;height:120px;" class="form-control textarea-update-fast-title" id="floatingTextarea">{!! $item->titlePosts !!}</textarea>
                                <button type="button" data-id="{{ $item->id }}" id="btn-submit-update-fast-title{{ $item->id }}" class="btn btn-primary mt-2 btn-submit-update-fast-title fw-bold"> [<i class="fas fa-save"></i>] Lưu lại tiêu đề</button>
                                <button type="button" data-id="{{ $item->id }}" class="btn btn-danger btn-canncel-update-fast-title mt-2 fw-bold"><i class="	fas fa-times"></i> Đóng</button>
                            </div>
                        </td>
                        <td class="td-time-posts"><?= Carbon::parse($item->created_at)->diffForHumans() ?></td>
                        <td class="td-status-posts {{ $show = ($item->statusPosts == 1) ? 'text-success' : 'text-danger' }}"><?php echo ($item->statusPosts == 1) ? '<i data-id="' . $item->id . '" data-act="hide" class="	fas fa-check-circle btn-change-fast-status-posts"></i>' : '<i data-id="' . $item->id . '" data-act="show" class="		fas fa-minus-circle btn-change-fast-status-posts"></i>' ?></td>
                        <td>{{ $item->cate_posts->nameCatePosts }}</td>
                        <td>{{ $item->author }}</td>
                        <td class="td-tags-posts">
                            <?php if (count($item->tags) > 0) { ?>
                                <span class="tags">
                                    <?php
                                    foreach ($item->tags as $key => $tag) {
                                        echo '<a class="tags_a" href="">' . $tag->nameTagBlog . '</a>';
                                    }
                                    ?>
                                </span>
                            <?php } else { ?>
                                <button type="button" class="btn btn-danger fw-bold">No Tags</button>
                            <?php } ?>
                        </td>
                        <td>
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalshowbuttonActionPosts{{ $item->id }}"><i class="fas fa-cog"></i></button>
                            <!--  -->
                            <!--  -->
                            <div class="modal fade" id="modalshowbuttonActionPosts{{ $item->id }}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered">
                                    <div class="modal-content">
                                        <!-- <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div> -->
                                        <div class="modal-body text-center">
                                            <button type="button" class="btn btn-primary btn-action-posts-in-list" data-bs-toggle="modal" data-bs-target="#modalquickviewposts{{ $item->id }}">Xem nhanh</button>
                                            <button id="btn-load-to-page-update-post-by-{{ $item->id }}" onclick="loadToPageUpdate(this)" data-url="/edit-posts/{!! $item->cate_posts->slugCatePost !!}/{!! $item->slugPosts !!}.html" type="button" class="btn btn-warning btn-action-posts-in-list">Cập nhật</button>
                                            <button type="button" data-id="{{ $item->id }}" class="btn btn-danger btn-move-to-trash-single-posts btn-action-posts-in-list">Chuyển vào thùng rác</button>
                                        </div>
                                        <!-- <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        </div> -->
                                    </div>
                                </div>
                            </div>
                            <!--  -->
                            <!--  -->
                            <div class="modal fade" id="modalquickviewposts{{ $item->id }}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog  modal-xl">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <div class="h5">{!! $item->titlePosts !!}</div>
                                            <br>
                                            <img src="<?php echo ($item->imagePosts == null) ? 'https://vnpi-hcm.vn/wp-content/uploads/2018/01/no-image-800x600.png' : 'http://127.0.0.1:3000/images/posts/' . $item->imagePosts ?>" alt="" width="100%" height="100%">
                                            <br>
                                            <div class="h5">{!! $item->summaryPosts !!}</div>
                                            <br>
                                            <div class="box-content-quick-view-posts">{!! $item->contentPosts !!}</div>
                                            <br><br><br>
                                            <div class="h6">Đăng bởi: {{$item->author}}</div>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Đóng</button>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!--  -->
                            <!--  -->
                        </td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
        @else
        <div style="text-align:center;" class="h4">Chưa có bài viết nào !</div>

        @endif
        <!--  -->
    </div>
</div>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
<script type="text/javascript" src="https://cdn.datatables.net/v/bs5/dt-1.13.1/datatables.min.js"></script>
<script>
    function AjaxSetup() {
        return $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
    }
    $(document).ready(function() {
        $('#table-posts').DataTable();
        $("#table-trash-posts").DataTable();
    });
</script>
<script src="{{ asset('admin/posts.js') }}"></script>
@endsection