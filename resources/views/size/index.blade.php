@extends('layout.layout')
@section('title', 'Quản lý size')
<style>
    div.dataTables_wrapper {
        width: 98%;
        margin: 0px auto;
    }
    .wrapper{
        width: 95%;
        margin: 0px auto
    }
    /* thiết lập CSS cho switch */
 .switch {
   position: relative;
   display: inline-block;
   width: 60px;
   height: 34px;
 }
/* Ẩn ô checkbox  */
 .switch input {
   opacity: 0;
   width: 0;
   height: 0;
 }
/* Thiết lập CSS cho slider */
 .slider {
   position: absolute;
   cursor: pointer;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   background-color: #ccc;
   -webkit-transition: .4s;
   transition: .4s;
 }
.slider:before {
   position: absolute;
   content: "";
   height: 26px;
   width: 26px;
   left: 4px;
   bottom: 4px;
   background-color: white;
   -webkit-transition: .4s;
   transition: .4s;
 }
</style>
@section('main')
    <link rel="stylesheet" href="admin/assets/css/styles.css">
    <link rel="stylesheet" type="text/css"
        href="https://cdn.datatables.net/v/bs5/dt-1.13.1/af-2.5.1/b-2.3.2/cr-1.6.1/date-1.2.0/kt-2.8.0/r-2.4.0/rg-1.3.0/rr-1.3.1/sb-1.4.0/sp-2.1.0/sl-1.5.0/sr-1.2.0/datatables.min.css" />

    <script type="text/javascript"
        src="https://cdn.datatables.net/v/bs5/dt-1.13.1/af-2.5.1/b-2.3.2/cr-1.6.1/date-1.2.0/kt-2.8.0/r-2.4.0/rg-1.3.0/rr-1.3.1/sb-1.4.0/sp-2.1.0/sl-1.5.0/sr-1.2.0/datatables.min.js">
    </script>
    <div class="wrapper">
        <button class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#addSizeModal">Thêm kích thước</button>
        {{-- ===============Add Size Modal --}}
        <div class="modal fade" id="addSizeModal" tabindex="-1" aria-labelledby="addSizeModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header bg-dark">
                        <h2 style="color:white" class="modal-title fs-5" id="addSizeModalLabel">Thêm kích thước</h2>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <input type="text" class="form-control mb-3" id="newSizename" placeholder="Tên kích thước mới">
                        <input type="text" class="form-control" id="newSizeinfo" placeholder="Thông tin kích thước">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                        <button type="button" class="btn btn-primary" id="submitAddSizeBtn">Lưu</button>
                    </div>
                </div>
            </div>
        </div>
        {{-- ===============Edit Size Modal --}}
        <div class="modal fade" id="editSizeModal" tabindex="-1" aria-labelledby="editSizeModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header bg-dark">
                        <h1 class="modal-title fs-5 text-light" id="editSizeModalLabel">Thay đổi kích thước</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <input type="text" class="form-control" id="newSizeEdit" placeholder="Tên kích thước mới">
                        <input type="text" class="form-control" id="newSizeEdit" placeholder="Thông tin kích thước mới">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                        <button type="button" class="btn btn-primary" id="submitEditSizeBtn">Lưu</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="mt-2">

        </div>
        {{-- ===================== --}}
        <div class="mt-3">
            <table class="table" id="resultTable">
                <thead class="thead-dark">
                    <tr class='table-dark'>
                        <th>
                            #
                        </th>
                        <th>Size</th>
                        <th>Thông tin</th>
                        <th>Tình trạng</th>
                        <th>Ngày tạo</th>
                        <th>Tùy chỉnh</th>
                    </tr>
                </thead>
                <tbody>
                    @if (count($sizes)!=0)
                    <?php $i = 1; ?>                        
                    @foreach ($sizes as $item)
                    <tr class='table-light'>
                        <td>
                            <?=$i++?>
                        </td>
                        <td><p class="editSizeName" data-id="{{$item['id']}}" >{{$item['sizename']}}</p></td>
                        <td><p class="editSizeInfo" data-id="{{$item['id']}}" >{{$item['sizeinfo']}}</p></td>
                        <td>
                            @if ($item['status']==0)
                            <label class="switch">
                                <input type="checkbox" class="sizeStt" data-id="{{$item['id']}}" >
                                <span class="slider round"></span>
                              </label>
                            @else
                            <label class="switch">
                                <input type="checkbox" class="sizeStt" data-id="{{$item['id']}}" checked >
                                <span class="slider round"></span>
                              </label>
                            @endif

                        </td>
                        <td>
                            <b><?=date('H:i - d/m/yy',strtotime($item['updated_at']))?></b>
                        </td>
                        <td>
                        <button type="button" class="btn btn-danger deleteSizebtn" data-id="{{$item['id']}}">Xóa</button>
                        </td>
                    </tr>
                    @endforeach
                    @else
                        <tr>
                            <td colspan="4">
                                <b>Chưa có dữ liệu màu sắc</b>
                            </td>
                        </tr>
                    @endif



                </tbody>
            </table>
        </div>
    </div>


    <script>
    <?php
    if(count($sizes)!=0){?>
    $(document).ready(function() {
            // Cấu hình các nhãn phân trang
            $('#resultTable').dataTable({});
        });

    <?php }
    ?>
      
    </script>
    <script src="admin/size.js"></script>

@endsection
