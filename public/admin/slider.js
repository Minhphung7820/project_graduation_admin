const host = 'http://localhost:3000';
$(document).ready(function (){
    AjaxSetup();
    addSlider();
    deleteSlider();
    restore();
    detroy();
    checkAction();
    checkActionTrash();
});
var token = $('#hiddenToken').val().trim();
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

function chooseFileAdd(input) {
    const files = input.files
    const file = files[0];
    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png','image/webp'];
    if (!validImageTypes.includes(file['type'])) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $('#fileSliderAdd').attr('src', `${host}/sliders/noimage/image-not-found.png`);
        }
        reader.readAsDataURL(file);
        return false;
      }
    if (files && file) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $('#fileSliderAdd').attr('src', e.target.result);
        }
        reader.readAsDataURL(file);
    }
}
function chooseImageupdate(input,id){
    const files = input.files
    const file = files[0];
    const srcCurrent = $('.imgPreview'+id).attr('src');
    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png','image/webp'];
    const imgPreview = $('.imgPreview'+id);
    const btnSuccess = $('#success'+id);
    const btnCancel = $('#cancel'+id);
    if (!validImageTypes.includes(file['type'])) {
        Toast.fire({
            icon: 'error',
            title: 'Vui lòng chọn hình ảnh!'
        })
        var reader = new FileReader();
        reader.onload = function(e) {
            imgPreview.attr('src', srcCurrent);
        }
        reader.readAsDataURL(file);
        setTimeout(function(){
            btnSuccess.addClass('d-none');
            imgPreview.addClass('zoom');
            btnCancel.addClass('d-none');
        },2000)
        return false;
      }
    if (files && file) {
        var reader = new FileReader();
        reader.onload = function(e) {
            imgPreview.attr('src', e.target.result);
        }
        reader.readAsDataURL(file);
        $('form.form-update-image').submit(function(e){
            e.preventDefault();
            const formData = new FormData(this);
            $.ajax({
                type: "POST",
                url: `${host}/api/updateOneSlider?token=${token}`,
                data: formData,
                contentType: false,
                cache: false,
                processData: false,
                success: function (res) {
                    if(res.check==true){                          
                            Toast.fire({
                            icon: 'success',
                            title: 'Cập nhật banner thành công'
                        })
                        setTimeout(()=>{
                            btnSuccess.addClass('d-none');
                            imgPreview.addClass('zoom');
                            btnCancel.addClass('d-none');
                        },2000)
                    }
                }
            })

        })        
        //code
            btnSuccess.removeClass('d-none');
            btnCancel.removeClass('d-none');
            btnCancel.on('click',()=>{
            Toast.fire({
                icon: 'success',
                title: 'Bỏ thay đổi thành công!'
                }).then(()=>{
                        reader.onload = function(e) {
                            imgPreview.attr('src', srcCurrent);
                        }
                        reader.readAsDataURL(file);
                        btnSuccess.addClass('d-none');
                        btnCancel.addClass('d-none');
                }   
                )
        })
    }
}

function chooseFileEdit(input, id) {
    const files = input.files
    const file = files[0];
    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png','image/webp'];
    if (!validImageTypes.includes(file['type'])) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $('#fileSliderEdit'+ id).attr('src', `${host}/sliders/noimage/image-not-found.png`);
        }
        reader.readAsDataURL(file);
        return false;
      }
    if (files && file) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $('#fileSliderEdit' + id).attr('src', e.target.result);
        }
        reader.readAsDataURL(file);
    }
}
$('.fileImageEdit').change(function() {
    var id = $(this).data("id");
    chooseFileEdit(this, id);
})
//add slider
function addSlider(){
    $(document).on('submit','form.form-add-slider',function(e){
        e.preventDefault();
        var titleSlider = $('#titleSlider').val().trim();
        var hrefSliderAdd = $('#hrefSliderAdd').val().trim();
        var imageSlider = $("#submit-file-slider").prop("files")[0];
        var isStatus_D = $('.status_D').prop('checked');
        var isStatus_T = $('.status_T').prop('checked');
         if(titleSlider == ''){
            Swal.fire({
                icon: 'error',
                title: 'Bạn chưa nhập tiêu đề!',
                text: 'Vui lòng nhập tiêu đề trước khi submit!',
              })
        }
        else if(!imageSlider){
            Swal.fire({
                icon: 'error',
                title: 'Bạn chưa chọn ảnh!',
                text: 'Vui lòng chọn ảnh trước khi submit!',
              })
        }
        else if
        (imageSlider.type != 'image/jpeg' && imageSlider.type != 'image/png' && imageSlider.type != 'image/gif' && imageSlider.type != 'image/webp'){
           
                Swal.fire({
                    icon: 'error',
                    title: 'Vui lòng chọn ảnh',
                    text: '( jpg, png, gif, webp)',
                    width:400,
                    height:300                   
                    }) 
        }
        else if(isStatus_D == false && isStatus_T == false){
            Swal.fire({
                icon: 'error',
                title: 'Bạn chưa chọn trạng thái!',
                text: 'Vui lòng chọn trạng thái trước khi submit!',
              })
        }else if(hrefSliderAdd.length==''){
            Swal.fire({
                icon: 'error',
                title: 'Bạn chưa nhập đường dẫn!',
                text: 'Vui lòng nhập đường dẫn trước khi submit!',
              })
        }else if(hrefSliderAdd.length!=''){
            Swal.fire({
                title: 'Xác nhận',
                icon: 'info',
                html:
                  'Bạn muốn trỏ đến ' +
                  `<a href="/${hrefSliderAdd}">${hrefSliderAdd}</a>`,
                showCloseButton: true,
                showCancelButton: true,
                focusConfirm: false,
                confirmButtonText:
                '<i class="fa fa-thumbs-up"></i> Great!',
                confirmButtonAriaLabel: 'Thumbs up, great!',
                cancelButtonText:
                '<i class="fa fa-thumbs-down"></i>',
                cancelButtonAriaLabel: 'Thumbs down',
   
              }).then((result)=>{
                if (result.isConfirmed) {
                    var formData = new FormData(this);
                    $.ajax({
                        type: 'POST',
                        url: `${host}/api/addSlider`,
                        data: formData,
                        cache: false,
                        contentType: false,
                        processData: false,
                        success: (response) => {
                            if(response.status==203){
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Tiêu đề đã tồn tại!',
                                    text: 'Vui lòng chọn tiêu đề khác!',
                                  })
                            }
                            if(response.check==true){                          
                                  Toast.fire({
                                    icon: 'success',
                                    title: 'Đã thêm thành công'
                                  }).then(()=>{
                                    window.location.reload();
                                  })
                            }
                        }
                    })
                
                }
              })
        }
      

        
    })
}
//delete slider
function deleteSlider(){
    $('.deleteSlider').click(function () {
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
                var id = $(this).data('id');
                $.ajax({
                    url: `${host}/api/deleteSlider?token=${token}`,
                    type: 'post',
                    data: {   
                        id: id
                    },
                    success: (response) => {
                        if(response.check==false){
                              Toast.fire({
                                icon: 'error',
                                title: 'Sản phẩm không tồn tại!'
                              })
                        }
                        if(response.check==true){                          
                            Toast.fire({
                                icon: 'success',
                                title: 'Đã chuyển vào thùng rác!'
                            }).then(()=>{
                                window.location.reload();
                            })
                        }
                    },
                 })
            }
        })
    })
}
//change status
$(".switches").click(function() {
    const formSubmit = $('form-update-status');
    formSubmit.submit();
        const id = $(this).attr('data-fpid');
        $.ajax({
            url: `${host}/api/allSlider/change-status?token=${token}`,
            type: 'POST',
            data: {id: id},
            success: function(data) {
                Toast.fire({
                icon: 'success',
                title: 'Cập nhật trạng thái thành công'
                })
            }
        })
   
});
//edit slider
$('form.form-edit-slider').on("submit", function(e) {
    e.preventDefault();
    var idSlider = $(this).attr('data-id');
    var formData = new FormData(this);
    var titleEditSlider = $('#titleEditSlider'+ idSlider ).val().trim();
    var hrefEdit = $('.hrefEdit'+ idSlider ).val().trim();
    var imageEdit = $("#imageEdit"+idSlider ).prop("files")[0];
    if(imageEdit){
        if(imageEdit.type != 'image/jpeg' && imageEdit.type != 'image/png' && imageEdit.type != 'image/gif' && imageEdit.type != 'image/webp'){
            Swal.fire({
                icon: 'error',
                title: 'Vui lòng chọn ảnh!',
                text: '( jpeg, png, gif, webp)',
              })
              return false;
        }
    }
    if(titleEditSlider ==''){
        Swal.fire({
            icon: 'error',
            title: 'Bạn chưa nhập tiêu đề!',
            text: 'Vui lòng nhập tiêu đề trước khi submit!',
        })
        return false;
    }else if(hrefEdit==''){
        Swal.fire({
            icon: 'error',
            title: 'Bạn chưa nhập đường dẫn!',
            text: 'Vui lòng nhập đường dẫn trước khi submit!',
        })
        return false;
    }else{
        $.ajax({
            url: `${host}/api/editSlider`,
            type: 'post',
            data: formData,
            contentType: false,
            cache: false,
            processData: false,
            success:(response) => {
                if(response.status==203){
                    Swal.fire({
                        icon: 'error',
                        title: response.msg,
                        text: 'Vui lòng ' +response.msg,
                    })
                }
                if(response.status==200){
                    Toast.fire({
                    icon: 'success',
                    title: 'Cập nhật thành công'
                    }).then(()=>{
                    window.location.reload();
                    })
                }
            }
        })
    }    
})
//edit inline table

$.fn.editable.defaults.mode = 'inline';
$('.update').editable({
    validate: function(value) {
        if($.trim(value) == '') {
            return 'Trường bắt buộc nhập!';
        }
    },
    url: `${host}/api/updateOneSlider?token=${token}`,
    type: 'text',
    name: 'name',
    emptytext: 'Rỗng! Vui lòng cập nhật trong hệ thống',
    success: function (res) {
        if(res.check==true){                        
                Toast.fire({
                icon: 'success',
                title: 'Cập nhật thành công'
            })
        }else{
            var pk =res.id
            $('.upName-'+pk).addClass('text-danger')              
              Toast.fire({
              icon: 'error',
              title: res.msg
          }).then(()=>{
            // window.location.reload();
          })   
        }
    }
});
  //trash
  function restore(){
    $('.btnRestore').click(function () {
        var id = $(this).attr('data-id');
    
                $.ajax({
                    url: `${host}/api/restoreSlider?token=${token}`,
                    type: 'post',
                    data: {   
                        id: id
                    },
                    success: (res) => {
                        if(res.check==false){
                              Toast.fire({
                                icon: 'error',
                                title: res.msg
                              })
                        }
                        if(res.check==true){
                            Toast.fire({
                                icon: 'success',
                                title: res.msg
                              }) 
                              .then(()=>{
                                window.location.reload();
                              })
                        }
                    }
                })     
    })
  }
  //detroy one record
  function detroy(){
    $('.btnDetroy').click(function () {
        var id = $(this).attr('data-id');
        Swal.fire({
            title: 'Xóa vĩnh viễn?',
            text: "Banner này sẽ bị xóa vĩnh viễn và không thể khôi phục!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if(result.isConfirmed){
                $.ajax({
                    url: `${host}/api/detroySlider?token=${token}`,
                    type: 'post',
                    data: {   
                        id: id
                    },
                    success: (res) => {
                        if(res.check==false){
                              Toast.fire({
                                icon: 'error',
                                title: res.msg
                              })
                        }
                        if(res.check==true){
                            Toast.fire({
                                icon: 'success',
                                title: res.msg
                              }) 
                              .then(()=>{
                                window.location.reload();
                              })
                        }
                    }
                })   
            }
        })
  
    })
  }
  //multiple delete
  function checkAction(){
    var checkboxAll = $("#checkbox-all");
    var btnToTrash = $('#btnToTrash');
    var btnSubmitAction = $(".btn-submit-action");
    var checkBox = $('input[name="checkIDs[]"]'); 
    //Change checkboxAll
    checkboxAll.change(function () {
    var ischeckedAll = checkboxAll.prop('checked');
    checkBox.prop('checked', ischeckedAll);
    handleToggleBtnAction()
    })
    //change checkbox
    checkBox.change(function () {
    var ischeckedAll = checkBox.length === $('input[name="checkIDs[]"]:checked').length;
    checkboxAll.prop('checked', ischeckedAll);
    handleToggleBtnAction()
    })
    function handleToggleBtnAction() {
        var isCheked = $('input[name="checkIDs[]"]:checked').length;
        if (isCheked > 0) {
            btnToTrash.removeClass('d-none')
          btnSubmitAction.attr('disabled', false);
        } else {
            btnToTrash.addClass('d-none')
          btnSubmitAction.attr('disabled', true);
        }
    }
    // $('form.form-delete-multiple').on('submit',function(e) {

        $(document).on('submit',"form.form-delete-multiple",function(e){
        e.preventDefault();
        const formData = new FormData(this);
        $.ajax({
            url: `${host}/api/checkAction`,
            type: 'post',
            data: formData,
            contentType: false,
            cache: false,
            processData: false,
            success:(response) => {
                if(response.check==true){
                    Toast.fire({
                    icon: 'success',
                    title: response.msg
                    }).then(()=>{
                    window.location.reload();
                    })
                }else{
                    Toast.fire({
                        icon: 'error',
                        title: response.msg
                        })
                }
                
            }
        })
        
    })
  }
  //multiple check action trash
  function checkActionTrash(){
    var checkboxAll = $("#checkbox-all-trash");
    var btnSubmitAction = $(".btn-submit-action");
    var checkBox = $('input[name="checkIDsTrash[]"]'); 
    //Change checkboxAll
    checkboxAll.change(function () {
    var ischeckedAll = checkboxAll.prop('checked');
    checkBox.prop('checked', ischeckedAll);
    handleToggleBtnAction()
    })
    //change checkbox
    checkBox.change(function () {
    var ischeckedAll = checkBox.length === $('input[name="checkIDsTrash[]"]:checked').length;
    checkboxAll.prop('checked', ischeckedAll);
    handleToggleBtnAction()
    })
    function handleToggleBtnAction() {
        var isCheked = $('input[name="checkIDsTrash[]"]:checked').length;
        if (isCheked > 0) {
          btnSubmitAction.attr('disabled', false);
        } else {
          btnSubmitAction.attr('disabled', true);
        }
    }
    $(document).on('submit',"form.form-action-trash",function(e){
        e.preventDefault();
        const formData = new FormData(this);
        $.ajax({
            url: `${host}/api/checkAction`,
            type: 'post',
            data: formData,
            contentType: false,
            cache: false,
            processData: false,
            success:(response) => {
                if(response.status==203){
                    Swal.fire({
                        icon: 'error',
                        title: response.msg,
                        text: 'Vui lòng ' +response.msg,
                    })
                }
                if(response.check==true){
                    Toast.fire({
                    icon: 'success',
                    title: response.msg
                    }).then(()=>{
                    window.location.reload();
                    })
                }
            }
        })
        
    })
  }
