@extends('layout.layout')
@section('title', 'Quản lý thương hiệu')
<style>
    div.dataTables_wrapper{
        width:98%;
        margin:0px auto;
    }
</style>
@section('main')
    <link rel="stylesheet" href="admin/assets/css/styles.css">
    <link rel="stylesheet" type="text/css"
        href="https://cdn.datatables.net/v/bs5/dt-1.13.1/af-2.5.1/b-2.3.2/cr-1.6.1/date-1.2.0/kt-2.8.0/r-2.4.0/rg-1.3.0/rr-1.3.1/sb-1.4.0/sp-2.1.0/sl-1.5.0/sr-1.2.0/datatables.min.css" />

    <script type="text/javascript"
        src="https://cdn.datatables.net/v/bs5/dt-1.13.1/af-2.5.1/b-2.3.2/cr-1.6.1/date-1.2.0/kt-2.8.0/r-2.4.0/rg-1.3.0/rr-1.3.1/sb-1.4.0/sp-2.1.0/sl-1.5.0/sr-1.2.0/datatables.min.js">
    </script>
    <button class="btn btn-sm btn-primary" id="RequestAddBrandBtn">Thêm thương hiệu</button>
    {{-- ===============Add Brand Modal --}}
    <div class="modal fade" id="addBrandModal" tabindex="-1" aria-labelledby="addBrandModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header bg-dark">
                    <h1 style="color:white" class="modal-title fs-5" id="addBrandModalLabel">Thêm thương hiệu</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <input type="text" class="form-control" id="newBrandAdd" placeholder="Tên thương hiệu mới">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                    <button type="button" class="btn btn-primary" id="submitAddBrandBtn">Lưu</button>
                </div>
            </div>
        </div>
    </div>
    {{-- ===============Edit Brand Modal --}}
    <div class="modal fade" id="editBrandModal" tabindex="-1" aria-labelledby="editBrandModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header bg-dark">
                    <h1 class="modal-title fs-5 text-light" id="editBrandModalLabel">Thay đổi thương hiệu</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <input type="text" class="form-control" id="newBrandEdit" placeholder="Tên thương hiệu mới">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                    <button type="button" class="btn btn-primary" id="submitEditBrandBtn">Lưu</button>
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
                    <th>Thương Hiệu</th>
                    <th>Số lượng sản phẩm</th>
                    <th>Tình trạng</th>
                    <th>Tùy chọn</th>
                </tr>
            </thead>
            <tbody>
                <?php $i=1;?>
                @foreach ($allBrand as $item)
                <tr>
                    <td><?=$i++?></td>
                    <td><b class="inputedit editBrand" data-id="{{$item->id}}">{{$item->name}}</b></td>
                    <td>{{$item->count}}</td>
                    <td>@if ($item->status==0)
                        <b class="inputedit switchBrand" data-id="{{$item->id}}"> Đang đóng</b>
                    @else
                    <b class="inputedit switchBrand" data-id="{{$item->id}}"> Đang mở</b>
                    @endif</td>
                    <td><button class="btn-sm btn btn-danger deleteBrand" data-id="{{$item->id}}">Xóa</button></td>
                </tr>
                @endforeach
                
            </tbody>
        </table>
    </div>

    <script>
        $(document).ready(function() {
        // Cấu hình các nhãn phân trang
        $('#resultTable').dataTable({});
    });
</script>
@endsection
@section('jsarea')
<script src="admin/brand.js"></script>
@endsection