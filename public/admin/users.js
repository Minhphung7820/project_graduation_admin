var token=$("#token").val();
$(document).ready(function () {
      $.ajaxSetup({
        data: {
          'token': token
        }
    });
    addUserRole();
    addUser();
    deleteUserRole();
    editUserRole();
    switchUser(); 
    deleteUser();
    editUserRole();
    editUser();
});
function editUser(){
  $('.editUserBtn').click(function (e) { 
    Swal.fire({
      icon:'question',
      text: 'Bạn muốn sửa hay xóa tài khoản?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Sửa',
      denyButtonText: `Xóa`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        e.preventDefault();
    var idUser = $(this).attr('data-id');
    if(isNaN(idUser)==true){
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
        title: 'Mã tài khoản không hợp lệ'
      })
      
    }else{
      $.ajax({
        type: "post",
        url: "http://127.0.0.1:3000/api/singleUser",
        data: {idUser:idUser},
        dataType: "json",
        success: function (response) {
          if(response.result){
            response.result.forEach(el => {
              idRole=el['idRole'];
              email= el['email'];
            });
            $("#RoleIdUpdateUser").val(idRole).change();
            $("#oldEmail").val(email);
            $("#editUserModal").modal('show');
            $('#submiteditUser').click(function (e) { 
              e.preventDefault();
              var newmail= $("#oldEmail").val().trim();
              var idRoleNew = $("#RoleIdUpdateUser option:selected").val();
              if(newmail==email&&idRoleNew==idRole){
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
                  title: 'Tài khoản chưa được thay đổi'
                })
              }else{
                $.ajax({
                  type: "post",
                  url: "http://127.0.0.1:3000/api/editUser",
                  data: {
                    idUser:idUser,
                    idRole:idRoleNew,
                    email:newmail,
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
                        title: 'Thay đổi thành công'
                      }).then(()=>{
                        window.location.reload();
                      })
                    }else{
                      if(response.message.idRole){
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
                          title: response.message.idRole
                        })
                      }else if(response.message.email){
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
                          title: response.message.email
                        })
                      }else if(response.message.idUser){
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
                          title: response.message.idUser
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
              }
            });
          }else{
            window.location.reload();
          }
        }
      });
    }
    } else if (result.isDenied) {
      var idUser = $(this).attr('data-id');
      Swal.fire({
        title: 'Bạn muốn xóa tài khoản ?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Đúng',
        denyButtonText: `Không`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          $.ajax({
            type: "post",
            url: "url",
            data: {idUser:idUser},
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
                })
              }else{
                if(response.message.idUser){
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
                    title: response.message.idUser
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
            title: 'Giữ nguyên tài khoản'
          })
        }
      })
    }
  })
  });
}

function editUserEmail(x,y){
  var emailold =x;
  var id=y;
  var str=`
  <div class="row">
  <div class="col-sm">
    <input type="text" disabled class="form-control" id="oldEmail"><br>
  </div>
  
</div>
<div class="row">
  <div class="col-sm">
    <input type="text" class="form-control" placeholder="Nhập email mới" id="newEmail"><br>
  </div>
</div>
  `;
  $("#editArea").html(str);
  $("#editModal").modal('show');
  $("#oldEmail").val(emailold);
  $("#newEmail").keyup(function (e) { 
    var email = $("#newEmail").val().trim();
    if(e.which===13){
      if(email==''){
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
          title: 'Email mới chưa được nhập'
        })
      }else if(!email.match(/(.+)@(gmail+)\.(com)/i)&&!email.match(/(.+)@(fpt.edu+)\.(vn)/i)){
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
          title: 'Email không đúng định dạng gmail hoặc edu'
        })
      }else if(email==emailold){
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
          title: 'Email chưa thay đổi'
        })
      }else{
        Swal.fire({
          title: 'Bạn muốn thay đổi email tài khoản?',
          showDenyButton: true,
          showCancelButton: false,
          confirmButtonText: 'Đúng',
          denyButtonText: `Không`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            $.ajax({
              type: "post",
              url: "http://127.0.0.1:3000/api/editemail",
              data: {
                email:email,
                id:id
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
                    title: 'Đã thay đổi thành công'
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
                  }else if(response.message.email){
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
                      title: response.message.email
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
          } else if (result.isDenied) {
            $("#editModal").modal('hide');
          }
        })
      }
    }
  });
  $("#submiteditbtn").click(function (e) { 
    e.preventDefault();
    var email = $("#newEmail").val().trim();
    if(e.which===13){
      if(email==''){
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
          title: 'Email mới chưa được nhập'
        })
      }else if(!email.match(/(.+)@(gmail+)\.(com)/i)&&!email.match(/(.+)@(fpt.edu+)\.(vn)/i)){
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
          title: 'Email không đúng định dạng gmail hoặc edu'
        })
      }else if(email==emailold){
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
          title: 'Email chưa thay đổi'
        })
      }else{
        Swal.fire({
          title: 'Bạn muốn thay đổi email tài khoản?',
          showDenyButton: true,
          showCancelButton: false,
          confirmButtonText: 'Đúng',
          denyButtonText: `Không`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            $.ajax({
              type: "post",
              url: "http://127.0.0.1:3000/api/editemail",
              data: {
                email:email,
                id:id
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
                    title: 'Đã thay đổi thành công'
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
                  }else if(response.message.email){
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
                      title: response.message.email
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
          } else if (result.isDenied) {
            $("#editModal").modal('hide');
          }
        })
      }
    }
  });
}
/*
-
 -
  -
   -
    -
     -
*/ 
function switchUserRole(x){
  var idRole = x;
  Swal.fire({
    icon:'question',
    title: 'Bạn muốn chuyển trạng thái loại tài khoản?',
    text: 'Các tài khoản trong loại sẽ bị chuyển trạng thái ',
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: 'Đúng',
    denyButtonText: `Không`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
     $.ajax({
      type: "post",
      url: "http://127.0.0.1:3000/api/switchUserRole",
      data: {id:idRole},
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
            title: 'Đã chuyển trạng thái '
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
        title: 'Giữ nguyên trạng thái'
      })
    }
  })
}
/*
-
 -
  -
   -
    -
     -
*/ 
function deleteUser(){
    $('.deleteUserBtn').click(function (e) { 
    e.preventDefault();
    var idUser = $(this).attr('data-id');
    Swal.fire({
        icon:'question',
        text: 'Bạn muốn xóa tài khoản?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Xóa',
        denyButtonText: `Không!`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          $.ajax({
            type: "post",
            url: "http://127.0.0.1:3000/api/deleteUser",
            data: {
                idUser:idUser
            },
            dataType: "json",
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
                    if(response.message=='rejected'){
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
                            title: 'Dữ liệu không hợp lệ'
                          });
                    }else if(response.message=='exist'){
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
                          title: 'Có tài khoản trong loại'
                        });
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
                title: 'Ok ! Giữ lại'
              })
        }
      })
}
)};
/*
-
 -
  -
   -
    -
     -
*/ 
/*
-
 -
  -
   -
    -
     -
*/ 
function editUserRole1(x){
  Swal.fire({
    icon:'question',
    text: 'Bạn muốn sửa hay xóa loại tài khoản?',
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: 'Sửa',
    denyButtonText: `Xóa`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      var id= x;
    var str =``;
    str+=`
    <div class="row">
    <div class="col">
      <input type="text" class="form-control" id="editUserRole" placeholder="Tên loại tài khoản mới">
    </div>
    </div>
    `;
    $("#editArea").html(str);
    $("#editModal").modal('show');
    // ========================
    $("#editUserRole").keyup(function (e) { 
      var rolename =$("#editUserRole").val().trim();
      if(e.which===13){
        if(rolename==''){
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
            title: 'Chưa nhập loại tài khoản mới'
          })
        }else{
          Swal.fire({
            title: 'Bạn muốn sửa loại tài khoản ?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Sửa',
            denyButtonText: `Không`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              $.ajax({
                type: "post",
                url: "http://127.0.0.1:3000/api/editUserRole",
                data: {
                  idRole:id,
                  rolename:rolename,
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
                      title: 'Thay đổi thành công'
                    }).then(()=>{
                      window.location.reload();
                    })
                  }else{
                    if(response.message.idRole){
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
                        title: response.message.idRole
                      })
                    }else if(response.message.rolename){
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
                        title: response.message.rolename
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
            } else if (result.isDenied) {
              $("#editModal").modal('hide');
            }
          })
        }
      }
      $('#submiteditbtn').click(function (e) { 
        e.preventDefault();
        var rolename =$("#editUserRole").val().trim();
        if(rolename==''){
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
            title: 'Chưa nhập loại tài khoản mới'
          })
        }else{
          Swal.fire({
            title: 'Bạn muốn sửa loại tài khoản ?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Sửa',
            denyButtonText: `Không`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              $.ajax({
                type: "post",
                url: "http://127.0.0.1:3000/api/editUserRole",
                data: {
                  idRole:id,
                  rolename:rolename,
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
                      title: 'Thay đổi thành công'
                    }).then(()=>{
                      window.location.reload();
                    })
                  }else{
                    if(response.message.idRole){
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
                        title: response.message.idRole
                      })
                    }else if(response.message.rolename){
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
                        title: response.message.rolename
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
            } else if (result.isDenied) {
              $("#editModal").modal('hide');
            }
          })
        }
      });
    });
    } else if (result.isDenied) {
      Swal.fire({
        icon:'question',
        text: 'Bạn muốn xóa loại tài khoản này?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Đúng',
        denyButtonText: `Không`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          var id= x;
          $.ajax({
            type: "post",
            url: "http://127.0.0.1:3000/api/deleteUserRole",
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
                  title: 'Đã xóa thành công '
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
            title: 'Giữ nguyên loại tài khoản'
          })
        }
      })
    }
  })
    
}
/*
-
 -
  -
   -
    -
     -
*/ 
function switchUser(){
  $('.switchUserBtn').click(function (e) { 
    e.preventDefault();
    var idUser = $(this).attr('data-id');
    $.ajax({
      type: "post",
      url: "http://127.0.0.1:3000/api/switchUser",
      data: {idUser:idUser,},
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
              title: 'Đã chuyển thành công'
            }).then(()=>{
              window.location.reload();
            });
      }else{
        if(response.message.email){
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
            title: response.message.email
          })
        }else if(response.message.idRole){
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
            title: response.message.idRole
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
-
 -
  -
   -
    -
     -
*/ 
function editUserRole(){
    var idRole = '';
    $('.editUserRole').click(function (e) { 
        e.preventDefault();
        idRole=$(this).attr('data-id');
        $("#editLoaiTKModal").modal('show');
        $('#submitEditUserRole').click(function (e) { 
          e.preventDefault();
          var rolename= $("#newUserRole").val().trim();
          if(rolename==''){
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
              title: 'Loại tài khoản mới chưa được nhập'
            })
          }else{
            $.ajax({
              type: "post",
              url: "http://127.0.0.1:3000/api/editUserRole",
              data: {
                idRole:idRole,
                rolename:rolename,
                
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
                    });
              }else{
                if(response.message.rolename){
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
                    title: response.message.rolename
                  })
                }else if(response.message.idRole){
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
                    title: response.message.idRole
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
          }
        });
    });
}
/*
-
 -
  -
   -
    -
     -
*/ 
function deleteUserRole(){
    $('.deleteUserRoleBtn').click(function (e) { 
        e.preventDefault();
        var idRole = $(this).attr('data-id');
        Swal.fire({
            icon:'question',
            text: 'Muốn xóa không ?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Đúng',
            denyButtonText: `Không`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              $.ajax({
                type: "post",
                url: "http://127.0.0.1:3000/api/deleteUserRole",
                data: {id:idRole,},
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
                            title: 'Xóa loại tài khoản thành công'
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
                    title: 'Giữ lại loại tài khoản '
                  })
                  
            }
          })
    });
}
/*
-
 -
  -
   -
    -
     -
*/ 
function addUserRole(){
    $("#addUserRoleBtn").click(function (e) { 
        e.preventDefault(); 
        var userRole=$("#tenLoaiTK").val().trim();
        if(userRole==''){
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
                title: 'Tên loại tài khoản không được rỗng'
              })
        }else{
             $.ajax({
                type: "post",
                url: "http://127.0.0.1:3000/api/addUserRole",
                data: {userRole:userRole,},
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
                          });
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
                            title: response.message.userRole
                          })
                    }
                }
             });   
        }
    });
}
/*
-
 -
  -
   -
    -
     -
*/ 
function addUser(){
    $("#addUserBtn").click(function (e) { 
        e.preventDefault(); 
        var email=$("#email").val().trim();
        var idRole=$("#idUserRoleSelect option:selected").val();
        if(email==''){
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
                title: 'Email tài khoản không được rỗng'
              })
        }else if(!email.match(/(.+)@(gmail+)\.(com)/i)&&!email.match(/(.+)@(fpt.edu+)\.(vn)/i)){
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
                title: 'Email phải là gmail hoặc là mail FPT '
              })
        }else if(isNaN(idRole)==true){
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
                title: 'Loại tài khoản không hợp lệ'
              })
        }else{
             $.ajax({
                type: "post",
                url: "http://127.0.0.1:3000/api/addUser",
                data: {
                  idRole:idRole,
                  email:email,
                  
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
                            title: 'Đã thêm thành công'
                          }).then(()=>{
                            window.location.reload();
                          });
                    }else{
                      if(response.message.email){
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
                          title: response.message.email
                        })
                      }else if(response.message.idRole){
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
                          title: response.message.idRole
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
        }
    });
}
/*
-
 -
  -
   -
    -
     -
*/ 
