<style>
    .billdetail{
        cursor: pointer;
    }
</style>
@extends('layout.layout')
@section('title', 'Thống Kê')
@section('main')
<div class="modal fade" id="BillDetailModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Thông tin hóa đơn</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body" id="resultSingleBillTK">
            
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
          <button type="button" class="btn btn-primary" id="FinshBill">Hoàn thành đơn</button>
        </div>
      </div>
    </div>
  </div>
    @if (count($topbills)!=0)
    <div class="row mt-3 mb-3">
        <div style="width:97%;margin:0px auto;margin-bottom:5%">
            <table class="table">
                <thead>
                    <tr class="table-dark">
                        <th>#</th>
                        <th>Tên khách hàng</th>
                        <th>Tình trạng</th>
                        <th>Địa chỉ</th>
                        <th>Tổng giá trị</th>
                        <th>Ngày đặt hàng</th>
                    </tr>
                </thead>
                <tbody>
                    <?php $i=1;?>
                    @foreach ($topbills as $item)
                    <tr>
                        <td><?=$i++?></td>
                        <td><b class="billdetail" data-id="{{$item['idBill']}}">{{$item['customername']}}</b></td>
                        <td><b>Chờ xử lý</b></td>
                        <td>{{$item['billaddress']}}</td>
                        <td>{{ number_format($item['total'], 0) }}</td>
                        <td>{{$item['billcreate']}}</td>
                    </tr>
                    @endforeach
                    
                </tbody>
            </table>
        </div>
    </div>
    @endif
   
    <div class="row mt-3">
        <div class="col-sm-6">
            <div style="width:65%" id="chart_div"></div>
        </div>
        <div class="col-sm-4">
            <table class="table responsive">
                    <tr class="table-light">
                        <td class="p-3">
                            Số lượng sản phẩm:
                        </td>
                        <td class="p-3">
                            <b id="resultProdCount"></b>
                        </td>
                    </tr>
                    <tr class="table-success">
                        <td class="p-3">
                            Số lượng danh mục:
                        </td>
                        <td class="p-3">
                            <b id="resultCateCount"></b>
                        </td>
                    </tr>
            </table>
        </div>
    </div>
    <div class="row">
        <div class="col-sm">
            <div id="chart_div4"></div>
        </div>
    </div>
    <div class="row mt-3">
        <div class="col-sm-5">
            <div id="chart_div2"></div>
        </div>
        <div class="col-sm-5">
            <div id="chart_div3"></div>
        </div>
    </div>

    <script src="//cdnjs.cloudflare.com/ajax/libs/numeral.js/2.0.6/numeral.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <script src="admin/chart.js"></script>
@endsection