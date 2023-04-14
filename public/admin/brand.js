var token=$("#token").val();
$(document).ready(function () {
    $.ajaxSetup({
        data: {
          'token': token
        }
    });
    addBrand();
    editBrand();
    deleteBrand();
    switchBrand();
});
function deleteBrand(){
  $('.deleteBrand').click(function (e) { 
      e.preventDefault();
      var id = $(this).attr('data-id');
      Swal.fire({
          icon:'question',
          text: 'Bạn muốn thương hiệu này ?',
          showDenyButton: true,
          showCancelButton: false,
          confirmButtonText: 'Xóa',
          denyButtonText: `Không`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            $.ajax({
              type: "post",
              url: "http://127.0.0.1:3000/api/deleteBrand",
              data: {id:id},
              dataType: "JSON",
              success: function (response) {
                  if(response.check==true){
                      const Toast = Swal.mixin({
                          toast: true,
                          position: 'top-end',
                          showConfirmButton: false,
                          timer: 3000,
                          timerProgressBar: true,
                          didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                          }
                        })
                        
                        Toast.fire({
                          icon: 'success',
                          title: 'Đã xóa thành công'
                        }).then(()=>{
                          window.location.reload();
                        })
                  }else{
                      if(response.message.newCate){
                          const Toast = Swal.mixin({
                              toast: true,
                              position: 'top-end',
                              showConfirmButton: false,
                              timer: 3000,
                              timerProgressBar: true,
                              didOpen: (toast) => {
                                toast.addEventListener('mouseenter', Swal.stopTimer)
                                toast.addEventListener('mouseleave', Swal.resumeTimer)
                              }
                            })
                            
                            Toast.fire({
                              icon: 'error',
                              title: response.message.newCate
                            })
                      }else if(response.message.id){
                          const Toast = Swal.mixin({
                              toast: true,
                              position: 'top-end',
                              showConfirmButton: false,
                              timer: 3000,
                              timerProgressBar: true,
                              didOpen: (toast) => {
                                toast.addEventListener('mouseenter', Swal.stopTimer)
                                toast.addEventListener('mouseleave', Swal.resumeTimer)
                              }
                            })
                            
                            Toast.fire({
                              icon: 'error',
                              title: response.message.id
                            })
                      }else{
                          const Toast = Swal.mixin({
                              toast: true,
                              position: 'top-end',
                              showConfirmButton: false,
                              timer: 3000,
                              timerProgressBar: true,
                              didOpen: (toast) => {
                                toast.addEventListener('mouseenter', Swal.stopTimer)
                                toast.addEventListener('mouseleave', Swal.resumeTimer)
                              }
                            })
                            
                            Toast.fire({
                              icon: 'error',
                              title: response.message
                            })
                      }
                  }
              }
            });
          } else if (result.isDenied) {
              const Toast = Swal.mixin({
                  toast: true,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 3000,
                  timerProgressBar: true,
                  didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                  }
                })
                
                Toast.fire({
                  icon: 'success',
                  title: 'Giữ lại thương hiệu'
                })
          }
        })
  });
}
/*
===========
            ===========
                        ===========
                                    ===========

*/
function switchBrand(){
  $(".switchBrand").click(function (e) { 
    e.preventDefault();
    var id=$(this).attr('data-id');
    $.ajax({
      type: "post",
      url: "http://127.0.0.1:3000/api/switchBrand",
      data: {id:id},
      dataType: "JSON",
      success: function (response) {
        if(response.check==true){
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'success',
            title: 'Chuyển thành công'
          }).then(()=>{
            window.location.reload();
          })
        }else{
          if(response.message.id){
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })
            
            Toast.fire({
              icon: 'error',
              title: response.message.id
            })
          }else if(response.message){
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })
            
            Toast.fire({
              icon: 'error',
              title: response.message
            })
          }
        }
      }
    });
  });
} 
/*
===========
            ===========
                        ===========
                                    ===========

*/ 
function editBrand(){
    $('.editBrand').click(function (e) { 
        e.preventDefault();
        var id= $(this).attr('data-id');
        $("#editBrandModal").modal('show');
        $("#submitEditBrandBtn").click(function (e) { 
            e.preventDefault();
            var newBrand= $("#newBrandEdit").val().trim();
            if(newBrand==''){
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                  })
                  
                  Toast.fire({
                    icon: 'error',
                    title: 'Thiếu tên thương hiệu'
                  })
            }else{
                $.ajax({
                    type: "post",
                    url: "http://127.0.0.1:3000/api/editBrand",
                    data: { 
                      id:id,
                      newBrand:newBrand
                    },
                    dataType: "JSON",
                    success: function (response) {
                      if(response.check==true){
                        const Toast = Swal.mixin({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                              toast.addEventListener('mouseenter', Swal.stopTimer)
                              toast.addEventListener('mouseleave', Swal.resumeTimer)
                            }
                          })
                          
                          Toast.fire({
                            icon: 'success',
                            title: 'Đã sửa thành công'
                          }).then(()=>{
                            window.location.reload();
                          })
                    }else{
                        if(response.message.newBrand){
                            const Toast = Swal.mixin({
                                toast: true,
                                position: 'top-end',
                                showConfirmButton: false,
                                timer: 3000,
                                timerProgressBar: true,
                                didOpen: (toast) => {
                                  toast.addEventListener('mouseenter', Swal.stopTimer)
                                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                                }
                              })
                              
                              Toast.fire({
                                icon: 'error',
                                title: response.message.newCate
                              })
                        }else{
                            const Toast = Swal.mixin({
                                toast: true,
                                position: 'top-end',
                                showConfirmButton: false,
                                timer: 3000,
                                timerProgressBar: true,
                                didOpen: (toast) => {
                                  toast.addEventListener('mouseenter', Swal.stopTimer)
                                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                                }
                              })
                              
                              Toast.fire({
                                icon: 'error',
                                title: response.message
                              })
                        }
                    }
                    }
                });
            }
        });
    });
}
/*
===========
            ===========
                        ===========
                                    ===========

*/ 

function addBrand(){
    $('#RequestAddBrandBtn').click(function (e) { 
        e.preventDefault();
        $("#addBrandModal").modal('show');
        $("#submitAddBrandBtn").click(function (e) { 
            e.preventDefault();
            var newBrand = $("#newBrandAdd").val().trim();
            if(newBrand==''){
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                  })
                  
                  Toast.fire({
                    icon: 'error',
                    title: 'Tên thương hiệu mới chưa được nhập'
                  })
            }else{
                $.ajax({
                    type: "post",
                    url: "http://127.0.0.1:3000/api/addBrand",
                    data: {newBrand:newBrand},
                    dataType: "JSON",
                    success: function (response) {
                        if(response.check==true){
                            const Toast = Swal.mixin({
                                toast: true,
                                position: 'top-end',
                                showConfirmButton: false,
                                timer: 3000,
                                timerProgressBar: true,
                                didOpen: (toast) => {
                                  toast.addEventListener('mouseenter', Swal.stopTimer)
                                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                                }
                              })
                              
                              Toast.fire({
                                icon: 'success',
                                title: 'Đã thêm thành công'
                              }).then(()=>{
                                window.location.reload();
                              })
                        }else{
                            if(response.message.newBrand){
                                const Toast = Swal.mixin({
                                    toast: true,
                                    position: 'top-end',
                                    showConfirmButton: false,
                                    timer: 3000,
                                    timerProgressBar: true,
                                    didOpen: (toast) => {
                                      toast.addEventListener('mouseenter', Swal.stopTimer)
                                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                                    }
                                  })
                                  
                                  Toast.fire({
                                    icon: 'error',
                                    title: response.message.newCate
                                  })
                            }else{
                                const Toast = Swal.mixin({
                                    toast: true,
                                    position: 'top-end',
                                    showConfirmButton: false,
                                    timer: 3000,
                                    timerProgressBar: true,
                                    didOpen: (toast) => {
                                      toast.addEventListener('mouseenter', Swal.stopTimer)
                                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                                    }
                                  })
                                  
                                  Toast.fire({
                                    icon: 'error',
                                    title: response.message
                                  })
                            }
                        }
                    }
                });
            }
        });
    });
}