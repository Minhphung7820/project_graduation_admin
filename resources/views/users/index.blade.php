@extends('layout.layout')
@section('title','Quản lý tài khoản')
<style>
  div.dataTables_wrapper{
      width:98%;
      margin:0px auto;
  }
  .inputedit{
  cursor: pointer;
  }
</style>
@section('main')
<link rel="stylesheet" type="text/css"
href="https://cdn.datatables.net/v/bs5/dt-1.13.1/af-2.5.1/b-2.3.2/cr-1.6.1/date-1.2.0/kt-2.8.0/r-2.4.0/rg-1.3.0/rr-1.3.1/sb-1.4.0/sp-2.1.0/sl-1.5.0/sr-1.2.0/datatables.min.css" />

<script type="text/javascript"
src="https://cdn.datatables.net/v/bs5/dt-1.13.1/af-2.5.1/b-2.3.2/cr-1.6.1/date-1.2.0/kt-2.8.0/r-2.4.0/rg-1.3.0/rr-1.3.1/sb-1.4.0/sp-2.1.0/sl-1.5.0/sr-1.2.0/datatables.min.js">
</script>
    {{-- Modal LoaiTK--}}
    <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="editModalLabel">Form Edit</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body" id="editArea">

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
            <button type="button" class="btn btn-primary" id="submiteditbtn">Lưu</button>
          </div>
        </div>
      </div>
    </div>
    {{-- ============================= --}}
    <div class="modal fade" id="addLTKModal" tabindex="-1" aria-labelledby="addLTKModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="addLTKModalLabel">Thêm loại tài khoản</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <input type="text" class="form-control" id="tenLoaiTK" placeholder="Tên loại tài khoản">
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-dark" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-secondary" id="addUserRoleBtn">Lưu</button>
            </div>
          </div>
        </div>
    </div>
    {{-- =-======================== --}}
    <div class="modal fade" id="editUserModal" tabindex="-1" aria-labelledby="editUserModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editUserModalLabel">Modal title</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <input type="text" class="form-control" id="oldEmail"><br>
            <select name="" class="form-control" id="RoleIdUpdateUser">
              @foreach ($userrole as $item)
                <option value="{{$item->id}}">{{$item->name}}</option>
              @endforeach
            </select>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
            <button type="button" class="btn btn-primary" id="submiteditUser">Lưu mới</button>
          </div>
        </div>
      </div>
    </div>
    {{-- ============================= --}}
    <div class="modal fade" id="addTKModal" tabindex="-1" aria-labelledby="addTKModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="addTKModalLabel">Thêm tài khoản</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <input type="text" class="form-control" id="email" placeholder="Email tài khoản">
              <br>
              <select name="" class="form-control" id="idUserRoleSelect">
                @foreach ($userrole as $item)
                <option value="{{$item->id}}">{{$item->name}}</option>
                @endforeach
              </select>
            </div>
            <div class="modal-footer">
              <button type="button"  class="btn btn-dark" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-secondary" id="addUserBtn">Lưu</button>
            </div>
          </div>
        </div>
    </div>
    {{-- ============================= --}}
    <div class="m-3">
      <button class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#addLTKModal">Thêm loại tài khoản</button>
    <button class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#addTKModal">Thêm tài khoản</button>
    </div>
    <div class="mt-3">
      <h4 class="p-3">Loại tài khoản</h4>
      <table class="table display" style="width:100%" id="resultTable2">
        <thead class="table-dark">
          <tr>
            <th>#</th>
            <th>Tên loại</th>
            <th>Số lượng tài khoản</th>
            <th>Tình trạng</th>
            <th>Ngày tạo</th>
          </tr>
        </thead>
        <tbody>
          <?php $i=1;?>
          @foreach ($userrole as $item)
              <tr>
                <td><?=$i++?></td>
                <td><b class="inputedit" onclick="editUserRole1({{$item->id}})">{{$item->name}}</b></td>
                <td>{{$item->count}}</td>
                <td>@if ($item->status==0)
                    <b class="inputedit" onclick="switchUserRole({{$item->id}})">Đang khóa</b>
                @else
                    <b  class="inputedit" onclick="switchUserRole({{$item->id}})">Đang hoạt động</b>
                @endif</td>
                <td><?=date('H:i - d/m/yy',strtotime($item->created_at))?></td>
              </tr>
              
          @endforeach
        </tbody>
      </table>
    </div>
    <div class="mt-3">
      <h4 class="p-3">Danh sách tài khoản</h4>
      <table class="table display" style="width:100%" id="resultTable1">
        <thead class="table-dark">
          <tr>
            <th>#</th>
            <th>Email</th>
            <th>Loại tài khoản</th>
            <th>Tình trạng</th>
            <th>Ngày tạo</th>
            <th data-orderable="false">Tùy chọn</th>
          </tr>
        </thead>
        <tbody>
          <?php $i=1;?>
          @foreach ($allusers as $item)
              <tr>
                <td><?=$i++?></td>
                <td><b class="inputedit" onclick="editUserEmail('{{$item->email}}','{{$item->idUser}}')">{{$item->email}}</b></td>
                <td>{{$item->rolename}}</td>
                <td>@if ($item->userstt==0)
                    <b class="switchUserBtn inputedit" data-id="{{$item->idUser}}">Đang khóa</b>
                @else
                    <b class="switchUserBtn inputedit" data-id="{{$item->idUser}}">Đang hoạt động</b>
                @endif</td>
                <td><?=date('H:i - d/m/yy',strtotime($item->usercreated))?></td>
                <td><button class="btn btn-sm btn-warning editUserBtn" data-id="{{$item->idUser}}">Tùy chọn</button></td>
              </tr>
              
          @endforeach
        </tbody>
      </table>
    </div>

    <script>
      $(document).ready(function() {
      // Cấu hình các nhãn phân trang
      $('#resultTable1').dataTable({
          
      });
      $('#resultTable2').dataTable({
          
        });
  });
</script>
@endsection
@section('jsarea')
<script src="admin/users.js"></script>
@endsection