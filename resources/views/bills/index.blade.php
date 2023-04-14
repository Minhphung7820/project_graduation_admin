<style>
    tr td {
        font-size:19px;
    }
    .billstatus{
        cursor: pointer;
    }
</style>
@extends('layout.layout')
@section('title','Quản lý hóa đơn')
@section('main')
<link rel="stylesheet" href="admin/assets/css/styles.css">
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs5/dt-1.13.1/fc-4.2.1/r-2.4.0/sb-1.4.0/sl-1.5.0/datatables.min.css"/>
 
<script type="text/javascript" src="https://cdn.datatables.net/v/bs5/dt-1.13.1/fc-4.2.1/r-2.4.0/sb-1.4.0/sl-1.5.0/datatables.min.js"></script>
    <div class="mt-2 row">
        <div class="col-sm-5">
            <table class="display table" id="billsTable">
                <thead>
                    <tr class="table-dark">
                        <th>#</th>
                        <th>Thông tin hóa đơn</th>
                        <th>Ngày tạo</th>
                    </tr>
                </thead>
                <tbody>
                    <?php 
                    $i=1;
                    $tinhtrang='';
                    ?>
                    @foreach ($allbills as $item)
                    <?php
                        if($item->status==1){
                            $tinhtrang='Chờ xử lý';
                        }else if($item->status==2){
                            $tinhtrang='Đang giao hàng';
                        }else if($item->status==0){
                            $tinhtrang='Đã hủy đơn';
                        }else if($item->status==3){
                            $tinhtrang='Thành công';
                        }
                    ?>
                    <tr>                        
                        <td><?=$i++?></td>
                        <td>
                            <b class="billdetail" data-id="{{$item->idBill}}">{{$item->name}}</b>
                            <p>Tình trạng : <b class="billstatus" data-id="{{$item->idBill}}"><?=$tinhtrang?></b> </p>

                            {{-- <b style="font-size:25px;cursor:pointer" class="rolebackbill" data-id="{{$item->idBill}}"><i class='bx bx-arrow-back'></i></b> --}}
                        </td>
                        <td>
                            <?=date('H:i - d/m/yy',strtotime($item->created_at))?>
                        </td>
                    </tr>
                    <?php
                        $tinhtrang='';
                    ?>
                    @endforeach
                   
                </tbody>
            </table>
        </div>
        <div class="col-sm-7" id="resultBill">
           
        </div>
    </div>
    <script src="//cdnjs.cloudflare.com/ajax/libs/numeral.js/2.0.6/numeral.min.js"></script>
    <script src="admin/bill.js"></script>
    <script>
        $(document).ready(function () {
            var table = $('#billsTable').DataTable( {
                pageLength : 4,
                lengthMenu: [[2,5, 10, 20], [2,5,10,20]]
              } )
        } )
    </script>
@endsection