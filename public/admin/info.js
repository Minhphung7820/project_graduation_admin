
const host='http://localhost:3000';
const token = $('input[name="token"]').val().trim();
$(document).ready(function (){
    AjaxSetup();
    deleteImage(); 
    uploadImgDesc(); 
    let btnUpdate = $('#btnUpdate').addClass('d-none');
    const btnEdit = $('#btnEdit');
    let introShopView = $('#introShopView');
    let ckeditorControl = $('#ckeditorControl');
    ckeditorControl.addClass('d-none')
    btnEdit.click(()=>{
     introShopView.addClass('d-none')
     ckeditorControl.removeClass('d-none')
     btnUpdate.removeClass('d-none');
     btnEdit.addClass('d-none');
    })
// End Edit logo shop
// btn click delete img_desc

// form change img_desc

});
function uploadImgDesc(){
    $('.form-upload-imgDesc').on('change',function(){
        var formData = new FormData(this);
        let TotalFiles = $('#files')[0].files.length; //Total files
        let files = $('#files')[0];
        for (let i = 0; i < TotalFiles; i++) {
        formData.append('files' + i, files.files[i]);
        }
        formData.append('TotalFiles', TotalFiles);
        $.ajax({
            url: `${host}/api/updateImgDesc?token=${token}`,
            type: 'post',
            data: formData,
            contentType: false,
            cache: false,
            processData: false,
            success:(response) => {
                if(response.status==200){
                    Toast.fire({
                        icon: 'success',
                        title: 'Cập nhật thành công',
                        })
                    const {id,img_desc} = response.infosAfter;               
                    const arrImg = img_desc.split(',');
                    var result = document.querySelector('#result_img_desc');
                    const html = arrImg.map(img=>{
                        if(img==null||img==''){
                            return ''
                        }
                      return `
                        <div class="col-lg-6 pt-4">
                        <div class="img-desc-control">
                            <div class="iconDel">
                            <button class="btn_del_img" data-id="${id}" data-src="${img}">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                            </svg>
                            </button>
                            </div>
                            <img src="${host}/logos/${img}" alt="">
                        </div>
                        </div>
                      `
                    })
                    result.innerHTML = html.join(' ');
                    deleteImage();
                }
            },
            error: err=>console.log(err)
        })
    })
}
function deleteImage(){
    $('.btn_del_img').on('click',function(){
    Swal.fire({
        title: 'Chắc chắn xóa?',
        text: "Banner này sẽ bị xóa và sẽ không hiển thị ở trang chủ!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.isConfirmed) {
            const id=$(this).attr('data-id');
            const src=$(this).attr('data-src');
            $.ajax({
                url: `${host}/api/delImgDesc?token=${token}`,
                type: 'post',
                data: {   
                    id: id,
                    src: src
                },
                success: (response) => {
                    if(response.status==200){
                        Toast.fire({
                            icon: 'success',
                            title: 'Cập nhật thành công',
                            })
                        const {id,img_desc} = response.infosAfter;
                        const arrImg = img_desc.split(',');
                        var result = document.querySelector('#result_img_desc');
                        const html = arrImg.map(img=>{
                            if(img==null || img==''){
                                return ''
                            }
                          return `
                            <div class="col-lg-6 pt-4">
                                <div class="img-desc-control">
                                    <div class="iconDel">
                                    <button class="btn_del_img" data-id="${id}" data-src="${img}">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                                    </svg>
                                    </button>
                                    </div>
                                    <img src="${host}/logos/${img}" alt="">
                                </div>
                                </div>
                          `
                        })
                        result.innerHTML = html.join(' ');
                        deleteImage();
                    }
                },
                error: err=>console.log(err)
            })
        }
    })
})
}
// create variable Toast general use
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: true,
    didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})
//End create variable Toast general use
//Edit infomation shop
$(document).on("submit", "#form-edit-info", function(e) {
    e.preventDefault();
    const shopName = $("[name='shopName']").val().trim();
    const address = $("[name='address']").val().trim();
    const phoneNumber = $("[name='phoneNumber']").val().trim();
    const email = $("[name='email']").val().trim();
    const introShop = $("[name='introShop']").val().trim();
    const regexEmail = /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/;
    let regexPhone = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5]|9[0-4|6-9])[0-9]{7}$/;
    if(phoneNumber.length==8){
         regexPhone = /^(1?)(800|900)[0-9]{4}$/;
    }
    if(shopName == ''){
        Swal.fire({
            icon: 'error',
            title: 'Bạn chưa chọn tên shop!',
            text: 'Vui lòng chọn tên trước khi submit!',
          })
    }else if(shopName.length>50){
        Swal.fire({
            icon: 'error',
            title: 'Nhập tên quá dài!',
            text: 'Vui lòng nhập đúng tên trước khi submit!',
          })
    }else if(email==''){
        Swal.fire({
            icon: 'error',
            title: 'Bạn chưa nhập email!',
            text: 'Vui lòng nhập email trước khi submit!',
          })
    }else if(!email.match(regexEmail)){
        Swal.fire({
            icon: 'error',
            title: 'Email chưa đúng đinh dạng!',
            text: 'Vui lòng nhập đúng định dạng email !',
          })
    }else if(phoneNumber==''){
        Swal.fire({
            icon: 'error',
            title: 'Bạn chưa nhập hotline!',
            text: 'Vui lòng nhập hotline trước khi submit!',
          })
    }else if(!phoneNumber.match(regexPhone)){
        Swal.fire({
            icon: 'error',
            text: 'Vui lòng nhập đúng định dạng số holine!',
          })    
    }else if(address==''){
        Swal.fire({
            icon: 'error',
            title: 'Bạn chưa nhập địa chỉ!',
            text: 'Vui lòng nhập địa chỉ trước khi submit!',
          })
    }
    else if(introShop==''){
        Swal.fire({
            icon: 'error',
            title: 'Bạn chưa nhập giới thiệu!',
            text: 'Vui lòng nhập giới thiệu trước khi submit!',
          })
    }else{
        var formData = new FormData(this);
        let TotalFiles = $('#files')[0].files.length; //Total files
        let files = $('#files')[0];
        for (let i = 0; i < TotalFiles; i++) {
        formData.append('files' + i, files.files[i]);
        }
        formData.append('TotalFiles', TotalFiles);
        $.ajax({
            url: `${host}/api/editInfo`,
            type: 'post',
            data: formData,
            contentType: false,
            cache: false,
            processData: false,
            success:(response) => {
                if(response.status==200){
                    Toast.fire({
                    icon: 'success',
                    title: response.msg,
                    }),
                    setTimeout(() => {
                        $("#btnUpdate").addClass('d-none');
                        $('#btnEdit').removeClass('d-none');
                        $('#ckeditorControl').addClass('d-none');
                        $('#introShopView').removeClass('d-none');
                        $('.inputInfo').blur();
                        CKEDITOR.config.readOnly = true;
                        window.location.reload();
                    }, 2000);                    
                }
                if(response.status==201){
                    Toast.fire({
                    icon: 'success',
                    title: response.msg,
                    }).then(()=>{
                        window.location.reload();
                    })       
                }
            }
        })
    }
})
// End Edit infomation shop
const btnEdit = $('#btn-edit');
const btnUpdate = $('#btn-update');
function changeFileLogo(input) {
    const files = input.files
    const file = files[0];
    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png','image/webp'];
    if (!validImageTypes.includes(file['type'])) {
        var reader = new FileReader();
        reader.onload = function() {
            $('#image-logo').attr('src', `${host}/logos/image-Icon/no-image-logo.jpg`);
        }
        reader.readAsDataURL(file);
        btnEdit.addClass('d-none');
        btnUpdate.removeClass('d-none');
        return false;
      }
    if (files && file) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $('#image-logo').attr('src', e.target.result);
        }
        reader.readAsDataURL(file);
        btnEdit.addClass('d-none');
        btnUpdate.removeClass('d-none');
    }
}
//End change file image logo
// Edit logo shop
$(document).on("submit", "#form-update-logo", function(e) {
    e.preventDefault();
    var imageSlider = $("#image").prop("files")[0];
    if(imageSlider.type != 'image/jpeg' && imageSlider.type != 'image/png' && imageSlider.type != 'image/gif' && imageSlider.type != 'image/webp'){
        Swal.fire({
            icon: 'error',
            title: 'Vui lòng chọn ảnh',
            text: '( jpg, png, gif, webp)',
            width:400,
            height:300                   
            }) 
    }else{
        const formData = new FormData(this);
        $.ajax({
            url: `${host}/api/updateLogo`,
            type: 'post',
            data: formData,
            contentType: false,
            cache: false,
            processData: false,
            success:(response)=>{
                if(response.status==200){
                        Toast.fire({
                        icon: 'success',
                        title: response.msg,
                        }), setTimeout(()=>{
                            btnUpdate.addClass('d-none');
                        },2000);
                }
                if(response.status==201){
                    Toast.fire({
                    icon: 'success',
                    title: response.msg,
                    }).then(()=>{
                        window.location.reload();
                    })       
                }
            }
    })
    }   
})
