const host = 'http://localhost:3000';
$(document).ready(function (){
  AjaxSetup();
  addCate();
  deleteCate();
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
          $('#fileCateAdd').attr('src', `${host}/category/noimage/image-not-found.png`);
      }
      reader.readAsDataURL(file);
      return false;
    }
  if (files && file) {
      var reader = new FileReader();
      reader.onload = function(e) {
          $('#fileCateAdd').attr('src', e.target.result);
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
              url: `${host}/api/updateOneCate?token=${token}`,
              data: formData,
              contentType: false,
              cache: false,
              processData: false,
              success: function (res) {
                  if(res.check==true){                          
                          Toast.fire({
                          icon: 'success',
                          title: 'Cập nhật thành công',
                          width: 300
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
          $('#fileCateEdit'+ id).attr('src', `${host}/category/noimage/image-not-found.png`);
      }
      reader.readAsDataURL(file);
      return false;
    }
  if (files && file) {
      var reader = new FileReader();
      reader.onload = function(e) {
          $('#fileCateEdit' + id).attr('src', e.target.result);
      }
      reader.readAsDataURL(file);
  }
}
$('.fileImageEdit').change(function() {
  var id = $(this).data("id");
  chooseFileEdit(this, id);
})
//add slider
function addCate(){
  $(document).on('submit','form.form-add-cate',function(e){
      e.preventDefault();
      var nameCate = $('#nameCate').val().trim();
      var imageCate = $("#submit-file-cate").prop("files")[0];
      var isStatus_D = $('.status_D').prop('checked');
      var isStatus_T = $('.status_T').prop('checked');
       if(nameCate == ''){
          Swal.fire({
              icon: 'error',
              title: 'Bạn chưa nhập tên!',
              text: 'Vui lòng nhập tên trước khi submit!',
            })
      }
      else if(!imageCate){
          Swal.fire({
              icon: 'error',
              title: 'Bạn chưa chọn ảnh!',
              text: 'Vui lòng chọn ảnh trước khi submit!',
            })
      }
      else if
      (imageCate.type != 'image/jpeg' && imageCate.type != 'image/png' && imageCate.type != 'image/gif' && imageCate.type != 'image/webp'){
         
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
      }else{
          var formData = new FormData(this);
          $.ajax({
              type: 'POST',
              url: `${host}/api/addCategory`,
              data: formData,
              cache: false,
              contentType: false,
              processData: false,
              success: (response) => {
                  if(response.status==203){
                      Swal.fire({
                          icon: 'error',
                          title: 'Tên danh mục đã tồn tại',
                          text: 'Vui lòng chọn tên khác!',
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
//delete slider
function deleteCate(){
  $('.deleteCate').click(function () {
      Swal.fire({
          title: 'Chắc chắn xóa?',
          text: "Danh mục này sẽ bị xóa vĩnh viễn!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes'
      }).then((result) => {
          if (result.isConfirmed) {
              var id = $(this).data('id');
              $.ajax({
                  url: `${host}/api/deleteCategory?token=${token}`,
                  type: 'post',
                  data: {   
                      id: id
                  },
                  success: (response) => {
                      if(response.check==false){
                            Toast.fire({
                              icon: 'error',
                              title: 'Danh mục không tồn tại!'
                            })
                      }
                      if(response.status==201){
                          Toast.fire({
                            icon: 'error',
                            title: 'Còn tồn tại sản phẩm trong danh mục!',
                            width: 400
                          })
                    }
                  if(response.check==true){                          
                        Toast.fire({
                          icon: 'success',
                          title: 'Xóa danh mục thành công!'
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
          url: `${host}/api/allCate/change-status?token=${token}`,
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
$('form.form-edit-cate').on("submit", function(e) {
  e.preventDefault();
  var idCate = $(this).attr('data-id');
  var formData = new FormData(this);
  var nameCate = $('#titleEditCate'+ idCate ).val().trim();
  var imageEdit = $("#imageEdit"+idCate ).prop("files")[0];
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
  if(nameCate ==''){
      Swal.fire({
          icon: 'error',
          title: 'Bạn chưa nhập tên!',
          text: 'Vui lòng nhập tên trước khi submit!',
      })
      return false;
  }else{
      $.ajax({
          url: `${host}/api/editCategory?token=${token}`,
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
  url: `${host}/api/updateOneCate?token=${token}`,
  type: 'text',
  name: 'name',
  emptytext: 'Rỗng! Vui lòng cập nhật trong hệ thống',
  validate: function(value) {
    if($.trim(value) == '') {
        return 'Trường bắt buộc nhập!';
    }
},
  success: function (res) {
      if(res.check==true){                          
              Toast.fire({
              icon: 'success',
              title: 'Cập nhật thành công'
          })
        }else{
            var pk =res.id
            $('.upName-'+pk).addClass('text-danger') 
            console.log($('.upName-'+pk).val())                  
              Toast.fire({
              icon: 'error',
              title: res.msg
          }).then(()=>{
            window.location.reload();
          })   
        }
  }
});
//chang active 
$('.inputActive').click(function(){
  const id = $(this).data('id')
  $.ajax({
    url: `${host}/api/changeActive?token=${token}`,
    type: 'POST',
    data: {id: id},
    success: function(response) {
        if(response.status=200){
          Toast.fire({
            icon: 'success',
            title: response.msg
            })
        }
        if(response.status==400){
          Toast.fire({
            icon: 'error',
            title: response.msg
            })
        }
    },
    error: err=>console.log(err)
})
})
