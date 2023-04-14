@extends('layout.layout')
@section('title', 'Quản lý sản phẩm')

<style>
    div.dataTables_wrapper {
        width: 98%;
        margin: 0px auto;
    }
</style>
@section('main')

    <script src="https://code.jquery.com/jquery-3.6.1.min.js"
        integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>

    <link rel="stylesheet" href="admin/assets/css/styles.css">
    <link rel="stylesheet" type="text/css"
        href="https://cdn.datatables.net/v/bs5/dt-1.13.1/fc-4.2.1/r-2.4.0/sb-1.4.0/sl-1.5.0/datatables.min.css" />
    <script type="text/javascript"
        src="https://cdn.datatables.net/v/bs5/dt-1.13.1/fc-4.2.1/r-2.4.0/sb-1.4.0/sl-1.5.0/datatables.min.js"></script>
    {{-- ===============Add Products Modal --}}
    <div class="modal fade" id="productModal" tabindex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="productModalLabel">Thêm Sản Phẩm</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div id="myForm">
                        <h1>Thêm Sản Phẩm</h1>
                        <div style="text-align:center;">
                            <span class="step" id="step-1">1</span>
                            <span class="step" id="step-2">2</span>
                            <span class="step" id="step-3">3</span>
                        </div>

                        <div class="tab" id="tab-1">
                            <div class="row">
                                <div class="col-sm">
                                    <label for="">Tên Sản Phẩm</label>
                                    <input type="text" class="form-control" id="productName" placeholder="Tên Sản Phẩm">
                                </div>
                                <div class="col-sm">
                                    <label for="">Slug</label>
                                    <input type="text" disabled class="form-control" id="slug" value="Slug">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm">
                                    <label for="">Đơn giá</label>
                                    <input type="number" class="form-control" id="price" placeholder="Đơn giá">
                                </div>
                                <div class="col-sm">
                                    <label for="">Giảm giá</label>
                                    <input type="number" class="form-control" id="discount" value="0">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm">
                                    <label for="">Thương hiệu</label>
                                    <select name="" class="form-control" id="brandSelector">
                                        @foreach ($allBrand as $item)
                                            <option value="{{ $item['id'] }}">{{ $item['name'] }}</option>
                                        @endforeach
                                    </select>
                                </div>
                                <div class="col-sm">
                                    <div class="col-sm">
                                        <label for="">Loại sản phẩm</label>
                                        <select name="" class="form-control" id="cateSelector">
                                            @foreach ($allcate as $item)
                                                <option value="{{ $item['id'] }}">{{ $item['name'] }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-4">
                                <div class="col-sm">
                                    <textarea name="content" id="content" cols="30" rows="10"></textarea>
                                </div>
                            </div>
                            <div class="index-btn-wrapper">
                                <div class="index-btn" id="page1next">Next</div>
                            </div>
                        </div>
                        <div class="tab" id="tab-2">
                            <input type="file" name="images[]" id="images" multiple>
                            <div class="mt-3">
                                <div id="resultImage">

                                </div>
                            </div>
                            <div class="index-btn-wrapper">
                                <div class="index-btn"onclick="run(2,1)">Previous</div>
                                <div class="index-btn" id="page2next">Next</div>
                            </div>
                        </div>
                        <div class="tab" id="tab-3">
                            <button class="btn btn-primary" id="addQty">Thêm số lượng</button>
                            <div class="mt-3">
                                <div class="row">
                                    <div class="col-sm">
                                        <div id="resultQty">

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="index-btn-wrapper">
                                <div class="index-btn" onclick="run(3,2);">Previous</div>
                                <button class="index-btn" name="submit" id="submitProductBtn"
                                    style="background: blue;">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {{-- ==================================== --}}
    <div class="modal fade" id="addQuantityModal" tabindex="-1" aria-labelledby="addQuantityModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="addQuantityModalLabel">Thêm sản phẩm</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-sm mb-3">
                            <input type="text" placeholder="Màu Sắc" id="colorNew" class="form-control">
                        </div>
                        <div class="col-sm mb-3">
                            <input type="number" placeholder="Số lượng" id="QtyNew" class="form-control">
                        </div>
                        @if (count($allSize) != 0)
                            <div class="col-sm mb-3">

                                <select name="" class="form-control" id="selectSizeid">
                                    @foreach ($allSize as $item)
                                        <option value="{{ $item['id'] }},{{ $item['sizename'] }}">{{ $item['sizename'] }}
                                        </option>
                                    @endforeach
                                </select>
                            </div>
                        @endif
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" id="addQtyBtn" class="btn btn-primary">Lưu</button>
                </div>
            </div>
        </div>
    </div>

    {{-- ==================================== --}}
    <div class="modal fade" id="editProductModal" tabindex="-1" aria-labelledby="editProductModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="editProductModalLabel">Sửa Sản Phẩm</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row mb-2">
                        <div class="col-sm">
                            <label for="">Tên Sản Phẩm</label>
                            <input type="text" class="form-control" id="productNameEdit" placeholder="Tên Sản Phẩm">
                        </div>
                        <div class="col-sm">
                            <label for="">Slug</label>
                            <input type="text" disabled class="form-control" id="slugEdit" value="Slug">
                        </div>
                    </div>
                    <div class="row mb-2">
                        <div class="col-sm">
                            <label for="">Đơn giá</label>
                            <input type="number" class="form-control" id="priceEdit" placeholder="Đơn giá">
                        </div>
                        <div class="col-sm">
                            <label for="">Giảm giá</label>
                            <input type="number" class="form-control" id="discountEdit" value="0">
                        </div>
                    </div>
                    <div class="row mb-2">
                        <div class="col-sm">
                            <label for="">Thương hiệu</label>
                            <select name="" class="form-control" id="brandSelectorEdit">
                                @foreach ($allBrand as $item)
                                    <option value="{{ $item['id'] }}">{{ $item['name'] }}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="col-sm">
                            <div class="col-sm">
                                <label for="">Loại sản phẩm</label>
                                <select name="" class="form-control" id="cateSelectorEdit">
                                    @foreach ($allcate as $item)
                                        <option value="{{ $item['id'] }}">{{ $item['name'] }}</option>
                                    @endforeach
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="row mt-4">
                        <div class="col-sm">
                            <textarea name="contentEdit" id="contentEdit" cols="30" rows="10"></textarea>
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-sm-11">
                            <div class="row" id="resultimage">

                            </div>
                        </div>
                        <div class="col-sm-1">
                            <a style="font-size:20px" id="recylebinimg" href="#"><i
                                    class='bx bxs-x-circle'></i></a>
                        </div>
                    </div>
                    <div class="row mt-3">
                        <input type="file" name="galleryedit[]" multiple id="editImages">
                        <div class="mt-3">
                            <hr>
                            <div class="row" id="image2area">

                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" id="editProdBtn">Lưu</button>
                        <button type="button" class="btn btn-danger" id="deleteProduct">Xóa</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
    </div>
    </div>
    {{-- ==================================== --}}

    <div class="modal fade" id="deleteImageModal" tabindex="-1" aria-labelledby="editProductModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-l">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="deleteImageModalLabel">Hình ảnh sản phẩm bị xóa</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row mt-3">
                        <div class="col-sm">
                            <div class="row" id="resultdeleteimage">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
    </div>
    </div>
    {{-- ==================================== --}}
    <div class="modal fade" id="editStorageModal" tabindex="-1" aria-labelledby="editStorageModalLabel"
        aria-hidden="true">
        <div class="modal-dialog ">
            <div class="modal-content">
                <div class="modal-header bg-dark">
                    <h1 class="modal-title fs-5 text-white" id="editStorageModalLabel">Quản lý tồn kho</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="table-responsive-xl">
                        <table class="table">
                            <thead class="thead-dark bg-success text-white">
                                <th class="p-3">#</th>
                                <th class="p-3">Màu sắc</th>
                                <th class="p-3">Size</th>
                                <th class="p-3">Số lượng</th>
                                <th class="p-3">Tình trạng</th>
                            </thead>
                            <tbody id="resultStorage">

                            </tbody>
                        </table>
                        <button class="btn btn-sm btn-success" id="addStorageColorBtn">Thêm màu sắc</button>
                        <a href="" class="btn btn-sm btn-primary">Xác nhận</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {{-- ==================================== --}}
    <div class="modal fade" id="editColorNameModal" tabindex="-1" aria-labelledby="editColorNameModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="editColorNameModalLabel">SỬA MÀU SẮC</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-sm mb-3">
                            <input type="hidden" class="form-control" placeholder="" id="oldColor">
                            <input type="text" class="form-control" disabled placeholder="" id="oldColor1">
                        </div>
                        <div class="col-sm mb-3">
                            <input type="text" class="form-control" placeholder="Màu sắc mới" id="newColorName">
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                    <button type="button" class="btn btn-danger" id="deleteColorbtn"
                        data-bs-dismiss="modal">Xóa</button>
                    <button type="button" class="btn btn-primary" id="submitEditColorname">Lưu</button>
                </div>
            </div>
        </div>
    </div>
    {{-- ==================================== --}}
    <div class="modal fade" id="editQuantityModal" tabindex="-1" aria-labelledby="editQuantityModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="row">
                        <div class="col">
                            <input type="number" class="form-control" id="newQty" value="0">
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                    <button type="button" class="btn btn-primary" id="SaveQuantityBtn">Lưu</button>
                </div>
            </div>
        </div>
    </div>
    {{-- ==================================== --}}
    <div class="modal fade" id="deleteProductsModal" tabindex="-1" aria-labelledby="deleteProductsModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="deleteProductsModalLabel">Sản Phẩm Đã Xóa</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <table class="table">
                        <thead>
                            <tr class="table-dark ">
                                <td class="p-3">#</td>
                                <td class="p-3">Tên Sản Phẩm</td>
                                <td class="p-3">Tùy Chỉnh</td>
                            </tr>
                        </thead>
                        <tbody id="resultdeleteProduct">

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    {{-- ==================================== --}}
    <div class="modal fade" id="addMoreColorModal" tabindex="-1" aria-labelledby="addMoreColorModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="addMoreColorModalLabel">Thêm Màu Sắc</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        @if (count($allSize) != 0)
                            <div class="col-sm mb-3">
                                <label for="">Thông tin size</label>
                                <select name="" class="form-control" id="selectSizeAddMoreColor">
                                    @foreach ($allSize as $item)
                                        <option value="{{ $item['id'] }},{{ $item['sizename'] }}">
                                            {{ $item['sizename'] }}</option>
                                    @endforeach
                                </select>
                            </div>
                        @endif
                    </div>
                    <div class="row">
                        <div class="col-sm mb-2">
                            <input type="text" class="form-control" id="coloraddmore" placeholder="Tên Màu">
                        </div>

                        <div class="col-sm mb-2">
                            <input type="number" class="form-control" id="qtyaddmore" placeholder="Số lượng">
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                    <button type="button" class="btn btn-primary" id="submitaddmorecolorbtn">Lưu mới</button>
                </div>
            </div>
        </div>
    </div>
    {{-- ========================== --}}
    <div class="modal fade" id="editStorageProductSizeModal" tabindex="-1" aria-labelledby="editStorageProductSizeModalLabel"
    aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="editStorageProductSizeModalLabel">Sửa màu sắc</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row">
                    @if (count($allSize) != 0)
                        <div class="col-sm mb-3">
                            <label for="">Thông tin size</label>
                            <select name="" class="form-control" id="selectSizeAddMoreColor1">
                                @foreach ($allSize as $item)
                                    <option value="{{ $item['id'] }},{{ $item['sizename'] }}">
                                        {{ $item['sizename'] }}</option>
                                @endforeach
                            </select>
                        </div>
                    @endif
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                <button type="button" class="btn btn-primary" id="switchStorageSize">Lưu mới</button>
            </div>
        </div>
    </div>
</div>
    {{-- ========================== --}}
    <div class="modal fade" id="replaceModal" tabindex="-1" aria-labelledby="replaceModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4>Sửa thông tin</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" id="replacearea">

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" id="submiteditSingle">Lưu</button>
                </div>
            </div>
        </div>
    </div>
    {{-- ========================== --}}
    <div class="m-3">
        <div class="row">
            <div class="col-sm-11">
                <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#productModal">Thêm sản
                    phẩm</button>
            </div>
            <div class="col-sm-1">
                <button style="font-size:22px" class="btn btn-secondary" id="recycleBinBtn"><i
                        class='bx bx-recycle'></i></button>
            </div>
        </div>
    </div>
    {{-- ===================== --}}
    <div style="width:100%;margin:0px auto" class="table-responsive mt-2">
        <table class="display table" style="width:100%" id="productTable">
            <thead>
                <tr class="table-dark ">
                    <td class="p-3">#</td>
                    <td class="p-3">Tên Sản Phẩm</td>
                    <td class="p-3">Đơn Giá </td>
                    <td class="p-3">Khuyến Mãi </td>
                    <td class="p-3">Giới tính </td>
                    <td class="p-3">Tồn kho</td>
                    <td class="p-3">Tình trạng</td>
                    <td class="p-3">Nổi bật</td>
                    <td class="p-3">Số Lượt Xem</td>
                    <td class="p-3">Tùy Chỉnh</td>
                </tr>
            </thead>
            <tbody>
                <?php $i = 1; ?>
                @foreach ($products as $item)
                    <tr>
                        <td>{{ $i++ }}</td>
                        <td style="width:26%">
                            <div class="row">
                                <div class="col-sm-3">
                                    <img src="{{ $item['image'] }}" style="width:100px;height:auto" alt="">
                                </div>
                                <div class="col-sm">
                                    @if ($item['image'] = '' || $item['image'] == null)
                                        <b style="font-size:17px;padding-top:10%" class="productNamerename inputedit"
                                            data-id="{{ $item['idProd'] }}">
                                            {{ $item['name'] }}</b>
                                    @else
                                        <p style="font-size:17px;padding-top:10%" class="productNamerename inputedit"
                                            data-id="{{ $item['idProd'] }}">
                                            {{ $item['name'] }}</p>
                                    @endif
                                </div>
                            </div>
                        </td>
                        <td style="width:10%"><b class="priceEdit inputedit"
                                data-id="{{ $item['idProd'] }}">{{ number_format($item['price'], 0) }}</b></td>
                        <td style="width:10%"><b class="discountEdit inputedit"
                                data-id="{{ $item['idProd'] }}">{{ $item['discount'] }} %</b> </td>
                        <td>
                            @if ($item['gender'] == 1)
                                <button class="btn btn-sm btn-success"
                                    onclick="switchGender({{ $item['idProd'] }},{{ $item['gender'] }})">Nam</button>
                            @else
                                <button class="btn btn-sm btn-warning"
                                    onclick="switchGender({{ $item['idProd'] }},{{ $item['gender'] }})">Nữ</button>
                            @endif
                        </td>
                        <td><button class="btn btn-sm btn-primary editStorageBtn"
                                data-id="{{ $item['idProd'] }}">{{ $item['total'] }}</button></td>
                        <td>
                            @if ($item['status'] == 1)
                            <div class="tooglectn"><label class="switch">
                                <input checked class="switchProdBtn" data-id="{{ $item['idProd'] }}" type="checkbox">
                                <span class="slider round"></span>
                                  </label></div>
                            @else
                                {{-- <button class="btn btn-sm btn-secondary switchProdBtn"
                                    data-id="{{ $item['idProd'] }}">Đang
                                    tắt</button> --}}
                                    <div class="tooglectn"><label class="switch">
                                        <input class="switchProdBtn" data-id="{{ $item['idProd'] }}" type="checkbox">
                                        <span class="slider round"></span>
                                          </label></div>
                            @endif
                        </td>
                        <td>
                            @if ($item['week']==0)
                            <div class="tooglectn"><label class="switch">
                                <input class="switchHighLightProdBtn" data-id="{{ $item['idProd'] }}" type="checkbox">
                                <span class="slider round"></span>
                                  </label></div>                                
                            @else
                            <div class="tooglectn"><label class="switch">
                                <input checked class="switchHighLightProdBtn" data-id="{{ $item['idProd'] }}" type="checkbox">
                                <span class="slider round"></span>
                                  </label></div>
                            @endif

                        </td>
                        <td>{{ $item['seen'] }}</td>
                        <td><button class='btn btn-warning btn-sm editProductBtn' data-id="{{ $item['idProd'] }}">Điều
                                chỉnh</button></td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
    <script src="ckeditor/ckeditor.js"></script>
    <script src="ckeditor/ckfinder.js"></script>
    <script src="admin/addProduct.js"></script>
    <!--<script src="admin/cate.js"></script>-->
    <!--<script src="admin/brand.js"></script>-->
    <script>
        // Default tab
        CKEDITOR.replace('content', {
            height: 400,
            extraPlugins: 'easyimage',
            cloudServices_tokenUrl: 'https://example.com/cs-token-endpoint',
            cloudServices_uploadUrl: 'https://your-organization-id.cke-cs.com/easyimage/upload/'
        });
        CKEDITOR.replace('contentEdit', {
            height: 400,
            extraPlugins: 'easyimage',
            cloudServices_tokenUrl: 'https://example.com/cs-token-endpoint',
            cloudServices_uploadUrl: 'https://your-organization-id.cke-cs.com/easyimage/upload/'
        });
        $(document).ready(function() {
            var table = $('#productTable').DataTable({
                pageLength: 4,
                lengthMenu: [
                    [2, 5, 10, 20],
                    [2, 5, 10, 20]
                ]
            })

        });
    </script>
@endsection
