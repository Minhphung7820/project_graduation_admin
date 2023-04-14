@extends('layout.layout')
@section('title', 'Quản lý sản phẩm')
@section('main')
<?php

use Carbon\Carbon;

Carbon::setLocale('vi');
?>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
<style>
    .name-customer-rating {
        border-radius: 50%;
        width: 80px;
        height: 80px;
        padding: 12px 10px 10px 10px;
        color: white;
        font-weight: bold;
        font-size: 40px;
        text-align: center;
    }

    .star-light {
        color: #e9ecef;
    }

    .checked-rating {
        border: 3px solid green;
    }

    .row-rating-box-of-customer {
        cursor: pointer;
    }

    .btn-apply-action-rating {
        display: none;
    }

    @media only screen and (max-width: 768px) {
        .btn-apply-action-rating {
            width: 100%;
        }
    }
</style>
<div class="row p-4">
    <div class="col-lg-12 p-4">
        <div class="row">
            <div class="col-lg-3 col-sm-6 col-xs-12 mb-2">
                <div style="border:none;" class="card shadow">
                    <div style="border:none;" class="card-header fw-bold text-info text-center">
                        <i class="fas fa-star text-warning"></i> Tổng cộng
                    </div>
                    <div class="card-body text-center">
                        <div class="h2 fw-bold">{{$all}}</div>
                    </div>
                </div>
            </div>
            <div class="col-lg-3 col-sm-6 col-xs-12 mb-2">
                <div style="border:none;" class="card shadow">
                    <div style="border:none;" class="card-header fw-bold  text-primary text-center">
                        <i class="fas fa-clock"></i> Đang chờ duyệt
                    </div>
                    <div class="card-body text-center">
                        <div class="h2 fw-bold">{{$waiting}}</div>
                    </div>
                </div>
            </div>
            <div class="col-lg-3 col-sm-6 col-xs-12 mb-2">
                <div style="border:none;" class="card shadow">
                    <div style="border:none;" class="card-header fw-bold  text-success text-center">
                        <i class="	fas fa-check-circle"></i> Đã được duyệt
                    </div>
                    <div class="card-body text-center">
                        <div class="h2 fw-bold">{{$approved}}</div>
                    </div>
                </div>
            </div>
            <div class="col-lg-3 col-sm-6 col-xs-12 mb-2">
                <div style="border:none;" class="card shadow">
                    <div style="border:none;" class="card-header fw-bold  text-danger text-center">
                        <i class="fas fa-minus-circle"></i> Đã bị spam
                    </div>
                    <div class="card-body text-center">
                        <div class="h2 fw-bold">{{$spam}}</div>
                    </div>
                </div>
            </div>


        </div>
        <!-- <div class="row">
            <div class="col-lg-6 pt-4 pb-4">
                <b>Top 5 sản phẩm được đánh giá nhiều nhất</b>
                <div class="row">
                    @foreach($products as $stars => $item)
                    <div class="col-lg-12 mb-2">
                        <img src="http://127.0.0.1:3000/images/{{ $item->image }}" class="img-thumbnail" alt="..." width="80px">
                    </div>
                    @endforeach
                </div>
            </div>
            <div class="col-lg-6 pt-4 pb-4">
                <b>Top 5 sản phẩm được đánh giá nhiều nhất</b>
                <div class="row">
                    @foreach($products as $stars => $item)
                    <div class="col-lg-12 mb-2">
                        <img src="http://127.0.0.1:3000/images/{{ $item->image }}" class="img-thumbnail" alt="..." width="80px">
                    </div>
                    @endforeach
                </div>
            </div>
        </div> -->
    </div>
    <div class="col-lg-12 p-4 box-all-rating-customer">

    </div>
</div>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
<script>
    function AjaxSetup() {
        return $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
    }
</script>
<script src="{{ asset('admin/rating.js') }}"></script>
@endsection